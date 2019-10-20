import {Component, OnInit,Pipe} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {GetService} from '../../Services/primerRequest';


declare var $:any;

@Component({
selector:'placesVisit',
templateUrl:'./placesVisit.html',
providers:[GetService]
})


export class placesVisitS implements OnInit
 {
public places: Array<{place:string,IdPlace:string,nombre:string,type:string,id_Imgs:string}>;
   constructor(private activatedRoute: ActivatedRoute, private _getService:GetService,private Rutas:Router)
 	{
this.places=[];
}



 getLugares(){
 	var AllPlaces=this.getCookie('OFClient').split('+');
 	if(this.places.length==0){
 		for(var p=0;p<AllPlaces.length;p++)
 		{
 			if(AllPlaces[p]!=''){
 			var ArregloEspecific=AllPlaces[p].split('|');
 			this.places.push({
 				place:ArregloEspecific[0],
 				IdPlace:ArregloEspecific[1],
 				nombre:ArregloEspecific[2],
 				type:ArregloEspecific[3],
        id_Imgs:ArregloEspecific[4]
 			});}
 		}
 	}
 	

 }

 toMenu(){
   var longitud=this.places.length-1;
   var place=this.places[longitud].place;
   var id=this.places[longitud].IdPlace;

this.Rutas.navigateByUrl('/menu/'+place+'/'+id);
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

  ngOnInit() {
    document.body.scrollTop = 0;
    $("html, body").delay(100).animate({ scrollTop: 0 }, 1000);
    
   this.getLugares();

 }

  }
