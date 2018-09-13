import * as TYPES from '../action/ActionTypes.js'
const initialState = {
    bindedCardData:[],
    bankListData:[],
}

//接受Action传递过来的状态，根据状态返回新的状态到store
const todo = (state=initialState,action)=>{

    switch (action.type){
        case TYPES.BindedCardListRequestSuccess:
            return {
                ...state,
                bindedCardData:action.bindedCardData,
            }
        case TYPES.BankListRequestSuccess:
            return {
                ...state,
                bankListData:action.bankListData,
            }
        default:
            return state
    }
}

export default todo;