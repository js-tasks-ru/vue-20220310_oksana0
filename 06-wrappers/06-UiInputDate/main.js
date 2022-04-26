import '@/assets/styles/app.css';
import '@/assets/styles/taskbook.css';

import { createApp } from 'vue';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import App from './App';

dayjs.extend(utc);

createApp(App).use(dayjs).mount('#app');
