
import * as TYPES from './ActionTypes.js';
import HttpRequest from '../libs/HttpRequest.js';


// 定义容器所使用的Action
export const _signAction = ()=>{

    return(dispatch)=>{
      //向reducer发送状态变化
        dispatch({'type':TYPES.LAODING});
        let result = HttpRequest.requestData(
          '/ext/user_sign.do',
        (responseData)=>{
          dispatch({'type':TYPES.NOLAODING});
				  dispatch({'type': TYPES.SIGNSUCCESS,selectedindex:responseData.Data.active_list.length});
        },(error)=>{
          alert(error);
          dispatch({'type':TYPES.NOLAODING});
        });
    }
}

export const _hiddenSuccessViewAction = ()=>{

  return(dispatch)=>{
      //向reducer发送状态变化
        dispatch({'type':TYPES.HiddenSuccessView});
  }
}


export const _signUpDaysOfTheMonth = ()=>{

  return(dispatch)=>{
      //向reducer发送状态变化
        dispatch({'type':TYPES.LAODING});
      let result = HttpRequest.requestData(
          '/ext/show_user_sign.do',
        (responseData)=>{
          dispatch({'type':TYPES.NOLAODING});
				  dispatch({'type': TYPES.SIGNOFMONTH,selectedindex:responseData.Data.mark_list.length});
        },(error)=>{
          dispatch({'type':TYPES.NOLAODING});
        });
  }
}