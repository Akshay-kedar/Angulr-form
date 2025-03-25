import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, isEmpty, of } from 'rxjs';

@Component({
  selector: 'app-reactive-login',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './reactive-login.component.html',
  styleUrl: './reactive-login.component.css'
})
export class ReactiveLoginComponent implements OnInit {
  private destroyRef=inject(DestroyRef)
  ngOnInit(): void {
const savedForm= window.localStorage.getItem('saved-login-form');
if(savedForm){
  const loadedForm=JSON.parse(savedForm);
  this.myForm.patchValue({
    myEmail:loadedForm.email
  })
}

const subscription=this.myForm.valueChanges.pipe(debounceTime(500)).subscribe({
  next:(value)=>{
    window.localStorage.setItem('saved-login-form',JSON.stringify({email:value.myEmail}))
  }
})

this.destroyRef.onDestroy(()=>subscription.unsubscribe())
  }

  myForm =new FormGroup({
    myEmail:new FormControl('',{
      validators:[Validators.email,Validators.required,(control)=>{
        if(control.value.includes('@gmail'))
        {//pass the validator
          return null
        }
        return {doesNotontainsGmail:true}
      }],
      asyncValidators:[this.emailIsUniq]

    }),
    myPassword:new FormControl('',{
      validators:[Validators.required,Validators.minLength(6)]
    })
  })

  emailIsUniq(control :AbstractControl){
    if(control.value !=='test@example')
    {//pass the validator
      return of(null)
    }
return of({notuniq:true});

  }

  get PasswordiSInvalid(){
    return this.myForm.controls.myPassword.touched &&this.myForm.controls.myPassword.dirty &&this.myForm.controls.myPassword.valid
  }
  onSubmit(){
const email=this.myForm.controls.myEmail.value;
const password=this.myForm.value.myPassword
console.log('email',email)
console.log('password',password)


  }

}
