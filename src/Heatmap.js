import React from 'react';
// import simpleheat from './DrawMap';
const simpleheat = require('./DrawMap');

class Heatmap extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};

    this.simpleheat = require('./DrawMap');

    this.canvas = React.createRef();
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
    this.simpleheat.default(this.canvas.current).data(
      { x: 234, y: 354, w: 1},
      { x: 453, y: 62, w: 1},
      { x: 634, y: 346, w: 1},
    ).max(18)
    // simpleheat('canvas').data(data).max(18)
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
