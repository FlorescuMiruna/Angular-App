import { AngularFireAuth } from '@angular/fire/compat/auth';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginDTO } from '../interfaces/login-dto';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private privateHttpHeaders = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }),
  };
  private FirstNameInfo: { [email: string]: string} = {};

  constructor(private fireauth : AngularFireAuth, private router : Router) {}

   // login method
   login(email : string, password : string, firstName: string, lastName: string) {
    this.fireauth.signInWithEmailAndPassword(email,password).then( res => {
       // localStorage.setItem('token','true');
        localStorage.setItem('token', "true");
        localStorage.setItem('email', email);
        localStorage.setItem('firstName', firstName);
        localStorage.setItem('lastName', lastName);
        console.log("lastName", localStorage.getItem("lastName"))
        console.log(localStorage)
        
        this.router.navigate(['dashboard']);

      

    }, err => {
        alert(err.message);
        this.router.navigate(['/login']);
    })
  }

    // register method
    register(email : string, password : string,firstName: string, lastName: string) {

      this.fireauth.createUserWithEmailAndPassword(email, password).then( res => {
        alert('Registration Successful');
        
        this.router.navigate(['/login']);
      }, err => {
        alert(err.message);
        this.router.navigate(['/register']);
      })
    }
      // sign out
  logout() {
    this.fireauth.signOut().then( () => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
    })
  }

}

