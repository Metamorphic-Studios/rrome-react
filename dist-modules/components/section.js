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

var _list = require('./list');

var _list2 = _interopRequireDefault(_list);

var _foreignSelector = require('./foreignSelector');

var _foreignSelector2 = _interopRequireDefault(_foreignSelector);

var _foreignList = require('./foreignList');

var _foreignList2 = _interopRequireDefault(_foreignList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Section = function (_Component) {
   _inherits(Section, _Component);

   function Section(props) {
      _classCallCheck(this, Section);

      var _this = _possibleConstructorReturn(this, (Section.__proto__ || Object.getPrototypeOf(Section)).call(this, props));

      _this.state = _extends({}, props, {
         content: {}
      });
      return _this;
   }

   _createClass(Section, [{
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(newProps) {
         if (this.props !== newProps) {
            this.setState(_extends({}, newProps));
         }

         if (this.props.struct !== newProps.struct) {
            this.setState({
               content: {}
            });
         }
      }
   }, {
      key: 'mapChange',
      value: function mapChange(id, val) {
         var change = {};
         change[id] = val;

         var content = _extends({}, this.state.content, change);
         this.setState({
            content: content
         });

         if (this.props.onChange) {
            this.props.onChange(content);
         }
      }
   }, {
      key: '_renderItems',
      value: function _renderItems() {
         var _this2 = this;

         return this.state.struct.map(function (x) {
            switch (x.type) {
               case "LIST":
                  return _react2.default.createElement(_list2.default, { value: x.value ? x.value : [], struct: x, onChange: function onChange(evt) {
                        _this2.mapChange(x.id, evt);
                     } });
               case "FSELECT":
                  return _react2.default.createElement(_foreignSelector2.default, { struct: x, onChange: function onChange(evt) {
                        return _this2.mapChange(x.id, evt.value);
                     }, value: x.value });
               case "FLIST":
                  return _react2.default.createElement(_foreignList2.default, { struct: x, onChange: function onChange(evt) {
                        return _this2.mapChange(x.id, evt);
                     }, value: x.value });
               default:
                  return _react2.default.createElement(_items2.default, { type: x.type, placeholder: x.label, onChange: function onChange(evt) {
                        _this2.mapChange(x.id, evt);
                     }, value: x.value });
            }
         });
      }
   }, {
      key: 'render',
      value: function render() {
         return _react2.default.createElement(
            'div',
            { style: { display: this.state.inMulti ? 'table-cell' : 'flex', flexDirection: 'column', width: this.state.inMulti ? '50%' : '80%', justifyContent: 'flex-start', flexWrap: this.state.inMulti ? null : null, minHeight: 'min-content' } },
            this._renderItems()
         );
      }
   }]);

   return Section;
}(_react.Component);

exports.default = Section;