var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';

import { FormControl, Button } from 'react-bootstrap';

import ReactTable from 'react-table';
import 'react-table/react-table.css';
import '../styles/style.css';

var Table = function (_Component) {
   _inherits(Table, _Component);

   function Table(props) {
      _classCallCheck(this, Table);

      var _this = _possibleConstructorReturn(this, (Table.__proto__ || Object.getPrototypeOf(Table)).call(this, props));

      _this.state = _extends({}, props, {
         data: []
      });
      return _this;
   }

   _createClass(Table, [{
      key: 'getData',
      value: function getData(id) {
         return fetch('http://localhost:3100/rrome/data/model/' + id).then(function (resp) {
            return resp.json();
         });
      }
   }, {
      key: 'componentWillMount',
      value: function componentWillMount() {
         var _this2 = this;

         this.getData(this.state.struct.id).then(function (data) {
            _this2.setState({
               data: data
            });
         });
      }
   }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(newProps) {
         var _this3 = this;

         if (this.props != newProps) {
            this.setState(_extends({}, newProps));
         }

         if (newProps.struct.id !== this.props.struct.id) {
            this.getData(newProps.struct.id).then(function (data) {
               _this3.setState({
                  data: data
               });
            });
         }
      }
   }, {
      key: '_render',
      value: function _render() {
         return this._renderViewer();
      }
   }, {
      key: '_renderViewer',
      value: function _renderViewer() {
         var _this4 = this;

         return React.createElement(
            'div',
            { style: { flex: 1, display: 'flex', flexDirection: 'column' } },
            React.createElement(
               'div',
               { className: 'tableHeader' },
               React.createElement(
                  'h2',
                  null,
                  this.state.struct.name
               )
            ),
            React.createElement(
               'div',
               { className: 'tableContainer' },
               React.createElement(
                  Button,
                  { className: 'btn btn-primary tableCreateButton', onClick: this.props.onCreate.bind(this) },
                  'Create'
               ),
               React.createElement(ReactTable, {
                  style: { flex: 1, display: 'flex' },
                  data: this.state.data,
                  columns: this.state.struct && this.state.struct["display_keys"] ? this.state.struct["display_keys"].map(function (x) {
                     return { accessor: x.id, Header: x.label };
                  }) : [],
                  getTdProps: function getTdProps(state, rowInfo, column, instance) {
                     return {
                        onClick: function onClick(e, handleOriginal) {
                           if (_this4.props.onItemSelect) {
                              _this4.props.onItemSelect(rowInfo.original);
                           }
                        }
                     };
                  }
               })
            )
         );
      }
   }, {
      key: 'render',
      value: function render() {
         return React.createElement(
            'div',
            { style: { display: 'flex', flex: 1, flexDirection: 'column' } },
            this._render()
         );
      }
   }]);

   return Table;
}(Component);

export default Table;