import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    Dimensions,
    ScrollView,
    TouchableHighlight,
}from 'react-native';
var k_Screen_Width = Dimensions.get('screen').width;
var k_Screen_Height = Dimensions.get('screen').height;

class SubNav extends Component {

    static defaultProps={
        backAction:null,
        showNavMenuAction:null,
    }

    state={
        showMenu:false,
    }

    _backAction(){
        const {navigator} = this.props;
        if(navigator){
            navigator.pop();
        }
    }

    _showNavMenuAction(){
        this.setState({showMenu:!this.state.showMenu})
    }

    // navmenu selected Action
    _selectedMenuIndex(index){
        const {navigator} = this.props;
        this.setState({showMenu:false})
    }

    componentWillUnmount() {
        
        this.setState({showMenu:false})
    }
    _hiddenNavAction(){
        this.setState({showMenu:false})
    }

    render() {
        const{showMenu}=this.state;
        const {navigation,backAction} = this.props;
        var menu = showMenu ? <NavMenu selectedMenuIndex={(index)=>this._selectedMenuIndex(index)}
                                hiddenNavAction={()=>this._hiddenNavAction()}/> : null ;

        var backToPrevious = backAction ? ()=>backAction() : ()=>this._backAction()
        return (
            <View style={styles.container}>
                {menu}
                <View style={styles.navContainer}>
                    <TouchableHighlight activeOpacity={0.5}
                        underlayColor={'transparent'} onPress={backToPrevious}> 
                        <View style={styles.backBtnContainer}>
                            <Image style={styles.leftImageStyle} source={require('../imgs/MyAccount/nav_back_icon.png')}/>
                            <Text style={styles.leftTitleStyle}>返回</Text>
                        </View>
                    </TouchableHighlight>
                    <Text style={styles.navTitleStyle}>{this.props.title}</Text>
                    <TouchableHighlight activeOpacity={0.5}
                        underlayColor={'transparent'} onPress={this._showNavMenuAction.bind(this)}> 
                        <Image style={styles.rightImageStyle} source={require('../imgs/MyAccount/nav_menu_icon.png')}/>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

export class NavMenu extends Component{

    _renderMenu(){
        var views = [];
        var titleArr = ['回到首页','电子游戏','真人娱乐','体育赛事','彩票投注','个人中心'];
        var imgArr =  [ require('../imgs/NavMenu/preferential_icon_home.png'),
                        require('../imgs/NavMenu/preferential_icon_slot.png'),
                        require('../imgs/NavMenu/preferential_icon_live.png'),
                        require('../imgs/NavMenu/preferential_icon_sports.png'),
                        require('../imgs/NavMenu/preferential_icon_lottery.png'),
                        require('../imgs/NavMenu/preferential_icon_personal.png'),];
        imgArr.map((img,index)=>{
            views.push(
                <View key={index} style={{ width:85,height:40,}}>
                    <TouchableHighlight activeOpacity={0.5}
                        underlayColor={'transparent'} onPress={()=>this.props.selectedMenuIndex(index)}>
                        <View style={styles.menuItemStyle}>
                            <Image style={styles.itemImgStyle} source={img}/>
                            <View style={styles.itemTitleStyle}>
                                <Text style={{color:'white',fontSize:12,}}>{titleArr[index]}</Text>
                            </View>
                        </View>
                    </TouchableHighlight>
                    <View style={{ width:85,height:1,backgroundColor:'#5a5a5a'}}></View>
                </View>
            )
        })

        return views;
    }

    render(){
        return(
            <View style={styles.menuContainerStyle}>
                {/* maskView */}
                <View style={styles.maskViewStyle} onTouchEnd={()=>this.props.hiddenNavAction()}></View>
                {/* menu container */}
                <View style={styles.menuViewStyle}>
                    {this._renderMenu()}
                </View>
            </View>
        )
    }
}

var styles = StyleSheet.create({

    container:{
        zIndex:999,
        height:64,
        width:k_Screen_Width,
        backgroundColor:'#0c0c0c',
    },
    navContainer:{
        height:44,
        marginTop:20,
        width:k_Screen_Width,
        flexDirection:'row',
        alignItems:'center',
    },
    backBtnContainer:{
        flexDirection:'row',
        alignItems:'center',
        marginLeft:12,

    },
    leftImageStyle:{
        width:16,
        height:16,
    },
    leftTitleStyle:{
        color:'#d3a41a',
        fontSize:13,
    },
    rightImageStyle:{
        width:30,
        height:16,
        resizeMode:'contain',
        marginRight:12,
    },
    navTitleStyle:{
        color:'white',
        fontSize:15,
        flex:1,
        textAlign:'center',
    },
    lineStyle:{
        marginBottom:0,
        height:0.5,
        width:k_Screen_Width,
        backgroundColor:'#1c1c1c',
    },

    // navMenuStyle

    menuContainerStyle:{
        position:'absolute',
        width:k_Screen_Width,
        height:k_Screen_Height-64,
        marginTop:64,
    },
    maskViewStyle:{
        position:'absolute',
        width:k_Screen_Width,
        height:k_Screen_Height-64,
        opacity:0.6,
        backgroundColor:'black',
    },
    menuViewStyle:{
        width:85,
        height:240,
        marginLeft:k_Screen_Width-85,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#171615',
        borderRadius:3,
    },
    menuItemStyle:{
        width:85,
        height:39,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    },
    itemImgStyle:{
        width:20,
        height:20,
    },
    itemTitleStyle:{
        width:55,
        height:20,
        marginLeft:5,
        justifyContent:'center',
        alignItems:'center',
    },


});
export default SubNav;