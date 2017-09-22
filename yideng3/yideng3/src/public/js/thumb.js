'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by he.mingze on 2017/8/21.
 */
require('../css/thumb.css');
var jQuery = require('./jquery.js'),
    axios = require('./axios.js'),
    $ = jQuery,
    dianZan = function (window, undefined) {
    var animtaionEnd = ['webkitAnimationEnd', 'mozAnimationEnd', 'MSAnimationEnd', 'oanimationend', 'animationend'].join(' ');

    var PraiseButton = function () {
        function PraiseButton(dom) {
            _classCallCheck(this, PraiseButton);

            this.count = 0;
            this.canClick = true;
            this.dom = dom;
        }

        _createClass(PraiseButton, [{
            key: 'stopZan',
            value: function stopZan() {
                this.canClick = false;
                this.dom.children(".praise").find("div").css({
                    "background": "#ddd",
                    "border": "1px #ddd solid"
                });
                this.dom.children(".praise").children(".finger-1st").removeClass("on");
                this.dom.children(".praise").children(".finger-1st").addClass("off");
            }
        }, {
            key: 'continueZan',
            value: function continueZan() {
                var _this = this;

                var foo = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

                this.canClick = false;
                var turnCan = function turnCan() {
                    _this.canClick = true;
                },
                    finish = function finish() {
                    axios.post('/receive', {
                        id: "1"
                    }).then(function (data) {
                        turnCan();
                        foo != null && foo();
                    });
                };
                this.dom.children(".praise").children(".add-one").addClass("show").on(animtaionEnd, function () {
                    $(this).removeClass("show");
                    finish();
                    $(this).off();
                });
            }
        }]);

        return PraiseButton;
    }();

    var Thumb = function (_PraiseButton) {
        _inherits(Thumb, _PraiseButton);

        function Thumb(dom) {
            _classCallCheck(this, Thumb);

            return _possibleConstructorReturn(this, (Thumb.__proto__ || Object.getPrototypeOf(Thumb)).call(this, dom));
        }

        _createClass(Thumb, [{
            key: 'tag',
            value: function tag(final) {
                var continueZan = this.continueZan.bind(this),
                    stopZan = this.stopZan.bind(this);
                if (this.count < final) {
                    continueZan();
                } else {
                    continueZan(stopZan);
                }
            }
        }, {
            key: 'addOne',
            value: function addOne(num) {
                return ++num;
            }
        }]);

        return Thumb;
    }(PraiseButton);

    return {
        thumbLike: function thumbLike(clickTime) {
            if (typeof clickTime != "number") {
                throw new Error("点赞次数需要是一个整数");
            }
            if (clickTime >> 0 <= 0) {
                throw new Error("点赞次数不能小于1次");
            }
            var zan = new Thumb(this);
            this.on("click", function () {
                if (zan.canClick) {
                    zan.count = zan.addOne(zan.count);
                    zan.tag(clickTime);
                }
            });
        }
    };
}(window);
$.fn.extend(dianZan);
