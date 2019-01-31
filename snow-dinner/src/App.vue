<template>
  <div id="app">
    <logo></logo>
    <transition name="fade">
      <loading v-show="loadingShow"  @loading="begin($event)"></loading>
    </transition>
    <transition name="fade">
      <div class="sharePage" @click="hideSharePage"  v-show="show.sharePage">
        <div class="sharePage-txt"></div>
      </div>
    </transition>
    <transition name="fade">
      <div v-show="show.main"  class="page main">
        <div class="title-txt"></div>
        <div class="title-txt2"></div>
        <div class="title-txt3"></div>
      </div>
    </transition>
    <transition name="fade">
      <div v-show="show.info" class="page info-box">
        <input @focus="_hmt.push(['_trackEvent', 'focus', 'name']);" @blur="windowToTop" placeholder="请输入姓名" type="text" id="uname" class="name" v-model="info.uname">
        <select @focus="_hmt.push(['_trackEvent', 'focus', 'home']);" @blur="windowToTop" name="home" id="home" class="home" v-model="info.uhome">
          <option value="">请选择</option>
          <option value="北京">北京</option>
          <option value="天津">天津</option>
          <option value="上海">上海</option>
          <option value="重庆">重庆</option>
          <option value="河北">河北</option>
          <option value="山西">山西</option>
          <option value="辽宁">辽宁</option>
          <option value="吉林">吉林</option>
          <option value="黑龙江">黑龙江</option>
          <option value="江苏">江苏</option>
          <option value="浙江">浙江</option>
          <option value="安徽">安徽</option>
          <option value="福建">福建</option>
          <option value="江西">江西</option>
          <option value="山东">山东</option>
          <option value="河南">河南</option>
          <option value="湖北">湖北</option>
          <option value="广东">广东</option>
          <option value="海南">海南</option>
          <option value="四川">四川</option>
          <option value="贵州">贵州</option>
          <option value="云南">云南</option>
          <option value="陕西">陕西</option>
          <option value="甘肃">甘肃</option>
          <option value="台湾">台湾</option>
          <option value="内蒙古">内蒙古</option>
          <option value="广西">广西</option>
          <option value="西藏">西藏</option>
          <option value="宁夏">宁夏</option>
          <option value="新疆">新疆</option>
          <option value="香港">香港</option>
          <option value="澳门">澳门</option>
        </select>
        <select @focus="_hmt.push(['_trackEvent', 'focus', 'people']);" @blur="windowToTop" name="people" id="people" class="people" v-model="info.upoeple">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
    </transition>
    <transition name="fade">
      <div v-show="show.menu" class="page menu-box">
        <div class="menu">
          <div class="menu-list"  id="menuList">
            <div>
              <div class="menu-item menu-item1">
                <div class="menu-item-title"></div>
                <div class="fl menu-item-dish menu-item-dish1">
                  <input id="dish11" type="radio" name="fish" value="清蒸鱼"  v-model="meunData.fish">
                  <label for="dish11" @click="_hmt.push(['_trackEvent', 'select', 'fish1']);">
                    <div class="menu-show"></div>
                  </label>
                </div>
                <div class="fl menu-item-dish menu-item-dish2">
                  <input id="dish12" type="radio" name="fish" value="糖醋鲤鱼" v-model="meunData.fish">
                  <label for="dish12" @click="_hmt.push(['_trackEvent', 'select', 'fish2']);">
                    <div class="menu-show"></div>
                  </label>
                </div>
              </div>
              <div class="menu-item  menu-item2">
                <div class="menu-item-title"></div>
                <div class="fl menu-item-dish menu-item-dish1">
                  <input id="dish21" type="radio" name="chicken" value="口水鸡" v-model="meunData.chicken">
                  <label for="dish21" @click="_hmt.push(['_trackEvent', 'select', 'chicken1']);">
                    <div class="menu-show"></div>
                  </label>
                </div>
                <div class="fl menu-item-dish menu-item-dish2">
                  <input id="dish22" type="radio" name="chicken" value="糯米八宝鸡" v-model="meunData.chicken">
                  <label for="dish22" @click="_hmt.push(['_trackEvent', 'select', 'chicken2']);">
                    <div class="menu-show"></div>
                  </label>
                </div>
              </div>
              <div class="menu-item  menu-item3">
                <div class="menu-item-title"></div>
                <div class="fl menu-item-dish menu-item-dish1">
                  <input id="dish31" type="radio" name="cake" value="桂花年糕" v-model="meunData.cake">
                  <label for="dish31" @click="_hmt.push(['_trackEvent', 'select', 'cake1']);">
                    <div class="menu-show"></div>
                  </label>
                </div>
                <div class="fl menu-item-dish menu-item-dish2">
                  <input id="dish32" type="radio" name="cake" value="南瓜红枣发糕" v-model="meunData.cake">
                  <label for="dish32" @click="_hmt.push(['_trackEvent', 'select', 'cake2']);">
                    <div class="menu-show"></div>
                  </label>
                </div>
              </div>
              <div class="menu-item  menu-item4">
                <div class="menu-item-title"></div>
                <div class="fl menu-item-dish menu-item-dish1">
                  <input id="dish41" type="radio" name="steam" value="粉蒸肉" v-model="meunData.steam">
                  <label for="dish41" @click="_hmt.push(['_trackEvent', 'select', 'steam1']);">
                    <div class="menu-show"></div>
                  </label>
                </div>
                <div class="fl menu-item-dish menu-item-dish2">
                  <input id="dish42" type="radio" name="steam" value="蒜蓉蒸扇贝" v-model="meunData.steam">
                  <label for="dish42" @click="_hmt.push(['_trackEvent', 'select', 'steam2']);">
                    <div class="menu-show"></div>
                  </label>
                </div>
              </div>
              <div class="menu-item  menu-item5">
                <div class="menu-item-title"></div>
                <div class="fl menu-item-dish menu-item-dish1">
                  <input id="dish51" type="radio" name="circle" value="四喜丸子" v-model="meunData.circle">
                  <label for="dish51" @click="_hmt.push(['_trackEvent', 'select', 'circle1']);">
                    <div class="menu-show"></div>
                  </label>
                </div>
                <div class="fl menu-item-dish menu-item-dish2">
                  <input id="dish52" type="radio" name="circle" value="荷香珍珠丸" v-model="meunData.circle">
                  <label for="dish52" @click="_hmt.push(['_trackEvent', 'select', 'circle2']);">
                    <div class="menu-show"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <menuScroll></menuScroll>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div v-show="show.family" class="page family-box">
        <div class="family-close" @click="closePeople('family','finish');_hmt.push(['_trackEvent', 'click', 'familyClose'])"></div>
        <div class="family">
          <div class="family-list"  id="familyList">
            <div class="family-list-scroll">
              <div v-for="(item,index) in familyData"  class="family-item" :class="{select:item.select}" @click="selectPeople(item);_hmt.push(['_trackEvent', 'select', 'family'])">
                <div :style="item.bg" class="family-item-head"></div>
              </div>
            </div>
          </div>
          <headScroll></headScroll>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div v-show="show.finish"  class="page finish">
        <!--<canvas id="testCas" style="position: absolute;left: 0;top:0; z-index: 200000;opacity: 0.3;background: red"></canvas>-->
        <img :src="finialImg" v-show="show.finialImg">
        <div class="title-box">
          <div class="title-txt"></div>
          <transition name="fade">
            <div class="title-solgan" :style="solganImg" v-show="show.solgan"></div>
          </transition>
        </div>
        <div  class="table-box">
          <div class="beer"></div>
          <div class="table"></div>
          <div class="chair chair1" v-show="chairShow[0]">
            <div class="seatMen" :style="seatPeople.id1"></div>
          </div>
          <div class="chair chair2" v-show="chairShow[1]">
            <div class="seatMen" :style="seatPeople.id2" ></div>
          </div>
          <div class="chair chair3" v-show="chairShow[2]">
            <div class="seatMen" :style="seatPeople.id3"></div>
          </div>
          <div class="chair chair4" v-show="chairShow[3]">
            <div class="seatMen" :style="seatPeople.id4"></div>
          </div>
          <div class="chair chair5" v-show="chairShow[4]">
            <div class="seatMen" :style="seatPeople.id5"></div>
          </div>
          <div class="seatBtn seatBtn1" v-show="chairShow[0]" :class="{hide:seatBtnHide[0],haveSeat:seatBtnHide[0]}" @click="selectFamily(1);_hmt.push(['_trackEvent', 'click', 'seat'])"></div>
          <div class="seatBtn seatBtn2" v-show="chairShow[1]" :class="{hide:seatBtnHide[1],haveSeat:seatBtnHide[1]}" @click="selectFamily(2);_hmt.push(['_trackEvent', 'click', 'seat'])"></div>

          <div class="seatBtn seatBtn4" v-show="chairShow[3]" :class="{hide:seatBtnHide[3],haveSeat:seatBtnHide[3]}" @click="selectFamily(4);_hmt.push(['_trackEvent', 'click', 'seat'])"></div>
          <div class="seatBtn seatBtn3" v-show="chairShow[2]" :class="{hide:seatBtnHide[2],haveSeat:seatBtnHide[2]}" @click="selectFamily(3);_hmt.push(['_trackEvent', 'click', 'seat'])"></div>
          <div class="seatBtn seatBtn5" v-show="chairShow[4]" :class="{hide:seatBtnHide[4],haveSeat:seatBtnHide[4]}" @click="selectFamily(5);_hmt.push(['_trackEvent', 'click', 'seat'])"></div>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div v-show="show.wait" class="wait">
        <div>
          <svg version="1.1" id="L7" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">
				<path fill="#fff" d="M31.6,3.5C5.9,13.6-6.6,42.7,3.5,68.4c10.1,25.7,39.2,38.3,64.9,28.1l-3.1-7.9c-21.3,8.4-45.4-2-53.8-23.3 c-8.4-21.3,2-45.4,23.3-53.8L31.6,3.5z">
					<animateTransform
						attributeName="transform"
						attributeType="XML"
						type="rotate"
						dur="2s"
						from="0 50 50"
						to="360 50 50"
						repeatCount="indefinite"
					/>
				</path>
				<path fill="#fff" d="M42.3,39.6c5.7-4.3,13.9-3.1,18.1,2.7c4.3,5.7,3.1,13.9-2.7,18.1l4.1,5.5c8.8-6.5,10.6-19,4.1-27.7 c-6.5-8.8-19-10.6-27.7-4.1L42.3,39.6z">
					<animateTransform
						attributeName="transform"
						attributeType="XML"
						type="rotate"
						dur="1s"
						from="0 50 50"
						to="-360 50 50"
						repeatCount="indefinite"
					/>
				</path>
				<path fill="#fff" d="M82,35.7C74.1,18,53.4,10.1,35.7,18S10.1,46.6,18,64.3l7.6-3.4c-6-13.5,0-29.3,13.5-35.3s29.3,0,35.3,13.5 L82,35.7z">
					<animateTransform
						attributeName="transform"
						attributeType="XML"
						type="rotate"
						dur="2s"
						from="0 50 50"
						to="360 50 50"
						repeatCount="indefinite"
					/>
				</path>
			</svg>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div v-show="btnBoxShow" class="btn-box">
        <transition name="fade">
          <div v-show="show.main" @click="changePage('main','info');_hmt.push(['_trackEvent', 'click', 'mainBtn']);" class="btn btn-main"></div>
        </transition>
        <transition name="fade">
          <div v-show="show.info" @click="getInfo();_hmt.push(['_trackEvent', 'click', 'infoBtn']);"  class="btn btn-info"></div>
        </transition>
        <transition name="fade">
          <div v-show="show.menu" @click="getMenu();_hmt.push(['_trackEvent', 'click', 'meunBtn'])" class="btn btn-menu"></div>
        </transition>
        <transition name="fade">
          <div v-show="show.finishBtn" @click="goDinner();_hmt.push(['_trackEvent', 'click', 'dinnerBtn']);" class="btn btn-finish"></div>
        </transition>
        <transition name="fade">
          <div>
            <div v-show="show.lastPageBtn" class="btn btn-saveIimgAlert"></div>
            <div v-show="show.lastPageBtn"  @click="rePlay();_hmt.push(['_trackEvent', 'click', 'replayBtn']);" class="btn btn-replay"></div>
            <div v-show="show.lastPageBtn" class="btn btn-link">
              <a @click="_hmt.push(['_trackEvent', 'click', 'linkBtn'])" href="https://wqitem.jd.com/item/view?sku=37673276275" style="width: 100%;height: 100%;display:inline-block"></a>
            </div>
            <div v-show="show.lastPageBtn" @click="showSharePage();_hmt.push(['_trackEvent', 'click', 'shareBtn']);" class="btn btn-share"></div>
          </div>
        </transition>
      </div>
    </transition>
  </div>
