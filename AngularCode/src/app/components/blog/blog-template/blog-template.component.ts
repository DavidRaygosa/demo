import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//--------------------- SERVICES -----------------------------//
import { PostsService } from '../../../services/posts.service'
import { UserService } from '../../../services/user.service';
import { GeneralService } from '../../../services/general.service';
//--------------------- MODALS -----------------------------//
import { Global } from '../../../services/global';
import { User } from '../../../models/user.model';
//--------------------- MODELS -------------------------------//
import { PostModel } from '../../../models/post.model';
//--------------------- LIBRARIES ---------------------------//
import * as moment from 'moment';
import 'moment/locale/es';
moment.locale('es');

declare const FB: any;
declare var $: any;

@Component({
  selector: 'app-blog-template',
  templateUrl: './blog-template.component.html',
  styleUrls: ['./blog-template.component.scss'],
  providers: [PostsService, UserService, GeneralService]
})
export class BlogTemplateComponent implements OnInit {

	//----------- URL -----------
	public url:string;
	//---------------------------
	public post;
	public loading:boolean;
	//------ TRANSMITION---------
	public transmition:boolean = false;
	@ViewChild('transmisionPublicacion') transmisionPublicacion;
	//--------- IMAGES ----------
	public images:boolean = false;
	//--------- COMMENTS ----------
	public comments;
	public loadedComments:boolean = false;
	//----------- SESSION --------------
	public _SESSION:any;
	public logged:boolean = false;
	//----------- MODALS --------------
	public loginError:boolean = false;
	public loginErrorMessage:string;
	public registerError:boolean = false;
	public registerErrorMessage:string;
	public User:User;
	public closedModals:boolean = false;
	@ViewChild('loginModal') loginModal: ElementRef;
	@ViewChild('registerModal') registerModal: ElementRef;

	constructor
	(
		private _route:ActivatedRoute, 
		private _postService:PostsService,
		private _userService:UserService,
		private _generalService:GeneralService
	) 
	{ 
		this.url = Global.url;
	}

	ngOnInit(): void 
	{
		// SHOW LOADING SPINNER
		this.loading = true;
		// HTTPCLIENT FOR GET ID POST
		this._route.params.subscribe(params =>{let id = params.id;this.getPost(id);});
		// CHECK IF SESSION IS LOGGED
		this.getSession();
	}

	//---------------------------- SESSION ---------------------------------------//
	getSession()
	{
		this._SESSION = JSON.parse(localStorage.getItem('_SESSION'));
		if(this._SESSION != null ) if(this._SESSION.usertype=='admin' || this._SESSION.usertype == 'superadmin') window.location.reload();
		if(this._SESSION == null) this.logged = false;
		else this.logged = true;
		if(this.logged) this.closeModals();
	}

	//---------------------------- POST ---------------------------------------//

	getPost(id)
	{
		// HTTPCLIENT FOR GET POST INFO BY ID, AND CALL FACEBOOK-SDK
		this._postService.getPostByID(id).subscribe(response => 
		{
			this.post = response.document;
			this.comments = [];
			let date = new Date(this.post.publication_date);
			this.post.publication_date = moment.utc(date).fromNow();
			this.loading = false;
			if(this.post.transmition != '')
			{
				this.transmition = true;
				setTimeout(()=>
				{
					this.transmisionPublicacion.nativeElement.setAttribute('data-href',this.post.transmition);
					this.FacebookSDK();
				});
			}
			if(this.post.images != undefined)
			{
				if(this.post.images.length > 0) 
				{
					this.images = true;
					setTimeout(()=>
					{
						$('#carousel').carousel({});
					},1);
				}
			}
			if(this.post.comments.length > 0)
			{
				let itemsProcessed = 0;
				this.post.comments.forEach((Element,Index, Array) =>
				{
					this._userService.getUserByID(Element.id_user).subscribe(
					response =>
					{
						let commmentdate = new Date(Element.message_date);
						let comment =
						{
							nickname: response.document.nickname,
							comment: Element.comment,
							date: moment.utc(commmentdate).fromNow()
						}
						this.comments.push(comment);
					});
					itemsProcessed++;
					if(itemsProcessed  == this.post.comments.length)
					{
						setTimeout(()=>
						{
							this.comments.reverse();
							this.loadedComments = true;
						},3000);
					} 
				});	
			}
			else if(this.post.comments.length == 0) this.loadedComments = true;
		});
	}

	//---------------------------- COMMENTS ---------------------------------------//

