
import * as TYPES from './ActionTypes.js';
import HttpRequest from '../libs/HttpRequest.js';
import LocalDataManager from '../libs/LocalDataManager.js';


var Host='http://www.tbetios1.com';
LocalDataManager.queryLocalDataWithKey('Host',(result)=>{
    Host=result;
});

export const HiddenLoginModal = ()=>{

  return (dispatch)=>{
      dispatch({'type':TYPES.HIDDENLOGIN});
  }
}

export const ShowLoginModal = ()=>{

  return (dispatch)=>{
      dispatch({'type':TYPES.SHOWLOGIN});
  }
}

export const LoginSuccessAction = ()=>{

  return (dispatch)=>{
      dispatch({'type':TYPES.LOGINSUCCESS});
  }
}
export const LoginFailedAction = ()=>{

  return (dispatch)=>{
      dispatch({'type':TYPES.LOGINFAILED});
  }
}
export const LoadingAction = ()=>{

  return (dispatch)=>{
      dispatch({'type':TYPES.LAODING});
  }
}

export const NOLoadingAction = ()=>{

  return (dispatch)=>{
      dispatch({'type':TYPES.NOLAODING});
  }
}

export const NotifySwitchAction = (opt)=>{
  
    return (dispatch)=>{
        dispatch({'type':TYPES.NotifSwitch,notifSwitch:opt});
    }
}

export const LogoutAction = ()=>{
    
      return (dispatch)=>{
          LocalDataManager.removeLocalData('isLogin');
          LocalDataManager.removeLocalData('loginDic');
          dispatch({'type':TYPES.LOGOUT});
      }
  }
  