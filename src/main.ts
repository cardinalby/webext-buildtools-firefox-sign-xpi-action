import * as ghActions from '@actions/core';
import FirefoxAddonsBuilder, {IFirefoxAddonsOptions} from 'webext-buildtools-firefox-addons-builder';
import {actionInputs} from './actionInputs';
import {getLogger} from './logger';
import fs from "fs";
import {actionOutputs} from "./actionOutputs";

async function run(): Promise<void> {
    try {
        await runImpl();
    } catch (error) {
        ghActions.setFailed(error.message);
    }
}

async function runImpl() {
    const logger = getLogger();

    const options = getBuilderOptions();
    const builder = new FirefoxAddonsBuilder(options, logger);

    builder.setInputBuffer(fs.readFileSync(actionInputs.zipFilePath));
    builder.requireSignedXpiFile();

    const result = await builder.build();
    const xpiFileAsset = result.getAssets().signedXpiFile;
    if (!xpiFileAsset) {
        throw new Error('signedXpiFile asset not found in result');
    }
    actionOutputs.xpiFilePath.setValue(xpiFileAsset.getValue());
}

function getBuilderOptions(): IFirefoxAddonsOptions {
    return {
        api: {
            jwtSecret: actionInputs.jwtSecret,
            jwtIssuer: actionInputs.jwtIssuer
        },
        signXpi: {
            xpiOutPath: actionInputs.xpiFilePath,
            signAddonLib: {
                timeout: actionInputs.timeoutMs,
                channel: actionInputs.channel
            }
        }
    };
}

// noinspection JSIgnoredPromiseFromCall
run();