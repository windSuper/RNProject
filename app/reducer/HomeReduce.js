import * as TYPES from '../action/ActionTypes.js'
const initialState = {
    bannerData:[],
    noticeData:[],
    hotRecommandData:[],
    promotionListData:[],
    promotionClassData:[],
}

const todo = (state=initialState,action)=>{
     switch (action.type){
        case TYPES.BannerRequestSuccess:
            return {
                ...state,
                bannerData:action.bannerData,
            }
        case TYPES.NoticeMessageRequestSuccess:
            return {
                ...state,
                noticeData:action.noticeData,
            }  
        case TYPES.HotRecommandRequestSuccess:
            return {
                ...state,
                hotRecommandData:action.hotRecommandData,
            }
        case TYPES.PromtionsClassRequestSuccess:
            return {
                ...state,
                promotionClassData:action.promotionClassData,
            }
        case TYPES.PromtionsListRequestSuccess:
            return {
                ...state,
                promotionListData:action.promotionListData,
            }  
        default:
            return state
    }

}
export default todo;