import { Component, OnInit } from '@angular/core';
import simpleParallax from 'simple-parallax-js';
import ScrollReveal from 'scrollreveal'

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

	constructor() 
	{ 

	}

	ngOnInit(): void 
	{
		let image = document.getElementsByClassName('thumbnail');
		new simpleParallax(image,{
			orientation: 'down',
			scale: 1.8
		});
		ScrollReveal().reveal('.header-text',{
				delay: 100
		});
	}

}
