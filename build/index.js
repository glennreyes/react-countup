

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.startAnimation = exports.formatNumber = undefined;

const _createClass = (function () {
  function defineProperties(target, props) {
    for (let i = 0; i < props.length; i++) {
      const descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ('value' in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}());

const _react = require('react');

const _react2 = _interopRequireDefault(_react);

const _countup = require('countup.js');

const _countup2 = _interopRequireDefault(_countup);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called",
    );
  }
  return call && (typeof call === 'object' || typeof call === 'function')
    ? call
    : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError(
      `Super expression must either be null or a function, not ${
        typeof superClass}`,
    );
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true,
    },
  });
  if (superClass) {
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass);
  }
}

// Adapted from the countup.js format number function
// https://github.com/inorganik/countUp.js/blob/master/countUp.js#L46-L60
const formatNumber = (exports.formatNumber = function formatNumber(
  start,
  options,
) {
  const num = `${start.toFixed(options.decimals)}`;
  const x = num.split('.');
  let x1 = x[0];
  const x2 = x.length > 1 ? `${options.decimal}${x[1]}` : '';
  const rgx = /(\d+)(\d{3})/;

  if (options.useGrouping && options.separator) {
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, `$1${options.separator}$2`);
    }
  }
  return `${options.prefix}${x1}${x2}${options.suffix}`;
});

const startAnimation = (exports.startAnimation = function startAnimation(
  component,
) {
  if (!(component && component.spanElement)) {
    throw new Error(
      'You need to pass the CountUp component as an argument!\neg. this.myCountUp.startAnimation(this.myCountUp);',
    );
  }

  let _component$props = component.props,
    decimal = _component$props.decimal,
    decimals = _component$props.decimals,
    duration = _component$props.duration,
    easingFn = _component$props.easingFn,
    end = _component$props.end,
    formattingFn = _component$props.formattingFn,
    onComplete = _component$props.onComplete,
    onStart = _component$props.onStart,
    prefix = _component$props.prefix,
    separator = _component$props.separator,
    start = _component$props.start,
    suffix = _component$props.suffix,
    useEasing = _component$props.useEasing,
    useGrouping = _component$props.useGrouping;

  const countupInstance = new _countup2.default(
    component.spanElement,
    start,
    end,
    decimals,
    duration,
    {
      decimal,
      easingFn,
      formattingFn,
      separator,
      prefix,
      suffix,
      useEasing,
      useGrouping,
    },
  );

  if (typeof onStart === 'function') {
    onStart();
  }

  countupInstance.start(onComplete);
});

const CountUp = (function (_Component) {
  _inherits(CountUp, _Component);

  function CountUp() {
    let _ref;

    let _temp,
      _this,
      _ret;

    _classCallCheck(this, CountUp);

    for (
      var _len = arguments.length, args = Array(_len), _key = 0;
      _key < _len;
      _key++
    ) {
      args[_key] = arguments[_key];
    }

    return (
      (_ret = ((_temp = ((_this = _possibleConstructorReturn(
        this,
        (_ref = CountUp.__proto__ || Object.getPrototypeOf(CountUp)).call.apply(
          _ref,
          [this].concat(args),
        ),
      )),
        _this)),
        (_this.spanElement = null),
        (_this.refSpan = function (span) {
          _this.spanElement = span;
        }),
        _temp)),
      _possibleConstructorReturn(_this, _ret)
    );
  }

  _createClass(CountUp, [
    {
      key: 'componentDidMount',
      value: function componentDidMount() {
        startAnimation(this);
      },
    },
    {
      key: 'shouldComponentUpdate',
      value: function shouldComponentUpdate(nextProps) {
        const hasCertainPropsChanged =
          this.props.duration !== nextProps.duration ||
          this.props.end !== nextProps.end ||
          this.props.start !== nextProps.start;

        return nextProps.redraw || hasCertainPropsChanged;
      },
    },
    {
      key: 'componentDidUpdate',
      value: function componentDidUpdate() {
        startAnimation(this);
      },
    },
    {
      key: 'render',
      value: function render() {
        let _props = this.props,
          className = _props.className,
          start = _props.start,
          style = _props.style,
          decimal = _props.decimal,
          decimals = _props.decimals,
          useGrouping = _props.useGrouping,
          separator = _props.separator,
          prefix = _props.prefix,
          suffix = _props.suffix;

        return _react2.default.createElement(
          'span',
          { className, style, ref: this.refSpan },
          formatNumber(start, {
            decimal,
            decimals,
            useGrouping,
            separator,
            prefix,
            suffix,
          }),
        );
      },
    },
  ]);

  return CountUp;
}(_react.Component));

// CountUp.propTypes = {
//   className: PropTypes.string,
//   decimal: PropTypes.string,
//   decimals: PropTypes.number,
//   duration: PropTypes.number,
//   easingFn: PropTypes.func,
//   end: PropTypes.number,
//   formattingFn: PropTypes.func,
//   onComplete: PropTypes.func,
//   onStart: PropTypes.func,
//   prefix: PropTypes.string,
//   redraw: PropTypes.bool, // eslint-disable-line react/no-unused-prop-types
//   separator: PropTypes.string,
//   start: PropTypes.number,
//   style: PropTypes.object,
//   suffix: PropTypes.string,
//   useEasing: PropTypes.bool,
//   useGrouping: PropTypes.bool,
// }

CountUp.defaultProps = {
  className: undefined,
  decimal: '.',
  decimals: 0,
  duration: 3,
  easingFn: null,
  end: 100,
  formattingFn: null,
  onComplete: undefined,
  onStart: undefined,
  prefix: '',
  separator: ',',
  start: 0,
  suffix: '',
  redraw: false,
  style: undefined,
  useEasing: true,
  useGrouping: false,
};
exports.default = CountUp;
