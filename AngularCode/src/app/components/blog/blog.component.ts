import { Component, OnInit, HostListener } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { GeneralService } from '../../services/general.service';
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
	public selectedPage: number = 1;
	public selectedListPage: number = 0;
	public viewListPage;
	public innerWidth: any;
	public responsive:boolean;

	constructor(private _postService:PostsService, private _generalService:GeneralService, private _animateScrollService: NgAnimateScrollService) 
	{ 

	}

	ngOnInit(): void 
	{		
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

		// GET PAGINATION
		this.NumberofPagination = [];
		this.paginationList = [];
		this._generalService.getGeneral().subscribe(
			(response : any) =>
			{
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
			});
		// SET RANGE OF POSTS
		this.changePage(1, null);

		// CALL POSTS BY RANGE
		this.getPosts();

		// SET LIST PAGINATION (ONLY 5 PAGE FOR LIST)
		this.setListPage();
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
		if(numberofPage == 1) this.rangePosts = {skip: 0}
		else this.rangePosts = {skip: (numberofPage-1)*5}
		if(target != null) this._animateScrollService.scrollToElement('scrollToThis');
		this.getPosts();
	}

	setActivePagination(index: number) 
	{
    	this.selectedPage = index;
   	}

   	setListPage()
   	{
   		this.viewListPage = {start: 0,end: 5}
   	}

   	backListPage(click = false)
   	{
   		let backButton = document.getElementById("backListButton") as HTMLSelectElement;
   		let nextButton = document.getElementById("nextListButton") as HTMLSelectElement;
   		nextButton.classList.remove("disabled");
   		if(click) this.selectedListPage--;
   		if(this.selectedListPage == 0)
   		{
   			backButton.classList.add("disabled");
   		} 
		this.viewListPage = 
		{
			start: (this.selectedListPage*5),
			end: (this.selectedListPage+1)*5
		}
   	}

   	nextListPage(click = false)
   	{
   		let backButton = document.getElementById("backListButton") as HTMLSelectElement;
   		let nextButton = document.getElementById("nextListButton") as HTMLSelectElement;
   		backButton.classList.remove("disabled");
   		if(click) this.selectedListPage++;
   		if(this.selectedListPage == Math.ceil(this.paginationList.length))
   		{
   			nextButton.classList.add("disabled");
   		} 
		this.viewListPage = 
		{
			start: (this.selectedListPage*5),
			end: (this.selectedListPage+1)*5
		}
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
}
