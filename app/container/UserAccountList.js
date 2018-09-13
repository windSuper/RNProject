import React, { PureComponent } from 'react';
import{
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    Dimensions,
    TouchableHighlight,
} from 'react-native';

import LocalDataManager from '../libs/LocalDataManager.js';
import SubNav from '../component/SubNav.js';
import {AccountEduList,AccountInAndOutList,AccountPaiCaiList,AccountPromotionsList} from '../component'

var k_Screen_Width = Dimensions.get('screen').width;
var k_Screen_Height = Dimensions.get('screen').height;
class UserAccountList extends PureComponent {

    state={
        currentIndex:0,
    }

    _rendertopTypeTitle(){
        var views=[];
        const {currentIndex} = this.state;
        var titleArr = ['优惠记录','额度操作','出入款','投注派彩'];
        titleArr.map((title,index)=>{
            let tcolor = currentIndex===index ? 'black' : 'white';
            let bgcolor = currentIndex===index ? '#d3a14a' : 'transparent';
            views.push(
                <TouchableHighlight onPress={()=>{this._typeSelectedAction(index)}} key={index} underlayColor={'transparent'}>
                    <View style={{width:65,height:20,backgroundColor:bgcolor}}>
                        <View style={styles.typeTitle}>
                            <Text style={{fontSize:14,color:tcolor}}>{title}</Text>
                        </View>
                    </View>
                </TouchableHighlight>
            )
        })
        return views;
    }

    _typeSelectedAction(index){
        const {currentIndex} = this.state;
        if(index===currentIndex){return}
        else{
            this.setState({currentIndex:index})
            this.listScroll.scrollTo({x:index*k_Screen_Width,y:0,});
        };
    }

    _scrollViewPageChangeAction(e){
        let index = e.nativeEvent.contentOffset.x/k_Screen_Width;
        const {currentIndex} = this.state;
        if(currentIndex===index){return}
        else{
            this.setState({currentIndex:index});
        }
        console.log('contentWidthChange',index);
    }
    render() {
        const{navigator}=this.props;
        return (
            <View style={styles.container}>
                <SubNav title={'账户清单'} navigator={navigator}/>
                {/* 4种类型标题 */}
                <View style={styles.topTypeTitle}>
                {this._rendertopTypeTitle()}
                </View>
                <ScrollView ref={(e)=>{this.listScroll=e}} bounces={false} pagingEnabled={true} contentContainerStyle={styles.scollStyle} automaticallyAdjustContentInsets={false} 
                onMomentumScrollEnd={(e)=>this._scrollViewPageChangeAction(e)}> 
                    {/* 优惠记录 */}
                    <AccountPromotionsList/>
                    {/* 额度操作 */}
                    <AccountEduList/>
                    {/* 出入款 */}
                    <AccountInAndOutList/>
                    {/* 投注派彩 */}
                    <AccountPaiCaiList/>
                </ScrollView>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#0c0c0c',
    },
    topTypeTitle:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        width:k_Screen_Width-24,
        marginLeft:12,
        height:50,
    },
    scollStyle:{
        flexDirection:'row',
        width:k_Screen_Width*4,
        height:k_Screen_Height-64-50,
        backgroundColor:'blue',
    },
    typeTitle:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    }
})

export default UserAccountList;