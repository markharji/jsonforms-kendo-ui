import { controlRenderers } from "./controls";
import { layoutRenderers } from "./layouts";

export const customRenderers = [...controlRenderers, ...layoutRenderers];
