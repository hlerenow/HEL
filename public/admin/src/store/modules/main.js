import * as types from 'store/mutation-types'
import Axios from 'axios';

// initial state
// shape: [{ id, quantity }]
const state = {
    componentUid:0
}

// getters
const getters = {
}

// mutations
const mutations = {
  //获取所有的目录，和目录模版
  componentUidUpdate = (state) => {
    state.componentUid++;
  }
}

// actions
const actions = {
}
export default {
  state,
  getters,
  actions,
  mutations
}