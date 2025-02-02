import { Component } from "../common/Component.js";

export class ProductItem extends Component {
  constructor(props) {
    super(props);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.openModal = this.openModal.bind(this);
  }

  handleAddToCart() {
    console.log("✅ Add to Cart clicked:", this.props.product);
    this.props.cartContext.addProduct(this.props.product);
  }
  openModal() {
    const overlay = document.createElement("div");
    overlay.className = "overlay";

    const modal = document.createElement("div");
    modal.className = "modal";

    modal.innerHTML = `
      <div class="modal-container">
        <div class="modal-img">
          <img src="${this.props.product.image}" alt="${this.props.product.title}">
        </div>
        <div class="modal-text">
          <h2>${this.props.product.title}</h2>
          <p>${this.props.product.description}</p>
        </div>
        <button class="close-modal-btn">✖</button>
      </div>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    overlay.addEventListener("click", (event) => {
      if (
        event.target === overlay ||
        event.target.classList.contains("close-modal-btn")
      ) {
        document.body.removeChild(overlay);
      }
    });
  }

  render() {
    const product = document.createElement("div");
    product.className = "product-item";
    product.innerHTML = `
       <div class="product-item__image">
        <img src="${this.props.product.image}" alt="${
      this.props.product.title
    }" />
      </div>
       <div class="product-item__content">
      <h3>${this.props.product.title}</h3>
       <h3 class="price">${parseFloat(this.props.product.price).toFixed(
         2
       )}&#36;</h3>
     </div>
      <button class="add-cart-btn">Add to Cart</button>
    `;

    product
      .querySelector(".add-cart-btn")
      .addEventListener("click", this.handleAddToCart);

    product
      .querySelector(".product-item__image")
      .addEventListener("click", this.openModal);

    return product;
  }
}
