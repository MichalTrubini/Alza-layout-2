//CONTENTS
//
//0.GENERAL
//1.SET WIDTH OF SLIDER ITEM
//2.SLIDER TYPEA
//3.TABLE
//4.SLIDER TYPEB
//5.ANIMATIONS WHEN SCROLLED TO VIEW
//6.YOUTUBE VIDEO
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
let sliderGap = Number(style.gap.replace("px", ""));
let sliderPadding = Number(style.padding.replace("px", ""));

//-->functions

sliderItemsTypeA.forEach((item) => {
  if (screenWidth >= 1250)
    item.style.width = (sliderWidth - sliderGap * 3 - sliderPadding * 2) / 4 + "px"; //4 items visible
  else if (screenWidth > 767)
    item.style.width = (sliderWidth - sliderGap * 2 - sliderPadding * 2) / 3 + "px"; // 3 items
  else if (screenWidth > 525)
    item.style.width = (sliderWidth - sliderGap * 1 - sliderPadding * 2) / 2 + "px"; // 2 items
  else item.style.width = sliderWidth - sliderPadding * 2 + "px"; // 1 item
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
    item.scrollLeft += containerWidth + sliderGap;
  });

  preBtn[i].addEventListener("click", () => {
    item.scrollLeft -= containerWidth + sliderGap;
  });
});

/*-----------------------------------------------------------------------------------*/
/*	 3.TABLE
/*-----------------------------------------------------------------------------------*/

const tableHeader = document.querySelectorAll("#celek .table__headerItemContainer ");
const tableItems = document.querySelectorAll("#celek .table__item");

tableItems.forEach((item, i) => {
  tableHeader[i].addEventListener("click", () => {
    tableItems.forEach((tableItem) => {
      if (tableItem.classList.contains("item--visible")) tableItem.classList.remove("item--visible");
      item.parentElement.style.height = item.offsetHeight + "px";
    });

    item.classList.add("item--visible");
  });
});

tableHeader.forEach((item) => {
  item.addEventListener("click", () => {
    tableHeader.forEach((item) => {
      if (item.children[1].classList.contains("table__headerItemRectangle--visible")) {
        item.children[1].classList.remove("table__headerItemRectangle--visible");
        item.children[0].classList.remove("table__headerItem--selected");
      }
    });

    item.children[1].classList.add("table__headerItemRectangle--visible");
    item.children[0].classList.add("table__headerItem--selected");
  });
});

const tableItemVisible = document.querySelector("#celek .block-10 .table__content .item--visible");

window.addEventListener("load", (event) => {
  if (screenWidth > 425)
    tableItemVisible.parentElement.style.height = document.querySelector("#celek .table__header").offsetHeight + "px";
  else {
    tableItemVisible.parentElement.style.height = tableItemVisible.getBoundingClientRect().height + "px";
  }
});

/*-----------------------------------------------------------------------------------*/
/*	 4.SLIDER TYPE-B
/*-----------------------------------------------------------------------------------*/

//-->variables declaration

const sliderB = document.querySelectorAll("#celek .sliderB");
const nxtBtnB = document.querySelector("#celek .sliderB__arrowContainerRight");
const preBtnB = document.querySelector("#celek .sliderB__arrowContainerLeft");
const sliderBItems = document.querySelectorAll("#celek .sliderB__item");
const sliderCircles = document.querySelectorAll("#celek .sliderB__circle");

const sliderItemVisible = document.querySelector("#celek .block-sliderB .item--visible");

window.addEventListener("load", (event) => {
  sliderItemVisible.parentElement.style.height = sliderItemVisible.offsetHeight + "px";
});

let clickCounter = 0;

//-->functions

nxtBtnB.addEventListener("click", () => {
  sliderBItems.forEach((item, i) => {
    if ((i === clickCounter) & (i < sliderBItems.length - 1)) {
      item.firstElementChild.classList.add("item--visibleRightReverse");
      item.lastElementChild.classList.add("item--visibleLeftReverse");
      setTimeout(() => {
        item.classList.remove("item--visible");
        item.firstElementChild.classList.remove("item--visibleRightReverse");
        item.lastElementChild.classList.remove("item--visibleLeftReverse");
        item.firstElementChild.classList.remove("item--visibleRight");
        item.lastElementChild.classList.remove("item--visibleLeft");
        item.nextElementSibling.classList.add("item--visible");
        item.nextElementSibling.firstElementChild.classList.add("item--visibleRight");
        item.nextElementSibling.lastElementChild.classList.add("item--visibleLeft");
        item.parentElement.style.height = item.offsetHeight + "px";
      }, 750);
    }
  });
  if (clickCounter < sliderBItems.length - 1) clickCounter += 1;
  sliderCircles.forEach((item, i) => {
    if (i === clickCounter) item.classList.add("sliderB__circle--selected");
    else item.classList.remove("sliderB__circle--selected");
  });
});

