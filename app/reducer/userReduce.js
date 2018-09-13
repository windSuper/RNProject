import * as TYPES from '../action/ActionTypes.js'
const initialState = {
    userInfo:{},
    totalMoney:'0.00',
    secretMoney:false,
    platMoneyArr:[],
    accountListPromotionsData:[],
    accountListEduData:[],
    accountListInAndOutData:[],
    accountListPaiCaiData:[],
}

//接受Action传递过来的状态，根据状态返回新的状态到store
const todo = (state=initialState,action)=>{

    switch (action.type){
        case TYPES.UserInfoUpdate:
            return {
                ...state,
                userInfo:action.userInfo,
            }
        case TYPES.TotalMoneyRequestSuccess:
            return {
                ...state,
                totalMoney:action.totalMoney,
            }
        case TYPES.SecretMoneyAction:
            return {
                ...state,
                secretMoney:action.secretMoney,
            }
        case TYPES.PlatMoneyRequestSuccess:
            return {
                ...state,
                platMoneyArr:action.platMoneyArr,
            }
        case TYPES.AccountListPromotionsRequestSuccess:
            return {
                ...state,
                accountListPromotionsData:action.accountListPromotionsData,
            }
        case TYPES.AccountListEduRequestSuccess:
            return {
                ...state,
                accountListEduData:action.accountListEduData,
            }
        case TYPES.AccountListInAndOutRequestSuccess:
            return {
                ...state,
                accountListInAndOutData:action.accountListInAndOutData,
            }
        case TYPES.AccountListPaiCaiRequestSuccess:
            return {
                ...state,
                accountListPaiCaiData:action.accountListPaiCaiData,
            }
        default:
            return state
    }
}

export default todo;