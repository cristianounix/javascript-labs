import React, { Component } from "react";
import "./App.css";
import Push from "./Push";
import Status from "./Status.js";
import ServerData from "./ServerData";
import ServerDataWithUpdate from "./ServerDataWithUpdate";
import {callRefreshCallbacks} from "./refresh"

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Service Workers at your Service</h1>
        </header>
        <div>
            <div>
              <ServerData url={"/api/hello"} />
              <ServerData url={"/api/cacheFirst"} />
              <ServerData url={"/api/cacheFirst?someQuery=test2"} />
              <ServerData url={"/api/networkFirst"} />
              <ServerData url={"/api/cacheOnly"} />
              <ServerData url={"/api/networkOnly"} />
              <ServerData url={"/api/staleWhileRevalidate"} />
              <ServerDataWithUpdate url={"/api/networkFirstCacheUpdate"} />
              <Status />
              <button onClick={callRefreshCallbacks}> Fetch </button>
            </div>
        <Push/>
      </div>
      </div>
    );
  }
}

export default App;
