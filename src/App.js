import React from 'react';
import Store from './Store';
import { hot } from 'react-hot-loader';

class App extends React.Component {

  constructor() {
    super();
    this.state = {};

    this.handleMousemove = this.handleMousemove.bind(this);
    this.throttle = this.throttle.bind(this);
  }

  handleMousemove(event) {
    const obj = {
      x: event.x,
      y: event.y,
    };
    Store.append(obj);
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
    console.log('Store: ', Store);
    window.document.addEventListener('mousemove', this.throttle(this.handleMousemove, 1000));
  }

  render() {
    return null;
  }
}

export default hot(module)(App)
