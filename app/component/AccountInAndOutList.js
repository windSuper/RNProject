
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
import {AccountListInAndOutRequestAction} from '../action/UserAction.js'
import AccountListView from './AccountListView.js';

var k_Screen_Width = Dimensions.get('screen').width;
var k_Screen_Height = Dimensions.get('screen').height;

class AccountInAndOutList extends PureComponent {

    componentWillMount() {
        let opt = {'status':'',
                   's_date':'',
                   'e_date':'',
                   'page':'',
                   'row':'40',};
        const {dispatch}=this.props;
        dispatch(AccountListInAndOutRequestAction(opt));
    }

    _searchAction(statusIndex,startDate,endDate){
        console.log(statusIndex,startDate,endDate);
        let params = {'status':this.statusIndexToStatusCode(statusIndex),
                      's_date':startDate,
                      'e_date':endDate,
                      'page':'',
                      'row':'40',};
        const {dispatch}=this.props;
        dispatch(AccountListInAndOutRequestAction(params));
    }

    
    renderListItem(item){
        return (
            <View style={{width:k_Screen_Width,height:50,flexDirection:'row',alignItems:'center'}}>
                <View style={[styles.listItemText,{width:80}]}>
                    <Text style={{color:'white',fontSize:12}}>{item.item.date}</Text>
                </View>
                <View style={[styles.listItemText,{width:60}]}>
                    <Text style={{color:'white',fontSize:12}}>{item.item.in_out}</Text>
                </View>
                <View style={[styles.listItemText,{width:(k_Screen_Width-220)/2}]}>
                    <Text style={{color:'white',fontSize:12}}>{item.item.amout}</Text>
                </View>
                <View style={[styles.listItemText,{width:(k_Screen_Width-220)/2}]}>
                    <Text style={{color:'white',fontSize:12}}>{item.item.pay_other}</Text>
                </View>
                <View style={[styles.listItemText,{width:80}]}>
                    <Text style={{color:'white',fontSize:12}}>{this.statusCodeToStatusText(item.item.status)}</Text>
                </View>
            </View>
        )
    }
    statusIndexToStatusCode(code){
        var text = '';
        switch(code){
            case 0:
                text='1';
            break;
            case 1:
                text='2';
            break;
            case 2:
                text='3';
            break;
            case 3:
                text='9';
            break;
        }
        return text;
    }

    statusCodeToStatusText(code){
        var text = '';
        switch(code){
            case '1':
                text='处理中';
            break;
            case '2':
                text='审核';
            break;
            case '3':
                text='完成';
            break;
            case '9':
                text='拒绝';
            break;
        }
        return text;
    }

    render() {
        const{accountListInAndOutData}=this.props;
        return (
            <View style={styles.container}>
                <AccountListView
                    statusArr={['处理中','审核','完成','拒绝']}
                    listData = {accountListInAndOutData}
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
        accountListInAndOutData:store.UserReduce.accountListInAndOutData,
    }
}

export default connect(propsFromStore)(AccountInAndOutList);