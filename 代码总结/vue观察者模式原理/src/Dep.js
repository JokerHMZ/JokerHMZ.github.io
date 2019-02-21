function Dep() {
  this.subs = [];//Array<Watcher>，一个储存watcher的数组
}
Dep.prototype = {
  addSub: function(sub) {
    this.subs.push(sub);//将订阅这个observe的watcher放入数组中
  },
  notify: function() {
    this.subs.forEach(function(sub) {//通知所有订阅的watcher更新数据
      sub.update();
    })
  }
}