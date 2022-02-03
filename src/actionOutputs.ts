import {ActionOutput, ActionTrOutput} from 'github-actions-utils';

export const actionOutputs = {
    xpiFilePath: new ActionOutput('xpiFilePath'),
    sameVersionAlreadyUploadedError: new ActionTrOutput('sameVersionAlreadyUploadedError',
        (b: boolean) => b ? 'true' : 'false'
    ),
}