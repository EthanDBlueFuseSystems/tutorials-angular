import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";
//defining an interface
export interface CanComponentDeactivate{
    //that must have a function that returns either Observable, Promise or boolean
    canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean
}

//This componenets implements the CanDeactive Interface using type interface CanComponenetDeactive
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate>{
    // 
    canDeactivate(component: CanComponentDeactivate, 
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot, 
        nextState?: RouterStateSnapshot) : Observable<boolean> | Promise<boolean> | boolean{
        return component.canDeactivate();
    }
}