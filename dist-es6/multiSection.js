var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';

import Section from './section';

var MultiSection = function (_Component) {
   _inherits(MultiSection, _Component);

   function MultiSection(props) {
      _classCallCheck(this, MultiSection);

      var _this = _possibleConstructorReturn(this, (MultiSection.__proto__ || Object.getPrototypeOf(MultiSection)).call(this, props));

      _this.state = _extends({}, props);
      return _this;
   }

   _createClass(MultiSection, [{
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(newProps) {
         if (this.props !== newProps) {
            this.setState(_extends({}, newProps));
         }
      }
   }, {
      key: '_renderSections',
      value: function _renderSections() {
         var _this2 = this;

         return this.state.sections.map(function (x) {
            return React.createElement(Section, { horizontal: false, struct: x, onChange: _this2.props.onChange.bind(_this2) });
         });
      }
   }, {
      key: 'render',
      value: function render() {
         return React.createElement(
            'div',
            { style: { display: 'flex', flexDirection: 'row', width: '80%', margin: '10px' } },
            this._renderSections()
         );
      }
   }]);

   return MultiSection;
}(Component);

export default MultiSection;