var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';

var moment = require('moment');

var ExpiringDate = function (_Component) {
   _inherits(ExpiringDate, _Component);

   function ExpiringDate(props) {
      _classCallCheck(this, ExpiringDate);

      var _this = _possibleConstructorReturn(this, (ExpiringDate.__proto__ || Object.getPrototypeOf(ExpiringDate)).call(this, props));

      _this.state = _extends({}, props);
      return _this;
   }

   _createClass(ExpiringDate, [{
      key: 'componentWillRecieveProps',
      value: function componentWillRecieveProps(newProps) {
         if (this.props !== newProps) {
            this.setState(_extends({}, newProps));
         }
      }
   }, {
      key: '_render',
      value: function _render() {
         var date = new Date(this.state.value);
         var m = moment(date);
         if (date.getTime() < Date.now()) {
            return React.createElement(
               'div',
               { style: { marginRight: '5px' } },
               'Expires on ',
               m.format('DD/MM/YYYY'),
               ' '
            );
         } else {
            return React.createElement(
               'div',
               { style: { fontColor: 'red' } },
               'Expired on ',
               m.format('DD/MM/YYYY'),
               ' '
            );
         }
      }
   }, {
      key: 'render',
      value: function render() {
         return this._render();
      }
   }]);

   return ExpiringDate;
}(Component);

export default ExpiringDate;