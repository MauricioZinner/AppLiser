import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {



  formLogin=this.fb.group({

    email:['',[Validators.email,Validators.required]],
    password:['',[Validators.required]]
   });

  constructor(private fb:FormBuilder,private auth:AuthService,private interation:InteractionService,private router: Router) { }

  ngOnInit() {
  }

   login(){

        if( this.formLogin.valid){
          const {email,password}=this.formLogin.getRawValue();
          console.log(this.formLogin.value);

          this.auth.login(email!,password!).
          then((res) => {

              console.log('Exitoso');
              const  data='Ingresando...'
              const duration=1000
              this.interation.showLoading(data,duration)
              this.router.navigate(['/home/inicio']);

          }).
          catch(
              res=>{
                const position= 'bottom';
                const message="El usuario o contraseña es inválido"
                this.interation.presentToast(position,message)
                console.log('error')
              }
          )

        }
  }

}
