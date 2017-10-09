var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';

import { Button, ListGroup, ListGroupItem, Modal } from 'react-bootstrap';
import ForeignSelector from './foreignSelector';
var Add = require('react-icons/lib/fa/plus');

var ForeignList = function (_Component) {
   _inherits(ForeignList, _Component);

   function ForeignList(props) {
      _classCallCheck(this, ForeignList);

      var _this = _possibleConstructorReturn(this, (ForeignList.__proto__ || Object.getPrototypeOf(ForeignList)).call(this, props));

      _this.state = _extends({}, props, {
         data: [],
         modalShow: false,
         modalValue: ''
      });
      return _this;
   }

   _createClass(ForeignList, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
         var _this2 = this;

         var id = this.state.struct["meta-type"].id;
         this.getData(id).then(function (data) {
            var dat = data.map(function (x) {
               return _this2.state.struct["meta-type"]["display_keys"].map(function (e) {
                  return x[e];
               });
            });
            _this2.setState({
               data: dat
            });
         });
      }
   }, {
      key: 'getData',
      value: function getData(id) {
         return fetch("http:localhost:3100/rrome/data/model/" + id).then(function (res) {
            return res.json();
         });
      }
   }, {
      key: '_renderItems',
      value: function _renderItems() {
         return this.state.data.map(function (x) {
            return React.createElement(
               ListGroupItem,
               null,
               x.value
            );
         });
      }
   }, {
      key: 'modalSave',
      value: function modalSave() {
         var id = this.state.modalValue;
         var dat = this.state.data;
         dat.push(id);
         this.setState({
            modalValue: '',
            data: dat
         });
      }
   }, {
      key: '_renderModal',
      value: function _renderModal() {
         var _this3 = this;

         return React.createElement(
            Modal,
            { show: this.state.modalShow },
            React.createElement(
               Modal.Header,
               null,
               React.createElement(
                  Modal.Title,
                  null,
                  'Add item to ',
                  this.state.struct.label
               )
            ),
            React.createElement(
               Modal.Body,
               { style: { display: 'flex', flexDirection: 'row', flex: 1 } },
               React.createElement(ForeignSelector, { struct: this.state.struct, style: { flex: 1 }, onChange: function onChange(val) {
                     return _this3.setState({ modalValue: val });
                  } })
            ),
            React.createElement(
               Modal.Footer,
               null,
               React.createElement(
                  Button,
                  { onClick: this.modalSave.bind(this) },
                  ' Save '
               ),
               React.createElement(
                  Button,
                  { onClick: function onClick() {
                        return _this3.setState({ modalShow: false });
                     } },
                  ' Close '
               )
            )
         );
      }
   }, {
      key: 'render',
      value: function render() {
         var _this4 = this;

         return React.createElement(
            'div',
            null,
            React.createElement(
               'h4',
               null,
               this.state.struct.label
            ),
            React.createElement(
               ListGroup,
               null,
               this._renderItems()
            ),
            this._renderModal(),
            React.createElement(
               Button,
               { onClick: function onClick() {
                     _this4.setState({ modalShow: true });
                  } },
               React.createElement(Add, null),
               ' Add'
            )
         );
      }
   }]);

   return ForeignList;
}(Component);

export default ForeignList;