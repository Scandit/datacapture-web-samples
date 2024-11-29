import * as SDCId from "@scandit/web-datacapture-id";

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
      ["Document Additional Number", capturedId.documentAdditionalNumber],
      ["Date of Expiry", capturedId.dateOfExpiry],
      ["Is Expired", capturedId.isExpired],
      ["Date of Issue", capturedId.dateOfIssue],
    ])
  );

  if (capturedId.barcode) {
    header = "Barcode Result";
    const data = capturedId.barcode;
    result.append(
      getFragmentForFields([
        ["AAMVA Version", data.aamvaVersion],
        ["Alias Family Name", data.aliasFamilyName],
        ["Alias Given Name", data.aliasGivenName],
        ["Alias Suffix Name", data.aliasSuffixName],
        ["Blood Type", data.bloodType],
        ["Branch Of Service", data.branchOfService],
        ["Card Instance Identifier", data.cardInstanceIdentifier],
        ["Card Revision Date", data.cardRevisionDate],
        ["Categories", data.categories],
        ["Champus Effective Date", data.champusEffectiveDate],
        ["Champus Expiry Date", data.champusExpiryDate],
        ["Citizenship Status", data.citizenshipStatus],
        ["Civilian Health Care Flag Code", data.civilianHealthCareFlagCode],
        ["Civilian Health Care Flag Description", data.civilianHealthCareFlagDescription],
        ["Commissary Flag Code", data.commissaryFlagCode],
        ["Commissary Flag Description", data.commissaryFlagDescription],
        ["Country Of Birth", data.countryOfBirth],
        ["Country Of Birth Iso", data.countryOfBirthIso],
        ["Deers Dependent Suffix Code", data.deersDependentSuffixCode],
        ["Deers Dependent Suffix Description", data.deersDependentSuffixDescription],
        ["Direct Care Flag Code", data.directCareFlagCode],
        ["Direct Care Flag Description", data.directCareFlagDescription],
        ["Document Copy", data.documentCopy],
        ["Document Discriminator Number", data.documentDiscriminatorNumber],
        ["Driver Name Prefix", data.driverNamePrefix],
        ["Driver Name Suffix", data.driverNameSuffix],
        ["Driver Restriction Codes", data.driverRestrictionCodes],
        ["Edi Person Identifier", data.ediPersonIdentifier],
        ["Endorsements Code", data.endorsementsCode],
        ["Exchange Flag Code", data.exchangeFlagCode],
        ["Exchange Flag Description", data.exchangeFlagDescription],
        ["Eye Color", data.eyeColor],
        ["Family Sequence Number", data.familySequenceNumber],
        ["First Name Truncation", data.firstNameTruncation],
        ["First Name Without Middle Name", data.firstNameWithoutMiddleName],
        ["Form Number", data.formNumber],
        ["Geneva Convention Category", data.genevaConventionCategory],
        ["Hair Color", data.hairColor],
        ["Height Cm", data.heightCm],
        ["Height Inch", data.heightInch],
        ["Iin", data.IIN],
        ["Identification Type", data.identificationType],
        ["Issuing Jurisdiction", data.issuingJurisdiction],
        ["Issuing Jurisdiction Iso", data.issuingJurisdictionIso],
        ["Jpeg Data", data.jpegData],
        ["Jurisdiction Version", data.jurisdictionVersion],
        ["Last Name Truncation", data.lastNameTruncation],
        ["License Country Of Issue", data.licenseCountryOfIssue],
        ["Middle Name", data.middleName],
        ["Middle Name Truncation", data.middleNameTruncation],
        ["Mwr Flag Code", data.mwrFlagCode],
        ["Mwr Flag Description", data.mwrFlagDescription],
        ["Pay Grade", data.payGrade],
        ["Pay Plan Code", data.payPlanCode],
        ["Pay Plan Grade Code", data.payPlanGradeCode],
        ["Person Designator Document", data.personDesignatorDocument],
        ["Person Designator Type Code", data.personDesignatorTypeCode],
        ["Person Middle Initial", data.personMiddleInitial],
        ["Personal Id Number", data.personalIdNumber],
        ["Personal Id Number Type", data.personalIdNumberType],
        ["Personnel Category Code", data.personnelCategoryCode],
        ["Personnel Entitlement Condition Type", data.personnelEntitlementConditionType],
        ["Place Of Birth", data.placeOfBirth],
        ["Professional Driving Permit", data.professionalDrivingPermit],
        ["Race", data.race],
        ["Rank", data.rank],
        ["Relationship Code", data.relationshipCode],
        ["Relationship Description", data.relationshipDescription],
        ["Restrictions Code", data.restrictionsCode],
        ["Security Code", data.securityCode],
        ["Service Code", data.serviceCode],
        ["Sponsor Flag", data.sponsorFlag],
        ["Sponsor Name", data.sponsorName],
        ["Sponsor Person Designator Identifier", data.sponsorPersonDesignatorIdentifier],
        ["Status Code", data.statusCode],
        ["Status Code Description", data.statusCodeDescription],
        ["Vehicle Class", data.vehicleClass],
        ["Vehicle Restrictions", data.vehicleRestrictions],
        ["Version", data.version],
        ["Weight Kg", data.weightKg],
        ["Weight Lbs", data.weightLbs],
        ["Is Real Id", data.isRealId],
        ["Dictionary", data.barcodeDataElements],
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
        ["Personal ID Number", data.personalIdNumber],
        ["Renewal times", data.renewalTimes],
        ["Full Name Simplified Chinese", data.fullNameSimplifiedChinese],
        ["Omitted Character Count In GBK Name", data.omittedCharacterCountInGbkName],
        ["Omitted Name Count", data.omittedNameCount],
        ["Issuing Authority Code", data.issuingAuthorityCode],
        ["Passport Number", data.passportNumber],
        ["Passport Issuer ISO", data.passportIssuerIso],
        ["Passport Date of Expiry", data.passportDateOfExpiry],
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
        ["Blood Type", data.bloodType],
        ["Sponsor", data.sponsor],
        ["Captured Sides", data.capturedSides],
        ["Is Back Side Capture Supported", data.isBackSideCaptureSupported],
        ["Visa Number", data.visaNumber],
        ["Passport Number", data.passportNumber],
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
