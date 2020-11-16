<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6">
        <h2 class="text-center">Lista de usuarios</h2>
        <table class="table text-center">
          <thead>
            <tr>
              <th>description</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in items" :key="item.id">
              <td v-text="item.description"></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="col-md-6">
        <div class="form-group">
          <label>description</label>
          <input v-model="description" type="text" class="form-control" />
          <!-- este input estará relacionado con la variable description-->
        </div>
        <button @click="addItem()" class="btn btn-success">Añadir</button
        ><!--Este botón llama a la función guardar que hemos declarado en la parte script-->
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
      const response = await axios
        .post("api/bucketListItems/", {
          description: this.description,
        })
        .then((res) => {
          if (res.status == 200) {
            this.items.push(item);
            this.description = "";
          } 
        }).catch( error => {
    console.log( 'función enRechazo invocada: ', error );
  });
    },
    async removeItem(item, i) {
      await axios.delete("api/bucketListItems/" + item._id);
      this.items.splice(i, 1);
    },
  },
};
</script>
