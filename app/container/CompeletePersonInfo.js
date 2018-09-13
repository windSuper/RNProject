import React, { Component } from 'react';
import{
    View,
	StyleSheet,
    Image,
    Text,
    TouchableHighlight,
    Dimensions,
    DeviceEventEmitter,
}from 'react-native';

import {connect} from 'react-redux'
import {SubNav} from '../component';
import {BindPersonInfo} from './';
import {LocalDataManager} from '../libs';
import {UserInfoRequestAction} from '../action/UserAction.js';

var k_Screen_Width = Dimensions.get('screen').width;
var k_Screen_Height = Dimensions.get('screen').height;
var k_Scale_Size = Dimensions.get('screen').width/320;


class CompeletePersonInfo extends Component {
    
    state={
        titleArr:['用户名','真实姓名','手机绑定','邮箱绑定','谷歌绑定'],
        imgArr:[],
        statusArr:[],
        contentArr:[],
    }

    componentWillMount() {
        var iArr=[],sArr=[],cArr=[];
        LocalDataManager.queryLocalDataWithKey('userInfo',(result)=>{
            cArr.push(result.username);
            sArr.push('');
            iArr.push(null);

            let truename = result.true_name;
            let trueStatus = result.true_name.length>1?'':'未绑定';
            let trueImg = result.true_name.length>1?null:require('../imgs/Login/list_next.png');
            cArr.push(truename);
            sArr.push(trueStatus);
            iArr.push(trueImg);

            let tel = result.telephone;
            let telStatus = parseInt(result.bind_tel)?'':'未绑定';
            let telImg = parseInt(result.bind_tel)?null:require('../imgs/Login/list_next.png');
            cArr.push(tel);
            sArr.push(telStatus);
            iArr.push(telImg);
            
            let email = result.email;
            let emailStatus = parseInt(result.bind_mail)?'':'未绑定';
            let emailImg = parseInt(result.bind_mail)?null:require('../imgs/Login/list_next.png');
            cArr.push(email);
            sArr.push(emailStatus);
            iArr.push(emailImg);

            let gg = result.secret_char;
            let ggStatus = parseInt(result.bind_secret)?'':'未绑定';
            let ggImg = parseInt(result.bind_secret)?null:require('../imgs/Login/list_next.png');
            cArr.push(gg);
            sArr.push(ggStatus);
            iArr.push(ggImg);

            this.setState({contentArr:cArr,statusArr:sArr,imgArr:iArr});
         });
    }

    render(){
        const {navigator} = this.props;
        return (
            <View style={styles.container}>
                <SubNav title={'完善个人信息'} navigator={navigator}/>
                <View style={{flex:1,marginTop:20}}>
                    {this.renderItem()}
                </View>
            </View>
            )
    }

    renderItem(){
        var views=[];
        const {titleArr,contentArr,statusArr,imgArr} = this.state;
        titleArr.map((title,index)=>{
            views.push(
                <TouchableHighlight key={index} onPress={()=>this.selectedAction(index)}>
                    <View style={styles.bgView}>
                        <View style={styles.title}>
                            <Text style={{color:'white',fontSize:14,}}>{title}</Text>
                        </View>
                        <View style={styles.content}>
                            <Text style={{color:'white',fontSize:14,}}>{contentArr[index]}</Text>
                        </View>
                        <View style={styles.status}>
                            <Text style={{color:'#969696',fontSize:12,}}>{statusArr[index]}</Text>
                        </View>
                        <Image style={styles.arrowImg} source={imgArr[index]}/>
                    </View>
                </TouchableHighlight>
            )
        })
        return views;
    }
    selectedAction(index){
        const{imgArr}=this.state;
        const{navigator}=this.props;
        if(imgArr[index]){
            switch(index){
                case 1:
                    navigator.push({component:BindPersonInfo,passProps:{'title':'绑定真实姓名'}})
                break;
                case 2:
                    navigator.push({component:BindPersonInfo,passProps:{'title':'绑定手机','type':'phone'}})
                break;
                case 3:
                    navigator.push({component:BindPersonInfo,passProps:{'title':'绑定邮箱','type':'email'}})
                break;
                case 4:
                    
                break;
            }
        }else{
            return;
        }
    }
}
var styles = StyleSheet.create({

    container:{
        height:k_Screen_Height,
        width:k_Screen_Width,
        backgroundColor:'black',
    },
    bgView:{
        height:40,width:k_Screen_Width,marginBottom:15,backgroundColor:'#191919',flexDirection:'row',alignItems:'center',
    },
    title:{
        height:30,width:80,marginLeft:12,justifyContent:'center', 
    },
    content:{
        height:30,width:k_Screen_Width-174,marginLeft:10,justifyContent:'center',
    },
    status:{
        height:30,width:40,marginLeft:5,justifyContent:'center',
    },
    arrowImg:{
        height:15,width:10,marginLeft:5,
    },
})


export default connect()(CompeletePersonInfo);