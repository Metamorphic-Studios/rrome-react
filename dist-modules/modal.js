'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = require('react-bootstrap');

var _items = require('./items');

var _items2 = _interopRequireDefault(_items);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormModal = function (_Component) {
   _inherits(FormModal, _Component);

   function FormModal(props) {
      _classCallCheck(this, FormModal);

      var _this = _possibleConstructorReturn(this, (FormModal.__proto__ || Object.getPrototypeOf(FormModal)).call(this, props));

      _this.state = _extends({}, props);
      return _this;
   }

   _createClass(FormModal, [{
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(newProps) {
         if (this.props !== newProps) {
            this.setState(_extends({}, newProps));
         }
      }
   }, {
      key: 'renderFields',
      value: function renderFields() {
         return this.state.struct.map(function (x) {
            return _react2.default.createElement(_items2.default, { type: x, placeholder: x });
         });
      }
   }, {
      key: 'render',
      value: function render() {
         return _react2.default.createElement(
            _reactBootstrap.Modal,
            { show: this.state.show },
            _react2.default.createElement(
               _reactBootstrap.Modal.Header,
               null,
               _react2.default.createElement(
                  _reactBootstrap.Modal.Title,
                  null,
                  'hold'
               )
            ),
            _react2.default.createElement(
               _reactBootstrap.Modal.Body,
               null,
               this.renderFields()
            ),
            _react2.default.createElement(
               _reactBootstrap.Modal.Footer,
               null,
               _react2.default.createElement(
                  _reactBootstrap.Button,
                  null,
                  ' Save '
               ),
               _react2.default.createElement(
                  _reactBootstrap.Button,
                  { onClick: this.state.onHide },
                  'Close'
               )
            )
         );
      }
   }]);

   return FormModal;
}(_react.Component);

exports.default = FormModal;