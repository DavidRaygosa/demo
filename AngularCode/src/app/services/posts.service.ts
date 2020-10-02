import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './global';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

	public url:string;

	constructor(private _http: HttpClient) 
	{
		this.url = Global.url;
	}

	getPosts()
	{
		let headers = new HttpHeaders().set('Content-Type','application/json');
		return this._http.get(this.url+'get-posts', {headers: headers});
	}

	getPostRange(skip:number)
	{
		let headers = new HttpHeaders().set('Content-Type','application/json');
		return this._http.get(this.url+'get-postsrange/'+skip, {headers: headers});
	}

	getPostByID = (id):Observable<any> =>
	{
		let headers = new HttpHeaders().set('Content-Type', 'application/json');
		return this._http.get(this.url+'get-post/'+id, {headers:headers});
	}
}