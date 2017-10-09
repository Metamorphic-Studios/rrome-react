'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});
exports.deleteDataById = deleteDataById;
exports.saveDataById = saveDataById;
exports.createDataByModel = createDataByModel;
exports.getDataById = getDataById;
exports.getDataByModel = getDataByModel;
var conf = require('../conf');

function deleteDataById(id) {
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

function saveDataById(id, data) {
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

function createDataByModel(id, data) {
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

function getDataById(id) {
   return fetch(conf.baseURL + 'data/id/' + id, {
      method: 'GET',
      credentials: 'include'
   }).then(function (resp) {
      return resp.json();
   });
}

function getDataByModel(id) {
   return fetch(conf.baseURL + 'data/model/' + id, {
      method: "GET",
      credentials: 'include'
   }).then(function (resp) {
      return resp.json();
   });
}