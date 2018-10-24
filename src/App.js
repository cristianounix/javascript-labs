import React from 'react'
import { hot } from 'react-hot-loader'

class App extends React.Component {

  constructor() {
    super();
    this.state = {};

    this.handleMousemove = this.handleMousemove.bind(this);
    this.throttle = this.throttle.bind(this);
  }

  handleMousemove(event) {
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
    window.document.addEventListener('mousemove', this.throttle(this.handleMousemove, 1000));
  }

  render() {
    return null;
  }
}

export default hot(module)(App)
