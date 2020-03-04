<template>
  <div class="add_todo">
    <h3>todo-demo</h3>
    <ApolloMutation :mutation="require('../graphql/AddTodo.gql')" :variables="{ content, checked: false }" @done="content=''" :update="updateCache">
      <template slot-scope="{ mutate }">
        <el-input v-model="content"  @keydown.native.enter="content && mutate()" placeholder="按回车添加待办"/>
      </template>
    </ApolloMutation>
  </div>
</template>

<script>
import TODOLIST from '../graphql/TodoList.gql'
export default {
  data() {
    return {
      content: ''
    }
  },
  methods: {
    updateCache(store, { data: { createTodo } }) {
      store.writeQuery({ query: TODOLIST, data: { TodoList: createTodo } })
    }
  }
}
</script>
