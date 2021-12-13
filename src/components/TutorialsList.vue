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
         <template v-slot:item = "{item, index}" >    
           <tr :key="index">
             <td><v-icon x-large color="error">mdi-close</v-icon></td>
             <td>
               <img   
            v-for="(image, i) in item.images"        
            height="50"
            width="50"
            :key="i"
            :src="'http://parser/images/1/'+image"           
          />  
          </td>
          <td>{{item.name}}</td>
          <td>{{item.color_name}}</td>
          <td> <v-icon small class="mr-2" @click="editTutorial(item.id)">mdi-pencil</v-icon>
            <v-icon small @click="deleteTutorial(item.id)">mdi-delete</v-icon></td>
            <td>

            
   <div class="pa-4 rounded-circle d-inline-block" style="background-color:red; border: 2px #f6f6f6 solid; cursor:pointer;" @click="changeColor(item.id, 'red')"
      ></div>
   <div class="pa-4 rounded-circle d-inline-block" style="background-color:white;  border: 2px #f6f6f6 solid; cursor:pointer;" @click="changeColor(item.id, 'red')"
      ></div>
   <div class="pa-4 rounded-circle d-inline-block" style="background-color:yellow;  border: 2px #f6f6f6 solid; cursor:pointer;" @click="changeColor(item.id, 'red')"
      ></div>
   <div class="pa-4 rounded-circle d-inline-block" style="background-color:blue;  border: 2px #f6f6f6 solid; cursor:pointer;" @click="changeColor(item.id, 'red')"
      ></div>
   <div class="pa-4 rounded-circle d-inline-block" style="background-color:green;  border: 2px #f6f6f6 solid; cursor:pointer;" @click="changeColor(item.id, 'red')"
      ></div>
   <div class="pa-4 rounded-circle d-inline-block" style="background-color:#f6f6f6;  border: 2px #f6f6f6 solid; cursor:pointer;" @click="changeColor(item.id, 'red')"
      ></div>
     
            </td>
           </tr>                 
            
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
<style scoped>
#rounded-card {
  border-radius: 50%; 
  min-height: 50px;
  min-width: 50px;
}
</style>

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
        { text: "Цыет выбран", align: "start", sortable: false, value: "images" },
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
