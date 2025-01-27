import { LitElement, html } from 'lit';

export class InvoiceComponent extends LitElement {
  static properties = {
    invoiceNumber: { type: String }
  };

  constructor() {
    super();
    this.invoiceNumber = this.generateInvoiceNumber();
  }

  render() {
    return html`
    <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
        rel="stylesheet"
      />
      <div class="row g-3">
        <div class="col-12">
          <label class="form-label">Nro Factura</label>
          <div>${this.invoiceNumber}</div>
        </div>
        <div class="col-12">
          <label for="idInvoice" class="form-label">Nro Id</label>
          <input type="text" class="form-control" id="idInvoice">
        </div>
        <div class="col-md-6">
          <label for="name" class="form-label">Nombre</label>
          <input type="text" class="form-control" id="name">
        </div>
        <div class="col-md-6">
          <label for="lastName" class="form-label">Apellido</label>
          <input type="text" class="form-control" id="lastName">
        </div>
        <div class="col-12">
          <label for="address" class="form-label">Dirección</label>
          <input type="text" class="form-control" id="address">
        </div>
        <div class="col-12">
          <label for="email" class="form-label">Email</label>
          <input type="email" class="form-control" id="email">
        </div>
      </div>
    `;
  }

  generateInvoiceNumber() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const milliseconds = String(now.getMilliseconds()).padStart(3, '0');

    return `FAC-${year}${month}${day}-${hours}${minutes}${seconds}-${milliseconds}`;
  }

  getInvoiceData() {
    return {
      numInvoice: this.invoiceNumber,
      idInvoice: this.shadowRoot.getElementById('idInvoice').value,
      name: this.shadowRoot.getElementById('name').value,
      lastName: this.shadowRoot.getElementById('lastName').value,
      address: this.shadowRoot.getElementById('address').value,
      email: this.shadowRoot.getElementById('email').value
    };
  }

  reset() {
    this.invoiceNumber = this.generateInvoiceNumber();
    this.shadowRoot.getElementById('idInvoice').value = '';
    this.shadowRoot.getElementById('name').value = '';
    this.shadowRoot.getElementById('lastName').value = '';
    this.shadowRoot.getElementById('address').value = '';
    this.shadowRoot.getElementById('email').value = '';
  }
}
