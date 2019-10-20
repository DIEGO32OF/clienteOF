import {Component, OnInit} from '@angular/core';
import {Routes, ActivatedRoute, Params} from '@angular/router';
import {GetService} from '../../Services/primerRequest';
import {local} from '../../models/local';
import { HaversineService } from "ng2-haversine";


declare var $:any;

//declare var myExtObject: any;

@Component({
selector:'ofpage',
templateUrl:'./ofpage.html',
providers:[GetService],
//styleUrls:['../../assets/css/animate-custom.css'
//,'../../assets/css/styles.css'],
 // ViewEncapsulation.None,
 //directives:[Routes]
})

export class ofpageComponent implements OnInit {
    public LoNuevo;
    	public recomendaciones: any [];
      public tipoLocal;
      public idLocalhash;
      public location = {};

  constructor(private activatedRoute: ActivatedRoute, private _getService:GetService, private _haversineService: HaversineService)
	{
    this.tipoLocal='';
        this.idLocalhash = '';
  }


  formatoDate(date, hora) {
  	 var d = new Date(date),//date.replace("GMT+0000","").replace("GMT+0100","")),
  			 month = '' + (d.getMonth() + 1),
  			 day = '' + d.getDate(),
  			 year = d.getFullYear(),

         hour= '' +d.getHours(),
         minute='' +d.getMinutes();


  	 if (month.length < 2) month = '0' + month;
  	 if (day.length < 2) day = '0' + day;
     if (hour.length < 2) hour = '0' + hour;
     if (minute.length < 2) minute = '0' + minute;

  	 if(hora!=''){
  	hour=hora;
  	minute='00';
  }
  var myfec=[year,month,day ].join('/')+' '+hour+':'+minute;
  
   return myfec;
  }

  ngOnInit(){
    this.activatedRoute.params.subscribe((params: Params) => {
      let tipo = params['typer'];
      let local = params['Esta'];
      if (tipo != undefined) {
        this.idLocalhash = local;
        this.tipoLocal = tipo;
      }
      else {
        this.idLocalhash = 'prove';
        this.tipoLocal = 'prove';
      }
      var myfechoria = new Date();
      var fecha = this.formatoDate(myfechoria, '');
      if (tipo && local) {


        this._getService.signUp(tipo, local, fecha.replace('/', '|').replace('/', '|').replace('/', '|').replace(':', '-').replace(':', '-').replace(':', '-').replace(' ', '_')).subscribe(
          response => {

            if (local.includes('_redirect')) {
              $('#alerterrorRec').hide();
              //$("#altodeltitulo").css("height", 100);
              this.idLocalhash = this.idLocalhash.replace('_redirect', '');
            }
            this.LoNuevo = 'Lo más Nuevo';
            this.recomendaciones = response.firtsSix;
          });
      }
      else {
         
        this._getService.signUp('dnE6XnhrjrU_', 'U_', fecha.replace('/', '|').replace('/', '|').replace('/', '|').replace(':', '-').replace(':', '-').replace(':', '-').replace(' ', '_')).subscribe(
          response => {

            
              $('#alerterrorRec').hide();
              //$("#altodeltitulo").css("height", 100);
            
            this.LoNuevo = 'Lo más Nuevo';
            this.recomendaciones = response.firtsSix;
          });
      }
    });
    document.body.scrollTop = 0;
}

ShowOptins(){
  document.getElementById('OptionsSearch').style.visibility = "visible";
  document.getElementById('appnose').style.visibility = "hidden";
}

deseleccionaUno(valueChec) {
    if( valueChec==1) {
      (<HTMLInputElement>document.getElementById('xComilona')).checked=false;
    }
    else
      (<HTMLInputElement>document.getElementById('xNomLugar')).checked = false;
  }

  CierraAlerts(nombre) {
    
    $("#" + nombre).hide()
  }

SUscribeNews_CLic(){
  
    var lugar = (<HTMLInputElement>document.getElementById('txtfood')).value;
    if (lugar != '') {
      var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

      if (!format.test(lugar)) {
        var tipo = 0;
        var xNomlugar = (<HTMLInputElement>document.getElementById('xNomLugar'));
        if (xNomlugar.checked) {
          tipo = 1;
        }
        else {
          var xcomida = (<HTMLInputElement>document.getElementById('xComilona'));
          if (xcomida.checked) {
            // por comida
            //this._getService.GetTypeSeaarch(2, lugar);
            tipo = 2;
          }
        }
        if (tipo != 0) {
          
          this._getService.GetTypeSeaarch(tipo, lugar).subscribe(
            response => {
              
            if (response.buscados != undefined) {
              if (response.buscados.length > 0) {
                this.recomendaciones = null;
                  document.getElementById('msjNoVa').style.visibility = "hidden";
                  $("html, body").delay(100).animate({ scrollTop: $('#appnose').offset().top }, 2000);
                  this.LoNuevo = 'Resultados de la Busqueda';
                  this.recomendaciones = response.buscados;

                }
                else {
                  $('#alertNoResults').show();
                $("html, body").delay(100).animate({ scrollTop: $('#btnsearch').offset().top }, 2000);
                                    
                                  }

                                }
                                else {
                                  $('#alertNoResults').show();
              $("html, body").delay(100).animate({ scrollTop: $('#btnsearch').offset().top }, 2000);
                                }
            });
        }
      }
      else {
        document.getElementById('msjNoVa').style.visibility = "visible";
      }

  }
  }

  GetCercas() {
       if (navigator.geolocation) {
          this.recomendaciones = [];
         navigator.geolocation.getCurrentPosition(position => {
           this.location = position.coords;

           var latLnCurrency = position.coords.latitude + ',' + position.coords.longitude;
           
           let actual = {
             latitude: position.coords.latitude,
             longitude: position.coords.longitude
           };

           this._getService.damelosactivos().subscribe(respuesta => {
             //respuesta.forEach((localinescerca) => {

                var arreglo = respuesta.Searching;
                
                //var arrayArreglo = new Array();
                for (var i = 0; i < arreglo.length; i++) {
                  if (arreglo[i].lat != undefined) {
                    if (arreglo[i].lat != "") {
                   let bilbao = {
                        latitude: arreglo[i].lat,
                        longitude: arreglo[i].lng
                   };
                   let meters = this._haversineService.getDistanceInMeters(bilbao, actual);

                   
                   if (meters < 8000) {
                        
                        this.recomendaciones.push(arreglo[i]);
                       // arrayArreglo.push(arreglo[i]);
                   }
                 }
               }
                }//);
                if (this.recomendaciones.length > 0) {  
                    $("html, body").delay(100).animate({ scrollTop: $('#appnose').offset().top }, 2000);
                    this.LoNuevo = 'Resultados de la Busqueda';
                  }
                  else
                    $('#alertNoResults').show();

           });

         });
       }

     }


 mostrarUbicacion(p) {
   var latLnCurrency = p.coords.latitude + ',' + p.coords.longitude;
   
   //let actual = {
   //  latitude: latLnCurrency.Coordinates.latitude,
   //  longitude: datos.lng
   //};
   //// va x todas las lats y va comparando quien si quien no y sacas un listado
   //let meters = this._haversineService.getDistanceInMeters(bilbao, actual);
    }
}
