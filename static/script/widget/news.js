/** 新闻模块 */
define('script/widget/news',function(require,exports){

  var $ = require('jquery'),
      common = require('script/common'),
      Handlebars = require('lib/handlebars');
  var source = $("#newslist").html(),
      sourceR = $("#newslistR").html();
  var template = Handlebars.compile(source),
      templateR = Handlebars.compile(sourceR);

  common.getJsonp("http://120.236.141.29:8080/nsoss/news/findNewsListByJsonp.do",{},function(data){
    console.log(data);
    for(var i in data){
      var $t = $(template(data[i]));
      var $r = $(templateR(data[i]));
      if((i%2)===0){
        $t.find(".detail").data("content",data[i].content);
        $("#newslists").append($t);
      }else{
        $r.find(".detail").data("content",data[i].content);
        $("#newslists").append($r);
      }
    };
    $(".space").remove();

    $(".detail").click(function(){
      var content = $(this).data("content");
      $("#newsdetail").show().html(content);
      $("#newslists").hide();
    })
  },function(){
    console.log('error load news');
    $(".space").remove();
  });

});