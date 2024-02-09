import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public users:any[]=[]
  loading:boolean = true

  constructor(
    //private _users:UsersService
    ) { }

  ngOnInit(): void {

  }

  view(id:any){
    console.log(id);
  }
}
