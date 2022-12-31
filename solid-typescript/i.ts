// The interface segregation principle puts an emphasis on creating smaller and more specific interfaces. Let’s imagine the following situation.

// interface Bird {
//   fly(): void;
//   walk(): void;
// }
// Above, we have an interface of a bird. We assume that birds can walk and fly. It is straightforward to create an example of such a bird:

// class Nightingale implements Bird {
//   public fly() {
//     /// ...
//   }
//   public walk() {
//     /// ...
//   }
// }
// The above is not always the case, though. The above assumption can be incorrect.

// class Kiwi implements Bird {
//   public fly() {
//     throw new Error('Unfortunately, Kiwi can not fly!');
//   }
//   public walk() {
//     /// ...
//   }
// }
// The interface segregation principle states that no client should be forced to depend on methods it does not use. By putting too many properties in our interfaces, we risk breaking the above rule.

// What we might do instead is to implement smaller interfaces, sometimes referred to as role interfaces.

// interface CanWalk {
//   walk(): void;
// }
// interface CanFly {
//   fly(): void;
// }
// class Nightingale implements CanFly, CanWalk {
//   public fly() {
//     /// ...
//   }
//   public walk() {
//     /// ...
//   }
// }
// class Kiwi implements CanWalk {
//   public walk() {
//     /// ...
//   }
// }
// By changing our approach to interfaces, we avoid bloating them and make our software easier to maintain.