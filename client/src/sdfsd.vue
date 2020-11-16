<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <div class="col-sm">
          <input
            class="form-control"
            v-model="description"
            type="text"
            placeholder="Escriba una descripción"
          />
        </div>
        <div class="col-sm">
          <a
            type="button"
            class="btn btn-info float-right mb-2"
            @click="addItem"
            :disabled="!description"
            >Info</a
          >
        </div>
      </div>
    </div>
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">descripcion</th>
          <th scope="col">acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in items" :key="item._id">
          <td>{{ item.description }}</td>
          <td>
            <a type="button" class="btn btn-danger" @click="removeItem(item, i)"
              >Delete</a
            >
            <button type="button" class="btn btn-primary">Primary</button>
          </td>
        </tr>
      </tbody>
    </table>
 
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "App",
  data: () => ({
    items: [],
    description: "",
    editedDescription: "",
    selected: {},
    value: "",
  }),

  async mounted() {
    const response = await axios.get("api/bucketListItems/");
    this.items = response.data;
  },
  computed: {},
  methods: {
 
    async addItem() {
      this.items.push(this.description);
      //  const response = await axios.post("api/bucketListItems/", {
      //    description: this.description,
      // });

      const response = await axios
        .post("api/bucketListItems/", {
          description: this.description,
        })
        .then((res) => {
          console.log(res);
         this.items.push(this.description);
        });

      // const response = await  axios.post("api/bucketListItems/", {
      //     description: this.description,
      //   }).then((res) => {
      //     console.log(res);
      //     this.items.push(res);
      //   });

      //  this.items.push(response.data);
      // this.description = "";
    },
    async removeItem(item, i) {
      await axios.delete("api/bucketListItems/" + item._id);
      this.items.splice(i, 1);
    },
    select(item) {
      this.selected = item;
      this.editedDescription = item.description;
    },
    isSelected(item) {
      return item._id === this.selected._id;
    },
    unselect() {
      this.selected = {};
      this.editedDescription = "";
    },
    async updateItem(item, i) {
      const response = await axios.put("api/bucketListItems/" + item._id, {
        description: this.editedDescription,
      });
      this.items[i] = response.data;
      this.unselect();
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
