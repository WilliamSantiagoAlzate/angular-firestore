import { Component, OnInit } from '@angular/core';

import { ProductService } from '../../services/product.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products = [];
  editingProduct: Product;
  editing: boolean = false;

  constructor(public productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      console.log(products);
      this.products = products;
    })
  }

  deleteProduct(product) {
    if (confirm('Are you sure you want to delete it?')) {
      this.productService.deleteProduct(product);
    }
  }

  editProduct(product) {
    this.editingProduct = product;
    this.editing = !this.editing;
  }

  updateProduct() {
    this.productService.updateProduct(this.editingProduct);
    this.editingProduct = {} as Product;
    this.editing = false;
  }
}
