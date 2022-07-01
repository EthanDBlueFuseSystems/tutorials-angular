import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router, CanActivateChild } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild{
    //get auth service to check if user is logged in
    constructor(private authService: AuthService, private router: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean{ //will return either observable, promise or boolean
        //Contains ansyc action to wait for then once something is returned then check it 
        return this.authService.isAuthenticated().then(
            (authenticated:boolean) =>{
                if(authenticated){
                    return true;
                }else{
                    this.router.navigate(['/']);
                    return false;
                }
            }
        )
    }

    //ActivatedRouteSnap: information about the route associated with that componenet, can used to navigate to other routes,
    //RouterStateSnapshop: state of the route
    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        
        return this.canActivate(childRoute, state);
    }
}