import React from 'react';
// import simpleheat from './DrawMap';
const simpleheat = require('./DrawMap');

class Heatmap extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      draw: simpleheat,
    };

  }

  static getDerivedStateFromProps(props, state) {
    console.log('Derivate', props.data.data);
    if (!props.data) {
      return {};
    }
    return props.data;
  }

  componentDidMount() {
    // console.log('DID Mount: ', this.props);
    // create refs for canvas
    // heat = simpleheat('canvas').data(data).max(18)
  }
  
  render() {
    return (
      <div>
        <div id="canvas"></div>
      </div>
    );
  }

}
export default Heatmap;
