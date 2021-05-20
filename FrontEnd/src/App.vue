<template>
  <div class="vue-tempalte">
    <!-- Navigation -->
    <nav class="navbar shadow bg-white rounded justify-content-between flex-nowrap flex-row fixed-top">
         <button id="Button" type="button" class="btn btn-primary btnNext"  onclick="history.back(-1)" >&#8249;</button>
      <div class="container">
        
         <span class="navbar-brand mb-0 h1">ChatBot</span>
      </div>
    </nav>

    <!-- Main -->
    <div class="App">
      <div class="vertical-center">
        <div class="inner-block">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>