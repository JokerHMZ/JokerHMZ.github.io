/**
 * 批处理构造函数
 * @constructor
 */
function Batcher() {
    this.reset();
}

/**
 * 批处理重置
 */
Batcher.prototype.reset = function () {
    this.has = {};
    this.queue = [];
    this.waiting = false;
};

/**
 * 将事件添加到队列中
 * @param job {Watcher} watcher事件
 */
Batcher.prototype.push = function (job) {
    if (!this.has[job.id]) {
        this.queue.push(job);
        this.has[job.id] = true;//防止重复将同一个watcher重复加入队列
        if (!this.waiting) {//保证多次连续操作dom时所有属性都只操作一次
            this.waiting = true;
            setTimeout(() => {//在所有赋值结束之后才操作dom，确保操作的是最新的一次更改
                this.flush();
            });
        }
    }
};

/**
 * 执行并清空事件队列
 */
Batcher.prototype.flush = function () {
    this.queue.forEach((job) => {
        job.cb();
    });
    this.reset();
};