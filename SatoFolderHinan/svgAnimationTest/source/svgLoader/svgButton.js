import { SvgLoader } from "./svgLoader";
import { EventListener } from "../eventListener/eventListener";

/**
   * inputタグを使用可能な状態にします。
   * @param {HTMLInputElement | string} selector -inputタグを直接渡すか、id名を書いてください。
   */
export class SvgButton {
  inputElement;

  #svgLoader;
  svgElements;

  #eventListener;

  constructor(selector) {
    this.#eventListener = new EventListener();
    this.#eventListener.add('change', () => {}, this);
    this.#eventListener.add('svgLoaded', () => {}, this);

    if (typeof selector === 'string') {
      this.inputElement = document.querySelector(selector);
    } else {
      this.inputElement = selector;
    }

    this.inputElement.addEventListener('change', async (event) => {
      this.#eventListener.dispatch('change');

      this.#svgLoader = new SvgLoader(event.target.files[0]);
      event.target.value = null;

      this.svgElements = new Promise(async (resolve, reject) => {
        try {
          const result = await this.#svgLoader.svgElements;
          resolve(result);
          this.#eventListener.dispatch('svgLoaded', result);
        } catch (error) {
          reject(error);
        }
      })
    })
  }

  /**
   * イベントリスナーに追加する。
   * @param {string | svgLoaded} name -現状svgLoaded以外にイベントはありません。
   * @param {(svgElements) =>} callback -任意のコールバック関数を入力してください。()内にはsvgElementsが渡されます。
   */
  addEventListener(name, callback) {
    if(name != 'svgLoaded' && name != 'change') throw new Error('該当するイベント名はありません。');
    this.#eventListener.add(name, callback, this);
  }
}
