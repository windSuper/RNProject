import React,{Component} from 'react'
import{
	ActivityIndicator,
	View,
	Text,
	StyleSheet,
	Dimensions,
}from 'react-native';

var k_Screen_Width = Dimensions.get('screen').width;
var k_Screen_Height = Dimensions.get('screen').height;

class Loading extends Component{

	 props: {
        title?: string,
    }

    static defaultProps = {
        title: '加载中...',
	}
	
    render(){

        return(
			<View  style = {styles.container}>
				<View style = {styles.indicator}> 
					<ActivityIndicator 
						size = 'large'
						color = 'white'
					/>
					<Text style = {styles.indicatorText}>{this.props.title}</Text>
				</View>
			</View>
        );
    }
}

var styles = StyleSheet.create({
	container:{
		position:'absolute',
		zIndex:999999999,
		alignItems:'center',
		justifyContent:'center',
		width:k_Screen_Width,
		height:k_Screen_Height,
		marginTop:0,
		backgroundColor:'transparent',

	},
    indicator:{
		alignItems:'center',
		justifyContent:'center',
		width:80,
		height:80,
		opacity:0.8,
		backgroundColor:'black',
	},
	indicatorText:{
		textAlign:'center',
		color:'white',
	}

})

module.exports = Loading;