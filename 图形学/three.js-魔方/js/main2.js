/**
 * Created by he.mingze on 2016/11/18.
 */
$(function (){

    //用来判断是否聚合成了魔方的参数
    var juhe=true,timer1=null,timer2=null;

    function Cubes(){
        this.done=true;
        this.time=0;
        this.clickNum=0;
        this.cubeArr=[];
        this.cubeNum=1;
        this.speed=40;
        this.container=$("#container");
        this.renderer=new THREE.WebGLRenderer({antialias:true});
        this.renderWidth=parseFloat(this.container.css("width"));
        this.renderHeight=parseFloat(this.container.css("height"));
        this.camera = new THREE.PerspectiveCamera(45,this.renderWidth/this.renderHeight,1,5000);
        this.scene = new THREE.Scene();
        this.directionallight = new THREE.DirectionalLight("#fff", 1.0, 0);
    }
    Cubes.prototype.initThree=function (){
        var _this=this;
        _this.renderer.setSize(_this.renderWidth,_this.renderHeight);
        _this.container.append(_this.renderer.domElement);
        _this.renderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0));
        _this.camera.position.set(0,50,100);
        _this.camera.lookAt(_this.scene.position);
        _this.directionallight.position.set( 200, 200, 200 );
        _this.scene.add(_this.directionallight);
        var axes = new THREE.AxisHelper(20);
        _this.scene.add(axes);
    };
    Cubes.prototype.createCubes=function (){
        var _this=this;
        for(var i=0;i<_this.cubeNum;i++){
            _this.cubeArr.push(new magicCube(_this.scene));
            _this.cubeArr[i].createCube();
        }
    };
    Cubes.prototype.update=function (){
        var _this=this;
        _this.createCubes();
        _this.renderer.clear();
        _this.renderer.render(_this.scene,_this.camera);
        // _this.CubesMove();
    };
    function magicCube(scene){
        this.cubeNum=-1;
        this.cubeWidth=5;
        this.dertAngle=0.02*Math.PI;
        this.angle=0;
        this.scene=scene;
        this.rotor="x";
        this.rotateFace=1;
        this.position={x:4,y:0,z:0};
        this.startPos=[];
        this.endPos=[];
        this.movePos=[];
        this.speed=40;
    };
    magicCube.prototype.draw=function (){
        var _this=this;
        _this.angle+=_this.dertAngle;
        if(_this.angle>=2*Math.PI){
            _this.matchFace();
            _this.angle=0;
        }
        _this.rotate();
    };
    magicCube.prototype.matchFace=function (){
        var rotor=this.rotor,face=this.rotateFace;
        Math.random()*3>>0==0?(this.rotor="x"):
            Math.random()*3>>0==1?(this.rotor="y"):
                (this.rotor="z");
        this.rotateFace=(((Math.random()*3)>>0)-1);
        if((this.rotor==rotor)&&(face==this.rotateFace)){
            arguments.callee();
        }
    };
    magicCube.prototype.rotate=function (){
        var _this=this;
        if(this.rotor==="z"){
            for (var i = -1; i < 2; i++) {
                for (var j = -1; j < 2; j++) {
                    var cube=_this.scene.getObjectByName("cube"+_this.cubeNum+i+j+_this.rotateFace);
                    cube.translateX(-1*i*_this.cubeWidth);
                    cube.translateY(-1*j*_this.cubeWidth);
                    cube.rotation.z=_this.angle;
                    cube.translateX(i*_this.cubeWidth);
                    cube.translateY(j*_this.cubeWidth);
                }
            }
        }
        if(this.rotor==="x"){
            for (var i = -1; i < 2; i++) {
                for (var j = -1; j < 2; j++) {
                    var cube=_this.scene.getObjectByName("cube"+_this.cubeNum+_this.rotateFace+i+j);
                    cube.translateZ(-1*j*_this.cubeWidth);
                    cube.translateY(-1*i*_this.cubeWidth);
                    cube.rotation.x=_this.angle;
                    cube.translateZ(j*_this.cubeWidth);
                    cube.translateY(i*_this.cubeWidth);
                }
            }
        }
        if(this.rotor==="y"){
            for (var i = -1; i < 2; i++) {
                for (var j = -1; j < 2; j++) {
                    var cube=_this.scene.getObjectByName("cube"+_this.cubeNum+i+_this.rotateFace+j);
                    cube.translateX(-1*i*_this.cubeWidth);
                    cube.translateZ(-1*j*_this.cubeWidth);
                    cube.rotation.y=_this.angle;
                    cube.translateX(i*_this.cubeWidth);
                    cube.translateZ(j*_this.cubeWidth);
                }
            }
        }
    };
    magicCube.prototype.createCube=function (){
        var _this=this;
        _this.cubeNum++;
        for (var x =_this.position.x,nameX=-1; x < _this.position.x+3; x++,nameX++) {
            for (var y =_this.position.y,nameY=-1; y < _this.position.y+3; y++,nameY++) {
                for (var z =_this.position.z,nameZ=-1; z < _this.position.z+3; z++,nameZ++) {

                    var moveX=Math.round((Math.random()-Math.random())*25);
                    var moveY=Math.round((Math.random()-Math.random())*25);
                    var moveZ=Math.round((Math.random()-Math.random())*25);

                    var cube=new THREE.Mesh(_this.createGeometry(),_this.createMaterial());
                    cube.position.set((x+moveX) * _this.cubeWidth - _this.cubeWidth, (y+moveY) * _this.cubeWidth, (z+moveZ) * _this.cubeWidth - _this.cubeWidth);
                    cube.name="cube"+_this.cubeNum+nameX+nameY+nameZ;
                    _this.scene.add(cube);

                    _this.endPos.push([x * _this.cubeWidth - _this.cubeWidth, y * _this.cubeWidth, z * _this.cubeWidth - _this.cubeWidth,cube.name]);
                    _this.startPos.push([(x+moveX) * _this.cubeWidth - _this.cubeWidth, (y+moveY) * _this.cubeWidth, (z+moveZ) * _this.cubeWidth - _this.cubeWidth,cube.name]);

                }
            }
        }


        for (var i = 0; i < _this.startPos.length; i++) {
            var xChange=((_this.startPos[i][0])-(_this.endPos[i][0]))/(_this.speed);
            var yChange=((_this.startPos[i][1])-(_this.endPos[i][1]))/(_this.speed);
            var zChange=((_this.startPos[i][2])-(_this.endPos[i][2]))/(_this.speed);

            _this.movePos.push([xChange,yChange,zChange]);
        };
    };

    magicCube.prototype.changePosBack=function (){
        var _this=this;
        _this.startPos=[];
        _this.movePos=[];
        for (var i = 0; i < _this.endPos.length; i++) {
            var xChangeNew= _this.cubeWidth*(Math.round((Math.random()-Math.random())*25));
            var yChangeNew= _this.cubeWidth*(Math.round((Math.random()-Math.random())*25));
            var zChangeNew= _this.cubeWidth*(Math.round((Math.random()-Math.random())*25));

            var xStartNew=_this.endPos[i][0]+xChangeNew;
            var yStartNew=_this.endPos[i][1]+yChangeNew;
            var zStartNew=_this.endPos[i][2]+zChangeNew;

            _this.startPos.push([xStartNew,yStartNew,zStartNew]);

            var xChange=xChangeNew/(_this.speed);
            var yChange=yChangeNew/(_this.speed);
            var zChange=zChangeNew/(_this.speed);

            _this.movePos.push([xChange,yChange,zChange]);
        };
    };

    Cubes.prototype.CubesMoveBack=function (){
        var _this=this;

        cancelAnimationFrame(timer2);
        for(var i= 0,len=_this.cubeArr.length;i<len;i++){
            _this.cubeArr[i].changePosBack();
        }
        $('#container').attr('clickable','false');
        go2();
        function go2(){
            if(!_this.done){
                goChangePos2();
            }
            timer2=requestAnimationFrame(arguments.callee);
        }
        function goChangePos2(){
            _this.renderer.clear();
            for(var i= 0,len=_this.cubeArr.length;i<len;i++){
                _this.cubeArr[i].changePos();
            }
            _this.renderer.render(_this.scene,_this.camera);
            _this.time++;
            if(_this.time>=_this.speed){
                _this.done=true;
                _this.time=0;
                $('#container').attr('clickable','true');
            }
        }

    };

    magicCube.prototype.pos=function (){
        var _this=this;
        for (var i = 0; i < _this.movePos.length; i++) {
            var cube=_this.scene.getObjectByName( _this.endPos[i][3]);

            var stepX=_this.movePos[i][0];
            var stepY=_this.movePos[i][1];
            var stepZ=_this.movePos[i][2];

            if(juhe){
                cube.translateX(-stepX);
                cube.translateY(-stepY);
                cube.translateZ(-stepZ);
            }else{
                cube.translateX(stepX);
                cube.translateY(stepY);
                cube.translateZ(stepZ);
            }

        };
    };


    magicCube.prototype.changePos=function (){
        var _this=this;
        _this.pos();
    };
    Cubes.prototype.CubesMove=function (){
        var _this=this;
        $('#container').attr('clickable','false');
        cancelAnimationFrame(timer1);
        go();
        function go(){
            if(_this.done){
                if(_this.clickNum%2!=0){
                    goRoate();
                }
            }else{
                goChangePos1();
            }
           timer1=requestAnimationFrame(arguments.callee);
        }
        function goChangePos1(){
            _this.renderer.clear();
            for(var i= 0,len=_this.cubeArr.length;i<len;i++){
                _this.cubeArr[i].changePos();
            }

            _this.renderer.render(_this.scene,_this.camera);


            _this.time++;
            // console.log(_this.time)
            if(_this.time>=_this.speed){
                _this.done=true;
                _this.time=0;
                $('#container').attr('clickable','true');
            }
        }
        function goRoate(){
            _this.renderer.clear();
            for(var i= 0,len=_this.cubeArr.length;i<len;i++){
                _this.cubeArr[i].draw();
            }
            _this.renderer.render(_this.scene,_this.camera);
        }
    };
    magicCube.prototype.createGeometry=function (){
        var _this=this,geometry;
        geometry =new THREE.CubeGeometry(_this.cubeWidth-0.1,_this.cubeWidth-0.1,_this.cubeWidth-0.1);
        return geometry;
    };
    magicCube.prototype.createMaterial=function (){
        var _this=this,meshMaterial;
        var mats = [];
        mats.push(new THREE.MeshBasicMaterial({color: 0x009e60}));
        mats.push(new THREE.MeshBasicMaterial({color: 0x009e60}));
        mats.push(new THREE.MeshBasicMaterial({color: 0x0051ba}));
        mats.push(new THREE.MeshBasicMaterial({color: 0x0051ba}));
        mats.push(new THREE.MeshBasicMaterial({color: 0xffd500}));
        mats.push(new THREE.MeshBasicMaterial({color: 0xffd500}));
        mats.push(new THREE.MeshBasicMaterial({color: 0xff5800}));
        mats.push(new THREE.MeshBasicMaterial({color: 0xff5800}));
        mats.push(new THREE.MeshBasicMaterial({color: 0xC41E3A}));
        mats.push(new THREE.MeshBasicMaterial({color: 0xC41E3A}));
        mats.push(new THREE.MeshBasicMaterial({color: 0xffffff}));
        mats.push(new THREE.MeshBasicMaterial({color: 0xffffff}));
        meshMaterial = new THREE.MeshFaceMaterial(mats);
        return meshMaterial;
    };
    var magicCubes=new Cubes();
    magicCubes.initThree();
    magicCubes.update();

    $('#container').attr('clickable','true');
    $('#container').on('click',function(){
        var clickable=$(this).attr('clickable');

        if(clickable==='true'){
            magicCubes.done=false;
            magicCubes.clickNum++;
            var clickNum=magicCubes.clickNum;
            if(clickNum%2!=0){
                juhe=true;
                magicCubes.CubesMove();
            }else{
                juhe=false;
                magicCubes.CubesMoveBack();
            }
        }
    })
});


