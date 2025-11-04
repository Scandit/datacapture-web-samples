# electron-barcode-capture-simple-sample

A minimal Electron Barcode Capture Scandit application with TypeScript

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Project Setup

### Install

```bash
$ npm install
```

### Development

You must encrypt your license key into a sdc-license.data file before running the application.
To do so you can

```
SCANDIT_LICENSE_KEY="-- Enter your license here --" node encryptLicenseAndCreatePublicKey.js
```

then you should save your public key somewhere safe or fetch it from a remote under authentication.
It's recommended to also enable [code protection](https://electron-vite.org/guide/source-code-protection) to avoid your key to be stolen and misused by someone else.


```bash
$ npm run dev
```

### Build

```bash
# For windows
$ npm run build:win

# For macOS
$ npm run build:mac

# For Linux
$ npm run build:linux
```
