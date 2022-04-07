import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

// Создайте Vue приложение
const Root = defineComponent({
  name: 'Calculator',
  data() {
    return {
      operator: 'sum',
      operand_left: 0,
      operand_right: 0,
    };
  },
  computed: {
    operationResult() {
      switch (this.operator) {
        case 'sum':
          return this.operand_left + this.operand_right;
        case 'subtract':
          return this.operand_left - this.operand_right;
        case 'multiply':
          return this.operand_left * this.operand_right;
        case 'divide':
          return this.operand_left / this.operand_right;
        default:
          return 0;
      }
    },
  },
});

const app = createApp(Root);
const vm = app.mount('#app');
window.vm = vm;
