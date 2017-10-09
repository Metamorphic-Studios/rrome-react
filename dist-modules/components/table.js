'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = require('react-bootstrap');

var _reactTable = require('react-table');

var _reactTable2 = _interopRequireDefault(_reactTable);

require('react-table/react-table.css');

require('../../styles/style.css');

require('../../styles/table.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var async = require('async');
var utils = require('../utils');

var Table = function (_Component) {
   _inherits(Table, _Component);

   function Table(props) {
      _classCallCheck(this, Table);

      var _this = _possibleConstructorReturn(this, (Table.__proto__ || Object.getPrototypeOf(Table)).call(this, props));

      _this.state = _extends({}, props, {
         data: [],
         origData: []
      });
      return _this;
   }

   _createClass(Table, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
         var _this2 = this;

         this.state.connector.getDataByModel(this.state.struct.id).then(function (data) {
            _this2.lookupItemData(data);
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
            getDataByModel(newProps.struct.id).then(function (data) {
               _this3.lookupItemData(data);
            });
         }

         if (newProps.refresh == true) {
            getDataByModel(this.state.struct.id).then(function (data) {
               _this3.lookupItemData(data);
            });
            newProps.onEditorRefresh();
         }
      }
   }, {
      key: 'lookupItemData',
      value: function lookupItemData(data) {
         var _this4 = this;

         this.setState({ origData: data });
         async.map(data, function (item, cb) {
            async.map(utils.flatten(_this4.state.struct.model), function (modelElement, callback) {
               if (modelElement.type == "FSELECT") {
                  var id = item[modelElement.id];
                  if (id) {
                     _this4.state.connector.getDataById(id).then(function (res) {
                        var e = modelElement["meta-type"]["display_keys"].map(function (key) {
                           return res[key];
                        }).join(" ");
                        callback(null, { key: modelElement.id, value: e });
                     });
                  } else {
                     callback(null, { key: modelElement.id, value: '' });
                  }
               } else {
                  callback(null, { key: modelElement.id, value: item[modelElement.id] });
               }
            }, function (err, results) {
               var obj = {};
               for (var i = 0; i < results.length; i++) {
                  if (results[i].value) {
                     obj[results[i].key] = results[i].value;
                  }
               }
               obj["_id"] = item["_id"];
               cb(err, obj);
            });
         }, function (err, results) {
            if (!err) {
               _this4.setState({ data: results });
            }
         });
      }
   }, {
      key: '_render',
      value: function _render() {
         return this._renderViewer();
      }
   }, {
      key: 'createTableButtonClick',
      value: function createTableButtonClick() {
         this.props.onCreate();
      }
   }, {
      key: '_getTd',
      value: function _getTd(state, rowInfo, column, instance) {
         var _this5 = this;

         return {
            onClick: function onClick(e, handleOriginal) {
               if (_this5.props.onItemSelect) {
                  for (var i = 0; i < _this5.state.data.length; i++) {
                     if (rowInfo.original["_id"] == _this5.state.data[i]["_id"]) {
                        _this5.props.onItemSelect(_this5.state.origData[i]);
                        break;
                     }
                  }
               }
            }
         };
      }
   }, {
      key: '_renderViewer',
      value: function _renderViewer() {
         return _react2.default.createElement(
            'div',
            { style: { flex: 1, display: 'flex', flexDirection: 'column' } },
            _react2.default.createElement(
               'div',
               { className: 'tableHeader' },
               _react2.default.createElement(
                  'h2',
                  null,
                  this.state.struct.name
               )
            ),
            _react2.default.createElement(
               'div',
               { className: 'tableContainer' },
               _react2.default.createElement(
                  _reactBootstrap.Button,
                  { className: 'btn btn-primary tableCreateButton', onClick: this.createTableButtonClick.bind(this) },
                  'Create'
               ),
               _react2.default.createElement(_reactTable2.default, {
                  style: { flex: 1, display: 'flex' },
                  data: this.state.data,
                  columns: this.state.struct && this.state.struct["display_keys"] ? this.state.struct["display_keys"].map(function (x) {
                     return { accessor: x.id, Header: x.label };
                  }) : [],
                  getTdProps: this._getTd.bind(this)
               })
            )
         );
      }
   }, {
      key: 'render',
      value: function render() {
         return _react2.default.createElement(
            'div',
            { style: { display: 'flex', height: '100%', flex: 1, flexDirection: 'column' } },
            this._render()
         );
      }
   }]);

   return Table;
}(_react.Component);

exports.default = Table;