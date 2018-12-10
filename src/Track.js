import React from 'react';
import html2canvas from 'html2canvas';

class Track extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      store: {},
    };

    this.handleMousemove = this.handleMousemove.bind(this);
    this.throttle = this.throttle.bind(this);
    this.increasePositionIfhas = this.increasePositionIfhas.bind(this);

  }
  
  increasePositionIfhas({x = 0, y = 0, w = 0 }) {
    const key = `${x}-${y}`;
    const state = Object.assign({}, this.state);

    state.store[key] = {
      x: x,
      y: y,
      w: w,
    };

    if (state.store[key] && state.store[key].x == x && state.store[key].y == y ) {
      state.store[key].w = state.store[key].w + 1;
    }

    console.log(`X:${state.store[key].x} - Y:${state.store[key].y} - W:${state.store[key].w}`);
    this.setState(() => {
      state
    });
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
    this.props.handle(obj);
    // this.increasePositionIfhas(obj);
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
    window.document.addEventListener('mousemove', this.throttle(this.handleMousemove, 300));

    html2canvas(document.body).then(function(canvas) {
      // document.body.appendChild(canvas);
      console.log('Canvas html to canvas-->', canvas);
    });
    
  }
  
  render() {
    return null;
  }
}

export default Track;