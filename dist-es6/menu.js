var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';

import 'react-table/react-table.css';
import '../style.css';

var Menu = function (_Component) {
   _inherits(Menu, _Component);

   function Menu(props) {
      _classCallCheck(this, Menu);

      var _this = _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).call(this, props));

      _this.state = _extends({}, props);
      return _this;
   }

   _createClass(Menu, [{
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(newProps) {
         if (this.props !== newProps) {
            this.setState(_extends({}, newProps));
         }
      }
   }, {
      key: '_renderList',
      value: function _renderList() {
         var _this2 = this;

         return this.state.menu.map(function (x) {
            return React.createElement(
               'li',
               { className: 'menu-item', onClick: _this2.state.onPress.bind(_this2, x.id), style: _this2.state.itemStyle },
               React.createElement(
                  'div',
                  { className: 'menu-inner-item' },
                  x.name
               )
            );
         });
      }
   }, {
      key: 'render',
      value: function render() {
         return React.createElement(
            'div',
            { style: this.state.style, className: 'menu-container' },
            React.createElement(
               'ul',
               { style: this.state.containerStyle, className: 'menu-list' },
               this._renderList()
            )
         );
      }
   }]);

   return Menu;
}(Component);

export default Menu;