/**
 * Created by an.han on 16/10/15.
 */

export default {
  state: {
    username:"",
    role:"",
    token:false
  },
  mutations: {
    loginTokenMuta (state, payLoad) {
      state.token = payLoad.value || state.token;
    }
  }
}