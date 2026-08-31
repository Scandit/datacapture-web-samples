# Price Capture Sample

An example of using Label Capture with the `priceCapture` preset to scan retail price labels and validate the displayed price against a reference database.

The sample shows a colored border around the price field and a status pin above it:
- **Green (✓)**: price matches the database
- **Red (✗)**: price differs from the database
- **Yellow (?)**: barcode not found in the database

## Prerequisites

Before proceeding, you will need a valid Scandit DataCapture SDK license key.
You can retrieve it by signing into your account at https://ssl.scandit.com.

## Installation

Install dependencies:

```bash
npm install
```

## How to run

Make sure SCANDIT_LICENSE_KEY is available in your environment, by either:

- running `SCANDIT_LICENSE_KEY=<YOUR_LICENSE_KEY> npm run build`
- placing your license key in a `.env` file at the root of the sample directory
- or by inserting your license key into `src/main.ts`, replacing the placeholder `-- ENTER YOUR SCANDIT LICENSE KEY HERE --` with the key.

Build and serve the application:

```bash
npm run build
npm run serve
```

Open https://localhost:8888 and start scanning.

## How to test the sample from any device

The dev and preview servers run over HTTPS by default (using a self-signed certificate) and listen on every network interface, and they print a scannable QR code in the terminal when you run `npm run dev` or `npm run serve`. To test the sample on a phone or tablet on the same network:

1. Scan the QR code shown in the terminal (or open `https://<your-computer-ip>:8888` on the device manually).
2. Accept the self-signed certificate warning once.

The HTTPS context is what lets the browser grant camera access. To reach the sample from outside your network you can still expose it with a tool such as [ngrok](https://ngrok.com/) (`ngrok http 8888`) and use the HTTPS URL.

## Development

Make sure SCANDIT_LICENSE_KEY is available in your environment, by either:

- running `SCANDIT_LICENSE_KEY=<YOUR_LICENSE_KEY> npm run dev`
- placing your license key in a `.env` file at the root of the sample directory
- or by inserting your license key into `src/main.ts`, replacing the placeholder `-- ENTER YOUR SCANDIT LICENSE KEY HERE --` with the key.

Start the development server:

```bash
npm run dev
```

Open https://localhost:8888 and start scanning.

## AI Coding Skills

Use the matching Scandit skill to get AI-assisted help for this sample. Install the Scandit skills collection once, then invoke the label-capture-web skill.

[![Install via skills.sh](https://img.shields.io/badge/skills.sh-install-green)](https://skills.sh/scandit/skills)
[![Install in Cursor](https://img.shields.io/badge/Install%20in-Cursor-blue?style=flat-square&logo=cursor)](https://cursor.com/marketplace/scandit)

## Documentation

Label Capture is an API of the Scandit Data Capture SDK. Our SDK is supported on most popular frameworks.

Get started with Label Capture on [iOS](https://docs.scandit.com/sdks/ios/label-capture/get-started/), [Android](https://docs.scandit.com/sdks/android/label-capture/get-started/), [Web](https://docs.scandit.com/sdks/web/label-capture/get-started/), [React Native](https://docs.scandit.com/sdks/react-native/label-capture/get-started/).

For all data capture functionality across frameworks, see documentation:

[iOS](https://docs.scandit.com/data-capture-sdk/ios/index.html), [Android](https://docs.scandit.com/data-capture-sdk/android/index.html), [Web](https://docs.scandit.com/data-capture-sdk/web/index.html), [Cordova](https://docs.scandit.com/data-capture-sdk/cordova/index.html), .NET ([iOS](https://docs.scandit.com/data-capture-sdk/dotnet.ios/index.html), [Android](https://docs.scandit.com/data-capture-sdk/dotnet.android/index.html)), [React Native](https://docs.scandit.com/data-capture-sdk/react-native/index.html), [Flutter](https://docs.scandit.com/data-capture-sdk/flutter/index.html), [Capacitor](https://docs.scandit.com/data-capture-sdk/capacitor/index.html), [Titanium](https://docs.scandit.com/data-capture-sdk/titanium/index.html)

## License

[Apache 2.0](http://www.apache.org/licenses/LICENSE-2.0)
