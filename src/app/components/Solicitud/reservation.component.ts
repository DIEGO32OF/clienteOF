import {Component, OnInit} from '@angular/core';
import {Routes, ActivatedRoute, Params} from '@angular/router';
import {GetService} from '../../Services/primerRequest';

declare var $:any;

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
  providers: [GetService],
})
export class ReservationComponent implements OnInit {
  
  locaOrdenar:string='';
  locaCuenta:string='';
  locaComanda:string='';
  locaTermino:string='';
 public final_data = []
  constructor(private activatedRoute: ActivatedRoute, private _getService:GetService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      let tipo = params['typer'];
      let local = params['Esta'];





      let token = this._getService.getCookie('verificaexpired');// params['Toke']; //this._getService.getCookie('verificaexpired');

      if (token != null) {
        token = atob(token);
        
        var localescook = token.split('||');
        
        if (localescook[0].replace('"', '').replace('"', '') == tipo && localescook[1].replace('"', '').replace('"', '') == local) {

          if (tipo && local) {

            this.locaOrdenar = '/Ordenar/dnE6XnhrjrU_/' + local;
            this.locaCuenta = '/LaCuenta/dnE6XnhrjrU_/' + local;
            this.locaComanda = '/Comandas/dnE6XnhrjrU_/' + local;
            this.locaTermino = '/TerminadosCocina/dnE6XnhrjrU_/' + local;
            this.final_data = [];
            this._getService.getComandas(local).subscribe(data => {              
              data.forEach((childSnapshot) => { 
                console.log(childSnapshot)
                if(childSnapshot.$key === 'reservasion'){
                  this._getService.ComandasGetCode(local, childSnapshot.$key).subscribe(snap => {
                   snap.forEach(snapchot =>{
                    this.final_data.push(snapchot)
                   })
                  })
                  } 
              })
              console.log(this.final_data)
            });
          }
        }
      }
    })

  }

}
