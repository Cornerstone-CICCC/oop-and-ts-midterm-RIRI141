import { Component } from "../common/Component.js";

export class Footer extends Component {
  render() {
    const footer = document.createElement("div");
    footer.className = "flex";
    footer.innerHTML = `
  <h2>HIKYAKU.now</h2>
  <p>2025 &copy; HIKYAKU.now</p>
  
     
    `;

    return footer;
  }
}
