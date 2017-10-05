var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';

import Form from './form';
import Table from './table';

var Editor = function (_Component) {
   _inherits(Editor, _Component);

   function Editor(props) {
      _classCallCheck(this, Editor);

      var _this = _possibleConstructorReturn(this, (Editor.__proto__ || Object.getPrototypeOf(Editor)).call(this, props));

      _this.state = _extends({}, props, {
         selectedItem: {},
         editing: false
      });
      return _this;
   }

   _createClass(Editor, [{
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(newProps) {
         if (this.props.struct.id !== newProps.struct.id) {
            this.setState({
               editing: false,
               selectedItem: {}
            });
         }

         if (this.props !== newProps) {
            this.setState(_extends({}, newProps));
         }
      }
   }, {
      key: 'onBack',
      value: function onBack() {
         this.setState({ editing: false });
         this.refreshEditor();
      }
   }, {
      key: 'refreshEditor',
      value: function refreshEditor() {
         this.setState({ refresh: true });
      }
   }, {
      key: 'onEditorRefreshFinish',
      value: function onEditorRefreshFinish() {
         this.setState({ refresh: false });
      }
   }, {
      key: 'render',
      value: function render() {
         var _this2 = this;

         if (!this.state.struct) return null;
         if (this.state.editing) {
            return React.createElement(Form, {
               struct: this.state.struct,
               content: this.state.selectedItem,
               onSave: function onSave(data) {
                  console.log("SAVE", data);
               },
               onDelete: function onDelete(id) {
                  console.log("DELETE", id);
               },
               onBack: this.onBack.bind(this) });
         } else {
            return React.createElement(Table, {
               refresh: this.state.refresh,
               onEditorRefresh: this.onEditorRefreshFinish.bind(this),
               struct: this.state.struct,
               onItemSelect: function onItemSelect(item) {
                  _this2.setState({
                     editing: true,
                     selectedItem: item
                  });
               },
               onCreate: function onCreate() {
                  _this2.setState({
                     editing: true,
                     selectedItem: {}
                  });
               } });
         }
      }
   }]);

   return Editor;
}(Component);

export default Editor;