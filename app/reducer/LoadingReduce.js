import * as TYPES from '../action/ActionTypes.js'
const initialState = {
    loading:false,
}

const todo = (state=initialState,action)=>{
     switch (action.type){
        case TYPES.LAODING:
            return {
                loading:true,
            }
        case TYPES.NOLAODING:
            return {
                loading:false,
            }
        default:
            return state
    }

}
export default todo;