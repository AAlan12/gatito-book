import { AbstractControl } from '@angular/forms';
import { NewUserService } from './new-user.service';
import { Injectable } from '@angular/core';
import { first, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserExistsService {

  constructor(private newUserService: NewUserService) { }

  userAlreadyExists(){
    return(control: AbstractControl) =>{
      return control.valueChanges.pipe(
        switchMap((userName) =>
          this.newUserService.checkExistingUser(userName)
        ),
        map((userExists) =>
          userExists ? {existingUser: true} : null
        ),
        first()
      )
    }
  }
}
