import {Component, OnInit} from '@angular/core';
import {Routes, ActivatedRoute, Params,Router} from '@angular/router';
import {GetService} from '../../Services/primerRequest';
import {local} from '../../models/local';
import { HaversineService } from "ng2-haversine";


declare var $:any;

//declare var myExtObject: any;

@Component({
selector:'OrdenoFacil',
templateUrl:'./OrdenoFacilVista.html',
providers:[GetService],
//styleUrls:['../../assets/css/animate-custom.css'
//,'../../assets/css/styles.css'],
 // ViewEncapsulation.None,
 //directives:[Routes]
})

export class OrdenoFacilComponent implements OnInit {
		public needCode:boolean;

  public titulo;
  public suscripcion;
	public calificaVar;
	public LocalGet:local;
  public recomendaciones: any[];
  public fechas: any[] = [];
  public toEncuesta: any[] = [];
	public tiempos;
	public timessorted;
public intproducto;
public arregloPrTm;
public mycodecob;
public modals:any[] = [];//Array<{id:string, Nombre:string, descrip:string,precio:string,Active:number, Cate:string,DescCate:string,
  //Etiquetas:string,NomImg:string,piezas:string,tamaPrice:string, tiempo:string  }> //
  public comandaSave: Array<{ id: string, Nombre: string, cantidad: number, precio: number, Especificaciones: string, tama: string, Estatus: string, costo: number, tamaPrice: string, fechaCreado: string, key: string, plus: number }>;
  public comandaDelete: Array<{ id: string, Nombre: string, cantidad: number, precio: number, Especificaciones: string, tama: string, Estatus: string, costo: number, tamaPrice: string, fechaCreado: string, key: string, plus: number } >;
  public comandaNew: Array<{ id: string, Nombre: string, cantidad: number, precio: number, Especificaciones: string, tama: string, Estatus: string, costo: number, tamaPrice: string, fechaCreado: string, key: string, plus: number} >;
public places: Array<{place:string,IdPlace:string,nombre:string,type:string}>;
public precios;
public redessplit:any[]=[];
public paq;
public espe;
public promos;
public eve;
public logo;
public Fondo;
public existMyComand;
final_data: any[]=[];
razonCancel:string='';
is_Updatering:number=0;
  cerrado: boolean;
  public Allevar: boolean;
public tipoLocal;
public idLocalhash;
    public LoNuevo;
    public mAIL;
public location = {};
public countCambios:number;
public Comparacion: any []=[];
public KeysComapara: any []=[];
public  CalificaEncues: string = '';
  public agradeceenc: boolean = false;
  public togoTrue: boolean = false;
  public SepuedePedir: number = 0;
  public serdomPop: any[] = [];
  public canTogo: boolean;


	constructor(private activatedRoute: ActivatedRoute, private _getService:GetService, private _haversineService: HaversineService, private route:Router)
	{



		this.titulo="Bienvenid@";
		this.tiempos=new Array();
		this.timessorted=new Array();
		this.intproducto=0;
		this.arregloPrTm=new Array();
		this.precios=new Array();
		this.comandaSave= [];
		this.comandaDelete= [];
		this.comandaNew=[];
		this.needCode=false;
		this.paq=false;
		this.espe=false;
		this.promos=false;
		this.eve=false;
		this.logo='';
		this.Fondo='';
		this.places=[];
		this.cerrado=false;
		this.tipoLocal='';
        this.idLocalhash = '';
        this.mAIL = '';
				this.calificaVar='Calificanos:'
				this.mycodecob='';
				this.existMyComand=true;
				this.countCambios=0;
				this.Comparacion=[];
      this.KeysComapara = [];
      this.Allevar = false;
      this.serdomPop= [];
      this.canTogo = true;

	}

