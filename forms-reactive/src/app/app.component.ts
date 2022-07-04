import { Component, OnInit } from '@angular/core';
import { Form, FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsernames = ['Chris', 'Bob'];

  ngOnInit(){
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]), //validator is static method, will execute when it detects the input changed 
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails.bind(this))
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([]) 
    });

    this.signupForm.statusChanges.subscribe((status) => console.log(status));

    this.signupForm.patchValue({
      'userData':{
        'email': 'max@test.com',
      }
    });
    
    //
    // this.signupForm.setValue({
      //   'userData':{
      //     'username': 'max',
      //     'email': 'max@test.com',
      //   },
      //   'gender': 'male',
      //   'hobbies':[]
      // });
  }

  //returns a form array from the signup form
  getControls() {
    return (<FormArray>this.signupForm.get('hobbies')).controls;
  }

  submit(){
    console.log(this.signupForm);
  }

  onAddHobby(){
    //creating a new form control for hobbies
    const control = new FormControl(null, Validators.required);
    //create an array to store each hobby and push to control
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  forbiddenNames(control: FormControl): {[s:string]:boolean}{
    //Check if the inputted name matches a name in the forbiddenUsernames
    if(this.forbiddenUsernames.indexOf(control.value) !== -1){
      //Return true if the name is forbidden 
      return {'nameIsForbidden': true}
    }
    //This tells angular that the form was valid
    return null;
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    //create async operation
    const promise = new Promise<any>((resolve, reject)=>{
      setTimeout(()=>{
        if(control.value === 'test@test.com'){
          resolve({'emailIsForbidden': true});
        }else{
          resolve(null);
        }
      },1500);
    });
    return promise;
  }

}
