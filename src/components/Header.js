import { Component } from "../common/Component.js";

export class Header extends Component {
  render() {
    const header = document.createElement("div");
    header.className = "flex";
    header.innerHTML = `
      <img src="../assets/image__2025_0130_0937_-removebg-preview.png" 
           alt="Logo" 
           class="logo-img h-12 w-auto">
      <h3>About Us</h3>
      <h3>Phone Order <br>
          000-000-0000</h3>
    
      
     
    `;

    return header;
  }
}
