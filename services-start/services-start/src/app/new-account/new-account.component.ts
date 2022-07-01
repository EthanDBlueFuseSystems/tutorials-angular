import { Component} from '@angular/core';
import { LoggingService } from '../logging.service';
import { AccountsService } from '../accounts.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  // providers: [LoggingService]
})

export class NewAccountComponent {
  //Injecting logging service into NewAccountComponent to access without creating new instance
  constructor(private loggingService:LoggingService, private accountsService: AccountsService){
    this.accountsService.statusUpdated.subscribe(
      (status: string) => alert('New status ' + status)
    );

  }

  onCreateAccount(accountName: string, accountStatus: string) {
    this.accountsService.addAccount(accountName, accountStatus)
    // this.loggingService.logStatusChange(accountStatus);

  }
}
