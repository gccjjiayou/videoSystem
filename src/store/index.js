import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import superAdmin from './superAdmin'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    superAdmin,
  }
})

export default store