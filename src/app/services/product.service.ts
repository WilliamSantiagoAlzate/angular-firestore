import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: Observable<Product[]>;
  productsCollection: AngularFirestoreCollection<Product>;
  productDoc: AngularFirestoreDocument<Product>;

  constructor(public db: AngularFirestore) { 
    //this.products = this.db.collection('product').valueChanges();
    this.productsCollection = this.db.collection('product');
    this.products = this.productsCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Product;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
  }

  getProducts() {
    return this.products;
  }

  addProduct(product: Product) {
    this.productsCollection.add(product);
  }

  deleteProduct(product: Product) {
    this.productDoc = this.db.doc(`product/${product.id}`);
    this.productDoc.delete();
  }

  updateProduct(product: Product) {
    this.productDoc = this.db.doc(`product/${product.id}`);
    this.productDoc.update(product);
  }
}
