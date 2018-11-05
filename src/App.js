import React from 'react';
import Track from './Track';
import Heatmap from './Heatmap';
import { hot } from 'react-hot-loader';

class App extends React.Component {

  render() {
    return (
      <div>
        <div>
          <Heatmap />
        </div>
        <div>
          <Track />
        </div>
      </div>
    )
  }
}

export default hot(module)(App)
