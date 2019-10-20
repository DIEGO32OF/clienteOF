import {Component, OnInit,Pipe} from '@angular/core';
import {Routes, ActivatedRoute, Params} from '@angular/router';
import {GetService} from '../../Services/primerRequest';
import { Observable } from 'rxjs';
//import {TabsModule} from "ng2-tabs";

declare var $:any;

@Component({
selector:'FinishCocina',
templateUrl:'./FinishCocina.html',
providers:[GetService]
})

export class FinishCocinaComponent implements OnInit
 {

MyComanda:boolean;
final_data: any[]=[];
order: any[]=[];
final_datas: any[]=[];
keys: string[];
llave:string;
locaOrdenar:string='';
locaCuenta:string='';
locaComanda:string='';
locaTermino:string='';
CountComanda:number=0;
CountFinish:number=0;
  myTokenMesaje: string = '';
  neddcode: boolean = false;
  idsqlLocal: string = '';
  Service_dom: any[] = [];


constructor(private activatedRoute: ActivatedRoute, private _getService:GetService)
{
  this.activatedRoute.params.subscribe((params: Params) => {
    let tipo = params['typer'];
    let local = params['Esta'];

    let token = this._getService.getCookie('verificaexpired');// params['Toke']; //this._getService.getCookie('verificaexpired');

    if (token != null) {
      token = atob(token);//.replace('_', '.').replace('_', '.');

      //  this._getService.validaToken(token).subscribe(
      //    response => {
      //      console.log(response);
      var localescook = token.split('||');

      if (localescook[0].replace('"', '') == tipo && localescook[1].replace('"', '') == local) {

        if (tipo && local) {
          this.locaOrdenar = '/Ordenar/dnE6XnhrjrU_/' + local;
          this.locaCuenta = '/LaCuenta/dnE6XnhrjrU_/' + local;
          this.locaComanda = '/Comandas/dnE6XnhrjrU_/' + local;
          this.locaTermino = '/TerminadosCocina/dnE6XnhrjrU_/' + local;
          this.final_data = [];
          this.keys = [];
          var date_ = new Date();
          let month = '' + (date_.getMonth() + 1);
          let day = '' + date_.getDate();
          let year = date_.getFullYear();
          let hour = date_.getHours();
          let minute = date_.getMinutes().toString();
          this.Service_dom = [];

          if (minute.length < 2) minute = '0' + minute;
          if (month.length < 2) month = '0' + month;
          if (day.length < 2) day = '0' + day;

          var fechaSolicitado = [day, month, year].join('/') + ' ' + hour + minute;
          var solodia = fechaSolicitado.split(' ');


          this._getService.signUp(tipo, local, fechaSolicitado.replace('/', '|').replace('/', '|').replace('/', '|').replace(':', '-').replace(':', '-').replace(':', '-').replace(' ', '_')).subscribe(
            respuestada => {
              this.neddcode = respuestada.local.id_Menu.need_Code;
              this.idsqlLocal = respuestada.local.id_SQL;
            });

          this._getService.getServicioDomi(local, '').subscribe(respServicio => {

          this._getService.getComandas(local).subscribe(data => {
            this.CountComanda = 0;
            this.CountFinish = 0;
            this.final_data = [];
            this.final_datas = [];
            this.Service_dom = [];
            this.order = [];
            if (respServicio.ServiceFounder != null) {
              this.Service_dom = respServicio.ServiceFounder;
            }

            data.forEach((childSnapshot) => {


              if (childSnapshot.Estatus == '4') {
                this.CountFinish += +1;
              }

              if (childSnapshot.callMesero != undefined) {
                if (childSnapshot.callMesero)
                  this.CountFinish += +1;
              }

              if (childSnapshot.callMesero != undefined) {
                if (childSnapshot.callMesero) {
                  this.order.push({
                    Mesa: childSnapshot.Mesa,
                    Codigo: childSnapshot.$key,
                    mesero: childSnapshot.callMesero
                  });
                }
              }



              this._getService.ComandasGetCode(local, childSnapshot.$key).subscribe(snap => {

                if (snap[0] != undefined) {
                  if ((snap[0].Estatus == '0' || snap[0].Estatus == '1' || snap[0].Estatus == '') && snap[0].isCode != undefined) {
                    //  if(childSnapshot.Mesa!=undefined)
                    this.CountComanda += +1;
                  }
                }

                var aunatiempo = "alert alert-success alert-dismissible fade in";
                if (snap[0] != undefined) {
                  if (snap[0].fechaCreado != undefined) {
                    var yatarde = snap[0].fechaCreado.split(' ');
                    var hora = yatarde[1].replace(':', '');


                    let horahoy = +solodia[1];
                    if (horahoy - +hora >= 10) {
                      aunatiempo = "alert alert-warning alert-dismissible fade in";
                    }
                  }

                  if (childSnapshot.FechaEntregado != undefined && childSnapshot.Estatus == '4') {

                    var snaper = new Array();
                    snap.forEach((dontWork) => {
                      if ((dontWork.Estatus != '0' || dontWork.Estatus != '1') && childSnapshot.FechaEntregado != undefined) {
                        snaper.push(dontWork);
                      }
                    });
                    var DomServ = this.Service_dom.filter(x => x._id === childSnapshot.idService);

                    if (snap[0].fechaCreado != undefined) {
                      this.final_data.push({
                        Estatus: childSnapshot.Estatus,
                        FechaEntregado: childSnapshot.FechaEntregado,//.replace(' ','').replace('T',' ').replace('/','').replace('/',''),
                        codigo: childSnapshot.$key,
                        mesa: snap[0].Mesa,
                        iscode: snap[0].isCode,
                        yatardo: aunatiempo,
                        fecha: +snap[0].fechaCreado.replace(' ', '').replace(':', '').replace('/', '').replace('/', ''),
                        Allevar: childSnapshot.Allevar,
                        snap: snaper,
                        servicioDom: DomServ


                      });

                      this.final_datas.push({
                        fecha: +snap[0].fechaCreado.replace(' ', '').replace(':', '').replace('/', '').replace('/', ''),
                        id: childSnapshot.$key
                      });
                    }
                  }


                  else {
                    if (snap[0].fechaCreado != undefined && snap[0].Estatus == '4') {

                      var DomServ = this.Service_dom.filter(x => x._id === childSnapshot.idService);

                      this.final_data.push({
                        snap,
                        codigo: childSnapshot.$key,
                        mesa: snap[0].Mesa,
                        iscode: snap[0].isCode,
                        yatardo: aunatiempo,
                        fecha: +snap[0].fechaCreado.replace(' ', '').replace(':', '').replace('/', '').replace('/', ''),
                        Allevar: childSnapshot.Allevar,
                        Estatus: childSnapshot.Estatus,
                        servicioDom: DomServ
                        //  FechaEntregado:childSnapshot.FechaEntregado.replace(' ','').replace(':','').replace('/','').replace('/',''),
                      });
                      this.final_datas.push({
                        fecha: +snap[0].fechaCreado.replace(' ', '').replace(':', '').replace('/', '').replace('/', ''),
                        id: childSnapshot.$key
                      });
                    }
                  }

                  //this.final_datas.sort(function(a, b){return a.fecha - b.fecha});
                  this.final_datas.sort(function (a, b) { return b.fecha - a.fecha });


                }

              });

            });
          })

        });
  }
     }
          else {
            // fallo el token o expiro
                this.myTokenMesaje= 'La sesion expiro; Debe de abrir esta pantalla desde su panel de control';
          }
      //  });
    }
    else {
    //  document.getElementById('mesajeTOk').style.visibility = 'visible';
        this.myTokenMesaje= 'La sesion expiro; Debe de abrir esta pantalla desde su panel de control';
      //no hay token
      
    }
  });
}

VaMese(code){
  this.activatedRoute.params.subscribe((params: Params) => {
    let tipo = params['typer'];
    let local = params['Esta'];
    this._getService.VaMesero(local,code);


});
}

getSum(code): number {
  let sum = 0;
  this.final_data.forEach(model => {
    if (code == model.codigo) {
      model.snap.forEach(prec => {
        
        if (prec.costo != undefined && prec.Estatus != 6 && prec.Estatus != 3)
          sum += +prec.costo;
      });
    }
  });
  return sum;
}

declinComand(Comanda)
{
  
  var existenPedidos=false;
  Comanda.snap.forEach((dontWork) => {
    if(dontWork.Estatus!=undefined)
    {
      if(dontWork.Estatus=="0"||dontWork.Estatus=="1"){
        existenPedidos=true;
      }
    }
  });
  if(existenPedidos){
    if(confirm("Aun hay platillos preparandose, si se finaliza se eliminara la comanda de pantalla, ¿desea continuar?")){
  this.activatedRoute.params.subscribe((params: Params) => {
    let tipo = params['typer'];
    let local = params['Esta'];
    this._getService.entregacomandFinish(local,Comanda.codigo,'7');

    if (!this.neddcode) {
      this._getService.entregacomandFinish(local, Comanda.codigo, '11');
      this._getService.payComanda('', Comanda._id).subscribe(responde => {


      });
    }
});
}
}
else{
  this.activatedRoute.params.subscribe((params: Params) => {
    let tipo = params['typer'];
    let local = params['Esta'];
    this._getService.entregacomandFinish(local, Comanda.codigo, '7');

    if (!this.neddcode) {
      this._getService.entregacomandFinish(local, Comanda.codigo, '11');
      this._getService.payComanda('', Comanda._id).subscribe(responde => {


      });
    }


});
}
//if(this.CountFinish>0)
//this.CountFinish=this.CountFinish-1;
}


ngOnInit(){
}




}
