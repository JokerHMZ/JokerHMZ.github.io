'use strict';
import indexModel from '../models/indexModel';
const indexController = {
    index() {
        return async(ctx, next) => {
            const indexModelIns = new indexModel();
            const _data = await indexModelIns.getData();

            ctx.body = await ctx.render('index',{data:JSON.stringify(_data)});
        }
    }
};
export default indexController;
