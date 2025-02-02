export class CartContext {
  constructor() {
    this.cart = [];
    this.listeners = [];
  }

  getCart() {
    return this.cart;
  }

  addProduct(item) {
    console.log("🛒 Before adding:", this.cart);

    const found = this.cart.find((product) => product.id === item.id);
    if (found) {
      this.cart = this.cart.map((product) => {
        if (product.id === item.id) {
          return { ...product, quantity: product.quantity + 1 };
        }
        return product;
      });
    } else {
      this.cart.push({ ...item, quantity: 1 });
    }

    console.log("🛒 After adding:", this.cart);
    this.notifyListeners();
  }

  plusItem(item) {
    this.cart = this.cart.map((cart) => {
      if (cart.id === item.id) {
        return {
          ...cart,
          quantity: cart.quantity + 1,
        };
      } else {
        return cart;
      }
    });
    this.notifyListeners();
  }
  minusItem(item) {
    this.cart = this.cart.map((cart) => {
      if (cart.id === item.id) {
        return {
          ...cart,
          quantity: Math.max(0, cart.quantity - 1),
        };
      } else {
        return cart;
      }
    });
    this.notifyListeners();
  }

  removeItem(item) {
    this.cart = this.cart.filter((cart) => cart.id !== item.id);

    this.notifyListeners();
  }

  subscribe(listener) {
    this.listeners.push(listener);
  }

  notifyListeners() {
    this.listeners.forEach((listener) => listener(this.cart));
  }
}
