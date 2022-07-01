import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit, OnDestroy {

  private firstObsSub: Subscription;
  constructor() { }

  ngOnInit() {

    const customIntervalObservable = Observable.create(observer=>{
      let count = 0;
      setInterval(()=>{
        // observer.complete();//Lets observer know you are done
        // observer.error();//throw an error
        observer.next(count);//emiits a new value
        if(count === 2){
          observer.complete();
        }
        if(count > 3){
          observer.error(new Error("greaters than 3"))
        }
        count++;
      },1000);
    });

    this.firstObsSub = customIntervalObservable.pipe(filter(data=>{
      return data > 0;
    }), map((data: number)=>{
      return 'Round ' +(data + 1);
    })).subscribe(data=>{
      console.log(data)
    }, error =>{
      console.log(error)
      alert(error);
    }, () => {
      console.log("Complete");
    })
  }

  ngOnDestroy(): void {
    this.firstObsSub.unsubscribe();
  }

}
