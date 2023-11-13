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

  if (capturedId.idImageOfType(SDCId.IdImageType.Face) != null) {
    result.append(getDOMForLabel("Face"));
    const faceImage = new Image();
    faceImage.src = `data:image/png;base64,${capturedId.idImageOfType(SDCId.IdImageType.Face) ?? ""}`;
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
      ["Document Type", capturedId.documentType],
      ["Issuing Country ISO", capturedId.issuingCountryIso],
      ["Issuing Country", capturedId.issuingCountry],
      ["Document Number", capturedId.documentNumber],
      ["Date of Expiry", capturedId.dateOfExpiry],
      ["Is Expired", capturedId.isExpired],
      ["Date of Issue", capturedId.dateOfIssue],
    ])
  );

  if (capturedId.aamvaBarcodeResult) {
    header = "Aamva Barcode Result";
    const data = capturedId.aamvaBarcodeResult;
    result.append(
      getFragmentForFields([
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
      ])
    );
  }

  if (capturedId.argentinaIdBarcodeResult) {
    header = "Argentinian ID Barcode Result";
    result.append(
      getFragmentForFields([
        ["Personal Id Number", capturedId.argentinaIdBarcodeResult.personalIdNumber],
        ["Document Copy", capturedId.argentinaIdBarcodeResult.documentCopy],
      ])
    );
  }

  if (capturedId.apecBusinessTravelCardMrzResult) {
    header = "APEC Business Travel Card MRZ Result";
    const data = capturedId.apecBusinessTravelCardMrzResult;
    result.append(
      getFragmentForFields([
        ["Document Code", data.documentCode],
        ["Captured MRZ", data.capturedMrz],
        ["Passport Number", data.passportNumber],
        ["Passport Issuer ISO", data.passportIssuerIso],
        ["Passport Date of Expiry", data.passportDateOfExpiry],
      ])
    );
  }

  if (capturedId.chinaMainlandTravelPermitMrzResult) {
    header = "China Mainland Travel Permit MRZ Result";
    const data = capturedId.chinaMainlandTravelPermitMrzResult;
    result.append(
      getFragmentForFields([
        ["Document Code", data.documentCode],
        ["Captured MRZ", data.capturedMrz],
        ["Personal ID Number", data.personalIdNumber],
        ["Renewal times", data.renewalTimes],
        ["Full Name Simplified Chinese", data.fullNameSimplifiedChinese],
        ["Omitted Character Count In GBK Name", data.omittedCharacterCountInGBKName],
        ["Omitted Name Count", data.omittedNameCount],
        ["Issuing Authority Code", data.issuingAuthorityCode],
      ])
    );
  }

  if (capturedId.chinaExitEntryPermitMrzResult) {
    header = "China Exit-Entry Permit MRZ Result";
    result.append(
      getFragmentForFields([
        ["Document Code", capturedId.chinaExitEntryPermitMrzResult.documentCode],
        ["Captured MRZ", capturedId.chinaExitEntryPermitMrzResult.capturedMrz],
      ])
    );
  }

  if (capturedId.chinaOneWayPermitFrontMrzResult) {
    header = "China One-Way Permit Front MRZ Result";
    const data = capturedId.chinaOneWayPermitFrontMrzResult;
    result.append(
      getFragmentForFields([
        ["Document Code", data.documentCode],
        ["Full Name in Simplified Chinese", data.fullNameSimplifiedChinese],
        ["Captured MRZ", data.capturedMrz],
      ])
    );
  }

  if (capturedId.chinaOneWayPermitBackMrzResult) {
    header = "China One-Way Permit Back MRZ Result";
    const data = capturedId.chinaOneWayPermitBackMrzResult;
    result.append(
      getFragmentForFields([
        ["Document Code", data.documentCode],
        ["Names Are Truncated", data.namesAreTruncated],
        ["Captured MRZ", data.capturedMrz],
      ])
    );
  }

  if (capturedId.colombiaIdBarcodeResult) {
    header = "Columbian ID Barcode Result";
    result.append(getFragmentForFields([["Blood Type", capturedId.colombiaIdBarcodeResult.bloodType]]));
  }

  if (capturedId.colombiaDlBarcodeResult) {
    header = "Columbian Driver License Barcode Result";
    result.append(
      getFragmentForFields([
        ["Identification Type", capturedId.colombiaDlBarcodeResult.identificationType],
        ["Categories", capturedId.colombiaDlBarcodeResult.categories],
      ])
    );
  }

  if (capturedId.mrzResult) {
    header = "MRZ Result";
    const data = capturedId.mrzResult;
    result.append(
      getFragmentForFields([
        ["Document Code", data.documentCode],
        ["Names Are Truncated", data.namesAreTruncated],
        ["Optional", data.optional],
        ["Optional1", data.optional1],
        ["Captured Mrz", data.capturedMrz],
      ])
    );
  }

  if (capturedId.usVisaVIZResult) {
    header = "US Visa VIZ Result";
    const data = capturedId.usVisaVIZResult;
    result.append(
      getFragmentForFields([
        ["Visa Number", data.visaNumber],
        ["Passport Number", data.passportNumber],
      ])
    );
  }

  if (capturedId.southAfricaIdBarcodeResult) {
    header = "South African ID Barcode Result";
    const data = capturedId.southAfricaIdBarcodeResult;
    result.append(
      getFragmentForFields([
        ["Country Of Birth", data.countryOfBirth],
        ["Country Of Birth Iso", data.countryOfBirthIso],
        ["Citizenship Status", data.citizenshipStatus],
        ["Personal Id Number", data.personalIdNumber],
      ])
    );
  }

  if (capturedId.southAfricaDlBarcodeResult) {
    header = "South African Driver License Barcode Result";
    const data = capturedId.southAfricaDlBarcodeResult;
    result.append(
      getFragmentForFields([
        ["Version", data.version],
        ["License Country Of Issue", data.licenseCountryOfIssue],
        ["Personal Id Number", data.personalIdNumber],
        ["Personal Id Number Type", data.personalIdNumberType],
        ["Document Copy", data.documentCopy],
        ["Driver Restriction Codes", data.driverRestrictionCodes],
        ["Professional Driving Permit", data.professionalDrivingPermit],
        ["Vehicle Restrictions", data.vehicleRestrictions],
      ])
    );
  }

  if (capturedId.usUniformedServicesBarcodeResult) {
    header = "US Uniformed Services Barcode Result";
    const data = capturedId.usUniformedServicesBarcodeResult;
    result.append(
      getFragmentForFields([
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
      ])
    );
  }

  if (capturedId.commonAccessCardBarcodeResult) {
    header = "Common Access Card Barcode Result";
    const data = capturedId.commonAccessCardBarcodeResult;
    result.append(
      getFragmentForFields([
        ["version", data.version],
        ["person designator document", data.personDesignatorDocument],
        ["person designator type code", data.personDesignatorTypeCode],
        ["edi person identifier", data.ediPersonIdentifier],
        ["personnel category code", data.personnelCategoryCode],
        ["branch of service", data.branchOfService],
        ["personnel entitlement condition type", data.personnelEntitlementConditionType],
        ["rank", data.rank],
        ["play pan code", data.payPlanCode],
        ["play pan grade code", data.payPlanGradeCode],
        ["card instance identifier", data.cardInstanceIdentifier],
        ["person middle initial", data.personMiddleInitial],
      ])
    );
  }

  if (capturedId.vizResult) {
    header = "VIZ Result";
    const data = capturedId.vizResult;
    result.append(
      getFragmentForFields([
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