</template>

<script>
import IScroll from 'iscroll'
import logo from './components/logo'
import menuScroll from './components/menuScroll'
import headScroll from './components/headScroll'
import loading from  './components/loading'
import axios from 'axios'

var menuIscroll=null;
var familyIscroll=null;

export default {
  name: 'App',
  components: {
    logo,menuScroll,headScroll,loading
  },
  data(){
    return {

      isiOS : !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
      _hmt:[],
      finialImg:require('./assets/img/people/grandpa-left.png'),
      solganImg: {backgroundImage:'url('+require('./assets/img/solgan.png')+')'},
      seatImg:{
        noBody:{background:'transparent'},
        grandpaLeft:{background:`url(${require('./assets/img/people/grandpa-left.png')}) no-repeat`},
        grandpaRight:{background:`url(${require('./assets/img/people/grandpa-right.png')}) no-repeat`},
        grandmaLeft:{background:`url(${require('./assets/img/people/grandma-left.png')}) no-repeat`},
        grandmaRight:{background:`url(${require('./assets/img/people/grandma-right.png')}) no-repeat`},
        fatherRight:{background:`url(${require('./assets/img/people/pa-right.png')}) no-repeat`},
        fatherLeft:{background:`url(${require('./assets/img/people/pa-left.png')}) no-repeat`},
        matherRight:{background:`url(${require('./assets/img/people/ma-right.png')}) no-repeat`},
        matherLeft:{background:`url(${require('./assets/img/people/ma-left.png')}) no-repeat`},
        boyRight:{background:`url(${require('./assets/img/people/boy-right.png')}) no-repeat`},
        boyLeft:{background:`url(${require('./assets/img/people/boy-left.png')}) no-repeat`},
        girlRight:{background:`url(${require('./assets/img/people/girl-right.png')}) no-repeat`},
        girlLeft:{background:`url(${require('./assets/img/people/girl-left.png')}) no-repeat`},
        childBoyRight:{background:`url(${require('./assets/img/people/child-boy-right.png')}) no-repeat`},
        childBoyLeft:{background:`url(${require('./assets/img/people/child-boy-left.png')}) no-repeat`},
        childGirlRight:{background:`url(${require('./assets/img/people/child-girl-right.png')}) no-repeat`},
        childGirlLeft:{background:`url(${require('./assets/img/people/child-girl-left.png')}) no-repeat`},
      },
      seat:{
        id:-1,
        people:''
      },
      canChooseSeat:true,
      lastFamilySelect:null,
      familySeat:['','','','',''],
      familyData:[
        {isOnly:false,select:false,people:'grandpa',bg:{background:`url(${require('./assets/img/head/grandpa.png')}) no-repeat`}},
        {isOnly:false,select:false,people:'girl',bg:{background:`url(${require('./assets/img/head/girl.png')}) no-repeat`}},
        {isOnly:false,select:false,people:'boy',bg:{background:`url(${require('./assets/img/head/boy.png')}) no-repeat`}},
        {isOnly:false,select:false,people:'father',bg:{background:`url(${require('./assets/img/head/father.png')}) no-repeat`}},
        {isOnly:false,select:false,people:'grandma',bg:{background:`url(${require('./assets/img/head/grandma.png')}) no-repeat`}},
        {isOnly:false,select:false,people:'mather',bg:{background:`url(${require('./assets/img/head/mather.png')}) no-repeat`}},
        {isOnly:false,select:false,people:'childBoy',bg:{background:`url(${require('./assets/img/head/child-boy.png')}) no-repeat`}},
        {isOnly:false,select:false,people:'childGirl',bg:{background:`url(${require('./assets/img/head/child-girl.png')}) no-repeat`}},
      ],
      chairShow:[false,true,false,false,false],
      // chairShow:[true,true,true,true,true],
      seatBtnHide:[false,false,false,false,false],
      meunData:{
        fish:'',
        chicken:'',
        cake:'',
        steam:'',
        circle:'',
      },
      loadingShow:true,
      btnBoxShow:false,
      show:{
        main:true,
        info:true,
        menu:true,
        family:true,
        finish:true,
        finishBtn:true,
        solgan:false,
        lastPageBtn:false,
        finialImg:false,
        wait:false,
        sharePage:false
      },
      info:{
        uname:'',
        uhome:'',
        upoeple:'1',
        base64:''
      }
    }
  },
  computed:{
    seatPeople(){
      return {
        id1:this.seatImg.noBody,
        id2:this.seatImg.noBody,
        id3:this.seatImg.noBody,
        id4:this.seatImg.noBody,
        id5:this.seatImg.noBody,
      }
    }
  },
  mounted(){
    this._hmt=_hmt;
    this.share();
    menuIscroll=new IScroll("#menuList", {
        bounce:false,
        click:true,
        preventDefaultException: { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|A)$/ },
        momentum:true,
        speedRatioY:0.1,
        deceleration:0.006,
        scrollbars:'custom',
        resizeScrollbars:false,
        fadeScrollbars:false,
        interactiveScrollbars:true,
    });
    familyIscroll=new IScroll("#familyList", {
      bounce:false,
      click:true,
      preventDefaultException: { tagName: /(INPUT|TEXTAREA|BUTTON|SELECT|A)$/ },
      momentum:true,
      speedRatioY:0.1,
      deceleration:0.006,
      scrollbars:'custom',
      resizeScrollbars:false,
      fadeScrollbars:false,
      interactiveScrollbars:true,
    });
    this.show.info=false;
    this.show.menu=false;
    this.show.family=false;
    this.show.finish=false;
    this.show.finishBtn=false;
    // this.show.main=false;
  },
  methods:{
    windowToTop(){window.scroll(0, 0);},
    begin(data){
      this.loadingShow=data;
      TweenMax.to('.main .title-txt',0.8,{
        // y:0,
        opacity:1,
        delay:0.5,
        ease:Power2.easeInOut
      });
      TweenMax.to('.main .title-txt2',0.8,{
        // y:0,
        opacity:1,
        delay:1,
        ease:Power1.easeInOut
      });
      TweenMax.to('.main .title-txt3',0.8,{
        // y:0,
        opacity:1,
        delay:1.5,
        ease:Power3.easeInOut,
        onComplete:()=>{
          this.btnBoxShow=true
        }
      })
    },
    requestAsync(obj) {
      axios({
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        method:obj.type,
        url:obj.url,//示例
        data: {
          ...obj.data
        },
        transformRequest: [function (data) {
          let ret = '';
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }]
      }).then((res)=>{
        obj.success!==undefined&&obj.success(res);
      }).catch((res)=>{
        obj.error!==undefined&&obj.error(res);
      });
    },
    ajaxSetVoteStatus(data) {
      var _this=this;
      this.requestAsync({
        type:'post',
        url:'http://www.snowbeer.com.cn/2019cny/api/api.php',
        data:data,
        success:function (res) {
          _this.show.finishBtn=false;
          _this.show.solgan=true;
          _this.show.lastPageBtn=true;
          _this.show.finialImg=true;
          _this.finialImg=res.data.img;
          _this.solganImg={backgroundImage:'url('+res.data.imgS+')'};
          _this.show.wait=false;
        }
      });
    },
    share(){
      axios({
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        method:'POST',
        url:'http://www.snowbeer.com.cn/2019cny/api/api.php',
        data: {
          fn: 'wxShare',
          url: window.location.href
          // url:encodeURIComponent(window.location.href.split('#')[0])
        },
        transformRequest: [function (data) {
          let ret = '';
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }]
      }).then((data)=>{
        var share={
          otitle:'匠心年夜饭，即刻开席',// 分享后标题
          desc:'匠心年夜饭，即刻开席',// 分享朋友圈后描述
          descSingle:'年的味道，匠心营造啤酒陪伴',// 分享个人后描述
          olink:window.location.href.split('#')[0],// 分享后B用户打开的地址
          oimgUrlApp:'http://www.snowbeer.com.cn/2019cny/static/img/share.jpg',// 分享给朋友的图片
          oimgUrlTime:'http://www.snowbeer.com.cn/2019cny/static/img/share.jpg',// 分享到朋友圈的图片
        };

        var res = data.data;
        wx.config({
          debug: false,//测试后台签名是否正确
          appId: res.appId,
          timestamp: res.timestamp,
          nonceStr: res.nonceStr,
          signature: res.signature,
          jsApiList: [
            'updateTimelineShareData',
            'updateAppMessageShareData',
            'addCard',
            'onMenuShareTimeline',
            'onMenuShareAppMessage'
          ]
        });
        wx.ready(function (){
          wx.onMenuShareTimeline({
            title: share.desc,
            link: share.olink,
            imgUrl: share.oimgUrlTime,
            success:function(){
              _hmt.push(['_trackEvent', 'share-time', 'success']);
            }
          });
          wx.onMenuShareAppMessage({
            title: share.otitle,
            desc:  share.descSingle,
            link: share.olink,
            imgUrl: share.oimgUrlApp,
            success:function(){
              _hmt.push(['_trackEvent', 'share-app', 'success']);
            }
          });
          wx.updateTimelineShareData({
            title: share.desc,
            link: share.olink,
            imgUrl: share.oimgUrlTime,
            success:function(){
              _hmt.push(['_trackEvent', 'share-time', 'success']);
            }
          });
          wx.updateAppMessageShareData({
            title: share.otitle,
            desc:  share.descSingle,
            link: share.olink,
            imgUrl: share.oimgUrlApp,
            success:function(){
              _hmt.push(['_trackEvent', 'share-app', 'success']);
            }
          });
        })
      });
    },
    showSharePage(){
      this.show.sharePage=true;
    },
    hideSharePage(){
      this.show.sharePage=false;
    },
    changePage(keyOut,keyIn){
      this.show[keyOut]=false;
      this.show[keyIn]=true;
    },
    stringCheck(str){//判断是否含有中英文之外的字符
      if(str==null||str=="") return false;
      // var result=str.match(/^[a-zA-Z0-9\u4e00-\u9fa5-_]+$/);
      var result=str.match(/^[a-zA-Z\u4e00-\u9fa5]+$/);
      if(result==null)return false;
      return true;
    },
    getInfo(){
      if(this.info.uname===''){
        alert('请填写姓名');
      }else if(this.info.uname.length>10){
        alert('您输入的姓名不可超过10个字');
      }else if(!this.stringCheck(this.info.uname)){
        alert('您输入的姓名包含非法字符');
      } else if(this.info.uhome===''){
        alert('请选择家乡');
      }else if(this.info.upoeple===''){
        alert('请选择参加年夜饭人数');
      }else{
        this.changePage('info','menu');
        setTimeout(function () {
          menuIscroll.refresh();
        },500)
      }
    },
    getMenu(){
      var str='';
      for(var key in this.meunData){
        str=this.meunData[key];
        if(str==''){
          alert('请将5道菜全部选择完');
          return;
        }
      }
      this.changePage('menu','finish');
      this.show.finishBtn=true;
    },
    selectFamily(id){
      if(this.canChooseSeat){
        this.seat.id=id;
        this.seat.people='';
        this.changePage('finish','family');
        this.show.finishBtn=false;
        setTimeout(function () {
          familyIscroll.refresh();
        },500)
      }else{
        console.log('canChooseSeat',this.canChooseSeat)
      }

    },
    selectPeople(people){
      var canSelect=true;
      if(people.isOnly){
        for(var i=0,len=this.familySeat.length;i<len;i++){
          if(i!==(this.seat.id-1)){
            if(people.people===this.familySeat[i]){
              canSelect=false;
              break;
            }
          }
        }
      }

      if(canSelect){
        if(this.lastFamilySelect!==null){
          this.lastFamilySelect.select=false
        }
        people.select=true;
        this.seat.people=people.people;
        this.lastFamilySelect=people;
        var position='';
        if(this.seat.id==1||this.seat.id==2){
          position='Right'
        }else{
          position='Left'
        }
        this.seatPeople['id'+this.seat.id]=this.seatImg[this.seat.people+position];
        this.seatBtnHide[this.seat.id-1]=true;
        this.closePeople('family','finish')
      }else{
        alert('您已经选择过该人物了')
      }
    },
    closePeople(keyOut,keyIn){
      if(this.seat.people!==''){
        this.familySeat.splice(this.seat.id-1,1,this.seat.people);
      }
      this.changePage(keyOut,keyIn);
      this.show.finishBtn=true;
    },
    goDinner(){
      var peopleNum=0;
      for(var i=0;i<this.familySeat.length;i++){
        if(this.familySeat[i]!==''){
          peopleNum++
        }
      }
      if(peopleNum<(+this.info.upoeple)){
        alert('请将座位坐满')
      }else{
        this.canChooseSeat=false;
        this.drawFamily();
      }
    },
    loadImg(src){
      return new Promise((resolve, reject) => {
        var img=new Image();
        img.src=src;
        img.onload=function () {
          resolve(img)
        }
      })
    },
    findImg(id,name){
      if(name=='grandpa'){
        if((+id)>2){
          return require('./assets/img/people/grandpa-left.png')
        }else{
          return require('./assets/img/people/grandpa-right.png')
        }
      }
      if(name=='grandma'){
        if((+id)>2){
          return require('./assets/img/people/grandma-left.png')
        }else{
          return require('./assets/img/people/grandma-right.png')
        }
      }
      if(name=='mather'){
        if((+id)>2){
          return require('./assets/img/people/ma-left.png')
        }else{
          return require('./assets/img/people/ma-right.png')
        }
      }
      if(name=='father'){
        if((+id)>2){
          return require('./assets/img/people/pa-left.png')
        }else{
          return require('./assets/img/people/pa-right.png')
        }
      }
      if(name=='girl'){
        if((+id)>2){
          return require('./assets/img/people/girl-left.png')
        }else{
          return require('./assets/img/people/girl-right.png')
        }
      }
      if(name=='boy'){
        if((+id)>2){
          return require('./assets/img/people/boy-left.png')
        }else{
          return require('./assets/img/people/boy-right.png')
        }
      }
      if(name=='childBoy'){
        if((+id)>2){
          return require('./assets/img/people/child-boy-left.png')
        }else{
          return require('./assets/img/people/child-boy-right.png')
        }
      }
      if(name=='childGirl'){
        if((+id)>2){
          return require('./assets/img/people/child-girl-left.png')
        }else{
          return require('./assets/img/people/child-girl-right.png')
        }
      }
    },
    getPeoplePositionRight(imgMan,imgChair,x,y){
      var oX=x+imgChair.width;
      var oY=y+imgChair.height;
      return {
        x:oX-imgMan.width,
        y:oY-imgMan.height
      }
    },
    getPeoplePositionLeft(imgMan,imgChair,x,y){
      var oX=x;
      var oY=y+imgChair.height;
      return {
        x:oX,
        y:oY-imgMan.height
      }
    },
    drawPeopleRight(ctx,id,chair,chairX,chairY){
      return new Promise((resolve, reject) => {
        var _this=this;
        ctx.drawImage(chair,chairX,chairY);
        this.loadImg(this.findImg(id,this.familySeat[id-1])).then(function (peopleImg) {
          var peoplePosition1=_this.getPeoplePositionRight(peopleImg,chair,chairX,chairY);
          ctx.drawImage(peopleImg,peoplePosition1.x,peoplePosition1.y);
          resolve();
        });
      });
    },
    drawPeopleLeft(ctx,id,chair,chairX,chairY){
      return new Promise((resolve, reject) => {
        var _this=this;
        ctx.drawImage(chair,chairX,chairY);
        this.loadImg(this.findImg(id,this.familySeat[id-1])).then(function (peopleImg) {
          var peoplePosition1=_this.getPeoplePositionLeft(peopleImg,chair,chairX,chairY);
          ctx.drawImage(peopleImg,peoplePosition1.x,peoplePosition1.y);
          resolve();
        });
      });
    },
    async drawFamily(){
      var canvas=document.createElement('canvas');
      // var canvas=document.getElementById('testCas');
      var ctx=canvas.getContext('2d');
      canvas.width=750;
      canvas.height=850;
      var titleImg=await this.loadImg(require('./assets/img/title.png'));
      var tableImg=await this.loadImg(require('./assets/img/table.png'));
      var bearImg=await this.loadImg(require('./assets/img/bear.png'));
      var chairRight=await this.loadImg(require('./assets/img/chair-right.png'));
      var chairLeft=await this.loadImg(require('./assets/img/chair-left.png'));
      ctx.drawImage(titleImg,203,2,344,332);
      if(this.info.upoeple==1){
        await this.drawPeopleRight(ctx,2,chairRight,430,495)
      }else if(this.info.upoeple==2){
        await this.drawPeopleRight(ctx,2,chairRight,430,495)
        await this.drawPeopleLeft(ctx,4,chairLeft,100,478)
      }else if(this.info.upoeple==3){
        await this.drawPeopleRight(ctx,2,chairRight,430,495)
        await this.drawPeopleLeft(ctx,3,chairLeft,220,471)
        await this.drawPeopleLeft(ctx,4,chairLeft,130,478)
      }else if(this.info.upoeple==4){
        await this.drawPeopleRight(ctx,1,chairRight,547,505)
        await this.drawPeopleRight(ctx,2,chairRight,430,495)
        await this.drawPeopleLeft(ctx,4,chairLeft,130,478)
        await this.drawPeopleLeft(ctx,5,chairLeft,30,510)
      }else if(this.info.upoeple==5){
        await this.drawPeopleRight(ctx,1,chairRight,547,505)
        await this.drawPeopleRight(ctx,2,chairRight,430,495)
        await this.drawPeopleLeft(ctx,3,chairLeft,220,471)
        await this.drawPeopleLeft(ctx,4,chairLeft,130,478)
        await this.drawPeopleLeft(ctx,5,chairLeft,30,510)
      }
      ctx.drawImage(tableImg,121,509);
      ctx.drawImage(bearImg,261,352);
      this.info.base64 = canvas.toDataURL("image/png");

      var _this=this;
      this.show.wait=true;
      this.ajaxSetVoteStatus({
        name:this.info.uname,
        home:this.info.uhome,
        menu:`${_this.meunData.fish},${_this.meunData.chicken},${_this.meunData.cake},${_this.meunData.steam},${_this.meunData.circle}`,
        img: this.info.base64,
        w: canvas.width,
        h: canvas.height,
        fn:'createImg'
      })

    },
    rePlay(){
      this.seat={id:-1, people:''};
      this.canChooseSeat=true;
      this.lastFamilySelect=['','','','',''];
      this.chairShow=[false,true,false,false,false];
      this.seatBtnHide=[false,false,false,false,false];
      this.meunData={fish:'', chicken:'', cake:'', steam:'', circle:''};
      this.show={main:true, info:false, menu:false, family:false, finish:false, finishBtn:false, solgan:false, lastPageBtn:false,finialImg:false,wait:false,sharePage:false};
      this.info={uname:'', uhome:'', upoeple:'1', base64:''};
      this.finialImg='';
      this.seatPeople.id1=this.seatImg.noBody;
      this.seatPeople.id2=this.seatImg.noBody;
      this.seatPeople.id3=this.seatImg.noBody;
      this.seatPeople.id4=this.seatImg.noBody;
      this.seatPeople.id5=this.seatImg.noBody;
      for(var key in this.familyData){
        this.familyData[key].select=false
      }
      menuIscroll.scrollTo(0,0);
      familyIscroll.scrollTo(0,0);
    }
  },
  watch:{
    'info.upoeple'(value){
      if(value==='1'){
        this.chairShow=[false,true,false,false,false]
      }else if(value==='2'){
        this.chairShow=[false,true,false,true,false]
      }else if(value==='3'){
        this.chairShow=[false,true,true,true,false]
      }else if(value==='4'){
        this.chairShow=[true,true,false,true,true]
      }else if(value==='5'){
        this.chairShow=[true,true,true,true,true]
      }
    }
  }
}
</script>

