import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {OrdenoFacilComponent} from './components/Solicitud/OrdenoFacil';
import {ComandasComponent} from './components/Solicitud/MisComandas';
import {FinishCocinaComponent} from './components/Solicitud/FinishCocina';
import {placesVisitS} from './components/Solicitud/placesVisit';
import {LaCuentaComponent} from './components/Solicitud/LaCuenta';
import {verfycheckComponent} from './components/Solicitud/verifycheck'
import {ofpageComponent} from './components/Solicitud/ofpage'
import { OrdenarComponent } from './components/Solicitud/Ordenar'
import { MapsComponent } from './components/Solicitud/maps.component';





const appRoutes:Routes=[
{path:'', component: ofpageComponent},
{path:'menu/:typer/:Esta', component:OrdenoFacilComponent },
{path:'Comandas/:typer/:Esta', component:ComandasComponent },
{path:'verify/:typer/:Esta/:Toke', component:verfycheckComponent },
{path:'TerminadosCocina/:typer/:Esta', component:FinishCocinaComponent },
{path:'placesVisit',component:placesVisitS},
{path:'LaCuenta/:typer/:Esta',component:LaCuentaComponent},
{path:'ordenofacil/:typer/:Esta',component:ofpageComponent},
  { path: 'mapa/:typer/:Esta', component: MapsComponent },
  { path: 'Ordenar/:typer/:Esta', component: OrdenarComponent }



];

export const appRoutingProviders:any[]=[];
export const routing: ModuleWithProviders=RouterModule.forRoot(appRoutes);
