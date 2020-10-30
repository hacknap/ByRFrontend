import { Component, OnInit } from '@angular/core';
  import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
  import { PropertyService } from '../servicios/property.service';
  import { ToastrService } from 'ngx-toastr';
  import {PropertyList} from 'src/app/modelos/property-list.model';
  import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  public myform: FormGroup;
  public imageConfirm: boolean;
  listProperty = new PropertyList();
  category: number;
  constructor(public formBuilder: FormBuilder,
              public service: PropertyService,
               private toastr: ToastrService,
               private _routes:Router) { 
    this.imageConfirm = false;
  }

  ngOnInit(): void {  
    this.Role();
    this.myform = new FormGroup({
      busqueda : new FormControl('', [Validators.required]),
      precioDesde: new FormControl(0),       
      precioHasta: new FormControl(0), 
      tamaniodesde: new FormControl(0),       
      tamaniohasta: new FormControl(0),
      nbanios: new FormControl(0),
      ncuartos: new FormControl(0)
    });
  }

  Role(){
    var roleActual = localStorage.getItem('Role');    
    if(roleActual == 'comprador' )
    {
      return false;
    }
    else{
      return true;
    }
  }  
  
  buscarPropiedad(){
    var serch = this.myform.value.busqueda.toString(); 
    var preciodesde = this.myform.value.precioDesde;   
    var preciohasta = this.myform.value.precioHasta;
    var tamaniodesde2 = this.myform.value.tamaniodesde;
    var tamaniohasta2 = this.myform.value.tamaniohasta;
    var ncuartos2 = this.myform.value.ncuartos;
    var nbanios2 = this.myform.value.nbanios;
    
    if(tamaniodesde2==0){
      tamaniodesde2 = 0.0;
    }
    if(tamaniohasta2==0){
      tamaniohasta2 = 0.0;
    }
    if(preciodesde==0){
      preciodesde = 0.0;
    }
    if(preciohasta==0){
      preciohasta= 0.0;
    }
    if(ncuartos2==0){
      ncuartos2 = 0.0;
    }
    if(nbanios2==0){
      nbanios2 = 0.0;
    }
    
    
    this.service.serchProperties(serch,preciodesde,preciohasta,tamaniodesde2,tamaniohasta2,ncuartos2,nbanios2).subscribe(
      res => {    
        this.listProperty.Data = res.Data;            
        this.listProperty.TotalRows = res.TotalRows;           
        console.log(this.listProperty.Data);
        if(this.listProperty.TotalRows>0)
        {
        this.toastr.info('Busqueda exitosa', '');   
        this.imageConfirm = true;                        
        this.listProperty = res;
        this.ngOnInit();
        }
        else{
          this.toastr.error('Ups!', 'No se encontró ningun resultado para su búsqueda');          
          this.imageConfirm = false;
          this.ngOnInit();
        }
      },
      err=>{
        console.log(err);
        this.toastr.error('Ups!', 'No se encontró ningun resultado para su búsqueda'); 
      });
  }
  
  getConfirmSerch(){
    if(this.imageConfirm==true)
      {
        return true;
      }
      else{
        return false;
      }
  }


  getPropertyDetail(id){
    console.log(id);
    localStorage.setItem('propertyId',id);    
    this._routes.navigate(['/propiedadDetalle']);
  }

}