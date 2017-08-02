import {
	baseUrl
} from './env'

export default async(url = '', data = {}, type = 'GET', method = 'fetch') => {
	type = type.toUpperCase();
	url = baseUrl + url;
	if (type == 'GET') {
		let dataStr = ''; //数据拼接字符串
		Object.keys(data).forEach(key => {
			dataStr += key + '=' +  data[key] + '&';
		})

		if (dataStr !== '') {
      dataStr = dataStr.slice(0, -1);
      url = url + '?' + dataStr;
		}
	}

	if (window.fetch && method == 'fetch') {
		let requestConfig = {
			credentials: 'include',  // credentials 是Request接口的只读属性，用于表示用户代理是否应该在跨域请求的情况下从其他域发送cookies。这与XHR的withCredentials 标志相似，不同的是有三个可选值（后者是两个）：omit: 从不发送cookies. same-origin: 只有当URL与响应脚本同源才发送cookies. include: 总是发送cookies, 即使来自跨域的请求
			method: type,
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			mode: "cors",  // 跨域请求
			cache: "force-cache"   // 设置缓存
		}

		if (type == 'POST') {
			Object.defineProperty(requestConfig, 'body', {
				value: JSON.stringify(data)
			})
		}

		try {
			const response = await fetch(url, requestConfig);
			const responseJson = await response.json();
			return responseJson
		} catch (error) {
			throw new Error(error)
		}
	} else {
	  // 当浏览器不支持fetch时候,用promise和xhr发请求
		return new Promise((resolve, reject) => {
			let requestObj;
			if (window.XMLHttpRequest) {
				requestObj = new XMLHttpRequest();
			} else {
				requestObj = new ActiveXObject;
			}

			let sendData = '';
			if (type == 'POST') {
				sendData = JSON.stringify(data);
			}

			requestObj.open(type, url, true);
			requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			requestObj.send(sendData);

			requestObj.onreadystatechange = () => {
				if (requestObj.readyState == 4) {
					if (requestObj.status == 200) {
						let obj = requestObj.response
						if (typeof obj !== 'object') {
							obj = JSON.parse(obj);
						}
						resolve(obj)
					} else {
						reject(requestObj)
					}
				}
			}
		})
	}
}