preBtnB.addEventListener("click", () => {
  sliderBItems.forEach((item, i) => {
    if ((i === clickCounter) & (clickCounter > 0)) {
      item.firstElementChild.classList.add("item--visibleRightReverse");
      item.lastElementChild.classList.add("item--visibleLeftReverse");
      setTimeout(() => {
        item.classList.remove("item--visible");
        item.firstElementChild.classList.remove("item--visibleRightReverse");
        item.lastElementChild.classList.remove("item--visibleLeftReverse");
        item.firstElementChild.classList.remove("item--visibleRight");
        item.lastElementChild.classList.remove("item--visibleLeft");
        item.previousElementSibling.classList.add("item--visible");
        item.previousElementSibling.firstElementChild.classList.add("item--visibleRight");
        item.previousElementSibling.lastElementChild.classList.add("item--visibleLeft");
        item.parentElement.style.height = item.offsetHeight + "px";
      }, 750);
    }
  });
  if (clickCounter > 0) clickCounter -= 1;
  sliderCircles.forEach((item, i) => {
    if (i === clickCounter) item.classList.add("sliderB__circle--selected");
    else item.classList.remove("sliderB__circle--selected");
  });
});

/*-----------------------------------------------------------------------------------*/
/*	 5.ANIMATIONS WHEN SCROLLED TO VIEW
/*-----------------------------------------------------------------------------------*/

//selects all elements which are to be animated

const elementsToAnimate = document.querySelectorAll(`[data-animate="animation"]`);

//declaration of intersection observer API

let observer = new IntersectionObserver((entries) => {
  //separates elements that require the same animation into categories based on their class

  const headerTopBar = entries.filter((entry) => entry.target.classList.contains("header-top-border"));
  const headerTopBarShort = entries.filter((entry) => entry.target.classList.contains("header-top-border--short"));
  const imageAnimateLeft = entries.filter((entry) => entry.target.classList.contains("image-wrapper-right"));
  const imageAnimateRight = entries.filter((entry) => entry.target.classList.contains("image-wrapper-left"));
  const benefitComponent = entries.filter((entry) => entry.target.classList.contains("benefit-component"));
  const block2Image = entries.filter((entry) => entry.target.classList.contains("block-2-text-wrapper-right"));
  const dividerLine = entries.filter((entry) => entry.target.classList.contains("gray-divider-in-image"));
  const circles = entries.filter((entry) => entry.target.classList.contains("block-2-circle-image"));
  const benefitBlockImage = entries.filter((entry) => entry.target.classList.contains("benefits-block-image"));
  const quoteBlock = entries.filter((entry) => entry.target.classList.contains("quoting"));
  const quoteSymbol = entries.filter((entry) => entry.target.classList.contains("quoting-symbol"));
  const sliderItemsOne = entries.filter((entry) => entry.target.classList.contains("slider__itemOne"));
  const sliderItemsTwo = entries.filter((entry) => entry.target.classList.contains("slider__itemTwo"));
  const blockOneImage = entries.filter((entry) => entry.target.classList.contains("benefity-image"));
  const sliderDummyOne = entries.filter((entry) => entry.target.classList.contains("sliderB__dummyOne"));
  const sliderDummyTwo = entries.filter((entry) => entry.target.classList.contains("sliderB__dummyTwo"));

  //if element is intersecting (that means, in viewport), class is added to the element
  //class then defines animation using keyframes

  sliderItemsOne.forEach((item, i) => {
    if (item.isIntersecting) {
      item.target.classList.add("slider__item-inView");
      item.target.style.animationDelay = 0.5 * i + "s";
    }
  });

  headerTopBarShort.forEach((item) => {
    if (item.isIntersecting) {
      item.target.classList.add("header-top-border--short-inView");
    }
  });

  sliderDummyOne.forEach((item) => {
    if (item.isIntersecting) {
      item.target.classList.add("sliderB__dummyOne-inView");
    }
  });

  sliderDummyTwo.forEach((item) => {
    if (item.isIntersecting) {
      item.target.classList.add("sliderB__dummyTwo-inView");
    }
  });

  blockOneImage.forEach((item) => {
    if (item.isIntersecting) {
      item.target.classList.add("benefity-image-inView");
    }
  });

  sliderItemsTwo.forEach((item, i) => {
    if (item.isIntersecting) {
      item.target.classList.add("slider__item-inView");
      item.target.style.animationDelay = 0.5 * i + "s";
    }
  });

  headerTopBar.forEach((item) => {
    if (item.isIntersecting) item.target.classList.add("header-top-border-inView");
  });

  imageAnimateLeft.forEach((item) => {
    if (item.isIntersecting) item.target.classList.add("image-wrapper-right-inView");
  });

  imageAnimateRight.forEach((item) => {
    if (item.isIntersecting) item.target.classList.add("image-wrapper-left-inView");
  });

  benefitComponent.forEach((item, i) => {
    if (item.isIntersecting) {
      item.target.classList.add("benefit-component-inView");
      item.target.style.animationDelay = 0.5 * i + "s";
    }
  });

  block2Image.forEach((item) => {
    if (item.isIntersecting) item.target.classList.add("image-wrapper-right-inView");
  });

  dividerLine.forEach((item) => {
    if (item.isIntersecting) item.target.classList.add("gray-divider-in-image-inView");
  });

  circles.forEach((item, i) => {
    if (item.isIntersecting) {
      item.target.classList.add("block-2-circle-inView");
      item.target.style.animationDelay = 0.5 * i + "s";
    }
  });

  benefitBlockImage.forEach((item) => {
    if (item.isIntersecting) item.target.classList.add("image-wrapper-left-inView");
  });

  quoteBlock.forEach((item) => {
    if (item.isIntersecting) item.target.classList.add("quoteBlock-inView");
  });

  quoteSymbol.forEach((item) => {
    if (item.isIntersecting) item.target.classList.add("quoting-symbol-inView");
  });
});

