/**
 * @fileOverview actions for wrap navigation between views behing a platform
 * independant api. These action should be pretty dumb and only change the
 * route to be rendered in the user interface.
 */
import {PREFIX_REGEX} from "../config";

  const http = require('http');

class GameAction {
  constructor(store, nav, payment, notification) {
    this._store = store;
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
    this._notification.display({ msg: 'Start placing bet' });
    http.get('http://localhost:8000/api/games/', (resp) => {
      let data = '';

      // A chunk of data has been recieved.
      resp.on('data', (chunk) => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        let data = JSON.parse(data);
        let address = data.address;
        //let address = "lntb1u1pwtvrxwpp53fmxpznl3rns6x94ryuvqkww5tk2cuunyqy7pn2s5zzzzmv7dpqsdq8w3jhxaqcqzysxqy9gcqra3tca90g4622ktggy4ewxu37673supnq67j5dz87vmhtqh5ld7juve6nr2ccwvu4jtwfq0xg4gdlsfg3mcgs5cnt0ezxxp8qqz6d6sqk9jz3u"
        this._store.payment.address = address.replace(PREFIX_REGEX, '');
        this._nav.goPay();
      });

    }).on("error", (err) => {
      this._store.connectedGame = err.message;
    });
  }


  /*connectGame() {
        this._store.connectedGame = "Test"
        //this._store.route = 'Loader';
       http.get('http://localhost:8000/api/users/', (resp) => {
      let data = '';

      // A chunk of data has been recieved.
      resp.on('data', (chunk) => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        this._store.connectedGame = JSON.parse(data);
      });

    }).on("error", (err) => {
         this._store.connectedGame = err.message;
    });
  }*/
}

export default GameAction;
