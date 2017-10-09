'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = require('react-bootstrap');

var _modal = require('./modal');

var _modal2 = _interopRequireDefault(_modal);

var _expire = require('./expire');

var _expire2 = _interopRequireDefault(_expire);

var _items = require('./items');

var _items2 = _interopRequireDefault(_items);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
                  return _react2.default.createElement(
                     'div',
                     { style: { marginRight: '5px' } },
                     i[ix]
                  );
               case "DATE:D":
                  return _react2.default.createElement(_expire2.default, { value: i[ix] });
               case "TEXT":
                  return _react2.default.createElement(
                     'div',
                     { style: { marginRight: '5px' } },
                     i[ix]
                  );
               case "NUMBER":
                  return _react2.default.createElement(
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
            return _react2.default.createElement(
               _reactBootstrap.ListGroupItem,
               { style: { display: 'flex', justifyContent: 'space-around' } },
               _this2.renderItem(x),
               _react2.default.createElement(
                  _reactBootstrap.Button,
                  { bsSize: 'xsmall', style: { position: 'absolute', right: '35px' }, onClick: _this2.edit.bind(_this2, ix) },
                  _react2.default.createElement(_reactBootstrap.Glyphicon, { glyph: 'pencil' })
               ),
               _react2.default.createElement(
                  _reactBootstrap.Button,
                  { bsSize: 'xsmall', onClick: _this2.remove.bind(_this2, ix), style: { position: 'absolute', right: '5px' } },
                  _react2.default.createElement(_reactBootstrap.Glyphicon, { glyph: 'remove' })
               )
            );
         });
      }
   }, {
      key: 'renderModal',
      value: function renderModal() {
         var _this3 = this;

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
               { style: { display: 'flex', flexFlow: 'column' } },
               this.renderModalFields()
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
            return _react2.default.createElement(
               _reactBootstrap.FormGroup,
               null,
               _react2.default.createElement(
                  _reactBootstrap.ControlLabel,
                  null,
                  x.label
               ),
               _react2.default.createElement(_items2.default, { type: x.type, placeholder: 'Enter ' + x.label, onChange: function onChange(evt) {
                     _this4.handleModalChange(ix, evt);
                  }, value: _this4.state.modalContent[ix] })
            );
         });
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
               ' ',
               this.state.struct.label,
               ' '
            ),
            _react2.default.createElement(
               _reactBootstrap.ListGroup,
               { style: { display: 'flex', flexDirection: 'column', margin: '5px' } },
               this.renderItems()
            ),
            _react2.default.createElement(
               _reactBootstrap.Button,
               { style: { alignSelf: 'center' }, onClick: function onClick() {
                     _this5.setState({ modalShow: true });
                  } },
               _react2.default.createElement(Add, null),
               ' Add'
            ),
            this.renderModal()
         );
      }
   }]);

   return List;
}(_react.Component);

exports.default = List;