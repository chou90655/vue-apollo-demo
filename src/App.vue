<template>
  <div id="app">
    <AddTodo></AddTodo>
    <TodoList></TodoList>
  </div>
</template>

<script>
import AddTodo from './components/AddTodo.vue'
import TodoList from './components/TodoList.vue'

export default {
  name: 'App',
  components: {
    AddTodo,
    TodoList
  }
}
</script>

<style lang="stylus">
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  color #2c3e50
  padding 0 24px
  box-sizing border-box
  margin 100px auto
  width 600px
  border 1px solid #e8e8e8
</style>
