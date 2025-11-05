import * as ghActions from '@actions/core';
import FirefoxAddonsBuilder, {
    IFirefoxAddonsOptions,
    VersionAlreadyExistsError
} from 'webext-buildtools-firefox-addons-builder';
import {actionInputs} from './actionInputs';
import {getLogger} from './logger';
import {actionOutputs} from "./actionOutputs";

async function run(): Promise<void> {
    try {
        await runImpl();
    } catch (error) {
        if (error instanceof VersionAlreadyExistsError) {
            actionOutputs.sameVersionAlreadyUploadedError.setValue(true);
        }
        ghActions.setFailed(String(error));
    }
}

async function runImpl() {
    const logger = getLogger();

    const options = getBuilderOptions();
    const builder = new FirefoxAddonsBuilder(options, logger);

    builder.setInputZipFilePath(actionInputs.zipFilePath);
    if (actionInputs.sourcesZipFilePath) {
        builder.setInputSourcesZipFilePath(actionInputs.sourcesZipFilePath);
    }
    builder.requireSignedXpiFile();

    const result = await builder.build();
    const xpiFileAsset = result.getAssets().signedXpiFile;
    if (!xpiFileAsset) {
        throw new Error('signedXpiFile asset not found in result');
    }
    actionOutputs.xpiFilePath.setValue(xpiFileAsset.getValue());
}

function getBuilderOptions(): IFirefoxAddonsOptions {
    if (actionInputs.channel != undefined && actionInputs.channel !== 'listed' && actionInputs.channel !== 'unlisted') {
        throw new Error(`Invalid channel value: ${actionInputs.channel}. Allowed values are 'listed' or 'unlisted'.`);
    }

    return {
        api: {
            jwtSecret: actionInputs.jwtSecret,
            jwtIssuer: actionInputs.jwtIssuer
        },
        signXpi: {
            extensionId: actionInputs.extensionId,
            xpiOutPath: actionInputs.xpiFilePath,
            channel: actionInputs.channel as 'listed' | 'unlisted',
            approvalCheckTimeoutMs: actionInputs.approvalTimeoutMs,
            validationCheckTimeoutMs: actionInputs.validationTimeoutMs
        }
    };
}

// noinspection JSIgnoredPromiseFromCall
run();
