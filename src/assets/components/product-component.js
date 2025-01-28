import { LitElement, html } from 'lit';

export class ProductComponent extends LitElement {
  static properties = {
    productCode: { type: String }
  };

  constructor() {
    super();
    this.productCode = this.generateProductCode();
  }
//Formulario en componente web para los datos de producto
  render() {
    return html`
    <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />
      <div class="row g-3">
        <div class="col-md-6">
          <label class="form-label">Cod Producto</label>
          <div>${this.productCode}</div>
        </div>
        <div class="col-12">
          <label for="nameProduct" class="form-label">Nombre</label>
          <input type="text" class="form-control" id="nameProduct">
        </div>
        <div class="col-md-6">
          <label for="unitPrice" class="form-label">Valor Unitario</label>
          <input type="text" class="form-control" id="unitPrice">
        </div>
        <div class="col-md-6">
          <label for="quantity" class="form-label">Cantidad</label>
          <input type="text" class="form-control" id="quantity">
        </div>
      </div>
    `;
  }
//Genera el código del producto
  generateProductCode() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `PROD-${year}${month}${day}-${hours}${minutes}${seconds}`;
  }
//Obtiene los datos del formulario de producto
  getProductData() {
    return {
      codProduct: this.productCode,
      nameProduct: this.shadowRoot.getElementById('nameProduct').value,
      unitPrice: parseFloat(this.shadowRoot.getElementById('unitPrice').value),
      quantity: parseInt(this.shadowRoot.getElementById('quantity').value)
    };
  }
//Limpia los espacios del formulario de producto
  reset() {
    this.productCode = this.generateProductCode();
    this.shadowRoot.getElementById('nameProduct').value = '';
    this.shadowRoot.getElementById('unitPrice').value = '';
    this.shadowRoot.getElementById('quantity').value = '';
  }
}

