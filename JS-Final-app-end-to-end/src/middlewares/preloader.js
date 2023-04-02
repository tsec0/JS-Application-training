import * as roomService from '../data/room.js'

export function addPreloader(param, collection){
    return async function(context, next){
        const id = context.params[param];
        if (id){
            const data = await roomService.getById(id);
            context.data = data;
        }

        next();
    };
}