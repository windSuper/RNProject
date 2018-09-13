import React,{Component} from 'react';

import{
	AppRegistry,
} from 'react-native';

import Toast from 'react-native-root-toast';

class ToastShort extends Component{

  static show(content){
      Toast.show(content.toString(), {
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER,
        backgroundColor:'white',
        textStyle:{fontSize:14,color:'black'},
        shadow: true,
        animation: true,
        hideOnPress: true,

        delay: 0
      });
  };

}

export default ToastShort;
