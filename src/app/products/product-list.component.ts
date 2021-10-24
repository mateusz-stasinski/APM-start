import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit, OnDestroy {

    constructor(private productService: ProductService){
    }

    pageTitle: string = 'Product List!';

    products: IProduct[] = [];
    filteredProducts: IProduct[] = [];

    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    errorMessage = '';
    private _listFilter: string = "";
    sub!: Subscription;

    get listFilter(): string{
        return this._listFilter;
    }

    set listFilter(value: string){
        this._listFilter = value;
        console.log("In setter", value);
        this.filteredProducts = this.performFilter(value);
    }

    performFilter(filterBy: string): IProduct[]{
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: IProduct)=>
        product.productName.toLocaleLowerCase().includes(filterBy));
    }

    ngOnInit(){
        this.sub = this.productService.getProducts().subscribe({
            next: products => {
                this.products = products;
                this.filteredProducts = this.products;
            },
            error: err => this.errorMessage = err
        });
        
    }

    ngOnDestroy(){
        this.sub.unsubscribe;
    }

    toggleImage(): void{
        this.showImage = !this.showImage;
    }

    onRatingClicked(message: string): void{
        this.pageTitle = 'Product List: ' + message;
    }
}