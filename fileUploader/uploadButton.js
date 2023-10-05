
class UploadButton {
    constructor(ButtonWidth) {
        this.buttonWidth = ButtonWidth;
        this.buttonBoxElement = document.getElementById('newButtonBox');
        console.log(this.buttonBoxElement);
        this.setButtonStyle();
        this.createElement();
        this.applyInitStyles();
        this.addClickEventListener();
        this.addHoverEventListener();
    }

    createElement() {
        this.new_buttonElement = document.createElement('button');//ボタン要素を作る
        this.buttonBoxElement.appendChild(this.new_buttonElement);//button要素をboxに入れる
        this.new_buttonElement.setAttribute("id", "newButton_buttonElement");//button要素にidをつける

        this.new_inputElement = document.createElement('input');//input要素を作る
        this.new_inputElement.type = 'file';// inputのtypeを'file'に設定
        this.new_buttonElement.appendChild(this.new_inputElement);//input要素をボタン要素に入れる
        this.new_inputElement.setAttribute("id", "newButton_inputElement");//input要素にidをつける

        this.new_pElement = document.createElement('p');//p要素を作る
        this.new_buttonElement.appendChild(this.new_pElement);//p要素をボタン要素に入れる
        this.new_pElement.textContent = '+';//p要素のテキストを設定
        this.new_pElement.setAttribute("id", "newButton_pElement");//p要素にidをつける
    }

    setButtonStyle() {
        //通常時のstyles
        this.buttonElementStyles = {
            backgroundColor: 'whitesmoke',
            width: this.buttonWidth,
            height: '30px',
            margin: '5px',
            borderRadius: '5px',
            boxShadow: '0px 0px 7px #909090',
        }
        this.inputElementStyles = {
            display: 'none',
        }
        this.pElementStyles = {
            color: 'black',
            fontSize: '20px',
        }

        //ホバーした時のstyles
        this.buttonElementHoverStyles = {
            backgroundColor: '#555555'
        }
        this.pElementHoverStyles = {
            color: 'white',
        }
    }

    applyInitStyles() {
        for (var prop in this.buttonElementStyles) {
            this.new_buttonElement.style[prop] = this.buttonElementStyles[prop];
        }
        for (var prop in this.inputElementStyles) {
            this.new_inputElement.style[prop] = this.inputElementStyles[prop];
        }
        for (var prop in this.pElementStyles) {
            this.new_pElement.style[prop] = this.pElementStyles[prop];
        }
    }

    //スタイルの適用するためのメソッド
    applyHoverStyles(targetElement, defaultStyles, toApplyStyles) {
        for (var prop in toApplyStyles) {
            if (defaultStyles.hasOwnProperty(prop)) {
                targetElement.style[prop] = toApplyStyles[prop];
            };
        }
    }
    applyDefaultStyles(targetElement, defaultStyles) {
        for (var prop in defaultStyles) {
            targetElement.style[prop] = defaultStyles[prop];
        }
    }

    addHoverEventListener() {
        //ホバーした時
        this.new_buttonElement.addEventListener("mouseenter", () => {
                this.applyHoverStyles(this.new_buttonElement, this.buttonElementStyles, this.buttonElementHoverStyles);
        });
        this.new_pElement.addEventListener("mouseenter", () => {
                this.applyHoverStyles(this.new_pElement, this.pElementStyles, this.pElementHoverStyles);
        });

        //ホバーから外れた時
        this.new_buttonElement.addEventListener("mouseleave", () => {

                this.applyDefaultStyles(this.new_buttonElement, this.buttonElementStyles);
        });
        this.new_pElement.addEventListener("mouseleave", () => {
                this.applyDefaultStyles(this.new_pElement, this.pElementStyles);
        });
    }

    addClickEventListener() {
        this.new_buttonElement.addEventListener("click", () => {
                this.new_inputElement.click();
        });
    }
}

