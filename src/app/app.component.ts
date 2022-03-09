import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { v4 as uuid } from 'uuid';
//import {http2  } from Http2ServerResponse;
import { Vuelo } from './vuelo';
import { VueloService } from './vuelo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html', 
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{

  public vuelos: Vuelo[] = [];
  public editVuelo!: Vuelo | null;
  public deleteVuelo!: Vuelo | null;

  ngOnInit(): void {
      this.getVuelos();
  }

  constructor(private vuelosService: VueloService) { }

  public getVuelos(): void{
    this.vuelosService.getVuelos().subscribe(
      (response: Vuelo[]) =>
      {this.vuelos = response;
      
      },
      (error: HttpErrorResponse) =>
      alert(error.message)
    );
  }

  public onAddVuelo(addForm:NgForm):void{
    document.getElementById('add-employee-form')?.click();
    this.vuelosService.addEmployee(addForm.value).subscribe(
      (response : Vuelo) => {
        console.log(response);
        this.getVuelos();
        addForm.reset();
      },
      (error : HttpErrorResponse)=> {
        alert(error.message);
        addForm.reset();
      }
    );
  }
  public onUpdateVuelo(vuelo:Vuelo):void{
    document.getElementById('add-employee-form')?.click();
    this.vuelosService.updateEmployee(vuelo).subscribe(
      (response : Vuelo) => {
        console.log(response);
        this.getVuelos();
      },
      (error : HttpErrorResponse)=> {
        alert(error.message)
      }
    );
  }
  public onDeleteVuelo(vuelo:Vuelo|null):void{
    if(vuelo !== null)
    {this.vuelosService.deleteEmployee(vuelo.idVuelo).subscribe(
      (response : void) => {
        console.log(response);
        this.getVuelos();
      },
      (error : HttpErrorResponse)=> {
        alert(error.message)
      }
    );}
  }

  public searchVuelos(key : string):void{
    console.log(key)
    const results : Vuelo[] = [];
    for (const vuelo of this.vuelos){
      if(vuelo.destino.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || vuelo.origen.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || vuelo.piloto.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || vuelo.idVuelo.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(vuelo);
      }
    }
    this.vuelos = results;
    if (results.length === 0 || !key){
      this.getVuelos();
    }
  }

  public onOpenModal(vuelo: Vuelo | null, mode: string):void{
    const container = document.getElementById('main-container')
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if(mode === 'add' ){
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    if(mode === 'edit' ){
      this.editVuelo = vuelo;
      button.setAttribute('data-target', '#updateEmployeeModal');
    }
    if(mode === 'delete' ){
      this.deleteVuelo = vuelo;
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }
    container?.appendChild(button);
    button.click();
    
  }

  title = 'vuelosapp';
}
