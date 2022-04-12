<template>
  <div class="toasts">
    <ui-toast
      v-for="toast in toasts"
      :key="toast.timestamp"
      :type="toast.type"
      :timestamp="toast.timestamp"
      @hide="remove($event)"
    >
      {{ toast.message }}
    </ui-toast>
  </div>
</template>

<script>
import UiToast from './UiToast';

export default {
  name: 'TheToaster',

  components: { UiToast },

  data() {
    return {
      toasts: [],
    };
  },

  methods: {
    add(message, type) {
      this.toasts = [...this.toasts, { message, type, timestamp: Date.now() }];
    },
    remove(timestamp) {
      this.toasts = this.toasts.filter((toast) => toast.timestamp !== timestamp);
    },
    success(message) {
      this.add(message, 'success');
    },
    error(message) {
      this.add(message, 'error');
    },
  },
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}
</style>
