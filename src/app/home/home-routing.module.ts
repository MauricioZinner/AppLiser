import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';


const routes: Routes = [
  {
    path: 'home',
    component: HomePage,
    children: [
      {
        path: 'inicio',
        loadChildren: () => import('../page/inicio/inicio.module').then( m => m.InicioPageModule)
      },
      {
        path: '',
        redirectTo: 'home/inicio',
        pathMatch: 'full'
      },
      {
        path: 'tareas',
        loadChildren: () => import('../page/tareas/tareas.module').then( m => m.TareasPageModule)
      },
      {
        path: 'insumos',
        loadChildren: () => import('../page/insumos/insumos.module').then( m => m.InsumosPageModule)
      },
      {
        path: 'uniformes',
        loadChildren: () => import('../page/uniformes/uniformes.module').then( m => m.UniformesPageModule)
      },
      {
        path: 'capacitaciones',
        loadChildren: () => import('../page/capacitaciones/capacitaciones.module').then( m => m.CapacitacionesPageModule)
      },
      {
        path: 'rol',
        loadChildren: () => import('../page/rol/rol.module').then( m => m.RolPageModule)
      },

      {
        path: 'punto',
        loadChildren: () => import('../page/punto/punto.module').then( m => m.PuntoPageModule)
      },
      {
        path: 'detalle-punto',
        loadChildren: () => import('../page/detalle-punto/detalle-punto.module').then( m => m.DetallePuntoPageModule)
      },
      {
        path: 'detalle-solicitud-servicio',
        loadChildren: () => import('../page/detalle-solicitud-servicio/detalle-solicitud-servicio.module').then( m => m.DetalleSolicitudServicioPageModule)
      },
      {
        path: 'insumo-supervisor',
        loadChildren: () => import('../page/insumo-supervisor/insumo-supervisor.module').then( m => m.InsumoSupervisorPageModule)
      },
      {
        path: 'personal',
        loadChildren: () => import('../page/personal/personal.module').then( m => m.PersonalPageModule)
      },
      {
        path: 'crear-punto',
        loadChildren: () => import('../page/crear-punto/crear-punto.module').then( m => m.CrearPuntoPageModule)
      },
      {
        path: 'crear-solicitud-servicio',
        loadChildren: () => import('../page/crear-solicitud-servicio/crear-solicitud-servicio.module').then( m => m.CrearSolicitudServicioPageModule)
      },
      {
        path: 'asignar',
        loadChildren: () => import('../page/asignaciones/asignaciones.module').then( m => m.AsignacionesPageModule)
      },

      {
        path: 'maps',
        loadChildren: () => import('../page/maps/maps.module').then( m => m.MapsPageModule)
      }

    ]
  },
  {
    path: '',
    redirectTo: 'home/inicio',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