	onSubmitComment(form)
	{
		let comment =
		{
			id_user: this._SESSION._id,
			comment: form.value.comment,
			message_date: new Date().toString()
		}
		this._postService.addComment(this.post._id,comment).subscribe(
			response =>
			{
				this.loadedComments = false;
				form.reset();
				this.reloadComments();
			});
	}

	reloadComments()
	{
		this._postService.getPostByID(this.post._id).subscribe(response => 
		{
			this.post.comments = response.document.comments;
			this.comments = [];
			let itemsProcessed = 0;
			this.post.comments.forEach((Element,Index, Array) =>
			{
				this._userService.getUserByID(Element.id_user).subscribe(
				response =>
				{
					let commmentdate = new Date(Element.message_date);
					let comment =
					{
						nickname: response.document.nickname,
						comment: Element.comment,
						date: moment.utc(commmentdate).fromNow()
					}
					this.comments.push(comment);
				});
				itemsProcessed++;
				if(itemsProcessed  == this.post.comments.length)
				{
					setTimeout(()=>
					{
						this.comments.reverse();
						this.loadedComments = true;
					},3000);
				} 
			});			
		});
	}

   	/*-------------------------------------------------------------------------------------------------
   	--------------------------------------------- MODALS ----------------------------------------------
   	--------------------------------------------------------------------------------------------------*/
   	
   	onSubmitLogin(form)
   	{
   		this.loginError = false;
   		this.loginErrorMessage = "";
   		this._userService.checkEmail(form.value.email).subscribe(
   			response =>
   			{
   				if(response.message == 'No Hay Proyectos Para Mostrar') 
   				{
   					this.loginError = true; 
   					this.loginErrorMessage = "Email no registrado";
   					return false;
   				}
   				if(response.documents[0].password != form.value.password){this.loginError = true;this.loginErrorMessage = "Contraseña Incorrecta";return false;}
   				this._SESSION = response.documents[0];
   				localStorage.setItem('_SESSION', JSON.stringify(this._SESSION));
   				this.getSession();
   			});
   	}

   	onSubmitRegister(form)
   	{
   		this.registerError = false;
   		this.registerErrorMessage = "";
   		this._userService.checkEmail(form.value.email).subscribe(
   			response =>
   			{
   				if(response.message != 'No Hay Proyectos Para Mostrar') 
   				{
   					this.registerError = true; 
   					this.registerErrorMessage = "Email registrado, por favor intente con otro email";
   					return false;
   				}
				this._userService.checkNickname(form.value.nickname.toUpperCase()).subscribe(
				response =>
				{
					if(response.message != 'No Hay Proyectos Para Mostrar') 
					{
						this.registerError = true; 
						this.registerErrorMessage = "Nickname registrado, por favor intente con otro nickname";
						return false;
					}
					this.constructorUser();
					this.registerUser(form);
				});
   			});
   	}

   	constructorUser()
   	{
   		this.User = new User('','','','','','','')
   	}

   	registerUser(form:any)
   	{
   		this.User.name = form.value.name;
   		this.User.lastname = form.value.lastname;
   		this.User.email = form.value.email;
   		this.User.password = form.value.password;
   		this.User.image = 'Null';
   		this.User.usertype = 'standard';
   		this.User.nickname = form.value.nickname;
   		this.User.nickname = this.User.nickname.toUpperCase();
   		this._userService.registerUser(this.User).subscribe(
   			response => 
   			{
   				this._SESSION = response.message;
				// SERVICE CALL GENERAL SETTINGS
				this._generalService.getGeneral().subscribe(
				(response : any) =>
				{
					response.documents[0].userslenght = (response.documents[0].userslenght + 1);
					// SERVICE UPDATE GENERAL SETTINGS
					this._generalService.updateGeneral(response.documents[0]).subscribe(
						response=>
						{
   							localStorage.setItem('_SESSION', JSON.stringify(this._SESSION));
   							this.getSession();
						});
				});
   			});
   	}

   	closeModals()
   	{
   		setTimeout(()=>
   		{
   			if(!this.loading)
   			{
   				this.loginModal.nativeElement.click();
				this.registerModal.nativeElement.click();
   			}
   		},10);
   		setTimeout(()=>
   		{
   			this.closedModals = true;
   		},300);
   	}

	FacebookSDK()
	{
		// INIT FACEBOOK-SDK
		FB.init({appId: '2830954603840724',cookie: true, xfbml: true,version: 'v3.2'});
	}

	startCarusel()
	{
		$('.carousel').carousel()
	}
}
