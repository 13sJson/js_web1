class ScrollObserver {
    constructor(els, cb, options) {
        this.els = document.querySelectorAll(els);
        const defaultOptions = {
            root: null,
            rootmargin: "0px",
            threshold: 0,
            once: true
        };
        // defaultOptionsとoptionsをマージする
        this.options = Object.assign(defaultOptions, options);
        this.cb = cb;
        this.once = this.options.once;
        this._init();
    }

    _init() {
        const callback = function(entories, observer) {
            entories.forEach(entory => {
                if(entory.isIntersecting) {
                    this.cb(entory.target, true);
                    if(this.once) {
                        observer.unobserve(entory.target);
                    }
                }else {
                    this.cb(entory.target, false);
                }
            });
        }
            // スクロール監視クラスのインスタンス生成
        this.observer = new IntersectionObserver(callback.bind(this), this.options);

        // polyfil スクロールイベントの監視の間隔を調整↓(100ms)
        this.observer.POLL_INTERVAL = 100;
        
        // オブジェクト分、監視実行
        this.els.forEach(el => this.observer.observe(el));
    }

    // 監視の解放メソッド
    destory() {
        this.observer.disconnect();
    }
}