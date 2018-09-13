import React,{Component} from 'react';

import{
	AppRegistry,
} from 'react-native';
import LocalDataManager from './LocalDataManager.js';

class HttpRequest extends Component{

	/*
	*get请求
	*post请求
	*params请求参数
	*callback回调函数
	**/
	static requestData(url,successCallback,failCallback){

		LocalDataManager.queryLocalDataWithKey('Host',(host)=>{
			var fullUrl;
			if(url.indexOf('http')!==-1){
				fullUrl = url;
			}else{
				fullUrl=host+url;
			}
			fetch(fullUrl,{
				method:'POST',
				headers:{},
			})
			.then((result)=>result.json())
			.then(data=>{
				if (data.Status===200) {
					successCallback(data);
				}else{
					failCallback(data.Msg)
				}
			})

			.catch(function(err){
				failCallback(err);
				console.log('POST Url error='+url);

			});
		})


	}

	static requestDataWithParams(url,params,successCallback,failCallback){

		LocalDataManager.queryLocalDataWithKey('Host',(host)=>{
			let fullUrl;
			if(url.indexOf('http')!==-1){
				fullUrl = url;
			}else{
				fullUrl=host+url;
			}

			let formData = new FormData();
			if (params) {

				Object.keys(params).forEach(key=>{formData.append(key,params[key]);});
			}
			fetch(fullUrl,{
				method:'POST',
				headers:{},
				body:formData,
			})
			.then((result)=>result.json())
			.then(data=>{
				if (data.Status===200) {
					successCallback(data);
				}else{
					failCallback(data.Msg)
				}
			})

			.catch(function(err){
				console.log('POST Url error='+fullUrl);
				failCallback(err);
			});
		})
	}


	static getData(url,successCallback,failCallback){

		LocalDataManager.queryLocalDataWithKey('Host',(host)=>{
			let fullUrl;
			if(url.indexOf('http')!==-1){
				fullUrl = url;
			}else{
				fullUrl=host+url;
			}
			console.log('GET请求Url='+url);
			fetch(fullUrl,{
			})
			.then((result)=>result.json())
			.then((data)=>{
				if (data.Status===200) {
					successCallback(data);
				}else{
					failCallback(data.Msg)
				}
			})
			.catch(function(err){
				failCallback(err);
				console.warn(err);
			});
		});
	}

	static getDataWithParams(url,params,successCallback,failCallback){
		
		LocalDataManager.queryLocalDataWithKey('Host',(host)=>{
			let fullUrl;
			if(url.indexOf('http')!==-1){
				fullUrl = url;
			}else{
				fullUrl=host+url;
			}
			console.log('GET Url='+url);
			if (params) {

				let paramsArray = [];
				// 获取 params 内所有的 key
				let paramsKeyArray = Object.keys(params);
				// 通过 forEach 方法拿到数组中每个元素,将元素与参数的值进行拼接处理,并且放入 paramsArray 中
				paramsKeyArray.forEach(key => paramsArray.push(key + '=' + params[key]));
		
				// 网址拼接
				if (url.search(/\?/) === -1) {
					url += '?' + paramsArray.join('&');
				}else {
					url += paramsArray.join('&');
				}
			}
			console.log('GET请求fullUrl='+url);
			fetch(fullUrl,{
			})
			.then((result)=>result.json())
			.then((data)=>{
				if (data.Status===200) {
					successCallback(data);
				}else{
					failCallback(data.Msg)
				}
			})
			.catch(function(err){
				failCallback(err);
				console.warn(err);
			});
		});
	}
}


module.exports = HttpRequest;