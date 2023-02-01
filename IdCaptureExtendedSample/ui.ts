import { sanitize } from "dompurify";
import * as SDCId from "scandit-web-datacapture-id";

export enum Action {
  SWITCH_MODE = "SWITCH_MODE",
  CLOSE_RESULT = "CLOSE_RESULT",
  SCAN_BACKSIDE = "SCAN_BACKSIDE",
  SKIP_BACKSIDE = "SKIP_BACKSIDE",
  CLOSE_WARNING = "CLOSE_WARNING",
}

export const elements = {
  dataCaptureView: document.getElementById("data-capture-view") as HTMLDivElement,
  selector: document.getElementById("selector") as HTMLDivElement,
  alert: document.getElementById("alert") as HTMLDivElement,
  result: document.getElementById("result") as HTMLDivElement,
  resultContent: document.getElementById("result-content") as HTMLDivElement,
  resultHeader: document.getElementById("result-header") as HTMLDivElement,
  resultFooter: document.getElementById("result-footer") as HTMLDivElement,
};

export function getSelectedMode(): string {
  return (elements.selector.querySelector("button.active") as HTMLElement).dataset.mode!;
}

export function onModeSwitched(buttonElement: HTMLButtonElement): void {
  elements.selector.querySelector("button.active")?.classList.remove("active");
  buttonElement.classList.add("active");
}

