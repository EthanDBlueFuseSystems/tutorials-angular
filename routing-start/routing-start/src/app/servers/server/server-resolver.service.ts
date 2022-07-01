import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { ServersService } from "../servers.service";

interface Server{
    id: number,
    name: string,
    status:string
}

@Injectable()

//Resolve interface: used to be a data provider,
export class ServerResolver implements Resolve<Server>{
    //get the serversService to get the server using the id
    constructor(private serversService: ServersService){}
    //get the current route to get id from and
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Server> | Promise<Server> | Server{
        return this.serversService.getServer(+route.params['id']);
    }

    
}