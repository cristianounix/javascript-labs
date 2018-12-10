import React, { Component } from 'react';
import PropTypes from 'prop-types';
import simpleheat from "simpleheat";

class HeatMapDrawn extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [
        1,1,10,
        2,2,10,
        4,3,10,
        4,3,10,
        5,3,10,
      ]
    }
    this.heatMap = React.createRef();
  }

  componentDidMount() {
    if (this.heatMap.canvas) {
      console.log('Ref >>', this.heatMap)
      this.heatMap = simpleheat(this.heatMap);
      this.drawMap();
    }
  }

  componentDidUpdate() {
    if (this.heatMap.canvas) {
      console.log('Ref >>', this.heatMap)
      // this.d3Map = simpleheat(this.heatMap);
      this.drawMap();
    }
  }

  drawMap() {
      this.heatMap.data(this.props.data);
      // this.heatMap.max(5);
      this.heatMap.draw();
  } 
 
  render() {
    return (
      <div>
        <canvas 
          id="heatMap"
        >
        </canvas>
      </div>
    );
  }
}

HeatMapDrawn.propTypes = {
};

export default HeatMapDrawn;
