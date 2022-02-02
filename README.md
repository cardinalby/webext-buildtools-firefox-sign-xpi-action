![Node.js CI](https://github.com/cardinalby/webext-buildtools-firefox-sign-xpi-action/workflows/build-test/badge.svg)

# Sign Firefox xpi file

Create and sign Firefox xpi file for offline distribution of WebExtension.
Read ["Signing and distributing your add-on"](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/Distribution) for details.
Based on [FirefoxAddonsBuilder](https://www.npmjs.com/package/webext-buildtools-firefox-addons-builder) 
package.

## API access

To setup API access you need to generate `jwtIssuer` and `jwtSecret`
([https://addons.mozilla.org/en-US/developers/addon/api/key/](https://addons.mozilla.org/en-US/developers/addon/api/key/)):

## Inputs

### 🔸 `zipFilePath` _Required_

Path to packed extension (relative to the repository).
You can use [webext-buildtools-pack-extension-dir-action](https://github.com/cardinalby/webext-buildtools-pack-extension-dir-action)
to pack your extension directory and provide this input from it's output.

### 🔸 `xpiFilePath` _Required_

Path to save xpi file (relative to the repository).

### 🔹 `extensionId`

UUID of an extension uploaded to Firefox Addons especially for offline distribution. 
It should be different from id of your published extension.
If not specified, new extension will be added to your addons list every build (not recommended).

### 🔸 `jwtIssuer` _Required_
JWT issuer also called "apiKey" obtained from created credentials. Use secrets!

### 🔸  `jwtSecret` _Required_
JWT secret also called "apiSecret" obtained from created credentials. Use secrets!

### 🔹 `channel` _Default: most recently used channel_
The release channel (`listed` or `unlisted`). Ignored for new add-ons, which are always unlisted.

### 🔹 `timeoutMs` _Default: `120000`_
Number of milliseconds to wait before aborting the request.

## Outputs

### 🔻 `xpiFilePath`
Absolute path to result xpi file.

## Usage example

```yaml
uses: cardinalby/webext-buildtools-firefox-sign-xpi-action@v1
with:
  zipFilePath: 'build/extension.zip'
  xpiFilePath: 'build/extension.signed.xpi'
  jwtIssuer: ${{ secrets.FF_JWT_ISSUER }}
  jwtSecret: ${{ secrets.FF_JWT_SECRET }}
```

---
If you are interested in the building the entire deployment workflow for WebExtension, 
you can read this [article](https://dev.to/cardinalby/webextension-deployment-and-publishing-using-github-actions-522o).