	ngOnInit(){
      $('#mymodalenabled').modal('show');
      this.activatedRoute.params.subscribe((params: Params) => {
        let tipo = params['typer'];
        let local = params['Esta'];
				this.idLocalhash=local;
				this.tipoLocal=tipo;


        
        if (tipo && local) {
         
          

					var myfechoria = new Date();
			 var fecha = this.formatoDate(myfechoria, '');
        this._getService.signUp(tipo,local, fecha.replace('/', '|').replace('/', '|').replace('/', '|').replace(':', '-').replace(':', '-').replace(':', '-').replace(' ', '_')).subscribe(
			response=>{
				if(!response.local)
				{
					if(response.firtsSix)
					{
						this.route.navigateByUrl('/ordenofacil/'+tipo+'/'+local);
				
					}

				}
				else
				{
                  if (response.local != '') {

                    this.LocalGet = response.local;
                    this.SepuedePedir = response.local.setComand;

                    if(response.local.servDom != 1){
                      document.getElementById('servDomicilia').style.visibility = "hidden";
                     // document.getElementById('setToGoTable').style.visibility = "hidden";
                     this.canTogo = false;
                      
                    }

                    if(response.local.makeReserve != 1 ){
                      
                    }

                    var micomandante = this.getCookie('MyComand' + local);
                    if (micomandante != '') {

                      //	this._getService.encodeCadenas(micomandante).subscribe(cadenaRespuesta=>{
                      var micomanda = JSON.parse(atob(micomandante));
                      //	this.comandaSave= [micomanda.length];





                      for (let j = 0; j < micomanda.length; j++) {


                        var costoso = micomanda[j].cantidad * micomanda[j].precio;
                        this.comandaSave.push({
                          id: micomanda[j].id,
                          Nombre: micomanda[j].Nombre,
                          cantidad: micomanda[j].cantidad,
                          precio: micomanda[j].precio,
                          Especificaciones: micomanda[j].Especificaciones,
                          tama: micomanda[j].tama,
                          Estatus: micomanda[j].Estatus,
                          costo: costoso,
                          tamaPrice: micomanda[j].tamaPrice,
                          fechaCreado: micomanda[j].fechaCreado,
                          key: micomanda[j].keym,
                          plus: micomanda[j].plus
                        });
                      }



                    }
                    else {
                      this.existMyComand = false;
                    }

                    this.estaCerrao(this.LocalGet.nom_img);
                    this.redessplit = this.LocalGet.redes.split('|');



                    if (this.LocalGet.id_PaqEspe != undefined) {
                      for (var paqespe = 0; paqespe < this.LocalGet.id_PaqEspe.length; paqespe++) {
                        if (this.LocalGet.id_PaqEspe[paqespe].Is_Active == 1) {
                          if (this.LocalGet.id_PaqEspe[paqespe].Typo == 1)
                            this.paq = true;
                          else
                            this.espe = true;
                        }
                      }
                    }

                    if (this.LocalGet.id_EvenPromo != undefined) {
                      for (var evenPromo = 0; evenPromo < this.LocalGet.id_EvenPromo.length; evenPromo++) {
                         
                          if (this.LocalGet.id_EvenPromo[evenPromo].Typo == 1) {
                            if (this.LocalGet.id_EvenPromo[evenPromo].IsActive == 1)
                              this.eve = true;
                          }
                          else {
                            if (this.LocalGet.id_EvenPromo[evenPromo].IsActive == 1)
                            this.promos = true;
                          }
                        
                        //else {
                        //  this.LocalGet.id_EvenPromo.splice(evenPromo, 1);
                        //}
                      }
                    }


                    if (this.LocalGet.id_Imgs.length == 0) {
                      this.Fondo = 'http://ordenofacil.com/Logos/slide1.jpg';
                    }
                    else {
                      for (var e = 0; e < this.LocalGet.id_Imgs.length; e++) {

                        if (this.LocalGet.id_Imgs[e].tipo == 1 && this.LocalGet.id_Imgs[e].IsActivo == 1)
                          this.Fondo = this.LocalGet.id_Imgs[e].Nombre;
                        if (this.LocalGet.id_Imgs[e].tipo == 2 && this.LocalGet.id_Imgs[e].IsActivo == 1)
                          this.logo = this.LocalGet.id_Imgs[e].Nombre;
                      }
                      if (this.Fondo == '')
                        this.Fondo = 'http://ordenofacil.com/Logos/slide1.jpg';
                    }

                    // aqui la cookie
                    let placeBefore = this.getCookie('OFClient');

                    var d = new Date();
                    d.setTime(d.getTime() + (60 * 24 * 60 * 60 * 1000));
                    var expires = "expires=" + d['toGMTString']();

                    if (!placeBefore.includes(tipo + '|' + local)) {
                      if (this.LocalGet.id_Imgs[1] != undefined)
                        document.cookie = "OFClient" + "=" + placeBefore + tipo + '|' + local + '|' + this.LocalGet.Nombre + '|' + this.LocalGet.tipo + '|' + this.LocalGet.id_Imgs[1].Nombre + '|' + fecha + "+;" + expires + ";path=/";
                      else
                        document.cookie = "OFClient" + "=" + placeBefore + tipo + '|' + local + '|' + this.LocalGet.Nombre + '|' + this.LocalGet.tipo + '|' + fecha + "+;" + expires + ";path=/";
                    }

                    var countered = 0;
                    var otercounter = 0;
                    if (this.LocalGet.id_Menu != null) {
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
                      
                    
						//var countered=0;
						//for (var i =0; i< this.LocalGet.id_Menu.menu.length ; i++) {
						//	if(i==0){
						//		this.tiempos[countered]=this.LocalGet.id_Menu.menu[i].tiempo;
						//		countered++;
						//	}
						//	else{
						//		if(this.LocalGet.id_Menu.need_Code==1)
     	//								this.needCode=true;
						//		if(!this.tiempos.includes(this.LocalGet.id_Menu.menu[i].tiempo))
						//		{
						//		this.tiempos[countered]=this.LocalGet.id_Menu.menu[i].tiempo;
						//		countered++;
						//		}
						//	}
						//}
						//if(this.tiempos.length>0){
						//	var otercounter=0;
						//		if(this.tiempos.includes("bebidas")){
						//			this.timessorted[otercounter]="bebidas";
						//			otercounter++;
						//		}
						//		if(this.tiempos.includes("Botana")){
						//			this.timessorted[otercounter]="Botana";
						//			otercounter++;
						//		}
						//		if(this.tiempos.includes("Entrada")){
						//			this.timessorted[otercounter]="Entrada";
						//			otercounter++;
						//		}
						//		if(this.tiempos.includes("Guarnicion")){
						//			this.timessorted[otercounter]="Guarnicion";
						//			otercounter++;
						//		}
						//		if(this.tiempos.includes("Plato_Fuerte")){
						//			this.timessorted[otercounter]="Plato_Fuerte";
						//			otercounter++;
						//		}
						//		if(this.tiempos.includes("Postre")){
						//			this.timessorted[otercounter]="Postre";
						//			otercounter++;
						//		}

      //                  }


					}
					



	//	else
	//	document.cookie = "OFClient" + "=" +placeBefore+ ";" + expires + ";path=/";

						//tambien aqui iria meter el token para cuando se mete el codigo
						//localStorage.setItem('identity',JSON.stringify(this.user));
						//this.alertMessage='El usuario se actualizo, correctamente!';
				}
			},
			error=>{
	var errorMessage=<any>error;
	if(errorMessage!=null)
	{

		console.log(error);

	}
}
			);
}
else
this.route.navigateByUrl('/ordenofacil/dnE6XnhrjrU_/_redirect');
      });
      
      $('#mymodalenabled').modal('hide');
      document.body.scrollTop = 0;
      $("html, body").delay(100).animate({ scrollTop: 0 }, 1000);
	}

	cierraAviso(){
	document.getElementById('AvisoCook').style.visibility = "hidden";
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

GuardaComenta(){
	var Nombre=(<HTMLInputElement>document.getElementById('nameComent')).value;
	var mail=(<HTMLInputElement>document.getElementById('emailComent')).value;
  var comanta = (<HTMLInputElement>document.getElementById('messageComent')).value;
  
	
  if (Nombre != '' && mail != '' && comanta != '' && this.validateEmail(mail)){
	var format = /[!#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

			 if (!format.test(Nombre)  && !format.test(comanta)) {
               document.getElementById('btnsendmesg').style.visibility = "hidden";
				 var myfec = new Date();
                var fecha = this.formatoDate(myfec, '');
               this._getService.saveComentario(Nombre, mail, comanta, this.idLocalhash, fecha.replace('/', '|').replace('/', '|').replace(':', '-').replace(' ', '_')).subscribe(respuesta => {
                 document.getElementById('tankLabl').style.visibility = "visible";
                  
    
					
				 });
			 }
			 else{

			 }
}
else{
	//todos los campos son necesarios
}


}

	CierraAlerts(nombre) {
    
    $("#" + nombre).hide()
  }

	 getCookie(nameCook):string {
    var name = nameCook + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


formatoDate(date, hora) {
  var d = new Date(date),//date.replace("GMT+0000","").replace("GMT+0100","")),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear(),

    hour = '' + d.getHours(),
    minute = '' + d.getMinutes();
       //secondes = '' + d.getSeconds();


	 if (month.length < 2) month = '0' + month;
	 if (day.length < 2) day = '0' + day;
   if (hour.length < 2) hour = '0' + hour;
  if (minute.length < 2) minute = '0' + minute;
//  if (secondes.length < 2) secondes = '0' + secondes;
  

	 if(hora!=''){
	hour=hora;
       minute = '00';
     //  secondes = '00';
}
  var myfec = [day, month, year].join('/') + ' ' + hour + ':' + minute;
  //var myfec = [day, month, year].join('/') + ' ' + hour + ':' + minute + ':'+secondes;

	 return myfec;
}


 estaCerrao(horarios) {
	 var horas=horarios.split('-');
var horaAbre=horas[0].split(':');
var horaCierra=horas[1].split(':');
		var d = new Date();
		var fecha=new Date(this.formatoDate(d,''));

var fechacompareCierra=new Date(this.formatoDate(d,horaCierra[0]));
var fechacompareAbre=new Date(this.formatoDate(d,horaAbre[0]));

if(fechacompareCierra < fechacompareAbre){
	
if(fecha == fechacompareCierra)
fechacompareAbre.setDate(fechacompareAbre.getDate() - 1);

fechacompareCierra.setDate(fechacompareCierra.getDate() + 1);
}



	 if(+fecha.getTime() < +fechacompareAbre.getTime()){
		 this.cerrado=true;
		 
	 }
	 if(+fecha.getTime() > +fechacompareCierra.getTime()){
	 this.cerrado=true;
	
 }
    }


		metecomensa(comensal){
		

		 var d = new Date();

        d.setTime(d.getTime() + (2 * 60 * 60 * 1000));
        var expires = "expires=" + d['toGMTString']();
        
        document.cookie = "mYComensa" + "=" + comensal + ";" + expires + ";path=/" ;
  }


  metecodigoRef(codigoClient) {


    var d = new Date();

    d.setTime(d.getTime() + (2 * 60 * 60 * 1000));
    var expires = "expires=" + d['toGMTString']();

    document.cookie = "RefApc" + "=" + btoa(codigoClient) + ";" + expires + ";path=/";
  }

  metecookie(local) {
        var d = new Date();
        d.setTime(d.getTime() + (2 * 60 * 60 * 1000));
        var expires = "expires=" + d['toGMTString']();
        
    document.cookie = "MyComand" + local+ "=" + btoa(JSON.stringify(this.comandaSave)) + ";" + expires + ";path=/";
    }


Calificame(rank){
	
	this.calificaVar='Gracias!!!';
	$('#star5').attr('disabled','disabled');
	$('#star4half').attr('disabled','disabled');
	$('#star4').attr('disabled','disabled');
	$('#star3half').attr('disabled','disabled');
	$('#star3').attr('disabled','disabled');
	$('#star2half').attr('disabled','disabled');
	$('#star2').attr('disabled','disabled');
	$('#star1half').attr('disabled','disabled');
	$('#star1').attr('disabled','disabled');
	$('#starhalf').attr('disabled','disabled');
	// hay que jalar el usuario, si es que existe y Guarda Calif
	var myfec = new Date();
				 var fecha = this.formatoDate(myfec, '');

	this._getService.saveRank('',rank,this.idLocalhash,'', fecha.replace('/', '|').replace('/', '|').replace(':', '-').replace(' ', '_')).subscribe(
 response=>{

 });
}

  DameNumPedido() {


    if (this.suscripcion != undefined) {
      
      this.suscripcion.unsubscribe();
    }

    document.getElementById('btnOrderCo').style.visibility = "hidden";

    this.CierraAlerts('alertSecambio');
    this.CierraAlerts('alerCerrao');
    this.CierraAlerts('alertBlocking');
    this.CierraAlerts('alertNameNece');
    this.CierraAlerts('alertNoCode');
    this.CierraAlerts('alertBadCode');
    this.CierraAlerts('alertCancelPlato');
    //this.CierraAlerts('alertOrderOknoCode');
    var idService = '';
    var NAmetogo = '';
    var coderTogo ='';
    if(this.needCode)
    coderTogo = (<HTMLInputElement>document.getElementById('CodeNeeded')).value;
    else
    coderTogo = (<HTMLInputElement>document.getElementById('NameOrder')).value;
    
    var chek = <HTMLInputElement>document.getElementById('isForllevar');
    if (chek.checked) {
      //aqi hay que jalar los datos si uno no viene poner  Allevar=false
      NAmetogo = (<HTMLInputElement>document.getElementById('Nametogo')).value;
      var celtogo = (<HTMLInputElement>document.getElementById('CeltoGo')).value;
      var MailToGo = (<HTMLInputElement>document.getElementById('MailToGo')).value;
      var directoGo = (<HTMLInputElement>document.getElementById('directoGo')).value;

      if (NAmetogo != '' && celtogo != '' && MailToGo != '' && directoGo != '') {
        //console.log(this.validateEmail(MailToGo));
        if (this.validateEmail(MailToGo))
          this.Allevar = true;
        else {
          $('#alertBadMAil').show();
          this.Allevar = false;
          document.getElementById('btnOrderCo').style.visibility = "visible";
          return;
        }


        var pasacel = parseInt(celtogo);

        if (isNaN(pasacel) && !isFinite(pasacel)) {
          $('#alertBadCel').show();
          this.Allevar = false;
          document.getElementById('btnOrderCo').style.visibility = "visible";
          return;
        }

        if (this.Allevar) {
          // quiere decir que metieron una locacion para llevar hay que guardarla
          this._getService.SaveServicetogo(NAmetogo, this.LocalGet.id_Hashed, MailToGo, celtogo, directoGo, '', '').subscribe(idServ => {
            
            idService = idServ.IdService._id;
           
          });
        }

      }
      else {
        
        if (coderTogo=='') {
          $('#alertFaltanFields').show();
          document.getElementById('btnOrderCo').style.visibility = "visible";
          return;
        }
        else
        this.Allevar = true;
      }
    }
    else {
      this.Allevar = false;
    }
    

    
			if(this.comandaSave.length>0){

				if(this.needCode  )
				{
					var codigo=(<HTMLInputElement>document.getElementById('CodeNeeded')).value;
					if(codigo=='')
                    {
                      if (!this.Allevar) {
                        $('#alertNoCode').show();
                        document.getElementById('btnOrderCo').style.visibility = "visible";
                        return;
                      }
                        else {
                          var x = Math.floor((Math.random() * 10) + 1);
                          var d = new Date();
                          var hora = this.formatoDate(d, '');
                          var ident = hora.split(' ');

                          codigo = NAmetogo + '_' + x + ident[1].replace(':', '');
                        }
					}
//incerto codigo puede proseguir y validar el codigo
 this._getService.ValidaCode(codigo.toUpperCase(),this.LocalGet.id_SQL).subscribe(
response=>{
if(response.coderFound==null && !this.Allevar){

  $('#alertBadCode').show();
  document.getElementById('btnOrderCo').style.visibility = "visible";
return;
}
else {
	//HAY Q OBTENER LA COMANDA LEVANTADA DE FIRE (SI ES QUE EXISTE) Y COMPARARLA CON LA COMANDA-COOKIE

 	 //	 this._getService.checaConfirma(this.LocalGet.id_Hashed,codigo.toUpperCase()).subscribe(datayl=>{
 	 //			console.log(datayl);
 	 //			if(datayl.length>0){
 	 //			datayl.forEach((productos) => {
 	 //			var existenteEnDos=false;
 	 //			console.log(productos);
 	 //				for (let p=0; p<this.comandaSave.length; p++)
 	 //	{
 	 //	if(this.comandaSave[p].id== productos.id )
 	 //	{
 	 //		existenteEnDos=true;
 	 //        p=this.comandaSave.length;
 	 //	}
 	 //	}
	
 	 //	if(!existenteEnDos){
 	 //		if( productos.costo!=undefined){
 	 //	this.comandaSave.push({
 	 //		id:productos.id,
 	 //		Nombre:productos.Platillo,
 	 //		cantidad: productos.Cantidad,
 	 //		precio: productos.precio,
 	 //		Especificaciones:'',// productos.Especificaciones,
 	 //		tama: productos.tama,
 	 //		costo: productos.costo,
 	 //		tamaPrice:productos.tamaPrice,
   //             Estatus: productos.Estatus,
   //             plus: productos.plus,
   //             key: '',
   //             fechaCreado: productos.fechaCreado
 	 //	//	mesa:productos.Mesa
	
 	 //	});
 	 //}
 	 //	}
	
 	 //});
	
 	 //		}
	  //});



 


	for (let j=0; j<this.comandaSave.length; j++)
	{
	//if(this.comandaSave[j].Estatus=='' )
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
		fechaCreado:this.comandaSave[j].fechaCreado,
      key: this.comandaSave[j].key,
      plus: this.comandaSave[j].plus

	});
	}

	//$('#MyModalPedido').modal('hide');
//response.coderFound trae la mesa y el local y con el arreglo de this.comandaSave para levantar la comanda


  var micomandante = this.getCookie('MyComand' + this.LocalGet.id_Hashed);

					if(micomandante!=''){
						this.existMyComand=true;
					}
						else{
							this.existMyComand=false;
						}




  var meson = 0;

  if (response.coderFound != null)
    meson = response.coderFound.Mesa;
  
  this._getService.setComanda(this.comandaNew, this.LocalGet.id_Hashed, codigo.toUpperCase(), true, meson, this.existMyComand, this.Allevar, idService).subscribe(data=>{
this.comandaNew=[];
  this.metecookie(this.LocalGet.id_Hashed);
  this.metecodigoRef(codigo.toUpperCase());

//for (let i=0; i<this.comandaSave.length; i++)
//{
//	this.comandaSave[i].Estatus='7';
//}

  
data.forEach((childSnapshot) => {
  this.setCambios(childSnapshot, codigo.toUpperCase(), data, 1, this.LocalGet.id_Hashed);
});

  

    $('#MyModalPedido').modal('hide');
    document.getElementById('btnOrderCo').style.visibility = "visible";
//	$('#MyModalAlerts').modal('show');
this.countCambios=0;
});

//});

}
},error=>{
var errorMessage=<any>error;
if(errorMessage!=null)
{
console.log(error);
}
});
				}
				else{
					this.estaCerrao(this.LocalGet.nom_img);
					if(this.cerrado){
						$('#alerCerrao').show();
						return;
					}

					//aqui jalar la cookie o localStorage para ver si no ya fue bloqueado.
					let decline=this.getCookie('sendValue');
					
					if(decline!=''){
						$('#alertBlocking').show();
						return;
					}
					var NombreComensal=(<HTMLInputElement>document.getElementById('NameOrder')).value;
					//nomif()bre orden
					if(NombreComensal=='')
					{
						$('#alertNameNece').show();
						return;
                  }

                  if (navigator.geolocation) {

                    navigator.geolocation.getCurrentPosition(position => {

                      let actual = {
                        latitude: +position.coords.latitude,
                        longitude: +position.coords.longitude
                      };

                      let bilbao = {
                        latitude: +this.LocalGet.lat,
                        longitude: +this.LocalGet.lng
                      };
                      // aqi checa si esta cerca del local 15 metros
                      let meters = this._haversineService.getDistanceInMeters(bilbao, actual);
                      if (meters > 20) {
                       /*  $('#alertLejos').show();
                        return; */
                      }

					var d = new Date();
		var hora=this.formatoDate(d,'');
		var ident=hora.split(' ');
		var x = Math.floor((Math.random() * 10) + 1);
	var comens=this.getCookie('mYComensa');
	if(comens=='')
	NombreComensal=NombreComensal+'_'+x+ident[1].replace(':','');
	else
			NombreComensal=comens;

		(<HTMLInputElement>document.getElementById('NameOrder')).value=NombreComensal;

		//this._getService.checaConfirma(this.LocalGet.id_Hashed,NombreComensal).subscribe(datayl=>{
		//	console.log(datayl);
		//	if(datayl.length>0){
		//	if(datayl[0].isCode)
		//	{
		//this._getService.xconform(this.LocalGet.id_Hashed,NombreComensal);
		//	}
		//}

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
						fechaCreado:this.comandaSave[j].fechaCreado,
            key: this.comandaSave[j].key,
            plus: this.comandaSave[j].plus

					});
			//	}
			}
						//incerto nombre puede proseguir
						//$('#MyModalPedido').modal('hide');


                  var micomandante = this.getCookie('MyComand' + this.LocalGet.id_Hashed);

					if(micomandante!=''){
						this.existMyComand=true;
					}
						else{
							this.existMyComand=false;
						}
                  this._getService.setComanda(this.comandaNew, this.LocalGet.id_Hashed, NombreComensal, false, 0, this.existMyComand, this.Allevar,'').subscribe(data=>{
  this.metecookie(this.LocalGet.id_Hashed);
if(comens=='')
this.metecomensa(NombreComensal);

this.comandaNew=[];
//for (let i=0; i<this.comandaSave.length; i++)
//{
//	console.log(this.comandaSave[i].Estatus);
	//this.comandaSave[i].Estatus='7';
//}

data.forEach((childSnapshot) => {
  this.setCambios(childSnapshot, NombreComensal, data, 0, this.LocalGet.id_Hashed);
});
                    $('#MyModalPedido').modal('hide');
                   
this.KeysComapara=[];
//	$('#MyModalAlerts').modal('show');
                      });
                    },
                      errorLocal => {

                        $('#alertLoca').show();
                        return;
                      });
                  }
//});
				}



    }

		}

		setCambios(childSnapshot, code,data, isCoder,localIdHash){
          
			if(childSnapshot.Estatus=="0"|| childSnapshot.Estatus=="1"|| childSnapshot.Estatus==""){
            //  $('#mymodalenabled').modal('show');
				$('#MyModalAlerts').modal('show');
				if(isCoder==1){
				$('#alertOrderOk').show();

                  this.checameCambios(isCoder, childSnapshot)

			}
				else{
				$('#alertOrderOknoCode').show();
this.mycodecob=code;


			}

				document.getElementById('divLogin').style.visibility = "visible";

				$('#alertCancelPlato').hide();
				$('#alertEntregaPlato').hide();
			}
			if(childSnapshot.Estatus=="3"){
				
				this.razonCancel=childSnapshot.Platillo+' La razon de cancelación es: '+childSnapshot.comentario;

				for (let i=0; i<this.comandaSave.length; i++)
				{
					if(childSnapshot.id==this.comandaSave[i].id){
						this.comandaSave[i].Estatus='3';
					}
				}

				$('#MyModalAlerts').modal('show');
					$('#alertCancelPlato').show();
					if(isCoder==1)
					$('#alertOrderOk').hide();
					else
					$('#alertOrderOknoCode').hide();
								$('#alertEntregaPlato').hide();
					//window.navigator.vibrate([1000, 500, 2000]);

					this.quitarSeleccion(childSnapshot.id,true);
			}
			if(childSnapshot.Estatus=="2"){
				
				// el plato esta trabajando y ya no se puede editar
				for (let i=0; i<this.comandaSave.length; i++)
				{
					if(childSnapshot.id==this.comandaSave[i].id){
           this.comandaSave[i].Estatus = '2';
           this.comandaSave[i].plus = 0;
					}
              }
              this.checameCambios(isCoder, childSnapshot)
				// if(idModifica==5)
				// location.reload();
			}


			if(childSnapshot.$key=="Estatus"){
					if(childSnapshot.$value=="10"){
							var d = new Date();
							d.setTime(d.getTime() + (60 * 24 * 60 * 60 * 1000));
							var expires = "expires=" + d['toGMTString']();
							document.cookie = "sendValue" + "=" + code + "_" + ";" + expires + ";path=/";
						}

if(childSnapshot.$value=="4"){

				$('#MyModalAlerts').modal('show');
					$('#alertEntregaPlato').show();
				if(isCoder!=1)
					this.mycodecob='Con este codigo la puedes recoger: '+code;
					this.playSound('');
						$('#alertCancelPlato').hide();
						if(isCoder==1)
						$('#alertOrderOk').hide();
						else
						$('#alertOrderOknoCode').hide();
						for (let i = 0; i < this.comandaSave.length; i++) {
      this.comandaSave[i].Estatus = '8';
  }
				//	this._getService.removeOrder(this.LocalGet.id_Hashed,code);
				//	this.comandaSave=[];
			}
			if(childSnapshot.$value=="11"){

              this.playSound('');
              var someone = this.comandaSave.filter(x => x.Estatus === '2');

              if (someone.length > 0) {
                this.toEncuesta.push(someone[0]);// = someone[0];

              }
			  this.comandaSave=[];
              this.metecookie(localIdHash);
              this.metecodigoRef('');
              this.metecomensa('');
              $('#MyModalAlerts').modal('show');
              $('#alertBye').show();
              this.CierraAlerts('alertEntregaPlato');


			}
		}

  }

  CalifEncuest(califa, plato) {
    this.CalificaEncues = califa + '|' + plato;
  }

  SendComent() {


    var comanta = (<HTMLInputElement>document.getElementById('platocomentEnc')).value;
    var mymail = (<HTMLInputElement>document.getElementById('correoLog')).value;
    var format = /[!#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    var checacal = this.CalificaEncues.split('|');
    if (comanta != '' || checacal[0] != '') {
      if (!format.test(comanta)) {
        var myfec = new Date();
        var fecha = this.formatoDate(myfec, '');
        this._getService.saveComentario(checacal[0] + ' ' + checacal[1], mymail, comanta, this.idLocalhash, fecha.replace('/', '|').replace('/', '|').replace(':', '-').replace(' ', '_')).subscribe(respuesta => {

          if (respuesta.comentario != undefined) {
            this.toEncuesta = [];
            this.agradeceenc = true;
          }
        });
      }
    }

  }


  checameCambios(isCoder, childSnapshot) {
    //console.log(this.comandaSave);


  //  if (this.existMyComand) {
      if (isCoder == 1) {
        var locontiene = false;

        if (this.Comparacion.length == 0) {
          this.Comparacion.push(childSnapshot.fechaCreado);
          this.KeysComapara.push(childSnapshot.$key);
        }
        if (this.countCambios != 1) {
          for (var e = 0; e < this.comandaSave.length; e++) {
            if (this.comandaSave[e].id == childSnapshot.id) {
              var FechaChild = childSnapshot.fechaCreado.split(' ');
              var fechaComand = this.comandaSave[e].fechaCreado.split(' ');
              if (fechaComand[1] != FechaChild[1] && childSnapshot.isKitchen != undefined) {
                //	if(this.comandaSave[e].fechaCreado != childSnapshot.fechaCreado  ){
                if (!this.Comparacion.includes(childSnapshot.fechaCreado)) {




                  var cantidades = this.comandaSave[e].cantidad;
                  this.comandaSave[e].cantidad = 0;
                  this.comandaSave[e].cantidad = (parseInt(cantidades.toString()) + parseInt(childSnapshot.Cantidad.toString()));
                  this.comandaSave[e].costo = this.comandaSave[e].precio * this.comandaSave[e].cantidad;
                  this.comandaSave[e].Estatus = childSnapshot.Estatus;
                  this.comandaSave[e].plus = 0;
                  //	this.comandaSave[e].fechaCreado = childSnapshot.fechaCreado;
                  this.Comparacion.push(childSnapshot.fechaCreado);
                  this.KeysComapara.push(childSnapshot.$key);
                }
                else {
                  var ultimaFecha = this.Comparacion[this.Comparacion.length - 1];

                  if (ultimaFecha == childSnapshot.fechaCreado) {
                    if (!this.KeysComapara.includes(childSnapshot.$key)) {
                      var cantidades = this.comandaSave[e].cantidad;
                      this.comandaSave[e].cantidad = 0;
                      this.comandaSave[e].cantidad = (parseInt(cantidades.toString()) + parseInt(childSnapshot.Cantidad.toString()));
                      this.comandaSave[e].costo = this.comandaSave[e].precio * this.comandaSave[e].cantidad;
                      this.comandaSave[e].Estatus = childSnapshot.Estatus;
                      this.comandaSave[e].plus = 0;
                      this.KeysComapara.push(childSnapshot.$key);
                      this.Comparacion.push(childSnapshot.fechaCreado);
                    }
                  }
                }
              }



              locontiene = true;
            }

          }

          if (!locontiene) {
            if (childSnapshot.plus == undefined)
              childSnapshot.plus = 0;
            this.Comparacion.push(childSnapshot.fechaCreado);
            this.comandaSave.push({
              id: childSnapshot.id,
              Nombre: childSnapshot.Platillo,
              cantidad: childSnapshot.Cantidad,
              precio: childSnapshot.precio,
              Especificaciones: '',
              tama: '',//childSnapshot.tamaos,
              Estatus: childSnapshot.Estatus,
              costo: childSnapshot.costo,
              tamaPrice: '',//Plato.tamaPrice
              fechaCreado: childSnapshot.fechaCreado,
              key: childSnapshot.key,
              plus: childSnapshot.plus

            });
            this.Comparacion.push(childSnapshot.fechaCreado);
            this.KeysComapara.push(childSnapshot.$key);
          }
        }
        else {
          var iscontain = false;
          for (var e = 0; e < this.comandaSave.length; e++) {
            if (this.comandaSave[e].id == childSnapshot.id) {
              iscontain = true;
              if (childSnapshot.isKitchen != undefined) {
                if (!this.Comparacion.includes(childSnapshot.fechaCreado)) {
                  var cantidades = this.comandaSave[e].cantidad;
                  this.comandaSave[e].cantidad = 0;
                  this.comandaSave[e].cantidad = (parseInt(cantidades.toString()) + parseInt(childSnapshot.Cantidad.toString()));
                  this.comandaSave[e].costo = this.comandaSave[e].precio * this.comandaSave[e].cantidad;
                  this.comandaSave[e].Estatus = childSnapshot.Estatus;
                  this.comandaSave[e].plus = 0;
                  this.Comparacion.push(childSnapshot.fechaCreado);
                }
              }
            }
          }
          if (!iscontain) {
            if (childSnapshot.plus == undefined)
              childSnapshot.plus = 0;
            this.Comparacion.push(childSnapshot.fechaCreado);
            this.comandaSave.push({
              id: childSnapshot.id,
              Nombre: childSnapshot.Platillo,
              cantidad: childSnapshot.Cantidad,
              precio: childSnapshot.precio,
              Especificaciones: '',
              tama: '',//childSnapshot.tamaos,
              Estatus: childSnapshot.Estatus,
              costo: childSnapshot.costo,
              tamaPrice: '',//Plato.tamaPrice
              fechaCreado: childSnapshot.fechaCreado,
              key: childSnapshot.key,
              plus: childSnapshot.plus

            });
          }

        }

      }
   // }
    //else {
    //  if (childSnapshot.Estatus.toString() != '3' && childSnapshot.Estatus.toString() != '6') {
    //    if (childSnapshot.id != undefined) {

    //      if (childSnapshot.plus != undefined)
    //       var plusva = childSnapshot.plus;



    //      this.comandaSave.push({
    //        id: childSnapshot.id,
    //        Nombre: childSnapshot.Platillo,
    //        cantidad: childSnapshot.Cantidad,
    //        precio: childSnapshot.precio,
    //        Especificaciones: '',
    //        tama: '',//childSnapshot.tamaos,
    //        Estatus: childSnapshot.Estatus,
    //        costo: childSnapshot.costo,
    //        tamaPrice: '',//Plato.tamaPrice
    //        fechaCreado: childSnapshot.fechaCreado,
    //        key: '',
    //        plus: plusva//datayl[t].plus

    //      });
    //      this.Comparacion.push(childSnapshot.fechaCreado);
    //    }
    //  }
    //}

  }


		playSound(filename){
							document.getElementById("sound").innerHTML ='<audio autoplay="autoplay"><source src="http://ordenofacil.com/Logos/tintin3.ogg" type="audio/ogg" /><embed hidden="true" autostart="true" loop="false" src="https://www.w3schools.com/tags/horse.mp3" /></audio>';
					}

		createUser(){
			var correo=(<HTMLInputElement>document.getElementById('correoLog')).value;
          //var pass=(<HTMLInputElement>document.getElementById('PasswordLog')).value;
          if (correo != '' && this.validateEmail(correo)) {//&& pass!=''){
				//var myPass=btoa(pass);
				
				this.activatedRoute.params.subscribe((params: Params) => {
					let local = params['Esta'];
                  this._getService.creaUser(correo, local).subscribe(
		 response=>{			 
			 if(response.user!=null){
				 //usuario logeado cerramos el pop up de login o mandamos un anuncion de bienvenido
                 document.getElementById('divLogin').style.visibility = "hidden";
                 this.mAIL = correo;
                 $('#alertMailer').show();
								 // hay que guardarlo en alguna cookie y ligar sus platillos si es que tiene para ver que es lo que comio
			 }
			 else{
				 //usuario no logeado
				 $('#alertnologin').show();
			 }
		 });
		});
    }
    else { // no tiene el formato correcto
    }
  }


  SetToGo() {
    var chek = <HTMLInputElement>document.getElementById('isForllevar');
    if (chek.checked) {
      this.togoTrue = true;
    }
    else {

      this.togoTrue = false;
    }
  }

		llamaMese(){
//aqui llamar al mesero pero cuaquiera puede hablarle?
	var codings=(<HTMLInputElement>document.getElementById('CodeNeeded')).value;
	if(codings!='')
	(<HTMLInputElement>document.getElementById('CodeMesa')).value=codings;
	$('#MyModalCallMese').modal('show');

	this.estaCerrao(this.LocalGet.nom_img);
	if(this.cerrado){
$('#alerCerraoCallMese').show();

	}

}

sendCallerMese(){
	var codings=(<HTMLInputElement>document.getElementById('CodeMesa')).value;
	if(codings==''){
			$('#alertNoCoder').show();
			return;
	}
	else{
		this.estaCerrao(this.LocalGet.nom_img);
		if(this.cerrado){
	$('#alerCerraoCallMese').show();

		}
		else{
		this._getService.ValidaCode(codings.toUpperCase(),this.LocalGet.id_SQL).subscribe(
	 response=>{
	 if(response.coderFound==null){

		 $('#alertBadCoder').show();
	 return;
	 }
	 else{
		 
		 this.activatedRoute.params.subscribe((params: Params) => {
			 let tipo = params['typer'];
			 let local = params['Esta'];
		 // hay q registrar al en firebase la llamada en finish
		 this._getService.callMesero(local,codings.toUpperCase(),response.coderFound.Mesa)
		 $('#alertsellamo').show();


	 });
	 }
 });

	}
}


}


myModalPac(paqespe){

		$('#myModalPac').modal('show');
		this.modals=[];
		this.modals=paqespe;
}
myModalEvenprom(eventosPromos){
	$('#myModaleventPromo').modal('show');
  this.modals = [];
  
  if (eventosPromos.Comienza != '') {
    //var comien = Date.parse(eventosPromos.Comienza);
   // console.log(comien);
    var comin = this._getService.formatoDateFromString(eventosPromos.Comienza);
	eventosPromos.Comienza=comin+' hrs.';
}
  if (eventosPromos.Termina != '') {
    var finali = Date.parse(eventosPromos.Termina);
    var term = this._getService.formatoDateFromString(eventosPromos.Termina);
	eventosPromos.Termina=term+' hrs.';
}
	this.modals=eventosPromos ;
	//this.modals.Comienza=new Date()
}


	cantidadTamanos(tamanos){
		
	var chek=	<HTMLInputElement>document.getElementById(tamanos) ;
	if(chek.checked){
		let canti= (<HTMLInputElement>document.getElementById('NUmProduct')).value;
		if(canti=='')
		canti='1';
		var tamaPrecio:string= tamanos;
		var estamadre=tamaPrecio.split('|');

	 (<HTMLInputElement>document.getElementById('CantProd')).value=canti+'_'+estamadre[1]+'_'+estamadre[0];
	// console.log((<HTMLInputElement>document.getElementById('CantProd')).value);
	 }
	}

	GuardameCantidad(tipo){
      
        let canti = (<HTMLInputElement>document.getElementById('NUmProduct')).value;

        if (canti == '')
            canti = '1';

        if (tipo.precio != '0') {
            (<HTMLInputElement>document.getElementById('CantProd')).value = canti + '_' + tipo.precio;

        }
        else {
            if (tipo.tamaPrice != '') {
                var tamañoSelected = (<HTMLInputElement>document.getElementById('CantProd')).value;
                if (tamañoSelected != '') {
                    var spliterTamas = tamañoSelected.split('_');
                    (<HTMLInputElement>document.getElementById('CantProd')).value = canti + '_' + spliterTamas[1] + '_' + spliterTamas[2];
                }
            }
        }

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

	SUscribeNews_CLic(){
		this.recomendaciones = null;
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
                    document.getElementById('msjNoVa').style.visibility = "hidden";
                    $("html, body").delay(100).animate({ scrollTop: $('#appnose').offset().top }, 2000);
                    this.LoNuevo = 'Resultados de la Busqueda';
                    this.recomendaciones = response.buscados;

                  }
									else {
									                    $('#alertNoResults').show();
									                    
									                  }

									                }
									                else {
									                  $('#alertNoResults').show();
									                 
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
                  //this.recomendaciones = this.recomendaciones2;
 	           });
	           // va x todas las lats y va comparando quien si quien no y sacas un listado
	             //let meters = this._haversineService.getDistanceInMeters(bilbao, actual);
	         });
	       }
	       //obtiene los cercanos
	       //if (typeof navigator.geolocation == 'object') {
	       //  navigator.geolocation.getCurrentPosition(this.mostrarUbicacion);
	       //}
	     }

	    ///var latLnCurrency = '';


   ///var latLnCurrency = '';
   mostrarUbicacion(p) {
     var latLnCurrency = p.coords.latitude + ',' + p.coords.longitude;
     
     //let actual = {
     //  latitude: latLnCurrency.Coordinates.latitude,
     //  longitude: datos.lng
     //};
     //// va x todas las lats y va comparando quien si quien no y sacas un listado
     //let meters = this._haversineService.getDistanceInMeters(bilbao, actual);
  }

  AbreservDom() {
    $('#MymodalServDom').modal('show');
  }

  guardaDataServDom() {


    
    var NAmetogo = '';
   
      NAmetogo = (<HTMLInputElement>document.getElementById('Nametogopop')).value;
      var celtogo = (<HTMLInputElement>document.getElementById('CeltoGopop')).value;
      var MailToGo = (<HTMLInputElement>document.getElementById('MailToGopop')).value;
      var directoGo = (<HTMLInputElement>document.getElementById('directoGopop')).value;

    if (NAmetogo != '' && celtogo != '' && MailToGo != '' && directoGo != '') {

      var pasacel = parseInt(celtogo);

      if (isNaN(pasacel) && !isFinite(pasacel)) {
        $('#alertBadCelpop').show();
        this.Allevar = false;
        
        return;
      }

      if (this.validateEmail(MailToGo))
        this.Allevar = true;
      else {
        $('#alertBadMAilpop').show();
        this.Allevar = false;        
        return;
      }

      this.serdomPop.push({ "Nombre": NAmetogo, "Cel": celtogo, "Mail": MailToGo, "Direccion": directoGo});

      $('#alertServDom').show();


    }

        else {
      $('#alertFaltanFieldspop').show();      
      return;
      
    }

  }

  abreCantos(platos, is_update) {

    
    this.CierraAlerts('alertNotama');
this.modals=[];

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


    if (platos != undefined) {
      if (platos.tamaPrice != "" && platos.tamaPrice != undefined) {
        this.arregloPrTm = platos.tamaPrice.split(',');
      }
      else
        this.arregloPrTm = '';

      if (platos.precio != '0') {
        this.intproducto = platos.precio;
      }
      this.modals = platos;
    }

  }



  

