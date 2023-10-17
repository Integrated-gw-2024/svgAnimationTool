import { SvgButton } from "../svgLoader/svgButton";
import { SvgCircleAnalyzer } from "../svgLoader/svgAnalyzer";

import { World } from "./core/world";
import { Entity } from "./entity/entity";
import { Circle } from "./entity/components/shapes/circle";

import { Tween } from "./entity/components/motions/tween";
import * as tweenAnime from "../lib/tweenAnime/tweenAnime";

export const sketch = (p5) => {
  let world;

  let inputButton;

  p5.setup = () => {
    world = new World(p5);
    world.systems.canvas.adjustSizeElement = document.querySelector("#canvas_size");

    inputButton = new SvgButton("#fileInput"); //document.querySelector("#fileInput")でも可
    inputButton.addEventListener('change', () => {
      console.log('アップロード成功');
    })

    let i = 0;

    inputButton.addEventListener('svgLoaded', (event) => {
      //console.log(event);
      const data = new SvgCircleAnalyzer(event);
      console.log('svgLoaded');

      for (const circle of data.circles) {
        const entity = new Entity()

        entity.components.position.x = circle.position.x;
        entity.components.position.y = circle.position.y;
        entity.components.set(new Circle(circle.radius * 2))
        entity.components.color.colorCode = circle.fill;
        entity.components.stroke.weight = circle.strokeWeight * 6;
        entity.components.stroke.color = circle.strokeColor;

        entity.components.position.timeline.x.addMotion(
          new Tween(circle.position.x, 600, 40, tweenAnime.Easing.easeOutCubic)
        );

        entity.components.position.timeline.y.addMotion(
          new Tween(circle.position.y, 300 + i, 40, tweenAnime.Easing.easeOutCubic)
        );

        entity.components.shape.timeline.radius.addMotion(
          new Tween((circle.radius * 5), 0, 40, tweenAnime.Easing.easeOutCubic)
        );


        entity.components.position.timeline.x.addMotion(
          new Tween(600, circle.position.x, 40, tweenAnime.Easing.easeInOutCubic)
        );

        entity.components.position.timeline.y.addMotion(
          new Tween(300 + i, circle.position.y, 40, tweenAnime.Easing.easeInOutCubic)
        );

        entity.components.shape.timeline.radius.addMotion(
          new Tween(0, (circle.radius * 5), 40, tweenAnime.Easing.easeInOutCubic)
        );

        /*
        entity.components.shape.timeline.radius.addMotion(
          new Tween(0, (circle.radius * 2), 40, tweenAnime.Easing.easeOutCubic)
        );
        */

        world.add(entity);

        i += 1
      }
    })
  };

  p5.draw = () => {
    p5.background(0);
    world.update();
    world.display();
    if (world.entities.length > 0) {
      //console.log(world.entities[0].components.position.timeline.x.motions[0].tween.getValue());
    }
    //console.log(p5.frameRate());
  };
};