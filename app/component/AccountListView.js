
import React, { PureComponent } from 'react';
import{
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    FlatList,
    TouchableHighlight,
} from 'react-native';

import moment from 'moment';
import {connect} from 'react-redux';
import DatePicker from "react-native-datepicker";
import RefreshFlatList from '../libs/RefreshFlatList.js';

var k_Screen_Width = Dimensions.get('screen').width;
var k_Screen_Height = Dimensions.get('screen').height;

var nowTime = (new Date()).valueOf();
var sIndex=null;
class AccountListView extends PureComponent {

    static defaultProps={
        renderListItem:null,
        searchCallBack:null,
        listData:[],
        dateMode:'date',
        format:'YYYY-MM-DD',
        statusArr:['处理中','完成','拒绝'],
        minDate:'2014-07-28',
        maxDate:moment(nowTime).format('YYYY-MM-DD'),
        typeTitleArr:['日期','优惠类型','金额','状态','备注',],
        typeTitleWidthArr:[80,60,(k_Screen_Width-220)/2,(k_Screen_Width-220)/2,80,],
    }

    state={
        startDate:moment(nowTime).format('YYYY-MM-DD'),
        endDate:moment(nowTime).format('YYYY-MM-DD'),
        statusIndex:null,
    }

    render() {
        const {listData} = this.props;
        console.log('render= ',this.state.startDate);
        return (
            <View style={styles.container}>
                <View style={styles.conditionView}> 
                    {/* 日期选择 */}
                    {this.renderDatePicke()}
                    {/* 状态选择 */}
                    <View style={styles.statusView}>
                        {this.renderStatusView()}
                    </View>
                </View>
                {/* 标题类型 */}
                <View>
                    <View style={styles.sectionTitleView}>
                        {this.renderTypeTitle()}
                    </View>
                </View>
                {/* 内容列表 */}
                <FlatList
                    style={{flex:1,borderWidth:1,borderColor:'#464646'}}
                    data={listData}
                    renderItem={(item)=>this.props.renderListItem(item)}
                    keyExtractor={this.keyExtractor}
                />
            </View>
        );
    }
    keyExtractor=(item,index)=>{
        return item.index ? item.index :index
    }

    renderTypeTitle(){
        var views=[];
        const {typeTitleArr,typeTitleWidthArr}=this.props;
        typeTitleArr.map((title,index)=>{
            views.push(
                <View key={index} style={{height:35,width:typeTitleWidthArr[index],justifyContent:'center',alignItems:'center'}}>
                    <Text style={{color:'white',fontSize:13}}>{title}</Text>
                </View>
            )
        })
        return views;
    }

    renderDatePicke=()=>{
        const {dateMode,format,minDate,maxDate} = this.props;
        const {startDate,endDate} = this.state;
        return <View style={styles.dateView}>
            <DatePicker
                mode={dateMode}
                date = {startDate}
                minDate={minDate}
                maxDate={maxDate}
                format = {format}
                confirmBtnText={'确认'}
                cancelBtnText={'取消'}
                iconSource={require('../imgs/MyAccount/listing_calendar.png')}
                customStyles={{
                    dateIcon: {
                        position: 'absolute',
                        left:0,
                        marginLeft: 0
                    },
                    dateInput: {
                        height:30,
                        backgroundColor:'#191919',
                        borderColor:'#232323',
                    },
                    dateText:{
                        color:'white',
                    }            
                }}
                onDateChange={(date) => {this.setState({startDate: date})}}
            />
            <DatePicker
                mode={dateMode}
                date = {endDate}
                minDate={minDate}
                maxDate={maxDate}
                format = {format}
                confirmBtnText={'确认'}
                cancelBtnText={'取消'}
                iconSource={require('../imgs/MyAccount/listing_calendar.png')}
                customStyles={{
                    dateIcon: {
                        position: 'absolute',
                        left:0,
                        marginLeft: 0
                    },
                    dateInput: {
                        height:30,
                        backgroundColor:'#191919',
                        borderColor:'#232323',
                    },
                    dateText:{
                        color:'white',
                    }
                }}
                onDateChange={(date) => {this.setState({endDate: date})}}

            />
            <TouchableHighlight onPress={()=>this._searchDataAction()} underlayColor={'transparent'}>
                <View style={styles.searchBtn}>
                    <Image style={{width:15,height:15,marginLeft:2,}} source={require('../imgs/MyAccount/listing_search.png')}/>
                    <View style={{flex:1,justifyContent:'center',marginLeft:5,}}>
                        <Text style={{color:'white',fontSize:13}} >搜索</Text>
                    </View>
                </View>
            </TouchableHighlight>
        </View>
    }

    renderStatusView=()=>{
        const {statusArr}=this.props;
        const {statusIndex}=this.state;
        var statuViews=[];
        statusArr.map((title,index)=>{
            let img = index===statusIndex ? require('../imgs/MyAccount/listing_choose.png') :require('../imgs/MyAccount/listing_uncheck.png') 
            let titleColor = index===statusIndex ? '#d3a14a' : 'white' 
            statuViews.push(
                <TouchableHighlight onPress={()=>this._statusSelectedIndex(index)} key={index} underlayColor={'transparent'}>
                    <View style={styles.statusItem}>
                        <Image style={{width:12,height:12}} source={img}/>
                        <View style={{flex:1,justifyContent:'center',marginLeft:5,}}>
                            <Text style={{color:titleColor,fontSize:12}} >{title}</Text>
                        </View>
                    </View>
                </TouchableHighlight>
            )
        })
        return statuViews;
    }

    _statusSelectedIndex(index){
        const {statusIndex,startDate,endDate}=this.state;
        const {searchCallBack}=this.props;
        if(statusIndex===index){
            sIndex=null; 
        }
        else{
            sIndex=index;
        };
        this.setState({statusIndex:sIndex});
        //将选择条件传到父组件
        if(searchCallBack){
            searchCallBack(sIndex,startDate,endDate,);
        }
    }
    
    _searchDataAction(){
        const {statusIndex,startDate,endDate}=this.state;
        const {searchCallBack}=this.props;
        //将选择条件传到父组件
        if(searchCallBack){
            searchCallBack(statusIndex,startDate,endDate,);
        }
    }
}
var styles = StyleSheet.create({
    container:{
        flex:1,
        width:k_Screen_Width,
    },
    conditionView:{
        width:k_Screen_Width,
        height:105,
        backgroundColor:'black',
        justifyContent:'center',
    },
    dateView:{
        width:k_Screen_Width-24,
        height:40,
        marginLeft:12,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
    },
    searchBtn:{
        width:50,
        height:30,
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'#191919',
    },
    statusView:{
        width:k_Screen_Width-30,
        height:20,
        marginTop:15,
        marginLeft:15,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
    },
    statusItem:{
        width:70,
        height:20,
        flexDirection:'row',
        alignItems:'center',
    },
    sectionTitleView:{
        flexDirection:'row',
        alignItems:'center',
        width:k_Screen_Width,
    },

})

function propsFromStore(store){
    return{
    }
}

export default connect(propsFromStore)(AccountListView);