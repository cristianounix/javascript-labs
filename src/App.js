import React from 'react';
import Track from './Track';
import Heatmap from './Heatmap';
import { hot } from 'react-hot-loader';

class App extends React.Component {

  constructor() {
    super();
    this.state = {};

    this.handleTrack = this.handleTrack.bind(this);
  }

  handleTrack(data) {
    // console.log('--->', data);
    this.setState({
      data
    });
  }


  render() {
    return (
      <div>
        <div>
          <Heatmap 
            data={this.state}
          />
        </div>
        <div>
          <Track 
            handle={this.handleTrack} 
          />
        </div>
      </div>
    )
  }
}

export default hot(module)(App)
