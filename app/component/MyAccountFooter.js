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
import {PlatMoneyRequestAction} from '../action/UserAction.js'

var k_Screen_Width = Dimensions.get('screen').width;
var k_Screen_Height = Dimensions.get('screen').height;

class MyAccountFooter extends PureComponent {

    componentWillMount() {
        const {dispatch}=this.props;
        dispatch(PlatMoneyRequestAction());
    }

    _renderPlatMoneyView(){
        const {secretMoney,platMoneyArr} = this.props;
        var views=[];
        var colorArr = ['#ec911d','#d62121','#125edb','#2678f2','#ffff33','#009426'];
        platMoneyArr.map((item,index)=>{
            let bgColor = colorArr[parseInt((index/2)%6)];
            let money = secretMoney ? '******' : item.balance;
            views.push(
                <View key={index} style={styles.platItem}>
                    <View style={[styles.itemColorBg,{backgroundColor:bgColor}]}></View>
                    <View style={styles.platName}>
                        <Text style={{color:'white',fontSize:12,}}>{this._turnPlatStrToPlatName(item.plat)}</Text>
                    </View>
                    <View style={styles.platMoney}>
                        <Text style={{color:'white',fontSize:12,}}>{money}</Text>
                    </View>
                </View>
            )
        })
        return views;

    }
    _turnPlatStrToPlatName(platStr){
        var platName = '';
        switch(platStr){
            case 'AG':
                platName = 'AG国际';
            break;
            case 'AGQ':
                platName = 'AG极速';
            break;
            case 'TBBIN':
                platName = '新版BBIN';
            break;
            case 'EAS':
                platName = 'EA';
            break;
            case 'EBTM':
                platName = 'Ebet';
            break;
            case 'GG':
                platName = '游联天下';
            break;
            case 'SLS':
                platName = '小金体育';
            break;
            case 'SLV':
                platName = '小金真人';
            break;
            case 'PT':
                platName = 'PT平台';
            break;
            default:
                platName = platStr;
            break;
        }
        return platName;
    }
    render() {

        return (
            <View style={styles.container}>
                {this._renderPlatMoneyView()}
            </View>
        );
    }
}
var styles = StyleSheet.create({
    container:{
        width:k_Screen_Width,
        height:245,
        marginTop:15,
        backgroundColor:'#191919',
        flexDirection:'row',
        flexWrap:'wrap',
    },
    platItem:{
        width:k_Screen_Width/2,
        height:35,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
    },
    itemColorBg:{
        width:20,
        height:20,
        marginLeft:12,
    },
    platName:{
        width:60,
        height:20,
        marginLeft:10,
    },
    platMoney:{
        width:60,
        height:20,
        marginLeft:10,
    },

})

function propsFromStore(store){
    return{
        secretMoney:store.UserReduce.secretMoney,
        platMoneyArr:store.UserReduce.platMoneyArr
    }
}

export default connect(propsFromStore)(MyAccountFooter);