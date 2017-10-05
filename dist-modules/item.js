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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Item = function (_Component) {
   _inherits(Item, _Component);

   function Item(props) {
      _classCallCheck(this, Item);

      var _this = _possibleConstructorReturn(this, (Item.__proto__ || Object.getPrototypeOf(Item)).call(this, props));

      _this.state = _extends({}, props);
      return _this;
   }

   _createClass(Item, [{
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(newProps) {
         if (this.props != newProps) {
            this.setState(_extends({}, newProps));
         }
      }
   }, {
      key: 'render',
      value: function render() {
         var _this2 = this;

         switch (item.state.struct.type.toLowerCase()) {
            case "text":
               return _react2.default.createElement(
                  'div',
                  { style: { display: 'flex', justifyContent: 'space-between', marginRight: 10, marginBottom: 10 } },
                  _react2.default.createElement(
                     'label',
                     null,
                     this.state.label
                  ),
                  _react2.default.createElement(_reactBootstrap.FormControl, {
                     style: { marginleft: 10, width: 200, display: 'inline-block' },
                     type: 'text',
                     placeholder: this.state.label,
                     onChange: function onChange(e) {
                        _this2.props.onChange(_this2.state.struct.id, e.target.value);
                     } })
               );
            default:
               return null;
         }
      }
   }]);

   return Item;
}(_react.Component);

exports.default = Item;