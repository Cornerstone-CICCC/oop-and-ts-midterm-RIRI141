import { Component } from "../common/Component.js";
import { ProductList } from "./ProductList.js";
import { CartList } from "./CartList.js";
import { Header } from "./Header.js";
import { Footer } from "./Footer.js";

export class App extends Component {
  constructor(props) {
    super(props);
    this.handleToggleCart = this.handleToggleCart.bind(this);
  }

  handleToggleCart() {
    const cartAside = document.querySelector(".cart-aside");
    if (cartAside) {
      cartAside.classList.toggle("hidden");
    }
  }

  render() {
    const appContainer = document.createElement("div");
    appContainer.className = "container";
    appContainer.innerHTML = `
      <header></header>
      <div class="wrapper">
        <main></main>
      </div>
      <footer></footer>
    `;

    const cartIcon = document.createElement("div");
    cartIcon.className = "cart-icon";
    cartIcon.innerHTML = `<img src="../assets/ショッピングカートのアイコン4.png" alt="Cart">`;
    cartIcon.addEventListener("click", this.handleToggleCart);
    appContainer.appendChild(cartIcon);

    const cart = new CartList({
      cartContext: this.props.cartContext,
    }).render();

    appContainer.querySelector(".wrapper").appendChild(cart);

    const productList = new ProductList({
      cartContext: this.props.cartContext,
    });

    const header = new Header({
      siteTitle: "cart",
    }).render();

    const footer = new Footer().render();

    productList.mount(appContainer.querySelector("main"));
    appContainer.querySelector("header").appendChild(header);
    appContainer.querySelector("footer").appendChild(footer);

    return appContainer;
  }
}
