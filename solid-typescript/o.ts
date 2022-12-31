// According to the open-closed principle, software entities should be open for extension but closed for modification.

// The core idea of the above principle is that we should be able to add new functionalities without changing the existing code.

// class Rectangle {
//   public width: number;
//   public height: number;
//   constructor(width: number, height: number) {
//     this.width = width;
//     this.height = height;
//   }
// }
// class Circle {
//   public radius: number;
//   constructor(radius: number) {
//     this.radius = radius;
//   }
// }


// // Let’s say we want to create a function that calculates the area of an array of shapes. 
// // With our current design, it might look like that:

// function calculateAreasOfMultipleShapes(
//   shapes: Array<Rectangle | Circle>
// ) {
//   return shapes.reduce(
//     (calculatedArea, shape) => {
//       if (shape instanceof Rectangle) {
//         return calculatedArea + shape.width * shape.height;
//       }
//       if (shape instanceof Circle) {
//         return calculatedArea + shape.radius * Math.PI;
//       }
//     },
//     0
//   );
// }


// The issue with the above approach is that when we introduce a new shape, 
// we need to modify our  calculateAreasOfMultipleShapes function. 
// This makes it open for modification and breaks the open-closed principle.

// We can fix that by enforcing our shapes to have a method that returns the area.


interface Shape {
  getArea(): number;
}
class Rectangle implements Shape {
  public width: number;
  public height: number;
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }
  public getArea() {
    return this.width * this.height;
  }
}
class Circle implements Shape {
  public radius: number;
  constructor(radius: number) {
    this.radius = radius;
  }
  public getArea() {
    return this.radius * Math.PI;
  }
}

// Now that we are sure that all of our shapes have the  getArea function, we can use it further.

function calculateAreasOfMultipleShapes(
  shapes: Shape[]
) {
  return shapes.reduce(
    (calculatedArea, shape) => {
      return calculatedArea + shape.getArea();
    },
    0
  );
}


// Now when we introduce a new shape, we don’t need to modify our  calculateAreasOfMultipleShapes function. 
// We make it open for extension but closed for modification.