import { FileList } from "./FileList";
import { Timeline } from "./Timeline";


let fileList;
let timeline;

window.onload = createUploadButton;

function createUploadButton() {
    timeline = new Timeline("timeline");
    fileList = new FileList("fileList");


    //イベントリスナー
    timeline.event.add("motionObjectChanged", () => {
        //これはバーの時間を変更し終わった時に発行される
        console.log("変更されましたよ");
    });
    timeline.event.add("motionObjectClicked", () => {
        //これはバーをクリックして選択した瞬間に発行される
        console.log("今は " + timeline.getSelectedObjectNumber() + " 番目motionObjectを選択中だよ");
    })

    //これでmotionObjectを作れるよ。timeline.motionObjectsの中に配列でpushされる
    timeline.pushMotionObject(); 
    timeline.pushMotionObject(); 
    timeline.pushMotionObject(); 
    //ゲッター
    // console.log(timeline.getSelectedObjectNumber());
        //これは今どのバーが選択されているかを取り出せるintで帰ってくるよ
    // console.log(timeline.getMotionObjectFrames(0));
        //これは引数で指定したmotionObject（バー）のstartFrameとendFrameとdurationがframe変数にまとまって帰ってくる
        //取り出す時はframe.startFrameみたいな感じで取り出せる
    
    //セッター
    //timeline.setMotionType("MotionType");
        //stringで入れると、現在選択しているmotionObjectの動きの表示を変更できるよ
    //setMotionObjectFrames(MotionObjectNum, StartFrame, EndFrame);
        //指定したmotionObjectの動きのframeパラメーターを変更できる。

    
}

