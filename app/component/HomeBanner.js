import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableHighlight,
    Dimensions,
}from 'react-native';

import { connect } from 'react-redux';
import {BannerRequestAction} from '../action/HomeAction.js'
import CarouselView from '../libs/CarouselView.js';  

var k_Screen_Width = Dimensions.get('screen').width;
var k_Screen_Height = Dimensions.get('screen').height;
var k_Scale_Size = Dimensions.get('screen').width/414;


class HomeBanner extends Component {

    static defaultProps={
        bannerData:null,
        selectBannerIndex:null,
    }

    componentWillMount(){
        this.props.dispatch(BannerRequestAction());
    }
    render() {
        const {bannerData}=this.props;
        var imgArrs=[];
        bannerData.map((item,index)=>{
            if(item.img4.length){
                imgArrs.push(item.img4);
            }
        })
        return (
            <CarouselView
                imageUrls={imgArrs}
                onPress = {(index)=>this.props.selectBannerIndex(bannerData[index])}
            >
            </CarouselView>             
        );
    }
}
function select(store){
    return{
        bannerData:store.HomeReduce.bannerData,
    }
}

export default  connect(select)(HomeBanner);