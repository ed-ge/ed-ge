import Component from "../base/Component.js"

class PeerServer extends Component {
  constructor() {
    super();
  }
  start() {
    console.log("Start server")
    this.peer = new Peer("aeuaeouaoeuaeu", {debug:2});
    this.peer.on('open', function (id) {
      console.log("My id is " + id);
    })
    this.peer.on('connection', function (conn) {
      conn.on('open', function () {
        conn.on('data', function (data) {
          console.log("Received " + data);
        })
      })
      conn.on('error', function(error){
        console.log(error);
      })
    })
    this.peer.on('error', function(error){
      console.log(error);
    })
    
  }
  update() {
    // console.log("Peer server");
  }
}

export default PeerServer;