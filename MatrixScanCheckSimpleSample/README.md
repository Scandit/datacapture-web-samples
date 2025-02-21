# MatrixScanCheckSimpleSample

A simple example of how to use BarcodeCheck.

## Prerequisites

Before proceeding, you will need a valid Scandit DataCapture SDK license key.
You can retrieve it by sign-in into your account at https://ssl.scandit.com.

## Installation

Install dependencies:

```bash
npm install
```

## How to run

Make sure SCANDIT_LICENSE_KEY is available in your environment, by either:

- running `SCANDIT_LICENSE_KEY=<YOUR_LICENSE_KEY> npm run build`
- placing your license key in a .env file at the root of the sample directory
- or by inserting your license key into `index.ts`, replacing the placeholder `-- ENTER YOUR SCANDIT LICENSE KEY HERE --` with the key.

Build and serve the application:

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

Make sure SCANDIT_LICENSE_KEY is available in your environment, by either:

- running `SCANDIT_LICENSE_KEY=<YOUR_LICENSE_KEY> npm run dev`
- placing your license key in a .env file at the root of the sample directory
- or by inserting your license key into `index.ts`, replacing the placeholder `-- ENTER YOUR SCANDIT LICENSE KEY HERE --` with the key.

Start the development server:

```bash
npm run dev
```

Open http://localhost:8888 and start scanning.
