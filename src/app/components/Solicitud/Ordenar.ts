import {Component, OnInit} from '@angular/core';
import {Routes, ActivatedRoute, Params} from '@angular/router';
import {GetService} from '../../Services/primerRequest';
import {local} from '../../models/local';
//import {LaCuentaComponent} from './LaCuenta';


declare var $:any;

@Component({
selector:'Ordenar',
templateUrl:'./Ordenar.html',
providers:[GetService],
})


export class OrdenarComponent implements OnInit {

  public LocalGet: local;
  myTokenMesaje: string = '';
    public timessorted;
    public modals: Array<{id:string, Nombre:string, descrip:string,precio:string,Active:number, Cate:string,DescCate:string, piezas:number, NomImg:string, tamaPrice:string}>; //:any[] = [];
    public arregloPrTm;
    public caracter;
    is_Updatering:number=0;
    public intproducto;
    locaCuenta:string='';
    locaComanda:string='';
  locaTermino: string = '';
  reservation: string = '';
  public Allevar: boolean;
  public Mycode: string;
    		public needCode:boolean;
    public comandaSave: Array<{id: string, Nombre: string, cantidad: number,precio:number,Especificaciones:string,tama:string,Estatus:string,costo:number, tamaPrice:string }>;
  public comandaNew: Array<{ id: string, Nombre: string, cantidad: number, precio: number, Especificaciones: string, tama: string, Estatus: string, costo: number, tamaPrice: string, isKitchen: number }>;

