import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './global';
import { PostModel } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

	public url:string;

	constructor(private _http: HttpClient) 
	{
		this.url = Global.url;
	}

	createPost = (post:PostModel):Observable<any> =>
	{
		let params = JSON.stringify(post);
		let headers = new HttpHeaders().set('Content-Type','application/json');
		return this._http.post(this.url+'create-post',params, {headers: headers});
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

	getPostRangeAdmin(skip:number)
	{
		let headers = new HttpHeaders().set('Content-Type','application/json');
		return this._http.get(this.url+'get-postsrangeadmin/'+skip, {headers: headers});
	}

	getPostByID = (id):Observable<any> =>
	{
		let headers = new HttpHeaders().set('Content-Type', 'application/json');
		return this._http.get(this.url+'get-post/'+id, {headers:headers});
	}

	getPostByTitle = (title):Observable<any> =>
	{
		let headers = new HttpHeaders().set('Content-Type', 'application/json');
		return this._http.get(this.url+'get-post-title/'+title, {headers:headers});
	}

	updatePost = (post):Observable<any> =>
	{
		let params = JSON.stringify(post);
		let headers = new HttpHeaders().set('Content-Type', 'application/json');
		return this._http.put(this.url+'update-post/'+post._id, params, {headers: headers});
	}

	addComment = (idPost, comment):Observable<any> =>
	{
		let params = JSON.stringify(comment);
		let headers = new HttpHeaders().set('Content-Type', 'application/json');
		return this._http.put(this.url+'upload-comment/'+idPost, params, {headers: headers});
	}

	deletePost = (id):Observable<any> =>
	{
		let headers = new HttpHeaders().set('Content-Type', 'application/json');
		return this._http.delete(this.url+'delete-post/'+id, {headers:headers});
	}

	makeFileRequest(url:string, params:Array<string>, files:File, name:string) //Subir Fotos
	{ 
		return new Promise((resolve, reject) =>
		{
			let formData:any = new FormData();
			let xhr = new XMLHttpRequest();
			formData.append(name, files, files.name);
			xhr.onreadystatechange = function()
			{
				if(xhr.readyState == 4)
				{
					if(xhr.status == 200)
					{
						resolve(JSON.parse(xhr.response));
					}
					else
					{
						reject(xhr.response);
					}
				}
			}

			xhr.open('POST', url, true);
			xhr.send(formData);
		});
	}

	makeFilesRequest(url:string, params:Array<string>, files:File, name:string) //Subir Fotos
	{ 
		return new Promise((resolve, reject) =>
		{
			let formData:any = new FormData();
			let xhr = new XMLHttpRequest();
			formData.append(name, files, files.name);
			xhr.onreadystatechange = function()
			{
				if(xhr.readyState == 4)
				{
					if(xhr.status == 200)
					{
						resolve(JSON.parse(xhr.response));
					}
					else
					{
						reject(xhr.response);
					}
				}
			}
			xhr.open('POST', url, true);
			xhr.send(formData);
		});
	}

	deleteImage = (image):Observable<any> =>
	{
		let headers = new HttpHeaders().set('Content-Type', 'charset=utf-8');
		return this._http.put(this.url+'delete-image/'+image, {headers: headers});
	}

	deleteImages = (id, image):Observable<any> =>
	{
		let headers = new HttpHeaders().set('Content-Type', 'charset=utf-8');
		return this._http.put(this.url+'delete-images/'+id+'/'+image, {headers: headers});
	}
}