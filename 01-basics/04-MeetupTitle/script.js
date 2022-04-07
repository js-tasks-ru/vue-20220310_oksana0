import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

const API_URL = 'https://course-vue.javascript.ru/api';

function fetchMeetupById(meetupId) {
  return fetch(`${API_URL}/meetups/${meetupId}`).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then((error) => {
        throw error;
      });
    }
  });
}

// Требуется создать Vue приложение
const Root = defineComponent({
  data() {
    return {
      title: '',
      meetupId: 1,
    };
  },
  watch: {
    meetupId: {
      immediate: true,
      handler(id) {
        fetchMeetupById(id).then((meetup) => {
          this.title = meetup.title;
        });
      },
    },
  },
});

const app = createApp(Root);
const vm = app.mount('#app');
window.vm = vm;
