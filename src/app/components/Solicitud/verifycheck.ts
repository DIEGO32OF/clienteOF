import {Component, OnInit} from '@angular/core';
import {Routes, ActivatedRoute, Params, Router} from '@angular/router';
import {GetService} from '../../Services/primerRequest';
import { Observable } from 'rxjs';
//import {TabsModule} from "ng2-tabs";

declare var $:any;

@Component({
selector:'verfycheck',
templateUrl:'./verfycheck.html',
providers:[GetService],
})

export class verfycheckComponent implements OnInit
 {
   constructor(private activatedRoute: ActivatedRoute, private _getService:GetService, private route:Router)
   {
     this.activatedRoute.params.subscribe((params: Params) => {
           let tipo = params['typer'];
           let local = params['Esta'];

             let token = params['Toke']; //this._getService.getCookie('verificaexpired');
           
           if (token != ''&& token != undefined) {
             token = token.replace('°', '.').replace('°', '.').replace( '°','.');
             
             this._getService.validaToken(token).subscribe(
               response => {
                 
                 if (response.token != null) {

                   if (tipo && local && response.token) {
                     var d = new Date();
                           d.setTime(d.getTime() + (18*60*60*1000));
                           var expires = "expires=" + d['toGMTString']();
                           //this._getService.encodeCadenas(JSON.stringify(this.comandaSave)).subscribe(cadenaRes=>{
                           //	console.log(cadenaRes.comandilla);
                             document.cookie = "verificaexpired" + "=" +btoa(JSON.stringify(tipo+'||'+local))+ ";" + expires + ";path=/";

                             //route.navigate(['/Comandas/'+tipo+'/'+local],{ relativeTo: activatedRoute });
                             route.navigateByUrl('/Comandas/'+tipo+'/'+local);
                   }
                 }

               });
             }
           });
   }


   ngOnInit(){
   }


 }
