var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';

import { FormControl } from 'react-bootstrap';

var Input = function (_Component) {
   _inherits(Input, _Component);

   function Input(props) {
      _classCallCheck(this, Input);

      var _this = _possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).call(this, props));

      _this.state = _extends({
         initialValue: ''
      }, props);
      return _this;
   }

   _createClass(Input, [{
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(newProps) {
         if (this.props !== newProps) {
            this.setState(_extends({}, newProps));
         }
      }
   }, {
      key: 'parseType',
      value: function parseType() {
         switch (this.state.type) {
            case "TEXT":
               return "text";
            case "DATE":
               return "date";
            case "NUMBER":
               return "number";
         }
      }
   }, {
      key: 'parseClass',
      value: function parseClass() {
         switch (this.state.type) {
            case "TEXTAREA":
               return "textarea";
         }
      }
   }, {
      key: 'handleChange',
      value: function handleChange(evt) {
         this.setState({ value: evt.target.value });
         if (this.props.onChange) {
            this.props.onChange(evt.target.value);
         }
      }
   }, {
      key: 'render',
      value: function render() {
         return React.createElement(FormControl, { style: { display: 'flex', margin: '2px', resize: 'none' },
            type: this.parseType(),
            componentClass: this.parseClass(),
            placeholder: this.state.placeholder,
            value: this.state.value ? this.state.value : this.state.initialValue,
            onChange: this.handleChange.bind(this) });
      }
   }]);

   return Input;
}(Component);

export default Input;