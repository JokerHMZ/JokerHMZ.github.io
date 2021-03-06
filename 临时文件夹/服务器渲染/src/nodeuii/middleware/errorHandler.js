const errorHandler = {
    error(app,logger) {
        //vue ssr  集中到整个类里
        //500
        app.use(async(ctx, next) => {
            try {
                await next();
            } catch (err) {
                logger.error(err)
                ctx.status = err.status || 500;
                ctx.body = "500";
            }
        });
        //404
        app.use(async(ctx, next) => {
            await next();
            if (404 != ctx.status) return;
            ctx.status = 404;
            ctx.body = "404";
        });
    }
};
export default errorHandler;