import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  user: {id: number, name: string};
  paramsSub: Subscription

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    //assign values to user object when component is called
    this.user = {
      //gets id from url defined in route parameters
      id:this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name'],
    };
    //If the parameters change within the componenet
    //watch params for any change then updates the user object id  
    this.paramsSub = this.route.params.subscribe((params: Params) => {
        this.user.id = params['id'];
        this.user.name = params['name'];
    });
  }

  ngOnDestroy(): void {
    this.paramsSub.unsubscribe();
  }

}
