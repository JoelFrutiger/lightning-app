/**
 * @fileOverview actions for wrap navigation between views behing a platform
 * independant api. These action should be pretty dumb and only change the
 * route to be rendered in the user interface.
 */
//const http = require('http');

class GameAction {
  constructor(store, nav) {
    this._store = store;
    this._nav = nav;
  }

  login(){
    this._nav.goHome();
  }

  setUsername({ username }) {
    this._store.connectedGames[0].username = username;
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
