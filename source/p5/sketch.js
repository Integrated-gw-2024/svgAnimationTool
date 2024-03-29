import { MotionManager } from "../ui/MotionManager";
import { ControlManager } from "../ui/ControlManager";
import { FileList } from "../ui/fileList/FileList";

import { World } from "./core/world";
import { Entity } from "./entity/entity";
import { Circle } from "./entity/components/shapes/circle";

import { Tween } from "./entity/components/motions/tween";
import { RandomWalk } from "./entity/components/motions/randomWalk";
import * as tweenAnime from "../lib/tweenAnime/tweenAnime";

import { CanvasCapture } from 'canvas-capture';

export const sketch = (p5) => {
  let motionManager;
  let controlManager;
  let background;
  let fileList;
  let world;

  p5.setup = () => {
    motionManager = new MotionManager();
    controlManager = new ControlManager();
    fileList = new FileList("file_list");

    world = new World(p5);
    world.systems.canvas.adjustSizeElement = document.querySelector("#canvas_size");

    background = new BackgroundColor(p5, 0, 255, 0, "color");

    CanvasCapture.init(
      document.getElementById('defaultCanvas0'),
      { showRecDot: true }, // Options are optional, more info below.
    );

    fileList.event.add("svgFileAdded", (svgFileLength) => {
      if (svgFileLength == 1) {
        world.systems.canvas.originalViewWidth = fileList.analyzer.svgViewSize.width;
        world.systems.canvas.ratio = {
          width: fileList.analyzer.svgViewSize.width,
          height: fileList.analyzer.svgViewSize.height,
        };

        for (const circle of fileList.getSvgData(0).svgArray) {
          const entity = new Entity();

          entity.components.position.x = circle.position.x;
          entity.components.position.y = circle.position.y;
          entity.components.set(new Circle(circle.radius * 2));
          entity.components.color.colorCode = circle.fill;
          entity.components.stroke.weight = circle.strokeWeight * 1;
          entity.components.stroke.color = circle.strokeColor;

          world.addEntity(entity);
        }

        //ボールの数を数えるのに使ってるから消さないで！！！
        console.log(world.systems.event.timeline);
      }
      //fileListでsvgデータが二つアップロードされたら
      if (svgFileLength >= 2) {
        let startSvgData = fileList.getSvgData(svgFileLength - 2); //ここでsvgデータを取得している
        let endSvgData = fileList.getSvgData(svgFileLength - 1); //ここでsvgデータを取得している

        /*
        if(world.entities.size < endSvgData.svgArray.length) {
          let count = 0;
          for (let i = 0; i < endSvgData.svgArray.length - world.entities.size; i++) {
            const entity = new Entity();
            const sSvgData = startSvgData.svgArray[count];

            entity.components.position.x = sSvgData.position.x;
            //entity.components.position.timeline.x.indexShift = (svgFileLength - 2) * -1
            entity.components.position.y = sSvgData.position.y;
            //entity.components.position.timeline.y.indexShift = (svgFileLength - 2) * -1;
            entity.components.set(new Circle(sSvgData.radius * 2));
            entity.components.color.colorCode = sSvgData.fill;
            entity.components.stroke.weight = sSvgData.strokeWeight * 6;
            //entity.components.stroke.timeline.weight.indexShift = (svgFileLength - 2) * -1;
            entity.components.stroke.color = sSvgData.strokeColor;
  
            world.addEntity(entity);
            count++
            if (count >= startSvgData.length) count = 0;
          }
        }
        */

        //motionDataを追加
        motionManager.addMotionData(
          `${startSvgData.fileName} → ${endSvgData.fileName}`,
          startSvgData.svgArray,
          endSvgData.svgArray,
          0,
          100,
          ""
        );
      }
    });
    //motionDataが変更された時に発火する
    motionManager.event.add("dataUpdated", (updatedMotionDataNum, PARAMS) => {
      //渡されているupdatedMotionDataNumは変更されたmotionDataの配列
      //PARAMSはそのmotionDataのもつデータが詰まっている

      if (PARAMS.motionType == "randomWalk") {
        for (const [key, entity] of world.entities) {
          if (entity.components.position.timeline.x.motions[updatedMotionDataNum].to == 0) return;
          entity.components.position.timeline.x.changeMotion(
            updatedMotionDataNum,
            new RandomWalk(
              entity.components.position.timeline.x.motions[updatedMotionDataNum].from,
              entity.components.position.timeline.x.motions[updatedMotionDataNum].to,
              PARAMS.duration,
              tweenAnime.Easing.easeOutSine,
              PARAMS.motionPARAMS.randomWalk_Range
            )
          );

          entity.components.position.timeline.y.changeMotion(
            updatedMotionDataNum,
            new RandomWalk(
              entity.components.position.timeline.y.motions[updatedMotionDataNum].from,
              entity.components.position.timeline.y.motions[updatedMotionDataNum].to,
              PARAMS.duration,
              tweenAnime.Easing.easeOutSine,
              PARAMS.motionPARAMS.randomWalk_Range
            )
          );

          entity.components.shape.timeline.radius.changeMotion(
            updatedMotionDataNum,
            new Tween(
              entity.components.shape.timeline.radius.motions[updatedMotionDataNum].from,
              entity.components.shape.timeline.radius.motions[updatedMotionDataNum].to,
              PARAMS.duration,
              tweenAnime.Easing.easeOutCubic,
              PARAMS.motionPARAMS.randomWalk_Range
            )
          );
        }
        return;
      } else {
        for (const [key, entity] of world.entities) {
          if (entity.components.position.timeline.x.motions[updatedMotionDataNum].to == 0) return;
          entity.components.position.timeline.x.changeMotion(
            updatedMotionDataNum,
            new Tween(
              entity.components.position.timeline.x.motions[updatedMotionDataNum].from,
              entity.components.position.timeline.x.motions[updatedMotionDataNum].to,
              PARAMS.duration,
              tweenAnime.Easing[PARAMS.motionType]
            )
          );

          entity.components.position.timeline.y.changeMotion(
            updatedMotionDataNum,
            new Tween(
              entity.components.position.timeline.y.motions[updatedMotionDataNum].from,
              entity.components.position.timeline.y.motions[updatedMotionDataNum].to,
              PARAMS.duration,
              tweenAnime.Easing[PARAMS.motionType]
            )
          );

          entity.components.shape.timeline.radius.changeMotion(
            updatedMotionDataNum,
            new Tween(
              entity.components.shape.timeline.radius.motions[updatedMotionDataNum].from,
              entity.components.shape.timeline.radius.motions[updatedMotionDataNum].to,
              PARAMS.duration,
              tweenAnime.Easing[PARAMS.motionType]
            )
          );
        }
      }

      /*
      world.systems.timeline.setMotionParameter(updatedMotionDataNum, PARAMS.duration, tweenAnime.Easing[PARAMS.motionType]);
      */
    });
    //motionDataが追加されたとき
    motionManager.event.add("motionAdded", (NewPARAMS) => {
      if (NewPARAMS.startSvgData.length > NewPARAMS.endSvgData.length) {
        let count = 0;
        let countEnd = 0;
        for (var [key, entity] of world.entities) {
          const startSvgData = NewPARAMS.startSvgData[count];
          const endSvgData = NewPARAMS.endSvgData[countEnd];
          console.log(entity.components.position);
          entity.components.position.timeline.x.addMotion(
            new Tween(entity.components.position.originalX, endSvgData.position.x, 150, tweenAnime.Easing.easeOutCubic)
          );
          entity.components.position.timeline.y.addMotion(
            new Tween(entity.components.position.originalY, endSvgData.position.y, 150, tweenAnime.Easing.easeOutCubic)
          );
          entity.components.shape.timeline.radius.addMotion(
            new Tween(entity.components.shape.originalRadius, endSvgData.radius * 2, 150, tweenAnime.Easing.easeOutCubic)
          );
          count++;
          countEnd++;
          if (countEnd >= NewPARAMS.endSvgData.length) countEnd = 0;
        }
      } else if (NewPARAMS.startSvgData.length < NewPARAMS.endSvgData.length) {
        let count = 0;
        let countEnd = 0;
        for (var [key, entity] of world.entities) {
          const startSvgData = NewPARAMS.startSvgData[count];
          const endSvgData = NewPARAMS.endSvgData[countEnd];
          entity.components.position.timeline.x.addMotion(
            new Tween(entity.components.position.originalX, endSvgData.position.x, 150, tweenAnime.Easing.easeOutCubic)
          );
          entity.components.position.timeline.y.addMotion(
            new Tween(entity.components.position.originalY, endSvgData.position.y, 150, tweenAnime.Easing.easeOutCubic)
          );
          entity.components.shape.timeline.radius.addMotion(
            new Tween(entity.components.shape.originalRadius, endSvgData.radius * 2, 150, tweenAnime.Easing.easeOutCubic)
          );
          count++;
          countEnd++;
          if (count >= NewPARAMS.startSvgData.length) count = 0;
        }
      } else {
        let count = 0;
        for (var [key, entity] of world.entities) {
          const startSvgData = NewPARAMS.startSvgData[count];
          const svgData = NewPARAMS.endSvgData[count];
          entity.components.position.timeline.x.addMotion(
            new Tween(entity.components.position.originalX, svgData.position.x, 150, tweenAnime.Easing.easeOutCubic)
          );
          entity.components.position.timeline.y.addMotion(
            new Tween(entity.components.position.originalY, svgData.position.y, 150, tweenAnime.Easing.easeOutCubic)
          );
          entity.components.shape.timeline.radius.addMotion(
            new Tween(entity.components.shape.originalRadius, svgData.radius * 2, 150, tweenAnime.Easing.easeOutCubic)
          );
          count++;
          if (count >= NewPARAMS.startSvgData.length) count = 0;
        }
      }

      //ここのNewPARAMSは初期化した状態のnullが混ざっているので注意
      //timelineにmotionObjectを配置
      controlManager.addMotionObject(NewPARAMS.name);
    });
    //motionObjectが選択された時
    controlManager.event.add("motionObjectSelected", (selectedMotionObjectData) => {
      console.log("現在は " + selectedMotionObjectData + " 個目のmotionObjectを選択中");
    });

    /*ここから下はUI同士の連絡とかそういうものなので無視していいよ*/
    //motionObjectが追加し終わったら
    controlManager.event.add("motionObjectAdded", (NewPARAMS, CurrentMotionObjectNum) => {
      //motionDataにデータを更新
      motionManager.updateMotionData(NewPARAMS, CurrentMotionObjectNum);
    });
    //UIによってパラメーターが変化した時
    controlManager.event.add("parameterChanged", (SelectedData, PARAMS) => {
      //motionDataを変更する
      motionManager.updateMotionData(PARAMS, SelectedData);
    });

    window.addEventListener("keydown", (event) => {
      if (event.code == "Space") {
        world.systems.timeline.reset();
      }

      if (event.code == "KeyP") {
        background.setMode("clear");
        world.systems.timeline.reset();

        document.querySelector("#canvas_size").style.position = "fixed";
        document.querySelector("#canvas_size").style.width = fileList.analyzer.svgViewSize.width + "px";
        document.querySelector("#canvas_size").style.height = fileList.analyzer.svgViewSize.height + "px";
        world.systems.canvas.resize();

        document.querySelector("#render_progress").style.display = "flex";

        CanvasCapture.beginPNGFramesRecord({
          onExportProgress: (progress) => { // Options are optional, more info below.
            //console.log(`Zipping... ${Math.round(progress * 100)}% complete.`);
            document.querySelector("#render_progress_value").innerHTML = `rendering... ${Math.round(progress * 100)}% complete.`
          },
          fps: 60,
          name:'pngFrames',
          onExportFinish: () => {
            setTimeout(() => {
              document.querySelector("#render_progress_value").innerHTML = `rendering... 0% complete.`
              document.querySelector("#render_progress").style.display = "none"
            }, 1200);
          }
        })

        world.systems.event.timeline.once('complete', () => {
          CanvasCapture.stopRecord();
          document.querySelector("#canvas_size").style.position = "absolute";
          document.querySelector("#canvas_size").style.width = "90%";
          document.querySelector("#canvas_size").style.height = "90%";
          background.setMode("color");
          world.systems.canvas.resize();
        });
      }

      if (event.code == "KeyG") {
        world.systems.timeline.reset();

        document.querySelector("#canvas_size").style.position = "fixed";
        document.querySelector("#canvas_size").style.width = fileList.analyzer.svgViewSize.width + "px";
        document.querySelector("#canvas_size").style.height = fileList.analyzer.svgViewSize.height + "px";
        world.systems.canvas.resize();

        document.querySelector("#render_progress").style.display = "flex";

        CanvasCapture.beginGIFRecord({
          onExportProgress: (progress) => { // Options are optional, more info below.
            //console.log(`Zipping... ${Math.round(progress * 100)}% complete.`);
            document.querySelector("#render_progress_value").innerHTML = `rendering... ${Math.round(progress * 100)}% complete.`
          },
          fps: 60,
          name:'GIFAnimation',
          quality: 0.6,
          onExportFinish: () => {
            setTimeout(() => {
              document.querySelector("#render_progress_value").innerHTML = `rendering... 0% complete.`
              document.querySelector("#render_progress").style.display = "none"
            }, 1200);
          }
        })

        world.systems.event.timeline.once('complete', () => {
          CanvasCapture.stopRecord();
          document.querySelector("#canvas_size").style.position = "absolute";
          document.querySelector("#canvas_size").style.width = "90%";
          document.querySelector("#canvas_size").style.height = "90%";
          world.systems.canvas.resize();
        });
      }
      
    });
  };

  p5.draw = () => {
    p5.background(0, 255, 0);
    background.display();
    world.update();
    world.display();
    if (world.entities.size > 0) {
      for (const entity of world.entities) {
        //console.log(entity[1].components.position.timeline.x);
        break;
      }
    }

    if (CanvasCapture.isRecording()) {
      CanvasCapture.recordFrame();
    }
  };
};

class BackgroundColor {
  #p5;
  #mode;
  R;
  G;
  B;

  constructor(p5, red, green, blue, mode = "clear") {
    this.#p5 = p5;

    this.R = red;
    this.G = green;
    this.B = blue;
    this.#mode = mode;
  }

  setColor(red, green, blue) {
    this.R = red;
    this.G = green;
    this.B = blue;
  }

  setMode(mode) {
    if (mode != "clear" && mode != "color") {
      throw new Error("modeに登録出来ない文字列です。'clear',もしくは'color'を入力してください。");
    }

    this.#mode = mode;
  }

  display() {
    if(this.#mode == "clear") this.#p5.clear();
    if(this.#mode == "color") this.#p5.background(this.R, this.G, this.B);
  }


}