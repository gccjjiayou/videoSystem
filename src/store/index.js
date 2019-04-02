import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import admin from './admin'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    admin,
  }
})

export default store