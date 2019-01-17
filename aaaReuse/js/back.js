; (function () {
  window.onload = function () {
    addHomeLink();
  };
  function addHomeLink() {
    var a = document.createElement('a');
    var style = document.createElement('style');
    a.id = 'home';
    a.innerHTML = '返回首页';
    a.href = '../';
    style.innerHTML = '#home {position: fixed;z-index: 1000;font-size: 20px;top: 4px;left: 4px;height: 40px;line-height: 40px;border-radius: 20px;padding: 0 8px;border: 2px solid #ccc;font-weight: 700;color: #ccc;background-color: #333;text-decoration: none;cursor: pointer;}#home:hover {color: #f40;border-color: #f40;}';

    document.body.append(style, a);
  }
})();