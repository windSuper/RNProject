import React, { Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableHighlight,
    Dimensions,
}from 'react-native';
var k_Screen_Width = Dimensions.get('screen').width;
var k_Screen_Height = Dimensions.get('screen').height;
var k_Scale_Size = Dimensions.get('screen').width/320;

class HomeNav extends Component {

    static defaultProps={
        _websiteBtnAction:null,
        _searchBtnAction:null,
        _historyBtnAction:null,
    }

    render() {
        return (
            <View style={styles.container}>
                {/* 站内信按钮 */}
                <TouchableHighlight activeOpacity={0.5}
                underlayColor={'transparent'} onPress={this.props._websiteBtnAction}>
                    <View style={[styles.columnContainer]}>
                        <Image
                        source={require('../imgs/Home/home_nav_icon_mail.png')}
                        style={styles.leftImageStyle}
                        />
                        <Text style={styles.navTitleStyle}>站内信</Text>
                    </View>
                </TouchableHighlight>

                {/* 搜索按钮 */}
                <TouchableHighlight underlayColor={'transparent'} onPress={this.props._searchBtnAction}>
                    <View style={styles.rowContainer}>
                        <Image
                        source={require('../imgs/Home/home_nav_icon_search.png')}
                        style={styles.seachImageStyle}
                        />
                        <View style={styles.lineStyle}></View>
                        <Text style={styles.seachTextStyle}>热门搜索:船长的宝藏</Text>
                    </View>
                </TouchableHighlight>
                
                {/* 历史游戏按钮 */}
                <TouchableHighlight activeOpacity={0.5}
                underlayColor={'transparent'} onPress={this.props._historyBtnAction}>
                    <View style={[styles.columnContainer]}>
                        <Image
                        source={require('../imgs/Home/home_nav_icon_pasttime.png')}
                        style={styles.rightImageStyle}
                        />
                        <Text style={styles.navTitleStyle}>最近游戏</Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}

var styles = StyleSheet.create({

    container:{
        width:k_Screen_Width,
        height:64,
        marginTop:0,
        backgroundColor:'black',
        flexDirection:'row',
        justifyContent:'space-between',//主轴
        alignItems:'center',//次轴
    },
    columnContainer:{
        width:50,
        height:44,
        marginTop:20,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
    },
    rowContainer:{
        width:k_Screen_Width-100,
        height:30,
        marginTop:20,
        alignItems:'center',
        flexDirection:'row',
        borderWidth:1,
        borderColor:'#d3a14a',
        borderRadius:15,
    },
    leftImageStyle:{
        width:22,
        height:19,
    },
    rightImageStyle:{
        width:22,
        height:22,
    },
    navTitleStyle:{
        width:50,
        height:10,
        fontSize:10,
        color:'#d3a14a',
        marginTop:2,
        textAlign:'center',
        alignSelf:'center',
    },
    seachImageStyle:{
        width:17,
        height:17,
        marginLeft:7,
    },
    lineStyle:{
        width:1,
        height:17,
        marginLeft:5,
        backgroundColor:'#d3a14a'
    },
    seachTextStyle:{
        marginLeft:5,
        width:k_Screen_Width-150,
        height:17,
        fontSize:12,
        color:'#d3a14a',
    },
})

export default HomeNav;