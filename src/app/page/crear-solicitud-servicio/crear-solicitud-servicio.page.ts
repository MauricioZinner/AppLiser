import { Component, OnInit ,ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { InteractionService } from 'src/app/services/interaction.service';


import { IonModal } from '@ionic/angular';
import { Item, solicitudService } from 'src/app/models/models';

import { TypeaheadComponent } from 'src/app/menuPricipal/typeahead/typeahead.component';



@Component({
  selector: 'app-crear-solicitud-servicio',
  templateUrl: './crear-solicitud-servicio.page.html',
  styleUrls: ['./crear-solicitud-servicio.page.scss'],
})
export class CrearSolicitudServicioPage implements OnInit {

  formRegister!: FormGroup;
  personal:any
  data:any
  IdsPersonal:any[] = [];
  idSolicitudServicio:any
  solicitudService:solicitudService={
        Nombre: '',
        fechaInicio:null,
        fechaFin:null,
        horaEntrada:null,
        horaSalida:null,
        horaAlmuerzoInicio:null,
        horaAlmuerzoFin:null,
        tieneAlmuerzo: false,
        personal:[],
        direccion:'',
        contacto:'',
        telefono:null,
        email:'',
        observaciones: '',
        supervisorId:''
  }

  @ViewChild('modal', { static: true }) modal!: IonModal;

  selectedFruitsText :any= '0 Items';
  selectedFruits: any[] = [];
  supervisorId:any
  constructor(

                private fb:FormBuilder,
                private auth: AuthService,
                private firestore: FirestoreService,
                private interaction:InteractionService
    ) {

      this.auth.stateUser().subscribe(
        res=>{

                if(res){
                    console.log('Si esta logeado');
                    this.solicitudService.supervisorId= res.uid

                }else{

                    console.log('No esta logeado');

                }
        }
      )

    }

  ngOnInit() {

          this.getPersonal()
          this.formRegister=this.fb.group({

                        nombre: ['', Validators.required],
                        fechaInicio: [],
                        fechaFin: [],
                        horaEntrada: [],
                        horaSalida: [null, Validators.required],
                        horaAlmuerzoInicio: [],
                        horaAlmuerzoFin: [],
                        tieneAlmuerzo: [false],
                        personal: ['', Validators.required],
                        direccion: ['', Validators.required],
                        contacto: ['', Validators.required],
                        telefono: ['', Validators.required],
                        email: ['', [Validators.required, Validators.email]],
                        observaciones: ['']
          });

  }

  private formatData(data: string[]) {
        console.log(data)
        this.data = data;
        console.log(this.data)
        if (data.length === 1) {
          const fruit = this.personal.find((fruit:any) => fruit.value === data[0]);
          return fruit?.text;
        }
        return `${data.length} items`;
  }

  fruitSelectionChanged(fruits: string[]) {
        console.log(fruits);
        this.selectedFruits = fruits;
        console.log('this.selectedFruits',this.selectedFruits )
        this.selectedFruitsText = this.formatData(this.selectedFruits);
        console.log('this.selectedFruitsText',this.selectedFruitsText)
        this.modal.dismiss();
  }

  //Obtiene el personal
  getPersonal(){

        const path='usuarios';
        const parametro='perfil';
        const condicion='==';
        const perfil='empleado';

        this.firestore.getCollectionQuery(path, parametro, condicion, perfil).subscribe(

             res=>{console.log(res)

                 this.personal=res
            }
        )
  }

  //Asigna los arrays de Ids
  getIds(ids:any):any{

    this.IdsPersonal=ids;
  }

  submitForm(){

      console.log(this.formRegister.value);
      const {fechaInicio,horaSalida,nombre}=this.formRegister.getRawValue();
      this.solicitudService.fechaInicio=fechaInicio;
      this.solicitudService.horaSalida=horaSalida
      this.solicitudService.Nombre=nombre
      this.solicitudService.personal=this.IdsPersonal;
      console.log( this.solicitudService.personal);
      console.log(this.solicitudService);
      const path='solicitudServicio'
      this.idSolicitudServicio=this.firestore.CreaId()
      this.firestore.createDoc(this.solicitudService,path,this.idSolicitudServicio).then(
          (res:any)=>{

                    this.createAsigancionServicio(this.idSolicitudServicio,this.IdsPersonal,this.solicitudService.supervisorId)
              }
      ).catch(res=>{

              console.log('Fue error')
      });


  }

  //Crea la asignacion a solicitud de servicio
  createAsigancionServicio(idSolicitudServicio:any,IdsPersonal:any,idSupervisor:any){

       console.log(idSolicitudServicio,IdsPersonal,idSupervisor)
       const path='AsignacionSolicitudServicio'
       IdsPersonal.forEach((idEmpleado:any) => {
                const data={idSolicitudServicio,idEmpleado,idSupervisor}
                this.firestore.createDoc(data,path,this.firestore.CreaId())
       });

  }
}

