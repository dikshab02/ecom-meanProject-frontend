import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from 'src/core/cart.service';
import { environment } from 'src/environments/environment';
import { IUser } from 'src/model/user.model';
import { ILogin } from 'src/viewModel/login.model';

@Injectable({
  providedIn: 'root',
})
export class CrudHttpService {
  public userkey = 'loggedinuser';
  public storeUserData: IUser | undefined;

  constructor(private http: HttpClient,
    private cartService: CartService) {}

  //api call for logged in user
  loginDetails(login: ILogin): Observable<IUser[]> {
    let url = environment.apiUrl + 'user/login';
    return this.http.post<IUser[]>(url, login);
  }

  // user saved in local storage
  saveToStorage(user: IUser) {
    localStorage.setItem(this.userkey, JSON.stringify(user));
  }

  //user removed
  logout() {
    localStorage.removeItem(this.userkey);
    this.cartService.clearCartItems();
  }

  //get user  from local storage
  getUser(): IUser | undefined {
    let u = localStorage.getItem(this.userkey);
    return u ? JSON.parse(u) : undefined;
  }

  //check user is logged in
  isLoggedin(): boolean {
    return localStorage.getItem(this.userkey) ? true : false;
  }
}
