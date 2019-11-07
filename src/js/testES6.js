/* eslint-disable no-console */
const x = 5;
let a = 3;
let b = 4;

console.log(a, b);
a += 1;
b += 1;
console.log(`a & b after  increment: ${a}, ${b}`);

function testES6func() {
  console.log('ES6 to ES5 some');
}

if (x === 3) {
  // eslint-disable-next-line no-console
  console.log('success');
}

testES6func();
