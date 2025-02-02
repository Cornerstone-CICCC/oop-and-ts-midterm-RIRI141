import { Component } from "../common/Component.js";
import { CartItem } from "./CartItem.js";

export class CartList extends Component {
  constructor(props) {
    super(props);
    this.state = { cart: [] };
    this.updateCart = this.updateCart.bind(this);
    this.updateTotalPrice = this.updateTotalPrice.bind(this);
    this.handleCloseCart = this.handleCloseCart.bind(this);

    this.props.cartContext.subscribe(this.updateCart);
    this.props.cartContext.subscribe(this.updateTotalPrice);

    this.cartList = null;
    this.totalPrice = null;
    this.cartAside = null;
  }

  updateTotalPrice(cart) {
    this.state.cart = cart;
    let total = 0;

    this.state.cart.forEach((item) => {
      total += item.quantity * item.price;
    });

    if (this.totalPrice) {
      this.totalPrice.innerHTML = `
        <p>Total Price: <strong>${total.toFixed(2)}</strong></p>
      `;
    }
  }

  updateCart(cart) {
    this.state.cart = cart;

    if (!this.cartAside) {
      this.createCartAside();
    }

    if (this.cartList) {
      this.cartList.innerHTML = "";

      this.state.cart.forEach((item) => {
        const cartItem = new CartItem({
          item,
          cartContext: this.props.cartContext,
        });

        this.cartList.appendChild(cartItem.render());
      });
    }

    this.updateTotalPrice(cart);
    if (this.state.cart.length > 0) {
      document.querySelector(".wrapper").classList.add("cart-open");
    }
  }

  createCartAside() {
    const cartAside = document.createElement("aside");
    cartAside.className = "cart-aside";
    cartAside.innerHTML = `
     <div class="cart-header">
      <button class="close-cart-btn">×</button>
      <h2>Shopping Cart</h2>
     </div>
     <div class="cart-list-wrap">
      <ul class="cart-list"></ul>
      <div class="cart-total-price"></div>
     </div>
    `;

    this.cartList = cartAside.querySelector(".cart-list");
    this.totalPrice = cartAside.querySelector(".cart-total-price");

    cartAside
      .querySelector(".close-cart-btn")
      .addEventListener("click", this.handleCloseCart);

    document.querySelector(".wrapper").appendChild(cartAside);
    this.cartAside = cartAside;
  }

  handleCloseCart() {
    document.querySelector(".wrapper").classList.remove("cart-open");

    setTimeout(() => {
      if (this.cartAside) {
        this.cartAside.remove();
        this.cartAside = null;
      }
    }, 200);
  }

  render() {
    return document.createDocumentFragment();
  }
}
