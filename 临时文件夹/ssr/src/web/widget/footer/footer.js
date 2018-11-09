// require('footer.css');
const Footer = {
     async init(){
         await new Promise(resolve => {
             setTimeout(()=>{
                 console.log('测试es6')
             },1000)
         })
         console.log('Footer')
     }
}
export  default Footer