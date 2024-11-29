# Barcode Capture Settings Sample

This sample uses the BarcodeCapture API.  Barcode Capture is the fully-customizable API of the Scandit Data Capture SDK.

This sample demonstrates how you can adapt the scanner settings to achieve the best performance for your set-up and experiment with all the options, such as viewfinders, torch, restricted scan area.

Consider also the **pre-built component** designed for ergonomic high-speed scanning available via the SparkScan API.

**List Building Sample** ([iOS](https://github.com/Scandit/datacapture-ios-samples/tree/master/ListBuildingSample), [Android](https://github.com/Scandit/datacapture-android-samples/tree/master/ListBuildingSample), [React Native](https://github.com/Scandit/datacapture-react-native-samples/tree/master/ListBuildingSample), Xamarin ([Forms](https://github.com/Scandit/datacapture-xamarin-forms-samples/tree/master/ListBuildingSample), [iOS](https://github.com/Scandit/datacapture-xamarin-samples/tree/master/ios/ListBuildingSample), [Android](https://github.com/Scandit/datacapture-xamarin-samples/tree/master/android/ListBuildingSample)))

**ReceivingSample** ([iOS](https://github.com/Scandit/datacapture-ios-samples/tree/master/ReceivingSample), [Android](https://github.com/Scandit/datacapture-android-samples/tree/master/ReceivingSample))

## Documentation

Barcode Capture is a fully-flexible API of the Scandit Data Capture SDK.  Our SDK is supported on most popular frameworks.

[iOS](https://docs.scandit.com/data-capture-sdk/ios/index.html), [Android,](https://docs.scandit.com/data-capture-sdk/android/index.html) [Web](https://docs.scandit.com/data-capture-sdk/web/index.html), [Cordova](https://docs.scandit.com/data-capture-sdk/cordova/index.html), Xamarin ([iOS](https://docs.scandit.com/data-capture-sdk/xamarin.ios/index.html), [Android](https://docs.scandit.com/data-capture-sdk/xamarin.android/index.html), [Forms](https://docs.scandit.com/data-capture-sdk/xamarin.forms/index.html)), .NET ([iOS](https://docs.scandit.com/data-capture-sdk/dotnet.ios/index.html), [Android](https://docs.scandit.com/data-capture-sdk/dotnet.android/index.html)), [React Native](https://docs.scandit.com/data-capture-sdk/react-native/index.html), [Flutter,](https://docs.scandit.com/data-capture-sdk/flutter/index.html) [Capacitor,](https://docs.scandit.com/data-capture-sdk/capacitor/index.html) [Titanium](https://docs.scandit.com/data-capture-sdk/titanium/index.html)

## Sample Barcodes

Once you get the sample up and running, go find some barcodes to scan. Don’t feel like getting up from your desk? Here’s a [handy pdf of barcodes](https://github.com/Scandit/.github/blob/main/images/PrintTheseBarcodes.pdf) you can print out.

## Trial Signup

To add Barcode Capture to your app, sign up for your Scandit Developer Account  and get instant access to your license key: [https://ssl.scandit.com/dashboard/sign-up?p=test](https://ssl.scandit.com/dashboard/sign-up?p=test)

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
- or by inserting your license key into `src/App.svelte`, replacing the placeholder `-- ENTER YOUR SCANDIT LICENSE KEY HERE --` with the key.

```bash
npm run build
npm run serve
```

Open http://localhost:8888 and start scanning.

## How to test the sample from any device

You can use an SSH tunnel to access the running sample from another device via the internet. To do so, you can install [ngrok](https://ngrok.com/) and create a tunnel to the running sample:

```bash
# execute this after npm run serve
ngrok http 8888
```

Make sure you use the HTTP**S** tunnel because most of the browsers will deny permission to access the camera in non-secure contexts.

## Development

Start the development server:

```bash
npm run dev
```

Open http://localhost:8888 and start scanning.
