'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = require('react-bootstrap');

var _foreignSelector = require('./foreignSelector');

var _foreignSelector2 = _interopRequireDefault(_foreignSelector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Add = require('react-icons/lib/fa/plus');

var ForeignList = function (_Component) {
   _inherits(ForeignList, _Component);

   function ForeignList(props) {
      _classCallCheck(this, ForeignList);

      var _this = _possibleConstructorReturn(this, (ForeignList.__proto__ || Object.getPrototypeOf(ForeignList)).call(this, props));

      _this.state = _extends({}, props, {
         listData: [],
         data: props.value && props.value.length > 0 ? props.value : [],
         modalShow: false,
         modalValue: ''
      });
      return _this;
   }

   _createClass(ForeignList, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
         this.getListData();
      }
   }, {
      key: 'getListData',
      value: function getListData() {
         var _this2 = this;

         this.setState({
            listData: []
         });
         this.state.data.map(function (dat) {
            _this2.state.connector.getDataById(dat.value).then(function (result) {
               var employee = _this2.state.struct["meta-type"]["list_display"].map(function (e) {
                  return result[e];
               });
               return employee;
            }).then(function (res) {
               var l = _this2.state.listData;
               l.push(res);
               _this2.setState({
                  listData: l
               });
            });
         });
      }
   }, {
      key: 'remove',
      value: function remove(element) {
         var tempList = this.state.listData;
         var index = -1;
         for (var i = 0; i < tempList.length; i++) {
            if (tempList[i] == element) {
               index = i;
               break;
            }
         }
         tempList.splice(index, 1);
         var dat = this.state.data;
         dat.splice(index, 1);

         this.setState({ data: dat, listData: tempList });
         if (this.props.onChange) {
            this.props.onChange(dat);
         }
      }
   }, {
      key: '_renderItem',
      value: function _renderItem(item) {
         var arr = [];
         for (var i = 0; i < item.length; i++) {
            arr.push(_react2.default.createElement(
               'div',
               { style: { marginRight: '5px' } },
               item[i]
            ));
         }
         return arr;
      }
   }, {
      key: '_renderItems',
      value: function _renderItems() {
         var _this3 = this;

         return this.state.listData.map(function (x) {
            return _react2.default.createElement(
               _reactBootstrap.ListGroupItem,
               { style: { display: 'flex', justifyContent: 'space-around' } },
               _this3._renderItem(x),
               _react2.default.createElement(
                  _reactBootstrap.Button,
                  { bsSize: 'xsmall', onClick: _this3.remove.bind(_this3, x), style: { position: 'absolute', right: '5px' } },
                  _react2.default.createElement(_reactBootstrap.Glyphicon, { glyph: 'remove' })
               )
            );
         });
      }
   }, {
      key: 'modalSave',
      value: function modalSave() {
         var id = this.state.modalValue;
         var dat = this.state.data;
         if (dat.includes(id)) return;
         dat.push(id);
         this.setState({
            data: dat,
            modalShow: false,
            modalValue: ''
         });
         if (this.props.onChange) {
            this.props.onChange(dat);
         }
         this.getListData();
      }
   }, {
      key: '_renderModal',
      value: function _renderModal() {
         var _this4 = this;

         return _react2.default.createElement(
            _reactBootstrap.Modal,
            { show: this.state.modalShow },
            _react2.default.createElement(
               _reactBootstrap.Modal.Header,
               null,
               _react2.default.createElement(
                  _reactBootstrap.Modal.Title,
                  null,
                  'Add item to ',
                  this.state.struct.label
               )
            ),
            _react2.default.createElement(
               _reactBootstrap.Modal.Body,
               { style: { display: 'flex', flexDirection: 'row', flex: 1 } },
               _react2.default.createElement(_foreignSelector2.default, { connector: this.state.connector, struct: this.state.struct, style: { flex: 1 }, onChange: function onChange(val) {
                     return _this4.setState({ modalValue: val });
                  } })
            ),
            _react2.default.createElement(
               _reactBootstrap.Modal.Footer,
               null,
               _react2.default.createElement(
                  _reactBootstrap.Button,
                  { onClick: this.modalSave.bind(this) },
                  ' Ok '
               ),
               _react2.default.createElement(
                  _reactBootstrap.Button,
                  { onClick: function onClick() {
                        return _this4.setState({ modalShow: false });
                     } },
                  ' Cancel '
               )
            )
         );
      }
   }, {
      key: 'render',
      value: function render() {
         var _this5 = this;

         return _react2.default.createElement(
            'div',
            { style: { flex: 1 } },
            _react2.default.createElement(
               'h4',
               null,
               this.state.struct.label
            ),
            _react2.default.createElement(
               _reactBootstrap.ListGroup,
               { style: { display: 'flex', flexDirection: 'column', margin: '5px' } },
               this._renderItems()
            ),
            this._renderModal(),
            _react2.default.createElement(
               _reactBootstrap.Button,
               { onClick: function onClick() {
                     _this5.setState({ modalShow: true });
                  } },
               _react2.default.createElement(Add, null),
               ' Add'
            )
         );
      }
   }]);

   return ForeignList;
}(_react.Component);

exports.default = ForeignList;