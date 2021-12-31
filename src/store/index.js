import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        token:'',
        userInfo: sessionStorage.getItem('userInfo') ? sessionStorage.getItem('userInfo') : {}
    },
    mutations:{
        updateToken(state,payload){
            state.token = payload
        },
        updateUserInfo(state,payload){
            state.userInfo = payload
        }
    },
    actions:{
        saveUserInfo(context,data){
            context.commit('updateUserInfo',data)
        }
    },
    modules:{}
})