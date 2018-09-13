
import * as TYPES from './ActionTypes.js';
import HttpRequest from '../libs/HttpRequest.js';
import LocalDataManager from '../libs/LocalDataManager.js';


export const UserInfoRequestAction = ()=>{
  
      return(dispatch)=>{
        //向reducer发送状态变化
          let result = HttpRequest.requestData(
            '/user/info.do',
          (responseData)=>{
            console.log('update UesrInfo')
            LocalDataManager.upLocalData('userInfo',responseData.Data.user_info);
          },(error)=>{
          });
      }
  }

// 定义容器所使用的Action
export const TotalMoneyRequestAction = ()=>{

    return(dispatch)=>{
      //向reducer发送状态变化
        let result = HttpRequest.requestData(
          '/user/show_cash.do',
        (responseData)=>{
		      dispatch({'type': TYPES.TotalMoneyRequestSuccess,totalMoney:responseData.Data.cash});
        },(error)=>{
        });
    }
}

export const SecretMoneyAction = (opt)=>{
  return(dispatch)=>{
    dispatch({'type': TYPES.SecretMoneyAction,secretMoney:opt});
  }
}

export const PlatMoneyRequestAction = ()=>{

    return(dispatch)=>{
      LocalDataManager.queryLocalDataWithKey('loginDic',(result)=>{
        var platArr = ['AG','AGQ','TBBIN','EA','EAS',
                        'EBTM','GG','GPI','MG','PT',
                        'SLS','SLV','TGP','TTG'];
        var dataArr=[];
        var requestCount=0;
        platArr.map((plat,index)=>{
          HttpRequest.requestDataWithParams(
            '/public/credit.do',
            {'plat':plat,'account':result.username},
          (responseData)=>{
            dataArr.push(responseData.Data)
            requestCount++;
            if(requestCount===14){
              dispatch({'type': TYPES.PlatMoneyRequestSuccess,platMoneyArr:dataArr});
            }
          },(error)=>{
            dataArr.push({'balance':'0','plat':plat,'user_cash':'0'})
            requestCount++;
            if(requestCount===14){
              dispatch({'type': TYPES.PlatMoneyRequestSuccess,platMoneyArr:dataArr});
            }
          });
        });
      })
    }
}

// 定义容器所使用的Action
export const AccountListPromotionsRequestAction = (opt)=>{
  return(dispatch)=>{
          dispatch({'type': TYPES.LAODING});
    //向reducer发送状态变化
          let result = HttpRequest.requestDataWithParams(
            '/ext/active_record.do',
            opt,
          (responseData)=>{
            dispatch({'type': TYPES.NOLAODING});
            dispatch({'type': TYPES.AccountListPromotionsRequestSuccess,accountListPromotionsData:responseData.Data.active_list});
          },(error)=>{
            dispatch({'type': TYPES.NOLAODING});
            alert(error);
          });
      }
}

// 定义容器所使用的Action
export const AccountListEduRequestAction = (opt)=>{
  
      return(dispatch)=>{
          dispatch({'type': TYPES.LAODING});
        //向reducer发送状态变化
          let result = HttpRequest.requestDataWithParams(
            '/game/t_log.do',
            opt,
          (responseData)=>{
            dispatch({'type': TYPES.NOLAODING});
            dispatch({'type': TYPES.AccountListEduRequestSuccess,accountListEduData:responseData.Data.result});
          },(error)=>{
            dispatch({'type': TYPES.NOLAODING});
          });
      }
}

// 定义容器所使用的Action
export const AccountListInAndOutRequestAction = (opt)=>{
  
      return(dispatch)=>{
        //向reducer发送状态变化
          dispatch({'type': TYPES.LAODING});
          let result = HttpRequest.requestDataWithParams(
            '/ext/in_and_out_record.do',
            opt,
          (responseData)=>{
            dispatch({'type': TYPES.NOLAODING});
            dispatch({'type': TYPES.AccountListInAndOutRequestSuccess,accountListInAndOutData:responseData.Data.cash_list});
          },(error)=>{
            dispatch({'type': TYPES.NOLAODING});
          });
      }
}

// 定义容器所使用的Action
export const AccountListPaiCaiRequestAction = (opt)=>{
  
      return(dispatch)=>{
        //向reducer发送状态变化
          dispatch({'type': TYPES.LAODING});
          let result = HttpRequest.requestDataWithParams(
            '/game/bet_log.do',
            opt,
          (responseData)=>{
            dispatch({'type': TYPES.NOLAODING});
            dispatch({'type': TYPES.AccountListPaiCaiRequestSuccess,accountListPaiCaiData:responseData.Data.bet_list});
          },(error)=>{
            dispatch({'type': TYPES.NOLAODING});
          });
      }
}
