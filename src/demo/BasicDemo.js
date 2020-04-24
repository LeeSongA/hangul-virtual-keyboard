import Keyboard from "../lib";
import "./css/BasicDemo.css";
import Hangul from "hangul-js";

const setDOM = () => {
  document.querySelector("#root").innerHTML = `
    <input class="input" placeholder="Tap on the virtual keyboard to start" />
    <div class="simple-keyboard"></div>
  `;
};

let buttonArray = [];
let inputText = "";

class Demo {
  constructor() {
    setDOM();

    /**
     * Demo Start
     */
    this.keyboard = new Keyboard({
      onChange: input => this.onChange(input),
      onKeyPress: button => this.onKeyPress(button)
    });

    /**
     * Update simple-keyboard when input is changed directly
     */
    document.querySelector(".input").addEventListener("input", event => {
      this.keyboard.setInput(event.target.value);
    });
  }

  onChange() {
    document.querySelector(".input").value = inputText;
  }

  onKeyPress(button) {
    console.log("Button pressed", button);
    if (
      button !== "{shift}" &&
      button !== "{language}" &&
      button !== "{enter}" &&
      button !== "{bksp}" &&
      button !== "{space}" &&
      button !== "{tab}"
    ) {
      buttonArray.push(button);
    }
    if (button === "{bksp}") {
      buttonArray.pop();
    }
    if (button === "{space}") {
      buttonArray.push(" ");
    }
    if (button === "{tab}") {
      buttonArray.push("  ");
    }

    inputText = Hangul.assemble(buttonArray);

    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === "{shift}" || button === "{lock}") this.handleShift();
    if (button === "{language}") this.handleLanguage();
  }

  handleShift() {
    const currentLayout = this.keyboard.options.layoutName;
    const shiftToggle = currentLayout === "default" ? "shift" : "default";

    this.keyboard.setOptions({
      layoutName: shiftToggle
    });
  }

  handleLanguage() {
    const currentLanguage = this.keyboard.options.language;
    const languageToggle =
      currentLanguage === "default" ? "english" : "default";

    this.keyboard.setOptions({
      language: languageToggle
    });
  }
}

export default Demo;
