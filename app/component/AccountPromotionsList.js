
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
import {AccountListPromotionsRequestAction} from '../action/UserAction.js'
import AccountListView from './AccountListView.js';

var k_Screen_Width = Dimensions.get('screen').width;
var k_Screen_Height = Dimensions.get('screen').height;

class AccountPromotionsList extends PureComponent {

    componentWillMount() {
        let opt = {'status':'',
                   's_date':'',
                   'e_date':'',
                   'page':'',
                   'row':'40',};
        const {dispatch}=this.props;
        dispatch(AccountListPromotionsRequestAction(opt));
    }

    _searchAction(statusIndex,startDate,endDate){
        console.log(statusIndex,startDate,endDate);
        let params = {'status':this.statusIndexToStatusCode(statusIndex),
                      's_date':startDate,
                      'e_date':endDate,
                      'page':'',
                      'row':'40',};
        const {dispatch}=this.props;
        dispatch(AccountListPromotionsRequestAction(params));
    }

    
    renderListItem(item){
        return (
            <View style={{width:k_Screen_Width,height:50,flexDirection:'row',alignItems:'center'}}>
                <View style={[styles.listItemText,{width:80}]}>
                    <Text style={{color:'white',fontSize:12}}>{item.item.date}</Text>
                </View>
                <View style={[styles.listItemText,{width:60}]}>
                    <Text style={{color:'white',fontSize:12}}>{item.item.title}</Text>
                </View>
                <View style={[styles.listItemText,{width:(k_Screen_Width-220)/2}]}>
                    <Text style={{color:'white',fontSize:12}}>{item.item.amout}</Text>
                </View>
                <View style={[styles.listItemText,{width:(k_Screen_Width-220)/2}]}>
                    <Text style={{color:'white',fontSize:12}}>{item.item.note}</Text>
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
                text='3';
            break;
            case 2:
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
        const{accountListPromotionsData}=this.props;
        return (
            <View style={styles.container}>
                <AccountListView
                    listData = {accountListPromotionsData}
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
        accountListPromotionsData:store.UserReduce.accountListPromotionsData,
    }
}

export default connect(propsFromStore)(AccountPromotionsList);