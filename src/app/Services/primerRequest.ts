import {Injectable} from '@angular/core';
import {Http,Response,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
//import {Observable} from 'rxjs/Observable';
import {GLOBAL} from './global';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database';


@Injectable()
export class GetService{
public url:string;
public identity;
public token;
ComandasGet: Observable<any[]>;
ComandasGetCodes: Observable<any[]>;
MyComanda:any[]=[];
final_data: Array<any> = [];

constructor(private _http: Http, private afDB:AngularFireDatabase)
{
this.url=GLOBAL.url;
}



  damelosactivos() {
    let headers = new Headers({ 'content-type': 'application/json' });
    return this._http.post(this.url + 'SearchNear',  { headers: headers })
      .map(res => res.json());

  }

 

GetTypeSeaarch(tipe_Search, search) {
  //let json=JSON.stringify({typer:'dnE6XnhrjrU=',Esta:'9YiXOJhlzhk='});
  let json = JSON.stringify({ typer: tipe_Search, Busqueda: search });
  let params = json;//'dnE6XnhrjrU=/9YiXOJhlzhk=';
  //let headers=new Headers({'Acces-Controll-Allow-Origin':'*','content-type':'application/json','Cache-Control':'No-Cache'});
  let headers = new Headers({ 'content-type': 'application/json' });
  return this._http.post(this.url + 'searchGet/' + tipe_Search + '/' + search, params, { headers: headers })
    .map(res => res.json());

}

 signUp(tipe_Local, idLocal, timer)
{
	//let json=JSON.stringify({typer:'dnE6XnhrjrU=',Esta:'9YiXOJhlzhk='});
	let json=JSON.stringify({typer:tipe_Local,Esta:idLocal, Time:timer});
	let params=json;//'dnE6XnhrjrU=/9YiXOJhlzhk=';
	//let headers=new Headers({'Acces-Controll-Allow-Origin':'*','content-type':'application/json','Cache-Control':'No-Cache'});
	let headers=new Headers({'content-type':'application/json'});
	return this._http.post(this.url+'getordereasy/'+tipe_Local+'/'+idLocal+ '/' + timer, params, {headers:headers})
	            .map(res=>res.json());

}

removeOrder(local,codigo){
  //this.afDB.object('/VROckX8bGB8=/'+codigo).remove();
}

getCUenta(local,codigo, fecha){
  let params=JSON.stringify({Local:local, codigo:codigo, timer:fecha});
  let headers=new Headers({'content-type':'application/json'});
	return this._http.post(this.url+'myCount', params, {headers:headers})
	            .map(res=>res.json());
}

setComandaEntregada(local,codigo,comanda, id){
var d = new Date();
let date=this.formatoDate(d);

  //this.afDB.object('/VROckX8bGB8=/'+codigo).remove();
  let promise=this.afDB.object(local+'/'+codigo+'/')
  .update({Estatus:"4",FechaEntregado:date});

//  let promisa=this.afDB.object(local+'/'+codigo+'/'+id)
  //.update({Estatus:"4"});
  let params = '';
  if (comanda.mesa != undefined)
    params = JSON.stringify({ codigoStr: codigo, local: local, platillos: comanda.snap, Fecha_Creada: comanda.snap[0].fechaCreado, fecha_Entrega: date, Estatus: 4, mesa: comanda.mesa, Allevar: comanda.Allevar });
  else
    params = JSON.stringify({ codigoStr: codigo, local: local, platillos: comanda.snap, Fecha_Creada: comanda.snap[0].fechaCreado, fecha_Entrega: date, Estatus: 4, mesa: 0, Allevar: comanda.Allevar });
	let headers=new Headers({'content-type':'application/json'});
	return this._http.post(this.url+'SetComandas', params, {headers:headers})
	            .map(res=>res.json());
}

payComanda(codigo,idCOmanda){

  
  let params = JSON.stringify({ id: idCOmanda, Codigo: codigo});
	let headers=new Headers({'content-type':'application/json'});
	return this._http.post(this.url+'PayComand', params, {headers:headers})
	            .map(res=>res.json());

}

saveComentario(Nombre,mail,comenta, local, fecha){

  let params=JSON.stringify({Name:Nombre,Local:local, mail:mail,comenta:comenta,fec:fecha});
	let headers=new Headers({'content-type':'application/json'});

	return this._http.post(this.url+'saverComent', params, {headers:headers})
	            .map(res=>res.json());
}

GetComandByCode(code, local){
    
  let params=JSON.stringify({code:code,Local:local});
	let headers=new Headers({'content-type':'application/json'});
  
	return this._http.post(this.url+'GetComandByCode', params, {headers:headers})
	            .map(res=>res.json());
  }


  GetComandByTable(code, local) {

    let params = JSON.stringify({ code: code, Local: local });
    let headers = new Headers({ 'content-type': 'application/json' });

    return this._http.post(this.url + 'GetComandByTable', params, { headers: headers })
      .map(res => res.json());
  }
  

saveRank(userloged, rank, local,platillos, fecha)
{
  let params=JSON.stringify({usuario:userloged,Local:local, calif:rank, fecha:fecha});
  let headers=new Headers({'content-type':'application/json'});
  
  return this._http.post(this.url+'rankeo', params, {headers:headers})
              .map(res=>res.json());
}


  SaveServicetogo(Nombre, locals, correo, tel, direct, lat, lng) {
    let params = JSON.stringify({ Nombre: Nombre, Local: locals, correo: correo, telefono:tel, direccion:direct,lat:lat,lng:lng });

    let headers = new Headers({ 'content-type': 'application/json' });

    return this._http.post(this.url + 'SaveDirectTogo' , params, { headers: headers })
      .map(res => res.json());
  }


ValidaCode(Codigin, locals){
	let params=JSON.stringify({code:Codigin,Local:locals});
  
	let headers=new Headers({'content-type':'application/json'});
  
	return this._http.post(this.url+'VerifyCode/'+Codigin+'/'+locals, params, {headers:headers})
	            .map(res=>res.json());
  }

  getServicioDomi(local, idServicio) {
    let params = JSON.stringify({ Servicio: idServicio, Local: local });
    let headers = new Headers({ 'content-type': 'application/json' });
    return this._http.post(this.url + 'GetServicio' , params, { headers: headers })
      .map(res => res.json());
  }

validaToken(Token) {
    //Token = Token.replace('_', '.').replace('_', '.');
  let params = JSON.stringify({ Token: Token });
  
  let headers = new Headers({ 'content-type': 'application/json' });
  return this._http.post(this.url + 'Vigenciacheck/' + Token+ '/' , params, { headers: headers })
    .map(res => res.json());
  }

setNewplato(id,platillo){
  let params=JSON.stringify({id:id,fechaCreado:platillo.fechaCreado,Platillo:platillo.Platillo,Mesa:platillo.Mesa,Estatus:platillo.Estatus,Cantidad:platillo.Cantidad, precio:platillo.precio});
  let headers=new Headers({'content-type':'application/json'});
  return this._http.post(this.url+'newPlatillo', params, {headers:headers})
              .map(res=>res.json());

}

getSixLocals(){
//let params=JSON.stringify(user_Update);
	let headers=new Headers({'content-type':'application/json'});
	return this._http.post(this.url+'updateUser/', {headers:headers})
	            .map(res=>res.json());
}

 returncaracter(mesa, local)
      {
        let params=JSON.stringify({Mesa:mesa,Local:local,Origen:1});
        let headers=new Headers({'content-type':'application/json'});
      	return this._http.post(this.url+'SetCaracter/'+local+'/'+mesa+'/1',params, {headers:headers})
      	            .map(res=>res.json());

      }
//           var idC='a';
// id=parseInt(id);
//           switch (id)
//           {
//               case 0:
//                   idC = 'A';
//                   break;
//               case 1:
//                   idC = 'B';
//                   break;
//               case 2:
//                   idC = 'C';
//                   break;
//               case 3:
//                   idC = 'D';
//                   break;
//               case 4:
//                   idC = 'E';
//                   break;
//               case 5:
//                   idC = 'F';
//                   break;
//               case 6:
//                   idC = 'G';
//                   break;
//               case 7:
//                   idC = 'H';
//                   break;
//               case 8:
//                   idC = 'I';
//                   break;
//               case 9:
//                   idC = 'J';
//                   break;
//               case 10:
//                   idC = 'K';
//                   break;
//               case 11:
//                   idC = 'L';
//                   break;
//               case 12:
//                   idC = 'M';
//                   break;
//               case 13:
//                   idC = 'N';
//                   break;
//               case 14:
//                   idC = 'O';
//                   break;
//               case 15:
//                   idC = 'P';
//                   break;
//               case 16:
//                   idC = 'Q';
//                   break;
//               case 17:
//                   idC = 'R';
//                   break;
//               case 18:
//                   idC = 'S';
//                   break;
//               case 19:
//                   idC = 'T';
//                   break;
//               case 20:
//                   idC = 'U';
//                   break;
//               case 21:
//                   idC = 'V';
//                   break;
//               case 22:
//                   idC = 'X';
//                   break;
//               case 23:
//                   idC = 'Y';
//                   break;
//               case 24:
//                   idC = 'Z';
//                   break;
//
//
//           }
//     console.log(idC);
//           return idC;
//       }

creaUser(mail,pass,local){

  let headers = new Headers({ 'content-type': 'application/json' });
  return this._http.post(this.url + 'newValidateUser/' + mail+'/'+pass+'/'+local, { headers: headers })
    .map(res => res.json());

}

getIdentity(){
	let identity=JSON.parse(localStorage.getItem('identity'));
	if(identity!="undefined"){
		this.identity=identity;
	}
	else
	{
		this.identity=null;
	}
	return this.identity;
}
getToken(){
	let token=localStorage.getItem('token');
	if(token!='')
	{
	this.token=token;
	}
	else
		this.token=null

	return this.token;
}


  formatoDate(date) {
        
	 var d = date,//new Date(),//date.replace("GMT+0000","").replace("GMT+0100","")),
			 month = '' + (d.getMonth() + 1),
			 day = '' + d.getDate(),
			 year = d.getFullYear(),
       hour= '' +d.getHours(),
       minute='' +d.getMinutes();


	 if (month.length < 2) month = '0' + month;
	 if (day.length < 2) day = '0' + day;
   if (hour.length < 2) hour = '0' + hour;
   if (minute.length < 2) minute = '0' + minute;

	 return [day,month,year ].join('/')+' '+hour+':'+minute;
  }

  formatoDateFromString(date) {
    
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

    return [day, month, year].join('/') + ' ' + hour + ':' + minute;
  }



  meteComandaCocina(Comanda, local, codigo, isCode, mesa, hayQBorrar, numlocal, parallevar)
{

  var date_=new Date();
let  month = '' + (date_.getMonth() + 1);
let  day = '' + date_.getDate();
let  year = date_.getFullYear();
let  hour= '' +date_.getHours();
let  minute='' +date_.getMinutes();


if (month.length < 2) month = '0' + month;
if (day.length < 2) day = '0' + day;
if (hour.length < 2) hour = '0' + hour;
if (minute.length < 2) minute = '0' + minute;

var fechaSolicitado= [day,month,year ].join('/')+' '+hour+':'+minute;


    this.xconform(local, codigo, parallevar,'');
for(var i=0;i<Comanda.length;i++){

  var estatur='';
  
  if(Comanda[i].Estatus!=undefined)
  estatur=Comanda[i].Estatus;
  else{
      if(isCode)
      estatur='1';
      else
      estatur='0';
  }
    let promesa =null;
  if(Comanda[i].tama=='' && Comanda[i].tama!= undefined){
    if(isCode){
   promesa = this.afDB.list('/'+local+'/'+codigo)
  .push({'Cantidad':Comanda[i].cantidad, 'Platillo':Comanda[i].Nombre+' '+Comanda[i].Especificaciones, 'Estatus':estatur, 'Mesa':mesa, 'isCode':true,'id':Comanda[i].id, fechaCreado:fechaSolicitado, 'precio':Comanda[i].precio,'costo':Comanda[i].costo, 'isKitchen':1});
}
else{
  promesa = this.afDB.list('/'+local+'/'+codigo)
 .push({'Cantidad':Comanda[i].cantidad, 'Platillo':Comanda[i].Nombre+' '+Comanda[i].Especificaciones, 'Estatus':estatur, 'isCode':false,'id':Comanda[i].id, fechaCreado:fechaSolicitado , 'precio':Comanda[i].precio,'costo':Comanda[i].costo, 'isKitchen':1})
   .update({callMesero:false});
}
}
else
{
  if(isCode){
  promesa = this.afDB.list('/'+local+'/'+codigo)
  .push({'Cantidad':Comanda[i].cantidad, 'Platillo':Comanda[i].Nombre+' '+Comanda[i].Especificaciones, 'Estatus':estatur,'tamaño':Comanda[i].tama, 'Mesa':mesa, 'isCode':true,'id':Comanda[i].id, fechaCreado:fechaSolicitado , 'precio':Comanda[i].precio,'costo':Comanda[i].costo, 'isKitchen':1});
}
else
{
  promesa = this.afDB.list('/'+local+'/'+codigo)
  .push({'Cantidad':Comanda[i].cantidad, 'Platillo':Comanda[i].Nombre+' '+Comanda[i].Especificaciones, 'Estatus':estatur,'tamaño':Comanda[i].tama, 'isCode':false,'id':Comanda[i].id, fechaCreado:fechaSolicitado, 'precio':Comanda[i].precio,'costo':Comanda[i].costo, 'isKitchen':1})
  .update({callMesero:false});
}
}
  promesa
    .then()
  //.then(_ => console.log('si va cocina'))
  //  .catch(err => console.log(err, 'You dont have ac  cess!'));


}

//return  this.afDB.list('/'+local+'/'+codigo);
}

guardaCodigoCocina(codigo,local,mesa){

  let params=JSON.stringify({Codigo:codigo,Local:local,Mesa:mesa,Origen:1});
  let headers=new Headers({'content-type':'application/json'});
  return this._http.post(this.url+'guardaCodigoCocina', params, {headers:headers})
              .map(res=>res.json());

}



setComanda(Comanda,local,codigo, isCode, mesa, hayQBorrar,parallevar, idServicio):Observable<any[]>
{

  var date_=new Date();
let  month = '' + (date_.getMonth() + 1);
let  day = '' + date_.getDate();
let  year = date_.getFullYear();
let  hour= '' +date_.getHours();
let  minute='' +date_.getMinutes();


if (month.length < 2) month = '0' + month;
if (day.length < 2) day = '0' + day;
if (hour.length < 2) hour = '0' + hour;
if (minute.length < 2) minute = '0' + minute;

var fechaSolicitado= [day,month,year ].join('/')+' '+hour+':'+minute;


if(hayQBorrar)
    this.afDB.object(local + '/' + codigo).remove();


//  var adaRankRef = this.afDB.object('/' + local + '/' + codigo).$ref.transaction(currentRank => {
//    console.log(currentRank);
//  if(currentRank!= null)
//{
//  console.log(currentRank);
// let promesa = this.afDB.object(local+'/'+codigo).remove();
// if(!isCode)
//this.xconform(local,codigo);
//}
//
//});

  //this.afDB.object(local + '/' + codigo + '/')
  //  .update({ Allevar: parallevar });

for(var i=0;i<Comanda.length;i++){

  var estatur = '';

  if (Comanda[i].plus == undefined)
    Comanda[i].plus = 0;
  
  if(Comanda[i].Estatus!=undefined)
  estatur=Comanda[i].Estatus;
  else{
      if(isCode)
      estatur='1';
      else
      estatur='0';
  }
    let promesa =null;
  if(Comanda[i].tama=='' && Comanda[i].tama!= undefined){
    if(isCode){
   promesa = this.afDB.list('/'+local+'/'+codigo)
     .push({ 'Cantidad': Comanda[i].cantidad, 'Platillo': Comanda[i].Nombre + ' ' + Comanda[i].Especificaciones, 'Estatus': estatur, 'Mesa': mesa, 'isCode': true, 'id': Comanda[i].id, fechaCreado: fechaSolicitado, 'precio': Comanda[i].precio, 'costo': Comanda[i].costo, 'plus': Comanda[i].plus});
}
else{
  promesa = this.afDB.list('/'+local+'/'+codigo)
    .push({ 'Cantidad': Comanda[i].cantidad, 'Platillo': Comanda[i].Nombre + ' ' + Comanda[i].Especificaciones, 'Estatus': estatur, 'isCode': false, 'id': Comanda[i].id, fechaCreado: fechaSolicitado, 'precio': Comanda[i].precio, 'costo': Comanda[i].costo, 'plus': Comanda[i].plus})
   .update({callMesero:false});
}
}
else
{
  if(isCode){
  promesa = this.afDB.list('/'+local+'/'+codigo)
    .push({ 'Cantidad': Comanda[i].cantidad, 'Platillo': Comanda[i].Nombre + ' ' + Comanda[i].Especificaciones, 'Estatus': estatur, 'tamaño': Comanda[i].tama, 'Mesa': mesa, 'isCode': true, 'id': Comanda[i].id, fechaCreado: fechaSolicitado, 'precio': Comanda[i].precio, 'costo': Comanda[i].costo, 'plus': Comanda[i].plus});
}
else
{
  promesa = this.afDB.list('/'+local+'/'+codigo)
    .push({ 'Cantidad': Comanda[i].cantidad, 'Platillo': Comanda[i].Nombre + ' ' + Comanda[i].Especificaciones, 'Estatus': estatur, 'tamaño': Comanda[i].tama, 'isCode': false, 'id': Comanda[i].id, fechaCreado: fechaSolicitado, 'precio': Comanda[i].precio, 'costo': Comanda[i].costo, 'plus': Comanda[i].plus})
  .update({callMesero:false});
}
}
  promesa
    .then()
  //.then(_ => console.log('success'))
   
  //  .catch(err => console.log(err, 'You dont have ac  cess!'));

  this.xconform(local, codigo, parallevar, idServicio);
}

return  this.afDB.list('/'+local+'/'+codigo);
}

  checaConfirma(local, codigos) {
    
return  this.afDB.list('/'+local+'/'+codigos);
}

getComandas( local ):Observable<any[]>{
//this.ComandasGet=this.afDB.list('/VROckX8bGB8=/28X587');
//this.ComandasGet=new Observable<any[]>();
//return this.afDB.list('/VROckX8bGB8=',{query:{orderByChild:'fechaCreado'}});
return this.afDB.list(local,{query:{orderByChild:'fechaCreado'}});

  }



ComandasGetCode(local,codigo):Observable<any[]>{
  //console.log(local);
  //this.ComandasGetCodes=new Observable<any[]>();
  //this.ComandasGetCodes=
  return this.ComandasGetCodes=this.afDB.list(local+'/'+codigo);


}

VaMesero(local,Codigo){
  this.afDB.object(local+'/'+Codigo).
  update({callMesero:false});
}

callMesero(local,codigo,mesa)
{
  this.afDB.object(local+'/'+codigo).
  update({callMesero:true,Mesa:mesa});
  //return 'true';
}


AcceptOrder(local,codigo,id){
  let promesa = this.afDB.object(local+'/'+codigo)
 .update({isCode:true});
}
  xconform(local, codigo,  parallevar, idServicio){
  
  let promesa = this.afDB.object(local+'/'+codigo)
    .update({ isCode: false, Estatus: '', Allevar: parallevar, idService: idServicio});
}


AcceptOrderEntregada(local,codigo,id){

  //let promesa = this.afDB.object(local+'/'+codigo)
 //.update({isCode:true});

 let promeson = this.afDB.object(local+'/'+codigo+'/'+id)
.update({isCode:true, isconfirm:1});
}

declineComand(local,codigo){
  let promise=this.afDB.list(local+'/'+codigo).remove();

}
entregacomandFinish(local,codigo,valorPAram)
{
  let promeson = this.afDB.object(local+'/'+codigo)
  .update({Estatus:valorPAram});
}

cancelPlato(local,codigo,id, comentarioCancela)
{
  var d = new Date();
  let date = this.formatoDate(d);
    let promise=this.afDB.object(local+'/'+codigo+'/'+id)
      .update({ Estatus: "3", comentario: comentarioCancela,  fechaEliminado:date});
}

BlockOrderUser(local,codigo)
{
    let promise=this.afDB.object(local+'/'+codigo)
    .update({Estatus:"10"});
}


BeginWorkPlato(local,codigo,id){
  var d = new Date();
let date=this.formatoDate(d);

  let promise=this.afDB.object(local+'/'+codigo+'/'+id)
  .update({Estatus:"2", comienzo:date, plus:0});
}

EditPlato(local,codigo,id, comentas,Nombre){
  let promise=this.afDB.object(local+'/'+codigo+'/'+id)
  .update({Platillo:Nombre+' ' +comentas});
}

updateOrQuitar(local,codigo,plato,opcion, necesitacode)
{
  let subscription =this.afDB.list(local+'/'+codigo).subscribe(data=>{
    
    for(var p=0;p<data.length;p++){

      if (plato.id == data[p].id) {
        
        if (data[p].Estatus == '') {
          this.afDB.object(local + '/' + codigo + '/' + data[p].$key)
            .update({ Cantidad: plato.cantidad, Platillo: plato.Nombre + ' ' + plato.Especificaciones, precio: plato.precio, costo: plato.costo, Estatus: opcion });
        }
        else {
          if (plato.cantidad > data[p].cantidad) {
            
            this.afDB.object(local + '/' + codigo + '/' + data[p].$key)
              .update({ Cantidad: plato.cantidad, Platillo: plato.Nombre + ' ' + plato.Especificaciones, precio: plato.precio, costo: plato.costo, Estatus: opcion });
          }
          if(opcion==6){
     this.afDB.object(local + '/' + codigo + '/' + data[p].$key)
          .update({ Cantidad: plato.cantidad, Platillo: plato.Nombre + ' ' + plato.Especificaciones, precio: plato.precio, costo: plato.costo, Estatus: opcion });

}
        }
  }
    }
  });

subscription.unsubscribe();

if(!necesitacode){
	this.afDB.object(local + '/' + codigo)
	.update({ isCode: false});
}
}

GetListComandaEstatus(local,valorSelected){
return this.afDB.list(local+'/');//.subscribe(data=>{


}

getCookie(nameCook): string {
  var name = nameCook + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
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

}
