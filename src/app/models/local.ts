import {menu} from './Menu';
import {imgs} from './imgs';
import {paqespe} from './paqespe';
import {evenpromo} from './evenpromo';


export class local {
	 private modals: any[] = [];
	constructor (
		public _id:string,
		public id_SQL:number,
		public id_Hashed:string,
		public Nombre:string,
		public tipo:number,
		public encuesta:string,
		public slogan:string,
		public Domicilio:string,
		public telefono:string,
		public redes:string,
		public correo:string,
		public url:string,
		public nom_ico:string,
		public nom_img:string,
		public lat: string,
      public lng: string,
      public setComand:number,
		public isActive:number,
		public id_Menu:menu,
		public id_Imgs:imgs[],
		public id_PaqEspe:paqespe[],
		public id_EvenPromo:evenpromo[]

		){}


}
