import { Presets } from "../Presets.js";
import { icons } from "./icons.js";

export const features = [
  {
    title: "Highlights",
    description: "Visualize scanned codes",
    icon: icons.highlights,
    preset: Presets.Highlights,
  },
  {
    title: "Info Annotations",
    description: "Show additional information",
    icon: icons.infoAnnotations,
    preset: Presets.InfoAnnotations,
  },
  {
    title: "Popovers",
    description: "Take action on scanned codes",
    icon: icons.popovers,
    preset: Presets.Popovers,
  },
  {
    title: "Status icons",
    description: "Provide short information",
    icon: icons.statusIcons,
    preset: Presets.StatusIcons,
  },
];
