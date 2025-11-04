<script lang="ts">
  import SidebarRoute from "@/settings/SidebarRoute.svelte";
  import {
    type IdCaptureDocument,
    type IdCaptureSettings,
    type RegionSpecificSubtype,
    Region,
    DriverLicense,
    HealthInsuranceCard,
    IdCaptureDocumentType,
    IdCard,
    Passport,
    RegionSpecific,
    ResidencePermit,
    VisaIcao,
  } from "@scandit/web-datacapture-id";
  import { idCaptureApplyingSettingStore, idCaptureSettingsStore } from "./store";
  import Spinner from "@/components/atoms/Spinner.svelte";
  import { derived } from "svelte/store";
  import DocumentAndRegion from "@/components/molecules/DocumentAndRegion.svelte";
  import RegionSpecificDocument from "./RegionSpecificDocument.svelte";
  import { assertUnreachable } from "@/helper";

  export let title: string;
  export let getDocuments: (idCaptureSettings: IdCaptureSettings) => IdCaptureDocument[];
  export let updateDocuments: (documents: IdCaptureDocument[]) => Promise<void>;

  const allDocumentTypes = Object.values(IdCaptureDocumentType);
  const normalizedDocumentsAndRegions = derived(idCaptureSettingsStore, (settings) => {
    return allDocumentTypes
      .filter((type) => type !== IdCaptureDocumentType.RegionSpecific)
      .map((type) => ({
        type,
        regions: getRegionsFromDocuments(getDocumentsForType(type, getDocuments(settings))),
        enabled: isDocumentTypeEnabled(type, getDocuments(settings)),
      }));
  });

  function isDocumentTypeEnabled(type: IdCaptureDocumentType, documents: IdCaptureDocument[]): boolean {
    return documents.some((document) => document.documentType === type);
  }

  function getDocumentsForType(type: IdCaptureDocumentType, documents: IdCaptureDocument[]): IdCaptureDocument[] {
    return documents.filter((document) => document.documentType === type);
  }

  function getRegionsFromDocuments(documents: IdCaptureDocument[]) {
    if (documents.length > 0) {
      return Array.from(
        documents.reduce((bucket, current) => {
          bucket.add(current.region);
          return bucket;
        }, new Set<Region>())
      );
    }
    return [Region.Any];
  }

  function getDocumentInstanceFromType(
    type: IdCaptureDocumentType,
    region: Region,
    subtype?: RegionSpecificSubtype
  ): IdCaptureDocument {
    switch (type) {
      case IdCaptureDocumentType.DriverLicense:
        return new DriverLicense(region);
      case IdCaptureDocumentType.IdCard:
        return new IdCard(region);
      case IdCaptureDocumentType.HealthInsuranceCard:
        return new HealthInsuranceCard(region);
      case IdCaptureDocumentType.Passport:
        return new Passport(region);
      case IdCaptureDocumentType.ResidencePermit:
        return new ResidencePermit(region);
      case IdCaptureDocumentType.VisaIcao:
        return new VisaIcao(region);
      case IdCaptureDocumentType.RegionSpecific:
        if (subtype == null) {
          throw new Error("RegionSpecific document type requires a subtype");
        }
        return new RegionSpecific(subtype);
      default:
        assertUnreachable(type);
    }
  }

  async function onUpdated(type: IdCaptureDocumentType, enabled: boolean, regions: Region[]) {
    let acceptedDocuments = [...getDocuments($idCaptureSettingsStore)];

    // remove all documents of this type to start clean
    acceptedDocuments = acceptedDocuments.filter((document) => document.documentType !== type);

    if (enabled) {
      // add new document for each region
      for (const region of regions) {
        acceptedDocuments.push(getDocumentInstanceFromType(type, region));
      }
    }
    await updateDocuments(acceptedDocuments);
  }
</script>

<SidebarRoute backRoute="/settings/id-capture">
  <svelte:fragment slot="header">
    <h2 class="font-bold flex items-center gap-4">
      {title}
      {#if $idCaptureApplyingSettingStore}<Spinner size="1em" />{/if}
    </h2>
  </svelte:fragment>
  <svelte:fragment slot="content">
    {#each $normalizedDocumentsAndRegions as documentAndRegions}
      <section>
        <DocumentAndRegion
          regions={documentAndRegions.regions}
          type={documentAndRegions.type}
          checked={documentAndRegions.enabled}
          disabled={$idCaptureApplyingSettingStore}
          onChange={onUpdated}
        />
      </section>
    {/each}
    <!-- Region specific case -->
    <section>
      <RegionSpecificDocument {getDocuments} {updateDocuments} />
    </section>
  </svelte:fragment>
</SidebarRoute>
