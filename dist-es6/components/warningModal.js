var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';

import { Modal, Button } from 'react-bootstrap';

//a simple warning true/false returning modal for if you havnt saved something

var WarnModal = function (_Component) {
   _inherits(WarnModal, _Component);

   function WarnModal(props) {
      _classCallCheck(this, WarnModal);

      var _this = _possibleConstructorReturn(this, (WarnModal.__proto__ || Object.getPrototypeOf(WarnModal)).call(this, props));

      console.log('modal created');
      _this.state = _extends({}, props);
      return _this;
   }

   _createClass(WarnModal, [{
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(newProps) {
         if (this.state.props !== newProps) {
            console.log('props changing');
            this.setState(_extends({}, newProps));
         }
      }
   }, {
      key: 'quit',
      value: function quit() {
         console.log('modal quit');
         this.props.quitWarningModal();
      }
   }, {
      key: 'saveQuit',
      value: function saveQuit() {
         console.log('modal savequit');
         this.props.saveWarningModal();
      }
   }, {
      key: 'goBack',
      value: function goBack() {
         console.log('modal goback');
         this.props.leaveWarningModal();
      }
   }, {
      key: 'render',
      value: function render() {
         var _this2 = this;

         return React.createElement(
            'div',
            null,
            React.createElement(
               Modal,
               { show: this.state.showModal },
               React.createElement(
                  Modal.Header,
                  null,
                  React.createElement(
                     Modal.Title,
                     null,
                     'Unsaved changes! Are you sure you want to quit?'
                  )
               ),
               React.createElement(
                  Modal.Body,
                  { style: { display: 'flex', flexDirection: 'row', flexWrap: 'wrap' } },
                  React.createElement(
                     Button,
                     { onClick: function onClick() {
                           _this2.goBack();
                        } },
                     'No'
                  ),
                  React.createElement(
                     Button,
                     { onClick: function onClick() {
                           _this2.quit();
                        } },
                     'Yes'
                  ),
                  React.createElement(
                     Button,
                     { onClick: function onClick() {
                           _this2.saveQuit();
                        } },
                     'Save and quit'
                  )
               )
            )
         );
      }
   }]);

   return WarnModal;
}(Component);

export default WarnModal;