import { actionInputs as inputs } from 'github-actions-utils';

export const actionInputs = {
    zipFilePath: inputs.getWsPath('zipFilePath', true),
    sourcesZipFilePath: inputs.getString('sourcesZipFilePath', false),
    xpiFilePath: inputs.getWsPath('xpiFilePath', true),

    extensionId: inputs.getString('extensionId', false),
    jwtIssuer: inputs.getString('jwtIssuer', true, true),
    jwtSecret: inputs.getString('jwtSecret', true, true),
    channel: inputs.getString('channel', false),
    timeoutMs: inputs.getInt('timeoutMs', true),
}