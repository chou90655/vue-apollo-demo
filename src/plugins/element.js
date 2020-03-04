import Vue from 'vue'
import { Input, Checkbox, MessageBox } from 'element-ui'

Vue.use(Input)
Vue.use(Checkbox)
Vue.prototype.$confirm = MessageBox.confirm
