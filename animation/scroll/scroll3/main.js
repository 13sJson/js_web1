document.addEventListener('DOMContentLoaded', function() {

    const cb = function(el, isIntersecting) {
        if(isIntersecting) {
            const ta = new TweenTextAnimation(el);
            ta.animate();
        }
    }

    const so = new ScrollObserver('.tween-animate-title', cb);
    
    //監視解放メソッド
    // so.destory();

});
