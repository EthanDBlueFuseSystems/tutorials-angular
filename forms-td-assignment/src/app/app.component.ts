import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {

  @ViewChild('f') form: NgForm;
  
  formSubmitted = false;
  subscriptionOptions = ["Basic", "Advanced", "Pro"]
  defaultSubscription = 'advanced';
  defaultPassword="Please enter a password!";
  defaultEmail="Please enter an email";

  submittedUserData= {
    email: '',
    password: '',
    subscription:''
  }

  //When form is submitted, this function will run
  //pass NgForm into function to access form data
  submit(form: NgForm){
    console.log(form);
    console.log("Sub: "+ this.form.value.subscription);
    this.formSubmitted = true;
    this.submittedUserData.email = this.form.value.userData.email;
    this.submittedUserData.password = this.form.value.userData.password;
    this.submittedUserData.subscription = this.form.value.userData.subscription;

    console.log(this.submittedUserData);


  }

}
