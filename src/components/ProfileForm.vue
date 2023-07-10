<template>
  <h2>Profile Form</h2>

  <json-forms
    :data="data"
    :renderers="renderers"
    :schema="schema"
    :uischema="uischema"
    @change="onChange"
    :validationMode="'ValidateAndShow'"
  />

  <kbutton :theme-color="'success'" class="next-btn" :disabled="disable"
    >Next</kbutton
  >
</template>

<script lang="ts">
import { JsonForms, JsonFormsChangeEvent } from "@jsonforms/vue";
import { customRenderers } from "../renderers";
import { Button } from "@progress/kendo-vue-buttons";

interface profile {
  firstName: string;
  lastName: string;
  age: number;
  birthday: string;
  email: string;
}

export default {
  name: "HelloWorld",
  components: {
    JsonForms,
    kbutton: Button,
  },
  data() {
    return {
      // freeze renderers for performance gains
      renderers: Object.freeze(customRenderers),
      disable: true,
      data: { age: 0 } as profile,
      schema: {
        type: "object",
        properties: {
          firstName: {
            type: "string",
          },
          lastName: {
            type: "string",
          },
          birthday: {
            type: "string",
            format: "date",
          },
          age: {
            type: "number",
          },
          email: {
            type: "string",
            pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}",
          },
        },
        required: ["firstName", "lastName", "birthday"],
      },
      uischema: {
        type: "VerticalLayout",
        elements: [
          {
            type: "Control",
            scope: "#/properties/firstName",
            label: "First name",
          },
          {
            type: "Control",
            scope: "#/properties/lastName",
            label: "Last name",
          },
          {
            type: "Control",
            scope: "#/properties/birthday",
            label: "Birthday",
            options: {
              format: "date",
            },
          },
          {
            type: "Control",
            scope: "#/properties/age",
          },
          {
            type: "Control",
            scope: "#/properties/email",
            label: "Email",
            rule: {
              effect: "SHOW",
              condition: {
                scope: "#/properties/age",
                schema: { minimum: 18 },
              },
            },
          },
        ],
      },
    };
  },
  methods: {
    onChange(event: JsonFormsChangeEvent) {
      this.data = event.data as profile;
      this.calculateAge(event.data.birthday);
    },
    calculateAge(birthDate: Date) {
      if (!birthDate) return;

      console.log(birthDate.getFullYear());
      var currentDate = new Date();
      var yearDiff = currentDate.getFullYear() - birthDate.getFullYear();
      var monthDiff = currentDate.getMonth() - birthDate.getMonth();
      var dayDiff = currentDate.getDate() - birthDate.getDate();

      // Check if the current date is before the birth date
      if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        yearDiff--;
      }
      this.data.age = yearDiff;
      this.disable = false;
      return yearDiff;
    },
  },
};
</script>

<style scoped>
.next-btn {
  width: 100px;
  margin-top: 12px;
  height: 40px;
}
</style>
