import * as TYPES from '../action/ActionTypes.js'
const initialState = {
    selectedindex:null,
    showSuccessView:false,
}

//接受Action传递过来的状态，根据状态返回新的状态到store
const todo = (state=initialState,action)=>{

    switch (action.type){
        case TYPES.HiddenSuccessView:
            return {
                ...state,
                showSuccessView:false,
            }
        case TYPES.SIGNOFMONTH:
            return {
                selectedindex:action.selectedindex,
                showSuccessView:false,
            }
        case TYPES.SIGNSUCCESS:
            return {
                selectedindex:action.selectedindex,
                showSuccessView:true,
            }
        case TYPES.SIGNFAILED:
            return {
                showSuccessView:false,
            }
        default:
            return state
    }
}

export default todo;