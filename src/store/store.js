import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({

    state:{
        applicant:null,
        specificationData:null,
        skillAbilityData:null,
        recordData:null,
        finalConfirmData:null
    },

    mutations:{
        changeSpecification(state,data){
            state.specificationData = data
        },
        changeRecords(state,data){
            state.recordData = data
        },
        changeSkillAbility(state,data){
            state.skillAbilityData = data
        },
        changeFinalConfirm(state,data){
            state.finalConfirmData = data
            state.applicant = {
                ...state.specificationData,
                ...state.recordData,
                ...state.skillAbilityData,
                ...state.finalConfirmData
            }
        }
    },
    
    actions:{
        changeSpecification({commit},data){
            commit('changeSpecification',data)
        },
        changeRecords({commit},data){
            commit('changeRecords',data)
        },
        changeSkillAbility({commit},data){
            commit('changeSkillAbility',data)
        },
        changeFinalConfirm({commit},data){
            commit('changeFinalConfirm',data)
        },
        sendData({state}){
            axios.post('http://employment.signalads.com/backend/api/employees', state.applicant)
            .then(res => {
                console.log(res)
            }).catch(err=>console.log(err))
        }
    },
    
    getters:{

    }
})
export default store