agregaPedido(Plato, mostrarOrden)
{

  
  if (Plato._id != undefined)
    Plato.id = Plato._id;



	let yaexiste=false;
		var cantidades=(<HTMLInputElement>document.getElementById('CantProd')).value;
		
	var especif=(<HTMLInputElement>document.getElementById('EspefTxt')).value;
let cantidaa=0;
var price=0;
var cantSplit=[];
var name=Plato.Nombre;
var tamaos='';
var precioOriginal=0;
	if(Plato.precio==0 && cantidades=='')
	{
		$('#alertNotama').show();
		return ;
	}



	if(cantidades==''){

	cantidaa=1;
	price=Plato.precio;
	
}
	else
	{
		if(cantidades=='1'){
		cantidaa=1;
		price=Plato.precio;
	}
	else{
			cantSplit=cantidades.split('_');
						

				price=+cantSplit[0]*+cantSplit[1];
				cantidaa=+cantSplit[0];
				if(cantSplit.length>2)
				{
				name=Plato.Nombre+' '+cantSplit[2];
				tamaos=cantSplit[2];
			}
		}
	}

	for (let i=0; i<this.comandaSave.length; i++)
	{

		if(Plato.id==this.comandaSave[i].id) {
          var mystatus = this.comandaSave[i].Estatus;
			if(this.is_Updatering==0){
              yaexiste = true;
              
              if (this.comandaSave[i].Estatus.toString() == '3' && this.comandaSave[i].Estatus.toString() == '6')
                mystatus = '';
              this.comandaSave[i].cantidad += cantidaa;
              this.comandaSave[i].plus= cantidaa;
              this.comandaSave[i].Estatus = mystatus;// this.comandaSave[i].Estatus;
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
		$('#alertSecambio').show();
      
this.comandaSave[i].tama=tamaos;
this.comandaSave[i].Nombre=name;
this.comandaSave[i].costo=price;
//this.comandaSave[i].precio=Plato.precio;

this.comandaSave[i].cantidad=cantidaa;

// aqui meter un if pa ver si ya esta guardadao
this.actualizaDesdeCiente(this.comandaSave[i],5);

}
		}
	}

  
		var d = new Date();
	var fechaFor=this.formatoDate(d,'');
		this.countCambios=1;

  if (!yaexiste && this.is_Updatering == 0)
  {

if(Plato.costo==0 || Plato.costo==undefined){
	this.comandaSave.push({
		id:Plato.id,
		Nombre:name,//Plato.Nombre,
		cantidad:cantidaa,
		precio:Plato.precio,
		Especificaciones:especif,
		tama:tamaos,
		Estatus:'',
		costo:price,
		tamaPrice:Plato.tamaPrice,
		fechaCreado:fechaFor,
      key: '1',
        plus:0
	});
}
else
{
	this.comandaSave.push({
		id:Plato.id,
		Nombre:name,//Plato.Nombre,
		cantidad:cantidaa,
		precio:Plato.precio,
		Especificaciones:especif,
		tama:tamaos,
		Estatus:'',
		costo:Plato.costo,
		tamaPrice:Plato.tamaPrice,
		fechaCreado:fechaFor,
      key: '1',
      plus: 0
	});
 }
  }


  this.fechas.push(Plato.id);
  
  this.Comparacion.push(fechaFor);


$('#myModalUpdate').modal('hide');
(<HTMLInputElement>document.getElementById('CantProd')).value='';
(<HTMLInputElement>document.getElementById('EspefTxt')).value='';

    this.is_Updatering = 0;
  //  this.metecookie();

if(mostrarOrden)
    this.abreComanda();

  //else
  //this.verificaCompatibilidad();


  
  }


  verificaCompatibilidad() {
    var CodeClient = this.getCookie('RefApc');
    if (CodeClient != '') {

      var mycodeCliente = atob(CodeClient);


      this.suscripcion = this._getService.checaConfirma(this.LocalGet.id_Hashed, mycodeCliente).subscribe(datayl => {

       

        let locontiene = false;

       
        for (var t = 0; t < datayl.length; t++) {

          //var micomandante = this.getCookie('MyComand' + this.LocalGet.id_Hashed);
          
          //if (micomandante != '') { 
          locontiene = false;
          var plusva = 0;
          if (datayl[t].fechaCreado != undefined) {
            var FechaChild = datayl[t].fechaCreado.split(' ');
            for (var e = 0; e < this.comandaSave.length; e++) {


              if (this.comandaSave[e].id == datayl[t].id) {



                var fechaComand = this.comandaSave[e].fechaCreado.split(' ');

                if (this.comandaSave[e].fechaCreado != datayl[t].fechaCreado && datayl[t].isKitchen != undefined) {

                  if (!this.Comparacion.includes(datayl[t].fechaCreado)) {

                    if (datayl[t].Estatus.toString() != '3' && datayl[t].Estatus.toString() != '6') {

                      if (datayl[t].plus != undefined)
                        plusva = datayl[t].plus;
                      else
                        plusva = 0;

                      this.Comparacion.push(datayl[t].fechaCreado);
                      var cantidades = this.comandaSave[e].cantidad;
                      this.comandaSave[e].cantidad = 0;
                      this.comandaSave[e].cantidad = (parseInt(cantidades.toString()) + parseInt(datayl[t].Cantidad.toString()));
                      this.comandaSave[e].costo = this.comandaSave[e].precio * this.comandaSave[e].cantidad;
                      this.comandaSave[e].Estatus = datayl[t].Estatus;
                      this.comandaSave[e].plus = plusva;

                    }
                    else {

                      if (!this.fechas.includes(this.comandaSave[e].id))
                        this.comandaSave.splice(e, 1);

                      datayl.splice(t, 1);


                    }
                  }
                }
                else {

                  if (datayl[t].Estatus.toString() != '3' && datayl[t].Estatus.toString() != '6') {
                    this.comandaSave[e].Estatus = datayl[t].Estatus;

                    //if (this.comandaSave[e].fechaCreado != datayl[t].fechaCreado) {
                    //  if (datayl[t].isKitchen == undefined) {
                    //    if (!this.Comparacion.includes(datayl[t].fechaCreado)) {
                    //      console.log(this.comandaSave[e].fechaCreado + '  ' + datayl[t].fechaCreado + ' Plato=' + datayl[t].Platillo);
                    //      if (datayl[t].plus != undefined)
                    //        plusva = datayl[t].plus;
                    //      this.Comparacion.push(datayl[t].fechaCreado);
                    //      var cantidades = this.comandaSave[e].cantidad;
                    //      this.comandaSave[e].cantidad = 0;
                    //      this.comandaSave[e].cantidad = (parseInt(cantidades.toString()) + parseInt(datayl[t].Cantidad.toString()));
                    //      this.comandaSave[e].costo = this.comandaSave[e].precio * this.comandaSave[e].cantidad;
                    //      this.comandaSave[e].Estatus = datayl[t].Estatus;
                    //      this.comandaSave[e].plus = plusva;
                    //      this.Comparacion.push(datayl[t].fechaCreado);
                    //    }
                    //  }
                    //}

                  }
                  else {

                    if (!this.fechas.includes(this.comandaSave[e].id))
                      this.comandaSave.splice(e, 1);

                    datayl.splice(t, 1);
                  }

                }

                locontiene = true;
                //  }
              }
              //else
              //  locontiene = true;
            }

            if (!locontiene) {

              if (datayl[t].Estatus.toString() != '3' && datayl[t].Estatus.toString() != '6') {
                if (datayl[t].id != undefined) {

                  if (datayl[t].plus != undefined)
                    plusva = datayl[t].plus;
                  else
                    plusva = 0;


                  this.comandaSave.push({
                    id: datayl[t].id,
                    Nombre: datayl[t].Platillo,
                    cantidad: datayl[t].Cantidad,
                    precio: datayl[t].precio,
                    Especificaciones: '',
                    tama: '',//childSnapshot.tamaos,
                    Estatus: datayl[t].Estatus,
                    costo: datayl[t].costo,
                    tamaPrice: '',//Plato.tamaPrice
                    fechaCreado: datayl[t].fechaCreado,
                    key: '',
                    plus: plusva//datayl[t].plus

                  });
                  this.Comparacion.push(datayl[t].fechaCreado);
                }
              }
              //this.Comparacion.push(childSnapshot.fechaCreado);
              //this.KeysComapara.push(childSnapshot.$key);
            }


          }
          else {
            if (datayl[t].$key == 'Allevar') {
              if (datayl[t].$value)
                (<HTMLInputElement>document.getElementById('isForllevar')).checked = true;
            }
          }
         // }
          //else {
          //  if (datayl[t].Estatus.toString() != '3' && datayl[t].Estatus.toString() != '6') {
          //    if (datayl[t].id != undefined) {

          //      if (datayl[t].plus != undefined)
          //        plusva = datayl[t].plus;



          //      this.comandaSave.push({
          //        id: datayl[t].id,
          //        Nombre: datayl[t].Platillo,
          //        cantidad: datayl[t].Cantidad,
          //        precio: datayl[t].precio,
          //        Especificaciones: '',
          //        tama: '',//childSnapshot.tamaos,
          //        Estatus: datayl[t].Estatus,
          //        costo: datayl[t].costo,
          //        tamaPrice: '',//Plato.tamaPrice
          //        fechaCreado: datayl[t].fechaCreado,
          //        key: '',
          //        plus: plusva//datayl[t].plus

          //      });
          //      this.Comparacion.push(datayl[t].fechaCreado);
          //    }
          //  }
          //}

        }
        this.fechas = [];
        if (this.comandaSave.length > 0)
          this.metecookie(this.LocalGet.id_Hashed);


     
      });
      // subscription.unsubscribe();
      
    }
  }



