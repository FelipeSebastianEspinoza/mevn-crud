<template>
  <div id="app">
    <div class="notification" v-for="(item, i) in items" :key="item._id">
      <p>
        <span class="tag is-primary">{{ i + 1 }}</span>
        {{ item.description }}
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "App",
  data() {
    return {
      items: [],
      description: "",
    };
  },
  async mounted() {
    const response = await axios.get("api/bucketListItems/");
    this.items = response.data;
  },
  methods: {
    async addItem() {
      const response = await exios.post("api/bucketListItems/", {
        description: this.description,
      });
      this.items.push(response.data);
      this.description = "";
    },
  },
};
</script>

<style>
#app {
  margin: auto;
  margin-top: 3rem;
  max-width: 700px;
}
</style>
