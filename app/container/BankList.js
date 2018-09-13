import React, { Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableHighlight,
    FlatList,
    Dimensions,
}from 'react-native';

import {SubNav} from '../component';
import {connect} from 'react-redux';
import {BankListRequestAction} from '../action/BankAction.js'
var k_Screen_Width = Dimensions.get('screen').width;
var k_Screen_Height = Dimensions.get('screen').height;
var k_Scale_Size = Dimensions.get('screen').width/320;

class BankList extends Component {

    componentWillMount() {
        const {dispatch}=this.props;
        dispatch(BankListRequestAction());
    }
    _backAction(code){
        const{navigator,callBack}=this.props;
        if(callBack){callBack(code)}
        navigator.pop();
    }

    render() {
        const{navigator,bankListData}=this.props;  
        return (
            <View style={styles.container}>
                <SubNav title={'银行列表'} navigator={navigator}/>
                <FlatList style={{flex:1}} automaticallyAdjustContentInsets={false}
                          data={bankListData}
                          keyExtractor={this.keyExtractor}
                          renderItem={this.renderListItem}
                />
            </View>
        );
    }

    keyExtractor=(item,index)=>{
        return item.index ? item.index : index;
    }
    
    renderListItem=(item)=>{
        
        return <TouchableHighlight onPress={()=>{this._backAction(item.item.code)}}>
            <View style={styles.listItem}>
                <Image style={styles.listBankLogo} source={this.turnBankCodeToBankLogo(item.item.code)}/>
                <View style={styles.listBankName}>
                    <Text style={{color:'white',fontSize:14}}>{this.turnBankCodeToBankName(item.item.code)}</Text>
                </View>
            </View> 
        </TouchableHighlight>
    }
    turnBankCodeToBankLogo(bankCode){
        switch(bankCode){
            case 'CCB'||'ccb':
                return require('../imgs/Bank/bank_icon_ccb.png');
            case 'ABC'||'abc':
                return require('../imgs/Bank/bank_icon_abc.png');
            case 'ICBC'||'icbc':
                return require('../imgs/Bank/bank_icon_icbc.png');
            case 'BOC'||'boc':
                return require('../imgs/Bank/bank_icon_boc.png');
            case 'CMBC'||'cmbc':
                return require('../imgs/Bank/bank_icon_cmbc.png');
            case 'CMB'||'cmb':
                return require('../imgs/Bank/bank_icon_cmb.png');
            case 'CIB'||'cib':
                return require('../imgs/Bank/bank_icon_cib.png');
            case 'BCCB'||'bccb':
                return require('../imgs/Bank/bank_icon_bob.png');
            case 'BOCOM'||'bocom':
                return require('../imgs/Bank/bank_icon_bcm.png');
            case 'CEB'||'ceb':
                return require('../imgs/Bank/bank_icon_ceb.png');
            case 'GDB'||'gdb':
                return require('../imgs/Bank/bank_icon_gdb.png');
            case 'SPDB'||'spdb':
                return require('../imgs/Bank/bank_icon_spdb.png');
            case 'PSBC'||'psbc':
                return require('../imgs/Bank/bank_icon_psbc.png');
            case 'HXB'||'hxb':
                return require('../imgs/Bank/bank_icon_hxb.png');
            case 'PAB'||'pab':
                return require('../imgs/Bank/bank_icon_pab.png');
            case 'CNCB'||'cncb':
                return require('../imgs/Bank/bank_icon_cncb.png');
            case 'SRCB'||'srcb':
                return require('../imgs/Bank/bank_icon_shny.png');
            case 'BOS'||'bos':
                return require('../imgs/Bank/bank_icon_sh.png');
            case 'BOCSH'||'bocsh':
                return require('../imgs/Bank/bank_icon_boc.png');
            default:
                return require('../imgs/Bank/bank_icon_icbc.png');
        }
    }
    turnBankCodeToBankName(bankCode){
        switch(bankCode){
            case 'CCB'||'ccb':
                return '建设银行';
            case 'ABC'||'abc':
                return '农业银行';
            case 'ICBC'||'icbc':
                return '工商银行';
            case 'BOC'||'boc':
                return '中国银行';
            case 'CMBC'||'cmbc':
                return '民生银行';
            case 'CMB'||'cmb':
                return '招商银行';
            case 'CIB'||'cib':
                return '兴业银行';
            case 'BCCB'||'bccb':
                return '北京银行';
            case 'BOCOM'||'bocom':
                return '交通银行';
            case 'CEB'||'ceb':
                return '中国光大银行';
            case 'GDB'||'gdb':
                return '广东发展银行';
            case 'SPDB'||'spdb':
                return '上海浦东发展银行';
            case 'PSBC'||'psbc':
                return '中国邮政';
            case 'HXB'||'hxb':
                return '深圳发展银行';
            case 'PAB'||'pab':
                return '平安银行';
            case 'CNCB'||'cncb':
                return '中信银行';
            case 'SRCB'||'srcb':
                return '上海农商银行';
            case 'BOS'||'bos':
                return '上海银行';
            case 'BOCSH'||'bocsh':
                return '中国农商银行';
            default:
                return '建设银行';
        }
    }
}

var styles = StyleSheet.create({

    container:{
        width:k_Screen_Width,
        height:k_Screen_Height,
        backgroundColor:'black',
    },
    listItem:{
        width:k_Screen_Width,height:40,backgroundColor:'#191919',flexDirection:'row',alignItems:'center',borderBottomWidth:1,borderColor:'#464646'
    },
    listBankLogo:{
        width:20,height:20,marginLeft:12,
    },
    listBankName:{
        width:k_Screen_Width-54,height:20,marginLeft:10,justifyContent:'center'
    },
})

function propsFromStore(store){
    return{
        bankListData:store.BankReduce.bankListData,
    }
}

export default connect(propsFromStore)(BankList);