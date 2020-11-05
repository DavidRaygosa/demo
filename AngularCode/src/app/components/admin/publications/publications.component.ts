import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
//--------------------- SERVICES -----------------------------//
import { GeneralService } from '../../../services/general.service';
import { PostsService } from '../../../services/posts.service';
import { Global } from '../../../services/global';

//--------------------- MODELS -------------------------------//
import { PostModel } from '../../../models/post.model';
import { User } from '../../../models/user.model';
//--------------------- LIBRARIES -------------------------------//
import * as moment from 'moment';
import 'moment/locale/es';
moment.locale('es');

declare const FB: any;

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.scss'],
  providers: [GeneralService, PostsService]
})
export class PublicationsComponent implements OnInit {
	//----------- LOADING ----------
	public loading:boolean;
	//----------- URL -----------
	public url:string;
	//---------- SESSION -----------
	public _SESSION:User;
	//----------- PAGINATION -------
	public NumberofPagination;
	public paginationList;
	public selectedPage:number;
	public selectedListPage:number;
	public viewListPage;
	public rangePosts;
	//----------- POSTS -----------
	public IDPost;
	public Post:any;
	public PostImages;
	public Posts;
	//--------- CREATE MODAL --------
	public createTurnTransmition:boolean = false;
	public createTurnImages:boolean = false;
	public textCreateTransmition:boolean = false;
	@ViewChild('createModalPortadaImage') createModalPortadaImage;
	@ViewChild('transmisionPublicacion') transmisionPublicacion;
	@ViewChild('imagenPublicacion') imagenPublicacion;
	@ViewChild('createTransmition') createTransmition:ElementRef;
	public createFileToUpload:File;
	public CreatePostImages:Array<File>;
	public PostToCreate:PostModel;
	//--------- UPDATE MODAL --------
	@ViewChild('editModalTitle') editModalTitle;
	@ViewChild('editModalPortadaImage') editModalPortadaImage;
	@ViewChild('editModalSubtitle') editModalSubtitle;
	@ViewChild('editModalMessage') editModalMessage;
	@ViewChild('editChangeImagePortada') editChangeImagePortada;
	@ViewChild('editModalTransmition') editModalTransmition;
	@ViewChild('editTransmition') editTransmition:ElementRef;
	@ViewChild('editTurnTransmitionChecked') editTurnTransmitionChecked;
	public editchangeImage:boolean = false;
	public editTurnTransmition:boolean = false;
	public editChangeTransmition:boolean = false;
	public editTurnImages:boolean = false;
	public editMoreImages:boolean = false;
	public editFileToUpload:File;
	public editFilesToUpload:File;
	//--------- DELETE MODAL --------
	public deleteID;
	public deleting:boolean = false;
	//--------- SEARCH MODAL --------
	@ViewChild('searchInput') searchInput;
	@ViewChild('closeSearch') closeSearch;
	@ViewChild('searchEditBtn') searchEditBtn;
	@ViewChild('searchDeleteBtn') searchDeleteBtn;
	public searchBorderColor;
	public enableSearch:boolean = false;
	public search;
	//--------- CLOSE MODAL --------
	@ViewChild('registerModal') registerModal;
	@ViewChild('editModal') editModal;
	@ViewChild('deleteModal') deleteModal;

	constructor
	(
		private _generalService: GeneralService,
		private _postService: PostsService
	) 
	{ 
		this.url = Global.url;
	}

	ngOnInit(): void 
	{
		//----------- LOADING ----------
		this.loading = true;
		//----------- GET POSTS LENGHT ----------
		this.postsLenght();
	}

