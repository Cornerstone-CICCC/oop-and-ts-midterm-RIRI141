import { Component } from "../common/Component.js";
import { ProductItem } from "./ProductItem.js";

export class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = { products: [] };
  }

  mount(container) {
    fetch(`https://fakestoreapi.com/products`)
      .then((response) => response.json())
      .then((data) => {
        this.state.products = data;
        container.appendChild(this.render());
      })
      .catch((err) => console.error(err));
  }

  render() {
    const container = document.createElement("div");

    // 説明用の <p> タグを追加
    const description = document.createElement("h2");
    description.className = "description";
    description.textContent = "ALL PRODUCTS";
    container.appendChild(description);

    const productList = document.createElement("div");
    productList.className = "product-list";

    this.state.products.forEach((product) => {
      const productItem = new ProductItem({
        product,
        cartContext: this.props.cartContext,
      });
      productList.appendChild(productItem.render());
    });

    container.appendChild(productList); // 商品リストを追加

    return container;
  }
}
