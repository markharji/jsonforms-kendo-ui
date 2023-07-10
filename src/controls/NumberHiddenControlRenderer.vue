<template>
  <input
    :id="control.id + '-input'"
    :class="styles.control.input"
    :value="control.data"
    :disabled="!control.enabled"
    :autofocus="appliedOptions.focus"
    :placeholder="appliedOptions.placeholder"
    :default-value="0"
    @change="onChange"
    @focus="isFocused = true"
    @blur="isFocused = false"
    type="number"
    v-show="false"
  />
</template>

<script lang="ts">
import {
  ControlElement,
  JsonFormsRendererRegistryEntry,
  rankWith,
  isNumberControl,
} from "@jsonforms/core";
import { defineComponent } from "vue";
import {
  rendererProps,
  useJsonFormsControl,
  RendererProps,
} from "@jsonforms/vue";
import { useCustomControl } from "../util";

const controlRenderer = defineComponent({
  name: "NumberHiddenControlRenderer",
  components: {},
  props: {
    ...rendererProps<ControlElement>(),
  },
  setup(props: RendererProps<ControlElement>) {
    return useCustomControl(useJsonFormsControl(props), (target) =>
      target.value === "" ? undefined : Number(target.value)
    );
  },
});

export default controlRenderer;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: controlRenderer,
  tester: rankWith(1, isNumberControl),
};
</script>
