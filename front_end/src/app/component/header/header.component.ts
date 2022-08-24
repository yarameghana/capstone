import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';
import { MatButtonModule } from '@angular/material/button';
import { ApiService } from 'src/app/service/api.service';
import { FormControlName, FormControlOptions, FormsModule,FormControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';

@Component({  
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public totalItem : number = 0;
  public totalWishedItem : number = 0;
  public static category: string;
  public productList: any;
  private sortedAsc: boolean = true;
  public searchTerm: string = '';
  options:string[]=['Furniture','Furnishing','Decor','Appliances','Beds & Mattresses'];
  myControl= new FormControl('');
  constructor(private api: ApiService,private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.cartService.getProduct()
    .subscribe({next:res=>{
      this.totalItem = res.length;
    }})
    this.cartService.getWishlist()
    .subscribe({next:res=>{
      this.totalWishedItem = res.length;
    }})
  }
  //Searching the products from the product list
  search(event: any) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.cartService.search.next(this.searchTerm);
  }

  showCategory(category: string){
    HeaderComponent.category = category;
    console.log("Hi IM USED!!!");
    this.router.navigate(['/product/category']);
 }
 
 getProductsByCategory(category: string){
  this.api.getProductByCategory(HeaderComponent.category)
  .subscribe({next:res=>{
    this.productList = res;
    
    console.log(res);
    this.productList.forEach((a:any) =>{
      Object.assign(a,{quantity:1,total:a.price});
    })
  }})
}


wishlit(){
  return this.totalItem;
}

  isLoggedIn(){
    return window.localStorage.getItem("login") === "true";
  }

  logout(){
    if(confirm("Are you sure you want to log out?")){
      window.localStorage.removeItem("login");
      window.localStorage.removeItem("role");
      this.router.navigate(["/home"])
    }
  }

  confirmRole(){
    return window.localStorage.getItem('role')==='USER';
  }

}
