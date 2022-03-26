import { Component, Renderer2, OnChanges, HostListener, ElementRef, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { CorridaService } from 'src/app/services/corrida.service';
import { OperarioService } from 'src/app/services/operario.service';
import { ToastrService } from 'ngx-toastr';
import { ConsumoMPriExtrusionService } from 'src/app/services/consumo-mpri-extrusion.service';
import * as $ from "jquery";
import {  ActivatedRoute } from '@angular/router';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  @Output() maquina = new EventEmitter();
  @Input() OperarioActulizarInicio: any;
  @Input() OperarioActulizarFinalizar: any;
  @Input() OrdenProduccion: any;
  @Input() ActualizarMenu: any;

  public ordenProduccion: any;
  isDisabled = false;
  corridaTipo: any;
  a: any = [];


  constructor(
    public _corridaService: CorridaService,
    private toastr: ToastrService,
    private route : ActivatedRoute, 
    private _operarioService: OperarioService,
    public _consumoMPriExtrusionService: ConsumoMPriExtrusionService,
    private renderer: Renderer2
  ) { 
    
    this.deleteCortina();

  }

  ngOnInit(): void {
    
    var primerContador = 0;
    var segundoContador = 0;
    var tercerContador = 0;
    
  }

  ngOnChanges(): void {

    var operarioCorridaExtrusionInicio: any = [];
    operarioCorridaExtrusionInicio.push(this._corridaService.OperarioCorridaExtrusionInicio);
  
    if (operarioCorridaExtrusionInicio[0].fechaInicial != undefined) {
      this.corridaIniciada = true
    }

    if (this._corridaService.DatosCorridaNoFinalizada.length > 0) {
      this.corridaIniciada = true
    }


    this.corridaTipo = this.route.snapshot.paramMap.get('proceso')?.toString();
    if (this.OrdenProduccion.length != 0) {
      this.ordenProduccion = this.OrdenProduccion[0].pk_OrdenProduccion; 
    }else{
      this.ordenProduccion = 0;
    }

    this.nuevoElemento = document.getElementsByClassName("mat-typography") as HTMLCollectionOf<HTMLElement>
    var nuevoElementoB = document.getElementsByClassName("offcanvas offcanvas-start line-menu show") as HTMLCollectionOf<HTMLElement>
    if (nuevoElementoB.length == 0) {
    
      this.nuevoElemento[0].style.cssText = "overflow: scroll;"

    }else{
     
    }

    if (this.nuevoElemento[0].style.cssText == "overflow: hidden" && nuevoElementoB.length == 1) {

      this.nuevoElemento[0].style.cssText = "overflow: hidden;"
    }
    
  }

  iniciarNuevaCorrida!: boolean | false;
  corridaIniciada!: boolean | false;
  finalizarCorrida!: boolean | false;

  iniciarNuevoConsumoMPriExtrusion!: boolean | false;
  mostrarConsumoMPriExtrusion!: boolean | false;
  iniciarVerMPriExtrusion!: boolean | false;
  iniciarEditarMPriExtrusion!: boolean | false;
  public nuevoElemento!: any;

  IniciarNuevaCorrida(){
    this.iniciarNuevaCorrida = true;
    var cortina = document.getElementsByClassName("cortina") as HTMLCollectionOf<HTMLElement>
    cortina[0].style.visibility = 'visible';
    cortina[0].style.opacity = '40%';
    cortina[0].style.zIndex = '1046';
    this.isDisabled = true;

    this.deleteCortina();

  }

  cerrarExtrusionInicio(entrada: any){
    this.iniciarNuevaCorrida = entrada
    this.deleteCortina();
  }

  activarFinalizarCorrida(entrada: any){
    this.corridaIniciada = entrada;
    this.deleteCortina();
  }

  enviarMaquina(entrada: any){
    this.maquina.emit(entrada);
    this.deleteCortina();
  }

  FinalizarCorrida(){
    this.finalizarCorrida = true;
    this.deleteCortina();

    var cortina = document.getElementsByClassName("cortina") as HTMLCollectionOf<HTMLElement>
    cortina[0].style.visibility = 'visible';
    cortina[0].style.opacity = '40%';
    cortina[0].style.zIndex = '1046';
    this.isDisabled = true;
  }

  cerrarExtrusionFinal(entrada: any){
    this.finalizarCorrida = entrada;
    this.deleteCortina();
  }

  IniciarNuevoConsumoMPriExtrusion(){
    this.iniciarNuevoConsumoMPriExtrusion = true;
    var cortina = document.getElementsByClassName("cortina") as HTMLCollectionOf<HTMLElement>
    cortina[0].style.visibility = 'visible';
    cortina[0].style.opacity = '40%';
    cortina[0].style.zIndex = '1046';
    this.isDisabled = true;
  }

  cerrarExtrusionConsumoMPriIngresar(entrada: any){
    this.iniciarNuevoConsumoMPriExtrusion = entrada;
  }

  MostrarConsumoMPriExtrusion(){
    this.mostrarConsumoMPriExtrusion = true;
    var cortina = document.getElementsByClassName("cortina") as HTMLCollectionOf<HTMLElement>
    cortina[0].style.visibility = 'visible';
    cortina[0].style.opacity = '40%';
    cortina[0].style.zIndex = '1046';
    this.isDisabled = true;
  }

  cerrarExtrusionMostrarConsumoMPriIngresar(entrada: any){
    this.mostrarConsumoMPriExtrusion = entrada;
  }

  MPriExtrusionEliminarMostrar(entrada: any){
    if (entrada == true) {
      this.iniciarVerMPriExtrusion = entrada;
    }
  }

  MPriSalidaEliminarMostrar_(entrada: any){
    if (entrada == false) {
      this.iniciarVerMPriExtrusion = entrada;
    }
  }

  MPriCorridaExtrusionMostrar(entrada: any){
    if (entrada == true) {
      this.iniciarEditarMPriExtrusion = entrada;
    }
  }

  MPriSalidaEditarMostrar_(entrada: any){
    if (entrada == false) {
      this.iniciarEditarMPriExtrusion = entrada;  
    }
  }

  deleteCortina(){
    this.renderer.listen('window', 'click',(e:Event)=>{
      var n = document.getElementsByClassName("offcanvas offcanvas-start line-menu") as HTMLCollectionOf<HTMLElement>

      try {
        if (n[0].style.cssText == "visibility: visible;" || n[0].style.cssText == "visibility: visible; z-index: 1045;") {
          const elementFade = document.getElementsByClassName("offcanvas-backdrop fade show");
          const elementOffCanvas = document.getElementById("offcanvasNavbar");	// Get element
          
          if (elementFade.length == 2) {
            elementFade[0].remove();
          }
        } 
      
      
        var nuevoElementoB = document.getElementsByClassName("offcanvas offcanvas-start line-menu show") as HTMLCollectionOf<HTMLElement>
        this.nuevoElemento = document.getElementsByClassName("mat-typography") as HTMLCollectionOf<HTMLElement>

        if (nuevoElementoB.length == 0) {
        
          setTimeout(() => {
            this.nuevoElemento[0].style.cssText = "overflow: scroll;"
          }, 300);

        }else{
         
        }

        if (this.nuevoElemento[0].style.cssText == "overflow: hidden" && nuevoElementoB.length == 1) {

          this.nuevoElemento[0].style.cssText = "overflow: hidden;"
        }

        if (nuevoElementoB.length == 1 && this.nuevoElemento[0].style.cssText == "overflow: scroll; padding-right: 17px;") {
          setTimeout(() => {
            this.nuevoElemento[0].style.cssText = "overflow: hidden; padding-right: 17px;"
          }, 300);
        }

      } catch (error) {
        
      }
    });
  }
}


