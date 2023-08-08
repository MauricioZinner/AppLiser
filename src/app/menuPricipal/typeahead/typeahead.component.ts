import { Component, Input, Output, EventEmitter } from '@angular/core';
import type { OnInit } from '@angular/core';
import { every } from 'rxjs';
//import { Item } from 'src/app/models/models';
import { CrearPuntoPageRoutingModule } from '../../page/crear-punto/crear-punto-routing.module';
@Component({
  selector: 'app-typeahead',
  templateUrl: './typeahead.component.html',
  styleUrls: ['./typeahead.component.scss'],
})
export class TypeaheadComponent  implements OnInit {

  @Input() items:any = [];
  @Input() selectedItems: any = [];
  @Input() title = 'Select Items';
  @Input() total2:any[]=[]
  @Input() ids:any

  @Output() selectionCancel = new EventEmitter<void>();
  @Output() selectionChange = new EventEmitter<string[]>();
  @Output() selectionChangeId = new EventEmitter<string[]>();
  @Output() selectiontotal = new EventEmitter<string[]>();
  @Output() cerrar = new EventEmitter<string[]>();

  filteredItems: any;
  personalSeleccionado: any[] = [];
  personalSelectedIds: any[] = [];
  total:any[]=[]


  ngOnInit() {

        console.log(this.selectedItems);
        this.filteredItems = [...this.items];
        console.log( this.filteredItems);
        this.personalSeleccionado = [...this.selectedItems];
        this.personalSelectedIds=[... this.ids]
        console.log(this.personalSeleccionado);
        console.log('this.total2  ',this.total2);
        if(this.total2){

              this.total=this.total2;
        }
  }



   isChecked(value: string) {

        console.log('Entro al isChecked')
        console.log('this.total',this.total)
        console.log(value)
        if(this.total){
          return this.total.find((item) => item === value);
        }



  }

  searchbarInput(ev:any) {
        console.log('Al aplastar en el buscador , searchbarInput()');
        this.filterList(ev.target.value);
  }




  checkboxChange(ev:any) {

          console.log(ev);
          console.log('Al hacer check, checkboxChange() ');
          const { checked, value } = ev.detail;
          console.log('checked: ',checked, 'value: ',value );
          const values =value.split(',');
          console.log('Values: ' + values)
          const uid = values[0];
          console.log('uid: ' + uid)
          const nombre = values[1];
          console.log('otroValor: ' + nombre)

          if (checked) {

               this.total=[... this.total,value];
               console.log(this.total)
               this.personalSeleccionado = [...this.personalSeleccionado, nombre];
               this.personalSelectedIds = [...this.personalSelectedIds, uid];
               console.log(this.personalSeleccionado);
               console.log(this.personalSelectedIds)
          } else {

                let indexAEliminar = this.personalSeleccionado.indexOf(nombre);
                if (indexAEliminar !== -1) {
                  this.personalSeleccionado.splice(indexAEliminar, 1);
                  console.log( this.personalSeleccionado)
                }

                let indexIUid = this.personalSelectedIds.indexOf(uid);
                if (indexIUid !== -1) {
                  this.personalSelectedIds.splice(indexIUid, 1);
                  console.log( this.personalSelectedIds)
                }

                let indextotal= this.total.indexOf(value);
                if (indextotal !== -1) {
                  this.total.splice(indextotal, 1);
                  console.log( this.total)
                }

          }
  }


  filterList(searchQuery: any) {

    console.log(searchQuery);
    console.log('al aplastar en el buscador , filterList()');
      if (searchQuery === undefined) {
          console.log('no entro')
          this.filteredItems = [...this.items];
      } else {

          const normalizedQuery = searchQuery.toLowerCase();
          this.filteredItems = this.items.filter((item:any) => {
                  console.log(item);
                  console.log(this.filteredItems);

                  console.log(item.Nombre.toLowerCase().includes(normalizedQuery))
                  return item.Nombre.toLowerCase().includes(normalizedQuery);
          });
      }
  }



  cancelChanges() {
          console.log('Al aplastar en cancelar');
          this.selectionCancel.emit();
  }

  confirmChanges() {
          console.log('Al aplastar en asignar');
          this.selectionChange.emit(this.personalSeleccionado);
          this.selectionChangeId.emit(this.personalSelectedIds)
          this.selectiontotal.emit(this.total)
        //
  }

}
