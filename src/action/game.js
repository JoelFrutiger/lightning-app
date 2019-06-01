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
        if(data.hasOwnProperty("invoicetopay")){
          let address = data.invoicetopay;
          _this._store.payment.address = address.replace(PREFIX_REGEX, '');
          _this._nav.goPay();
        }
        else{
          _this._notification.display({ msg: 'Invalid username or game not active' });
        }
      });
    });
    req.on('error', function(e) {
      console.log('problem with request: ' + e.message);
      _this._notification.display({ type: msg: e.message });
    });

    _this._grpc.sendCommand('addInvoice', {
      value: 2000,
      memo: "",
      expiry: 172800,
      private: true,
    }).then( response => {
        console.log("Response: ", response);
        console.log("Payment request to send: " + response.paymentRequest);
        let data = '{"player": "' + _this._store.connectedGames[0].username + '", "playerinvoice": "' + response.paymentRequest + '", "game": "dicegame" }';
        console.log("Sending to server: ", data);
        req.write(data);
        req.end();
    }).catch(err => {
      console.log(err);
      _this._notification.display({ msg: 'Error: ' +  err });
    });
  }


}

export default GameAction;
