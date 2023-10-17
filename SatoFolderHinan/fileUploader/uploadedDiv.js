class UploadedDiv {
    constructor(ParentElement_id, DivWidth){
        this.parentElement_id = ParentElement_id;
        this.parentElement = document.getElementById(this.parentElement_id);
        this.divWidth = DivWidth;
        this.createElement();
    }

    createElement(){
        this.divElement = document.createElement('div');//box要素を作る
        this.pElement = document.createElement('p');//p要素を作る

        this.divElement.setAttribute("class", "uploadedDiv_divElement");//idをつける
        this.pElement.setAttribute("class", "uploadedDiv_pElement");//idをつける

        this.parentElement.appendChild(this.divElement);
        this.divElement.appendChild(this.pElement);

        this.pElement.textContent = 'アップロード済み';//p要素のテキストを設定
    }
}