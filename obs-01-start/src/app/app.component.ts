import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  private activeSub: Subscription;
  userActivated = false;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.activeSub = this.userService.activatedEmitter.subscribe(didActivate =>{
      this.userActivated = didActivate;
    })
  }

  ngOnDestroy(): void {
    this.activeSub.unsubscribe();
  }
}
