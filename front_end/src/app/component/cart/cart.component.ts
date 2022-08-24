import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public product : any = [];
  public grandTotal !: number;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getProduct()
    .subscribe({next:res=>{
      this.product=res;
      this.grandTotal = this.cartService.getTotalPrice();
    }})
  }
  updatecart() {
    this.grandTotal = this.cartService.getTotalPrice();
    this.grandTotal = this.grandTotal;  
  }
  removeItem(item: any){
    this.cartService.removeCartItem(item);
  }

  emptycart(){
    this.cartService.removeAllCart();
  }

  increaseQuantity(item: any){
    item.quantity+=1;
    this.updatecart();
  }

  decreaseQuantity(item: any){
    if(item.quantity != 0)
      item.quantity-=1;
      this.updatecart();
  }

}
