export function sum(a, b){
    verifyNumber(a);
    verifyNumber(b);
    return a + b;
}

export function product(a, b){
    verifyNumber(a);
    verifyNumber(b);
    return a * b;
}

// not exposed !
function verifyNumber(argument){
    if (typeof argument != 'number'){
        // throw new TypeError('Argument must be a number!')
        console.log('Argument must be a number!');
    }
}

// export const data = [ 1, 2, 3 ];

const data = [10, 20, 30];
// export {data};

function printData(n){
    if(typeof(n) == 'number'){
        if(n < data.length && n > -1){
            console.log(data[n]);
        } else {
            console.log('Not a proper range number');
        }
    } else {
        console.log('Enter a valid input');
    }
    
    
}
export {
    data,
    printData as inspect,
};
