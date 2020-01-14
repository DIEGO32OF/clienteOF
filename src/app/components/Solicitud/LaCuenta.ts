import {Component, OnInit} from '@angular/core';
import {Routes, ActivatedRoute, Params} from '@angular/router';
import {GetService} from '../../Services/primerRequest';
import {local} from '../../models/local';


declare var $:any;

@Component({
selector:'LaCuenta',
templateUrl:'./LaCuenta.html',
providers:[GetService],
})


export class LaCuentaComponent implements OnInit {

  final_data: any[]=[];
  comandaSucia: any[]=[];
  final_datas: any[]=[];
  Mesa:Number=0;
  locaOrdenar:string='';
  locaCuenta:string='';
  locaComanda:string='';
  locaTermino:string='';
  reservation: string = '';
  CountComandaL:number=0;
  CountFinishL:number=0;
  myTokenMesaje: string = '';
  iscode: boolean = false;
  neddcode: boolean = false;
  idsqlLocal : string = '';

  constructor(private activatedRoute: ActivatedRoute, private _getService:GetService){

    

  }

  ngOnInit(){
    this.activatedRoute.params.subscribe((params: Params) => {
      let tipo = params['typer'];
      let local = params['Esta'];





      let token = this._getService.getCookie('verificaexpired');// params['Toke']; //this._getService.getCookie('verificaexpired');

      if (token != null) {
        token = atob(token);//.replace('_', '.').replace('_', '.');

        //  this._getService.validaToken(token).subscribe(
        //    response => {
        
        var localescook = token.split('||');
        
        if (localescook[0].replace('"', '').replace('"', '') == tipo && localescook[1].replace('"', '').replace('"', '') == local) {

          if (tipo && local) {

            this.locaOrdenar = '/Ordenar/dnE6XnhrjrU_/' + local;
            this.locaCuenta = '/LaCuenta/dnE6XnhrjrU_/' + local;
            this.locaComanda = '/Comandas/dnE6XnhrjrU_/' + local;
            this.locaTermino = '/TerminadosCocina/dnE6XnhrjrU_/' + local;
            this.reservation = '/Reservaciones/dnE6XnhrjrU_/' + local;

            var myfec = new Date();
            var fecha = this.formatoDate(myfec, '');

            this._getService.signUp(tipo, local, fecha.replace('/', '|').replace('/', '|').replace('/', '|').replace(':', '-').replace(':', '-').replace(':', '-').replace(' ', '_')).subscribe(
              respuestada => {
                this.neddcode = respuestada.local.id_Menu.need_Code;
                this.idsqlLocal = respuestada.local.id_SQL;
              });

           // this._getService.getServicioDomi(local, '').subscribe(respServicio => {

              this._getService.getCUenta(local, '0', fecha.replace('/', '|').replace('/', '|').replace(':', '-').replace(' ', '_')).subscribe(res => {

                this.final_data = res.comanda;
                this.final_data.forEach((dat) => {
                  if (dat.mesa > 0 && dat.mesa != undefined)
                    this.iscode = true;
                  dat.platillos.forEach((mesaSelected) => {
                    //if(this.Mesa!=mesaSelected.Mesa)
                    this.Mesa = mesaSelected.Mesa;
                  });
                  this.final_datas.push({
                    fecha: +dat.fecha_Entrega.replace(' ', '').replace(':', '').replace('/', '').replace('/', ''),
                    id: dat._id,
                    Mesa: this.Mesa
                  });

                });
                //  this.final_datas.sort(function (a, b) { return a.fecha - b.fecha });
                this.final_datas.sort(function (a, b) { return b.fecha - a.fecha });

              })

           // });
              this._getService.getComandas(local).subscribe(data => {

                this.CountComandaL = 0;
                this.CountFinishL = 0;
                data.forEach((childSnapshot) => {

                  this._getService.ComandasGetCode(local, childSnapshot.$key).subscribe(snap => {

                    if (snap[0] != undefined) {
                      if ((snap[0].Estatus == '0' || snap[0].Estatus == '1' || snap[0].Estatus == '') && snap[0].isCode != undefined) {
                        //  if(childSnapshot.Mesa!=undefined)
                        this.CountComandaL += +1;

                      }
                    }
                  });
                  if (childSnapshot.Estatus == '4') {

                    this.CountFinishL += +1;
                  }
                  if (childSnapshot.callMesero != undefined) {
                    if (childSnapshot.callMesero)
                      this.CountFinishL += +1;
                  }

                })
              })
           
          }
          else {
            // fallo el token o expiro
            this.myTokenMesaje = 'La sesion expiro; Debe de abrir esta pantalla desde su panel de control';
          }
        }
        //  });
      }
      else {
        //no hay token
        this.myTokenMesaje = 'La sesion expiro; Debe de abrir esta pantalla desde su panel de control';
        
      }

    });
  }

btnBuscar_click(){

  var Code=(<HTMLInputElement>document.getElementById('txtCodesearch')).value;
  if(Code!='')
  {

    //(<HTMLElement>document.getElementById('contieneAll')).innerHTML='';
    this.final_data=[];
    this.final_datas=[];
    this.activatedRoute.params.subscribe((params: Params) => {
      let local = params['Esta'];

    this._getService.GetComandByCode(Code.toUpperCase(),local).subscribe(respuesta=>{
      this.final_data=[respuesta.ComandFounder];

      this.final_data.forEach((dat)=>{
        
        this.final_datas.push({
          fecha:+dat.fecha_Entrega.replace(' ','').replace(':','').replace('/','').replace('/',''),
          id:dat._id
        });
      });
    //  this.final_datas.sort(function(a, b){return a.fecha - b.fecha});
        this.final_datas.sort(function(a, b) { return b.fecha - a.fecha });
      

    });
});
}
}

btnBuscar_clickMesa(){

  var Mesa=(<HTMLInputElement>document.getElementById('txtmesaSearch')).value;
  if(Mesa!='')
  {

    //(<HTMLElement>document.getElementById('contieneAll')).innerHTML='';
    this.final_data=[];
    this.final_datas=[];
    this.activatedRoute.params.subscribe((params: Params) => {
      let local = params['Esta'];
        
      this._getService.GetComandByTable(Mesa,local).subscribe(respuesta=>{
        this.final_data = respuesta.ComandFounder;
       
        
        this.final_data.forEach((dat) => {
          if (dat.fecha_Entrega != undefined) {
            this.final_datas.push({
              fecha: +dat.fecha_Entrega.replace(' ', '').replace(':', '').replace('/', '').replace('/', ''),
              id: dat._id
            });
         }
      });
        this.final_datas.sort(function (a, b) { return b.fecha - a.fecha });
        
      

    });
});
}

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
var myfec=[day,month,year ].join('/')+' '+hour+':'+minute;

 return myfec;
}


getSum(code):number{
	 let sum = 0;

	 this.final_data.forEach(model => {
      
     if(code==model.codigoStr){
     model.platillos.forEach(prec=>{

       if(prec.costo!=undefined && +prec.Estatus!=6 && +prec.Estatus!=3 )
       sum += +prec.costo;
     });
}
	 });
	 return sum;
 }


