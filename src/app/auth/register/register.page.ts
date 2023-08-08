import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { register } from 'src/app/models/models';
import { FirestoreService } from 'src/app/services/firestore.service';
import { InteractionService } from 'src/app/services/interaction.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(
    private fb:FormBuilder,
    private auth: AuthService,
    private firestore: FirestoreService,
    private interaction:InteractionService ) {
}

  supervisores:any
  selectSupervisor:any
  data:register={
        Nombre:'',
        Apellido:'',
        email:'',
        password:'',
        ConfirmarPassword:'',
        uid:'',
        perfil:"empleado",
        auxiliares:[]
  }

  formRegister=this.fb.group({
        Nombre:['',[Validators.required]],
        Apellido:['',[Validators.required]],
        email:['',[Validators.email,Validators.required]],
        password:['',[Validators.required]],
        ConfirmarPassword:['',[Validators.required]],
        esAuxiliar:[false,[Validators.required]],
        noEsAuxiliar:[false,[Validators.required]],
        uid:[''],
        perfil:['']
   });



  ngOnInit() {

       this.getSupervisores()
  }

  ngAfterViewChecked() {
    console.log('ngAfterViewChecked')
    this.formRegister.get('esAuxiliar')!.valueChanges.subscribe((value: any) => {
      if (value) {
        this.selectSupervisor=value;
        console.log(value)
        this.formRegister.get('noEsAuxiliar')!.patchValue(false);
      }
    });

    this.formRegister.get('noEsAuxiliar')!.valueChanges.subscribe((value: any) => {
      if (value) {
        this.selectSupervisor=false;
        console.log(value)
        this.formRegister.get('esAuxiliar')!.patchValue(false);
      }
    });
  }



  Register(){


        if( this.formRegister.valid){

              console.log(this.formRegister.value)
              const {Nombre,Apellido,email,password,ConfirmarPassword}=this.formRegister.getRawValue();
              this.data.Nombre=Nombre;
              this.data.Apellido=Apellido;
              this.data.email=email;
              this.data.password=password;
              this.data.ConfirmarPassword=ConfirmarPassword;

              // Registrar el usuario en la autenticación
              this.auth.registerUser(email,password).then(res=>{

                const guard='Guardando...';
                const path='usuarios';
                this.interaction.showLoading(guard)

                      if(res.user?.uid){
                        this.data.uid=res.user?.uid;
                        if(this.formRegister.value.esAuxiliar){
                            this.data.perfil='empleado';

                        }else{

                            this.data.perfil='supervisor';
                            this.firestore.createDoc(this.data,'supervisores',this.data.uid)
                        }
                        this.guarLogin(this.data,path,this.data.uid)
                      }

              }).catch(res=>{

                      const position= 'bottom';
                      const message="El usuario ya existe";
                      this.interaction.presentToast(position,message);
              })
        }
  }


  guarLogin(data:any,path:any,id:any){

          const position= 'bottom';
          const message="Su usuario se registró con éxito"

          //Guarda los datos en la base de datos
          this.firestore.createDoc(data,path,id).then(
            res=>{
                    this.interaction.closeLoading();
                    this.interaction.presentToast(position,message);
            }
          )
  }

  getSupervisores(){

    this.firestore.getCollection('supervisores').subscribe(res=>{
       console.log(res)
       this.supervisores=res
    })
  }

  onSelectSupervisors(event: any) {
    const selectedSupervisors = event.detail.value;
    console.log("Supervisores seleccionados:", selectedSupervisors);
    // Realiza las operaciones necesarias con los supervisores seleccionados
  }



}
