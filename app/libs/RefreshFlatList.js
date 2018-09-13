import React, { PureComponent,PropTypes} from 'react';
import { View, Text, StyleSheet, RefreshControl, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';

const RefreshState = 'Idle' | 'Refreshing' | 'NoMoreData' | 'Failure'

let debug = false

class RefreshFlatList extends PureComponent {

    props: {
        onHeaderRefresh: () => void,
        onFooterRefresh: () => void,
        footerRefreshingText?: string,
        footerFailureText?: string,
        footerNoMoreDataText?: string,
        data: Array<any>,
    }

    state: {
        headerState: RefreshState,
        footerState: RefreshState,
    }

    static defaultProps = {
        footerRefreshingText: '正在加载更多……',
        footerFailureText: '点击重新加载',
        footerNoMoreDataText: '已加载全部数据'
    }

    constructor(props: Object) {
        super(props)

        this.state = {
            headerState: 'Idle',
            footerState: 'Idle',
            shouldRefresh:false,
            shouldLoadMore:false,
        }
    }

    startHeaderRefreshing() {
        debug && console.log('startHeaderRefreshing')

        this.setState({ headerState: 'Refreshing' })

        if (this.props.onHeaderRefresh) {
            this.props.onHeaderRefresh()
        }
    }

    startFooterRefreshing() {
        debug && console.log('startFooterRefreshing')

        this.setState({ footerState: 'Refreshing' })

        if (this.props.onFooterRefresh) {
            this.props.onFooterRefresh()
        }
    }

    shouldStartHeaderRefreshing() {
        debug && console.log('shouldStartHeaderRefreshing')

        if (this.state.headerState == 'Refreshing' ||
            this.state.footerState == 'Refreshing') {
            return false
        }

        return true
    }

    shouldStartFooterRefreshing() {
        debug && console.log('shouldStartFooterRefreshing')

        if (this.state.headerState == 'Refreshing' ||
            this.state.footerState == 'Refreshing') {
            return false
        }
        if (this.state.footerState == 'Failure' ||
            this.state.footerState == 'NoMoreData') {
            return false
        }
        if (this.props.data.length == 0) {
            return false
        }

        return true
    }

    endRefreshing(refreshState: RefreshState) {
        debug && console.log('endRefreshing')

        if (refreshState === 'Refreshing') {
            return
        }
        let footerState = refreshState
        if (this.props.data.length == 0) {
            footerState = 'Idle'
        }
        this.setState({
            headerState: 'Idle',
            footerState: footerState

        })
    }

    headerState() {
        return self.state.headerState
    }

    footerState() {
        return self.state.footerState
    }

    onHeaderRefresh() {
        if (this.shouldStartHeaderRefreshing()&&this.state.shouldRefresh) {
            this.startHeaderRefreshing();
            this.setState({shouldRefresh:false});

        }
    }

    onEndReached(info: any) {
        debug && console.log('onEndReached   ' + info.distanceFromEnd)

        if (this.shouldStartFooterRefreshing()&&this.state.shouldLoadMore) {
            this.startFooterRefreshing();
            this.setState({shouldLoadMore:false});

        }
    }

    render() {
        return (
            <FlatList
                {...this.props}
                data = {this.props.data}
                onEndReachedThreshold={-0.1}
                onEndReached={(info) => this.onEndReached(info)}
                onRefresh={() => this.onHeaderRefresh()}
                refreshing={this.state.headerState === 'Refreshing'}
                ListFooterComponent={() => this.renderFooter()}
                onResponderRelease={this.handleResponderRelease.bind(this)}
            />

        );
    }


    handleResponderRelease () {

        this.setState({shouldRefresh:true,shouldLoadMore:true});
    }

    renderFooter() {
        let footer = null;

        switch (this.state.footerState) {
            case 'Idle':
                <TouchableOpacity
                    style={styles.footerContainer}
                >
                        <Text style={styles.footerText}>
                           上拉加载更多
                        </Text>
                </TouchableOpacity>
                break;
            case 'Failure': {
                footer =
                    <TouchableOpacity
                        style={styles.footerContainer}
                        onPress={() => this.startFooterRefreshing()}
                    >
                        <Text style={styles.footerText}>
                            {this.props.footerFailureText}
                        </Text>
                    </TouchableOpacity>
                break;
            }
            case 'Refreshing': {
                footer =
                    <View style={styles.footerContainer} >
                        <ActivityIndicator size="small" color="#888888" />
                        <Text style={[styles.footerText, { marginLeft: 7 }]}>
                            {this.props.footerRefreshingText}
                        </Text>
                    </View>
                break;
            }
            case 'NoMoreData': {
                footer =
                    <View style={styles.footerContainer} >
                        <Text style={styles.footerText}>
                            {this.props.footerNoMoreDataText}
                        </Text>
                    </View>
                break;
            }
        }

        return footer;
    }

}

// define your styles
const styles = StyleSheet.create({
    footerContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        height: 44,
    },
    footerText: {
        fontSize: 14,
        color: 'white'
    }
});

//make this component available to the app
export default RefreshFlatList;