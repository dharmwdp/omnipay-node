'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var API = require('./api');
var pkg = require('../package.json');

var _require = require('./utils/omnipay-utils'),
    _validateWebhookSignature = _require.validateWebhookSignature;

var Omnipay = function () {
  _createClass(Omnipay, null, [{
    key: 'validateWebhookSignature',
    value: function validateWebhookSignature() {

      return _validateWebhookSignature.apply(undefined, arguments);
    }
  }]);

  function Omnipay() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Omnipay);

    var key_id = options.key_id,
        key_secret = options.key_secret,
        headers = options.headers;


    if (!key_id) {
      throw new Error('`key_id` is mandatory');
    }

    if (!key_secret) {
      throw new Error('`key_secret` is mandatory');
    }

    this.key_id = key_id;
    this.key_secret = key_secret;

    this.api = new API({
      hostUrl: 'https://api.omnipay.com/v1/',
      ua: 'omnipay-node@' + Omnipay.VERSION,
      key_id: key_id,
      key_secret: key_secret,
      headers: headers
    });
    this.addResources();
  }

  _createClass(Omnipay, [{
    key: 'addResources',
    value: function addResources() {
      Object.assign(this, {
        payments: require('./resources/payments')(this.api),
        refunds: require('./resources/refunds')(this.api),
        orders: require('./resources/orders')(this.api)
      });
    }
  }]);

  return Omnipay;
}();

Omnipay.VERSION = pkg.version;


module.exports = Omnipay;