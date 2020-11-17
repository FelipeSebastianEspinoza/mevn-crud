<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6">
        <h2 class="text-center">Lista de usuarios</h2>
        <table class="table text-center">
          <thead>
            <tr>
              <th>id</th>
              <th>description</th>
              <th>actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, i) in items" :key="item._id">
              <td v-text="item._id"></td>
              <td>
                <input
                  class="column input"
                  v-if="isSelected(item)"
                  v-model="editedDescription"
                />
                <p v-else class="column">
                  <span class="tag is-primary"></span>
                  {{ item.description }}
                </p>
              </td>
              <td>
                <span
                  class="icon has-text-primary"
                  @click="isSelected(item) ? unselect() : select(item)"
                >
                  <i
                    class="btn"
                    v-bind:class="{
                      'btn-warning': isSelected(item),
                      'btn-info': !isSelected(item),
                    }"
                    >{{ isSelected(item) ? "close" : "edit" }}</i
                  >
                </span>

                <span
                  class="btn btn-danger"
                  @click="
                    isSelected(item) ? updateItem(item, i) : removeItem(item, i)
                  "
                >
                  <i>{{ isSelected(item) ? "save" : "delete" }}</i>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-md-6">
        <div class="form-group">
          <label>description</label>
          <input v-model="description" type="text" class="form-control" />
        </div>
        <button @click="addItem()" class="btn btn-success">Añadir</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "app",
  data() {
    return {
      items: [],
      description: "",
      editedDescription: "",
      selected: {},
    };
  },
  computed: {},
  async mounted() {
    const response = await axios.get("api/bucketListItems/");
    this.items = response.data;
  },
  methods: {
    async addItem() {
      var item = { description: this.description };
      await axios
        .post("api/bucketListItems/", {
          description: this.description,
        })
        .then((res) => {
          if (res.status == 200) {
            this.items.push(res.data);
            this.description = "";
          }
        })
        .catch((error) => {
          console.log("No se pudo crear el registro");
          console.log(error);
        });
    },
    async removeItem(item, i) {
       if(confirm("eliminar?")){
      await axios.delete("api/bucketListItems/" + item._id);
      this.items.splice(i, 1);
       }
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
       if(confirm("guardar cambios?")){
      const response = await axios.put("api/bucketListItems/" + item._id, {
        description: this.editedDescription,
      });
      this.items[i] = response.data;
      this.unselect();
       }
    },
  },
};
</script>
