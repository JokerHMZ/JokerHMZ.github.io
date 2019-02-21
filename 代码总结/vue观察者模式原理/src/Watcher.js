let uid=0;
function Watcher(vm, node, name, type) {
    this.id=++uid;
    Dep.target = this;
    this.name = name;//指令内容，也是Vue的一个属性
    this.node = node;//元素节点
    this.vm = vm;//Vue对象
    this.type = type;//获取对应节点值的属性，node类型节点用nodeValue来取值或者赋值，text节点用value来取值或者赋值
    // this.batcher = new Batcher();//创建批处理工具
    this.update();
    Dep.target = null;
}

Watcher.prototype = {
    batcher:new Batcher(),
    update: function() {
        this.get();//执行对应属性的get，让该属性的dep保存该watcher
        this.batcher.push(this);//watcher给对应的属性赋值
        // this.node[this.type] = this.value; // 订阅者执行相应操作
    },
    cb:function(){
        this.node[this.type] = this.value; // watcher更新节点数据
    },
    // 获取data的属性值
    get: function() {
        this.value = this.vm[this.name]; //触发相应属性的get
    }
}
