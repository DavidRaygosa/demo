import { Component, OnInit } from '@angular/core';
import Parallax from 'parallax-js';

@Component({
  selector: 'app-parallax',
  templateUrl: './parallax.component.html',
  styleUrls: ['./parallax.component.scss']
})
export class ParallaxComponent implements OnInit {

	constructor() 
	{ 

	}

	ngOnInit(): void 
	{
		this.startParallax();
	}

	startParallax()
	{
		var scene = document.getElementById('scene');
		let parallaxInstance = new Parallax(scene,
			{
				relativeInput: true,
				scalarX: 40,
				scalarY: 40
			});

		var scene2 = document.getElementById('scene-2');
		let parallaxInstance2 = new Parallax(scene2,
			{
				relativeInput: true,
				calibrateX: true,
				calibrateY: true,
				frictionX: 0.075,
				frictionY: 0.075,
				scalarX: 20,
				scalarY: 20
			});

		var scene3 = document.getElementById('scene-3');
		let parallaxInstance3 = new Parallax(scene3,
			{
				relativeInput: true,
				calibrateX: true,
				calibrateY: true,
				frictionX: 0.075,
				frictionY: 0.075,
				scalarX: 20,
				scalarY: 20
			});

		var scene4 = document.getElementById('scene-4');
		let parallaxInstance4 = new Parallax(scene4,
			{
				relativeInput: true,
				calibrateX: true,
				calibrateY: true,
				frictionX: 0.075,
				frictionY: 0.075,
				scalarX: 20,
				scalarY: 20
			});

		var scene5 = document.getElementById('scene-5');
		let parallaxInstance5 = new Parallax(scene5,
			{
				relativeInput: true,
				calibrateX: true,
				calibrateY: true,
				frictionX: 0.075,
				frictionY: 0.075,
				scalarX: 20,
				scalarY: 20
			});

		var scene6 = document.getElementById('scene-6');
		let parallaxInstance6 = new Parallax(scene6,
			{
				relativeInput: true,
				calibrateX: true,
				calibrateY: true,
				frictionX: 0.075,
				frictionY: 0.075,
				scalarX: 20,
				scalarY: 20
			});

		var scene7 = document.getElementById('scene-7');
		let parallaxInstance7 = new Parallax(scene7,
			{
				relativeInput: true,
			});
	}

}
