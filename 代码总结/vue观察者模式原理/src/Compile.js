function Compile(node, vm) {
      if(node) {
        this.$frag = this.nodeToFragment(node, vm);
        return this.$frag;
      }
    }
    Compile.prototype = {
      nodeToFragment: function(node, vm) {
        var self = this;
        var frag = document.createDocumentFragment();
        var child;

        //在Vue中，virtual-dom于此处创建，本代码作为示例，简化了virtual-dom的创建
        while(child = node.firstChild) {//若将一个原本就存在于dom树上的节点append到DocumentFragment中，那么该节点会从dom树中删除
          self.compileElement(child, vm);
          frag.appendChild(child); // 将所有子节点添加到fragment中
        }

        return frag;//返回virtual-dom
      },
      compileElement: function(node, vm) {
        var reg = /\{\{(.*)\}\}/;

        //节点类型为元素
        if(node.nodeType === 1) {
          var attr = node.attributes;
          // 解析属性
          for(var i = 0; i < attr.length; i++ ) {
            if(attr[i].nodeName == 'v-model') {
              var name = attr[i].nodeValue; // 获取v-model绑定的属性名
              node.addEventListener('input', function(e) {
                // 给相应的data属性赋值，进而触发该属性的set方法
                 vm[name] = e.target.value;
              });
              // node.value = vm[name]; // 将data的值赋给该node
              new Watcher(vm, node, name, 'value');//一个指令对应一个watcher
            }
          };
        }
        //节点类型为text
        if(node.nodeType === 3) {
          if(reg.test(node.nodeValue)) {
            var name = RegExp.$1; // 获取匹配到的字符串
            name = name.trim();
            // node.nodeValue = vm[name]; // 将data的值赋给该node
            new Watcher(vm, node, name, 'nodeValue');
          }
        }
      },
    }