  CountComandaC: number = 0;
  CountFinishC: number = 0;

constructor(private activatedRoute: ActivatedRoute, private _getService:GetService){
		this.timessorted=new Array();
    	this.arregloPrTm=new Array();
      		this.intproducto=0;
          this.comandaSave= [];
          this.comandaNew=[];
          this.needCode=false;
          this.caracter='';
  this.modals = [];
  this.CountComandaC = 0;
  this.CountFinishC = 0;
  this.Allevar = false;


}
ngOnInit(){
  this.activatedRoute.params.subscribe((params: Params) => {
    let tipo = params['typer'];
    let local = params['Esta'];
    this.locaCuenta = '/LaCuenta/dnE6XnhrjrU_/' + local;
    this.locaComanda = '/Comandas/dnE6XnhrjrU_/' + local;
    this.locaTermino = '/TerminadosCocina/dnE6XnhrjrU_/' + local;
    this.reservation = '/Reservaciones/dnE6XnhrjrU_/' + local;

    let token = this._getService.getCookie('verificaexpired');// params['Toke']; //this._getService.getCookie('verificaexpired');

    if (token != null) {
      token = atob(token);//.replace('_', '.').replace('_', '.');

      //  this._getService.validaToken(token).subscribe(
      //    response => {
      
      var localescook = token.split('||');
      
      if (localescook[0].replace('"', '') == tipo && localescook[1].replace('"', '') == local) {

        if (tipo && local) {
          var myfechoria = new Date();
          var fecha = this.formatoDate(myfechoria, '');
          this._getService.signUp(tipo, local, fecha.replace('/', '|').replace('/', '|').replace('/', '|').replace(':', '-').replace(':', '-').replace(':', '-').replace(' ', '_')).subscribe(
            response => {
              if (response.local) {
                this.LocalGet = response.local;

                var otercounter = 0;
                if (this.LocalGet.id_Menu.need_Code == 1)
                  this.needCode = true;

                for (var i = 0; i < this.LocalGet.id_Menu.menu.length; i++) {
                  
                  if (i == 0) {
                    if (this.LocalGet.id_Menu.menu[i].tiempo == '7') {
                      if (this.LocalGet.id_Menu.menu[i].Active == 1) {
                        this.timessorted[otercounter] = this.LocalGet.id_Menu.menu[i].descTime;
                        otercounter++;
                      }
                    }
                    else {
                      if (this.LocalGet.id_Menu.menu[i].Active == 1) {
                        this.timessorted[otercounter] = this.LocalGet.id_Menu.menu[i].tiempo;
                        otercounter++;
                      }
                    }
                  }
                  else {

                    if (!this.timessorted.includes(this.LocalGet.id_Menu.menu[i].tiempo) && this.LocalGet.id_Menu.menu[i].tiempo != '7') {
                      //this.tiempos[countered]=this.LocalGet.id_Menu.menu[i].tiempo;
                      //countered++;
                      if (this.LocalGet.id_Menu.menu[i].Active == 1) {
                        this.timessorted[otercounter] = this.LocalGet.id_Menu.menu[i].tiempo;
                        otercounter++;
                      }
                    }
                    if (!this.timessorted.includes(this.LocalGet.id_Menu.menu[i].descTime) && this.LocalGet.id_Menu.menu[i].tiempo == '7') {
                      
                      if (this.LocalGet.id_Menu.menu[i].Active == 1) {
                        this.timessorted[otercounter] = this.LocalGet.id_Menu.menu[i].descTime;
                        otercounter++;
                      }
                    }
                  }
                }

              }
              this._getService.getComandas(local).subscribe(data => {
                this.CountComandaC = 0;
                this.CountFinishC = 0;              
                data.forEach((childSnapshot) => {

                  if (childSnapshot.Estatus == '4') {
                    
                    this.CountFinishC += +1;
                  }
                  this._getService.ComandasGetCode(local, childSnapshot.$key).subscribe(snap => {
                    
                    if ((snap[0].Estatus == '0' || snap[0].Estatus == '1' || snap[0].Estatus == '') && snap[0].isCode != undefined) {
                      //  if(childSnapshot.Mesa!=undefined)
                      this.CountComandaC += +1;
                    }
                  });
                });
              });
            });
        }

      }
      else {
        // fallo el token o expiro
        this.myTokenMesaje = 'La sesion expiro; Debe de abrir esta pantalla desde su panel de control';
      }
    }
    else {
      // fallo el token o expiro
      this.myTokenMesaje = 'La sesion expiro; Debe de abrir esta pantalla desde su panel de control';
    }
});

}

tengoCaracter(){

    //this.caracter=dataCaracter.Caracter;


}


CierraAlerts(nombre) {
  
  $("#" + nombre).hide()
}

DameNumPedido(){
  if (this.comandaSave.length > 0) {

    var chek = <HTMLInputElement>document.getElementById('isForllevarOrder');
    if (chek.checked) {
      this.Allevar = true;
    }
    else {
      this.Allevar = false;
    }
var idlocal=this.LocalGet.id_SQL;
      if(this.needCode  )
      {
        var codigoMesa=(<HTMLInputElement>document.getElementById('CodeNeeded')).value;
        if(codigoMesa=='')
        {
            $('#alertNoCode').show();
          return;
        }

var caractercomplete="";
var pedido=this.comandaSave;


this._getService.returncaracter(codigoMesa,idlocal).subscribe(dataCaracter=>{
  if(dataCaracter.Open==0)
 caractercomplete=""+dataCaracter.Caracter+""+codigoMesa+""+idlocal;
 else
 caractercomplete=""+dataCaracter.Caracter;




for (let j=0; j<pedido.length; j++)
{
this.comandaNew.push({
  id:pedido[j].id,
  Nombre:pedido[j].Nombre,
  cantidad: pedido[j].cantidad,
  precio: pedido[j].precio,
  Especificaciones: pedido[j].Especificaciones,
  tama: pedido[j].tama,
  costo: pedido[j].costo,
  tamaPrice:pedido[j].tamaPrice,
  Estatus:pedido[j].Estatus,
  isKitchen:1

});
  }

  

if(dataCaracter.Open==0) {
this._getService.guardaCodigoCocina(caractercomplete,idlocal,codigoMesa).subscribe(
response=>{
  

  this._getService.meteComandaCocina(this.comandaNew, this.LocalGet.id_Hashed, caractercomplete, true, codigoMesa, false, idlocal, this.Allevar);//.subscribe(data=>{
  this.Mycode = caractercomplete;
  $("html, body").delay(100).animate({ scrollTop: $('#alertOrderOk').offset().top }, 1000);

    });
  }
  else{
  this._getService.meteComandaCocina(this.comandaNew, this.LocalGet.id_Hashed, caractercomplete, true, codigoMesa, false, idlocal, this.Allevar);//.subscribe(data=>{
  this.Mycode = caractercomplete;
  $("html, body").delay(100).animate({ scrollTop: $('#alertOrderOk').offset().top }, 1000);
  }
  });




this.comandaNew=[];
this.comandaSave=[];

        $('#MyModalPedido').modal('hide');
        $('#alertOrderOk').show();
        

//});

}

      else {

        var NombreComensal=(<HTMLInputElement>document.getElementById('NameOrder')).value;

        if(NombreComensal=='')
        {
          $('#alertNameNece').show();
          return;
        }

        var d = new Date();
  var hora=this.formatoDate(d,'');
  var ident=hora.split(' ');
  var x = Math.floor((Math.random() * 10) + 1);

NombreComensal=NombreComensal+'_'+x+ident[1].replace(':','');


  (<HTMLInputElement>document.getElementById('NameOrder')).value=NombreComensal;


        for (let j=0; j<this.comandaSave.length; j++)
        {
      //	if(this.comandaSave[j].Estatus=='' ){
        this.comandaNew.push({
          id:this.comandaSave[j].id,
          Nombre:this.comandaSave[j].Nombre,
          cantidad: this.comandaSave[j].cantidad,
          precio: this.comandaSave[j].precio,
          Especificaciones: this.comandaSave[j].Especificaciones,
          tama: this.comandaSave[j].tama,
          costo: this.comandaSave[j].costo,
          tamaPrice:this.comandaSave[j].tamaPrice,
          Estatus:this.comandaSave[j].Estatus,
          isKitchen:1

        });
        }

        $('#MyModalPedido').modal('hide');
        $('#alertOrderOk').show();

        this._getService.meteComandaCocina(this.comandaNew, this.LocalGet.id_Hashed, NombreComensal, false, 0, false, idlocal, this.Allevar);//.subscribe(data=>{
        this.Mycode = NombreComensal;
        
        $("html, body").delay(100).animate({ scrollTop: $('#alertOrderOk').offset().top }, 1000);
       

this.comandaNew=[];
this.comandaSave=[];


//});


  }

}
}


GuardameCantidad(tipo){
  
      let canti = (<HTMLInputElement>document.getElementById('NUmProduct')).value;

      if (canti == '')
          canti = '1';

      if (tipo[0].precio != '0') {
        (<HTMLInputElement>document.getElementById('CantProd')).value = canti + '_' + tipo[0].precio;

      }
      else {
        if (tipo[0].tamaPrice != '') {
              var tamañoSelected = (<HTMLInputElement>document.getElementById('CantProd')).value;
              if (tamañoSelected != '') {
                  var spliterTamas = tamañoSelected.split('_');
                  (<HTMLInputElement>document.getElementById('CantProd')).value = canti + '_' + spliterTamas[1] + '_' + spliterTamas[2];
              }
          }
      }

}

actualizaDesdeCiente(comanda,idModifica){

  var codigo='';
   if(this.needCode  )
   {
      codigo=(<HTMLInputElement>document.getElementById('CodeNeeded')).value;
      codigo=codigo.toUpperCase();
   }
   else{
     codigo=(<HTMLInputElement>document.getElementById('NameOrder')).value;
   }

     if(codigo!='')
     {
   this.activatedRoute.params.subscribe((params: Params) => {
     let tipo = params['typer'];
     let local = params['Esta'];
   this._getService.updateOrQuitar(local,codigo,comanda,idModifica,this.needCode);
   });

   }

}


getSum():number{
	 let sum = 0;
	 this.comandaSave.forEach(model => {
		 if(model.costo!=0)
		 sum += +model.costo;
		 else
		 sum += +model.precio
	 });
	 return sum;
 }


abreCantos(platos, is_update) {

  this.modals = [];
  $('#alertOrderOk').hide();

  if(is_update){
  this.is_Updatering=1;
  $('#MyModalPedido').modal('hide');
}
//var chek=
//(<HTMLInputElement>document.getElementById(platos.id)).checked=false;
//chek.checked=false;
  (<HTMLInputElement>document.getElementById('NUmProduct')).value='';
  (<HTMLInputElement>document.getElementById('EspefTxt')).value='';
$('#myModalUpdate').modal('show');

if(platos.tamaPrice != "" && platos.tamaPrice!=undefined ){
this.arregloPrTm=platos.tamaPrice.split(',');
}
else
this.arregloPrTm='';

if(platos.precio!='0'){
this.intproducto=platos.precio;
}

this.modals.push({
  Nombre:platos.Nombre,
  NomImg:platos.NomImg,
  piezas:platos.piezas,
  descrip:platos.descrip,
  tamaPrice:platos.tamaPrice,
  precio:platos.precio,
  DescCate:'',
  Cate:'',
  id:platos.id,
  Active:1,

});
//this.modals=platos;

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


agregaPedido(Plato, mostrarOrden)
{
	let yaexiste=false;
  var cantidades = (<HTMLInputElement>document.getElementById('CantProd')).value;
  
		
	var especif=(<HTMLInputElement>document.getElementById('EspefTxt')).value;
let cantidaa=0;
var price=0;
var cantSplit=[];
var name=Plato[0].Nombre;
var tamaos='';
var precioOriginal=0;
	if(Plato[0].precio==0 && cantidades=='')
	{
		$('#alertNotama').show();
		return ;
	}



	if(cantidades==''){

	cantidaa=1;
	price=Plato[0].precio;
	
}
	else
	{
		if(cantidades=='1'){
		cantidaa=1;
		price=Plato[0].precio;
	}
	else{
			cantSplit=cantidades.split('_');
						

				price=+cantSplit[0]*+cantSplit[1];
				cantidaa=+cantSplit[0];
				if(cantSplit.length>2)
				{
				name=Plato[0].Nombre+' '+cantSplit[2];
				tamaos=cantSplit[2];
			}
		}
	}

	for (let i=0; i<this.comandaSave.length; i++)
	{

		if(Plato[0].id==this.comandaSave[i].id){

			if(this.is_Updatering==0){
			yaexiste=true;
this.comandaSave[i].cantidad+=cantidaa;
this.comandaSave[i].Estatus='';
              if (cantidaa == 1) {
                price = price * (this.comandaSave[i].cantidad);
                this.comandaSave[i].costo = price;
              }
              else {
                this.comandaSave[i].costo = this.comandaSave[i].precio * (this.comandaSave[i].cantidad);
              }
}
//if(this.comandaSave[i].Especificaciones!='')
this.comandaSave[i].Especificaciones+=" "+ especif;

	if(this.is_Updatering==1){

this.comandaSave[i].tama=tamaos;
this.comandaSave[i].Nombre=name;
this.comandaSave[i].costo=price;
this.comandaSave[i].precio=Plato[0].precio;

this.comandaSave[i].cantidad=cantidaa;

// aqui meter un if pa ver si ya esta guardadao
this.actualizaDesdeCiente(this.comandaSave[i],5);

}
		}
	}

	

if(!yaexiste && this.is_Updatering==0){

if(Plato[0].costo==0 || Plato[0].costo==undefined){
	this.comandaSave.push({
		id:Plato[0].id,
		Nombre:name,//Plato.Nombre,
		cantidad:cantidaa,
		precio:Plato[0].precio,
		Especificaciones:especif,
		tama:tamaos,
		Estatus:'',
		costo:price,
		tamaPrice:Plato[0].tamaPrice
	});
}
else
{
	this.comandaSave.push({
		id:Plato[0].id,
		Nombre:name,//Plato.Nombre,
		cantidad:cantidaa,
		precio:Plato[0].precio,
		Especificaciones:especif,
		tama:tamaos,
		Estatus:'',
		costo:Plato[0].costo,
		tamaPrice:Plato[0].tamaPrice
	});
}
}
$('#myModalUpdate').modal('hide');
(<HTMLInputElement>document.getElementById('CantProd')).value='';
(<HTMLInputElement>document.getElementById('EspefTxt')).value='';

    this.is_Updatering = 0;
  //  this.metecookie();

if(mostrarOrden)
this.abreComanda();
}

abreComanda()
{
	$('#MyModalPedido').modal('show');
}


}
