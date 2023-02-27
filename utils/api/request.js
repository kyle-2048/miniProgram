import qs from "qs"; // 根据需求是否导入qs模块

import baseconfig from "./baseconfig";

import {
	getUserInfo
} from "@/utils/auth";

import login from "./login.js"; // 登录请求

var JSONbig = require('json-bigint')({ storeAsString: true });

/**
 * 生成query字符串
 *
 * @param params
 */
const httpBuildQueryString = (params) => {
	const paramKeys = Object.keys(params);
	let url = "";
	if (paramKeys.length > 0) {
		paramKeys.map((key) => {
			const val = encodeURIComponent(params[key]);
			url += `${key}=${val}&`;
		});
	}
	return url;
};

/**
 * 请求
 * @param {String} url 			请求地址
 * @param {Any} data 			请求数据
 * @param {String} method 		请求方法
 * @param {Object} setting 		其他设置
 */

// let DEBUG = true; //切换数据入口

//setting = { needLoading: true }
const request = (url, data = {}, method = "GET", setting = {}) => {
	// 处理 url
	if (setting.CDP) {
		url = baseconfig.CDPUrl() + url;
	} else {
		url = baseconfig.versionUrl() + url;
	}
	// 加载设置
	let loadingInstance = "";
	if (!data.hideLoading) {
		loadingInstance = uni.showLoading({
			title: "加载中",
			mask: true,
		});
	}

	//请求头
	let header = {};

	switch (setting.header) {
		case "XWWW": // x-www-form-urlencoded
			header["content-type"] = "application/x-www-form-urlencoded";
			data = qs.stringify(data);
			break;
		case "formData": // multipart/form-data
			header["content-type"] = "multipart/form-data";
			break;
		default:
			// json
			header["content-type"] = "application/json";
			break;
	}
	header["Origin"] = baseconfig.versionUrl();
	data["token"] = getUserInfo().token || "";

	// 请求相关
	let requestParams = {
		url: url,
		method: method,
		headers: header,
		data: data,
	};
	// 文件下载
	if (setting.type == "downLoad") {
		requestParams.responseType = "blob";
	}

	let promise = new Promise(function(resolve, reject) {
		uni.request({
			url: url || "", //仅为示例，并非真实接口地址。
			data: data || {},
			dataType: "text", //不用JSON，避免JSON.parse处理
			header: header,
			method: method || "GET",
			timeout: 90000,
			success: (res) => {
				if (res.data.code == "tokeninvalid") {
					// *登录超时,重新登录
					uni.reLaunch({
						url: "/pages/login/login",
					});
				}
				// else if (res.code !== "success") {
				//   uni.showToast({
				//     title: res.msg || "数据出错",
				//     icon: "none",
				//   });
				//   // reject(res || "error");
				//   resolve(res.data);
				// }
				else {
					resolve(res.data)
				}
				// 关闭loading
				if (loadingInstance) {
					setTimeout(() => {
						uni.hideLoading();
					}, 500);
				}
			},
			fail: function(err) {
				reject(err); // 失败结果
				// 关闭loading
				if (loadingInstance) {
					setTimeout(() => {
						uni.hideLoading();
					}, 500);
				}
			},
		});
	});
	return promise;
};

//request拦截器
uni.addInterceptor('request', {
  success(args) {
	  //超长数字精度丢失处理
	  try {
		args.data = JSONbig.parse(args.data)
	  } catch {
		args.data = JSON.parse(args.data)
	  }
  }
})

export default request;
