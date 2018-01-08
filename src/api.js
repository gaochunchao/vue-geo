/**
 * Created by 高春超 on 2017/4/18.
 * 说明：后台接口Api文件
 */
import axios from 'axios';
import qs from 'qs';
import Promise from 'pinkie-promise';
// axios 配置
// axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoed;charset=UTF-8';

axios.defaults.baseURL = 'http://192.168.100.102:8007/api';

// request 拦截器
// axios.interceptors.request.use((config) => {
//   if (getToken()) {
//     config.headers['token'] = getToken();
//   }
//   return config;
// }, (error) => {
//   console.log(error);
//   return Promise.reject(error);
// });

// //返回状态判断
// axios.interceptors.response.use((res) => {
//   if (res.data.resCode === 31 || res.data.resCode === 32 || res.data.resCode === 33) {
//     Modal.confirm({
//       title: '确认对话框标题',
//       content: '你已被登出，可以取消继续留在该页面，或者重新登录',
//       okText: '登录',
//       onOk: () => {
//         setToken('');
//         location.reload();// 为了重新实例化vue-router对象 避免bug
//       },
//       cancelText: '取消'
//     });
//   } else{
//     return res;
//   }
// }, (error) => {
//   console.log("网络异常");
//   return Promise.reject(error);
// });

export function fetch(method, url, params) {
  return new Promise((resolve, reject) => {
    if (method == 'get') {
      axios.get(url, {params: params})
        .then(response => {
          resolve(JSON.parse(JSON.stringify(response.data)));
        }, err => {
          reject(err);
        })
        .catch((error) => {
          reject(error)
        })
    } else if (method == 'post') {
      axios.post(url + "?" + qs.stringify(params))
        .then(response => {
          resolve(JSON.parse(JSON.stringify(response.data)));
        }, err => {
          reject(err);
        })
        .catch((error) => {
          reject(error)
        })
    }
  })
}

export default {
  getPortEconomic(className){
    return fetch('get', `/portEconomicOverview/${className}`);
  },
  getOperatingSigns(className,parmater){
    return fetch('get', `/operatingSigns/${className}`,parmater);
  },
  getPortEconomicOverview(className,parmater){
    return fetch('get', `/portEconomicOverview/${className}`,parmater);
  },
  getPublicHotline(className,parmater){
    return fetch('get', `/publicHotline/${className}`,parmater);
  },
  getBusinessEconomy(className,parmater){
    return fetch('get', `/businessEconomy/${className}`,parmater);
  },
  getIndustryAnalysis(className,parmater){
    return fetch('get', `/industryAnalysis/${className}`,parmater);
  },
};
