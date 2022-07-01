import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ServersService } from '../servers.service';
import { CanComponentDeactivate } from './can-deactivate-guard.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})

@Injectable()
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changesSaved = false;

  constructor(private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe((queryParams: Params)=>{
      this.allowEdit = queryParams['allowEdit'] === '1' ? true : false;
    }); 

    this.route.fragment.subscribe();
    debugger
    const id = +this.route.snapshot.params['id'];
    this.server = this.serversService.getServer(id);

    // this.route.params.subscribe((params: Params)=>{
    //   this.server.id = params['id'];
    // });

    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    //when a server is changed set to true
    this.changesSaved = true;
    //navigate back to servers using relative path
    this.router.navigate(['../', {relativeTo: this.route}]);
  }

  //When the user tries to leave page this function is called
  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean{
    //if you are not allowed to edit the server then leave anyways 
    if(!this.allowEdit){
      return true;
    }
    // if the passes servername or server status doesn't match the original server details and they are not saved
    if((this.serverName !== this.server.name || this.serverStatus !== this.server.status) && !this.changesSaved){
      return confirm('Do you want to discard the changes');
    }else{
      return true;
    }
  }

}
