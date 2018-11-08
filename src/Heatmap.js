import React from 'react';
// import simpleheat from './DrawMap';
// const simpleheat = require('./DrawMap');

class Heatmap extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      defaultRadius: 25,
      defaultGradient: {
        0.4: 'blue',
        0.6: 'cyan',
        0.7: 'lime',
        0.8: 'yellow',
        1.0: 'red'
      }
    };

    this.canvas = React.createRef();
  }

  data(data) {
      this._data = data;
      return this;
  }

  max(max) {
      this._max = max;
      return this;
  }

  add(point) {
      this._data.push(point);
      return this;
  }

  clear() {
      this._data = [];
      return this;
  }

  radius(r, blur) {
    blur = blur === undefined ? 15 : blur;

    // create a grayscale blurred circle image that we'll use for drawing points
    var circle = this._circle = this._createCanvas(),
        ctx = circle.getContext('2d'),
        r2 = this._r = r + blur;

    circle.width = circle.height = r2 * 2;

    ctx.shadowOffsetX = ctx.shadowOffsetY = r2 * 2;
    ctx.shadowBlur = blur;
    ctx.shadowColor = 'black';

    ctx.beginPath();
    ctx.arc(-r2, -r2, r, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();

    return this;
  }

  resize() {
    this._width = this._canvas.width;
    this._height = this._canvas.height;
  }

  gradient(grad) {
    // create a 256x1 gradient that we'll use to turn a grayscale heatmap into a colored one
    var canvas = this._createCanvas(),
        ctx = canvas.getContext('2d'),
        gradient = ctx.createLinearGradient(0, 0, 0, 256);

    canvas.width = 1;
    canvas.height = 256;

    for (var i in grad) {
        gradient.addColorStop(+i, grad[i]);
    }

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1, 256);

    this._grad = ctx.getImageData(0, 0, 1, 256).data;

    return this;
  }

  draw(minOpacity) {
    if (!this._circle) this.radius(this.defaultRadius);
    if (!this._grad) this.gradient(this.defaultGradient);

    var ctx = this._ctx;

    ctx.clearRect(0, 0, this._width, this._height);

    // draw a grayscale heatmap by putting a blurred circle at each data point
    for (var i = 0, len = this._data.length, p; i < len; i++) {
        p = this._data[i];
        ctx.globalAlpha = Math.min(Math.max(p[2] / this._max, minOpacity === undefined ? 0.05 : minOpacity), 1);
        ctx.drawImage(this._circle, p[0] - this._r, p[1] - this._r);
    }

    // colorize the heatmap, using opacity value of each pixel to get the right color from our gradient
    var colored = ctx.getImageData(0, 0, this._width, this._height);
    this._colorize(colored.data, this._grad);
    ctx.putImageData(colored, 0, 0);

    return this;
  }


  _colorize(pixels, gradient) {
    for (var i = 0, len = pixels.length, j; i < len; i += 4) {
        j = pixels[i + 3] * 4; // get gradient color from opacity value

        if (j) {
            pixels[i] = gradient[j];
            pixels[i + 1] = gradient[j + 1];
            pixels[i + 2] = gradient[j + 2];
        }
    }
  }

  _createCanvas() {
    if (typeof document !== 'undefined') {
        return document.createElement('canvas');
    } else {
        // create a new canvas instance in node.js
        // the canvas class needs to have a default constructor without any parameter
        return new this._canvas.constructor();
    }
  }

  static getDerivedStateFromProps(props, state) {
    console.log('Derivate', props.data.data);
    if (!props.data) {
      return {};
    }
    return props.data;
  }

  componentDidUpdate() {
    console.log('UPDATE');
    const heat = this.simpleheat.default(this.canvas.current).data(
      { x: 234, y: 354, w: 1},
      { x: 453, y: 62, w: 1},
      { x: 634, y: 346, w: 1},
    ).max(18);
    
    heat.draw();
    
  }

  componentDidMount() {
    // this.contextCanvas = this.canvas.current.getContext('2d');
    // console.log('DID Mount: ', this.props);
    // create refs for canvas
    // heat = simpleheat('canvas').data(data).max(18)
  }
  
  render() {
    return (
      <div>
        <canvas id="canvas" width="1000" height="600" ref={this.canvas}></canvas>
      </div>
    );
  }

}
export default Heatmap;