	//---------------------------- PAGINATION ---------------------------------------//
	postsLenght()
	{
		this._generalService.getGeneral().subscribe(
			(response : any) =>
			{
				// SET LOADING TO FALSE (IT WILL SHOW POST CONTENT)
				this.loading = false;
				// GET PAGINATION LENGHT
				this.NumberofPagination = [];
				this.paginationList = [];
				let count = 0;
				for(let i = 0; i < Math.ceil(response.documents[0].lenght/10); i++)
				{ 
					count++;
					this.NumberofPagination.push(i+1);
					if(count == 5)
					{
						count=0;
						this.paginationList.push('list');
					}
				}
				// GET, SET AND ACTIVE PAGINATION NUMBER
				this.changePage(1);
				this.setActivePagination(1);
				// SET LIST PAGINATION (ONLY 5 PAGE FOR LIST)
				this.setListPage();
			});
	}

	changePage(numberofPage:number)
	{
		if(numberofPage == 1) this.rangePosts = {skip: 0}
		else this.rangePosts = {skip: (numberofPage-1)*10}
		this.getPosts();
	}

	setActivePagination(index: number) 
	{		
		this.selectedListPage = Math.ceil(index/5)-1;
		this.selectedPage = index;
		setTimeout(()=>
		{
			let backButton = document.getElementById("backListButton") as HTMLSelectElement;
			let nextButton = document.getElementById("nextListButton") as HTMLSelectElement;
			this.checkIfDisabledBackListPage(backButton);
			this.checkIfDisabledNextListPage(nextButton);
		},1);
   	}

   	setListPage()
   	{
		this.viewListPage = 
		{
			start: (this.selectedListPage*5),
			end: (this.selectedListPage+1)*5
		}
   	}

   	checkIfDisabledBackListPage(backButton)
   	{
   		if(this.selectedListPage == 0)
   		{
   			backButton.classList.add("disabled");
   		} 
   	}

   	checkIfDisabledNextListPage(nextButton)
   	{
	   	if(this.selectedListPage == Math.ceil(this.paginationList.length)) nextButton.classList.add("disabled");
   	}

   	nextListPage(click = false)
   	{
   		let backButton = document.getElementById("backListButton") as HTMLSelectElement;
   		let nextButton = document.getElementById("nextListButton") as HTMLSelectElement;
   		backButton.classList.remove("disabled");
   		if(click) this.selectedListPage++;
   		this.checkIfDisabledNextListPage(nextButton);
		this.viewListPage = 
		{
			start: (this.selectedListPage*5),
			end: (this.selectedListPage+1)*5
		}
   	}

   	backListPage(click = false)
   	{
   		let backButton = document.getElementById("backListButton") as HTMLSelectElement;
   		let nextButton = document.getElementById("nextListButton") as HTMLSelectElement;
   		nextButton.classList.remove("disabled");
   		if(click) this.selectedListPage--;
   		this.checkIfDisabledBackListPage(backButton);
		this.viewListPage = 
		{
			start: (this.selectedListPage*5),
			end: (this.selectedListPage+1)*5
		}
   	}

	//---------------------------- POSTS ---------------------------------------//

	getPosts()
	{
		this._postService.getPostRangeAdmin(this.rangePosts.skip).subscribe((response : any)=>
		{
			this.Posts = response.documents;
			this.Posts.forEach((Element, Index) =>
			{
				this.Posts[Index].publication_date = moment.utc(new Date(Element.publication_date)).fromNow();
			});
		});
	}

	getPostID(id)
	{
		this.IDPost = id;
	}

	loadChangeImage()
	{
		this._postService.getPostByID(this.Post._id).subscribe(
		(response : any)=>
		{
			this.Post = response.document;
			let count = 0;
			this.editTurnImages = false;
			this.PostImages = [];
			this.Post.images.forEach((Element, Index) =>
			{
				this.PostImages.push(Element);
				count++;
			});
			if(count > 0) this.editTurnImages = true;
		});
	}

	//---------------------------- CREATE MODAL ---------------------------------------//

	turnCreateTransmition(event)
	{
		this.createTurnTransmition = event;
	}

	turnCreateImages(event)
	{
		this.createTurnImages = event;
		if(event) this.CreatePostImages = [];
	}

