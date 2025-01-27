import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { InvoiceApp } from './components/invoice-app.js';
import { InvoiceComponent } from './components/invoice-component.js';
import { ProductComponent } from './components/product-component.js';

customElements.define('invoice-app', InvoiceApp);
customElements.define('invoice-component', InvoiceComponent);
customElements.define('product-component', ProductComponent);
