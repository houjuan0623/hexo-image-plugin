'use strict';
var cheerio = require('cheerio');

hexo.extend.filter.register('after_post_render', function(data) {
  var config = hexo.config;
  var $ = cheerio.load(data.content);
  $('img').each(function() {
    var regex = /\/\..*assets/
    var src = decodeURIComponent($(this).attr('src'));
    // 检查是否是 ./${filename}/assets/img 路径
    if(regex.test(src)){
      var result = src.match(/assets[\\\/].*$/)
      var newSrc = './' + result[0];
      $(this).attr('src', newSrc);
    }
  });
  data.content = $.html();
  return data;
});
