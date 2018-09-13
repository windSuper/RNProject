
import * as TYPES from './ActionTypes.js';
import HttpRequest from '../libs/HttpRequest.js';
import LocalDataManager from '../libs/LocalDataManager.js';

// 定义容器所使用的Action
export const BannerRequestAction = ()=>{

    return(dispatch)=>{
      //向reducer发送状态变化
        let result = HttpRequest.requestDataWithParams(
          '/public/active_list.do',
          {"class_id":"","is_banner":"1",
           "is_list":"","is_info":"1",
           "is_m_banner":"","is_m_list":""},
        (responseData)=>{
		      dispatch({'type': TYPES.BannerRequestSuccess,bannerData:responseData.Data.active_list});
        },(error)=>{
        });
    }
}

// 优惠活动标题
export const PromtionsClassTitleRequestAction = ()=>{

    return(dispatch)=>{
      //向reducer发送状态变化
        let result = HttpRequest.requestData(
          '/public/active_head.do',
        (responseData)=>{
          var data = responseData.Data.class_list;
          var keyArray =[];
          for (var key in data) {
            if (data.hasOwnProperty(key)) {
              keyArray.push(key);
            }
          }
          keyArray.sort((a,b)=>{
             return a - b;
          })
          var dataArr = [];
          keyArray.map(key=>{
            dataArr.push(data[key]);
          })
          var allArr = [{'id':'0','sort':'0','title':'所有优惠',}];
          allArr = allArr.concat(dataArr);
		      dispatch({'type': TYPES.PromtionsClassRequestSuccess,promotionClassData:allArr});
        },(error)=>{
        });
    }
}

// 优惠活动列表
export const PromtionsListRequestAction = ()=>{

    return(dispatch)=>{
      //向reducer发送状态变化
        let result = HttpRequest.requestDataWithParams(
          '/public/active_list.do',
          {"class_id":"","is_banner":"",
           "is_list":"1","is_info":"1",
           "is_m_banner":"","is_m_list":""},
        (responseData)=>{
		      dispatch({'type': TYPES.PromtionsListRequestSuccess,promotionListData:responseData.Data.active_list});
        },(error)=>{
        });
    }
}


// 定义容器所使用的Action
export const AutoLoginAction = (opt)=>{

    return(dispatch)=>{
      //向reducer发送状态变化
        dispatch({'type':TYPES.LAODING});
        let result = HttpRequest.requestDataWithParams(
          '/public/login.do',
          opt,
        (responseData)=>{
          console.log('loginSuccess=',responseData);
          dispatch({'type':TYPES.NOLAODING});
          dispatch({'type': TYPES.LOGINSUCCESS,loginInfo:opt});
          dispatch(HotRecommandRequest());
        },(error)=>{
          alert(error);
          dispatch({'type':TYPES.NOLAODING});
        });
    }
}

export const NoticeMessageRequestAction = ()=>{

    return(dispatch)=>{
      //向reducer发送状态变化
        let result = HttpRequest.requestData(
          '/public/notice.do',
        (responseData)=>{
		      dispatch({'type': TYPES.NoticeMessageRequestSuccess,noticeData:responseData.Data.notice});
        },(error)=>{
        });
    }
}


export const HotRecommandRequest = ()=>{

    return(dispatch)=>{
      //向reducer发送状态变化
        let result = HttpRequest.requestDataWithParams(
          '/game/get_list.do',
          {'plattype':'mobile','is_hot':'1'},
        (responseData)=>{
		      dispatch({'type': TYPES.HotRecommandRequestSuccess,hotRecommandData:responseData.Data.data});
        },(error)=>{
          alert(error);
        });
    }
}