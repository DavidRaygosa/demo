import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Import Router From Angular
import * as moment from 'moment';
import 'moment/locale/es';
moment.locale('es');
declare var $ : any; // Declare $ to Javascript
//--------------------- MODELS -------------------------------//
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'frontend';
	public currentRoute : string; // Current Route
	public parallax:boolean;
	//SESSION
	public _SESSION:User;
	public admin:boolean;
	public superadmin:boolean;

	constructor(private router: Router)
	{
		let countdownInterval = setInterval(() =>
		{
			let now = moment().format("hh:mm a"); // LIVETIME
 			$('#clockview').text(now);
		},1000);
	}

	ngOnInit(): void 
	{
		// Set Active NavBar Item
		this.setActiveNav();
		this.parallax = false;
		// CHECK IF USER IS ADMIN
		this.admin = false;
		this.superadmin = false;
		this.isAdmin();
	}

	isAdmin()
	{
		this._SESSION = JSON.parse(localStorage.getItem('_SESSION'));
		if(this._SESSION != null)
		{
			if(this._SESSION.usertype=='admin')
			{
				this.admin = true;this.router.navigateByUrl('/');
			}
			if(this._SESSION.usertype=='superadmin')
			{
				this.superadmin = true;
				this.admin = true;this.router.navigateByUrl('/');
			}
		}
	}

	onActivate(event) 
	{
		// Call Functions When User Change Component
		if(this._SESSION == null)
		{
			this.removeActiveNav();
			this.setActiveNav();
		}
		else
		{
			if(this._SESSION.usertype == 'admin' || this._SESSION.usertype == 'superadmin')
			{
				this.removeActiveNavAdmin();
				this.setActiveNavAdmin();
			}
			else
			{
				this.removeActiveNav();
				this.setActiveNav();
			}
		}
		this.scrollToTop();
	}

	setActiveNav()
	{
		// Get Current URL
		this.currentRoute = this.router.url.substring(1,5);
		// If CurrenRoute match with any route, set classlist "Active"; else remove class "active" to all items
		if(this.currentRoute == "hist") document.getElementById("history-nav").classList.add("active");
		else if(this.currentRoute == "blog") document.getElementById("blog-nav").classList.add("active");
		else if(this.currentRoute == "cont") document.getElementById("contact-nav").classList.add("active");
		else if(this.currentRoute == "para") this.parallax = true;
	}

	removeActiveNav()
	{
		// Remove class "active" to all items
		document.getElementById("history-nav").classList.remove("active");
		document.getElementById("blog-nav").classList.remove("active");
		document.getElementById("contact-nav").classList.remove("active");
	}

	closeResponsiveNav()
	{
		// Close Responsive Navbar When User Click On Any Item 
		let closeResponsiveNav = document.getElementById("navResponsiveButton");
		let navbarNav = document.getElementById("navbarNav");
		closeResponsiveNav.setAttribute('aria-expanded', 'false');
		closeResponsiveNav.classList.add("collapsed");
		navbarNav.classList.remove('show');
	}

	scrollToTop()
	{
		// Scroll to top without animation
		setTimeout(()=>
		{
			window.scroll(0,0);
		},100);
	}

	//---------------------------------------------------------------------------------------------------
	//--------------------------------------- ADMINS ----------------------------------------------------
	//---------------------------------------------------------------------------------------------------

	setActiveNavAdmin()
	{
		// Get Current URL
		this.currentRoute = this.router.url.substring(1,6);
		// If CurrenRoute match with any route, set classlist "Active"; else remove class "active" to all items
		if(this.currentRoute == "") document.getElementById("admin-nav-profile").classList.add("active");
		else if(this.currentRoute == "admin") document.getElementById("admin-nav-admins").classList.add("active");
		else if(this.currentRoute == "usuar") document.getElementById("admin-nav-users").classList.add("active");
		else if(this.currentRoute == "publi") document.getElementById("admin-nav-publications").classList.add("active");
		else if(this.currentRoute == "infor") document.getElementById("admin-nav-info").classList.add("active");
	}

	removeActiveNavAdmin()
	{
		// Remove class "active" to all items
		document.getElementById("admin-nav-profile").classList.remove("active");
		if(this.superadmin)
		{
			document.getElementById("admin-nav-admins").classList.remove("active");
			document.getElementById("admin-nav-users").classList.remove("active");
		}
		document.getElementById("admin-nav-publications").classList.remove("active");
	}

	closeResponsiveNavAdmin()
	{
		// Close Responsive Navbar When User Click On Any Item 
		let closeResponsiveNav = document.getElementById("navResponsiveButtonAdmin");
		let navbarNav = document.getElementById("navbarNavAdmin");
		closeResponsiveNav.setAttribute('aria-expanded', 'false');
		closeResponsiveNav.classList.add("collapsed");
		navbarNav.classList.remove('show');
	}

	closeAdminPanel()
	{
		localStorage.clear();
		this.router.navigateByUrl('/');
		setTimeout(()=>
		{
			window.location.reload();
		},1)
	}
}
