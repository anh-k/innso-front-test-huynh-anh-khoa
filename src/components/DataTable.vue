<template>
  <div class="dataTable">

<!-- Author : HUYNH Anh-Khoa -->

  <h3>Test technique front : HUYNH Anh-Khoa</h3>

<!-- Specific datas filter components -->

<b-container class="filterContainer">

  <span class="filterLabel">Filtres : </span>
  <b-row class="filterRows">


   <input type="text" v-model='searchLastName' placeholder="Nom">
   <input type="text" v-model='searchFirstName' placeholder="Prénom">
   <input type="text" v-model='searchEmail' placeholder="Email">
   <input type="text" v-model='searchCountry' placeholder="Code pays">
   <input type="number" v-model='searchPhone' placeholder="Téléphone">
   <input type="number" class="birthdayInput" v-model='searchBirthday' placeholder="Année de naissance" :min="new Date().getFullYear() - 120" :max="new Date().getFullYear()">
   <input type="text" v-model='searchLastComment' placeholder="Dernier commentaire">
   

  </b-row>
</b-container>

  <b-button squared variant="outline-dark" size="sm" class="clearFiltersButton" @click="clearFilters">Effacer les filtres</b-button>
  
<div class="overflow-auto">

<!-- Main data table component -->

    <b-table
      class="dataTable"
      responsive
      :items="filteredDatas"
      :per-page="perPage"
      :current-page="currentPage"
      :fields="tableFields"
       :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      outlined
      small 
      striped
      hover
      caption-top
      sticky-header="35rem"
      no-border-collapse
      fixed
    >


  <template #table-caption>

<!-- Global search component -->

    <label for='searchField' class="ml-2">Recherche : </label>
    <input type='text' id='searchField' v-model='searchField' class='searchField' placeholder="Entrer un texte">

  </template>

   <template v-slot:table-colgroup>

<!-- Custom columns style -->

    <col style="width: 3rem">
    <col style="width: 15rem">
    <col style="width: 10rem">
    <col style="width: 15rem">
    <col style="width: 8rem">
    <col style="width: 10rem">
    <col style="width: 10rem">
    <col style="width: 5rem">
    <col style="width: 5rem">
    <col style="width: 10rem">
    <col style="width: 10rem">
    <col style="width: 15rem">
    <col style="width: 15rem">
    <col style="width: 8rem">

  </template>
   
<!-- Retrieve datas in cells -->

      <template #cell(id)="data">
        <b> {{ data.item.id }}</b>
      </template>

      <template #cell(last_name)="data">
        <b> {{ data.item }}</b>
      </template>

      <template #cell(first_name)="data">
        <b>{{ data.item }}</b>
      </template>

      <template #cell(email)="data" class="emailField">
        <b>{{ data.item }}</b>
      </template>

      <template #cell(country_code)="data">
        <b>{{ data.item }}</b>
      </template>

      <template #cell(phone)="data">
        <b>{{ data.item }}</b>
      </template>

      <template #cell(birthday)="data">
        <b>{{ data.item.customer.birthday | formatDate}}</b>
      </template>

       <template #cell(contact_channel)="data">
          <b v-if="data.item.contact_channel === 'facebook'"><i class="fab fa-facebook"></i></b>
          <b v-else-if="data.item.contact_channel === 'messenger'"><i class="fab fa-facebook-messenger"></i></b>
          <b v-else-if="data.item.contact_channel === 'twiter'"><i class="fab fa-twitter"></i></b>
          <b v-else-if="data.item.contact_channel === 'file'"><i class="fas fa-file"></i></b>
          <b v-else-if="data.item.contact_channel === 'form'"><i class="fab fa-wpforms"></i></b>
      </template>

       <template #cell(status)="data">
          <b v-if="data.item.status === 'inProgress'"><b-badge href="#" variant="info"> En cours</b-badge></b>
          <b v-else-if="data.item.status === 'waiting'"><b-badge href="#" variant="warning"> En attente</b-badge></b>
          <b v-else-if="data.item.status === 'reserved'"><b-badge href="#" variant="light"> Réservé</b-badge></b>
          <b v-else-if="data.item.status === 'toTreat'"><b-badge href="#" variant="danger"> A traiter</b-badge></b>
          <b v-else-if="data.item.status === 'finished'"><b-badge href="#" variant="success"> Terminé</b-badge></b>
          <b v-else><b-badge href="#" variant="dark"> Undefined</b-badge></b>

          
      </template>

      <template #cell(interaction_creation_date)="data">
        <b>{{ data.item.interaction_creation_date | formatDate}}</b>
      </template>

      <template #cell(due_date)="data">
        <b>{{ data.item.due_date | formatDate}}</b>
      </template>

    

      <template #cell(last_comment)="data">
        <b class="lastCommentText"><span>{{ data.item.last_comment }}</span></b>
      </template>
      

      <template #cell(assignedTO)="data">
        <b>{{ data.item.assignedTO }}</b>
      </template>

         <template #cell(attachments)="data">
        <b><a :href="data.item.attachments"><i class="fas fa-download"></i></a></b>
      </template>

    </b-table>

