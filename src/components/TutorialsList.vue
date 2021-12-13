<template>
  <v-row align="center" class="list px-3 mx-auto">
    <v-col cols="12" md="11">
      <v-text-field v-model="title" label="Поиск товара"></v-text-field>
    </v-col>

    <v-col cols="12" md="4">
      <v-btn small @click="searchTitle">
        Поиск
      </v-btn>
    </v-col>

    <v-col cols="12" sm="12">
      <v-card class="mx-auto" tile>
        <v-card-title>Товары</v-card-title>

        <v-data-table
          :headers="headers"
          :items="tutorials.data"
          disable-pagination
          :hide-default-footer="true"
        >
         <template v-slot:[`images`]="{ images }">
           <template v-for="(item, i) in images">            
            <v-img
            lazy-src="https://via.placeholder.com/150/0000FF/808080%20?Text=Digital.com"
            max-height="150"
            max-width="250"
            src="https://via.placeholder.com/150/0000FF/808080%20?Text=Digital.com"
            :key="i"
          ></v-img>
          </template>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editTutorial(item.id)">mdi-pencil</v-icon>
            <v-icon small @click="deleteTutorial(item.id)">mdi-delete</v-icon>
          </template>
        </v-data-table>

        <v-card-actions v-if="tutorials.data.length > 0" class="mr-auto ml-auto">
          <v-btn small color="success" :disabled="page===1" @click="prev()">
            Prev
          </v-btn>
           <v-btn small color="success" >
            {{page}}
          </v-btn>
           <v-btn small color="success" @click="next()" :disabled="page ===tutorials.last_page"  >
            Next
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import TutorialDataService from "../services/TutorialDataService";
export default {
  name: "tutorials-list",
  data() {
    return {
      tutorials: [],
      page: 1,
      title: "",
      headers: [
        { text: "Фото", align: "start", sortable: false, value: "images" },
        { text: "Название", align: "start", sortable: false, value: "name" },
        { text: "Описание", value: "description", sortable: false },
        { text: "Статус", value: "status", sortable: false },
        { text: "Действия", value: "actions", sortable: false },
      ],
    };
  },
  methods: {
    retrieveTutorials(page=1) {
      TutorialDataService.getAll(page)
        .then((response) => {
          //this.tutorials = response.data.map(this.getDisplayTutorial);
          this.tutorials = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    next() {
      this.page = this.page + 1
      TutorialDataService.getAll(this.page)
        .then((response) => {
          //this.tutorials = response.data.map(this.getDisplayTutorial);
          this.tutorials = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    prev() {
      this.page = this.page - 1
      TutorialDataService.getAll(this.page)
        .then((response) => {
          //this.tutorials = response.data.map(this.getDisplayTutorial);
          this.tutorials = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },


    refreshList() {
      this.retrieveTutorials();
    },

    removeAllTutorials() {
      TutorialDataService.deleteAll()
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    searchTitle() {
      TutorialDataService.findByTitle(this.title)
        .then((response) => {
          this.tutorials = response.data.map(this.getDisplayTutorial);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    editTutorial(id) {
      this.$router.push({ name: "tutorial-details", params: { id: id } });
    },

    deleteTutorial(id) {
      TutorialDataService.delete(id)
        .then(() => {
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    getDisplayTutorial(tutorial) {
      return {
        id: tutorial.id,
        title: tutorial.title.length > 30 ? tutorial.title.substr(0, 30) + "..." : tutorial.title,
        description: tutorial.description.length > 30 ? tutorial.description.substr(0, 30) + "..." : tutorial.description,
        status: tutorial.published ? "Published" : "Pending",
      };
    },
  },
  mounted() {
    this.retrieveTutorials();
  },
};
</script>

<style>
.list {
  max-width: 1200px;
}
</style>
