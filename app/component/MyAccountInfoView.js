import React, { PureComponent } from 'react';
import{
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    TouchableHighlight,
} from 'react-native';
import LocalDataManager from '../libs';
import {CompeletePersonInfo} from '../container';

var k_Screen_Width = Dimensions.get('screen').width;
var k_Screen_Height = Dimensions.get('screen').height;

class MyAccountInfoView extends PureComponent {

    _renderInfoView(){
        const {data} = this.props;
        var views = [];
        var titleArr = ['真实姓名','手机号码','电子邮箱','安全密钥'];
        let trueName = data.true_name;
        let secret = parseInt(data.bind_secret) ? data.secret_int : '尚未绑定谷歌验证'
        var contentArr = [trueName,data.telephone,data.email,secret];
        var conditionArr = [];
        conditionArr.push(1);
        conditionArr.push(parseInt(data.bind_tel));
        conditionArr.push(parseInt(data.bind_mail));
        conditionArr.push(parseInt(data.bind_secret));
        titleArr.map((title,index)=>{
            var img = conditionArr[index] ? null : <Image style={styles.arrowStyle} source={require('../imgs/Login/list_next.png')}/>
            views.push(
                <TouchableHighlight key={index} onPress={()=>this._tapInfoIndex(index,img)} activeOpacity={0.6} underlayColor={'transparent'}>
                    <View style={styles.infoItem}>{/* 纵向布局 */}
                        <View style={styles.itemRowContainer}>{/* 横向布局 */}
                            <View style={styles.itemTitleContainer}>{/* title容器 */}
                                <Text style={styles.titleStyle}>{title}</Text>
                                <Text style={styles.contentStyle}>{contentArr[index]}</Text>
                            </View>
                            {img}
                        </View>
                        <View style={styles.lineStyle}></View>
                    </View>
                </TouchableHighlight>
            )
        })
        return views;
    }
    _tapInfoIndex(index,img){
        const{navigator}=this.props;
        if(img){
            navigator.push({component:CompeletePersonInfo});
        }
        return;
    }

    render() {
        return (
            <View style={styles.container}>
                {this._renderInfoView()}
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container:{
        width:k_Screen_Width,
        height:44*4,
    },
    infoItem:{
        width:k_Screen_Width,
        height:44,
        backgroundColor:'#191919',
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

export default MyAccountInfoView;