<!-- Pagination component -->

    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table"
      class="paginationTable"
    ></b-pagination>

  </div>

  </div>
</template>

<script>

import axios from 'axios';

export default {
  data() {
    return {

// Initialize datas
perPage: 20,
currentPage :1,
searchField : "",
searchLastName:"",
searchFirstName:"",
searchEmail:"",
searchPhone:"",
searchCountry:"",
searchBirthday:"",
searchLastComment:"",
searchAssigned:"",
customerDatas : [],
sortBy: 'id',
sortDesc: false,

// Generate table props according to datas
    tableFields: [
      {key:'id', label:'ID', sortable: true, stickyColumn: true, variant:'info'},
      {key: 'customer.last_name', label :'Nom',sortable: true},
      {key: 'customer.first_name', label :'Prénom',sortable: true},
      {key: 'customer.email', label :'Email',sortable: true },
      {key: 'customer.country_code', label :'Code pays',sortable: true },
      {key: 'customer.phone', label :'Téléphone',sortable: true },
      {key: 'birthday', label :' Date de naissance',sortable: false },
      {key: 'contact_channel', label :'Contact',sortable: false },
      {key: 'status', label :'Statut',sortable: true },
      {key: 'interaction_creation_date', label :'Dernière intéraction',sortable: true },
      {key: 'due_date', label :'Échéance',sortable: true },
      {key: 'last_comment', label :'Dernier commentaire',sortable: true },
      {key: 'assignedTO', label :'Assigné',sortable: true },
      {key: 'attachments', label :'Attachement' }
  ]
  }
  },
  name: 'DataTable',

  beforeMount: function(){

// Retrieve datas when the page is mounted
    this.fetchCustomerDatas();

  },
  computed: {

// Generate number of rows and pagination count according to the datas length
  rows() {

        return this.filteredDatas.length
},

// Method for searching datas in filter components
filteredDatas () {

// Initializing variables and filter keys
let dataToSearch = this.customerDatas
let filterKey = this.searchField && this.searchField.toLowerCase();
let filterLastName = this.searchLastName && this.searchLastName.toLowerCase();
let filterFirstName = this.searchFirstName && this.searchFirstName.toLowerCase();
let filterEmail = this.searchEmail && this.searchEmail.toLowerCase();
let filterCountry = this.searchCountry && this.searchCountry.toLowerCase();
let filterPhone = this.searchPhone;
let filterBirthday = this.searchBirthday;
let filterLastComment = this.searchLastComment && this.searchLastComment.toLowerCase();
let filterAssigned = this.searchAssigned && this.searchAssigned.toLowerCase();

// Search methods according to filter keys

// Main search filter
if (filterKey){
dataToSearch = dataToSearch.filter(function (row) {

const fieldsToSearch = `${row.customer.first_name} ${row.customer.last_name} ${row.customer.email} ${row.customer.country_code} 
${row.customer.phone} ${row.customer.birthday} ${row.interaction_creation_date} 
${row.due_date} ${row.last_comment} ${row.assignedTO}`;

return !filterKey || fieldsToSearch.toLowerCase().includes(filterKey);

})}

// Custom search filters
else if(filterLastName)
{
dataToSearch = dataToSearch.filter(function(row) {

const lastNameToSearch = `${row.customer.last_name}`;
return !filterLastName || lastNameToSearch.toLowerCase().includes(filterLastName);

})
}

else if(filterFirstName)
{
dataToSearch = dataToSearch.filter(function(row) {

const firstNameToSearch = `${row.customer.first_name}`;
return !filterFirstName || firstNameToSearch.toLowerCase().includes(filterFirstName);

})
}

else if(filterEmail)
{
dataToSearch = dataToSearch.filter(function(row) {

const emailToSearch = `${row.customer.email}`;
return !filterEmail || emailToSearch.toLowerCase().includes(filterEmail);

})
}

else if(filterCountry)
{
dataToSearch = dataToSearch.filter(function(row) {

const countryToSearch = `${row.customer.country_code}`;
return !filterCountry || countryToSearch.toLowerCase().includes(filterCountry);

})
}

else if(filterPhone)
{
dataToSearch = dataToSearch.filter(function(row) {

const phoneToSearch = `${row.customer.phone}`;
return !filterPhone || phoneToSearch.includes(filterPhone);

})
}

else if(filterBirthday)
{

dataToSearch = dataToSearch.filter(function(row) {

const birthdayToSearch = `${row.customer.birthday}`;
return !filterBirthday || birthdayToSearch.includes(filterBirthday);

})
}

else if(filterLastComment)
{

dataToSearch = dataToSearch.filter(function(row) {

const lastCommentToSearch = `${row.last_comment}`;
return !filterLastComment || lastCommentToSearch.toLowerCase().includes(filterLastComment);

})
}

else if(filterAssigned)
{

dataToSearch = dataToSearch.filter(function(row) {

const assignedToSearch = `${row.assignedTO}`;
return !filterAssigned || assignedToSearch.toLowerCase().includes(filterAssigned);

})
}

return dataToSearch;
}
},

methods: {

fetchCustomerDatas () {

// Retrieve datas from the json mock
axios.get('../MOCK_DATA.json').then(response => {

this.customerDatas = response.data;

}).catch(error => console.log(error));

},

clearFilters () {

// Set the variables to default value
this.searchField ="";
this.searchLastName ="";
this.searchFirstName ="";
this.searchEmail ="";
this.searchCountry ="";
this.searchPhone ="";
this.searchBirthday ="";
this.searchLastComment ="";
this.searchAssigned ="";
this.sortBy="id";
this.sortDesc=false;
this.currentPage=1;

}
}
}

</script>

<style scoped>

.dataTable {

font-size: 0.8rem;
overflow:scroll;
font-family: Roboto;

}

.lastCommentText {

white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
display: inline-block;
max-width: 100%;

}

.paginationTable {

justify-content: center;
margin-bottom:2rem;

}

.filterRows input{

font-size: 0.6rem;
margin:1rem 1rem 1rem 1rem;
padding-left: 0.4rem;

}

.filterLabel {

color:darkgray;
margin-bottom: 2rem;

}

.filterContainer {

border: 1px solid rgba(128, 128, 128, 0.116);
padding:1rem 1rem 1rem 1rem;

}
.birthdayInput {

resize:horizontal;
width:13%

}

.searchField {

margin: 0rem 0.4rem 0rem 0.4rem;
width: 20rem;

}

.clearFiltersButton {

margin-top: 1rem;

}

</style>
