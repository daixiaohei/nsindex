define('script/index',function(require,exports,module){

  var $ = require('jquery');
  require('bootstrap')($);
  var common = require('script/common');
  var basePath = common.getRootPathLine();
  //var basePath = common.getRootPath();

  var indexModule = {
    initPanel:function(){
      common.changePanel();
      var action = common.Request("action");
      $("#"+action).click();
    },
    initHeader: function(callback){
      console.log(basePath);
      common.loadCss(basePath+'/static/css/include/header.css');
      $("#header").load(basePath+'/page/include/header.html',callback);
    },
    initFooter: function(){
      common.loadCss(basePath+'/static/css/include/footer.css');
      $("#footer").load(basePath+'/page/include/footer.html');
    }
  };

  module.exports = indexModule;

});