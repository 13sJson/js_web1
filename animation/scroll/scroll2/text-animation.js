// (mixin) CSSでアニメーションを行うクラス(.animate-title)
class TextAnimation {
    constructor(el) {
        // DOM要素を明示するためにDOMオブジェクト作成
        this.DOM = {};
        // elオブジェクトにDOM要素を格納
        this.DOM.el = el instanceof HTMLElement ? el : document.querySelector(el);
        // elオブジェクト内、HTMLに記載されている文字を一文字づつ分離
        this.chars = this.DOM.el.innerHTML.trim().split("");
        // _split()メソッドで帰ってきたオブジェクトをDOM登録
        this.DOM.el.innerHTML = this._split();
    }

    // 分離した1文字ずつをspanタグに格納するメソッド
    _split() {
        // reduceで最終的に複数のspanを文字列結合してreturn
        return this.chars.reduce((acc, curr) => {
            // 空白を空白文字に明示する(空白認識させる)
            curr = curr.replace(/\s+/, '&nbsp');
            return `${acc}<span class="char">${curr}</span>`;
        }, "");
    }

    animate() {
        this.DOM.el.classList.toggle('inview');
    }
}

// Tweenを使用してアニメーションを行うクラス(.TweenAnimate-Title)
class TweenTextAnimation extends TextAnimation {
    constructor(el) {
        // 親constructor使用
        super(el);
        // animate用全オブジェクト取得
        this.DOM.chars = document.querySelectorAll('.char');
    }
    
    // アニメーション実行メソッド(TweenMax使用)
    animate() {
        // css(inview)クラスの付与 = opacity=1
        this.DOM.el.classList.add('inview');
        this.DOM.chars.forEach((char, index) => {
            // Tween ver 3以下の場合
            // TweenMax.to(char, .6, {
            gsap.to(char, .6, {
                ease: Back.easeOut,
                delay: index * .05,
                startAt: { y: '-50%', opacity: 0},
                y: '0%',
                opacity: 1
            });
        });
    }
}