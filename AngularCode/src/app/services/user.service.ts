import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './global';
import { User } from '../models/user.model'

@Injectable({
  providedIn: 'root'
})
export class UserService {

	public url:string;

	constructor(private _http: HttpClient) 
	{
		this.url = Global.url;
	}

	checkEmail = (email):Observable<any> =>
	{
		let headers = new HttpHeaders().set('Content-Type', 'application/json');
		return this._http.get(this.url+'check-email/'+email, {headers:headers});
	}

	checkNickname = (nickname):Observable<any> =>
	{
		let headers = new HttpHeaders().set('Content-Type', 'application/json');
		return this._http.get(this.url+'check-nickname/'+nickname, {headers:headers});
	}

	registerUser = (user:User):Observable<any> =>
	{
		let params = JSON.stringify(user);
		let headers = new HttpHeaders().set('Content-Type','application/json');
		return this._http.post(this.url+'register-user',params, {headers: headers});
	}

	updateUser = (user):Observable<any> =>
	{
		let params = JSON.stringify(user);
		let headers = new HttpHeaders().set('Content-Type', 'application/json');
		return this._http.put(this.url+'update-user/'+user._id, params, {headers: headers});
	}
}