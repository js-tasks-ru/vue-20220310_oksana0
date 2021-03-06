import { defineComponent } from './vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import MeetupView from '../06-MeetupView/MeetupView.js';
import { fetchMeetupById } from './meetupService.js';

export default defineComponent({
  name: 'PageMeetup',

  components: {
    UiAlert,
    UiContainer,
    MeetupView,
  },

  props: {
    meetupId: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      meetup: null,
      errorText: '',
    };
  },

  watch: {
    meetupId: {
      handler() {
        this.fetchMeetup();
      },
      immediate: true,
    },
  },

  methods: {
    fetchMeetup() {
      this.meetup = null;
      fetchMeetupById(this.meetupId)
        .then((res) => {
          this.meetup = res;
        })
        .catch((err) => {
          this.errorText = err.message;
        });
    },
  },

  template: `
    <div class="page-meetup">
        <meetup-view v-if="meetup" :meetup="meetup"></meetup-view>
        <ui-container v-else-if="errorText">
          <ui-alert>{{ errorText }}</ui-alert>
        </ui-container>
        <ui-container v-else>
          <ui-alert>Загрузка...</ui-alert>
        </ui-container>
    </div>`,
});
