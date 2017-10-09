var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';

import { FormControl, Button } from 'react-bootstrap';
import Back from 'react-icons/lib/fa/chevron-left';
import Input from './items';
import List from './list';
import Section from './section';
import MultiSection from './multiSection';
import '../styles/style.css';

var Form = function (_Component) {
   _inherits(Form, _Component);

   function Form(props) {
      _classCallCheck(this, Form);

      var _this = _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, props));

      _this.state = _extends({
         content: {}
      }, props);
      return _this;
   }

   _createClass(Form, [{
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(newProps) {
         if (this.props !== newProps) {
            this.setState(_extends({}, newProps));
         }

         if (this.props.struct.id !== newProps.struct.id) {
            this.setState({
               content: {}
            });
         }
      }
   }, {
      key: 'deleteForm',
      value: function deleteForm(id) {
         return fetch('http://localhost:3100/rrome/data/id/' + id + '/delete', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            }
         }).then(function (resp) {
            return resp.json();
         });
      }
   }, {
      key: 'saveForm',
      value: function saveForm(form) {
         var url = "http://localhost:3100/rrome/data/model/" + this.state.struct.id;
         if (this.state.content._id) {
            url = "http://localhost:3100/rrome/data/id/" + this.state.content._id.id;
         }
         return fetch(url, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify({
               blob: form
            })
         }).then(function (resp) {
            return resp.json();
         });
      }
   }, {
      key: 'isArray',
      value: function isArray(array) {
         for (var i = 0; i < array.length; i++) {
            if (Array.isArray(array[i])) return true;
         }
         return false;
      }
   }, {
      key: 'mapStruct',
      value: function mapStruct(struct, content) {
         return struct.map(function (x) {
            return _extends({}, x, {
               value: content[x.id]
            });
         });
      }
   }, {
      key: 'mapStructs',
      value: function mapStructs(structs, content) {
         var _this2 = this;

         return structs.map(function (x) {
            return _this2.mapStruct(x, content);
         });
      }
   }, {
      key: 'handleChange',
      value: function handleChange(c) {
         var content = _extends({}, this.state.content, c);

         this.setState({
            content: content
         });
         console.log(content);
      }
   }, {
      key: '_render',
      value: function _render() {
         var _this3 = this;

         return this.state.struct.model.map(function (x) {
            if (_this3.isArray(x)) {
               return React.createElement(MultiSection, { sections: _this3.mapStructs(x, _this3.state.content), onChange: _this3.handleChange.bind(_this3) });
            } else {
               return React.createElement(Section, { horizontal: false, struct: _this3.mapStruct(x, _this3.state.content), onChange: _this3.handleChange.bind(_this3) });
            }
         });
      }
   }, {
      key: 'render',
      value: function render() {
         var _this4 = this;

         return React.createElement(
            'div',
            { style: { display: 'flex', flex: 1, flexDirection: 'column' } },
            React.createElement(
               'div',
               { className: 'formHeader' },
               this._back(),
               React.createElement(
                  'h2',
                  null,
                  ' ',
                  this.state.struct.name,
                  ' '
               )
            ),
            React.createElement(
               'div',
               { className: 'formBody', style: { display: 'flex', flex: 1, flexDirection: 'column', alignItems: 'center' } },
               this._render()
            ),
            React.createElement(
               'div',
               { className: 'formFooter' },
               React.createElement(
                  Button,
                  { className: 'btn btn-footer btn-danger', onClick: function onClick() {
                        if (_this4.state.content._id) {
                           _this4.deleteForm(_this4.state.content._id.id).then(function (resp) {
                              _this4.props.onBack();
                           });
                        } else {
                           _this4.props.onBack();
                        }
                     } },
                  this.state.content._id ? 'Delete' : 'Cancel'
               ),
               React.createElement(
                  Button,
                  { className: 'btn btn-footer btn-primary', onClick: function onClick() {
                        _this4.saveForm(_this4.state.content).then(function (resp) {
                           _this4.props.onBack();
                        });
                     } },
                  this.state.content._id ? 'Save' : 'Create'
               )
            )
         );
      }
   }, {
      key: '_back',
      value: function _back() {
         if (this.props.onBack) {
            return React.createElement(Back, { className: 'backButton', size: 50, onClick: this.props.onBack.bind(this) });
         } else {
            return null;
         }
      }
   }]);

   return Form;
}(Component);

export default Form;