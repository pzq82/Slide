/**
 * Created by pzq82 on 2015/8/10.
 */
;(function($){
    var Slide = function(slide){
        var _this = this;
        this.slide = slide;
        this.slidePrev = slide.find('.prev-btn');
        this.slideNext = slide.find('.next-btn');
        this.slideList = slide.find('.slide-list');
        this.slideItem = this.slideList.find('li');
        this.slideDreBtn = slide.find('.dre-btns');

        this.setting={
            "width":500,
            "height":150,
            "type":"fade"
        };
        $.extend(this.setting,this.getSetting());

        _this.setSlidePop();
        this.slidePrev.click(function(){
            _this.slidePlay("right");
        });
        this.slideNext.click(function(){
            _this.slidePlay("left");
        });
        this.slideDreBtn.hover(function(){
            $(this).animate({
                "opacity":1
            },500);
        },function(){
            $(this).animate({
                "opacity":0
            },500);
        });
    };
    Slide.prototype = {
        getSetting : function(){
            var setting = this.slide.attr('data-setting');
            if(setting&&setting!=""){
                return $.parseJSON(setting);
            }else{
                return {}
            }
        },
        slidePlay : function(dre){
            var _this = this,
                len = _this.slideItem.size(),
                index;

            _this.slideItem.animate({
                opacity:0
            },300);
            if(dre === "right"){
                _this.slideItem.each(function(){
                    $(this).css({'z-index':(parseInt($(this).css('z-index'))+1)%len});
                });
                _this.slideItem.each(function(){
                    if($(this).css('z-index') == _this.slideItem.size()-2){
                        $(this).animate({
                            opacity:1
                        },300);
                    }
                });
            }
            if(dre === "left"){
                _this.slideItem.each(function(){
                    if($(this).css('z-index') == 0){
                        $(this).css('z-index','5');
                    }
                    index = (parseInt($(this).css('z-index'))-1)%len;
                    $(this).css({'z-index': index==-1 ? 5 : index});

                });
                _this.slideItem.each(function(){
                    if($(this).css('z-index') == 0){
                        $(this).animate({
                            opacity:1
                        },300);
                    }
                });
            }

        },
        setSlidePop : function(){
            var _this = this;
            $(_this.slide).css({
                "width":_this.setting.width,
                "height":_this.setting.height
            }).find('.dre-btns').css({
                "width":"30%",
                "height":"100%",
                "z-index":_this.slideItem.length
            });
            _this.slideItem.animate({
                opacity:0
            },500);
            this.slideItem.each(function(k,v){
                $(this).css({
                    "z-index":k,
                    "opacity":0,
                    "width":_this.setting.width,
                    "height":_this.setting.height
                });
            });
            this.slideItem.each(function(){
                if($(this).css('z-index') == _this.slideItem.size()-1){
                    $(this).animate({
                        opacity:1
                    },500);
                }
            });
        }
    };
    Slide.init = function(slides){
        var _this = this;
        slides.each(function(){
            new _this($(this));
        });
    };
    window["Slide"] = Slide;
})(jQuery);