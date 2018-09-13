
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
import {AccountListPaiCaiRequestAction} from '../action/UserAction.js'
import AccountListView from './AccountListView.js';

var k_Screen_Width = Dimensions.get('screen').width;
var k_Screen_Height = Dimensions.get('screen').height;

class AccountPaiCaiList extends PureComponent {

    componentWillMount() {
        let opt = {'gametype':'live',
                   'startdate':'',
                   'enddate':'',
                   };
        const {dispatch}=this.props;
        dispatch(AccountListPaiCaiRequestAction(opt));
    }

    _searchAction(statusIndex,startDate,endDate){
        console.log(statusIndex,startDate,endDate);
        let params = {'gametype':this.statusIndexToStatusCode(statusIndex),
                      'startdate':startDate,
                      'enddate':endDate,
                     };
        const {dispatch}=this.props;
        dispatch(AccountListPaiCaiRequestAction(params));
    }

    
    renderListItem(item){
        return (
            <View style={{width:k_Screen_Width,height:50,flexDirection:'row',alignItems:'center'}}>
                <View style={[styles.listItemText,{width:80}]}>
                    <Text style={{color:'white',fontSize:12}}>{item.item.date}</Text>
                </View>
                <View style={[styles.listItemText,{width:60}]}>
                    <Text style={{color:'white',fontSize:12}}>{this.statusCodeToStatusText(item.item.game_type)}</Text>
                </View>
                <View style={[styles.listItemText,{width:(k_Screen_Width-220)/2}]}>
                    <Text style={{color:'white',fontSize:12}}>{item.item.plat_form}</Text>
                </View>
                <View style={[styles.listItemText,{width:(k_Screen_Width-220)/2}]}>
                    <Text style={{color:'white',fontSize:12}}>{item.item.bet_valid_amount}</Text>
                </View>
                <View style={[styles.listItemText,{width:80}]}>
                    <Text style={{color:'white',fontSize:12}}>{item.item.bet_pay_out}</Text>
                </View>
            </View>
        )
    }
    statusIndexToStatusCode(code){
        var text = '';
        switch(code){
            case 0:
                text='live';
            break;
            case 1:
                text='sport';
            break;
            case 2:
                text='slot';
            break;
            case 3:
                text='lottery';
            break;
            default:
                text='live';
        }
        return text;
    }

    statusCodeToStatusText(code){
        var text = '';
        switch(code){
            case 'live':
                text='真人娱乐';
            break;
            case 'sport':
                text='体育投注';
            break;
            case 'slot':
                text='老虎机';
            break;
            case 'lottery':
                text='彩票';
            break;
        }
        return text;
    }

    render() {
        const{accountListPaiCaiData}=this.props;
        return (
            <View style={styles.container}>
                <AccountListView
                    statusArr={['真人娱乐','体育投注','老虎机','彩票']}
                    typeTitleArr={['日期','游戏类型','平台','投注','派彩']}
                    listData = {accountListPaiCaiData}
                    renderListItem={(item)=>this.renderListItem(item)}
                    searchCallBack={(statusIndex,startDate,endDate,loadMore)=>this._searchAction(statusIndex,startDate,endDate,loadMore)}
                />
            </View>
        );
    }
    
}
var styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#191919',
    },
    listItemText:{
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderRightWidth:1,
        borderBottomWidth:1,
        borderColor:'#464646'
    },

})

function propsFromStore(store){
    return{
        accountListPaiCaiData:store.UserReduce.accountListPaiCaiData,
    }
}

export default connect(propsFromStore)(AccountPaiCaiList);