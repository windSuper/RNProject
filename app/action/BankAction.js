import * as TYPES from './ActionTypes.js';
import HttpRequest from '../libs/HttpRequest.js';
import LocalDataManager from '../libs/LocalDataManager.js';

// 定义容器所使用的Action
export const BindedCardListRequestAction = ()=>{

    return(dispatch)=>{
      //向reducer发送状态变化
        dispatch({'type':TYPES.LAODING});
        let result = HttpRequest.requestData(
          '/cash/user_bank_list.do',
        (responseData)=>{
          dispatch({'type':TYPES.NOLAODING});
		      dispatch({'type': TYPES.BindedCardListRequestSuccess,bindedCardData:responseData.Data.bank_list});
        },(error)=>{
          dispatch({'type':TYPES.NOLAODING});
        });
    }
}


export const BankListRequestAction = ()=>{
  
      return(dispatch)=>{
        //向reducer发送状态变化
          dispatch({'type':TYPES.LAODING});
          let result = HttpRequest.requestData(
            '/cash/bank_list.do',
          (responseData)=>{
            dispatch({'type':TYPES.NOLAODING});
            dispatch({'type': TYPES.BankListRequestSuccess,bankListData:responseData.Data.bank_list});
          },(error)=>{
            dispatch({'type':TYPES.NOLAODING});
          });
      }
}
