import { Component, OnInit ,ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { InteractionService } from 'src/app/services/interaction.service';


import { AlertController, IonModal } from '@ionic/angular';
import { Item, solicitudService,task } from 'src/app/models/models';

@Component({
  selector: 'app-crear-punto',
  templateUrl: './crear-punto.page.html',
  styleUrls: ['./crear-punto.page.scss'],
})
export class CrearPuntoPage implements OnInit {

  formRegister!: FormGroup;
  personal:any;
  data:any;
  IdsPersonal:any[] = [];
  idSolicitudServicio:any;
  total1:any[]=[]

  informacionActiva: boolean = true;
  porHacerActivo: boolean = false;
  colorBoton:string='danger';
  activeButton: string = 'informacion'
  uid:string =''
  agencias:any[] = [];
  taskTotal:any[]=[]



  puntoData:any={
        nombre: '',
        fechaInicio:null,
        fechaFin:null,
        horaEntrada:null,
        horaSalida:null,
        horaAlmuerzoInicio:null,
        horaAlmuerzoFin:null,
        tieneAlmuerzo: false,
        personal:[],
        direccion:'',
        tareas:[],
        supervisorId:'',
        idPunto:'',
        tipo:'Punto'
   }

//@ViewChild('modal', { static: true }) modal!: IonModal;

selectedFruitsText :any= '0 Items';
selectedFruits: any[] = [];
supervisorId:any

task:task[]=[]
task2:task[]=[]
public alertButtons = ['0K'];

public alertInputs = [
  {
    placeholder: 'Tarea',
  },

];


constructor(

              private fb:FormBuilder,
              private auth: AuthService,
              private firestore: FirestoreService,
              private interaction:InteractionService,
              private alertController: AlertController
  ) {

    this.informacionActiva=true
    this.auth.stateUser().subscribe(
      res=>{

              if(res){
                  console.log('Si esta logeado');
                  this.uid=res.uid
                  console.log(this.uid)
                  this.puntoData.supervisorId= res.uid
                  this.obtenerAgencias(res.uid)

              }else{

                  console.log('No esta logeado');

              }
      }
    )

  }

ngOnInit() {

        this.getPersonal();

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
                      tareas: ['', Validators.required]
        });

  }


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

submitForm(){


  console.log(this.formRegister.value)

  if (this.formRegister.value){

        const {nombre,fechaInicio,fechaFin,horaEntrada,horaSalida,horaAlmuerzoInicio,
              horaAlmuerzoFin,tieneAlmuerzo,direccion}=this.formRegister.getRawValue();

        this.puntoData.nombre= nombre,
        this.puntoData.fechaInicio=fechaInicio ,
        this.puntoData.fechaFin= fechaFin,
        this.puntoData.horaEntrada=horaEntrada ,
        this.puntoData.horaSalida=horaSalida ,
        this.puntoData.horaAlmuerzoInicio= horaAlmuerzoInicio,
        this.puntoData.horaAlmuerzoFin=horaAlmuerzoFin ,
        this.puntoData.tieneAlmuerzo=tieneAlmuerzo ,
        this.puntoData.personal= this.IdsPersonal,
        this.puntoData.direccion=direccion,
        this.puntoData.tipo='Punto'


        this.task.forEach(data=>{


              const tarea={
                tarea:data,
                estado:false
              }
             this.taskTotal.push(tarea)
        })

        this.puntoData.tareas=this.taskTotal

        console.log(this.puntoData)

        const path='puntos'
        this.puntoData.idPunto=this.firestore.CreaId()

        this.firestore.createDoc(this.puntoData,path,this.puntoData.idPunto).then(
            (res:any)=>{

                      this.createAsiganacionPunto(this.puntoData.idPunto,this.IdsPersonal, this.puntoData.supervisorId)
                }
        ).catch(res=>{

                console.log('Fue error')
        });


  }
}

 //Crea la asignacion a Puntos
 createAsiganacionPunto(idPunto:any,IdsPersonal:any,idSupervisor:any){

  console.log(IdsPersonal)
  console.log(idPunto)
  console.log(idSupervisor)
  const path='AsignacionPunto'
  IdsPersonal.forEach((idEmpleado:any) => {
           const data={idPunto,idEmpleado,idSupervisor}
           this.firestore.createDoc(data,path,this.firestore.CreaId())
  });
        this.formRegister.reset();
        this.total1=[];
        this.task=[];
        this.task2=[];
        this.IdsPersonal=[];
        this.taskTotal=[]
        console.log(this.data)
        this.data=[]
        this.selectedFruits=[]

}

private formatData(data: string[]) {
  console.log(data)
  this.data = data;

  console.log(this.data)
  if (data.length === 1) {

    const fruit = this.personal.find((fruit:any) => fruit.Nombre === data[0]);
    return fruit?.text;
  }

  return `${data.length} items`;
}

 fruitSelectionChanged(fruits:any) {

      console.log(fruits);
      this.selectedFruits = fruits;
      console.log('this.selectedFruits',this.selectedFruits )
      this.modal.dismiss()
      this.selectedFruitsText = this.formatData(this.selectedFruits);
      console.log('this.selectedFruitsText',this.selectedFruitsText)
}

@ViewChild('modal', { static: false }) modal!: IonModal;

  //Asigna los arrays de Ids
  getIds(ids:any):any{

    this.IdsPersonal=ids
    console.log(this.IdsPersonal)
  }

  total(total:any){

       this.total1=total;
       console.log(this.total1)
  }

  mostrarInformacion(){

        this.informacionActiva = true;
        this.porHacerActivo = false;
        this.colorBoton = 'danger';
        this.activeButton = 'informacion'
  }

  mostrarPorHacer(){

        this.informacionActiva = false;
        this.porHacerActivo = true;
        this.activeButton = 'porHacer';

  }


  async presentAlert() {
    const alert = await this.alertController.create({

          header: 'Agregar tarea',
          inputs: [
            {
              name: 'tarea',
              type: 'text',
              placeholder: 'Ingrese una tarea',
            },


          ],

          buttons: [
            {
              text: 'Cancelar',
              role: 'cancel',
            },
            {
              text: 'OK',
              handler: (data) => {
                console.log('Valor ingresado:', data.tarea);
                this.tareas(data.tarea)
              },
            },

          ],

    });

    await alert.present();
  }

  tareas(tarea:any){

        if(tarea){

          this.task2=[...this.task2,tarea];
          this.task=this.task2
        }
        console.log(this.task2);
  }

  delete(tarea:any){

        console.log('La tarea que se borra ', tarea)

        let indexAEliminar = this.task2.indexOf(tarea);
        if (indexAEliminar !== -1) {
          this.task2.splice(indexAEliminar, 1);
          console.log( this.task2)
        }

        if(tarea){
            this.task=this.task2
        }

  }

  obtenerAgencias(uid:any){

      console.log('Ingreso a las agencias')
      const path='agencias';
      const parametro='supervisor';
      const condicion='==';

      console.log('el uid',this.uid)
       this.firestore.getCollectionQuery(path,parametro,condicion,uid).subscribe(
             res=>{
                  this.agencias=res
                   console.log(res)
            }
       )
  }
}
