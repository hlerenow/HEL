import * as types from '../mutation-types'
import Axios from 'axios';

// initial state
// shape: [{ id, quantity }]
const state = {
  catalogs: [{mid:0,name:"无"}],
  catalogTemplates:[{name:"无",path:""}],
}

// getters
const getters = {
}

// mutations
const mutations = {
  //获取所有的目录，和目录模版
  [types.CATALOG_GETALL] (state,data) {
    state.catalogs=state.catalogs.concat(data.catalogs);
    state.catalogTemplates=state.catalogTemplates.concat(data.catalogTemplates);
  },
  [types.CATALOG_ADD](state,catalog){
    state.catalogs.push(catalog);
  },
  [types.CATALOG_DELETE](state,catalog){

  }
}

// actions
const actions = {
  catalogRequest ({ commit, state }) {
    return new Promise((reslove,reject)=>{
      Axios.post("catalog/get").
      then((res)=>{
        if(res.data.state===200){
            commit(types.CATALOG_GETALL,res.data.opRes);
            reslove();
        }else{
            reject(res);
        }
      }).catch(function(err){
          reject(err);
      }); 

    });
  },
  catalogAdd ({commit,state},catalog){
    return new Promise((resolve,reject)=>{
        Axios.post("catalog/create",catalog).
        then((res)=>{
          if(res.data.state===200){
            commit(types.CATALOG_ADD,catalog);
            resolve(res);
          }else{
            reject(res);        
          }
        }).catch(function(res){
            reject(res);
        });      
    })
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}