import * as SDCId from "@scandit/web-datacapture-id";
import type { VerificationResult } from ".";

export enum Action {
  CLOSE_RESULT = "CLOSE_RESULT",
  CLOSE_WARNING = "CLOSE_WARNING",
}

export const elements = {
  dataCaptureView: document.getElementById("data-capture-view") as HTMLDivElement,
  alert: document.getElementById("alert") as HTMLDivElement,
  result: document.getElementById("result") as HTMLDivElement,
  resultContent: document.getElementById("result-content") as HTMLDivElement,
  resultHeader: document.getElementById("result-header") as HTMLDivElement,
  resultFooter: document.getElementById("result-footer") as HTMLDivElement,
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

const svgIcons = {
  warn: `
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M10.0066 20C8.02745 20.0026 6.09206 19.4174 4.44584 18.3187C2.79961 17.22 1.5167 15.6572 0.759759 13.8285C0.00281289 11.9998 -0.19408 9.98747 0.194044 8.04671C0.582167 6.10594 1.53783 4.32412 2.93986 2.92716C3.86788 1.99913 4.96961 1.26299 6.18213 0.760744C7.39465 0.258501 8.69422 0 10.0066 0C11.3191 0 12.6186 0.258501 13.8312 0.760744C15.0437 1.26299 16.1454 1.99913 17.0734 2.92716C18.0015 3.85518 18.7376 4.95691 19.2398 6.16943C19.7421 7.38195 20.0006 8.68152 20.0006 9.99394C20.0006 11.3064 19.7421 12.6059 19.2398 13.8185C18.7376 15.031 18.0015 16.1327 17.0734 17.0607C16.1484 17.9936 15.0475 18.7337 13.8344 19.2382C12.6214 19.7427 11.3204 20.0017 10.0066 20ZM10.0066 2.48939C8.52238 2.48939 7.07146 2.92953 5.83734 3.75414C4.60322 4.57875 3.64135 5.7508 3.07334 7.12208C2.50534 8.49335 2.35673 10.0023 2.64629 11.458C2.93586 12.9137 3.6506 14.2509 4.70013 15.3005C5.74966 16.35 7.08684 17.0647 8.54258 17.3543C9.99832 17.6439 11.5072 17.4952 12.8785 16.9272C14.2498 16.3592 15.4218 15.3974 16.2464 14.1632C17.0711 12.9291 17.5112 11.4782 17.5112 9.99394C17.5089 8.00432 16.7175 6.09686 15.3106 4.68998C13.9037 3.28311 11.9963 2.49171 10.0066 2.48939ZM11.2574 5.9909C11.2574 5.43861 10.8097 4.9909 10.2574 4.9909H9.75592C9.20363 4.9909 8.75592 5.43861 8.75592 5.9909V10.2447C8.75592 10.797 9.20363 11.2447 9.75592 11.2447H10.2574C10.8097 11.2447 11.2574 10.797 11.2574 10.2447V5.9909ZM11.2574 13.7462C11.2574 14.437 10.6975 14.997 10.0067 14.997C9.3159 14.997 8.75592 14.437 8.75592 13.7462C8.75592 13.0554 9.3159 12.4954 10.0067 12.4954C10.6975 12.4954 11.2574 13.0554 11.2574 13.7462Z" fill="#FA4446"/>
    </svg>`,
  checkmark: `
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M4.4443 18.3147C6.08879 19.4135 8.02219 20 10 20C12.6513 19.997 15.1931 18.9425 17.0678 17.0678C18.9425 15.1931 19.997 12.6513 20 10C20 8.02219 19.4135 6.08879 18.3147 4.4443C17.2159 2.79981 15.6541 1.51809 13.8268 0.761209C11.9996 0.00433284 9.98891 -0.1937 8.0491 0.192152C6.10929 0.578004 4.32746 1.53041 2.92894 2.92894C1.53041 4.32746 0.578004 6.10929 0.192152 8.0491C-0.1937 9.98891 0.00433284 11.9996 0.761209 13.8268C1.51809 15.6541 2.79981 17.2159 4.4443 18.3147ZM5.83323 3.76398C7.0666 2.93987 8.51664 2.5 10 2.5C11.9884 2.50232 13.8947 3.29324 15.3007 4.69926C16.7068 6.10528 17.4977 8.01159 17.5 10C17.5 11.4834 17.0601 12.9334 16.236 14.1668C15.4119 15.4001 14.2406 16.3614 12.8701 16.9291C11.4997 17.4968 9.99168 17.6453 8.53683 17.3559C7.08197 17.0665 5.7456 16.3522 4.6967 15.3033C3.64781 14.2544 2.9335 12.918 2.64411 11.4632C2.35473 10.0083 2.50325 8.50032 3.07091 7.12988C3.63856 5.75943 4.59986 4.58809 5.83323 3.76398ZM8.04289 13.5604C8.43341 13.9509 9.06658 13.9509 9.4571 13.5604L14.8104 8.20711C15.2009 7.81658 15.2009 7.18342 14.8104 6.79289L14.4571 6.43961C14.0666 6.04908 13.4334 6.04908 13.0429 6.43961L8.75 10.7325L6.9571 8.93961C6.56658 8.54908 5.93341 8.54908 5.54289 8.93961L5.1896 9.29289C4.79908 9.68342 4.79908 10.3166 5.1896 10.7071L8.04289 13.5604Z" fill="#28D380"/>
    </svg>`,
  timer: `
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.0066 20C8.02745 20.0026 6.09206 19.4174 4.44584 18.3187C2.79961 17.22 1.5167 15.6572 0.759759 13.8285C0.00281288 11.9998 -0.19408 9.98747 0.194044 8.04671C0.582167 6.10594 1.53783 4.32412 2.93986 2.92716C3.86788 1.99913 4.96961 1.26299 6.18213 0.760744C7.39465 0.258501 8.69422 9.77832e-09 10.0066 0C11.3191 -9.77831e-09 12.6186 0.258501 13.8312 0.760744C15.0437 1.26299 16.1454 1.99913 17.0734 2.92716C18.0015 3.85518 18.7376 4.95691 19.2398 6.16943C19.7421 7.38195 20.0006 8.68152 20.0006 9.99394C20.0006 11.3064 19.7421 12.6059 19.2398 13.8185C18.7376 15.031 18.0015 16.1327 17.0734 17.0607C16.1484 17.9936 15.0475 18.7337 13.8344 19.2382C12.6214 19.7427 11.3204 20.0017 10.0066 20ZM10.0066 2.48939C8.52238 2.48939 7.07146 2.92953 5.83734 3.75414C4.60322 4.57875 3.64135 5.7508 3.07334 7.12208C2.50534 8.49335 2.35673 10.0023 2.64629 11.458C2.93586 12.9137 3.6506 14.2509 4.70013 15.3005C5.74966 16.35 7.08684 17.0647 8.54258 17.3543C9.99832 17.6439 11.5072 17.4952 12.8785 16.9272C14.2498 16.3592 15.4218 15.3974 16.2464 14.1632C17.0711 12.9291 17.5112 11.4782 17.5112 9.99394C17.5089 8.00432 16.7175 6.09686 15.3106 4.68998C13.9037 3.28311 11.9963 2.49171 10.0066 2.48939Z" fill="#FBC02C"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M8.75592 6.24166C8.75592 5.55089 9.3159 4.99091 10.0067 4.99091C10.6975 4.99091 11.2574 5.55089 11.2574 6.24166V9.36856L13.759 9.36856C14.4497 9.36856 15.0097 9.92854 15.0097 10.6193C15.0097 11.3101 14.4497 11.8701 13.759 11.8701H10.626C9.59318 11.8701 8.75592 11.0328 8.75592 10V9.36856V6.24166Z" fill="#FBC02C"/>
    </svg>
  `,
};

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

function getPanel(
  type: "passed" | "timer" | "warn",
  text: string,
  extraAttributes: Record<string, string> = {}
): DocumentFragment {
  let iconType: keyof typeof svgIcons = "checkmark";
  if (type === "warn") iconType = "warn";
  if (type === "timer") iconType = "timer";

  const fragment = document.createDocumentFragment();
  const panel = document.createElement("div");
  panel.classList.add("panel", `panel--${type}`);
  for (const [key, value] of Object.entries(extraAttributes)) {
    panel.setAttribute(key, value);
  }
  const content = document.createElement("p");
  content.className = "panel-content";
  // eslint-disable-next-line no-unsanitized/property
  content.innerHTML = svgIcons[iconType];
  panel.append(content);

  const textElement = document.createElement("span");
  textElement.textContent = text;
  content.append(textElement);

  fragment.append(panel);

  return fragment;
}

export async function showResult(capturedId: SDCId.CapturedId, verificationResult: VerificationResult): Promise<void> {
  let header = "";
  const result = document.createDocumentFragment();

  const { isExpired, aamvaBarcodeVerificationResult, dataConsistencyResult } = verificationResult;

  result.append(isExpired ? getPanel("warn", "Document is expired.") : getPanel("passed", "Document is not expired."));

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const dataConsistency = await dataConsistencyResult;

  // Data consistency verification result
  if (dataConsistency === null) {
    result.append(getPanel("warn", "No result for verification."));
  } else if (dataConsistency.allChecksPassed) {
    result.append(getPanel("passed", "Information on front and back matches."));
  } else {
    result.append(getPanel("warn", "Information on front and back does not match."));
    const frontReviewImage = await dataConsistency.frontReviewImage();
    if (frontReviewImage !== "") {
      result.append(getDOMForLabel("Front Review Image"));
      const mismatchImage = new Image();
      mismatchImage.className = "id-mismatch-image";
      mismatchImage.src = frontReviewImage;
      result.append(mismatchImage);
    }
  }

  if (!isExpired) {
    // AAMVA verification result is asynchronous, we schedule the update of the DOM when the result arrives
    result.append(
      getPanel("timer", "Information verification in progress...", { "data-js-id": "barcode-verification-result" })
    );
    try {
      const barcodeVerificationResult = await aamvaBarcodeVerificationResult;

      let barcodeVerificationResultBlock: DocumentFragment;
      // eslint-disable-next-line promise/always-return
      if (barcodeVerificationResult.error != null) {
        barcodeVerificationResultBlock = getPanel(
          "warn",
          "An error was encountered when trying to connect to the verification service. Please make sure that the device has internet access and your Scandit license key permits barcode verification."
        );
      } else if (barcodeVerificationResult.allChecksPassed) {
        barcodeVerificationResultBlock = getPanel("passed", "Verifications checks passed.");
      } else {
        barcodeVerificationResultBlock = getPanel("warn", "Verification checks failed.");
      }
      // eslint-disable-next-line no-unsanitized/property
      result.querySelector(`[data-js-id="barcode-verification-result"]`)!.replaceWith(barcodeVerificationResultBlock);
    } catch (error: unknown) {
      console.log(error);
      // eslint-disable-next-line no-unsanitized/property
      result
        .querySelector(`[data-js-id="barcode-verification-result"]`)!
        .replaceWith(getPanel("warn", "No result for barcode verification."));
    }
  }

  if (capturedId.images.face != null) {
    result.append(getDOMForLabel("Face"));
    const faceImage = new Image();
    faceImage.className = "id-face-image";
    faceImage.addEventListener("load", () => {
      faceImage.style.clipPath = `circle(${faceImage.width / 2}px)`;
    });
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
