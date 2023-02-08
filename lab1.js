function wait(){
    return new Promise(resolve => {
        setTimeout(resolve, 2000, 'resolved');
    });
}

function waitEnd(){
    return new Promise(resolve => {
        setTimeout(resolve, 5000, 'stopped');
    });
}

async function start(){
    console.log('before promise');
    const value = await wait();
    console.log(value);
    console.log('after promise');
}

async function end(){
    console.log('after promise');
    const value = await waitEnd();
    console.log(value);
    console.log('end promise');
}

start();
end();