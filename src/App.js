import React from 'react'
import { hot } from 'react-hot-loader'

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      x:0,
      y:0,
    };

    this.handleMousemove = this.handleMousemove.bind(this);
    this.throttle = this.throttle.bind(this);
  }

  handleMousemove(event) {
    this.setState({
      x: event.x,
      y: event.y,
    });
    console.log(`mouse position: ${event.x}:${event.y}`);
  }

  throttle(func, delay) {
    let prev = Date.now() - delay;
    return (...args) => {
      let current = Date.now();
      if (current - prev >= delay) {
        prev = current;
        func.apply(null, args);
      }
    }
  }

  componentDidMount() {
    window.document.addEventListener('mousemove', this.throttle(this.handleMousemove, 8000));
  }

  render() {
    return null;
  }
}

export default hot(module)(App)
