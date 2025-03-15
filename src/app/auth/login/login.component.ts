import { afterNextRender, Component, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports:[FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  
})
export class LoginComponent {
  private form=viewChild<NgForm>('myform')//to get access to form dataobject of type ngform this is a signal

  constructor(){
    //after the template redering the form will be fully initialiesed
    afterNextRender(()=>{
this.form()?.valueChanges?.subscribe({
  next:(value)=>{
  return   window.localStorage.setItem('saved-login-form',JSON.stringify({email:value.email}))
  }
});


})
  }

  OnSubmit(formData:NgForm){
console.log('formData',formData)
    if(formData.form.invalid){
      return
    }
    const enteredEmail=formData.form.value.email;
    const enteredPassword=formData.form.value.password;

    console.log('enteredEmail',enteredEmail)
    console.log('enteredPassword',enteredPassword)
    //this will reset the data and make the input value pristine again
formData.reset()

  }
}

