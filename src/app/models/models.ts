

export interface register{

  Nombre: string|null;
  Apellido: string|null;
  email: string|null;
  password: string|null;
  ConfirmarPassword: string|null;
  uid: string;
  perfil:"empleado"|"supervisor"|"administrador";
  auxiliares?:any[]

}

export interface Item {
  text: string;
  v: string;
}

export interface Auxiliares{

  auxiliares:any[]
}

export interface solicitudService {
  Nombre: string | null;
  fechaInicio: Date | null;
  fechaFin: Date | null;
  horaEntrada: Date | null;
  horaSalida: Date | null;
  horaAlmuerzoInicio: Date | null;
  horaAlmuerzoFin: Date | null;
  tieneAlmuerzo: boolean;
  personal: any[];
  direccion: string;
  contacto: string | null;
  telefono: number | null;
  email: string | null;
  observaciones: string;
  supervisorId:string
}

export interface Marker {
  position: {
    lat: number,
    lng: number,
  };
  title: string;
}

export interface agencias {
  nombreAgencia: string | null;
  latitud: number| null;
  longitud: number | null;
  supervisor: string | null;
  direccion: string | null;
  idAgencia: string | undefined

}

export interface task{

    title:string;
    id:string
    completed:boolean
}
