import Reveal from "reveal.js";
import Markdown from "reveal.js/plugin/markdown/markdown.esm.js";

export default class RevealClass {
  constructor() {
    let deck = new Reveal(document.querySelector(".reveal"), {
      embedded: true,
      plugins: [Markdown],
    });
    deck.initialize();
    return deck;
  }
}