import * as TYPES from '../action/ActionTypes.js'
const initialState = {
    loinInfo:null,
    loading:false,
    isLogin:false,
    showLogin:false,
    notifSwitch:false,
}

//接受Action传递过来的状态，根据状态返回新的状态到store
const todo = (state=initialState,action)=>{
    switch (action.type){
        case TYPES.HIDDENLOGIN:
            return {
                ...state,
                showLogin:false,
            }
        case TYPES.SHOWLOGIN:
            return {
                ...state,
                showLogin:true,
                isLgoin:false,
            }
        case TYPES.LOGINSUCCESS:
            return {
                ...state,
                loginInfo:action.loginInfo,
                isLogin:true,
            }
        case TYPES.LOGINFAILED:
            return {
                ...state,
                isLogin:false,
            }
        case TYPES.LOGOUT:
            return {
                ...state,
                loginInfo:null,
                isLogin:false,
            }
        case TYPES.LOGOUTFAILED:
            return {
                ...state,
            }
        case TYPES.NotifSwitch:
            return {
                ...state,
                notifSwitch:action.notifSwitch,
            }
        default:
            return state
    }
}

export default todo;