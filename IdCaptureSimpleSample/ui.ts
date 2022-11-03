import { sanitize } from "dompurify";
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
  /* eslint-disable-next-line no-unsanitized/property */
  elements.alert.innerHTML = `
    <p>${sanitize(text)}</p>
    <div class="single">
      <button onclick="window.dispatchAction('CLOSE_WARNING')">Close</button>
    </div>
  `;
  elements.alert.removeAttribute("hidden");
}

export function showResult(capturedId: SDCId.CapturedId): void {
  function f(value: unknown): string {
    if (value == null || value === "") {
      return "<i>empty</i>";
    }
    if (value instanceof SDCId.DateResult) {
      if (typeof value.day === "number" && typeof value.month === "number" && typeof value.year === "number") {
        return `${value.year}-${value.month}-${value.day}`;
      }
      return "<i>empty</i>";
    }
    if (value instanceof SDCId.ProfessionalDrivingPermit) {
      return `<div>
          <p class="label">Codes</p><p>${f(value.codes)}</p>
          <p class="label">Date of Expiry</p><p>${f(value.dateOfExpiry)}</p>
        </div>`;
    }
    if (value instanceof SDCId.VehicleRestriction) {
      return `<div>
          <p class="label">Vehicle Code</p><p>${f(value.vehicleCode)}</p>
          <p class="label">Vehicle Restriction</p><p>${f(value.vehicleRestriction)}</p>
          <p class="label">Date of Issue</p><p>${f(value.dateOfIssue)}</p>
        </div>`;
    }
    if (Array.isArray(value)) {
      return value.map((element) => f(element)).join("<br>");
    }
    return sanitize(value as string);
  }

  let result = "";
  let header = "";

  type CommonFields = Pick<
    SDCId.VIZResult,
    | "address"
    | "dateOfBirth"
    | "dateOfExpiry"
    | "dateOfIssue"
    | "documentNumber"
    | "documentType"
    | "firstName"
    | "fullName"
    | "issuingCountry"
    | "issuingCountryIso"
    | "lastName"
    | "nationality"
    | "sex"
  >;

  function commonFields(data: CommonFields): void {
    result += `<p class="label">First Name</p><p>${f(data.firstName)}</p>`;
    result += `<p class="label">Last Name</p><p>${f(data.lastName)}</p>`;
    result += `<p class="label">Full Name</p><p>${f(data.fullName)}</p>`;
    result += `<p class="label">Sex</p><p>${f(data.sex)}</p>`;
    result += `<p class="label">Date of Birth</p><p>${f(data.dateOfBirth)}</p>`;
    result += `<p class="label">Nationality</p><p>${f(data.nationality)}</p>`;
    result += `<p class="label">Address</p><p>${f(data.address)}</p>`;
    result += `<p class="label">Document Type</p><p>${f(data.documentType)}</p>`;
    result += `<p class="label">Issuing Country ISO</p><p>${f(data.issuingCountryIso)}</p>`;
    result += `<p class="label">Issuing Country</p><p>${f(data.issuingCountry)}</p>`;
    result += `<p class="label">Document Number</p><p>${f(data.documentNumber)}</p>`;
    result += `<p class="label">Date of Expiry</p><p>${f(data.dateOfExpiry)}</p>`;
    result += `<p class="label">Date of Issue</p><p>${f(data.dateOfIssue)}</p>`;
  }

  if (capturedId.idImageOfType(SDCId.IdImageType.Face) != null) {
    result += `<p class="label">Face</p>`;
    result += `<img src="data:image/png;base64,${capturedId.idImageOfType(SDCId.IdImageType.Face)!}" />`;
  }

  if (capturedId.vizResult) {
    header = "VIZ Result";
    commonFields(capturedId.vizResult);
    result += `<p class="label">Additional Address Information</p><p>${f(
      capturedId.vizResult.additionalAddressInformation
    )}</p>`;
    result += `<p class="label">Additional Name Information</p><p>${f(
      capturedId.vizResult.additionalNameInformation
    )}</p>`;
    result += `<p class="label">Document Additional Number</p><p>${f(
      capturedId.vizResult.documentAdditionalNumber
    )}</p>`;
    result += `<p class="label">Employer</p><p>${f(capturedId.vizResult.employer)}</p>`;
    result += `<p class="label">Issuing Authority</p><p>${f(capturedId.vizResult.issuingAuthority)}</p>`;
    result += `<p class="label">Issuing Jurisdiction</p><p>${f(capturedId.vizResult.issuingJurisdiction)}</p>`;
    result += `<p class="label">Marital Status</p><p>${f(capturedId.vizResult.maritalStatus)}</p>`;
    result += `<p class="label">Personal Id Number</p><p>${f(capturedId.vizResult.personalIdNumber)}</p>`;
    result += `<p class="label">Place Of Birth</p><p>${f(capturedId.vizResult.placeOfBirth)}</p>`;
    result += `<p class="label">Profession</p><p>${f(capturedId.vizResult.profession)}</p>`;
    result += `<p class="label">Race</p><p>${f(capturedId.vizResult.race)}</p>`;
    result += `<p class="label">Religion</p><p>${f(capturedId.vizResult.religion)}</p>`;
    result += `<p class="label">Residential Status</p><p>${f(capturedId.vizResult.residentialStatus)}</p>`;
    result += `<p class="label">Captured Sides</p><p>${f(capturedId.vizResult.capturedSides)}</p>`;
    result += `<p class="label">Is Back Side Capture Supported</p><p>${f(
      capturedId.vizResult.isBackSideCaptureSupported
    )}</p>`;
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
