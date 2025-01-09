(function(global) {
  // 确保 ES6 的箭头函数与 let/const 在不支持的环境下正常工作
  'use strict';

  const PigPig = {
    // 初始化懒加载
    init: function() {
      // 等待 DOM 完全加载后执行懒加载逻辑
      document.addEventListener('DOMContentLoaded', this.lazyLoadImages);
    },

    // 获取视口底部距离页面顶部的高度
    getViewportBottom: function() {
      return window.innerHeight + window.scrollY;
    },

    // 懒加载的核心逻辑
    lazyLoadImages: function() {
      // 获取所有具有 data-pig-src 属性的图片元素
      const images = document.querySelectorAll('img[data-pig-src]');

      // 遍历每个图片元素
      images.forEach(image => {
        // 如果图片还没有加载（没有 src 属性）
        if (!image.src) {
          // 获取图片的元素位置与其底部的距离
          const imageBottom = image.getBoundingClientRect().top + window.scrollY + image.height;

          // 获取视口底部的位置
          const viewportBottom = PigPig.getViewportBottom();

          // 如果图片元素的底部已经到达视口底部，进行懒加载
          if (imageBottom <= viewportBottom) {
            // 获取 data-pig-src 属性的值作为图片的真实 src
            const address = image.getAttribute('data-pig-src');
            image.src = address; // 替换 src 实现图片加载
            image.removeAttribute('data-pig-src'); // 清除 data-pig-src 属性
          }
        }
      });

      // 监听滚动事件，实时判断是否有图片需要加载
      window.addEventListener('scroll', PigPig.lazyLoadImages);
    }
  };

  // 暴露接口
  global.PigPig = PigPig;
})(window);

// 初始化懒加载库
PigPig.init();
