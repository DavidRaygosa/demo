import { Component, OnInit, HostListener } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { GeneralService } from '../../services/general.service';
import {Location} from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { PostModel } from '../../models/post.model';
import { NgAnimateScrollService } from 'ng-animate-scroll';
import simpleParallax from 'simple-parallax-js';
import ScrollReveal from 'scrollreveal'

declare var $ : any;

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  providers: [PostsService, GeneralService]
})
export class BlogComponent implements OnInit {

	public posts;
	public NumberofPagination;
	public paginationList;
	public rangePosts;
	public selectedPage:number;
	public selectedListPage:number;
	public viewListPage;
	public innerWidth: any;
	public responsive:boolean;
	public loading:boolean;

	constructor
	(
		private _location: Location,
		private _router: Router,
		private _route:ActivatedRoute,
		private _postService:PostsService, 
		private _generalService:GeneralService, 
		private _animateScrollService: NgAnimateScrollService
	) { }

	ngOnInit(): void 
	{		
		// SET LOADING
		this.loading = true;
		// SET RESPONSIVE IN FALSE
		this.responsive = false;
		// GET WINDOW WIDTH
		this.onResize(window.innerWidth);
		// START simpleParallax IN HEADER
		let image = document.getElementsByClassName('thumbnail');
		new simpleParallax(image,{
			orientation: 'down',
			scale: 1.8
		});

		ScrollReveal().reveal('.header-text',{
				delay: 100
		});
		this._generalService.getGeneral().subscribe(
			(response : any) =>
			{
				// SET LOADING TO FALSE (IT WILL SHOW POST CONTENT)
				this.loading = false;
				// GET PAGINATION LENGHT
				this.NumberofPagination = [];
				this.paginationList = [];
				let count = 0;
				for(let i = 0; i < Math.ceil(response.documents[0].lenght/5); i++)
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
				this._route.params.subscribe(params =>
				{
					let page = params.page;
					if(page > this.NumberofPagination.length) this._router.navigate(['/notpagefound'])
					else
					{
						this.changePage(page, null);
						this.setActivePagination(page);
						// CALL POSTS BY RANGE
						this.getPosts();
						// SET LIST PAGINATION (ONLY 5 PAGE FOR LIST)
						this.setListPage();
					}	
				});
			});
	}

	@HostListener('window:resize', ['$event'])
	onResize(event) 
	{
  		this.innerWidth = window.innerWidth;
  		if(this.innerWidth <= 768) this.responsive = true;
	}

	getPosts()
	{
		this._postService.getPostRange(this.rangePosts.skip)
		.subscribe((response : any) => {this.posts = response.documents;this.startParoller();});
	}

	changePage(numberofPage:number, target: HTMLElement)
	{
		this._location.go( '/blog/'+numberofPage );
		if(numberofPage == 1) this.rangePosts = {skip: 0}
		else this.rangePosts = {skip: (numberofPage-1)*5}
		if(target != null) this._animateScrollService.scrollToElement('scrollToThis');
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
			if(index > 5) this.checkIfDisabledNextListPage(nextButton);
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

   	checkIfDisabledBackListPage(backButton)
   	{
   		if(this.selectedListPage == 0)
   		{
   			backButton.classList.add("disabled");
   		} 
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

   	checkIfDisabledNextListPage(nextButton)
   	{
	   	if(this.selectedListPage == Math.ceil(this.paginationList.length)) nextButton.classList.add("disabled");
   	}

   	startParoller()
   	{
   		if(!this.responsive)
   		{
	   		setTimeout(()=>
	   		{
				let imageCard = document.getElementsByClassName('thumbnail-card');
				new simpleParallax(imageCard,{
					orientation: 'right',
					scale: 3,
					overflow: true,
					maxTransition: 50
				});
				ScrollReveal().reveal('.thumbnail-card',{
					delay: 300
				});
	   		},500);
   		}
   	}

   	/*-------------------------------------------------------------------------------------------------
   	--------------------------------------------- MODALS ----------------------------------------------
   	--------------------------------------------------------------------------------------------------*/
   	onSubmitLogin(form)
   	{
   		console.log(form.value);
   	}

   	onSubmitRegister(form)
   	{
   		console.log(form.value);
   	}
}
