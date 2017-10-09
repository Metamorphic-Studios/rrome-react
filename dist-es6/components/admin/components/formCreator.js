var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';

import { Button } from 'react-bootstrap';

var FormCreator = function (_Component) {
   _inherits(FormCreator, _Component);

   /*this.props.toggleModal() is the callback*/
   function FormCreator(props) {
      _classCallCheck(this, FormCreator);

      var _this = _possibleConstructorReturn(this, (FormCreator.__proto__ || Object.getPrototypeOf(FormCreator)).call(this, props));

      _this.state(_extends({}, props, {
         addedSections: [],
         showModal: false,
         title: ""
      }));
      return _this;
   }

   _createClass(FormCreator, [{
      key: 'exportVals',
      value: function exportVals() {}
   }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(newProps) {
         if (this.props !== newProps) {
            this.setState(_extends({}, newProps));
         }
      }
   }, {
      key: 'addSection',
      value: function addSection(sect) {
         var updatedSections = this.state.addedSections;
         updatedSections.push(sect);
         this.setState({
            addedSections: updatedSections
         });
      }
   }, {
      key: 'toggleModal',
      value: function toggleModal() {
         this.setState({
            showModal: !this.state.showModal
         });
      }
   }, {
      key: '_renderSections',
      value: function _renderSections() {
         return this.state.addedSections.map(function (x) {});
      }
   }, {
      key: '_renderForm',
      value: function _renderForm() {
         if (addedSections) {} else {}
      }
   }, {
      key: '_renderTitle',
      value: function _renderTitle() {
         if (this.state.title == "") {
            return React.createElement(
               'h1',
               null,
               'New form template'
            );
         } else {
            return React.createElement(
               'h1',
               null,
               this.state.title
            );
         }
      }
   }, {
      key: 'render',
      value: function render() {
         return React.createElement(
            'div',
            null,
            this._renderTitle(),
            this._renderForm()
         );
      }
   }]);

   return FormCreator;
}(Component);

export default FormCreator;