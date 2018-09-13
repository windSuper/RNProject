import React, { Component } from 'react';
import {View} from 'react-native';
import {Provider} from 'react-redux';
import configureStore from '../store/configureStore.js';
import Main from './Main.js'
import MainTabBar from './MainTabBar.js'
import CodePush from 'react-native-code-push'
import LocalDataManager from '../libs/LocalDataManager.js';

LocalDataManager.queryLocalDataWithKey('Host',(result)=>{
    if(!result){
        LocalDataManager.addLocalData('Host','http://www.tbetios1.com');
    }
})

let store = configureStore();

class APP extends Component {    

    componentDidMount() {
        console.log('Mount=');
        let key = '69XpxdYBWxIvu1zHnju_bL4S8H_r57dfa57c-7d72-423d-8082-971dc173c4a6'
            CodePush.sync({
                deploymentKey: key,
                updateDialog: {
                    optionalIgnoreButtonLabel: '稍后',
                    optionalInstallButtonLabel: '后台更新',
                    optionalUpdateMessage: '有新版本了，是否更新？',
                    title: '更新提示'
                },
                installMode: CodePush.InstallMode.IMMEDIATE
                // IMMEDIATE 立即更新APP
                // ON_NEXT_RESTART 到下一次启动应用时
                // ON_NEXT_RESUME 当应用从后台返回时
            });
    }

    render() {
        return (
            <Provider store={store}>
                <MainTabBar/>
            </Provider>
        );
    }
}

/**
 * Configured with a MANUAL check frequency for easy testing. 
 * For production apps, ON_APP_START,
 * for a 'hands-off' approach where CodePush.sync() does not
 */
let codePushOptions = { checkFrequency: CodePush.CheckFrequency.ON_APP_START };

export default CodePush(codePushOptions)(APP);