export function confirmScanningBackside(capturedId: SDCId.CapturedId): void {
  elements.alert.innerHTML = `
    <p>This document has additional data on the back of the card.</p>
    <div>
      <button skip>Skip</button>
      <button onclick="window.dispatchAction('SCAN_BACKSIDE')">Scan</button>
    </div>
  `;
  const skipButton = elements.alert.querySelector("button[skip]")!;
  skipButton.addEventListener("click", () => {
    window.dispatchAction(Action.SKIP_BACKSIDE, capturedId);
  });
  elements.alert.removeAttribute("hidden");
}

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
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (value.day && value.month && value.year) {
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
    result += `<img src="data:image/png;base64,${capturedId.idImageOfType(SDCId.IdImageType.Face) ?? ""}" />`;
  }

  if (capturedId.aamvaBarcodeResult) {
    header = "Aamva Barcode Result";
    commonFields(capturedId.aamvaBarcodeResult);
    result += `<p class="label">AAMVA Version</p><p>${f(capturedId.aamvaBarcodeResult.aamvaVersion)}</p>`;
    result += `<p class="label">Alias Family Name</p><p>${f(capturedId.aamvaBarcodeResult.aliasFamilyName)}</p>`;
    result += `<p class="label">Alias Given Name</p><p>${f(capturedId.aamvaBarcodeResult.aliasGivenName)}</p>`;
    result += `<p class="label">Alias Suffix Name</p><p>${f(capturedId.aamvaBarcodeResult.aliasSuffixName)}</p>`;
    result += `<p class="label">Driver Name Prefix</p><p>${f(capturedId.aamvaBarcodeResult.driverNamePrefix)}</p>`;
    result += `<p class="label">Driver Name Suffix</p><p>${f(capturedId.aamvaBarcodeResult.driverNameSuffix)}</p>`;
    result += `<p class="label">Endorsements Code</p><p>${f(capturedId.aamvaBarcodeResult.endorsementsCode)}</p>`;
    result += `<p class="label">Eye Color</p><p>${f(capturedId.aamvaBarcodeResult.eyeColor)}</p>`;
    result += `<p class="label">First Name Truncation</p><p>${f(
      capturedId.aamvaBarcodeResult.firstNameTruncation
    )}</p>`;
    result += `<p class="label">Hair Color</p><p>${f(capturedId.aamvaBarcodeResult.hairColor)}</p>`;
    result += `<p class="label">Height CM</p><p>${f(capturedId.aamvaBarcodeResult.heightCm)}</p>`;
    result += `<p class="label">Height Inch</p><p>${f(capturedId.aamvaBarcodeResult.heightInch)}</p>`;
    result += `<p class="label">I In</p><p>${f(capturedId.aamvaBarcodeResult.iIN)}</p>`;
    result += `<p class="label">Issuing Jurisdiction</p><p>${f(capturedId.aamvaBarcodeResult.issuingJurisdiction)}</p>`;
    result += `<p class="label">Issuing Jurisdiction ISO</p><p>${f(
      capturedId.aamvaBarcodeResult.issuingJurisdictionIso
    )}</p>`;
    result += `<p class="label">Jurisdiction Version</p><p>${f(capturedId.aamvaBarcodeResult.jurisdictionVersion)}</p>`;
    result += `<p class="label">Last Name Truncation</p><p>${f(capturedId.aamvaBarcodeResult.lastNameTruncation)}</p>`;
    result += `<p class="label">Middle Name</p><p>${f(capturedId.aamvaBarcodeResult.middleName)}</p>`;
    result += `<p class="label">Middle Name Truncation</p><p>${f(
      capturedId.aamvaBarcodeResult.middleNameTruncation
    )}</p>`;
    result += `<p class="label">Place Of Birth</p><p>${f(capturedId.aamvaBarcodeResult.placeOfBirth)}</p>`;
    result += `<p class="label">Race</p><p>${f(capturedId.aamvaBarcodeResult.race)}</p>`;
    result += `<p class="label">Restrictions Code</p><p>${f(capturedId.aamvaBarcodeResult.restrictionsCode)}</p>`;
    result += `<p class="label">Vehicle Class</p><p>${f(capturedId.aamvaBarcodeResult.vehicleClass)}</p>`;
    result += `<p class="label">Weight Kg</p><p>${f(capturedId.aamvaBarcodeResult.weightKg)}</p>`;
    result += `<p class="label">Weight Lbs</p><p>${f(capturedId.aamvaBarcodeResult.weightLbs)}</p>`;
    result += `<p class="label">Card Revision Date</p><p>${f(capturedId.aamvaBarcodeResult.cardRevisionDate)}</p>`;
    result += `<p class="label">Document Discriminator Number</p><p>${f(
      capturedId.aamvaBarcodeResult.documentDiscriminatorNumber
    )}</p>`;
    result += `<p class="label">Barcode Data Elements</p><p>${f(
      capturedId.aamvaBarcodeResult.barcodeDataElements
    )}</p>`;
  }

  if (capturedId.argentinaIdBarcodeResult) {
    header = "Argentinian ID Barcode Result";
    commonFields(capturedId.argentinaIdBarcodeResult);
    result += `<p class="label">Personal Id Number</p><p>${f(
      capturedId.argentinaIdBarcodeResult.personalIdNumber
    )}</p>`;
    result += `<p class="label">Document Copy</p><p>${f(capturedId.argentinaIdBarcodeResult.documentCopy)}</p>`;
  }

  if (capturedId.chinaMainlandTravelPermitMrzResult) {
    header = "China Mainland Travel Permit MRZ Result";
    result += `<p class="label">Document Code</p><p>${f(
      capturedId.chinaMainlandTravelPermitMrzResult.documentCode
    )}</p>`;
    result += `<p class="label">Captured MRZ</p><p>${f(capturedId.chinaMainlandTravelPermitMrzResult.capturedMrz)}</p>`;
    result += `<p class="label">Personal ID Number</p><p>${f(
      capturedId.chinaMainlandTravelPermitMrzResult.personalIdNumber
    )}</p>`;
    result += `<p class="label">Renewal times</p><p>${f(
      capturedId.chinaMainlandTravelPermitMrzResult.renewalTimes
    )}</p>`;
    result += `<p class="label">GBK Name</p><p>${f(capturedId.chinaMainlandTravelPermitMrzResult.gbkName)}</p>`;
    result += `<p class="label">Omitted Character Count In GBK Name</p><p>${f(
      capturedId.chinaMainlandTravelPermitMrzResult.omittedCharacterCountInGBKName
    )}</p>`;
    result += `<p class="label">Omitted Name Count</p><p>${f(
      capturedId.chinaMainlandTravelPermitMrzResult.omittedNameCount
    )}</p>`;
    result += `<p class="label">Issuing Authority Code</p><p>${f(
      capturedId.chinaMainlandTravelPermitMrzResult.issuingAuthorityCode
    )}</p>`;
  }

  if (capturedId.chinaExitEntryPermitMrzResult) {
    header = "China Exit-Entry Permit MRZ Result";
    result += `<p class="label">Document Code</p><p>${f(capturedId.chinaExitEntryPermitMrzResult.documentCode)}</p>`;
    result += `<p class="label">Captured MRZ</p><p>${f(capturedId.chinaExitEntryPermitMrzResult.capturedMrz)}</p>`;
  }

  if (capturedId.colombiaIdBarcodeResult) {
    header = "Columbian ID Barcode Result";
    commonFields(capturedId.colombiaIdBarcodeResult);
    result += `<p class="label">Blood Type</p><p>${f(capturedId.colombiaIdBarcodeResult.bloodType)}</p>`;
  }

  if (capturedId.colombiaDlBarcodeResult) {
    header = "Columbian Driver License Barcode Result";
    commonFields(capturedId.colombiaDlBarcodeResult);
    result += `
      <p class="label">Identification Type</p>
      <p>${f(capturedId.colombiaDlBarcodeResult.identificationType)}</p>
    `;
    result += `<p class="label">Categories</p><p>${f(capturedId.colombiaDlBarcodeResult.categories)}</p>`;
  }

  if (capturedId.mrzResult) {
    header = "MRZ Result";
    commonFields(capturedId.mrzResult);
    result += `<p class="label">Document Code</p><p>${f(capturedId.mrzResult.documentCode)}</p>`;
    result += `<p class="label">Names Are Truncated</p><p>${f(capturedId.mrzResult.namesAreTruncated)}</p>`;
    result += `<p class="label">Optional</p><p>${f(capturedId.mrzResult.optional)}</p>`;
    result += `<p class="label">Optional1</p><p>${f(capturedId.mrzResult.optional1)}</p>`;
    result += `<p class="label">Captured Mrz</p><p>${f(capturedId.mrzResult.capturedMrz)}</p>`;
  }

  if (capturedId.southAfricaIdBarcodeResult) {
    header = "South African ID Barcode Result";
    commonFields(capturedId.southAfricaIdBarcodeResult);
    result += `<p class="label">Country Of Birth</p><p>${f(capturedId.southAfricaIdBarcodeResult.countryOfBirth)}</p>`;
    result += `<p class="label">Country Of Birth Iso</p><p>${f(
      capturedId.southAfricaIdBarcodeResult.countryOfBirthIso
    )}</p>`;
    result += `<p class="label">Citizenship Status</p><p>${f(
      capturedId.southAfricaIdBarcodeResult.citizenshipStatus
    )}</p>`;
    result += `<p class="label">Personal Id Number</p><p>${f(
      capturedId.southAfricaIdBarcodeResult.personalIdNumber
    )}</p>`;
  }

  if (capturedId.southAfricaDlBarcodeResult) {
    header = "South African Driver License Barcode Result";
    commonFields(capturedId.southAfricaDlBarcodeResult);
    result += `<p class="label">Version</p><p>${f(capturedId.southAfricaDlBarcodeResult.version)}</p>`;
    result += `<p class="label">License Country Of Issue</p><p>${f(
      capturedId.southAfricaDlBarcodeResult.licenseCountryOfIssue
    )}</p>`;
    result += `<p class="label">Personal Id Number</p><p>${f(
      capturedId.southAfricaDlBarcodeResult.personalIdNumber
    )}</p>`;
    result += `<p class="label">Personal Id Number Type</p><p>${f(
      capturedId.southAfricaDlBarcodeResult.personalIdNumberType
    )}</p>`;
    result += `<p class="label">Document Copy</p><p>${f(capturedId.southAfricaDlBarcodeResult.documentCopy)}</p>`;
    result += `<p class="label">Driver Restriction Codes</p><p>${f(
      capturedId.southAfricaDlBarcodeResult.driverRestrictionCodes
    )}</p>`;
    result += `<p class="label">Professional Driving Permit</p><p>${f(
      capturedId.southAfricaDlBarcodeResult.professionalDrivingPermit
    )}</p>`;
    result += `<p class="label">Vehicle Restrictions</p><p>${f(
      capturedId.southAfricaDlBarcodeResult.vehicleRestrictions
    )}</p>`;
  }

  if (capturedId.usUniformedServicesBarcodeResult) {
    header = "US Uniformed Services Barcode Result";
    commonFields(capturedId.usUniformedServicesBarcodeResult);
    result += `<p class="label">Blood Type</p><p>${f(capturedId.usUniformedServicesBarcodeResult.bloodType)}</p>`;
    result += `<p class="label">Branch Of Service</p><p>${f(
      capturedId.usUniformedServicesBarcodeResult.branchOfService
    )}</p>`;
    result += `<p class="label">Champus Effective Date</p><p>${f(
      capturedId.usUniformedServicesBarcodeResult.champusEffectiveDate
    )}</p>`;
    result += `<p class="label">Champus Expiry Date</p><p>${f(
      capturedId.usUniformedServicesBarcodeResult.champusExpiryDate
    )}</p>`;
    result += `<p class="label">Civilian Health Care Flag Code</p><p>${f(
      capturedId.usUniformedServicesBarcodeResult.civilianHealthCareFlagCode
    )}</p>`;
    result += `<p class="label">Civilian Health Care Flag Description</p><p>${f(
      capturedId.usUniformedServicesBarcodeResult.civilianHealthCareFlagDescription
    )}</p>`;
    result += `<p class="label">Commissary Flag Code</p><p>${f(
      capturedId.usUniformedServicesBarcodeResult.commissaryFlagCode
    )}</p>`;
    result += `<p class="label">Commissary Flag Description</p><p>${f(
      capturedId.usUniformedServicesBarcodeResult.commissaryFlagDescription
    )}</p>`;
    result += `<p class="label">Deers Dependent Suffix Code</p><p>${f(
      capturedId.usUniformedServicesBarcodeResult.deersDependentSuffixCode
    )}</p>`;
    result += `<p class="label">Deers Dependent Suffix Description</p><p>${f(
      capturedId.usUniformedServicesBarcodeResult.deersDependentSuffixDescription
    )}</p>`;
    result += `<p class="label">Direct Care Flag Code</p><p>${f(
      capturedId.usUniformedServicesBarcodeResult.directCareFlagCode
    )}</p>`;
    result += `<p class="label">Direct Care Flag Description</p><p>${f(
      capturedId.usUniformedServicesBarcodeResult.directCareFlagDescription
    )}</p>`;
    result += `<p class="label">Exchange Flag Code</p><p>${f(
      capturedId.usUniformedServicesBarcodeResult.exchangeFlagCode
    )}</p>`;
    result += `<p class="label">Exchange Flag Description</p><p>${f(
      capturedId.usUniformedServicesBarcodeResult.exchangeFlagDescription
    )}</p>`;
    result += `<p class="label">Eye Color</p><p>${f(capturedId.usUniformedServicesBarcodeResult.eyeColor)}</p>`;
    result += `<p class="label">Family Sequence Number</p><p>${f(
      capturedId.usUniformedServicesBarcodeResult.familySequenceNumber
    )}</p>`;
    result += `<p class="label">Form Number</p><p>${f(capturedId.usUniformedServicesBarcodeResult.formNumber)}</p>`;
    result += `<p class="label">Geneva Convention Category</p><p>${f(
      capturedId.usUniformedServicesBarcodeResult.genevaConventionCategory
    )}</p>`;
    result += `<p class="label">Hair Color</p><p>${f(capturedId.usUniformedServicesBarcodeResult.hairColor)}</p>`;
    result += `<p class="label">Height</p><p>${f(capturedId.usUniformedServicesBarcodeResult.height)}</p>`;
    result += `<p class="label">Jpeg Data</p><p>${f(capturedId.usUniformedServicesBarcodeResult.jpegData)}</p>`;
    result += `<p class="label">Mwr Flag Code</p><p>${f(capturedId.usUniformedServicesBarcodeResult.mwrFlagCode)}</p>`;
    result += `<p class="label">Mwr Flag Description</p><p>${f(
      capturedId.usUniformedServicesBarcodeResult.mwrFlagDescription
    )}</p>`;
    result += `<p class="label">Pay Grade</p><p>${f(capturedId.usUniformedServicesBarcodeResult.payGrade)}</p>`;
    result += `<p class="label">Person Designator Document</p><p>${f(
      capturedId.usUniformedServicesBarcodeResult.personDesignatorDocument
    )}</p>`;
    result += `<p class="label">Rank</p><p>${f(capturedId.usUniformedServicesBarcodeResult.rank)}</p>`;
    result += `<p class="label">Relationship Code</p><p>${f(
      capturedId.usUniformedServicesBarcodeResult.relationshipCode
    )}</p>`;
    result += `<p class="label">Relationship Description</p><p>${f(
      capturedId.usUniformedServicesBarcodeResult.relationshipDescription
    )}</p>`;
    result += `<p class="label">Security Code</p><p>${f(capturedId.usUniformedServicesBarcodeResult.securityCode)}</p>`;
    result += `<p class="label">Service Code</p><p>${f(capturedId.usUniformedServicesBarcodeResult.serviceCode)}</p>`;
    result += `<p class="label">Sponsor Flag</p><p>${f(capturedId.usUniformedServicesBarcodeResult.sponsorFlag)}</p>`;
    result += `<p class="label">Sponsor Name</p><p>${f(capturedId.usUniformedServicesBarcodeResult.sponsorName)}</p>`;
    result += `<p class="label">Sponsor Person Designator Identifier</p><p>${f(
      capturedId.usUniformedServicesBarcodeResult.sponsorPersonDesignatorIdentifier
    )}</p>`;
    result += `<p class="label">Status Code</p><p>${f(capturedId.usUniformedServicesBarcodeResult.statusCode)}</p>`;
    result += `<p class="label">Status Code Description</p><p>${f(
      capturedId.usUniformedServicesBarcodeResult.statusCodeDescription
    )}</p>`;
    result += `<p class="label">Version</p><p>${f(capturedId.usUniformedServicesBarcodeResult.version)}</p>`;
    result += `<p class="label">Weight</p><p>${f(capturedId.usUniformedServicesBarcodeResult.weight)}</p>`;
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
