import { Component, OnInit } from '@angular/core';
import simpleParallax from 'simple-parallax-js';
import ScrollReveal from 'scrollreveal'

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

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

	onSubmit(form)
	{
		console.log(form.value);
	}

	onResetForm(form)
	{
		form.Reset();
	}
}
