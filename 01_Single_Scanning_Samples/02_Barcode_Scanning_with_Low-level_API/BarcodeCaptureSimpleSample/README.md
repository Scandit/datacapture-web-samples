# Barcode Capture Simple Sample

This simple sample uses the camera to read a single barcode using the BarcodeCapture API.

Consider also the **pre-built component** designed for ergonomic high-speed single scanning available via the SparkScan API.

**List Building Sample** ([iOS](https://github.com/Scandit/datacapture-ios-samples/tree/master/ListBuildingSample), [Android](https://github.com/Scandit/datacapture-android-samples/tree/master/ListBuildingSample), [React Native](https://github.com/Scandit/datacapture-react-native-samples/tree/master/ListBuildingSample), Xamarin ([Forms](https://github.com/Scandit/datacapture-xamarin-forms-samples/tree/master/ListBuildingSample), [iOS](https://github.com/Scandit/datacapture-xamarin-samples/tree/master/ios/ListBuildingSample)

**ReceivingSample** ([iOS](https://github.com/Scandit/datacapture-ios-samples/tree/master/ReceivingSample), [Android](https://github.com/Scandit/datacapture-android-samples/tree/master/ReceivingSample))

## AI Coding Skills

Scandit's AI coding skills teach your coding agent (Claude Code, Cursor, Codex, GitHub Copilot and others) how to pick the right Scandit product and integrate the Data Capture SDK. See [github.com/Scandit/skills](https://github.com/Scandit/skills) for install instructions.

## Documentation

BarcodeCapture is a fully-flexible API of the Scandit Data Capture SDK.  Our SDK is supported on most popular frameworks.

[iOS](https://docs.scandit.com/data-capture-sdk/ios/index.html), [Android](https://docs.scandit.com/data-capture-sdk/android/index.html), [Web](https://docs.scandit.com/data-capture-sdk/web/index.html), [Cordova](https://docs.scandit.com/data-capture-sdk/cordova/index.html), .NET ([iOS](https://docs.scandit.com/data-capture-sdk/dotnet.ios/index.html), [Android](https://docs.scandit.com/data-capture-sdk/dotnet.android/index.html)), [React Native](https://docs.scandit.com/data-capture-sdk/react-native/index.html), [Flutter](https://docs.scandit.com/data-capture-sdk/flutter/index.html), [Capacitor](https://docs.scandit.com/data-capture-sdk/capacitor/index.html), [Titanium](https://docs.scandit.com/data-capture-sdk/titanium/index.html)

## Sample Barcodes

Once you get the sample up and running, go find some barcodes to scan. Don’t feel like getting up from your desk? Here’s a [handy pdf of barcodes](https://github.com/Scandit/.github/blob/main/images/PrintTheseBarcodes.pdf) you can print out.

## Trial Signup

To add Barcode Capture to your app, sign up for your Scandit Developer Account 
and get instant access to your license key: [https://ssl.scandit.com/dashboard/sign-up?p=test](https://ssl.scandit.com/dashboard/sign-up?p=test)

## Support

Our support engineers can be reached at [support@scandit.com](mailto:support@scandit.com).

## License

[Apache 2.0](http://www.apache.org/licenses/LICENSE-2.0)

## Installation

Install dependencies:

```bash
npm install
```

## How to run

Make sure SCANDIT_LICENSE_KEY is available in your environment, by either:

- running `SCANDIT_LICENSE_KEY=<YOUR_LICENSE_KEY> npm run build`
- placing your license key in a `.env` file at the root of the sample directory
- or by inserting your license key into `index.ts`, replacing the placeholder `-- ENTER YOUR SCANDIT LICENSE KEY HERE --` with the key.

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

Start the development server:

```bash
npm run dev
```

Open https://localhost:8888 and start scanning.
