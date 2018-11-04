import React from 'react';
import Track from './Track';
// import Track from './Components/Track';
import { hot } from 'react-hot-loader';

class App extends React.Component {

  render() {
    return (
      <div>

        <Track />
      </div>
    )
  }
}

export default hot(module)(App)
