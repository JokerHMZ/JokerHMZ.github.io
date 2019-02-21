
    function defineReactive (obj, key, val) {
      //obj就是传入的this，即new出来的对象，自带data
      // key是data的key
      // val是data的value
      var dep = new Dep();//一个Vue的属性对应一个dep，这个dep用来管理这个属性
      Object.defineProperty(obj, key, {//将Vue.data的属性变为Vue的属性
        get: function() {
            //添加订阅者watcher到主题对象Dep
            if(Dep.target) {
                // JS的浏览器单线程特性，保证这个全局变量在同一时间内，只会有同一个监听器使用
                dep.addSub(Dep.target);//收集所有与该属性相关的watcher
            }
            return val;
        },
        set: function (newVal) {
            if(newVal === val) return;
            val = newVal;
            console.log(val);
            // 作为发布者发出通知
            dep.notify();//对所有订阅了的watcher发出通知
        }
      })
    }
    function observe(obj, vm) {
      Object.keys(obj).forEach(function(key) {//obj就是传入的data，vm就是传入的this，即new出来的对象
        defineReactive(vm, key, obj[key]);//this key value
      })
    }