<style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }


  /*禁用手机浏览器的用户选择功能 */
  img,div{
    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;
  }
  /*屏蔽点击的时候出现的高亮颜色*/
  div,input,img {
    -webkit-tap-highlight-color:rgba(0,0,0,0);
  }
  /*公共样式*/
  #app {
    height: 100%;
    position: relative;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /*background: url('./assets/img/bg/bg.jpg') no-repeat;*/
    background:#601115;
    /*background-size: cover;*/
  }
  #app:before{
    content: '';
    display: table;
  }
  /*page定位*/
  .page{
    top:130px;
  }
  .btn-box{
    top: 1026px;
  }
  /*iphoneX*/
  @media (min-height: 1210px) {
    .page{
      top:15%;
    }
    .btn-box{
      top: calc(15% + 896px);
    }
  }
  /*分享提示*/
  .sharePage{
    top:0;
    left: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    z-index: 200;
    background: rgba(0,0,0,0.6);
  }
  .sharePage-txt{
    position: absolute;
    right: 38px;
    top:70px;
    width: 561px;
    height: 215px;
    background: url('./assets/img/share-tips.png') no-repeat;
  }
  /*loading*/
  .loading{
    top:0;
    left: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    border: #f6e4d0 solid 25px;
    background:#601115;
    box-sizing: border-box;
    z-index: 200;
  }
  .loading-box{
    position: absolute;
    left: 50%;
    top:50%;
    transform: translate(-50%,-50%);
    width:373px;
    height: 440px;
  }
  .loading-img{
    position: absolute;
    left: 0;
    top:0;
    width:373px;
    height: 360px;
    background: url('./assets/img/loading.png') no-repeat;
  }
  .loading-txt{
    position: absolute;
    left: 0;
    bottom:0;
    width:100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 39px;
    color: #903425;
  }
  /*主页面*/
  .main{
    top:0;
    left: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    border: #f6e4d0 solid 25px;
    background:#903425 url('./assets/img/bg/bg-main.jpg') no-repeat center;
    background-size: cover;
    box-sizing: border-box;
  }
  .main .title-box{
    position: relative;
    width: 100%;
    height: 429px;
  }
  .main .title-txt{
    /*transform: translateY(-150px);*/
    opacity: 0;
    position: absolute;
    left: 94px;
    top:147px;
    width: 255px;
    height: 246px;
    background: url('./assets/img/title.png') no-repeat center;
    background-size: contain;
  }
  .main .title-txt2{
    /*transform: translateY(-250px);*/
    opacity: 0;
    position: absolute;
    left: 161px;
    top:415px;
    width: 129px;
    height: 197px;
    background: url('./assets/img/main-txt1.png') no-repeat center;
  }
  .main .title-txt3{
    /*transform: translateY(-350px);*/
    opacity: 0;
    position: absolute;
    left: 307px;
    top:530px;
    width: 17px;
    height: 174px;
    background: url('./assets/img/main-txt2.png') no-repeat center;
  }
  .main .table-box{
    position: relative;
    z-index: 20;
    margin-top:-78px;
  }
  .main .table-box .beer{
    position: relative;
    z-index: 20;
    width: 100%;
    height: 220px;
    background: url('./assets/img/bear.png') no-repeat center;
  }
  .main .table-box .table{
    margin-top: -66px;
    width: 100%;
    height: 342px;
    background: url('./assets/img/table.png') no-repeat center;
  }
  /*按钮群*/
  .btn-box{
    position: absolute;
    left: 0;
    width: 100%;
    height: 104px;
  }
  .btn-box .btn{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top:0;
    height: 100%;
  }
  .btn-box .btn-main{
    width: 301px;
    background: url('./assets/img/btn/btn-start.png') no-repeat;
  }
  .btn-box .btn-info{
    width: 482px;
    background: url('./assets/img/btn/btn-info.png') no-repeat;
  }
  .btn-box .btn-menu{
    width: 447px;
    background: url('./assets/img/btn/btn-menu.png') no-repeat;
  }
  .btn-box .btn-finish{
    width: 385px;
    background: url('./assets/img/btn/btn-eat.png') no-repeat;
  }
  .btn-box .btn-saveIimgAlert{
    top:-30px;
    height:20px;
    width: 168px;
    background: url('./assets/img/btn/saveImg.png') no-repeat;
  }
  .btn-box .btn-replay{
    transform: none;
    height: 80px;
    top:auto;
    bottom: 0;
    left: 507px;
    width: 174px;
    background: url('./assets/img/btn/replay.png') no-repeat;
  }
  .btn-box .btn-share{
    transform: none;
    height: 80px;
    top:auto;
    bottom: 0;
    left: 57px;
    width: 232px;
    background: url('./assets/img/btn/shareBtn.png') no-repeat;
  }
  .btn-box .btn-link{
    transform: none;
    height: 80px;
    top:auto;
    bottom: 0;
    left: 306px;
    width: 186px;
    background: url('./assets/img/btn/btn-link.png') no-repeat;
  }
    /*个人信息*/
  .info-box{
    z-index: 50;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 629px;
    height: 845px;
    background: url('./assets/img/bg/bg-info.png') no-repeat;
  }
  input::-moz-placeholder {
    color: #a78758;
  }
  input::-webkit-input-placeholder {
    color:#a78758;
  }
  input:-ms-input-placeholder {
    color:#a78758;
  }
  .info-box .name{
    box-sizing: border-box;
    border:none;
    outline: 0;
    margin: 0;
    padding: 0 20px;
    position: absolute;
    left: 164px;
    height: 64px;
    line-height: 64px;
    font-size: 32px;
    color: #a78758;
    background: transparent;

    top:342px;
    width: 300px;
  }
  .home{
    box-sizing: border-box;
    border:none;
    outline: 0;
    margin: 0;
    padding: 0 70px 0 20px;
    position: absolute;
    left: 164px;
    height: 64px;
    line-height: 64px;
    font-size: 32px;
    color: #a78758;
    background: transparent;

    top:508px;
    width: 300px;
  }
  .people{
    box-sizing: border-box;
    border:none;
    outline: 0;
    margin: 0;
    position: absolute;
    font-size: 32px;
    color: #a78758;
    background: transparent;

    left: 311px;
    top:635px;
    width: 50px;
    height: 53px;
    line-height: 53px;
    padding: 0 0 0 17px;
    /*text-align: center;*/
    /*text-align-last: center;*/
  }
  /*菜单*/
  .menu-box{
    z-index: 50;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 629px;
    height: 845px;
    background: url('./assets/img/bg/bg-menu.png') no-repeat;
  }
  .menu{
    position: relative;
    height: 550px;
    width: 549px;
    margin: 205px auto 0;
  }
  .menu-list{
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
  .menu-item:after{
    content: '';
    display: block;
    clear: both;
  }
  .menu-item-title{
    width: 100%;
    height: 61px;
    margin-top: 68px;
    margin-bottom: 20px;
  }
  .menu-item-dish{
    position: relative;
  }
  .menu input{
    opacity: 0;
    width: 1px;
    height: 1px;
  }
  .menu input + label{
    position: absolute;
    bottom: -25px;
    display: inline-block;
    width: 150px;
    height: 150px;
  }
  label .menu-show{
    position: absolute;
    left: 20px;
    bottom: 20px;
    width: 31px;
    height: 32px;
    background: url('./assets/img/btn/btn-menu-unselect.png') no-repeat;
  }
  .menu input:checked + label{
    bottom: -29px;
    transform: translateX(-6px);
  }
  .menu input:checked + label .menu-show{
    width: 55px;
    height: 51px;
    background: url('./assets/img/btn/btn-menu-selected.png') no-repeat;
  }
  .menu-item5{
    padding-bottom: 20px;
  }

  .menu-item1 .menu-item-title{background: url('./assets/img/meun/title1.png') no-repeat center;margin-top: 0;margin-bottom:42px;}
  .menu-item2 .menu-item-title{background: url('./assets/img/meun/title2.png') no-repeat center}
  .menu-item3 .menu-item-title{background: url('./assets/img/meun/title3.png') no-repeat center;margin-bottom: 33px;}
  .menu-item4 .menu-item-title{background: url('./assets/img/meun/title4.png') no-repeat center}
  .menu-item5 .menu-item-title{background: url('./assets/img/meun/title5.png') no-repeat center}

  .menu-item1 .menu-item-dish1{
    margin-left: 67px;
    width:169px;
    height: 120px;
    background: url('./assets/img/meun/fish1.png') no-repeat left bottom;
  }
  .menu-item1 .menu-item-dish2{
    margin-left: 40px;
    width:197px;
    height: 120px;
    background: url('./assets/img/meun/fish2.png') no-repeat left bottom;
  }
  .menu-item2 .menu-item-dish1{
    margin-left: 80px;
    width:152px;
    height: 157px;
    background: url('./assets/img/meun/chicken1.png') no-repeat left bottom;
  }
  .menu-item2 .menu-item-dish2{
    margin-left: 63px;
    width:176px;
    height: 157px;
    background: url('./assets/img/meun/chicken2.png') no-repeat left bottom;
  }
  .menu-item3 .menu-item-dish1{
    margin-left: 68px;
    width:186px;
    height: 125px;
    background: url('./assets/img/meun/cake1.png') no-repeat left bottom;
  }
  .menu-item3 .menu-item-dish2{
    margin-left: 53px;
    width:183px;
    height: 125px;
    background: url('./assets/img/meun/cake2.png') no-repeat left bottom;
  }
  .menu-item4 .menu-item-dish1{
    margin-left: 87px;
    width:138px;
    height: 157px;
    background: url('./assets/img/meun/steam1.png') no-repeat left bottom;
  }
  .menu-item4 .menu-item-dish2{
    margin-left: 74px;
    width:171px;
    height: 157px;
    background: url('./assets/img/meun/steam2.png') no-repeat left bottom;
  }
  .menu-item5 .menu-item-dish1{
    margin-left: 90px;
    width:151px;
    height: 140px;
    background: url('./assets/img/meun/circle1.png') no-repeat left bottom;
  }
  .menu-item5 .menu-item-dish2{
    margin-left: 72px;
    width:156px;
    height: 140px;
    background: url('./assets/img/meun/circle2.png') no-repeat left bottom;
  }
  .menu-item1 .menu-item-dish1 label{left:12px;}
  .menu-item1 .menu-item-dish2 label{left:25px;}
  .menu-item2 .menu-item-dish1 label{left:1px;}
  .menu-item2 .menu-item-dish2 label{left:7px;}
  .menu-item3 .menu-item-dish1 label{left:17px;}
  .menu-item3 .menu-item-dish2 label{left:-2px;}
  .menu-item4 .menu-item-dish1 label{left:-3px;}
  .menu-item4 .menu-item-dish2 label{left:2px;}
  .menu-item5 .menu-item-dish1 label{left:-7px;}
  .menu-item5 .menu-item-dish2 label{left:-9px;}
  /*选人界面*/
  .family-box{
    z-index: 50;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 619px;
    height: 974px;
    background: url('./assets/img/bg/bg-people.jpg') no-repeat;
  }
  .family{
    width: 510px;
    height: 874px;
    margin: 100px auto 0;
  }
  .family-list{
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .family-list-scroll{
    overflow: hidden;
  }
  .family-item{
    position: relative;
    width: 232px;
    height: 232px;
    float: left;
    background: url('./assets/img/btn/btn-people-unselect.png') no-repeat;
    margin-bottom: 6px;
  }
  .family-item.select{
    background: url('./assets/img/btn/btn-people-selected.png') no-repeat;
  }
  .family-item:nth-child(2n+2){
    margin-left: 46px;
  }
  .family-item:last-child{
    margin-bottom: 20px;
  }
  .family-item-head{
    position: absolute;
    left: 50%;
    top:50%;
    transform: translate(-50%,-50%);
    width:182px;
    height: 181px;
  }
  .family-close{
    position: absolute;
    width: 72px;
    height: 72px;
    background: url('./assets/img/btn/btn-people-close.png') no-repeat;
    right: 24px;
    top:16px;
  }
  /*结果页*/
  .finish{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 750px;
    height: 846px;
  }
  .finish>img{
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top:0;
    z-index: 100;
  }
  .finish .title-box{
    position: relative;
    width: 100%;
    height: 332px;
  }
  .finish .title-txt{
    position: relative;
    z-index: 10;
    height: 100%;
    background: url('./assets/img/title.png') no-repeat center;
    background-size: contain;
  }
  .finish .title-solgan{
    background-repeat: no-repeat;
    width: 750px;
    height: 400px;
    position: absolute;
    right: 0;
    top:33px;
  }
  .finish .table-box{
    position: relative;
    z-index: 20;
    margin-top:21px;
  }
  .finish .table-box .beer{
    position: relative;
    z-index: 40;
    width: 100%;
    height: 220px;
    background: url('./assets/img/bear.png') no-repeat center;
  }
  .finish .table-box .table{
    position: relative;
    z-index: 30;
    margin-top: -66px;
    width: 100%;
    height: 342px;
    background: url('./assets/img/table.png') no-repeat center;
  }
  .finish .chair{
    position: absolute;
    width: 138px;
    height: 212px;
  }
  .finish .chair1{
    background: url('./assets/img/chair-right.png') no-repeat;
    right: 65px;
    bottom: 130px;
  }
  .finish .chair2{
    background: url('./assets/img/chair-right.png') no-repeat;
    right: 180px;
    bottom: 142px;
  }
  .finish .chair3{
    background: url('./assets/img/chair-left.png') no-repeat;
    left: 220px;
    bottom: 169px;
  }
  .finish .chair4{
    background: url('./assets/img/chair-left.png') no-repeat;
    left: 130px;
    bottom: 156px;
  }
  .finish .chair5{
    background: url('./assets/img/chair-left.png') no-repeat;
    left: 30px;
    bottom: 123px;
  }
  .finish .seatBtn{
    position: absolute;
    background: url('./assets/img/seat.png') no-repeat;
    z-index: 60;
  }
  .finish .seatBtn.hide{
    background:transparent;
    /*background:red;*/
  }
  .seatBtn5{width: 79px;height: 135px;left: 22px;top:68px;}
  .seatBtn4{width: 79px;height: 135px;left: 125px;top:36px;}
  .seatBtn3{width: 79px;height: 135px;left: 214px;top:22px;}
  .seatBtn2{width: 79px;height: 135px;right: 176px;top:50px;}
  .seatBtn1{width: 79px;height: 135px;right: 60px;top:61px;}

  .seatBtn5.haveSeat{width: 80px;height: 300px;left: 36px;top:40px;}
  .seatBtn4.haveSeat{width: 80px;height: 160px;left: 165px;top:36px;}
  .seatBtn3.haveSeat{width: 79px;height: 150px;left: 275px;top:22px;}
  .seatBtn2.haveSeat{width: 80px;height: 200px;right: 230px;top:20px;}
  .seatBtn1.haveSeat{width: 110px;height: 300px;right: 80px;top:40px;}



  .seatMen{
    width: 192px;
    height: 337px;
    position: absolute;
    bottom: 0;
  }
  .chair1 .seatMen{ right: 0;}
  .chair2 .seatMen{ right: 0;}
  .chair3 .seatMen{ left: 0;}
  .chair4 .seatMen{ left: 0;}
  .chair5 .seatMen{ left: 0;}

  /*ajax等待*/
  .wait{
    position: absolute;
    left: 0;
    top:0;
    background: rgba(0,0,0,0.8);
    width: 100%;
    height: 100%;
    z-index: 150;
  }
  .wait>div{
    position: absolute;
    left: 50%;
    top:50%;
    width: 100px;
    transform: translate(-50% , -50%);
  }







</style>
