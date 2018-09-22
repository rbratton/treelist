<template>
  <div id="app">
    <div class="tree">
      <tree-item v-for="ixn in interactions" :key="ixn.id" :interaction="ixn" :depth="0"></tree-item>
    </div>
  </div>
</template>

<script>
import TreeItem from './components/TreeItem.vue'
import interactions from '../test/generated.json'

export default {
  name: 'app',
  components: {
    TreeItem
  },
  data () {
    return {
      interactions
    }
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Roboto');

#app {
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.tree {
  display: flex;
  flex-direction: column;
}
</style>
