import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {


  loading:any

  constructor(private toastController: ToastController,private loadingCtrl: LoadingController) { }

  async presentToast(position: 'top' | 'middle' | 'bottom',mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000,
      position: position,
      color: 'primary',

    });

    await toast.present();
  }

  async showLoading(guard:string,duration?:number) {
    this.loading = await this.loadingCtrl.create({
      message: guard,
      duration: duration,
    });

    this.loading.present();
    const{role,data}=await this.loading.onDidDismiss()
  }

  async closeLoading( ) {
     await this.loading.dismiss()
  }
}
