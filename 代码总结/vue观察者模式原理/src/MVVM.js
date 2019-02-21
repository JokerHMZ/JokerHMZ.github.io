function Vue(options) {//声明全局的对象Vue
      this.data = options.data;//将option的data指向Vue的data
      var data = this.data;
      observe(data, this);//传入data和this
      var id = options.el;//获取根元素id
      var dom =new Compile(document.getElementById(id),this);//获取Vue生成的dom节点
      document.getElementById(id).appendChild(dom);// 编译完成后，将dom返回到app中
    }