import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './global';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

	public url:string;

	constructor(private _http: HttpClient) 
	{
		this.url = Global.url;
	}

	getAdmin()
	{
		let headers = new HttpHeaders().set('Content-Type','application/json');
		return this._http.get(this.url+'get-admins', {headers: headers});
	}

	getAdminsRange(skip:number)
	{
		let headers = new HttpHeaders().set('Content-Type','application/json');
		return this._http.get(this.url+'get-adminsrange/'+skip, {headers: headers});
	}

	getAdminByID = (id):Observable<any> =>
	{
		let headers = new HttpHeaders().set('Content-Type', 'application/json');
		return this._http.get(this.url+'get-admin/'+id, {headers:headers});
	}
}