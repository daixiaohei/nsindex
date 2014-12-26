/** 公共方法*/
define('script/common',function(require,exports,module){

  var $ = require('jquery');

  var common = {
    getRootPath: function () {
      var curWwwPath = window.document.location.href;
      var pathName = window.document.location.pathname;
      var pos = curWwwPath.indexOf(pathName);
      var localhostPaht = curWwwPath.substring(0, pos);
      var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
      return(localhostPaht + projectName);
    },
    getRootPathLine: function () {
      var curWwwPath = window.document.location.href;
      var pathName = window.document.location.pathname;
      var pos = curWwwPath.indexOf(pathName);
      var localhostPaht = curWwwPath.substring(0, pos);
      var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
      return(localhostPaht);
    },
    Request:function(strName){var strHref = window.document.location.href;var intPos = strHref.indexOf("?");var strRight = strHref.substr(intPos + 1);var arrTmp = strRight.split("&");for(var i = 0; i < arrTmp.length; i++){var arrTemp = arrTmp[i].split("=");if(arrTemp[0].toUpperCase() == strName.toUpperCase()) return arrTemp[1];}return ""; },
    loadCss: function(path){
      if(!path || path.length === 0){
        throw new Error('argument "path" is required !');
      }
      var head = document.getElementsByTagName('head')[0];
      var link = document.createElement('link');
      link.href = path;
      link.rel = 'stylesheet';
      link.type = 'text/css';
      head.appendChild(link);
    },
    loadJs: function(path){
      if(!path || path.length === 0){
        throw new Error('argument "path" is required !');
      }
      var head = document.getElementsByTagName('head')[0];
      var script = document.createElement('script');
      script.src = path;
      script.type = 'text/javascript';
      head.appendChild(script);
    },
    postJson: function (url, data, success, error, option) {
      var op = {
        type: 'POST',
        url: url,
        data: J.StringifyJSON(data),
        contentType: "application/json",
        dataType: 'json',
        cache: false,
        success: function (data, textStatus) {
          if (data == null || data == undefined) {
            if (typeof error == 'function') error();
          }else {
            if (typeof success == 'function') success(data, textStatus);
          }
        },
        error: error
      };
      $.extend(op, option);
      $.ajax(op);
    },
    getJsonp: function(url,data,success,error,options){
      var op = {
        type :"get" ,
        url :url,
        async :false ,
        cache: false,
        data :data,
        dataType : "jsonp" ,
        jsonp: "jsoncallback" ,
        contentType: "application/json" ,
        success: function (data, textStatus) {
          if (data == null || data == undefined) {
            if (typeof error == 'function') error();
          }else {
            if (typeof success == 'function') success(data, textStatus);
          }
        },
        error: error
      };
      $.extend(op, options);
      $.ajax(op);
    },
    stopPropagation: function(e){
      e = window.event || e;
      if(document.all){
        e.cancelBubble = true;
      }else{
        e.stopPropagation();
      }
    },
    FireEvent: function(eventMap){
      for(var i in eventMap){
        var ids = i.split(" ")[0];
        var eventName = i.split(" ")[1];
        (function(k){$(document).on(eventName,ids,function(){eventMap[k].call(this);});})(i);
      }
    },
    fireNavBar: function(){
      var basePath = this.getRootPathLine();
      //var basePath = this.getRootPath();

      var eventMap = {
        '#indexBtn click': function(){location.href = basePath+'/index.html?menu=index';},

        '#introBtn click': function(){location.href = basePath+'/page/platform_intro.html?menu=platform';},
        '#appBtn click': function(){location.href = basePath+'/page/platform_app.html?menu=platform';},

        '#cityBtn click': function(){location.href = basePath+'/page/city_so.html?menu=solutions';},
        '#trafficBtn click': function(){location.href = basePath+'/page/traffic_so.html?menu=solutions';},
        '#bankBtn click': function(){location.href = basePath+'/page/bank_so.html?menu=solutions';},
        '#saleBtn click': function(){location.href = basePath+'/page/sale_so.html?menu=solutions';},

        '#newsBtn click': function(){location.href = basePath+'/page/news.html?menu=news';},
        '#aboutsBtn click': function(){location.href = basePath+'/page/abouts.html?menu=abouts';}
      };

      this.FireEvent(eventMap);
    },
    changePanel: function(){
      var menu = common.Request("menu");
      var crowClass = '';
      switch(menu){
        case "platform":
          crowClass = 'line-crow-blue';
          break;
        case "solutions":
          crowClass = 'line-crow-green';
          break;
        case "news":
          crowClass = 'line-crow-yellow';
          break;
        case "abouts":
          crowClass = 'line-crow-red';
          break;
        default :
          crowClass = 'line-crow-blue';
          break;
      };
      $(".nav-left-ul").find("li").each(function(){

        $(this).click(function(){
          if($(this).find("ul").is(".dropdown-li-ul")){
            $(".dropdown-li-ul").hide();
            $(this).find(".dropdown-li-ul").show();
            $(this).find(".dropdown-li-ul li").each(function(i){
              $(this).click(function(){
                common.stopPropagation();
                $(".dropdown-li-ul li").removeClass("li-active");
                $(".line").removeClass(crowClass);
                var clas = $(this).attr("class");
                $(".panel-li").hide();
                $(".panel-"+clas).show();
                $(this).addClass("li-active");
                $(this).find(".line").addClass(crowClass);
              });
              if(i === 0){
                $(".dropdown-li-ul li").removeClass("li-active");
                $(".line").removeClass(crowClass);
                var clas = $(this).attr("class");
                $(".panel-li").hide();
                $(".panel-"+clas).show();
                $(this).addClass("li-active");
                $(this).find(".line").addClass(crowClass);
              }
            });

          }else{
            $(".nav-left-ul li").removeClass("li-active");
            $(".line").removeClass(crowClass);
            var clas = $(this).attr("class");
            $(".panel-li").hide();
            $(".panel-"+clas).show();
            $(this).addClass("li-active");
            $(this).find(".line").addClass(crowClass);
          }
          var txt = $(this).find(".line").html();
          $(".bread-nav-txt").html(txt);
        });
      });
    }

  }

  module.exports = common;

});