import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public productList: any;
  searchKey: string = "";  
  public productList1: any;
  public static category: string;
  private sortedAsc: boolean = true;
  public filterCategory: any;
  constructor(private api : ApiService, private cartService : CartService, private router: Router) { }

  ngOnInit(): void {
    this.api.getProduct()
    .subscribe({next:res=>{
      this.productList = res;
      this.filterCategory=res;
      this.productList.forEach((a:any) =>{
        Object.assign(a,{quantity:1,total:a.price});
        if (a.category === 'Furniture' || a.category === 'Storage' || a.category === 'Decor' || a.category === 'Furnishings' || a.category === 'Appliances') { }
          Object.assign(a, { quantity: 1, total: a.price });
        });
        console.log(this.productList);
  }})
    this.cartService.search.subscribe((val: any) => {
      this.searchKey = val;
    })
  }

  addtoCart(item: any){
    if(this.isLoggedIn()){
      this.cartService.addtoCart(item);
    }else{
      alert("You must be logged in to add items in your cart!!!")
      this.router.navigate(['/login']);
    }
  }

  addToWishlist(item: any){
    if(this.isLoggedIn()){
      this.cartService.addToWishlist(item);
    }else{
      alert("You must be logged in to add items in your cart!!!")
      this.router.navigate(['/login']);
    }
  }

  getProductsByCategory(category: string){
    this.api.getProductByCategory(HomeComponent.category)
    .subscribe(res=>{
      this.productList1 = res;
      this.productList1.forEach((a:any) =>{
        Object.assign(a,{quantity:1,total:a.price});
      })
    })
  }

  sortProducts(){
    this.productList = this.sortedAsc ? this.productList.sort((a: any, b: any) => (a.price > b.price) ? -1 : 1) : this.productList.sort((a: any, b: any) => (a.price < b.price) ? -1 : 1)
    this.sortedAsc = !this.sortedAsc
  }

  showCategory(category: string){
    HomeComponent.category = category;
    this.router.navigate(['/product/category']);
  }
  filter(category: string) {
    this.filterCategory = this.productList.filter((a: any) => {
      if (a.category == category || category == '') {
        console.log(category);
        console.log(a);
        return a;
      }
    })
  }
  isLoggedIn(){
    return window.localStorage.getItem("login") === "true";
  }

  confirmRole(){
    return window.localStorage.getItem('role')==='USER';
  }

}
