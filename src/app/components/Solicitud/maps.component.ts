import { Component, OnInit } from '@angular/core';
import { Routes, ActivatedRoute, Params } from '@angular/router';
import { GetService } from '../../Services/primerRequest';
import { HaversineService } from "ng2-haversine";
import { MapsAPILoader, MouseEvent } from '@agm/core';
//import { } from '@types/googlemaps';
//import { Observable } from 'rxjs/Observable';


declare var $:any;

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css'],
  providers: [GetService],
})
export class MapsComponent implements OnInit {

  public recomendaciones: any[];
  lats: number = 19.634991;
  lngs: number = -99.1354413;
  public idHas: string = '';
  public titulo: string = '';
  public location = {};
  

  constructor(private activatedRoute: ActivatedRoute, private _getService: GetService, private _haversineService: HaversineService, private mapsAPILoader: MapsAPILoader,) {
    
    this.activatedRoute.params.subscribe((params: Params) => {
      let tipo = params['typer'];
      let local = params['Esta'];
      
      var myfechoria = new Date();
      var fecha = this.formatoDate(myfechoria, '');
      this._getService.signUp(tipo, local, fecha.replace('/', '|').replace('/', '|').replace('/', '|').replace(':', '-').replace(':', '-').replace(':', '-').replace(' ', '_')).subscribe(
        response => {

          if (response.local) {
            this.lats = response.local.lat;
            this.lngs = response.local.lng;
            this.recomendaciones = [];
            this.idHas = response.local.id_Hashed;
            this.titulo = response.local.Nombre;
           

            let actual = {
              latitude: this.lats,
              longitude: this.lngs
            };

            this._getService.damelosactivos(this.lats, this.lngs).subscribe(respuesta => {
              

              var arreglo = respuesta.Locals;              
              for (var i = 0; i < arreglo.length; i++) {
                                                          
                      arreglo[i].lat = +arreglo[i].lat;
                      arreglo[i].lng = +arreglo[i].lng;
                      this.recomendaciones = respuesta.Locals                                                        
              }              

            });
            return this.recomendaciones;
          }

        });
    });
    document.body.scrollTop = 0;
  }

  ngOnInit() {
  
  }

  formatoDate(date, hora) {
    var d = new Date(date),//date.replace("GMT+0000","").replace("GMT+0100","")),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear(),

      hour = '' + d.getHours(),
      minute = '' + d.getMinutes();


    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    if (hour.length < 2) hour = '0' + hour;
    if (minute.length < 2) minute = '0' + minute;

    if (hora != '') {
      hour = hora;
      minute = '00';
    }

    var myfec = [year, month, day].join('/') + ' ' + hour + ':' + minute;

    return myfec;
  }

  openReserve(idLocal){
    $('#mymodalReserve').modal('show'); 
  }

  GetCercas() {
    
    if (navigator.geolocation) {
      this.recomendaciones = [];
      
      navigator.geolocation.getCurrentPosition(position => {


        var latLnCurrency = position.coords.latitude + ',' + position.coords.longitude;
        //alert(latLnCurrency);
       

        let actual = {
          latitude: +position.coords.latitude,
          longitude: +position.coords.longitude
        };
        
        this.lats = +position.coords.latitude;
        this.lngs = +position.coords.longitude;

        this.idHas = '';
        this.titulo = '';

         this._getService.damelosactivos(this.lats, this.lngs).subscribe(respuesta => {
          

           var arreglo = respuesta.Locals;           

           for (var i = 0; i < arreglo.length; i++) {
            if (arreglo[i].lat != undefined) {
              if (arreglo[i].lat != "") {
                arreglo[i].lat = +arreglo[i].lat;
                arreglo[i].lng = +arreglo[i].lng;

                this.recomendaciones.push(arreglo[i])
               }
              }
            }         
        });
      });
      
    }

  }

}