var conf = require('../conf');

export function deleteDataById(id) {
   return fetch(conf.baseURL + 'data/id/' + id + '/delete', {
      method: 'POST',
      credentials: 'include',
      headers: {
         'Content-Type': 'application/json'
      }
   }).then(function (resp) {
      return resp.json();
   });
}

export function saveDataById(id, data) {
   return fetch(conf.baseURL + 'data/id/' + id, {
      method: 'POST',
      credentials: 'include',
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify({
         blob: data
      })
   }).then(function (resp) {
      return resp.json();
   });
}

export function createDataByModel(id, data) {
   return fetch(conf.baseURL + 'data/model/' + id, {
      method: 'POST',
      credentials: 'include',
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify({
         blob: data
      })
   }).then(function (resp) {
      return resp.json();
   });
}

export function getDataById(id) {
   return fetch(conf.baseURL + 'data/id/' + id, {
      method: 'GET',
      credentials: 'include'
   }).then(function (resp) {
      return resp.json();
   });
}

export function getDataByModel(id) {
   return fetch(conf.baseURL + 'data/model/' + id, {
      method: "GET",
      credentials: 'include'
   }).then(function (resp) {
      return resp.json();
   });
}