	createFileChangePortada(event)
	{
		let reader = new FileReader();
		this.createFileToUpload = event.target.files[0];
		reader.onload = (event: any) => 
		{
			this.createModalPortadaImage.nativeElement.src = event.target.result;
    	};
    	reader.readAsDataURL(event.target.files[0]);
	}

	testTransmition()
	{
		this.textCreateTransmition = true;
		setTimeout(()=>
		{
			this.createTransmition.nativeElement.setAttribute('data-href',this.transmisionPublicacion.nativeElement.value);
			this.FacebookSDK();
		},1);	
	}

	createFileAddImages(event)
	{
		this.CreatePostImages.push(event.target.files[0]);
		this.imagenPublicacion.nativeElement.value = '';
		this.CreatePostImages.forEach((Element, Index) =>
		{
			let reader = new FileReader();
			reader.onload = (event: any) => 
			{
				(document.getElementById("createImages"+Index) as HTMLImageElement).src = event.target.result;
			};
			reader.readAsDataURL(Element);
		});
	}

	createDeleteImage(index)
	{
		this.CreatePostImages.splice(index, 1);
	}

	onSubmitCreate(form)
	{
		this.posttoCreateConstructor();
		this.PostToCreate.title = form.value.createTitle;
		this.PostToCreate.subtitle = form.value.createSubtitle;
		this.PostToCreate.message = form.value.createMessage;
		if(this.createTurnTransmition) if(this.transmisionPublicacion.nativeElement.value != '') this.PostToCreate.transmition = this.transmisionPublicacion.nativeElement.value
		if(!this.createTurnTransmition) this.PostToCreate.transmition = '';
		this._SESSION = JSON.parse(localStorage.getItem('_SESSION'));
		if(this._SESSION != null) this.PostToCreate.publishedby = this._SESSION.nickname;
		else this.loading = true;
		this.PostToCreate.comments = [];
		this.PostToCreate.publication_image = '';
		this.PostToCreate.publication_date =  new Date().toString();
		this.PostToCreate.images = [];
		this._postService.createPost(this.PostToCreate).subscribe(
			(response : any) =>
			{
				this._postService.makeFileRequest(this.url+"upload-image/"+response.message._id, [], this.createFileToUpload, 'image').then((response:any)=>{});
				if(this.createTurnImages)
				{
					if(this.CreatePostImages.length > 0)
					{
						this.CreatePostImages.forEach((Element, Index) =>
						{
							this._postService.makeFilesRequest(this.url+"upload-images/"+response.message._id, [], Element, 'images').then((response:any)=>{});
						});
						// SERVICE CALL GENERAL SETTINGS
						this._generalService.getGeneral().subscribe(
						(response : any) =>
						{
							response.documents[0].lenght = (response.documents[0].lenght + 1);
							// SERVICE UPDATE GENERAL SETTINGS
							this._generalService.updateGeneral(response.documents[0]).subscribe(
								response=>
								{
									this.closeModals();
									setTimeout(()=>
									{
										this.ngOnInit()
									},300);
								});
						});
					}
					else if(this.CreatePostImages.length == 0)
					{
						// SERVICE CALL GENERAL SETTINGS
						this._generalService.getGeneral().subscribe(
						(response : any) =>
						{
							response.documents[0].lenght = (response.documents[0].lenght + 1);
							// SERVICE UPDATE GENERAL SETTINGS
							this._generalService.updateGeneral(response.documents[0]).subscribe(
								response=>
								{
									this.closeModals();
									setTimeout(()=>
									{
										this.ngOnInit()
									},300);
								});
						});
					}
				}
				else if(!this.createTurnImages)
				{
					// SERVICE CALL GENERAL SETTINGS
					this._generalService.getGeneral().subscribe(
					(response : any) =>
					{
						response.documents[0].lenght = (response.documents[0].lenght + 1);
						// SERVICE UPDATE GENERAL SETTINGS
						this._generalService.updateGeneral(response.documents[0]).subscribe(
							response=>
							{
								this.closeModals();
								setTimeout(()=>
								{
									this.ngOnInit()
								},300);
							});
					});
				}
				this.CreatePostImages = [];
				setTimeout(()=>
				{
					this.createTurnTransmition = false;
					this.createTurnImages = false;
				},1);
			});
	}

