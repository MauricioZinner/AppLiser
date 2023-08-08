import { Injectable } from '@angular/core';
import { Auth,signInWithEmailAndPassword,createUserWithEmailAndPassword } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { register } from '../models/models';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth:AngularFireAuth ) {


      }

   login(email:string,password:string) {

          return  this.auth.signInWithEmailAndPassword(email,password)
     }

   logout(){

         return this.auth.signOut()
     }

   registerUser(email:any,password:any){

          return this.auth.createUserWithEmailAndPassword(email,password)
    }

    // Ver el estado de login de un usuario(saber si el usuario esta logeado)
    stateUser(){

          return this.auth.authState
    }

    getId(){

        this.auth.currentUser.then(res=>{
          console.log(res?.uid)
             return res?.uid;
        })
    }

}

