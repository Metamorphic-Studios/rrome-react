var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

var EditorModal = function (_Component) {
   _inherits(EditorModal, _Component);

   function EditorModal(props) {
      _classCallCheck(this, EditorModal);

      var _this = _possibleConstructorReturn(this, (EditorModal.__proto__ || Object.getPrototypeOf(EditorModal)).call(this, props));

      _this.state(_extends({}, props, {
         title: "",
         editingTitle: true
      }));
      return _this;
   }

   _createClass(EditorModal, [{
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(newProps) {
         if (this.props !== newProps) {
            this.props = newProps;
            this.setState(_extends({}, newProps));
         }
      }
   }, {
      key: '_renderModalTitle',
      value: function _renderModalTitle() {
         var _this2 = this;

         if (editingTitle) {
            return React.createElement(FormControl, {
               type: 'text',
               value: this.state.title,
               placeholder: 'Enter title',
               onChange: function onChange(e) {
                  _this2.setState({ title: e.target.value });
               }
            });
         } else {}
      }
   }, {
      key: '_renderModal',
      value: function _renderModal() {
         return React.createElement(
            Modal,
            { show: this.state.show },
            React.createElement(
               Modal.Header,
               null,
               React.createElement(
                  Modal.Title,
                  null,
                  this._renderModalTitle()
               )
            )
         );
      }
   }, {
      key: 'render',
      value: function render() {
         return React.createElement(
            'div',
            null,
            this._renderModal()
         );
      }
   }]);

   return EditorModal;
}(Component);

export default EditorModal;