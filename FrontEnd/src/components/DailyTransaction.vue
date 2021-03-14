<template>
    <div class="vue-tempalte">
        <h3 class="p-3 text-center">Daily Transactions</h3>
        <table class="table table-striped table-bordered table-hover">
            <thead class="thead-dark">
                <tr>
                    <th>Id</th>
                    <th>Volunteer Name</th>
                    <th>Volunteer No.</th>
                    <th>Source</th>
                    <th>Destination</th>
                    <th>Status</th>
                    <th>Conformation</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="row in rows" :key="row.id">
                    <td>{{row.id}}</td>
                    <td>{{row.volunteername}}</td>
                    <td>{{row.volunteerno}}</td>
                    <td>{{row.source}}</td>
                    <td>{{row.destination}}</td>
                    <td>{{row.status}}</td>
                    <td>{{row.conformation}}</td>
                </tr>
            </tbody>
        </table>
        <div class="text-center">
            <button type="button" class="btn btn-dark btn-lg">Edit</button>
        </div>
    </div>    
</template>

<script>
export default {
    data() {
        return {
            rows: [
                {id: '1',volunteername: 'Naira Goenka', volunteerno: 'V13', source: 'Shastri Nagar',destination: 'Laxmi House', status:'Delivered',conformation:'Complete'},
                {id: '2',volunteername: 'Anurag Basu', volunteerno: 'V20', source: 'Sai Colony',destination: ' Homkar Nagar',status:'Near',conformation:'-' },
                {id: '3',volunteername: 'Prerana Sharma', volunteerno: 'V03', source: 'Shastri Nagar',destination:'Ratnakar Building',status:'Not',conformation:'-'},
            ]
        };
    }
};
</script>

<style>
   body,
   html,
   .App,
   .vue-tempalte,
   .vertical-center {
  width: 100%;
  height: 100%;
}
.inner-block {
  width: 900px;
}
</style>