import React, { PureComponent } from 'react';
import{
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    TouchableHighlight,
} from 'react-native';
import {connect} from 'react-redux';
import {Recharge,WithDraw} from '../container';
import LocalDataManager from '../libs/LocalDataManager.js';
import {TotalMoneyRequestAction,SecretMoneyAction} from '../action/UserAction.js'

var k_Screen_Width = Dimensions.get('screen').width;
var k_Screen_Height = Dimensions.get('screen').height;

class MyAccountRechargeView extends PureComponent {

    componentWillMount() {
        const {dispatch}=this.props;
        dispatch(TotalMoneyRequestAction());
    }

    render() {

        const {totalMoney,secretMoney} = this.props;
        let img = secretMoney ? require('../imgs/MyAccount/account_icon_closeeye.png') : require('../imgs/MyAccount/account_icon_eye.png') ;
        let userMoney = secretMoney ? '******' : totalMoney;
        return (
            <View style={styles.container}>
                <View style={styles.rowContainer}>
                    <View style={styles.moneySwitch}>
                        <Text style={styles.moneyTitle}>总资产(元)</Text>
                        <TouchableHighlight onPress={()=>this._secretMoneyAction()}>
                            <Image style={styles.switchImage} source={img}/>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.moneyBtn}>
                        <Text onPress={()=>this._rechargeBtnAction()} style={styles.rechargeBtn}>充值</Text>
                        <Text onPress={()=>this._withDrawBtnAction()} style={styles.withDrawBtn}>提现</Text>
                    </View>
                </View>
                <View style={styles.totalMoney}>
                    <Text style={{color:'white',fontSize:14}}>{userMoney}</Text>
                </View>
            </View>
        );
    }
    _rechargeBtnAction(){
        const {navigator}=this.props;
        navigator.push({component:Recharge});
    }
    _withDrawBtnAction(){
        const {navigator}=this.props;
        navigator.push({component:WithDraw});
    }
    _secretMoneyAction(){
        const {secretMoney,dispatch} = this.props;
        console.log('dispatch',dispatch);
        dispatch(SecretMoneyAction(!secretMoney));
    }
}
var styles = StyleSheet.create({
    container:{
        width:k_Screen_Width,
        height:70,
        marginTop:15,
        backgroundColor:'#191919',
    },
    rowContainer:{
        width:k_Screen_Width,
        height:50,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
    },
    moneySwitch:{
        width:110,
        height:20,
        flexDirection:'row',
        alignItems:'center',
    },
    moneyTitle:{
        color:'white',
        fontSize:14,
        width:80,
    },
    switchImage:{
        width:30,
        height:20,
    },
    moneyBtn:{
        width:k_Screen_Width-110,
        height:20,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-end'
    },
    rechargeBtn:{
        width:60,
        height:20,
        marginRight:15,
        backgroundColor:'#d3a14a',
        color:'black',fontSize:14,
        textAlign:'center',
        paddingTop:2,
    },
    withDrawBtn:{
        width:60,
        height:20,
        alignSelf:'flex-end',
        marginRight:12,
        backgroundColor:'#878787',
        color:'black',fontSize:14,
        textAlign:'center',
        paddingTop:2,
    },
    totalMoney:{
        width:120,
        height:20,
        justifyContent:'center',
    },
    itemRowContainer:{
        width:k_Screen_Width,
        height:43,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
    },
    itemTitleContainer:{
        width:k_Screen_Width-40,
        height:43,
        flexDirection:'row',
        alignItems:'center',
    },
    titleStyle:{
        width:80,
        marginLeft:12,
        color:'white',
        fontSize:14
    },
    contentStyle:{
        width:160,
        marginLeft:5,
        color:'white',
        fontSize:14
    },
    arrowStyle:{
        width:10,
        height:15,
        marginRight:12,
    },
    lineStyle:{
        height:1,
        marginLeft:12,
        width:k_Screen_Width-24,
        backgroundColor:'#0c0c0c'
    },

})

function propsFromStore(store){
    return{
        totalMoney:store.UserReduce.totalMoney,
        secretMoney:store.UserReduce.secretMoney
    }
}

export default connect(propsFromStore)(MyAccountRechargeView);