import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginDTO } from 'src/app/interfaces/login-dto';
import { RegisterDTO } from 'src/app/interfaces/register-dto';
import { AuthService } from 'src/app/services/auth.service';
import {AngularFirestore} from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  email : string = '';
  password : string = '';
  firstName: string = '';
  lastName: string = '';

  constructor(private auth : AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  register() {

    if(this.email == '') {
      alert('Please enter email');
      return;
    }

    if(this.password == '') {
      alert('Please enter password');
      return;
    }
    if(this.firstName == '') {
      alert('Please enter First Name');
      return;
    }
    if(this.lastName == '') {
      alert('Please enter Last Name');
      return;
    }
    console.log("register", this.email,this.lastName,this.firstName)

    this.auth.register(this.email,this.password,this.firstName,this.lastName);
    
    this.email = '';
    this.password = '';
    this.firstName = '';
    this.lastName = '';

  }

  goToLogin(){
    this.router.navigate(['/login'])
  }

}

