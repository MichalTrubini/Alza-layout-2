//CONTENTS
//
//0.GENERAL
//1.SET WIDTH OF SLIDER ITEM
//2.SLIDER TYPEA
//3.TABLE
//4.SLIDER TYPEB
//5.ANIMATIONS WHEN SCROLLED TO VIEW
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

const sliderItemsTypeA = [...document.querySelectorAll("#celek .slider__item")];
const slider = document.querySelector("#celek .slider");
const sliderWidth = slider.offsetWidth;
let style = getComputedStyle(slider);
let sliderPadding = Number(style.padding.replace("px", ""));

//-->functions

sliderItemsTypeA.forEach((item) => {
  if (screenWidth >= 1250) item.style.width = (sliderWidth - sliderPadding * 2) / 4 + "px"; //4 items visible
  else if (screenWidth > 767) item.style.width = (sliderWidth - sliderPadding * 2) / 3 + "px"; // 3 items 
  else if (screenWidth > 525) item.style.width = (sliderWidth - sliderPadding * 2) / 2 + "px"; // 2 items
  else item.style.width = (sliderWidth - sliderPadding)+ "px"; // 1 item
});

/*-----------------------------------------------------------------------------------*/
/*	 2.SLIDER TYPEA
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

const tableHeader = document.querySelectorAll('.table__headerItemContainer ');
const tableItems = document.querySelectorAll('.table__item');

tableItems.forEach((item, i) => {

    tableHeader[i].addEventListener("click", () => {

        tableItems.forEach(tableItem => {
            if (tableItem.classList.contains('item--visible')) tableItem.classList.remove('item--visible');
        })

        item.classList.add('table__item--visible');
        item.parentElement.style.height = item.offsetHeight + "px"
    });
  
})

tableHeader.forEach(item => {
    item.addEventListener('click', () => {

        tableHeader.forEach(item => {
            if (item.children[1].classList.contains('table__headerItemRectangle--visible')) {item.children[1].classList.remove('table__headerItemRectangle--visible'); item.children[0].classList.remove('table__headerItem--selected')}
        })

        item.children[1].classList.add('table__headerItemRectangle--visible');
        item.children[0].classList.add('table__headerItem--selected')
    })
})

const tableItemVisible = document.querySelector('#celek .block-10 .item--visible');

tableItemVisible.parentElement.style.height = tableItemVisible.offsetHeight + "px"

/*-----------------------------------------------------------------------------------*/
/*	 4.SLIDER TYPEB
/*-----------------------------------------------------------------------------------*/

//-->variables declaration

const sliderB = document.querySelectorAll("#celek .sliderB");
const nxtBtnB = document.querySelectorAll("#celek .sliderB__arrowContainerRight");
const preBtnB = document.querySelectorAll("#celek .sliderB__arrowContainerLeft");
const sliderBItems = document.querySelectorAll('.sliderB__item');

//-->functions

sliderBItems.forEach((item) => {

  nxtBtnB.addEventListener("click", () => {
    item.scrollLeft += containerWidth;
  });

  preBtnB.addEventListener("click", () => {
    item.scrollLeft -= containerWidth;
  });
});

/*-----------------------------------------------------------------------------------*/
/*	 5.ANIMATIONS WHEN SCROLLED TO VIEW
/*-----------------------------------------------------------------------------------*/

//selects all elements which are to be animated

const elementsToAnimate = document.querySelectorAll(`[data-animate="animation"]`);

//declaration of intersection observer API

let observer = new IntersectionObserver(entries => {

//separates elements that require the same animation into categories based on their class

    const headerTopBar = entries.filter(entry => entry.target.classList.contains('header-top-border'))
    const imageAnimateLeft = entries.filter(entry => entry.target.classList.contains('image-wrapper-right'))
    const imageAnimateRight = entries.filter(entry => entry.target.classList.contains('image-wrapper-left'))
    const benefitComponent = entries.filter(entry => entry.target.classList.contains('benefit-component'))
    const block2Image = entries.filter(entry => entry.target.classList.contains('block-2-text-wrapper-right'))
    const dividerLine = entries.filter(entry => entry.target.classList.contains('gray-divider-in-image'))
    const circles = entries.filter(entry => entry.target.classList.contains('block-2-circle-image'))
    const benefitBlockImage = entries.filter(entry => entry.target.classList.contains('benefits-block-image'))
    const quoteBlock = entries.filter(entry => entry.target.classList.contains('quoting'))
    const quoteSymbol = entries.filter(entry => entry.target.classList.contains('quoting-symbol'))
    const sliderItemsOne = entries.filter(entry => entry.target.classList.contains('slider__itemOne'))
    const sliderItemsTwo = entries.filter(entry => entry.target.classList.contains('slider__itemTwo'))
    const blockOneImage = entries.filter(entry => entry.target.classList.contains('benefity-image'))

//if element is intersecting (that means, in viewport), class is added to the element
//class then defines animation using keyframes

    sliderItemsOne.forEach((item,i) => {
        if (item.isIntersecting) {item.target.classList.add('slider__item-inView'); item.target.style.animationDelay = 0.5 * i + "s"}
    })

    blockOneImage.forEach((item) => {
        if (item.isIntersecting) {item.target.classList.add('benefity-image-inView')}
    })

    sliderItemsTwo.forEach((item,i) => {
        if (item.isIntersecting) {item.target.classList.add('slider__item-inView'); item.target.style.animationDelay = 0.5 * i + "s"}
    })

    headerTopBar.forEach(item => {
        if (item.isIntersecting) item.target.classList.add('header-top-border-inView')
    })

    imageAnimateLeft.forEach(item => {
        if (item.isIntersecting) item.target.classList.add('image-wrapper-right-inView')
    })

    imageAnimateRight.forEach(item => {
        if (item.isIntersecting) item.target.classList.add('image-wrapper-left-inView')
    })

    benefitComponent.forEach((item,i) => {
        if (item.isIntersecting) {item.target.classList.add('benefit-component-inView'); item.target.style.animationDelay = 0.5 * i + "s"}
    })

    block2Image.forEach(item => {
        if (item.isIntersecting) item.target.classList.add('image-wrapper-right-inView')
    })

    dividerLine.forEach(item => {
        if (item.isIntersecting) item.target.classList.add('gray-divider-in-image-inView')
    })

    circles.forEach((item,i) => {
        if (item.isIntersecting) {item.target.classList.add('block-2-circle-inView');  item.target.style.animationDelay = 0.5 * i + "s"}
    })

    benefitBlockImage.forEach(item => {
        if (item.isIntersecting) item.target.classList.add('image-wrapper-left-inView')
    })

    quoteBlock.forEach(item => {
        if (item.isIntersecting) item.target.classList.add('quoteBlock-inView')
    })

    quoteSymbol.forEach(item => {
        if (item.isIntersecting) item.target.classList.add('quoting-symbol-inView')
    })

});

//attaches observer to elements which are to be animated

elementsToAnimate.forEach((item) => {
    observer.observe(item);
});
