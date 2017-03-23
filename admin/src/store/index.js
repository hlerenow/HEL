import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import * as mutations from './mutations'
import catalog from './modules/catalog'

// const debug = process.env.NODE_ENV !== 'production'

Vue.use(Vuex);

export default new Vuex.Store({
	state:{
		componentUid:0
	},
	mutations,
	actions,
	getters,
	modules: {
		catalog
	}
})