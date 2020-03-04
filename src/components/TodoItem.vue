<template>
  <div class="todo_item">
    <div class="content">
      <el-checkbox v-model="eidtItem.checked" :disabled="!isEidt"/>
      <el-input v-if="isEidt" v-model="eidtItem.content"></el-input>
      <span v-else>{{eidtItem.content}}</span>
    </div>
    <div v-if="isEidt" class="icon">
      <ApolloMutation
      :mutation="require('../graphql/UpdateTodo.gql')"
      :variables="eidtItem" @done="isEidt=0"
      :update="function() {return updateCache(arguments, 'updateTodo')}">
        <template slot-scope="{ mutate }">
          <i class="el-icon-check" @click="mutate()"></i>
        </template>
      </ApolloMutation>
    </div>
    <div v-else  class="icon">
      <i class="el-icon-edit" @click="isEidt = 1"></i>
      <ApolloMutation
      :mutation="require('../graphql/DeleteTodo.gql')"
      :variables="{ id: item.id }"
      :update="function() {return updateCache(arguments, 'deleteTodo')}">
        <template slot-scope="{ mutate }">
          <i class="el-icon-close" @click="handleDelete(mutate)"></i>
        </template>
      </ApolloMutation>
    </div>
  </div>
</template>
<script>
import TODOLIST from '../graphql/TodoList.gql'
export default {
  data() {
    return {
      isEidt: 0,
      eidtItem: {}
    }
  },
  props: {
    item: Object
  },
  watch: {
    item: {
      handler(v) {
        this.eidtItem = { ...(v || {}) }
      },
      immediate: true
    }
  },
  methods: {
    updateCache([store, { data }], type) {
      store.writeQuery({ query: TODOLIST, data: { TodoList: data[type] } })
    },
    handleDelete(mutate) {
      this.$confirm('是否删除该项?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(mutate).catch(() => {})
    }
  }
}
</script>

<style lang="stylus" scoped>
  .todo_item
    display flex
    height 100px
    align-items center
    justify-content space-between
    &+.todo_item
      border-top 1px solid #e8e8e8
    .content
      display flex
      align-items center
    .el-checkbox
      margin-right 30px
    .icon
      display flex
      width 68px
      text-align center
      justify-content space-around
    i
      font-size 22px
      margin 0 6px
      cursor pointer
</style>
