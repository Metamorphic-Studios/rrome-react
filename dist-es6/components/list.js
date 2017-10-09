var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';

import { ListGroup, ListGroupItem, Button, Glyphicon, Modal, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

import FormModal from './modal';
import ExpiringDate from './expire';
import Input from './items';
var Add = require('react-icons/lib/fa/plus');
//a List component for storing 2d array values to be displayed on a form,
//ie a Cert or Drivers Lisence

var List = function (_Component) {
   _inherits(List, _Component);

   function List(props) {
      _classCallCheck(this, List);

      var _this = _possibleConstructorReturn(this, (List.__proto__ || Object.getPrototypeOf(List)).call(this, props));

      _this.state = _extends({}, props, {
         modalShow: false,
         editing: false,
         modalContent: []
      });
      return _this;
   }

   _createClass(List, [{
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(newProps) {
         if (this.props !== newProps) {
            this.setState(_extends({}, newProps));
         }
      }

      //returns each individual item depending on the value type within 
      //@param 'i' the array containing the key & value

   }, {
      key: 'renderItem',
      value: function renderItem(i) {
         return this.state.struct['meta-type'].map(function (x, ix) {
            switch (x.type) {
               case "DATE":
                  return React.createElement(
                     'div',
                     { style: { marginRight: '5px' } },
                     i[ix]
                  );
               case "DATE:D":
                  return React.createElement(ExpiringDate, { value: i[ix] });
               case "TEXT":
                  return React.createElement(
                     'div',
                     { style: { marginRight: '5px' } },
                     i[ix]
                  );
               case "NUMBER":
                  return React.createElement(
                     'div',
                     { style: { marginRight: '5px' } },
                     i[ix]
                  );
            }
         });
      }
      //returns a list of <ListGroupItems> for display within the list itself

   }, {
      key: 'renderItems',
      value: function renderItems() {
         var _this2 = this;

         return this.state.value.map(function (x, ix) {
            return React.createElement(
               ListGroupItem,
               { style: { display: 'flex', justifyContent: 'space-around' } },
               _this2.renderItem(x),
               React.createElement(
                  Button,
                  { bsSize: 'xsmall', style: { position: 'absolute', right: '35px' }, onClick: _this2.edit.bind(_this2, ix) },
                  React.createElement(Glyphicon, { glyph: 'pencil' })
               ),
               React.createElement(
                  Button,
                  { bsSize: 'xsmall', onClick: _this2.remove.bind(_this2, ix), style: { position: 'absolute', right: '5px' } },
                  React.createElement(Glyphicon, { glyph: 'remove' })
               )
            );
         });
      }
   }, {
      key: 'renderModal',
      value: function renderModal() {
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
               { style: { display: 'flex', flexFlow: 'column' } },
               this.renderModalFields()
            ),
            React.createElement(
               Modal.Footer,
               null,
               React.createElement(
                  Button,
                  { onClick: this.modalSave.bind(this) },
                  ' Ok '
               ),
               React.createElement(
                  Button,
                  { onClick: function onClick() {
                        return _this3.setState({ modalShow: false, editing: false, modalContent: [] });
                     } },
                  ' Cancel '
               )
            )
         );
      }
   }, {
      key: 'remove',
      value: function remove(ix) {
         var v = this.state.value;
         v.splice(ix, 1);
         if (this.props.onChange) {
            this.props.onChange(v);
         }
      }
   }, {
      key: 'edit',
      value: function edit(ix) {
         var e = _extends({}, this.state.value[ix]);
         this.setState({
            modalContent: e,
            editing: ix,
            modalShow: true
         });
         console.log("Editing", ix);
      }
   }, {
      key: 'modalSave',
      value: function modalSave() {
         var v = this.state.value;
         var a = _extends({}, this.state.modalContent);
         if (this.state.editing !== false) {
            v[this.state.editing] = a;
         } else {
            v.push(a);
         }

         if (this.props.onChange) {
            this.props.onChange(v);
         }
         this.setState({ modalShow: false, editing: false, modalContent: [] });
      }
   }, {
      key: 'handleModalChange',
      value: function handleModalChange(ix, evt) {
         var modalContent = this.state.modalContent;
         modalContent[ix] = evt;
         this.setState({ modalContent: modalContent });
      }
   }, {
      key: 'renderModalFields',
      value: function renderModalFields() {
         var _this4 = this;

         return this.state.struct['meta-type'].map(function (x, ix) {
            return React.createElement(
               FormGroup,
               null,
               React.createElement(
                  ControlLabel,
                  null,
                  x.label
               ),
               React.createElement(Input, { type: x.type, placeholder: 'Enter ' + x.label, onChange: function onChange(evt) {
                     _this4.handleModalChange(ix, evt);
                  }, value: _this4.state.modalContent[ix] })
            );
         });
      }
   }, {
      key: 'render',
      value: function render() {
         var _this5 = this;

         return React.createElement(
            'div',
            { style: { flex: 1 } },
            React.createElement(
               'h4',
               null,
               ' ',
               this.state.struct.label,
               ' '
            ),
            React.createElement(
               ListGroup,
               { style: { display: 'flex', flexDirection: 'column', margin: '5px' } },
               this.renderItems()
            ),
            React.createElement(
               Button,
               { style: { alignSelf: 'center' }, onClick: function onClick() {
                     _this5.setState({ modalShow: true });
                  } },
               React.createElement(Add, null),
               ' Add'
            ),
            this.renderModal()
         );
      }
   }]);

   return List;
}(Component);

export default List;