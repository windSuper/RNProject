'use strict';

import React, { PureComponent } from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback, Image, ScrollView, Dimensions } from 'react-native'
import Swiper from 'react-native-swiper'
import { CachedImage } from "react-native-img-cache"

class CarouselView extends PureComponent {

    props:{
        imageUrls: Array<any>,
        resizeMode: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center',
        width: number,
        imageRate: number,
        dotColor: string,
        activeDotColor: string,
        onPress: (index: number) => void,
    }

    state={
        currentPage: 0,
        swiperShow:false,
    }

    static defaultProps = {
        imageUrls: [],
        resizeMode: 'cover',
        width: Dimensions.get('window').width,
        imageRate: 0.33,
        dotColor: 'gray',
        activeDotColor: 'white',
    }


    selectAtIndex(index: number) {
        this.props.onPress && this.props.onPress(index)
    }

    componentDidMount(){
        this.setState({
            swiperShow:true
        });
    }


    _renderSwiper(){
        let { width, imageUrls, resizeMode, imageRate, dotColor, activeDotColor, ...attributes } = this.props
        let height = width * imageRate;
        if(this.state.swiperShow){
            return <Swiper
                    height={height}
                    autoplay={true}
                    paginationStyle={{ bottom: height * 0.06 }}
                    dotColor={dotColor}
                    activeDotColor={activeDotColor}
                    {...attributes}
                >
                    {imageUrls.map((url, index) => (
                        <TouchableWithoutFeedback
                            key={index + url}
                            onPress={() => this.selectAtIndex(index)}
                        >
                            <CachedImage
                                style={{ width: width, height: height }}
                                source={{ uri: url }}
                                resizeMode={resizeMode}
                            />
                        </TouchableWithoutFeedback>
                    ))}
                </Swiper>
        }else{
            return <View style={{height:height}}></View>
        }
    }

    render() {
        
           return <View>
              {this._renderSwiper()}
           </View>
    }
}

const styles = StyleSheet.create({

});


export default CarouselView;