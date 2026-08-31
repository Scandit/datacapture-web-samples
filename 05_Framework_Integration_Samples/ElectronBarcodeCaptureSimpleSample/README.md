# electron-barcode-capture-simple-sample

A minimal Electron Barcode Capture Scandit application with TypeScript

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Project Setup

### Install

```bash
npm install
```

### Development

You must encrypt your license key into a sdc-license.data file before running the application.
To do so you can

```bash
SCANDIT_LICENSE_KEY="-- Enter your license here --" node encryptLicenseAndCreatePublicKey.js
```

then you should save your public key somewhere safe or fetch it from a remote under authentication.
It's recommended to also enable [code protection](https://electron-vite.org/guide/source-code-protection) to avoid your key to be stolen and misused by someone else.

```bash
npm run dev
```

### E2E Tests

E2E tests use [Playwright](https://playwright.dev/) and run against a **packaged** build of the app.

**1. Build the app**

```bash
# macOS (unsigned, for local testing)
CSC_IDENTITY_AUTO_DISCOVERY=false npm run build:unpack
```

**2. Run the tests**

```bash
npm run e2e
```

The `e2e` script sets `E2E_TESTS=true` automatically. This environment variable tells the app to allow remote debugging connections (required by Playwright) instead of quitting when it detects them in production mode.

**What the tests cover**

- App launches as a packaged build (`app.isPackaged === true`)
- SDK initializes without a `NoLicenseKeyError` in the console
- Camera feed becomes active (video element is playing)

### Build

```bash
# For windows
$ npm run build:win

# For macOS
$ npm run build:mac

# For Linux
$ npm run build:linux
```

## AI Coding Skills

Use the matching Scandit skill to get AI-assisted help for this sample. Install the Scandit skills collection once, then invoke the barcode-capture-web skill.

[![Install via skills.sh](https://img.shields.io/badge/skills.sh-install-green)](https://skills.sh/scandit/skills)
[![Install in Cursor](https://img.shields.io/badge/Install%20in-Cursor-blue?style=flat-square&logo=cursor)](https://cursor.com/marketplace/scandit)
