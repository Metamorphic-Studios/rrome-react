var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';

import Select from 'react-select';
import 'react-select/dist/react-select.css';

var ForeignSelector = function (_Component) {
   _inherits(ForeignSelector, _Component);

   function ForeignSelector(props) {
      _classCallCheck(this, ForeignSelector);

      var _this = _possibleConstructorReturn(this, (ForeignSelector.__proto__ || Object.getPrototypeOf(ForeignSelector)).call(this, props));

      _this.state = _extends({}, props, {
         options: [],
         value: ''
      });
      return _this;
   }

   _createClass(ForeignSelector, [{
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(newProps) {
         if (this.props !== newProps) {
            this.setState(_extends({}, newProps));
         }
      }
   }, {
      key: 'componentWillMount',
      value: function componentWillMount() {
         var _this2 = this;

         var id = this.state.struct["meta-type"].id;
         this.getOptions(id).then(function (options) {
            var opt = options.map(function (x) {
               return {
                  value: x._id.id,
                  label: _this2.state.struct["meta-type"]["display_keys"].map(function (y) {
                     return x[y];
                  }).join(" ")
               };
            });
            _this2.setState({
               options: opt
            });
         });
      }
   }, {
      key: 'getOptions',
      value: function getOptions(id) {
         return fetch("http://localhost:3100/rrome/data/model/" + id).then(function (resp) {
            return resp.json();
         });
      }
   }, {
      key: 'onChange',
      value: function onChange(val) {
         this.setState({ value: val });
         if (this.props.onChange) {
            this.props.onChange(val);
         }
      }
   }, {
      key: 'render',
      value: function render() {
         return React.createElement(
            'div',
            { style: this.props.style },
            React.createElement(Select, {
               name: '',
               searchable: false,
               clearable: false,
               placeholder: this.state.struct.label,
               options: this.state.options,
               value: this.state.value,
               onChange: this.onChange.bind(this)
            })
         );
      }
   }]);

   return ForeignSelector;
}(Component);

export default ForeignSelector;