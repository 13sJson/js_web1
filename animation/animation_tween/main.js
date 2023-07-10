document.addEventListener('DOMContentLoaded', function () {
    const ta = new TweenTextAnimation('.tween-animate-title');
    ta.animate();
});

class TextAnimation {
    constructor(el) {
        this.DOM = {};
        this.DOM.el = document.querySelector(el);
        // this.el = document.querySelector(el);
        this.chars = this.DOM.el.innerHTML.trim().split("");
        this.DOM.el.innerHTML = this._splitText();
    }
    /* HTMLから取得した文字を一文字ずつspan(class="char")として作成 */
    _splitText() {
        return this.chars.reduce((acc, curr) => {
            curr = curr.replace(/\s+/, '&nbsp;');
            return `${acc}<span class="char">${curr}</span>`;
        }, "");
    }
    /* （class="inview"）を付与 ※本プロセスは↓は未使用*/
    animate() {
        this.DOM.el.classList.toggle('inview');
    }
}

class TweenTextAnimation extends TextAnimation {
    constructor(el) {
        super(el);
        this.DOM.chars = this.DOM.el.querySelectorAll('.char');
    }

    animate() {
        // tween-animate-titleにinviewを付与
        this.DOM.el.classList.add('inview');
        // tween-animate-title inview.charに動きを加えながら
        // opacity=1を付与することで文字を表示（アニメーション）
        this.DOM.chars.forEach((c, i) => {
            TweenMax.to(c, .6, {
                ease: Back.easeOut,
                delay: i * .05,
                startAt: { y: '-50%', opacity: 0},
                y: '0%',
                opacity: 1
            });
        });
    }
}
