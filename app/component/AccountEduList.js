
import React, { PureComponent } from 'react';
import{
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    TouchableHighlight,
} from 'react-native';

import moment from 'moment';
import {connect} from 'react-redux';
import {AccountListEduRequestAction} from '../action/UserAction.js'
import AccountListView from './AccountListView.js';

var k_Screen_Width = Dimensions.get('screen').width;
var k_Screen_Height = Dimensions.get('screen').height;

class AccountEduList extends PureComponent {

    componentWillMount() {
        let opt = {'status':'',
                   'startdate':'',
                   'enddate':'',
                   'page':'',
                   'size':'40',};
        const {dispatch}=this.props;
        dispatch(AccountListEduRequestAction(opt));
    }

    _searchAction(statusIndex,startDate,endDate){
        console.log(statusIndex,startDate,endDate);
        let params = {'status':this.statusIndexToStatusCode(statusIndex),
                      'startdate':startDate,
                      'enddate':endDate,
                      'page':'',
                      'size':'40',};
        const {dispatch}=this.props;
        dispatch(AccountListEduRequestAction(params));
    }

    
    renderListItem(item){
        return (
            <View style={{width:k_Screen_Width,height:50,flexDirection:'row',alignItems:'center'}}>
                <View style={[styles.listItemText,{width:80}]}>
                    <Text style={{color:'white',fontSize:12}}>{moment(item.item.date).format('YYYY-MM-DD hh:mm:ss')}</Text>
                </View>
                <View style={[styles.listItemText,{width:60}]}>
                    <Text style={{color:'white',fontSize:12}}>{this.typeCodeToStatusText(item.item.type)}</Text>
                </View>
                <View style={[styles.listItemText,{width:(k_Screen_Width-220)/2}]}>
                    <Text style={{color:'white',fontSize:12}}>{item.item.amout}</Text>
                </View>
                <View style={[styles.listItemText,{width:(k_Screen_Width-220)/2}]}>
                    <Text style={{color:'white',fontSize:12}}>{this.statusCodeToStatusText(item.item.status)}</Text>
                </View>
                <View style={[styles.listItemText,{width:80}]}>
                    <Text style={{color:'white',fontSize:12}}>{item.item.plat_to}</Text>
                </View>
            </View>
        )
    }

    typeCodeToStatusText(code){
        var text = '';
        switch(code){
            case '3':
                text='转入';
            break;
            case '5':
                text='转出';
            break;
        }
        return text;
    }

    statusIndexToStatusCode(code){
        var text = '';
        switch(code){
            case 0:
                text='0';
            break;
            case 1:
                text='1';
            break;
            case 2:
                text='2';
            break;
        }
        return text;
    }

    statusCodeToStatusText(code){
        var text = '';
        switch(code){
            case '0':
                text='处理中';
            break;
            case '1':
                text='完成';
            break;
            case '2':
                text='拒绝';
            break;
        }
        return text;
    }

    render() {
        const{accountListEduData}=this.props;
        /*
         
         */
        return (
            <View style={styles.container}>
                <AccountListView
                    dataMode={'datetime'}
                    format={'YYYY-MM-DD hh:mm:ss'}
                    typeTitleArr={['日期','类型','金额','状态','平台']}
                    listData = {accountListEduData}
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
        accountListEduData:store.UserReduce.accountListEduData,
    }
}

export default connect(propsFromStore)(AccountEduList);