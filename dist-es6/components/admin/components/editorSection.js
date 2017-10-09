var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';

import { Button } from 'react-bootstrap';

var EditorSection = function (_Component) {
   _inherits(EditorSection, _Component);

   function EditorSection(props) {
      _classCallCheck(this, EditorSection);

      var _this = _possibleConstructorReturn(this, (EditorSection.__proto__ || Object.getPrototypeOf(EditorSection)).call(this, props));

      _this.state(_extends({}, props, {
         showModal: false,
         addedItems: []
      }));
      return _this;
   }

   _createClass(EditorSection, [{
      key: 'toggleModal',
      value: function toggleModal() {
         this.setState({
            showModal: !this.state.showModal
         });
      }
   }, {
      key: 'exportVals',
      value: function exportVals() {}
   }, {
      key: 'addItem',
      value: function addItem(item) {
         var updatedItems = [];
         updatedItems.push(this.state.addedItems);
         updatedItems.push(item);
         this.setState({
            addedItems: updatedItems
         });
      }
   }, {
      key: '_renderItems',
      value: function _renderItems() {
         return this.state.addedItems.map(function (x) {
            switch (x.type) {
               case "LIST":
                  return React.createElement(List, { value: x.value ? x.value : [], struct: x, onChange: function onChange() {} });
               case "FSELECT":
                  return React.createElement(ForeignSelector, { value: x.value, struct: x, onChange: function onChange() {} });
               case "FLIST":
                  return React.createElement(ForeignList, { value: x.value, struct: x, onChange: function onChange() {} });
               default:
                  return React.createElement(Input, { value: x.value, type: x.type, placeHolder: x.label, onChange: function onChange() {} });
            }
         });
      }
   }, {
      key: 'render',
      value: function render() {
         var _this2 = this;

         return React.createElement(
            'div',
            { style: { display: 'flex', flex: 1 } },
            React.createElement(EditorModal, { show: this.state.showModal, toggleModal: this.toggleModal.bind(this) }),
            React.createElement(
               Button,
               { bsStyle: 'primary', onClick: function onClick() {
                     _this2.toggleModal();
                  } },
               'Add field'
            )
         );
      }
   }]);

   return EditorSection;
}(Component);

export default EditorSection;