
class UploadButtonManager {
    //ParentElementは"id名"で渡してください
    //ButtonWidthは"100px"のような形で渡してください
    constructor(ParentElement_id, ButtonWidth) {
        this.parentElement_id = ParentElement_id;
        this.parentElement = document.getElementById(this.parentElement_id);
        this.buttonWidth = ButtonWidth;


        this.createBox(this.uploaded_buttonBox, "uploadedButtonBox");
        this.createBox(this.new_buttonBox, "newButtonBox");
        this.plusButton = new UploadButton(this.buttonWidth);
        this.uploadedDiv = [];
        this.initUploadedDivStyle()


        this.parentElement.addEventListener("change", (event) => {
            this.addUploadedDiv();
            // ファイル選択後、input要素の値をリセット
            event.target.value = null;
        });
    }

    addUploadedDiv() {
        this.uploadedDiv.push(new UploadedDiv("uploadedButtonBox", this.buttonWidth));
    }

    initUploadedDivStyle() {
        //スタイル エレメントを作成
        const uploadedDiv_divStyle = document.createElement("style");
        const uploadedDiv_pStyle = document.createElement("style");
        //スタイルをヘッダに入れる
        document.head.appendChild(uploadedDiv_divStyle);
        document.head.appendChild(uploadedDiv_pStyle);
        //スタイルシートの設定
        uploadedDiv_divStyle.sheet.insertRule(`
        .uploadedDiv_divElement{
            margin:5px;
            width: ${this.buttonWidth};
            height: 30px;
            background-color: 
            #555555;border-radius: 
            5px;box-shadow: 0px 0px 7px #909090; 
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }`, 0);
        uploadedDiv_pStyle.sheet.insertRule(`
        .uploadedDiv_pElement{
            color:white;
            font-size:15px;
        }`, 0);
    }

    createBox(targetVar, idName) {
        targetVar = document.createElement('div');//box要素を作る
        targetVar.setAttribute("id", idName);//idをつける
        this.parentElement.appendChild(targetVar);
        //ここからcssを設定
        targetVar.style.width = this.buttonWidth;
    }
}