import React, { Component } from 'react';
import{
    AppRegistry,
    AsyncStorage
}from 'react-native';

class LocalDataManager extends Component{

     //增加缓存数据
    static addLocalData(key,value){

        AsyncStorage.setItem(key,JSON.stringify(value));
    }

    //查询
    static queryLocalDataWithKey(key,callBack){
        AsyncStorage.getItem(key)
        .then((value)=>{
            let jsonValue = JSON.parse(value);
            callBack(jsonValue)
        })
    }

    //更新
    static upLocalData(key,value){
        AsyncStorage.setItem(key,JSON.stringify(value));
    }

    //删除数据
    static removeLocalData(key){
        AsyncStorage.removeItem(key);
    }
}
module.exports = LocalDataManager;