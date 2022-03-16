const axios = require('axios');


//if (auth && hosting) {
//         config.headers['Authorization'] = auth
//     }

const Api = async ({host, url, data=null, auth=false, type='get',pax=false}) => {
  let response = {};
  const config = {
    headers: {
      'Content-Type': 'application/json',
      /*'Authorization': 'Basic YXJjYTphcmNh'*/
      /*'token': 'akmalnadirov'*/
    },
  }

  auth && (config.headers['Authorization'] = `Basic ${auth}`);
  pax && (config.headers['token'] = `akmalnadirov`);

  if (type === 'get') {
    try {
      response = await axios.get(`${host}${url}`, config);
      // console.log('&&& GET', response);
    } catch (error) {
      response = error;
      // console.log('!!! GET', response);
    }
  }

  if (type === 'post') {
    try {
      response = await axios.post(`${host}${url}`, data, config);
      // console.log('&&& POST', response);
    } catch (error) {
      response = error;
      // console.log('!!! POST', response);
    }
  }
  return response.data;
}

module.exports = {Api}