import React from 'react';

class Track extends React.Component {
  
  constructor() {
    super();
    this.state = {
      store:[],
    };

    this.handleMousemove = this.handleMousemove.bind(this);
    this.throttle = this.throttle.bind(this);

  }
  
  findAndIncreasePosition({x = 0, y = 0 }) {
    const index = this.state.store.findIndex(p => p.x == x && p.y == y);

    // Use state.store as a big object where the keys will be position, like it, key = x-y 

    // this.state.store.

    //   if (p.x == x && ) {

    //   }
    // });
  }

  handleMousemove(event) {
    /* 
    { 
      x: 100, 
      y: 100, 
      w: 1 <- if the cursor keep position ( x iquals y) increase one
    }
    */
    const obj = {
      x: event.x,
      y: event.y,
      w: 1,
    };
    if (obj.x == obj.y) {
      obj.w += 1;
    }
    this.state.store.push(obj);
    console.log(`X ${obj.x} - Y:${obj.y} - W:${obj.w}`);
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
    console.log('ssStore: ', this.state.store);
    window.document.addEventListener('mousemove', this.throttle(this.handleMousemove, 1000));
  }
  
  render() {
    return null;
  }
}

export default Track;