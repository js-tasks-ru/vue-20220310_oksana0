<template>
  <div class="image-uploader">
    <label class="image-uploader__preview" :class="{ 'image-uploader__preview-loading': state === 'loading' }">
      <span v-if="state === 'empty'" class="image-uploader__text">Загрузить изображение</span>
      <span v-if="state === 'loading'" class="image-uploader__text">Загрузка...</span>
      <span v-if="preview || state === 'uploaded'" class="image-uploader__text">Удалить изображение</span>
      <input
        ref="input"
        v-bind="$attrs"
        type="file"
        accept="image/*"
        class="image-uploader__input"
        @change="handleChange"
        @click="handleClick"
      />
    </label>
  </div>
</template>

<script>
export default {
  name: 'UiImageUploader',

  inheritAttrs: false,

  props: {
    preview: String,
    uploader: Function,
  },

  emits: ['upload', 'remove', 'select', 'error'],

  data() {
    return {
      state: this.preview ? 'uploaded' : 'empty',
    };
  },

  computed: {
    previewUrl() {
      return this.preview ? 'url(' + this.preview + ')' : "url('/link.jpeg')";
    },
  },

  methods: {
    handleClick($event) {
      if (this.state === 'uploaded') {
        $event.preventDefault();
        this.handleClear();
      }
    },

    handleChange() {
      this.state = 'loading';
      const file = new File(this.$refs?.input?.files, 'newFile');

      if (this.uploader) {
        this.uploader(file)
          .then((res) => {
            this.$emit('upload', res);
          })
          .then(
            () => {
              this.state = 'uploaded';
            },
            (err) => {
              this.$emit('error', err);
              this.state = 'empty';
            },
          );
      } else {
        this.state = 'uploaded';
      }

      this.$emit('select', this.$refs?.input?.files[0]);
      this.$refs.input.value = null;
    },

    handleClear() {
      this.$refs['input'].value = null;
      this.$emit('remove');
      this.state = 'empty';
    },
  },
};
</script>

<style scoped>
.image-uploader {
  outline: 1px solid black;
}

.image-uploader__input {
  opacity: 0;
  height: 0;
}

.image-uploader__preview {
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), v-bind(previewUrl);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader__text {
  appearance: none;
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
