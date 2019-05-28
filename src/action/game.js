/**
 * @fileOverview actions for wrap navigation between views behing a platform
 * independant api. These action should be pretty dumb and only change the
 * route to be rendered in the user interface.
 */
import {PREFIX_REGEX} from "../config";
import {toSatoshis} from "../helper";

  const http = require('http');

class GameAction {
  constructor(store, grpc, nav, payment, notification) {
    this._store = store;
    this._grpc = grpc;
    this._nav = nav;
    this._payment = payment;
    this._notification = notification;
  }

  login(){
    this._nav.goHome();
  }

  setUsername({ username }) {
    this._store.connectedGames[0].username = username;
  }

  placeBet(){
    var _this = this;
    //this._notification.display({ msg: 'Start placing bet' });
    let options = {
      hostname: 'localhost',
      port: 8000,
      path: '/api/players/payment/',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    };
    let req = http.request(options, function (res) {
      res.setEncoding('utf8');
      res.on('data', function (body) {
        let data = JSON.parse(body);
        console.log("Body: ", body);

        let address = data.invoicetopay;
        //let address = "lntb1u1pwtvrxwpp53fmxpznl3rns6x94ryuvqkww5tk2cuunyqy7pn2s5zzzzmv7dpqsdq8w3jhxaqcqzysxqy9gcqra3tca90g4622ktggy4ewxu37673supnq67j5dz87vmhtqh5ld7juve6nr2ccwvu4jtwfq0xg4gdlsfg3mcgs5cnt0ezxxp8qqz6d6sqk9jz3u"
        _this._store.payment.address = address.replace(PREFIX_REGEX, '');
        _this._nav.goPay();
        //console.log('Body: ' + body);
      });
    });
    req.on('error', function(e) {
      console.log('problem with request: ' + e.message);
      _this._notification.display({ msg: e.message });
    });

    _this._grpc.sendCommand('addInvoice', {
      value: 2000,
      memo: "",
      expiry: 172800,
      private: true,
    }).then( response => {
      console.log(response);
      console.log(response.paymentRequest);
      let data = '{"player": "' + _this._store.connectedGames[0].username + '", "playerinvoice": "' + response.paymentRequest + '", "game": "dicegame" }';
      console.log(data);
      req.write(data);
      req.end();
    }).catch(err => {
      console.log(err);
    });
  }


}

export default GameAction;
