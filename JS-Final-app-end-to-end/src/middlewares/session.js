export function addSession(loadData){
    return function(context, next){
        const userData = loadData();
        if(userData){
            context.user = userData;
        }
        next();
    };
}
