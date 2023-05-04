import * as DOMPurify from "dompurify";
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
    result += `<img src="data:image/png;base64,${capturedId.idImageOfType(SDCId.IdImageType.Face) ?? ""}" />`;
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

  if (capturedId.aamvaBarcodeResult) {
    header = "Aamva Barcode Result";
    const data = capturedId.aamvaBarcodeResult;
    result += getMarkupForFields([
      ["AAMVA Version", data.aamvaVersion],
      ["Is Real ID", data.isRealId],
      ["Alias Family Name", data.aliasFamilyName],
      ["Alias Given Name", data.aliasGivenName],
      ["Alias Suffix Name", data.aliasSuffixName],
      ["Driver Name Prefix", data.driverNamePrefix],
      ["Driver Name Suffix", data.driverNameSuffix],
      ["Endorsements Code", data.endorsementsCode],
      ["Eye Color", data.eyeColor],
      ["First Name Truncation", data.firstNameTruncation],
      ["Hair Color", data.hairColor],
      ["Height CM", data.heightCm],
      ["Height Inch", data.heightInch],
      ["IIN", data.IIN],
      ["Issuing Jurisdiction", data.issuingJurisdiction],
      ["Issuing Jurisdiction ISO", data.issuingJurisdictionIso],
      ["Jurisdiction Version", data.jurisdictionVersion],
      ["Last Name Truncation", data.lastNameTruncation],
      ["Middle Name", data.middleName],
      ["Middle Name Truncation", data.middleNameTruncation],
      ["Place Of Birth", data.placeOfBirth],
      ["Race", data.race],
      ["Restrictions Code", data.restrictionsCode],
      ["Vehicle Class", data.vehicleClass],
      ["Weight Kg", data.weightKg],
      ["Weight Lbs", data.weightLbs],
      ["Card Revision Date", data.cardRevisionDate],
      ["Document Discriminator Number", data.documentDiscriminatorNumber],
      ["Barcode Data Elements", data.barcodeDataElements],
    ]);
  }

  if (capturedId.argentinaIdBarcodeResult) {
    header = "Argentinian ID Barcode Result";
    result += getMarkupForFields([
      ["Personal Id Number", capturedId.argentinaIdBarcodeResult.personalIdNumber],
      ["Document Copy", capturedId.argentinaIdBarcodeResult.documentCopy],
    ]);
  }

  if (capturedId.apecBusinessTravelCardMrzResult) {
    header = "APEC Business Travel Card MRZ Result";
    const data = capturedId.apecBusinessTravelCardMrzResult;
    result += getMarkupForFields([
      ["Document Code", data.documentCode],
      ["Captured MRZ", data.capturedMrz],
      ["Passport Number", data.passportNumber],
      ["Passport Issuer ISO", data.passportIssuerIso],
      ["Passport Date of Expiry", data.passportDateOfExpiry],
    ]);
  }

  if (capturedId.chinaMainlandTravelPermitMrzResult) {
    header = "China Mainland Travel Permit MRZ Result";
    const data = capturedId.chinaMainlandTravelPermitMrzResult;
    result += getMarkupForFields([
      ["Document Code", data.documentCode],
      ["Captured MRZ", data.capturedMrz],
      ["Personal ID Number", data.personalIdNumber],
      ["Renewal times", data.renewalTimes],
      ["Full Name Simplified Chinese", data.fullNameSimplifiedChinese],
      ["Omitted Character Count In GBK Name", data.omittedCharacterCountInGBKName],
      ["Omitted Name Count", data.omittedNameCount],
      ["Issuing Authority Code", data.issuingAuthorityCode],
    ]);
  }

  if (capturedId.chinaExitEntryPermitMrzResult) {
    header = "China Exit-Entry Permit MRZ Result";
    result += getMarkupForFields([
      ["Document Code", capturedId.chinaExitEntryPermitMrzResult.documentCode],
      ["Captured MRZ", capturedId.chinaExitEntryPermitMrzResult.capturedMrz],
    ]);
  }

  if (capturedId.chinaOneWayPermitFrontMrzResult) {
    header = "China One-Way Permit Front MRZ Result";
    const data = capturedId.chinaOneWayPermitFrontMrzResult;
    result += getMarkupForFields([
      ["Document Code", data.documentCode],
      ["Full Name in Simplified Chinese", data.fullNameSimplifiedChinese],
      ["Captured MRZ", data.capturedMrz],
    ]);
  }

  if (capturedId.chinaOneWayPermitBackMrzResult) {
    header = "China One-Way Permit Back MRZ Result";
    const data = capturedId.chinaOneWayPermitBackMrzResult;
    result += getMarkupForFields([
      ["Document Code", data.documentCode],
      ["Names Are Truncated", data.namesAreTruncated],
      ["Captured MRZ", data.capturedMrz],
    ]);
  }

  if (capturedId.colombiaIdBarcodeResult) {
    header = "Columbian ID Barcode Result";
    result += getMarkupForFields([["Blood Type", capturedId.colombiaIdBarcodeResult.bloodType]]);
  }

  if (capturedId.colombiaDlBarcodeResult) {
    header = "Columbian Driver License Barcode Result";
    result += getMarkupForFields([
      ["Identification Type", capturedId.colombiaDlBarcodeResult.identificationType],
      ["Categories", capturedId.colombiaDlBarcodeResult.categories],
    ]);
  }

  if (capturedId.mrzResult) {
    header = "MRZ Result";
    const data = capturedId.mrzResult;
    result += getMarkupForFields([
      ["Document Code", data.documentCode],
      ["Names Are Truncated", data.namesAreTruncated],
      ["Optional", data.optional],
      ["Optional1", data.optional1],
      ["Captured Mrz", data.capturedMrz],
    ]);
  }

  if (capturedId.southAfricaIdBarcodeResult) {
    header = "South African ID Barcode Result";
    const data = capturedId.southAfricaIdBarcodeResult;
    result += getMarkupForFields([
      ["Country Of Birth", data.countryOfBirth],
      ["Country Of Birth Iso", data.countryOfBirthIso],
      ["Citizenship Status", data.citizenshipStatus],
      ["Personal Id Number", data.personalIdNumber],
    ]);
  }

  if (capturedId.southAfricaDlBarcodeResult) {
    header = "South African Driver License Barcode Result";
    const data = capturedId.southAfricaDlBarcodeResult;
    result += getMarkupForFields([
      ["Version", data.version],
      ["License Country Of Issue", data.licenseCountryOfIssue],
      ["Personal Id Number", data.personalIdNumber],
      ["Personal Id Number Type", data.personalIdNumberType],
      ["Document Copy", data.documentCopy],
      ["Driver Restriction Codes", data.driverRestrictionCodes],
      ["Professional Driving Permit", data.professionalDrivingPermit],
      ["Vehicle Restrictions", data.vehicleRestrictions],
    ]);
  }

  if (capturedId.usUniformedServicesBarcodeResult) {
    header = "US Uniformed Services Barcode Result";
    const data = capturedId.usUniformedServicesBarcodeResult;
    result += getMarkupForFields([
      ["Blood Type", data.bloodType],
      ["Branch Of Service", data.branchOfService],
      ["Champus Effective Date", data.champusEffectiveDate],
      ["Champus Expiry Date", data.champusExpiryDate],
      ["Civilian Health Care Flag Code", data.civilianHealthCareFlagCode],
      ["Civilian Health Care Flag Description", data.civilianHealthCareFlagDescription],
      ["Commissary Flag Code", data.commissaryFlagCode],
      ["Commissary Flag Description", data.commissaryFlagDescription],
      ["Deers Dependent Suffix Code", data.deersDependentSuffixCode],
      ["Deers Dependent Suffix Description", data.deersDependentSuffixDescription],
      ["Direct Care Flag Code", data.directCareFlagCode],
      ["Direct Care Flag Description", data.directCareFlagDescription],
      ["Exchange Flag Code", data.exchangeFlagCode],
      ["Exchange Flag Description", data.exchangeFlagDescription],
      ["Eye Color", data.eyeColor],
      ["Family Sequence Number", data.familySequenceNumber],
      ["Form Number", data.formNumber],
      ["Geneva Convention Category", data.genevaConventionCategory],
      ["Hair Color", data.hairColor],
      ["Height", data.height],
      ["Jpeg Data", data.jpegData],
      ["Mwr Flag Code", data.mwrFlagCode],
      ["Mwr Flag Description", data.mwrFlagDescription],
      ["Pay Grade", data.payGrade],
      ["Person Designator Document", data.personDesignatorDocument],
      ["Rank", data.rank],
      ["Relationship Code", data.relationshipCode],
      ["Relationship Description", data.relationshipDescription],
      ["Security Code", data.securityCode],
      ["Service Code", data.serviceCode],
      ["Sponsor Flag", data.sponsorFlag],
      ["Sponsor Name", data.sponsorName],
      ["Sponsor Person Designator Identifier", data.sponsorPersonDesignatorIdentifier],
      ["Status Code", data.statusCode],
      ["Status Code Description", data.statusCodeDescription],
      ["Version", data.version],
      ["Weight", data.weight],
    ]);
  }

  if (capturedId.vizResult) {
    header = "VIZ Result";
    const data = capturedId.vizResult;
    result += getMarkupForFields([
      ["Additional Address Information", data.additionalAddressInformation],
      ["Additional Name Information", data.additionalNameInformation],
      ["Document Additional Number", data.documentAdditionalNumber],
      ["Employer", data.employer],
      ["Issuing Authority", data.issuingAuthority],
      ["Issuing Jurisdiction", data.issuingJurisdiction],
      ["Marital Status", data.maritalStatus],
      ["Personal Id Number", data.personalIdNumber],
      ["Place Of Birth", data.placeOfBirth],
      ["Profession", data.profession],
      ["Race", data.race],
      ["Religion", data.religion],
      ["Residential Status", data.residentialStatus],
      ["Captured Sides", data.capturedSides],
      ["Is Back Side Capture Supported", data.isBackSideCaptureSupported],
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
