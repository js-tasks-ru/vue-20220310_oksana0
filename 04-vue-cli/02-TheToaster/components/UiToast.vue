<template>
  <div :class="{ toast: true, [`toast_${type}`]: type }">
    <ui-icon class="toast__icon" :icon="iconSrc" />
    <slot></slot>
    <!--    <button @click="hideToast">x</button>-->
  </div>
</template>

<script>
import { toastIcons } from './toasts';
import UiIcon from './UiIcon';

export default {
  name: 'UiToast',

  components: {
    UiIcon,
  },

  props: {
    type: String,
    timestamp: Number,
    message: String,
    timeout: {
      type: Number,
      default: 5000,
    },
  },

  emits: ['hide'],

  data() {
    return {
      timer: null,
    };
  },

  computed: {
    iconSrc() {
      return toastIcons[this.type];
    },
  },

  mounted() {
    this.timer = setTimeout(this.hideToast, this.timeout);
  },

  beforeUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  },

  methods: {
    hideToast() {
      this.$emit('hide', this.timestamp);
    },
  },
};
</script>

<style>
.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast + .toast {
  margin-top: 20px;
}

.toast__icon {
  margin-right: 12px;
}

.toast__type {
  text-transform: capitalize;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}
</style>
