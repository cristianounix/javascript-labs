import React from 'react';
import Track from './Track';
import DrawMap from './DrawMap';
import { hot } from 'react-hot-loader';

class App extends React.Component {

  constructor() {
    super();
    this.state = {};

    this.handleTrack = this.handleTrack.bind(this);
  }

  handleTrack(data) {
    console.log('--->', data);
    this.setState({
      data
    });
  }


  render() {
    return (
      <div>
        <div>
          <DrawMap
            id={"rrr"}
            height={300}
            width={300}
            innerRadius={100}
            outerRadius={110}
            backgroundColor={"red"}
            foregroundColor={"green"}
            percentComplete={0.3}
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