 getSumado(code):number{
 	 let sum = 0;

 	 this.final_data.forEach(model => {
          
      if(code==model[0].codigoStr){
      model[0].platillos.forEach(prec=>{

        if(prec.costo!=undefined && +prec.Estatus!=6 && +prec.Estatus!=3 )
        sum += +prec.costo;
      });
 }
 	 });
 	 return sum;
  }

  Imprime(comanda, id){

    this.activatedRoute.params.subscribe((params: Params) => {
      let tipo = params['typer'];
      let local = params['Esta'];

      var myfechoria = new Date();
    var fecha = this.formatoDate(myfechoria, '');
      this._getService.signUp(tipo,local, fecha.replace('/', '|').replace('/', '|').replace('/', '|').replace(':', '-').replace(':', '-').replace(':', '-').replace(' ', '_')).subscribe(
    respuestada=>{
      var innerContents = document.getElementById(id).innerHTML;
      
          var popupWinindow = window.open('', '_blank', 'width=800,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
          popupWinindow.document.open();
      popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()"><div style="text-align:center"><h2>'+respuestada.local.Nombre+'</h2><hr><span><small>Dirección: '+respuestada.local.Domicilio+'</small></span><h6>'+fecha+
      '</h6></div><p></p>'+innerContents+'</body></html>');
          popupWinindow.document.close();

        });
        });
  }

  PayComand(comanda) {



   this.activatedRoute.params.subscribe((params: Params) => {
     let tipo = params['typer'];
     let local = params['Esta'];


  
     var sihayAun = '';
     for (var e = 0; e < comanda.platillos.length; e++) {
       if (comanda.platillos[e].Estatus == "")
         sihayAun = comanda.platillos[e].Platillo;
     }

     let confirmo = false;

      
     if (sihayAun != '')
       confirmo = confirm("El Platillo: " + sihayAun+" Aun no ha sido entregado desea continuar?");
       else
         confirmo = true;

     if (confirmo) {      
       this._getService.entregacomandFinish(local, comanda.codigoStr, '11');

       
     var myfechoria = new Date();
     var fecha = this.formatoDate(myfechoria, '');
   
         
       if (this.neddcode) {
         this._getService.ValidaCode(comanda.codigoStr.toUpperCase(), this.idsqlLocal).subscribe(
           response => {
             
             if (response.coderFound == null && !comanda.Allevar && comanda.Mesa>0) {
                 
                 $('#alertBadCode').show();
                 return;
               }
               else {
               //console.log('valida code');
               if (response.coderFound != null) {
                 (<HTMLInputElement>document.getElementById(comanda.codigoStr+'btn_')).style.visibility = 'hidden';
                 this._getService.payComanda(response.coderFound._id, comanda._id).subscribe(responde => {

                   this.Imprime(comanda, comanda.codigoStr + '_Ticket');
                 });
               }
               else {
                 (<HTMLInputElement>document.getElementById(comanda.codigoStr)).style.visibility = 'hidden';
                 this._getService.payComanda('', comanda._id).subscribe(responde => {

                   this.Imprime(comanda, comanda.codigoStr + '_Ticket');
                 });
               }
               }
               //}
             });
         }
         else {
           (<HTMLInputElement>document.getElementById(comanda.codigoStr)).style.visibility = 'hidden';
           //this._getService.payComanda('', comanda._id).subscribe(responde => {
             
            
           //});
         }
      // });
       this._getService.declineComand(local, comanda.codigoStr);
      // this.ngOnInit();
   }
});
 }

}
