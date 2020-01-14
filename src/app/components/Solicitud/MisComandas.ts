import { Component, OnInit, Pipe } from '@angular/core';
import { Routes, ActivatedRoute, Params } from '@angular/router';
import { GetService } from '../../Services/primerRequest';
import { Observable } from 'rxjs';
//import {TabsModule} from "ng2-tabs";

declare var $: any;

@Component({
  selector: 'MisComandas',
  templateUrl: './Miscomandas.html',
  providers: [GetService]
})

@Pipe({
  name: "orderByChild"
})

export class ComandasComponent implements OnInit {
  MyComanda: boolean;
  final_data: any[] = [];
  Service_dom: any[] = [];
  order: any[] = [];
  final_datas: any[] = [];
  keys: string[];
  llave: string;
  NamePlaton:string;
  modals: any[] = [];
  locaOrdenar:string='';
  locaCuenta: string = '';
  locaComanda: string = '';
  locaTermino: string = '';
  reservation: string = '';
  CountComandaC: number = 0;
  CountFinishC: number = 0;
  myTokenMesaje: string = '';
  needCode: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private _getService: GetService) {
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
            this.reservation = '/Reservaciones/dnE6XnhrjrU_/' + local;

            this.final_data = [];
            this.Service_dom = [];
            this.keys = [];
            var date_ = new Date();
            let month = '' + (date_.getMonth() + 1);
            let day = '' + date_.getDate();
            let year = date_.getFullYear();
            let hour = date_.getHours();
            let minute = date_.getMinutes().toString();

            if (minute.length < 2) minute = '0' + minute;
            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;

            var fechaSolicitado = [day, month, year].join('/') + ' ' + hour + minute;
            var solodia = fechaSolicitado.split(' ');
      
            this._getService.signUp(tipo, local, fechaSolicitado.replace('/', '|').replace('/', '|').replace('/', '|').replace(':', '-').replace(':', '-').replace(':', '-').replace(' ', '_')).subscribe(
              response => {
                if (response.local) {
                  if (response.local.id_Menu != null) {
                    if (response.local.id_Menu.need_Code == 1)
                      this.needCode = true;
                  }
                }

                  this._getService.getServicioDomi(local, '').subscribe(respServicio => {

            this._getService.getComandas(local).subscribe(data => {
              this.CountComandaC = 0;
              this.CountFinishC = 0;
              
           

              
                this.Service_dom = [];
                this.final_data = [];

                this.final_datas = [];

               if (respServicio.ServiceFounder != null) {
                 this.Service_dom =  respServicio.ServiceFounder;
                  //  .push({
                  //  correo: respServicio.ServiceFounder.Correo,
                  //  direccion: respServicio.ServiceFounder.Direccion,
                  //  nombre: respServicio.ServiceFounder.Nombre,
                  //  telefono: respServicio.ServiceFounder.Telefono,
                  //  id: respServicio.ServiceFounder._id,
                  //});
                }
             // });

              data.forEach((childSnapshot) => { 
                
               
                if (childSnapshot.Estatus == '4') {

                  this.CountFinishC += +1;
                }
                if (childSnapshot.callMesero != undefined) {
                  if (childSnapshot.callMesero)
                    this.CountFinishC += +1;
                }

                this._getService.ComandasGetCode(local, childSnapshot.$key).subscribe(snap => {
                  if (snap[0] != undefined) {
                    if ((snap[0].Estatus == '0' || snap[0].Estatus == '1' || snap[0].Estatus == '') && snap[0].isCode != undefined) {
                      //  if(childSnapshot.Mesa!=undefined)
                      this.CountComandaC += +1;
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

                      if (snap[0].FechaEntregado != undefined) {

                        //this.TraemeServicios(childSnapshot.idService, local);
                        var DomServ = this.Service_dom.filter(x => x._id === childSnapshot.idService);

                        this.final_data.push({
                          snap,
                          codigo: childSnapshot.$key,
                          mesa: snap[0].Mesa,
                          isCode: childSnapshot.isCode,
                          yatardo: aunatiempo,
                          fecha: +snap[0].fechaCreado.replace(' ', '').replace(':', '').replace('/', '').replace('/', ''),
                          Estatus: childSnapshot.Estatus,
                          FechaEntregado: this._getService.formatoDate(childSnapshot.FechaEntregado),//.replace(' ','').replace('T',' ').replace('/','').replace('/',''),
                          plus: snap[0].plus,
                          Allevar: childSnapshot.Allevar,
                          servicioDom: DomServ

                        });



                        this.final_datas.push({
                          fecha: +snap[0].fechaCreado.replace(' ', '').replace(':', '').replace('/', '').replace('/', ''),
                          id: childSnapshot.$key
                        });

                        //snap.forEach((dontWork) => {
                        //  console.log(dontWork);
                        //if(dontWork.Estatus=='0'){

                        //this.final_data.push({
                        //  Estatus:'0',
                        //  //FechaEntregado:this._getService.formatoDate(childSnapshot.FechaEntregado),//.replace(' ','').replace('T',' ').replace('/','').replace('/',''),
                        //codigo:childSnapshot.$key,
                        //mesa:snap[0].Mesa,
                        //iscode:snap[0].isCode,
                        //yatardo:aunatiempo,
                        //fecha:+snap[0].fechaCreado.replace(' ','').replace(':','').replace('/','').replace('/',''),
                        //});
                        //}
                        //});
                      }


                      else {
                        if (snap[0].fechaCreado != undefined) {
                          if (childSnapshot.idService != '' && childSnapshot.idService != undefined)
                            //this.TraemeServicios(childSnapshot.idService, local);
                            var DomService = this.Service_dom.filter(x => x._id === childSnapshot.idService);             
                          //ya esta modificado
                          this.final_data.push({
                            snap,
                            codigo: childSnapshot.$key,
                            mesa: snap[0].Mesa,
                            isCode: childSnapshot.isCode,
                            yatardo: aunatiempo,
                            fecha: +snap[0].fechaCreado.replace(' ', '').replace(':', '').replace('/', '').replace('/', ''),
                            Estatus: childSnapshot.Estatus,
                            plus: snap[0].plus,
                            Allevar: childSnapshot.Allevar,
                            servicioDom: DomService
                            //FechaEntregado:childSnapshot.FechaEntregado.replace(' ','').replace(':','').replace('/','').replace('/',''),
                          });




                          var noCofirm = false;
                          var snaper = new Array();
                          var ifConfirm = false;
                          snap.forEach((dontWork) => {
                            if ((dontWork.Estatus == '0' || dontWork.Estatus == '1') && childSnapshot.FechaEntregado != undefined) {
                              if (dontWork.isconfirm == undefined) {
                                noCofirm = true;
                              }
                              snaper.push(dontWork);
                            }
                            if(dontWork.Estatus == '4') {

                              this.CountFinishC += +1;
                            }
                          });

                          if (snaper.length > 0) {
                            if (noCofirm) {
                              this.final_data.push({
                                Estatus: '0',
                                //  FechaEntregado:this._getService.formatoDate(childSnapshot.FechaEntregado),//.replace(' ','').replace('T',' ').replace('/','').replace('/',''),
                                codigo: childSnapshot.$key,
                                mesa: snap[0].Mesa,
                                isCode: !noCofirm,//childSnapshot.isCode,
                                yatardo: aunatiempo,
                                fecha: +snap[0].fechaCreado.replace(' ', '').replace(':', '').replace('/', '').replace('/', ''),
                                isconfirm: 1,
                                plus: snap[0].plus,
                                Allevar: childSnapshot.Allevar,
                                snap: snaper,
                                servicioDom: DomService
                              });
                            }
                            else {
                              this.final_data.push({
                                Estatus: '0',
                                //  FechaEntregado:this._getService.formatoDate(childSnapshot.FechaEntregado),//.replace(' ','').replace('T',' ').replace('/','').replace('/',''),
                                codigo: childSnapshot.$key,
                                mesa: snap[0].Mesa,
                                isCode: !noCofirm,//childSnapshot.isCode,
                                yatardo: aunatiempo,
                                fecha: +snap[0].fechaCreado.replace(' ', '').replace(':', '').replace('/', '').replace('/', ''),
                                plus: snap[0].plus,
                                Allevar: childSnapshot.Allevar,
                                snap: snaper,
                                servicioDom: DomService
                              });
                            }
                          }


                          this.final_datas.push({
                            fecha: +snap[0].fechaCreado.replace(' ', '').replace(':', '').replace('/', '').replace('/', ''),
                            id: childSnapshot.$key
                          });

                        }
                      }

                      this.final_datas.sort(function (a, b) { return b.fecha - a.fecha });                      
                    }
                  //});
                  }
                });

              });
              });
            });
          });

      }
      }
            else {
              // fallo el token o expiro

                this.myTokenMesaje= 'La sesion expiro; Debe de abrir esta pantalla desde su panel de control';
            }
      //    });
        //  document.getElementById('mesajeTOk').style.visibility = "hidden";
      }
      else {
        //no hay token
      //  document.getElementById('mesajeTOk').style.visibility = 'visible';
    this.myTokenMesaje= 'La sesion expiro; Debe de abrir esta pantalla desde su panel de control';

      }
    });
  }


  ngOnInit() {
  }

  getSum(code): number {
    let sum = 0;
    this.final_data.forEach(model => {
      if (code == model.codigo) {
        model.snap.forEach(prec => {
          if (prec.costo != undefined && prec.Estatus!=6 && prec.Estatus!=3)
            sum += +prec.costo;
        });
      }
    });
    return sum;
  }

  //TraemeServicios(idServicio, local) {
  //  console.log(idServicio);
  //  

  //  if (idServicio != '' && idServicio != undefined) {


  //    this._getService.getServicioDomi(local, idServicio).subscribe(respServicio => {
       
  //      if (respServicio.ServiceFounder != null) {
  //        this.Service_dom.push({
  //          correo: respServicio.ServiceFounder.Correo,
  //          direccion: respServicio.ServiceFounder.Direccion,
  //          nombre: respServicio.ServiceFounder.Nombre,
  //          telefono: respServicio.ServiceFounder.Telefono,
  //          id: respServicio.ServiceFounder._id,
  //        });
  //      }
  //    });
  //  }
  //}


  // toWork(Codigo, id, Comanda) {
  //   console.log(id+'--'+Codigo);
  //
  //   this.activatedRoute.params.subscribe((params: Params) => {
  //     let tipo = params['typer'];
  //     let local = params['Esta'];
  //
  //
  //     Comanda.snap.forEach((toSave) => {
  //           var idMongo = localStorage.getItem('ComandaLevantada');
  //       if (toSave.isconfirm != undefined) {
  //
  //         toSave.Estatus = '2';
  //         this._getService.setNewplato(idMongo, toSave).subscribe(respuesta => {
  //           console.log(respuesta);
  //         });
  //       }
  //       if(idMongo==toSave.id){
  //         toSave.Estatus = '2';
  //           console.log(toSave);
  //       }
  //
  //     });
  //     console.log(Comanda);
  //     this._getService.BeginWorkPlato(local, Codigo, id);
  //     //aqui hay que guardar las que entraron cuando se entrego el plato
  //   });
  // }

  deliverDish(Comanda, codigo, id){    
    
    let platillos = Comanda.snap.filter(x=> x.Estatus == '2' || x.Estatus == '')

      this.activatedRoute.params.subscribe((params: Params) => {
        let tipo = params['typer'];
        let local = params['Esta'];
        this._getService.setDishDelivered(local, codigo, id)
      })  
  if(platillos.length === 1){        
    this.EntregaOrden(Comanda)           
    }
  }

  toWork(Codigo, id, Comanda) {

   this.activatedRoute.params.subscribe((params: Params) => {
     let tipo = params['typer'];
     let local = params['Esta'];
     this._getService.BeginWorkPlato(local, Codigo, id);
     //document.getElementById('btnEntrega' + id).style.visibility = "visible";
     Comanda.snap.forEach((toSave) => {
       if (toSave.isconfirm != undefined && toSave.Estatus != '8') {
         var idMongo = localStorage.getItem('ComandaLevantada');
         toSave.Estatus = '2';
         this._getService.setNewplato(idMongo, toSave).subscribe(respuesta => {
           
         });
       }
     });
     //aqui hay que guardar las que entraron cuando se entrego el plato
   });
 }


  EntregaOrden(Comanda) {

    this.activatedRoute.params.subscribe((params: Params) => {
      let tipo = params['typer'];
      let local = params['Esta'];
      var snaper = new Array();
      Comanda.snap.forEach((dontWork) => {
        if (dontWork.Cantidad != undefined) {

          snaper.push(dontWork);
          if (dontWork.Estatus == '4' || dontWork.Estatus == '') {
              dontWork.Estatus = '2'          
          }
        }
      });
      Comanda.snap = snaper;      
      this._getService.setComandaEntregada(local, Comanda.codigo, Comanda, Comanda.snap[0].$key).subscribe(respuesta => {
        if (respuesta.Comandas._id != undefined) {
          
          localStorage.setItem('ComandaLevantada', respuesta.Comandas._id);
        }
      });

    });
    
    //if(this.CountComandaC>0)
    //this.CountComandaC=this.CountComandaC-1;
  }

 

  getOthersComand(valorSelected) {
    if (valorSelected == '1')
      this.constructor(this.activatedRoute, this._getService);


    else {
      if (valorSelected == '4') {
        this.activatedRoute.params.subscribe((params: Params) => {
          let tipo = params['typer'];
          let local = params['Esta'];
          this.final_data = [];
          this.final_datas = [];
          this._getService.GetListComandaEstatus(local, valorSelected).subscribe(respuesta => {
            var datos: any[] = [];
            this.final_datas = [];
            respuesta.forEach((childSnapshot) => {
              if (childSnapshot.Estatus == valorSelected) {
                var snap = new Array();
                $.each(childSnapshot, function(index, item) {
                  if (this.id != undefined) {
                    snap.push(item);
                  }

                });
                if (childSnapshot.FechaEntregado != undefined) {
                  datos.push({
                    //this,
                    snap,
                    codigo: childSnapshot.$key,
                    mesa: snap[0].Mesa,
                    iscode: false,
                    //yatardo:aunatiempo,
                    fecha: snap[0].fechaCreado.replace(' ', '').replace(':', '').replace('/', '').replace('/', ''),
                    Estatus: childSnapshot.Estatus,
                    FechaEntregado: childSnapshot.FechaEntregado.replace('T', ' ').replace('Z', '')//.replace('/','').replace('/',''),
                  });
                }
                else {
                  datos.push({
                    //this,
                    snap,
                    codigo: childSnapshot.$key,
                    mesa: snap[0].Mesa,
                    isCode: false,
                    //yatardo:aunatiempo,
                    fecha: snap[0].fechaCreado.replace(' ', '').replace(':', '').replace('/', '').replace('/', ''),
                    Estatus: childSnapshot.Estatus,
                    //FechaEntregado:childSnapshot.FechaEntregado.replace('T',' ').replace('Z','')//.replace('/','').replace('/',''),
                  });
                }

                this.final_datas.push({
                  fecha: +snap[0].fechaCreado.replace(' ', '').replace(':', '').replace('/', '').replace('/', ''),
                  id: childSnapshot.$key
                });

              }
            })
            this.final_data = datos;
          });
        });
      }
      else {
        this.constructor(this.activatedRoute, this._getService);
      }
    }
  }

  ConfirmOrder(Comanda) {
    this.activatedRoute.params.subscribe((params: Params) => {
      let tipo = params['typer'];
      let local = params['Esta'];
      if (Comanda.isconfirm == undefined)
        this._getService.AcceptOrder(local, Comanda.codigo, Comanda.snap[0].$key);
      else {
        //this._getService.setComandaEntregada(local,Comanda.codigo,Comanda,1);
        Comanda.snap.forEach((childSnapshot) => {
          this._getService.AcceptOrderEntregada(local, Comanda.codigo, childSnapshot.$key);
        });
      }

      this.constructor(this.activatedRoute, this._getService)

    });
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
    var myfec = [day, month, year].join('/') + ' ' + hour + ':' + minute;

    return myfec;
  }

  Imprime(id) {
    
    this.activatedRoute.params.subscribe((params: Params) => {
      let tipo = params['typer'];
      let local = params['Esta'];

      var myfechoria = new Date();
      var fecha = this.formatoDate(myfechoria, '');
      this._getService.signUp(tipo, local, fecha.replace('/', '|').replace('/', '|').replace('/', '|').replace(':', '-').replace(':', '-').replace(':', '-').replace(' ', '_')).subscribe(
        respuestada => {
          var innerContents = document.getElementById(id).innerHTML;

          var popupWinindow = window.open('', '_blank', 'width=800,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
          popupWinindow.document.open();
          popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()"><div style="text-align:center"><h2>' + respuestada.local.Nombre + '</h2><hr><span><small>Dirección: ' + respuestada.local.Domicilio + '</small></span><h6>' + fecha + '</h6></div><p></p>' + innerContents + '</body></html>');
          popupWinindow.document.close();

        });
    });
  }

  declinComand(Comanda, tambienBloqueo) {

    this.activatedRoute.params.subscribe((params: Params) => {
      let tipo = params['typer'];
      let local = params['Esta'];
      if (tambienBloqueo) {
        //aqui meter el q si lo declina meter una cookie o local storage para que no pueda levantar ordenes solo en locales que no ocupan codigo

          this._getService.BlockOrderUser(local, Comanda.codigo);
      }

      this._getService.declineComand(local, Comanda.codigo);
      this.modals = [];
    });
    $('#MymodalDecline').modal('hide');

  }

  AbrePopDecline(Comanda) {
    $('#MymodalDecline').modal('show');
    this.modals = Comanda;
  }

  abreCampo(code, llave) {
    //  $('#'+code).css('visibility', 'visible');
    this.llave = llave;
    document.getElementById('divCanceloide_'+code).style.height="100px";
    document.getElementById(code).style.visibility = "visible";
    document.getElementById('btn_' + code).style.visibility = "visible";
    //$("html, body").delay(1000).animate({ scrollTop: $('#btn_' + code).offset().top }, 2000);
   }

   comienzaEditar(code, llave, nombre){
     document.getElementById('divEditoide_'+code).style.height="100px";//("height","70px");
 	     this.llave = llave;
 		 this.NamePlaton=nombre;
     document.getElementById(code+'_').style.visibility = "visible";
     document.getElementById('btnEdit_' + code).style.visibility = "visible";
   }

   EditaPlato(Codigo, id, nombrePlato) {
     document.getElementById('divEditoide_'+Codigo).style.height="0px";
     var comentario = (<HTMLInputElement>document.getElementById(Codigo+'_')).value;
   
     if (comentario != '') {
       this.activatedRoute.params.subscribe((params: Params) => {
         let tipo = params['typer'];
         let local = params['Esta'];

         this._getService.EditPlato(local, Codigo, id, comentario,nombrePlato);


       });
     }
   }

  CancelPlatillo(Codigo, id) {
    var comentario = (<HTMLInputElement>document.getElementById(Codigo)).value;
    document.getElementById('divCanceloide_'+Codigo).style.height="0px";
    if (comentario != '') {
      this.activatedRoute.params.subscribe((params: Params) => {
        let tipo = params['typer'];
        let local = params['Esta'];

        this._getService.cancelPlato(local, Codigo, id, comentario);


      });
    }
  }

}
