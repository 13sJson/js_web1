document.addEventListener('DOMContentLoaded', function() {

    // animate-title要素のすべてをオブジェクトとして格納
    // const els = document.querySelectorAll('.animate-title');  // CSS version
    const els = document.querySelectorAll('.tween-animate-title');

    // observer監視時のcallback関数の作成
    const cb = function(entories, observer) {
        entories.forEach(entory => {
            if(entory.isIntersecting) {
                // class(.animate-title)のDOMを取得 
                // const ta = new TextAnimation(entory.target);  // CSS version
                const ta = new TweenTextAnimation(entory.target);
                ta.animate();
                observer.unobserve(entory.target);
            };
        });
    }
    
    // observe監視関数実行条件オプションの宣言
    options = {
        root: null,
        rootmargin: "0px",
        threshold: [0, 0.5, 1]
    }
    
    // スクロール監視クラスのインスタンス生成
    const observer = new IntersectionObserver(cb, options);
    
    // オブジェクト分、監視実行
    els.forEach(el => observer.observe(el));
});
