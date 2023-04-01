export function addUserNav(navTempalte) {
    let hasUser = null;

    return function (context, next){
        
        if(Boolean(context.user) !== hasUser){
            hasUser = Boolean(context.user);
            context.renderNav(navTempalte(hasUser));
        }

        next();
    };
}
