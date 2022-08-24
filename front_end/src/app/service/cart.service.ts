import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItemList : any=[]
  public wishList : any=[]
  public productList = new BehaviorSubject<any>([]);
  public productWishList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");
  grandTotal=0;
  constructor(private snackBar:MatSnackBar) { }

  openSnackBar(Message:string){
    this.snackBar.open(Message,"Ok",{duration: 1000 })
  }
  getProduct(){
    return this.productList.asObservable();
  }

  getWishlist(){
    return this.productWishList.asObservable();
  }

  setProduct(product : any){
    this.cartItemList.push(...product);
    this.productList.next(product);

  }

  addtoCart(product: any) {
    this.openSnackBar("Added to Cart Successfully!!!");
    let productExists = false
    for (let i in this.cartItemList) {
      if (this.cartItemList[i].productId === product.productId) {
        this.cartItemList[i].quantity++
        productExists = true;
        break;
      } 
    }if (!productExists) {
      this.cartItemList.push({
        productId: product.productId,
        name: product.name,
        imageURL: product.imageURL,
        quantity: 1,
        price: product.price,
        category: product.category
      })
      this.productList.next(this.cartItemList);
      this.getTotalPrice();
    }}

  addToWishlist(product : any){
    this.openSnackBar("Added to Wishlist Successfully!!!");
    this.wishList.push(product);
    this.productWishList.next(this.wishList)
    console.log("wishlsit",this.wishList)
  }

 /* getTotalPrice() : number{
    let grandTotal = 0;
    this.cartItemList.map((a:any) =>{
      grandTotal += a.total;
    })
    return grandTotal;
  }*/
  getTotalPrice() {
    this.grandTotal = 0;
    this.cartItemList.forEach((product: any) => {
      this.grandTotal += (product.quantity * product.price);
    })
    return this.grandTotal;
  }

  removeCartItem(product: any){
    this.cartItemList.map((a:any, index:any)=>{
      if(product.productId== a.productId){
        this.cartItemList.splice(index,1);
        this.openSnackBar("Removed from Cart Successfully!!!");
      }
    })

    this.productList.next(this.cartItemList);
  }

  removeWishListItem(product: any){
    this.wishList.map((a:any, index:any)=>{
      if(product.id== a.id){
        this.wishList.splice(index,1);
        
        this.openSnackBar("Removed from Wishlist Successfully!!!");
      }
    })

    this.productWishList.next(this.wishList);
  }

  removeAllWishlist(){
    this.wishList = []
    this.openSnackBar("Wishlist is Cleared Successfully!!!");
    this.productWishList.next(this.wishList);
  }


  removeAllCart(){
    this.cartItemList = [] 
    this.openSnackBar("Cart is Cleared Successfully!!!");
    this.productList.next(this.cartItemList);
  }

}
