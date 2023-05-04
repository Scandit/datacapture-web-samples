import * as DOMPurify from "dompurify";
import * as SDCId from "scandit-web-datacapture-id";

export enum Action {
  CLOSE_RESULT = "CLOSE_RESULT",
  CLOSE_WARNING = "CLOSE_WARNING",
}

export const elements = {
  dataCaptureView: document.querySelector<HTMLDivElement>("#data-capture-view")!,
  alert: document.querySelector("#alert")!,
  result: document.querySelector("#result")!,
  resultContent: document.querySelector("#result-content")!,
  resultHeader: document.querySelector("#result-header")!,
  resultFooter: document.querySelector("#result-footer")!,
};

export function showWarning(text: string): void {
  elements.alert.innerHTML = `
    <p>${DOMPurify.sanitize(text)}</p>
    <div class="single">
      <button onclick="window.dispatchAction('CLOSE_WARNING')">Close</button>
    </div>
  `;
  elements.alert.removeAttribute("hidden");
}

function formatValue(value: unknown): string {
  if (value == null || value === "") {
    return "<i>empty</i>";
  }
  if (typeof value === "boolean") {
    return value ? "yes" : "no";
  }
  if (value instanceof SDCId.DateResult) {
    if (typeof value.day === "number" && typeof value.month === "number" && typeof value.year === "number") {
      const d = new Date(value.year, value.month - 1, value.day);
      return d.toLocaleDateString();
    }
    return "<i>empty</i>";
  }
  if (value instanceof SDCId.ProfessionalDrivingPermit) {
    return `
      <div>
        ${getMarkupForLabelAndValue("Codes", value.codes)}
        ${getMarkupForLabelAndValue("Date of Expiry", value.dateOfExpiry)}
      </div>
    `;
  }
  if (value instanceof SDCId.VehicleRestriction) {
    return `
      <div>
        ${getMarkupForLabelAndValue("Vehicle Code", value.vehicleCode)}
        ${getMarkupForLabelAndValue("Vehicle Restriction", value.vehicleRestriction)}
        ${getMarkupForLabelAndValue("Date of Issue", value.dateOfIssue)}
      </div>
    `;
  }
  if (Array.isArray(value)) {
    return value.map((element) => formatValue(element)).join("<br>");
  }
  if (typeof value === "string") {
    // DOM purify will remove some parts if fed with an MRZ string like "<<<<hello<<<there", so we replace them
    // before sanitization
    return DOMPurify.sanitize(value.replace(/</g, "&lt;"));
  }
  return DOMPurify.sanitize(value as string);
}

function getMarkupForLabel(labelText: string): string {
  return `<p class="label">${labelText}</p>`;
}

function getMarkupForLabelAndValue(labelText: string, value: unknown): string {
  return `
    ${getMarkupForLabel(labelText)}
    <p>${formatValue(value)}</p>
  `;
}

function getMarkupForFields(fields: [string, unknown][]): string {
  return fields.reduce(
    (markup, nameAndValue) => markup + getMarkupForLabelAndValue(nameAndValue[0], nameAndValue[1]),
    ""
  );
}

export function showResult(capturedId: SDCId.CapturedId): void {
  let header = "";
  let result = "";

  if (capturedId.idImageOfType(SDCId.IdImageType.Face) != null) {
    result += getMarkupForLabel("Face");
    result += `<img src="data:image/png;base64,${capturedId.idImageOfType(SDCId.IdImageType.Face)!}" />`;
  }

  // Common fields
  result += getMarkupForFields([
    ["First Name", capturedId.firstName],
    ["Last Name", capturedId.lastName],
    ["Full Name", capturedId.fullName],
    ["Sex", capturedId.sex],
    ["Date of Birth", capturedId.dateOfBirth],
    ["Age", capturedId.age],
    ["Nationality", capturedId.nationality],
    ["Address", capturedId.address],
    ["Document Type", capturedId.documentType],
    ["Issuing Country ISO", capturedId.issuingCountryIso],
    ["Issuing Country", capturedId.issuingCountry],
    ["Document Number", capturedId.documentNumber],
    ["Date of Expiry", capturedId.dateOfExpiry],
    ["Is Expired", capturedId.isExpired],
    ["Date of Issue", capturedId.dateOfIssue],
  ]);

  if (capturedId.vizResult) {
    header = "VIZ Result";
    const vizData = capturedId.vizResult;
    result += getMarkupForFields([
      ["Additional Address Information", vizData.additionalAddressInformation],
      ["Additional Name Information", vizData.additionalNameInformation],
      ["Document Additional Number", vizData.documentAdditionalNumber],
      ["Employer", vizData.employer],
      ["Issuing Authority", vizData.issuingAuthority],
      ["Issuing Jurisdiction", vizData.issuingJurisdiction],
      ["Marital Status", vizData.maritalStatus],
      ["Personal Id Number", vizData.personalIdNumber],
      ["Place Of Birth", vizData.placeOfBirth],
      ["Profession", vizData.profession],
      ["Race", vizData.race],
      ["Religion", vizData.religion],
      ["Residential Status", vizData.residentialStatus],
      ["Captured Sides", vizData.capturedSides],
      ["Is Back Side Capture Supported", vizData.isBackSideCaptureSupported],
    ]);
  }

  /* eslint-disable-next-line no-unsanitized/property */
  elements.resultContent.innerHTML = result;
  /* eslint-disable-next-line no-unsanitized/property */
  elements.resultHeader.innerHTML = header;
  elements.result.removeAttribute("hidden");
  elements.resultContent.scrollTop = 0;
}

export function closeDialog(): void {
  elements.alert.setAttribute("hidden", "true");
}

export function closeResults(): void {
  elements.result.setAttribute("hidden", "true");
}
