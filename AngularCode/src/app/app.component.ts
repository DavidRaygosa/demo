import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Import Router From Angular
import * as moment from 'moment';
import 'moment/locale/es';
moment.locale('es');
declare var $ : any; // Declare $ to Javascript

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'frontend';
	public currentRoute : string; // Current Route

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
	}

	onActivate(event) 
	{
		// Call Functions When User Change Component
		this.removeActiveNav();
		this.setActiveNav();
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
	}

	removeActiveNav()
	{
		// Remove class "active" to all items
		document.getElementById("history-nav").classList.remove("active");
		document.getElementById("blog-nav").classList.remove("active");
		document.getElementById("contact-nav").classList.remove("active");
	}

	scrollToTop()
	{
		// Scroll to top without animation
		window.scroll(0,0);
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
}
