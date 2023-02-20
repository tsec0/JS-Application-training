import { sum, product, data as externalData, inspect } from './util.js';
// import registerPerson from './module.js';
import register from './module.js'

console.log(sum(5, 3));
console.log(product(3, 5));
console.log(product("3", 5));
inspect(0);

console.log('Add a number');
externalData[3] = 40;
inspect(3);

// console.log(registerPerson("Peter", 32));
console.log(register("Peter", 32));

async function start(){
    const { getData } = await import('./lazyEvaluation.js');
    console.log(getData);
}

//global function - its a public 
window.start = start;
