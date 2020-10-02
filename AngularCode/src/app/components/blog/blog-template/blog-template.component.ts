import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../../../services/posts.service'

declare const FB: any;

@Component({
  selector: 'app-blog-template',
  templateUrl: './blog-template.component.html',
  styleUrls: ['./blog-template.component.scss'],
  providers: [PostsService]
})
export class BlogTemplateComponent implements OnInit {

	public post;
	public loading:boolean;

	constructor(private _route:ActivatedRoute, private _postService:PostsService) 
	{ 
	}

	ngOnInit(): void 
	{
		// SHOW LOADING SPINNER
		this.loading = true;
		// HTTPCLIENT FOR GET ID POST
		this._route.params.subscribe(params =>{let id = params.id;this.getPost(id);});
	}

	getPost(id)
	{
		// HTTPCLIENT FOR GET POST INFO BY ID, AND CALL FACEBOOK-SDK
		this._postService.getPostByID(id).subscribe(response => {this.post = response.document;this.loading = false;this.FacebookSDK();});
	}

	FacebookSDK()
	{
		// INIT FACEBOOK-SDK
		FB.init({appId: '2830954603840724',cookie: true, xfbml: true,version: 'v3.2'});
	}
}
