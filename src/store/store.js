import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({

    state:{
        personalInfo:null
    },

    mutations:{
        changePersonalInfo(state,personalInfo){
            state.personalInfo = personalInfo
        }
    },
    
    actions:{
        changePersonalInfo({commit},personalInfo){
            commit('changePersonalInfo',personalInfo)
        }
    },
    
    getters:{

    }
})
export default store