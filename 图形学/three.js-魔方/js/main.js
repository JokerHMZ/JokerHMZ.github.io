/**
 * Created by he.mingze on 2016/11/18.
 */
window.onload=function (){
    function World(){
        this.starCloud=null;
        this.cubeArr=[];
        this.cubeNum=1;
        this.container=$("#container");
        this.renderer=new THREE.WebGLRenderer({antialias:true});
        this.renderWidth=parseFloat(this.container.css("width"));
        this.renderHeight=parseFloat(this.container.css("height"));
        this.camera = new THREE.PerspectiveCamera(45,this.renderWidth/this.renderHeight,1,5000);
        this.scene = new THREE.Scene();
        this.directionallight = new THREE.DirectionalLight("#fff", 1.0, 0);
        this.Tween=new TimelineMax({});
    }
    World.prototype.init=function (){
        var _this=this;
        _this.initThree();
        _this.createStars();
        _this.createCubes();
        _this.update();
    };
    World.prototype.initThree=function (){
        var _this=this;
        _this.renderer.setSize(_this.renderWidth,_this.renderHeight);
        _this.container.append(_this.renderer.domElement);
        _this.renderer.setClearColor(new THREE.Color("#000",1.0));
        _this.camera.position.set(0,50,100);
        _this.camera.lookAt(_this.scene.position);
        _this.directionallight.position.set( 0, 500, 500 );
        _this.directionallight.intensity=0.7;
        _this.scene.add(_this.directionallight);
        //var axes = new THREE.AxisHelper(20);
        //_this.scene.add(axes);
    };
    World.prototype.createCubes=function (){
        var _this=this;
        _this.cubeNum>6&&(_this.cubeNum=6);
        _this.cubeNum<1&&(_this.cubeNum=1);
        var positions=_this.cubeNum==1?[{x:0,y:0,z:0}]:
            _this.cubeNum==2?[{x:-5,y:0,z:0},{x:5,y:0,z:0}]:
            _this.cubeNum==3?[{x:-7,y:0,z:0},{x:0,y:0,z:0},{x:7,y:0,z:0}]:
            _this.cubeNum==4?[{x:-5,y:3,z:-2},{x:5,y:3,z:-2},{x:-5,y:-3,z:2},{x:5,y:-3,z:2}]:
            _this.cubeNum==5?[{x:-7,y:3,z:-2},{x:0,y:3,z:-2},{x:7,y:3,z:-2},{x:-5,y:-3,z:2},{x:5,y:-3,z:2}]:
            [{x:-7,y:3,z:-2},{x:0,y:3,z:-2},{x:7,y:3,z:-2},{x:-7,y:-3,z:2},{x:0,y:-3,z:2},{x:7,y:-3,z:2}];
        for(var i=0;i<_this.cubeNum;i++){
            _this.cubeArr.push(new magicCube(_this.scene,_this.Tween,positions[i],i));
            _this.cubeArr[i].createCube();
            _this.cubeArr[i].createPointLight();
        }
    };
    World.prototype.createStars=function (){
        var _this=this;
        _this.starCloud=new Star(_this.scene,_this.Tween);
        _this.starCloud.createStar();
    };
    World.prototype.update=function (){
        var _this=this;
        function reDraw(){
            _this.renderer.clear();
            _this.starCloud.show();
            for(var i= 0,len=_this.cubeArr.length;i<len;i++){
                _this.cubeArr[i].draw();
            }
            _this.renderer.render(_this.scene,_this.camera);
            requestAnimationFrame(arguments.callee);
        }
        reDraw();
    };

    function magicCube(scene,tween,position,cubeNum){
        this.imgArr=[
            "../img/try.jpg"
        ];
        this.imgLen=this.imgArr.length;
        this.imgUrlChoose=0;
        this.tween=tween;
        this.cubeNum=cubeNum;
        this.cubeWidth=5;
        this.dertAngle=0.01*Math.PI;
        this.angle=0;
        this.scene=scene;
        this.rotor="x";
        this.rotateFace=1;
        //this.rotateCubes=[];
        this.position=position;//{x:-4,y:0,z:0};
        this.centerX=this.position.x * this.cubeWidth - this.cubeWidth+this.cubeWidth;
        this.centerY=this.position.y * this.cubeWidth+this.cubeWidth;
        this.centerZ=this.position.z * this.cubeWidth - this.cubeWidth+this.cubeWidth;
        this.group=new THREE.Object3D();
        scene.add(this.group);
    }
    magicCube.prototype.draw=function (){
        var _this=this;
        _this.angle+=_this.dertAngle;
        if(_this.angle>=2*Math.PI){
            _this.matchFace();
            //_this.otherFacePop();
            _this.angle=0;
            //for(var i= 0,len=_this.rotateCubes.length;i<len;i++){
            //    _this.rotateCubes[i].material=_this.createMaterial();
            //}
        }
        //_this.rotateCubes.length=0;
        _this.rotate();
    };
    magicCube.prototype.otherFacePop=function (){
        var faces=[-1,0,1],otherFace=[];
        for(var i=0;i<faces.length;i++){
            faces[i]!==this.rotateFace&&otherFace.push(faces[i]);
        }
        for(var i=0;i<otherFace.length;i++){

        }
    };
    magicCube.prototype.matchFace=function (){
        var _this=this;
        var rotor=this.rotor,face=this.rotateFace;
        Math.random()*3>>0==0 ? (this.rotor="x"):
        Math.random()*3>>0==1 ? (this.rotor="y"):
                                 (this.rotor="z");
        this.rotateFace=(Math.random()*3-1)>>0;
        if((this.rotor==rotor)&&(face==this.rotateFace)){
            _this.matchFace();
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
                    //_this.rotateCubes.push(cube);
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
                    //_this.rotateCubes.push(cube);
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
                    //_this.rotateCubes.push(cube);
                }
            }
        }
        _this.group.translateY(_this.centerY);
        _this.group.translateX(_this.centerX);
        _this.group.translateZ(_this.centerZ);
        _this.group.rotation.x+=0.005;
        _this.group.rotation.y+=0.005;
        _this.group.rotation.z+=0.005;
        _this.group.translateY(-_this.centerY);
        _this.group.translateX(-_this.centerX);
        _this.group.translateZ(-_this.centerZ);
    };
    magicCube.prototype.createCube=function (){
        var _this=this;
        for (var x =_this.position.x; x < _this.position.x+3; x++) {
            for (var y =_this.position.y; y < _this.position.y+3; y++) {
                for (var z =_this.position.z; z < _this.position.z+3; z++) {
                    var cube=new THREE.Mesh(_this.createGeometry(),_this.createMaterial());
                    cube.position.set(x * _this.cubeWidth - _this.cubeWidth, y * _this.cubeWidth, z * _this.cubeWidth - _this.cubeWidth);
                    var nameX=(cube.position.x-this.centerX)/_this.cubeWidth,
                        nameY=(cube.position.y-this.centerY)/_this.cubeWidth,
                        nameZ=(cube.position.z-this.centerZ)/_this.cubeWidth,
                        materialSides={opacity:0.8,color:new THREE.Color("#111",1.0)},
                        materialMid={opacity:0.5,color:new THREE.Color("#111",1.0)};
                    cube.name="cube"+_this.cubeNum+nameX+nameY+nameZ;
                    _this.pasteHuman(cube,nameX,nameY,nameZ,materialSides,materialMid);
                    _this.UV(cube.geometry.faceVertexUvs[0],nameX,nameY,nameZ);
                    _this.group.add(cube);
                }
            }
        }
        _this.scene.getObjectByName("cube"+_this.cubeNum+"000").visible=false;
    };
    magicCube.prototype.createGeometry=function (){
        var _this=this,geometry,gap=0.5;
        geometry =new THREE.CubeGeometry(_this.cubeWidth-gap,_this.cubeWidth-gap,_this.cubeWidth-gap);
        return geometry;
    };
    magicCube.prototype.createMaterial=function (){
        var _this=this,meshMaterial,mats=[];
        for(var i=0;i<6;i++){
            mats.push(new THREE.MeshPhongMaterial());
            mats[i].transparent=true;
        }
        meshMaterial = new THREE.MeshFaceMaterial(mats);
        return meshMaterial;
    };
    magicCube.prototype.UV=function (UV,nameX,nameY,nameZ){
        UV[8][0].x=0;
        UV[8][0].y=1;
        UV[8][1].x=0;
        UV[8][1].y=0.7;
        UV[8][2].x=0.3;
        UV[8][2].y=1;

        UV[9][0].x=0;
        UV[9][0].y=0.7;
        UV[9][1].x=0.3;
        UV[9][1].y=0.7;
        UV[9][2].x=0.3;
        UV[9][2].y=1;
    };
    magicCube.prototype.pasteHuman=function (cube,nameX,nameY,nameZ,materialSides,materialMid){
        var _this=this;
        function pasteHuman(material){
            _this.imgUrlChoose=0;
            var texture=THREE.ImageUtils.loadTexture(_this.imgArr[_this.imgUrlChoose]);
            material.map=texture;
        }
        if(nameX==1){
            cube.material.materials[1].opacity=materialSides.opacity;
            cube.material.materials[1].color=materialSides.color;
            pasteHuman(cube.material.materials[0]);
        }else if(nameX==-1){
            pasteHuman(cube.material.materials[1]);
            cube.material.materials[0].opacity=materialSides.opacity;
            cube.material.materials[0].color=materialSides.color;
        }else{
            cube.material.materials[0].opacity=materialMid.opacity;
            cube.material.materials[0].color=materialMid.color;
            cube.material.materials[1].opacity=materialMid.opacity;
            cube.material.materials[1].color=materialMid.color;
        }
        if(nameY==1){
            pasteHuman(cube.material.materials[2]);
            cube.material.materials[3].opacity=materialSides.opacity;
            cube.material.materials[3].color=materialSides.color;
        }else if(nameY==-1){
            pasteHuman(cube.material.materials[3]);
            cube.material.materials[2].opacity=materialSides.opacity;
            cube.material.materials[2].color=materialSides.color;
        }else{
            cube.material.materials[2].opacity=materialMid.opacity;
            cube.material.materials[2].color=materialMid.color;
            cube.material.materials[3].opacity=materialMid.opacity;
            cube.material.materials[3].color=materialMid.color;
        }
        if(nameZ==1){
            pasteHuman(cube.material.materials[4]);
            cube.material.materials[5].opacity=materialSides.opacity;
            cube.material.materials[5].color=materialSides.color;
        }else if(nameZ==-1){
            pasteHuman(cube.material.materials[5]);
            cube.material.materials[4].opacity=materialSides.opacity;
            cube.material.materials[4].color=materialSides.color;
        }else{
            cube.material.materials[4].opacity=materialMid.opacity;
            cube.material.materials[4].color=materialMid.color;
            cube.material.materials[5].opacity=materialMid.opacity;
            cube.material.materials[5].color=materialMid.color;
        }
    };
    magicCube.prototype.createPointLight=function (){
        var lightColor="#0ff",pointLight=new THREE.PointLight(lightColor);
            pointLight.distance=this.cubeWidth*4;
            pointLight.intensity=1000;
            this.scene.add(pointLight);
        pointLight.position.set(this.centerX,this.centerY,this.centerZ);
    };

    function Star(scene,tween){
        this.step=0.0003;
        this.system=null;
        this.scene=scene;
        this.tween=tween;
        this.canMove=false;
        this.canFlicker=false;
        this.vertives=null;
        this.starCounts=8000;
        this.choosedMoveStar=0;
        this.choosedFlickerStar=0;
        this.moveXStep=0;
        this.moveYStep=0;
        this.flickerStep=0;
        this.moveStepNum=0;
        this.moveSteps=0;
        this.flickerStepNum=0;
        this.flickerSteps=0;
        this.moveStepSize=0;
        this.flickerStepSize=0;
    }
    Star.prototype.createStar=function (){
        var material=new THREE.PointsMaterial({size: 1, vertexColors: true, color: 0xffffff}),
            geom= new THREE.Geometry(),
            _this=this,
            range = 500;
        for (var i = 0; i < this.starCounts; i++) {
            var particle = new THREE.Vector3(Math.random() * range - range / 2, Math.random() * range - range / 2, -Math.random() * range),
                color = new THREE.Color("#0ff");
            geom.vertices.push(particle);
            color.setHSL(color.getHSL().h, color.getHSL().s, Math.random() * color.getHSL().l);
            geom.colors.push(color);
        }
        _this.system=new THREE.Points(geom,material);
        _this.vertives=_this.system.geometry.vertices;
        _this.scene.add(_this.system);
    };
    Star.prototype.rotate=function (){
        this.system.rotation.z-=this.step;
    };
    Star.prototype.move=function (){
        if(this.canMove){
            if(this.moveStepNum<=this.moveSteps){
                this.vertives[this.choosedMoveStar].x+=this.moveXStep;
                this.vertives[this.choosedMoveStar].y+=this.moveYStep;
                this.moveStepNum+=this.moveStepSize;
                this.moveYStep-=10;
            }else{
                this.moveStepNum=0;
                this.moveSteps=0;
                this.canMove=false;
                this.choosedMoveStar=0;
                this.moveXStep=0;
                this.moveYStep=0;
                this.moveStepSize=0;
            }
        }else{
            if(Math.random()*10>>0==5){console.log(1);
                this.canMove=true;
                this.choosedMoveStar=((Math.random()*2000-1000)>>0)+this.starCounts/2;
                this.moveXStep=-100;//(Math.random()*100 - 50)>>0;
                this.moveYStep=-100;//(Math.random()*100 - 50)>>0;
                this.moveSteps=(Math.random()*1000+1000)>>0;
                this.moveStepSize=(Math.random()*3+1)>>0;
                console.log(this.vertives[this.choosedMoveStar]);
            }
        }
    };
    Star.prototype.flicker=function (){
        if(this.canFlicker){
            if(this.flickerStepNum<=this.flickerSteps){
                if(this.flickerStepNum<=(this.flickerSteps/2)){
                    this.vertives[this.choosedFlickerStar].z+=this.flickerStep;
                    this.flickerStep++;
                }else{
                    this.vertives[this.choosedFlickerStar].z-=this.flickerStep;
                    this.flickerStep--;
                }
                this.flickerStepNum+=this.flickerStepSize;
            }else{
                this.flickerStepNum=0;
                this.flickerSteps=0;
                this.canFlicker=false;
                this.choosedFlickerStar=0;
                this.flickerStep=0;
                this.flickerStepSize=0;
            }
        }else{
            if(Math.random()*100>>0==5){
                this.canFlicker=true;
                this.choosedFlickerStar=Math.random()*this.starCounts>>0;
                this.flickerStep=(Math.random()*10 - 5)>>0;
                this.flickerSteps=(Math.random()*200+100)>>0;
                this.flickerStepSize=(Math.random()*3+1)>>0;
            }
        }
    };
    Star.prototype.show=function (){
        this.rotate();
        //this.move();
        //this.flicker();
    };
    var world=new World();
    world.init();
};


