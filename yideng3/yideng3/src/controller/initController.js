/**
 * Created by he.mingze on 2017/9/22.
 */
var index=require('./indexController');
var contorllerInit={
  init(app,router){
      app.use(router(_=>{
          _.get('/index/index',index.index());
          _.post('/receive',index.update())
      }))
  }
};
export default contorllerInit;