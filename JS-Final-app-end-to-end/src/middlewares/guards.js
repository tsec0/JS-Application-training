export function hasUser(){
    return function (context, next){
        if(!context.user){
            context.page.redirect('/login');
        } else {
            next();
        }
    };
}

export function isOwner(){
    return function(context, next){
        if(context.data?.owner?.objectId !== context.user?.objectId){
            context.page.redirect('/login');
        } else {
            next();
        }
    };
}