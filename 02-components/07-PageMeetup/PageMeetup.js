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
          this.meetup = {};
        });
    },
  },

  template: `
    <div class="page-meetup">
      <template v-if="meetup">
        <meetup-view v-if="Object.keys(meetup).length" :meetup="meetup"></meetup-view>
        <ui-container v-else>
          <ui-alert>{{ errorText }}</ui-alert>
        </ui-container>
      </template>
      <ui-container v-else>
        <ui-alert>Загрузка...</ui-alert>
      </ui-container>
    </div>`,
});
