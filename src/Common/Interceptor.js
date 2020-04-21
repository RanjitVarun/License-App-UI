import axios from 'axios';
import { Storage } from 'react-jhipster';

const setupAxiosInterceptors = onUnauthenticated => {
  console.log("interceptor:" + Storage.local.get("ApolloApiUrl"));
  const onRequestSuccess = config => {
    const custId = Storage.local.get('CustId');
    const userId = Storage.local.get('UserId');
    const bankNo = Storage.local.get('BankNo');
    if (custId && userId) {
      config.headers.common['CustId'] = custId;
      config.headers.common['UserId'] = userId;
      config.headers.common['BankNo'] = bankNo;
    }
    return config;
  };

  const onResponseSuccess = response => response;

  const onResponseError = err => {
    const status = err.status || (err.response ? err.response.status : 0);
    if (status === 403 || status === 401) {
      onUnauthenticated();
    }
    return Promise.reject(err);
  };

  axios.interceptors.request.use(onRequestSuccess);
  axios.interceptors.response.use(onResponseSuccess, onResponseError);
};

export default setupAxiosInterceptors;
