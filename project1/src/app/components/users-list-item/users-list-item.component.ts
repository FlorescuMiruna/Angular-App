import { Component, EventEmitter, Input,OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-users-list-item',
  templateUrl: './users-list-item.component.html',
  styleUrls: ['./users-list-item.component.scss']
})
export class UsersListItemComponent implements OnInit {

  @Input() name : string = '';
  @Input() age : number = 0;
  @Input() index : number = 0;

  @Output() onRemoveUser = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }
   remove(name:string){
     this.onRemoveUser.emit(name);
   }

}
