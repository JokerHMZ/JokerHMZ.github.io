var app = app || {}

const boundaryStyle = {                                                                                                                                            //canvas中ctx的状态机参数对象，这里只定义了颜色
    fillStyle: 'white',
    strokeStyle: 'transparent'
};

const colors = ['#D3F8E2', '#E4C1F9', '#F694C1', '#EDE7B1', '#A9DEF9'];                                                   //小球的颜色集合

app.init = function() {
    const { Bodies, Body, Composite, Composites, Engine, Vector, World, Common } = Matter;                                //解构Matter对象

//Engine :模块包含了创建和处理引擎的方法,是负责管理和更新模拟世界的控制器。引擎可以控制时间的缩放，可以检测所有的碰撞事件，并且拿到所有碰撞的物体对。
//World:模块包含了用于创建和操作世界的方法(世界就是存放Matter.js 中任何物体的地方)，一个world 相当于一个复合物体。其次世界还有额外的一些属性，比如重力、边界。
//Bodies：主要用于创建基础物体，并且返回相应物体的body对象。
//Body：主要用于控制被Bodies创建的物体，以及组成新的body。例如平移，缩放，旋转等等。
//Vector：模块包含用于创建和操纵向量的方法，向量是引擎有关几何操作行为的基础，修改物体的运动状态基本都是使用向量来控制，例如：平移的方向和距离，对物体释加的力（包括大小和方向）或者设置物体的速度、旋转角度等等。
//Composite：由刚体和复合材料通过约束（约束可理解为通过一条线，将刚体 A 和刚体 B 两个刚体连接起来， 被约束的两个刚体由于被连接在了一起，移动就相互受到了限制。）组合在一起的就叫做复合体。复合体对外当作一个刚体，复合体的物理属性是通过所包含的刚体的属性综合计算出来的。同时该属性负责操控复合体，例如平移，缩放，旋转等等。
//Composites：提供了几种特别的复合材料
//Common：功能类等，包含matter.js所需的功能函数

    const engine = Engine.create({                                                                                                                              //Engine.create(option) 创建一个物理引擎
    render: {                                                                                                                                                                //@object option设置场景
            element: document.body,                                                                                                                               //@object option.element 指定引擎绑定的元素
        options: {                                                                                                                                                            //@object option.options 指定场景的一些基础值：
            height: window.innerHeight,                                                                                                                          //@number option.options.height 高
            width: window.innerWidth,                                                                                                                             //@number option.options.width 宽
            background: '#8785a2',                                                                                                                                 //@string option.options.background 填充背景颜色
             wireframes: false                                                                                                                                          //@boolean option.options.wireframes 场景内元素使用描边模式还是填充模式
            }
        }
    })

    const originY = window.innerHeight / 2;                                                                                                                     //标记屏幕高的中心
    const originX = window.innerWidth / 2;                                                                                                                     //标记屏幕宽的中心


    //Bodies.rectangle 画一个矩形，Bodies.rectangle(x,y,width,height,option)，会返回一个body对象
    //@object option：
    // @number angle：指示旋转角度，旋转中心为物体中心
    // @object render：指示矩形基础属性，这里指明了颜色
    // @boolean isStatic：是否为静态，静态物体质量和惯性都是无限大

    const rectTopLeft = Bodies.rectangle( originX, originY, 20, 200, {                                                                          //绘制白色漏斗（此时所有的矩形边框应该都在中心处），左上角矩形
        angle: Math.PI / -6,
        render: boundaryStyle,
        isStatic: true
    })

    const rectTopRight = Bodies.rectangle( originX, originY, 20, 200, {                                                                           //右上角矩形
        angle: Math.PI / 6,
        render: boundaryStyle,
        isStatic: true
    })

    const rectTop = Bodies.rectangle( originX, originY, 280, 25, {                                                                                    //上方矩形
        render: boundaryStyle,
        isStatic: true
    })

    const rectBottom = Bodies.rectangle( originX, originY, 280, 25, {                                                                               //下方矩形
        render: boundaryStyle,
        isStatic: true
    })

    const rectLeft = Bodies.rectangle( originX, originY, 16, 30, {                                                                                       //左中处小的链接矩形
        render: boundaryStyle,
        isStatic: true
    })
    const rectRight = Bodies.rectangle( originX, originY, 16, 30, {                                                                                      //右中处小的链接矩形
        render: boundaryStyle,
        isStatic: true
    })

    const rectBottomLeft = Bodies.rectangle( originX, originY, 20, 200, {                                                                         //左下角矩形
        angle: Math.PI / 6,
        render: boundaryStyle,
        isStatic: true
    })

    const rectBottomRight = Bodies.rectangle( originX, originY, 20, 200, {                                                                          //右下角矩形
        angle: Math.PI / -6,
        render: boundaryStyle,
        isStatic: true
    })

    //移动矩形各个边框使其呈现出漏斗的形状
    //Body.translate(body,translation) 平移
    // @object body：需要平移的body
    // @object translation：平移的方向，接受一个vector对象
    // Vector.create(x,y) 创建一个向量，返回一个vector对象
    // @number x：起始点为(0,0)的向量的x坐标
    // @number y：起始点为(0,0)的向量的y坐标
    Body.translate(rectTopLeft, Vector.create(-70, -55 * Math.sqrt(3)));
    Body.translate(rectTopRight, Vector.create(70, -55 * Math.sqrt(3)));
    Body.translate(rectTop, Vector.create(0, 100 * Math.sqrt(3) + 10));
    Body.translate(rectBottom, Vector.create(0, -100 * Math.sqrt(3) - 10));
    Body.translate(rectBottomLeft, Vector.create(-70, 55 * Math.sqrt(3)));
    Body.translate(rectBottomRight, Vector.create(70, 55 * Math.sqrt(3)));
    Body.translate(rectLeft, Vector.create(-20, 0));
    Body.translate(rectRight, Vector.create(20, 0));




    const hourglassCompound = Body.create({                                                                                                                                //Body.create(option) 创建一个新的body对象
        parts: [rectTop, rectTopLeft, rectTopRight, rectLeft, rectRight, rectBottomLeft, rectBottomRight, rectBottom],  //@array option.parts 生成一个新的body对象所用的body
        isStatic: true                                                                                                                                                                        //@boolean option.isStatic 生成一个新的body对象所用的body
    })



//Composites.pyramid(xx, yy, columns, rows, columnGap, rowGap, callback)创建一个金字塔组合体
//@number xx：组合体起始点x（将组合体看成一个矩形，左上角为起始点）
//@number yy：组合体起始点y（将组合体看成一个矩形，左上角为起始点）
//@number columns：组合体列数
//@number rows：组合体行数
//@number columnGap：组合体起始列间距
//@number rowGap：组合体起始行间距
//@function callback：组成组合体的基本单位（这里是圆）

//Bodies.circle(x, y, radius, [options])创建一个圆
//@number x：圆心x值
//@number y：圆心y值
//@number radius：半径
//@number options.friction 摩擦力，取值为0-1之间
//@number options.restitution  反弹系数，取值为0-1之间，0意味着无反弹，0.8意味着碰撞后会以0.8的动能反弹回去，两个物体碰撞时的反弹系数为两物体中反弹系数的较大值：Math.max(bodyA.restitution, bodyB.restitution)
    const balls = Composites.pyramid(originX, originY, 20, 20, 0, 0, function(x, y){                                                                        //创建小球
        return Bodies.circle(x, y, 5, {
            render: {
                fillStyle: Common.choose(colors),                                                                                                                                     //Common.choose(choices) 从choices随机选择一个值 @array choices随机值的选择数组
                strokeStyle: 'transparent'
            },
            friction: .09,
            restitution: .15
        })
    })


    Composite.rotate(balls, Math.PI, Vector.create(originX, originY))                                                                                               //Composite.rotate(composite, rotation, point)复合体旋转
                                                                                                                                                                                                            //@object composite：复合体对象
                                                                                                                                                                                                            //@number rotation：旋转角度
                                                                                                                                                                                                            //@object point：旋转中心，接受一个vector对象。

    Composite.translate(balls, Vector.create(94, -40 * Math.sqrt(3)))                                                                                               //Composite.translate(composite, translation)复合体平移
                                                                                                                                                                                                              //@object composite：复合体对象
                                                                                                                                                                                                              //@object translation：平移方向，接受一个vector对象。

    World.add(engine.world, [ hourglassCompound, balls ])                                                                                                                      //World.add(world, object)将所有的body加入到world中
                                                                                                                                                                                                                //@object world：一个world对象，实例中取值为engine.world（engine中的属性，包含engine中所有物理规则的一个world对象）
                                                                                                                                                                                                                //@object object：可以使一个单独的body/Composite对象，也可以使一个body/Composite对象数组

    Engine.run(engine)                                                                                                                                                                              // 运行engine

    app.flipCanvas = function(){                                                                                                                                                                 //旋转canvas
        const canvas = document.querySelector('canvas')                                                                                                                         //获取canvas
        canvas.classList.toggle('flip')                                                                                                                                                          //让canvas切换flip这个class
        engine.world.gravity.y *= -1                                                                                                                                                               //engine.world.gravity 物理世界中的重力参数
                                                                                                                                                                                                                  //engine.world.gravity.y 物理世界中的重力参数在y轴上的分量，*-1是在canvas调转之后，重力也随之调转
    }
}

app.init()