	posttoCreateConstructor()
	{
		this.PostToCreate = new PostModel('','','','','',[],'','',[])
	}

	//---------------------------- UPDATE MODAL ---------------------------------------//

	getPostIDEdit(id)
	{
		this._postService.getPostByID(id).subscribe(
			(response : any)=>
			{
				this.Post = response.document;
				this.PostImages = [];
				this.editModalTitle.nativeElement.value = this.Post.title;
				this.editModalPortadaImage.nativeElement.src = this.url + 'get-post-image/'+this.Post.publication_image;
				if(this.Post.transmition != '') 
				{
					this.editTurnTransmition = true;
					setTimeout(()=>
					{
						this.editTransmition.nativeElement.setAttribute('data-href',this.Post.transmition);
					},1);	
				}
				this.editModalSubtitle.nativeElement.value = this.Post.subtitle;
				this.editModalMessage.nativeElement.value = this.Post.message;
				let count = 0;
				this.editchangeImage = false;
				this.editTurnImages = false;
				this.editTurnTransmition = false;
				this.editChangeTransmition = false;
				if(this.Post.images != undefined)
				{
					this.Post.images.forEach((Element, Index) =>
					{
						this.PostImages.push(Element);
						count++;
					});
				}
				if(count > 0) this.editTurnImages = true;
				if(this.Post.transmition != ''){this.editTurnTransmition = true; this.FacebookSDK();}
			});
	}

	changeImage(event)
	{
		this.editchangeImage = event;
		if(!event) this.editModalPortadaImage.nativeElement.src = this.url + 'get-post-image/'+this.Post.publication_image;
	}

	turnTransmition(event)
	{
		this.editTurnTransmition = event;
		if(event) 
		{
			if(this.Post.transmition != '')
			{
				this.editTurnTransmition = true;
				setTimeout(()=>
				{
					this.editTransmition.nativeElement.setAttribute('data-href',this.Post.transmition);
					this.FacebookSDK();
				},1);
			}
		}
	}

	changeTransmition(event)
	{
		this.editChangeTransmition = event;
	}

	turnImages(event)
	{
		this.editTurnImages = event;
		if(!event) this.editMoreImages = false;
	}

	MoreImages(event)
	{
		this.editMoreImages = event;
	}

	editFileChangePortada(event)
	{
		let reader = new FileReader();
		this.editFileToUpload = event.target.files[0];
		reader.onload = (event: any) => 
		{
			this.editModalPortadaImage.nativeElement.src = event.target.result;
    	};
    	reader.readAsDataURL(event.target.files[0]);
	}

	editDeleteImage(image)
	{
		this._postService.deleteImages(this.Post._id, image).subscribe(response =>
		{
			this.loadChangeImage();
		});
	}

	editFileChangeImages(event)
	{
		this.editFilesToUpload = event.target.files[0];
		this._postService.makeFilesRequest(this.url+"upload-images/"+this.Post._id, [], this.editFilesToUpload, 'images').then((response:any)=>
		{
			this.loadChangeImage();
		});
	}

