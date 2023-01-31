import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable,tap } from 'rxjs';
import { USERS_LOGIN_URL, USERS_REGISTER_URL } from '../shared/constants/urls';
import { IUserLogin } from '../shared/interfaces/IuserLogin';
import { IUserRegister } from '../shared/interfaces/IuserRegister';
import { User } from '../shared/model/User';

const USER_KEY = 'User';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
  public userObservable : Observable<User>;
  constructor(private http:HttpClient,private toastr:ToastrService) {
    this.userObservable = this.userSubject.asObservable();
   }

   public get currentUser():User{
      return this.userSubject.value;
   }

   login(userLogin:IUserLogin):Observable<User>{
    return this.http.post<User>(USERS_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) =>{
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastr.success(
            `Welcome to Watch center ${user.name}!`,
            'Login Successful'
          )
        },
        error: (errorResponse) => {
          this.toastr.error(errorResponse.error, 'Login Failed');
        }
      })
    );
  }

   register(userRegiser:IUserRegister): Observable<User>{
    return this.http.post<User>(USERS_REGISTER_URL, userRegiser).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastr.success(
            `Welcome to Watch center ${user.name}`,
            'Register Successful'
          )
        },
        error: (errorResponse) => {
          this.toastr.error(errorResponse.error,
            'Register Failed')
        }
      })
    )
  }


    logout(){
      this.userSubject.next(new User());
      localStorage.removeItem(USER_KEY);
      window.location.reload();
    }

    private setUserToLocalStorage(user:User){
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    }

    private getUserFromLocalStorage():User{
      const userJson = localStorage.getItem(USER_KEY);
      if(userJson) return JSON.parse(userJson) as User;
      return new User();
    }
}
