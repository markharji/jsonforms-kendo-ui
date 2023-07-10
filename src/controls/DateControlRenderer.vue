<template>
  <template v-if="control.visible">
    <klabel
      :editor-id="control.id + '-input'"
      style="display: block; text-align: left; margin-top: 5px"
    >
      {{ control.label }}
    </klabel>

    <datepicker
      :style="{ width: '300px' }"
      :id="control.id + '-input'"
      :class="styles.control.input"
      :default-value="control.data"
      :value="control.data"
      :disabled="!control.enabled"
      :autofocus="appliedOptions.focus"
      :placeholder="appliedOptions.placeholder"
      @change="onChange"
      @focus="isFocused = true"
      @blur="isFocused = false"
      :format="'dd/MMM/yyyy'"
      :week-number="true"
      :size="'large'"
      :rounded="'medium'"
      :fill-mode="'outline'"
      :max="new Date()"
    >
    </datepicker>
  </template>
</template>

<script lang="ts">
import {
  ControlElement,
  JsonFormsRendererRegistryEntry,
  rankWith,
  isDateControl,
} from "@jsonforms/core";
import { defineComponent } from "vue";
import {
  rendererProps,
  useJsonFormsControl,
  RendererProps,
} from "@jsonforms/vue";

import { useCustomControl } from "../util";
import { DatePicker } from "@progress/kendo-vue-dateinputs";

const controlRenderer = defineComponent({
  name: "DateControlRenderer",
  components: {
    datepicker: DatePicker,
  },
  props: {
    ...rendererProps<ControlElement>(),
  },
  setup(props: RendererProps<ControlElement>) {
    return useCustomControl(
      useJsonFormsControl(props),
      (target: any) => target.value || undefined
    );
  },
});

export default controlRenderer;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: controlRenderer,
  tester: rankWith(2, isDateControl),
};
</script>
