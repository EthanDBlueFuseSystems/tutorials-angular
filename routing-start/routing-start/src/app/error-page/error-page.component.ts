import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {
  errorMessage:string;
  //Get the current route 
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    //get data passed in the routing
    this.errorMessage = this.route.snapshot.data['message'];
    //update error message if anything chages
    this.route.data.subscribe((data: Data)=>{
      this.errorMessage = data['message'];
    })
  }

}
