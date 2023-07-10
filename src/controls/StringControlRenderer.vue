<template>
  <template v-if="control.visible">
    <floatinglabel
      :editor-id="control.id + '-input'"
      :editor-value="control.data"
      :label="control.label"
    >
      <KInput
        :style="{ width: '300px' }"
        :id="control.id + '-input'"
        :disabled="!control.enabled"
        :default-value="control.data"
        :autofocus="appliedOptions.focus"
        :placeholder="appliedOptions.placeholder"
        @change="onChange"
        @focus="isFocused = true"
        @blur="isFocused = false"
        :size="'large'"
        :rounded="'medium'"
        :fill-mode="'outline'"
      />
    </floatinglabel>

    <small class="alert" v-if="control.errors">{{
      displayError(control.label, control.errors)
    }}</small>
  </template>
</template>

<script lang="ts">
import {
  ControlElement,
  JsonFormsRendererRegistryEntry,
  rankWith,
  isStringControl,
} from "@jsonforms/core";
import { defineComponent } from "vue";
import {
  rendererProps,
  useJsonFormsControl,
  RendererProps,
} from "@jsonforms/vue";
import { useCustomControl } from "../util";
import { Input } from "@progress/kendo-vue-inputs";
import { FloatingLabel } from "@progress/kendo-vue-labels";

const controlRenderer = defineComponent({
  name: "StringControlRenderer",
  components: {
    KInput: Input,
    floatinglabel: FloatingLabel,
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
  methods: {
    displayError(label: string, error: string) {
      if (label.toLocaleLowerCase() === "email" && error.includes("pattern")) {
        return "Please Enter a valid email";
      }

      return `${label} ${error}`;
    },
  },
});

export default controlRenderer;

export const entry: JsonFormsRendererRegistryEntry = {
  renderer: controlRenderer,
  tester: rankWith(1, isStringControl),
};
</script>

<style scoped>
.alert {
  display: block;
  color: red;
  text-align: left;
  width: 300px;
}
</style>