abreComanda()
{
  this.CierraAlerts('alertEntregaPlato');
  this.CierraAlerts('alertOrderOknoCode');
  this.CierraAlerts('alertOrderOk');
  this.CierraAlerts('alertCancelPlato');
  this.CierraAlerts('alertBye');
  
  
  
  
  

  this.verificaCompatibilidad();

  
  $('#MyModalPedido').modal('show');
  if (this.SepuedePedir == 1)
  document.getElementById('btnOrderCo').style.visibility = "visible";

}



quitarSeleccion(idSelected,desdeCocina)
{
  
	var chek=	<HTMLInputElement>document.getElementById(idSelected) ;
	if(chek!=null){
	if(chek.checked ||desdeCocina){
		let confirmo=false;
		if(!desdeCocina)
		confirmo=confirm("Estas seguro de eliminar este producto?");
		else
		confirmo=desdeCocina;

	if(confirmo) {
      this.comandaDelete = this.comandaSave;
      
	this.comandaSave=[];

	for(let i=0;i<this.comandaDelete.length; i++)
    {
      
      if (this.comandaDelete[i].id != idSelected) {
        
        var someone = this.comandaSave.filter(x => x.id === idSelected);
        
        if (!someone) {
          this.comandaSave.push(
            {
              id: this.comandaDelete[i].id,
              Nombre: this.comandaDelete[i].Nombre,
              cantidad: this.comandaDelete[i].cantidad,
              precio: this.comandaDelete[i].precio,
              Especificaciones: this.comandaDelete[i].Especificaciones,
              tama: this.comandaDelete[i].tama,
              Estatus: this.comandaDelete[i].Estatus,
              costo: this.comandaDelete[i].costo,
              tamaPrice: this.comandaDelete[i].tamaPrice,
              fechaCreado: this.comandaDelete[i].fechaCreado,
              key: '',
              plus: this.comandaDelete[i].plus

            });
        }
      }
      else {
        
        if (this.comandaDelete[i].Estatus != '2') {
          if (this.comandaDelete[i].cantidad > 1) {
            let newPrice = 0;
            if (this.comandaDelete[i].precio != 0)
              newPrice = this.comandaDelete[i].precio * (this.comandaDelete[i].cantidad - 1);
            else {
              let my_price = this.comandaDelete[i].costo / (this.comandaDelete[i].cantidad);
              newPrice = my_price * (this.comandaDelete[i].cantidad - 1);
            }
            if (this.comandaDelete[i].id != idSelected) {
              
              this.comandaSave.push(
                {
                  id: this.comandaDelete[i].id,
                  Nombre: this.comandaDelete[i].Nombre,
                  cantidad: 0,//(this.comandaDelete[i].cantidad-1),
                  precio: 0,//this.comandaDelete[i].precio,//-newPrice,
                  Especificaciones: this.comandaDelete[i].Especificaciones,
                  tama: this.comandaDelete[i].tama,
                  Estatus: '',
                  costo: newPrice,//this.comandaDelete[i].costo
                  tamaPrice: this.comandaDelete[i].tamaPrice,
                  fechaCreado: this.comandaDelete[i].fechaCreado,
                  key: '',
                  plus: this.comandaDelete[i].plus
                });
            }
            if (!desdeCocina) {

              this.actualizaDesdeCiente(this.comandaDelete[i], 6);
            }



          }
          else {

            if (!desdeCocina)
              this.actualizaDesdeCiente(this.comandaDelete[i], 6);
          }
        }
        else {
          //this.comandaSave.push(
          //  {
          //    id: this.comandaDelete[i].id,
          //    Nombre: this.comandaDelete[i].Nombre,
          //    cantidad: 0,//(this.comandaDelete[i].cantidad-1),
          //    precio: 0,//this.comandaDelete[i].precio,//-newPrice,
          //    Especificaciones: this.comandaDelete[i].Especificaciones,
          //    tama: this.comandaDelete[i].tama,
          //    Estatus: '',
          //    costo: 0,//this.comandaDelete[i].costo
          //    tamaPrice: this.comandaDelete[i].tamaPrice,
          //    fechaCreado: this.comandaDelete[i].fechaCreado,
          //    key: '',
          //    plus: this.comandaDelete[i].plus
           // });
        }
		}
	}

      this.metecookie(this.LocalGet.id_Hashed);
}
else{
	chek.checked=false;
}

}
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

 actualizaDesdeCiente(comanda,idModifica){

	 var codigo='';
		if(this.needCode  )
		{
          codigo = (<HTMLInputElement>document.getElementById('CodeNeeded')).value;
          if (codigo == '')
            codigo = atob(this.getCookie('RefApc'));
          codigo =codigo.toUpperCase();
          
		}
		else{
          codigo = (<HTMLInputElement>document.getElementById('NameOrder')).value;
          codigo = this.getCookie('mYComensa');
       
		}
   
 
   if (codigo != '')
			{
		this.activatedRoute.params.subscribe((params: Params) => {
			let tipo = params['typer'];
			let local = params['Esta'];
		this._getService.updateOrQuitar(local,codigo,comanda,idModifica,this.needCode);
		});

		}

 }

 singinUser(){
	let  correo=(<HTMLInputElement>document.getElementById('correoLog')).value;
	let pass=(<HTMLInputElement>document.getElementById('PasswordLog')).value;


 }

}
