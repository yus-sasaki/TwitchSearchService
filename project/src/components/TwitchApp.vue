<template>
  <div id="app">
    <div class="container">
      <h1>TwitchApp</h1>
      <div class="container" id="app">
        <div>
          <StreamsList />
        </div>
      </div>
    </div>
  </div>
</template>
    
<script>
import StreamsList from './StreamsList.vue'

export default {
  components:{
    StreamsList,
  },
  data(){
    return{

    };
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
  line-height: 1.5;
  overflow-x: hidden;
  font-family: Roboto, serif;
}

h1, h2, h3, h4 {
  margin: 1em 0 .5em;
  line-height: 1.25;
}

</style>