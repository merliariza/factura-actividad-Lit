import { LitElement, html, css } from 'lit';

export class InvoiceApp extends LitElement {
  // Renderiza el componente
  createRenderRoot() {
    return this;
  }

  static properties = {
    products: { type: Array },
  };

  constructor() {
    super();
    this.products = [];
  }

  render() {
    return html`
      <!-- Incluimos los estilos de Bootstrap -->
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />
      <!-- Contenedor principal de la factura -->
      <div class="container">
        <div class="row justify-content-md-center mt-3">
          <div class="col-10">
            <div class="card">
              <div class="card-header">Compras</div>
              <div class="card-body">
                <h5 class="card-title">Factura</h5>
                <form class="row g-3" @submit=${this._handleInvoiceSubmit}>
                  <invoice-component></invoice-component>
                </form>
              </div>
              <div class="col-12">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">Productos</h5>
                    <form class="row g-3" @submit=${this._handleProductSubmit}>
                      <product-component></product-component>
                    </form>
                  </div>
                  <button type="button" class="btn btn-dark" @click=${this._addProduct}>+</button>
                  <br />
                  <div class="table-responsive">
                    <table class="table table-sm table-bordered table-hover">
                      <thead class="table-dark">
                        <tr>
                          <th>Cod</th>
                          <th>Nombre</th>
                          <th>V/Unit</th>
                          <th>Cantidad</th>
                          <th>Subtotal</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        ${this.products.map(
                          (product, index) => html`
                            <tr>
                              <td>${product.codProduct}</td>
                              <td>${product.nameProduct}</td>
                              <td>${product.unitPrice}</td>
                              <td>${product.quantity}</td>
                              <td>${(product.unitPrice * product.quantity).toFixed(2)}</td>
                              <td>
                                <button
                                  type="button"
                                  class="btn btn-sm btn-dark"
                                  @click=${() => this._removeProduct(index)}
                                >
                                  X
                                </button>
                              </td>
                            </tr>
                          `
                        )}
                      </tbody>
                    </table>
                  </div>
                  <!-- Cálculos de la factura -->
                  <div class="container mt-4">
                    <table class="table">
                      <tbody>
                        <tr>
                          <th>Subtotal</th>
                          <td class="text-end">${this._calculateSubtotal().toFixed(2)}</td>
                        </tr>
                        <tr>
                          <th>IVA (19%)</th>
                          <td class="text-end">${this._calculateIVA().toFixed(2)}</td>
                        </tr>
                        <tr>
                          <th>Total</th>
                          <td class="text-end">${this._calculateTotal().toFixed(2)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <button type="button" class="btn btn-dark col-12" @click=${this._saveInvoice}>
                    Pagar
                  </button>
                  <br />
                  <button
                    type="button"
                    class="btn btn-dark col-12"
                    @click=${this._clearInvoices}
                  >
                    Borrar Facturas
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // No realiza acción al enviar el formulario de la factura
  _handleInvoiceSubmit(e) {
    e.preventDefault();
  }

  // No realiza acción al enviar el formulario de productos
  _handleProductSubmit(e) {
    e.preventDefault();
  }

  // Agrega un producto a la lista de productos
  _addProduct() {
    const productComponent = this.querySelector('product-component');
    const product = productComponent.getProductData();

    if (this._validateProductData(product)) {
      const existingProductIndex = this.products.findIndex(
        (p) => p.nameProduct === product.nameProduct
      );

      if (existingProductIndex !== -1) {
        this.products[existingProductIndex].quantity += parseInt(product.quantity);
      } else {
        this.products = [...this.products, product];
      }

      productComponent.reset();
      this.requestUpdate();
    }
  }

  // Elimina un producto de la lista
  _removeProduct(index) {
    this.products = this.products.filter((_, i) => i !== index);
  }

  // Valida los datos del producto
  _validateProductData(product) {
    if (!product.nameProduct || !product.unitPrice || !product.quantity) {
      alert('Por favor complete todos los campos del producto');
      return false;
    }

    // Verifica si el precio y la cantidad son numéricos
    if (isNaN(product.unitPrice) || isNaN(product.quantity)) {
      alert('El precio y la cantidad deben ser numéricos');
      return false;
    }

    return true;
  }

  // Calcula el subtotal de la factura
  _calculateSubtotal() {
    return this.products.reduce((sum, product) => sum + product.unitPrice * product.quantity, 0);
  }

  // Calcula el IVA (19%) de la factura
  _calculateIVA() {
    return this._calculateSubtotal() * 0.19;
  }

  // Calcula el total de la factura (subtotal + IVA)
  _calculateTotal() {
    return this._calculateSubtotal() * 1.19;
  }

  // Guarda la factura directamente en localStorage
  _saveInvoice() {
    const invoiceComponent = this.querySelector('invoice-component');
    const invoiceData = invoiceComponent.getInvoiceData();

    if (!this._validateInvoiceData(invoiceData)) {
      alert('Por favor complete todos los campos de la factura');
      return;
    }

    if (this.products.length === 0) {
      alert('Debe agregar al menos un producto');
      return;
    }

    const invoice = {
      header: invoiceData,
      detailInvoice: this.products,
      summary: {
        subtotal: this._calculateSubtotal().toFixed(2),
        iva: this._calculateIVA().toFixed(2),
        total: this._calculateTotal().toFixed(2),
      },
    };

    // Guarda la factura en localStorage directamente (sin mantener un array en la clase)
    const invoices = JSON.parse(localStorage.getItem('invoices')) || [];
    invoices.push(invoice);
    localStorage.setItem('invoices', JSON.stringify(invoices));

    // Limpia los productos para la próxima factura
    this.products = [];
    invoiceComponent.reset();

    // Muestra la factura en consola
    console.log('Factura guardada:', invoice);
    console.log('Facturas en localStorage:', invoices);

    alert('Factura guardada con éxito.');
  }

  // Limpia todas las facturas almacenadas en localStorage
  _clearInvoices() {
    if (confirm('¿Estás seguro de que deseas borrar todas las facturas?')) {
      // Elimina las facturas de localStorage
      localStorage.removeItem('invoices');
      alert('Todas las facturas han sido borradas.');

      // Mostrar en consola que se han borrado las facturas
      console.log('Facturas borradas. Estado de localStorage:', localStorage.getItem('invoices'));
    }
  }

  // Valida que todos los campos esten llenos
  _validateInvoiceData(invoice) {
    return Object.values(invoice).every((value) => value.trim() !== '');
  }
}
