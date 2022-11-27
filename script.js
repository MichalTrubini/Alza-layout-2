//CONTENTS
//
//0.GENERAL
//1.SET WIDTH OF SLIDER ITEM
//2.SLIDER
//3.TABLE
//4.ANIMATIONS WHEN SCROLLED TO VIEW
//
//***

/*-----------------------------------------------------------------------------------*/
/*	 0.GENERAL
/*-----------------------------------------------------------------------------------*/

//variables declaration

const screenWidth = document.body.clientWidth;
const adjWidthScreen = screenWidth > 1250 ? 1250 : screenWidth;

/*-----------------------------------------------------------------------------------*/
/*	 1.SET WIDTH OF SLIDER ITEM
/*-----------------------------------------------------------------------------------*/

//Purpose of this is to set width of slider item based on screen width.
//This allows to display different number of items on different resolutions

//-->variables declaration

const sliderItem = [...document.querySelectorAll("#celek .slider__item")];
const slider = document.querySelector("#celek .slider");
const sliderWidth = slider.offsetWidth;
let style = getComputedStyle(slider);
let sliderPadding = Number(style.padding.replace("px", ""));

//-->functions

sliderItem.forEach((item) => {
  if (screenWidth >= 1250) item.style.width = (sliderWidth - sliderPadding * 2) / 4 + "px";
  else if (screenWidth > 767) item.style.width = (sliderWidth - sliderPadding * 2) / 3 + "px";
  else if (screenWidth > 525) item.style.width = (sliderWidth - sliderPadding * 2) / 2 + "px";
  else item.style.width = (sliderWidth - sliderPadding)+ "px";
});

/*-----------------------------------------------------------------------------------*/
/*	 2.SLIDER
/*-----------------------------------------------------------------------------------*/

//Here we control the basic functionality of sliding images left/right on click.
// * An array of all sliders is created as well as an array of all next/prev buttons
// * Using forEach we loop through sliders and add event listeners to next/prev buttons
// * The order in arrays is essential here to make sure that sliders are controlled by correct buttons
//Touch control (swipe) on mobile/tablet not implemented.

//-->variables declaration

const sliders = [...document.querySelectorAll("#celek .slider")];
const nxtBtn = [...document.querySelectorAll("#celek .slider__arrowContainerRight")];
const preBtn = [...document.querySelectorAll("#celek .slider__arrowContainerLeft")];

//-->functions

sliders.forEach((item, i) => {
  let containerWidth = item.children[0].offsetWidth;

  nxtBtn[i].addEventListener("click", () => {
    item.scrollLeft += containerWidth;
  });

  preBtn[i].addEventListener("click", () => {
    item.scrollLeft -= containerWidth;
  });
});

/*-----------------------------------------------------------------------------------*/
/*	 3.TABLE
/*-----------------------------------------------------------------------------------*/

/*-----------------------------------------------------------------------------------*/
/*	 4.ANIMATIONS WHEN SCROLLED TO VIEW
/*-----------------------------------------------------------------------------------*/

const elementsToAnimate = document.querySelectorAll(`[data-animate="animation"]`);

let observer = new IntersectionObserver(entries => {

    const headerTopBar = entries.filter(entry => entry.target.classList.contains('header-top-border'))
    const imageAnimateLeft = entries.filter(entry => entry.target.classList.contains('image-wrapper-right'))
    const imageAnimateRight = entries.filter(entry => entry.target.classList.contains('image-wrapper-left'))

    headerTopBar.forEach(item => {
        if (item.isIntersecting === true) item.target.classList.add('header-top-border-inView')
    })

    imageAnimateLeft.forEach(item => {
        if (item.isIntersecting === true) item.target.classList.add('image-wrapper-right-inView')
    })

    imageAnimateRight.forEach(item => {
        if (item.isIntersecting === true) item.target.classList.add('image-wrapper-left-inView')
    })

});

elementsToAnimate.forEach((item) => {
    observer.observe(item);
});
