import "./components/app-root.js";
import "./components/feature-card.js";
import "./components/home-section.js";
import "./components/scan-page.js";

window.addEventListener("DOMContentLoaded", () => {
  const appRoot = document.createElement("app-root");
  // Enter your Scandit License key here.
  // Your Scandit License key is available via your Scandit SDK web account.
  appRoot.licenseKey = "-- ENTER YOUR SCANDIT LICENSE KEY HERE --";
  document.body.appendChild(appRoot);
});
