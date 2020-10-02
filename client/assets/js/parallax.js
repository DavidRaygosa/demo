'use strict'

const simpleParallax = require('simple-parallax-js');

function MyParallax()
{
	var images = document.querySelectorAll('img');
	new simpleParallax(images);
}