import * as types from 'store/mutation-types'
import Axios from 'axios';

// initial state
// shape: [{ id, quantity }]
const state = {
  catalogs: [],
  catalogTemplates:[],
}

// getters
const getters = {
}

// mutations
const mutations = {
  //获取所有的目录，和目录模版
  [types.CATALOG_GETALL] (state,data) {

    for(var i=0;i<data.catalogs.length;i++){
      var ite=data.catalogs[i];
        try{ 
            ite.value=JSON.parse(ite.value);
        }catch(e){
            ite.value={
              name:"无",
              path:""
            };
        }

        if(!(ite.value.name&&ite.value.path)){
            ite.value={
              name:"无",
              path:""
            };          
        }
    }

    state.catalogs=state.catalogs.concat(data.catalogs);
    state.catalogTemplates=state.catalogTemplates.concat(data.catalogTemplates);
  },
  [types.CATALOG_ADD](state,catalog){
    catalog.value=JSON.parse(catalog.value);
    state.catalogs.push(catalog);
  },
  [types.CATALOG_DELETE](state,catalogArry){
    var updataCatalog=[];
    state.catalogs.forEach(function(item){
        if(catalogArry.indexOf(item.mid)<0){
            updataCatalog.push(item);
        }
    });
    state.catalogs=updataCatalog;
  },
  [types.CATALOG_MODIFY](state,catalog){
    for(var i=0;i<state.catalogs.length;i++){
      var ite=state.catalogs[i];
      if(ite.mid==catalog.mid){
        state.catalogs.splice(i,1,catalog);
        break;
      }
    }
  }
}

// actions
const actions = {
  catalogRequest ({ commit, state }) {
    if(state.catalogs.length>0){
      return new Promise(function(reslove){
        reslove();
      });
    }

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
            console.log(catalog);
            catalog.mid=res.data.insertId;
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