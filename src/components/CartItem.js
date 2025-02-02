import { Component } from "../common/Component.js";

export class CartItem extends Component {
  constructor(props) {
    super(props);
    this.handlePlus = this.handlePlus.bind(this);
    this.handleMinus = this.handleMinus.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  handlePlus() {
    this.props.cartContext.plusItem(this.props.item);
  }

  handleMinus() {
    if (this.props.item.quantity > 1) {
      this.props.cartContext.minusItem(this.props.item);
    } else {
      this.props.cartContext.removeItem(this.props.item);
    }
  }

  handleRemove() {
    this.props.cartContext.removeItem(this.props.item);
  }

  render() {
    const cartItem = document.createElement("li");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `
      <p>${this.props.item.title}</p>
      <div class="item-calculator">
        <button class="btn-minus">-</button>
        <span class="item-count">${this.props.item.quantity}</span>
        <button class="btn-plus">+</button>
      </div>
      <strong class="item-total-price">${(
        this.props.item.quantity * this.props.item.price
      ).toFixed(2)}</strong>
      <button class="btn-delete">REMOVE</button>
    `;

    cartItem
      .querySelector(".btn-minus")
      .addEventListener("click", this.handleMinus);
    cartItem
      .querySelector(".btn-plus")
      .addEventListener("click", this.handlePlus);
    cartItem
      .querySelector(".btn-delete")
      .addEventListener("click", this.handleRemove);

    return cartItem;
  }
}