	updatePost()
	{
		this._postService.getPostByID(this.Post._id).subscribe(
		(response :any ) =>
		{
			this.Post = response.document;
			this.Post.title = this.editModalTitle.nativeElement.value;
			if(this.editchangeImage) if(this.editChangeImagePortada.nativeElement.value != '') this._postService.makeFileRequest(this.url+"upload-image/"+this.Post._id, [], this.editFileToUpload, 'image').then((response:any)=>{});
			if(this.editChangeTransmition) if(this.editModalTransmition.nativeElement.value != '') this.Post.transmition = this.editModalTransmition.nativeElement.value;
			if(!this.editTurnTransmition) this.Post.transmition = '';
			this.Post.subtitle = this.editModalSubtitle.nativeElement.value;
			this.Post.message = this.editModalMessage.nativeElement.value;
			if(!this.editTurnImages) 
			{
				if(this.PostImages.length > 0)
				{
					this.PostImages.forEach((Element, Index) =>
					{
						this._postService.deleteImages(this.Post._id, Element).subscribe(response =>{});
					});
				}
				this.Post.images = [];
			}
			if(this.PostImages.length == 0) this.Post.images = [];
			this._postService.updatePost(this.Post).subscribe(
				response =>
				{
					this.closeModals();
					setTimeout(()=>
					{
						this.ngOnInit()
					},300);
				});
		});
	}

	//---------------------------- FACEBOOK SDK ---------------------------------------//

	FacebookSDK()
	{
		// INIT FACEBOOK-SDK
		FB.init({appId: '2830954603840724',cookie: true, xfbml: true,version: 'v3.2'});
	}

	//---------------------------- CLOSE MODAL ---------------------------------------//

   	closeModals()
   	{
   		setTimeout(()=>
   		{
   			this.registerModal.nativeElement.click();
   			this.editModal.nativeElement.click();
			this.deleteModal.nativeElement.click();
   		},1);
   	}

   	//---------------------------- DELETE MODAL ---------------------------------------//

   	getPostIDDelete(id)
   	{
   		this.deleteID = id;
   	}

   	deletePost()
   	{
   		this.deleting = true;
   		// THIS SERVICE TO GET ALL POST BY ID
   		this._postService.getPostByID(this.deleteID).subscribe(
   			response =>
   			{
   				// THIS SERVICE DELETE IMAGE FROM LOCAL
   				this._postService.deleteImage(response.document.publication_image).subscribe();
   				// IF POST HAS IMAGES
   				if(response.document.images != undefined)
   				{
   					response.document.images.forEach((Element, Index) =>
   					{
   						// THIS SERVICE DELETE IMAGE FROM LOCAL
						this._postService.deleteImages(this.deleteID, Element).subscribe();
   					});
   				}
   				// THIS SERVICE DELETE POST
   				setTimeout(()=>
   				{
   					this._postService.deletePost(this.deleteID).subscribe(
   						response =>
   						{
							// SERVICE CALL GENERAL SETTINGS
							this._generalService.getGeneral().subscribe(
							(response : any) =>
							{
								response.documents[0].lenght = (response.documents[0].lenght - 1);
								// SERVICE UPDATE GENERAL SETTINGS
								this._generalService.updateGeneral(response.documents[0]).subscribe(
									response=>
									{
										this.closeModals();
										setTimeout(()=>
										{
											this.deleting = false;
											this.ngOnInit()
										},300);
									});
							});
   						});
   				},2000)
   			});
   	}

   	//---------------------------- SEARCH MODAL ---------------------------------------//

   	searchPost()
   	{
   		this.searchBorderColor = 'none';
   		this.enableSearch = false;
   		if(this.searchInput.nativeElement.value == '') this.searchBorderColor = '1px solid red';
   		else 
   		{
   			this._postService.getPostByTitle(this.searchInput.nativeElement.value).subscribe(
   				(response : any) =>
   				{
   					if(response.message != 'No Hay Proyectos Para Mostrar')
   					{
   						this.search = response.document[0];
						this.search.publication_date = moment.utc(new Date(this.search.publication_date)).fromNow();
   						this.enableSearch = true;
   					}
   				});
   		}
   	}

   	editPostSearch(id)
   	{
   		this.closeSearch.nativeElement.click();
   		setTimeout(()=>
   		{
   			this.searchEditBtn.nativeElement.click('id');
   		},500);
   	}

   	editPostDelete(id)
   	{
   		this.closeSearch.nativeElement.click();
   		setTimeout(()=>
   		{
   			this.searchDeleteBtn.nativeElement.click('id');
   		},500);
   	}
}
