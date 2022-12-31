// The above rule, introduced by Barbara Liskov, also helps us ensure that changing one area of our system does not break other parts. To make this principle less confusing, we will break it down into multiple parts.

// Replacing an instance of a class with its child class should not produce any negative side effects

// The first thing we notice in the above principle is that its main focus is class inheritance.

// Let’s implement a straightforward and vivid example of how we can break the above principle.

// class Employee {
//   protected permissions: any = new Set<string>();
 
//   public hasPermission(permissionName: string) {
//     return this.permissions.has(permissionName);
//   }
//   public addPermission(permissionName: string) {
//     return this.permissions.add(permissionName);
//   }
// }
// class Cashier extends Employee {
//   protected permissions: string[] = [];
 
//   public addPermission(permissionName: string) {
//     this.permissions.push(permissionName);
//   }
// }
// function isPersonAllowedToDeleteProducts(person: Employee) {
//   return person.hasPermission('deleteProducts');
// }
// The above code is very problematic because the implementation of  permissions differs in the  Cashier and the  User.

// const employee = new Employee();
// employee.addPermission('deleteProducts');
// isPersonAllowedToDeleteProducts(employee);
// The above code works fine, but when we replace an instance of a parent class with its child class, we experience issues.

// const cashier = new Cashier();
// cashier.addPermission('deleteProducts');
// isPersonAllowedToDeleteProducts(cashier);
// TypeError: this.permissions.has is not a function

// This situation is very vivid and shouldn’t happen in a properly typed TypeScript code. We had to use  permissions: any to allow the  Cashier to extend the  User improperly.