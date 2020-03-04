<template>
  <div class="todo_list">
    <ApolloQuery :query="require('../graphql/TodoList.gql')">
      <template slot-scope="{ result: { loading, error, data } }">
        <div v-if="loading" class="loading">Loading...</div>
        <div v-else-if="error" class="error">An error occured</div>
        <div v-else-if="data && data.TodoList && data.TodoList.length" class="result">
          <TodoItem v-for="(item, index) in data.TodoList" :key="index" :item="item"></TodoItem>
        </div>
        <div v-else class="no-result">No result :(</div>
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
import TodoItem from './TodoItem'

export default {
  components: { TodoItem }
}
</script>
<style lang="stylus" scoped>
  .no-result,.loading,.error
    line-height 100px
    text-align center
</style>
