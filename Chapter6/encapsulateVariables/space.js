const _ = require('./defaultOwner.js')
const __ = require('./defaultOwner2.js')

let spaceship = {};
let newName = { firstName: '레베카', lastName: '파슨스' };

// spaceship.owner = _.defaultOwner();
// console.log(spaceship.owner);
// // _.setDefaultOwner(newName);
// spaceship.owner.lastName = '콜록';

spaceship.owner = __.defaultOwner();
console.log(spaceship.owner);
// _.setDefaultOwner(newName);
spaceship.owner.lastName = '콜록';

console.log(spaceship.owner);