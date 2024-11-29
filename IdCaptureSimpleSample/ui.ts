import * as SDCId from "@scandit/web-datacapture-id";

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
    <p></p>
    <div class="single">
      <button onclick="window.dispatchAction('CLOSE_WARNING')">Close</button>
    </div>
  `;
  elements.alert.querySelector("p")!.textContent = text;
  elements.alert.removeAttribute("hidden");
}

function getDOMOfFormattedValue(value: unknown): HTMLElement {
  const paragraph = document.createElement("p");
  const emptyElement = document.createElement("i");
  emptyElement.textContent = "empty";

  if (value == null || value === "") {
    paragraph.append(emptyElement);
    return paragraph;
  }

  if (typeof value === "boolean") {
    paragraph.textContent = value ? "yes" : "no";
    return paragraph;
  }

  if (value instanceof SDCId.DateResult) {
    if (typeof value.day === "number" && typeof value.month === "number" && typeof value.year === "number") {
      const d = new Date(value.year, value.month - 1, value.day);
      paragraph.textContent = d.toLocaleDateString();
      return paragraph;
    }
    paragraph.append(emptyElement);
    return paragraph;
  }

  if (value instanceof SDCId.ProfessionalDrivingPermit) {
    const div = document.createElement("div");
    div.append(getFragmentForLabelAndValue("Codes", value.codes));
    div.append(getFragmentForLabelAndValue("Date of Expiry", value.dateOfExpiry));
    return div;
  }

  if (value instanceof SDCId.VehicleRestriction) {
    const div = document.createElement("div");
    div.append(getFragmentForLabelAndValue("Vehicle Code", value.vehicleCode));
    div.append(getFragmentForLabelAndValue("Vehicle Restriction", value.vehicleRestriction));
    div.append(getFragmentForLabelAndValue("Date of Issue", value.dateOfIssue));

    return div;
  }

  if (Array.isArray(value)) {
    for (const element of value) {
      paragraph.append(getDOMOfFormattedValue(element));
    }
    return paragraph;
  }

  paragraph.textContent = value as string;

  return paragraph;
}

function getDOMForLabel(labelText: string): HTMLParagraphElement {
  const paragraph = document.createElement("p");
  paragraph.className = "label";
  paragraph.textContent = labelText;

  return paragraph;
}

function getFragmentForLabelAndValue(labelText: string, value: unknown): DocumentFragment {
  const fragment = document.createDocumentFragment();
  fragment.append(getDOMForLabel(labelText));
  fragment.append(getDOMOfFormattedValue(value));

  return fragment;
}

function getFragmentForFields(fields: [string, unknown][]): DocumentFragment {
  const fragment = document.createDocumentFragment();
  for (const [label, value] of fields) {
    fragment.append(getFragmentForLabelAndValue(label, value));
  }
  return fragment;
}

export function showResult(capturedId: SDCId.CapturedId): void {
  let header = "";
  const result = document.createDocumentFragment();

  if (capturedId.images.face != null) {
    result.append(getDOMForLabel("Face"));
    const faceImage = new Image();
    faceImage.src = `data:image/png;base64,${capturedId.images.face}`;
    result.append(faceImage);
  }

  // Common fields
  result.append(
    getFragmentForFields([
      ["First Name", capturedId.firstName],
      ["Last Name", capturedId.lastName],
      ["Full Name", capturedId.fullName],
      ["Sex", capturedId.sex],
      ["Date of Birth", capturedId.dateOfBirth],
      ["Age", capturedId.age],
      ["Nationality", capturedId.nationality],
      ["Address", capturedId.address],
      ["Document Type", capturedId.document?.documentType],
      ["Issuing Country ISO", capturedId.issuingCountryIso],
      ["Issuing Country", capturedId.issuingCountry],
      ["Document Number", capturedId.documentNumber],
      ["Date of Expiry", capturedId.dateOfExpiry],
      ["Is Expired", capturedId.isExpired],
      ["Date of Issue", capturedId.dateOfIssue],
    ])
  );

  if (capturedId.vizResult) {
    header = "VIZ Result";
    const vizData = capturedId.vizResult;
    result.append(
      getFragmentForFields([
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
      ])
    );
  }

  elements.resultHeader.textContent = header;
  elements.resultContent.textContent = "";
  elements.resultContent.append(result);
  elements.result.removeAttribute("hidden");
  elements.resultContent.scrollTop = 0;
}

export function closeDialog(): void {
  elements.alert.setAttribute("hidden", "true");
}

export function closeResults(): void {
  elements.result.setAttribute("hidden", "true");
}
