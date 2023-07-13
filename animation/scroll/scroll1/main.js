const child = document.querySelector('.child');

// 監視実行関数(callback)
const cb = function(entries, observer) {
    entries.forEach(entry => {
        // 監視対象の結果判定(isIntersecting)がTrue/falseの場合、CSSクラス=inviewの付与または削除
        if(entry.isIntersecting) {
            entry.target.classList.add('inview');
        }else {
            entry.target.classList.remove('inview');
        }
    });
}

// 監視オプションの宣言
const option = {
    root: null,
    rootMargin: "200px 0px",
    threshold: 1
}

// 監視時の実行関数(callback)と監視オプションを引数に渡し、クラス宣言
const io = new IntersectionObserver(cb, option);

// Intersection.observe(対象DOM) 引数DOMの情報を監視し、対象
io.observe(child);