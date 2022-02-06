import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
// import { Student } from 'src/app/interfaces/student';
import { DataService } from 'src/app/services/data.service';

import { PrivateService } from 'src/app/services/private.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public className: string = 'btn btn-info'
  public isDanger:boolean = false;

  public email: any = "";
  public users: any[] = [
    // {
    //   name:'Ana',
    //   age: 20
    // },
    // {
    //   name:'Marius',
    //   age: 40
    // },
    // {
    //   name:'Vlad',
    //   age: 33
    // },
  ]
 


  constructor(private privateService: PrivateService, 
    private data: DataService,
    private fireStore: AngularFirestore,
    private router: Router) { }

  // getAllUsers(){
  //   this.privateService.getAllUsers().subscribe((response:any)=>{
  //     this.users = response.getAllUsers;
  //   })
  // }

  
  ngOnInit(): void {
    // this.getAllUsers();
    // this.getAllStudents();
    this.fireStore.collection("User").valueChanges().subscribe((usersFromFireBase)=>{
      this.users = usersFromFireBase;
      console.log("email", localStorage.getItem("email"))
      console.log(localStorage)
      console.log(this.email)
      this.email =localStorage.getItem("email"); 
      

    })
  }


  changeClass(){
    //this.className = 'btn btn-danger';
    this.users.push({name:"ana",age:33})
    this.isDanger = !this.isDanger; 
    


  }
  removeByIndex(index:number){
      this.users.splice(index,1);
  }
  removeElementByName(name:string){
    this.users = this.users.filter(item => item.name !== name )
  }
  goToBook(){
    this.router.navigate(['/book']);
  }

  goToMovie(){
    this.router.navigate(['/movie']);
  }

}
