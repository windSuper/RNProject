//import liraries
import React, { PureComponent } from 'react'
import { Image,Platform,StyleSheet } from 'react-native'

// create a component
class TabBarItem extends PureComponent {
    render() {
        let selectedImage = this.props.selectedImage ? this.props.selectedImage : this.props.normalImage
        return (
            <Image
                source={this.props.focused
                    ? selectedImage
                    : this.props.normalImage}
                style={[{ tintColor: this.props.tintColor},styles.tabbarIconStyle]}
            />
        );
    }
}

const styles = StyleSheet.create({
  tabbarIconStyle: {
    width:Platform.OS === 'ios' ? 25 : 25,
    height:Platform.OS === 'ios' ? 25 : 25,
}
});

//make this component available to the app
export default TabBarItem;
