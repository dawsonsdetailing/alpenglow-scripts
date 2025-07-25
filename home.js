// 🏠 Home page slider logic
window.addEventListener("DOMContentLoaded", function () {
  $(".slider-blog_component").each(function (index) {
    let loopMode = $(this).attr("loop-mode") === "true";
    let sliderDuration = $(this).attr("slider-duration") !== undefined
      ? +$(this).attr("slider-duration")
      : 700;

    const swiper = new Swiper($(this).find(".swiper")[0], {
      speed: sliderDuration,
      loop: loopMode,
      autoHeight: false,
      centeredSlides: loopMode,
      followFinger: true,
      freeMode: false,
      slideToClickedSlide: false,
      slidesPerView: 1,
      spaceBetween: "4%",
      rewind: false,
      mousewheel: {
        forceToAxis: true
      },
      keyboard: {
        enabled: true,
        onlyInViewport: true
      },
      breakpoints: {
        480: {
          slidesPerView: 1,
          spaceBetween: "2%"
        },
        768: {
          slidesPerView: 2,
          spaceBetween: "4%"
        },
        992: {
          slidesPerView: 3,
          spaceBetween: "2%"
        }
      },
      pagination: {
        el: $(this).find(".swiper-bullet-wrapper")[0],
        bulletActiveClass: "is-active",
        bulletClass: "swiper-bullet",
        bulletElement: "button",
        clickable: true
      },
      navigation: {
        nextEl: $(this).find(".swiper-next")[0],
        prevEl: $(this).find(".swiper-prev")[0],
        disabledClass: "is-disabled"
      },
      scrollbar: {
        el: $(this).find(".swiper-drag-wrapper")[0],
        draggable: true,
        dragClass: "swiper-drag",
        snapOnRelease: true
      },
      slideActiveClass: "is-active",
      slideDuplicateActiveClass: "is-active"
    });
  });
});
