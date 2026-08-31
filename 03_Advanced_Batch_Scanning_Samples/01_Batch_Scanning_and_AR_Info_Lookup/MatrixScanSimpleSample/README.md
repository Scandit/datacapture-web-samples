# MatrixScan Simple sample

A very simple example of setting up the library to track barcodes.

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

Make sure SCANDIT_LICENSE_KEY is available in your environment, by either:

- running `SCANDIT_LICENSE_KEY=<YOUR_LICENSE_KEY> npm run dev`
- placing your license key in a .env file at the root of the sample directory
- or by inserting your license key into `index.ts`, replacing the placeholder `-- ENTER YOUR SCANDIT LICENSE KEY HERE --` with the key.

Start the development server:

```bash
npm run dev
```

Open https://localhost:8888 and start scanning.

## AI Coding Skills

Use the matching Scandit skill to get AI-assisted help for this sample. Install the Scandit skills collection once, then invoke the matrixscan-batch-web skill.

[![Install via skills.sh](https://img.shields.io/badge/skills.sh-install-green)](https://skills.sh/scandit/skills)
[![Install in Cursor](https://img.shields.io/badge/Install%20in-Cursor-blue?style=flat-square&logo=cursor)](https://cursor.com/marketplace/scandit)
