import React from 'react';

export class Canvas extends React.PureComponent {

  constructor() {
    super();
    this.state = {};
  }

  setRef = (ctx) => {
    this.ctx = ctx.getContext("2d");
  }

  componentDidMount() {
    // this.ctx.fillRect(this.props.data.x, this.props.data.y, this.props.data.x+30, this.props.data.y+30);
  }

  componentDidUpdate() {
    console.log('Canvas -->', this.props.data);
    let radius        = 20;                          // Arc radius
    let startAngle    = 0;                           // Starting point on circle
    // let endAngle      = Math.PI + (Math.PI * j) / 2; // End point on circle
    let endAngle      = 0; // End point on circle
    let anticlockwise = false;                  // Draw anticlockwise
    // this.ctx.fillRect(this.props.data.x, this.props.data.y, this.props.data.x, this.props.data.y);
    this.ctx.arc(this.props.data.x, this.props.data.y, radius, startAngle, endAngle, anticlockwise);
    this.ctx.fill();
  }

  render() {
    return (
     <canvas
        height={this.props.height}
        width={this.props.width}
        ref={this.setRef}
      />
    );
  }
}

export default Canvas;