import { entry as stringControlRendererEntry } from "./StringControlRenderer.vue";
import { entry as dateControlRendererEntry } from "./DateControlRenderer.vue";
import { entry as numberHiddenControlRenderer } from "./NumberHiddenControlRenderer.vue";

export const controlRenderers = [
  stringControlRendererEntry,
  dateControlRendererEntry,
  numberHiddenControlRenderer,
];
