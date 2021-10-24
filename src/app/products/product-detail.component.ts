import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from './product';
import { ProductListComponent } from './product-list.component';

@Component({
  selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle: string = 'Product Detail'
  product: IProduct | undefined;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private productListComponent: ProductListComponent) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.pageTitle += `: ${id}`;
    this.product = this.productListComponent.filteredProducts.find((pr: IProduct) => pr.productId == id);
    console.log(this.product);
  }

  onBack(): void {
    this.router.navigate(['/products']);
  }

  

}
