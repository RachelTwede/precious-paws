# precious-paws
My final project for BYU-I's WDD 330 course—a web application for a fictional animal shelter, "Precious Paws."

Netlify domain for this site is https://darling-toffee-5dbad1.netlify.app/


/**********************************************************************************************/

VERY IMPORTANT!! PLEASE NOTE: 

Using npm run build works perfectly well to build the site's dist folder...
for everything BUT the homepage's styles link. I do not know why this is. To get around this,
you can copy/paste the following line of html into the <head> element of dist/index.html:

    <link rel="stylesheet" href="/assets/utilities-d1e44c95.css">

This must be done EVERY TIME vite is used to build the site's production version.

/**********************************************************************************************/

