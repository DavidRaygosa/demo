import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './global';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

	public url:string;

	constructor(private _http: HttpClient) 
	{
		this.url = Global.url;
	}

	newStudent(Student)
	{
		let headers = new HttpHeaders().set('Content-Type','application/json');
		return this._http.post(this.url+'new-student',Student, {headers: headers});
 	}

	getStudents()
	{
		let headers = new HttpHeaders().set('Content-Type','application/json');
		return this._http.get(this.url+'get-students', {headers: headers});
	}
}