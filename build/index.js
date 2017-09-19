'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _countup = require('countup.js');

var _countup2 = _interopRequireDefault(_countup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Adapted from the countup.js format number function
// https://github.com/inorganik/countUp.js/blob/master/countUp.js#L46-L60
var formatNumber = function formatNumber(start, options) {
  var num = '' + start.toFixed(options.decimals);
  var x = num.split('.');
  var x1 = x[0];
  var x2 = x.length > 1 ? '' + options.decimal + x[1] : '';
  var rgx = /(\d+)(\d{3})/;

  if (options.useGrouping && options.separator) {
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + options.separator + '$2');
    }
  }
  return '' + options.prefix + x1 + x2 + options.suffix;
};

var startAnimation = function startAnimation(component) {
  if (!(component && component.spanElement)) {
    throw new Error('You need to pass the CountUp component as an argument!\neg. this.myCountUp.startAnimation(this.myCountUp);');
  }

  var countupInstance = new _countup2.default(component.spanElement, component.props.start, component.props.end, component.props.decimals, component.props.duration);

  countupInstance.start();
};

var CountUp = function (_Component) {
  _inherits(CountUp, _Component);

  function CountUp() {
    _classCallCheck(this, CountUp);

    return _possibleConstructorReturn(this, (CountUp.__proto__ || Object.getPrototypeOf(CountUp)).apply(this, arguments));
  }

  _createClass(CountUp, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      startAnimation(this);
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps) {
      var hasCertainPropsChanged = this.props.duration !== nextProps.duration || this.props.end !== nextProps.end || this.props.start !== nextProps.start;

      return nextProps.redraw || hasCertainPropsChanged;
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      startAnimation(this);
    }
  }, {
    key: 'refSpan',
    value: function refSpan(span) {
      this.spanElement = span;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'span',
        {
          className: this.props.className,
          ref: function ref(span) {
            _this2.refSpan(span);
          }
        },
        formatNumber(this.props.start, {
          decimal: this.props.decimal,
          decimals: this.props.decimals
        })
      );
    }
  }]);

  return CountUp;
}(_react.Component);

exports.default = CountUp;


CountUp.propTypes = {
  className: _react.PropTypes.string,
  decimal: _react.PropTypes.string,
  decimals: _react.PropTypes.number,
  duration: _react.PropTypes.number,
  easingFn: _react.PropTypes.func,
  end: _react.PropTypes.number,
  redraw: _react.PropTypes.bool, // eslint-disable-line react/no-unused-prop-types
  start: _react.PropTypes.number
};