//attaches observer to elements which are to be animated

elementsToAnimate.forEach((item) => {
  observer.observe(item);
});

/*-----------------------------------------------------------------------------------*/
/*	 6. YOUTUBE VIDEO
/*-----------------------------------------------------------------------------------*/

//video thumbnails jump to section

const videoThumbnails = document.querySelectorAll("#celek .video__thumbnailItem");

let tag = document.createElement("script");
tag.id = "iframe-demo";
tag.src = "https://www.youtube.com/iframe_api";
let firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player("video4YWiybTQ", {
    events: {
      onReady: onPlayerReady,
    },
  });
}
function onPlayerReady() {
  videoPosterContainer.addEventListener("click", () => {
    videoPosterContainer.style.display = "none";
    player.playVideo();
  });

  videoThumbnails.forEach((item) => {
    item.addEventListener("click", () => {
      videoPosterContainer.style.display = "none";
      player.seekTo(Number(item.dataset.play));
      player.playVideo();
    });
  });
}

//video slider height setting

const sencorVideoSlider = document.querySelector("#celek .video__thumbnails");
let sencorVideoSliderStyle = getComputedStyle(sencorVideoSlider);
let sencorVideoSliderGap = Number(sencorVideoSliderStyle.gap.replace("px", ""));
window.addEventListener("load", (event) => {
  const sencorVideoSliderHeight = videoThumbnails[0].offsetHeight * 4 + sencorVideoSliderGap * 3;
  sencorVideoSlider.style.height = sencorVideoSliderHeight + "px";
});

//video slider scrolling

const videoArrowUp = document.querySelector("#celek .video__arrowUp");
const videoArrowDown = document.querySelector("#celek .video__arrowDown");

videoArrowDown.addEventListener("click", () => {
  sencorVideoSlider.scrollTop += videoThumbnails[0].offsetHeight + sencorVideoSliderGap;
});

videoArrowUp.addEventListener("click", () => {
  sencorVideoSlider.scrollTop -= videoThumbnails[0].offsetHeight + sencorVideoSliderGap;
});

//video poster size

const videoPosterContainer = document.querySelector("#celek .video__posterContainer");

window.addEventListener("load", (event) => {
  videoPosterContainer.style.width = document.querySelector("#celek .video-wrapper").offsetWidth + "px";
  videoPosterContainer.style.height = document.querySelector("#celek .video-wrapper").offsetHeight + "px";
});
