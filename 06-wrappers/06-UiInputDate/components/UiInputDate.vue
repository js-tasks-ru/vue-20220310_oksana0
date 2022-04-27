<template>
  <ui-input :modelValue="getFormattedDate" :type="type" @change="handleChange">
    <template v-for="slotName in Object.keys($slots)" #[slotName]>
      <slot :name="slotName" />
    </template>
  </ui-input>
</template>

<script>
import UiInput from './UiInput';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const formatMap = {
  time: 'HH:mm',
  date: 'YYYY-MM-DD',
  'datetime-local': 'YYYY-MM-DD[T]HH:mm',
};

export default {
  name: 'UiInputDate',

  components: { UiInput },

  props: {
    type: {
      type: String,
      default: 'date',
      validator: (value) => ['date', 'time', 'datetime-local'].includes(value),
    },
    modelValue: {
      type: String,
      default: null,
    },
  },

  emits: ['update:modelValue'],

  computed: {
    getFormattedDate() {
      return dayjs.utc(this.modelValue).format(formatMap[this.type]);
    },
  },

  methods: {
    handleChange($event) {
      this.$emit('update:modelValue', Date.parse(dayjs.utc($event.target.valueAsNumber)));
    },
  },
};
</script>
