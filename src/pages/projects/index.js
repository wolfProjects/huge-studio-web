import "./index.less";
import $ from "jquery";
import "swiper/css/swiper.css";
import Swiper from "swiper";

//  App
const App = {
  swiperInstance: null,
  openImagesModal(src) {
    //  gen image dom
    let dom = "";

    src.forEach((image) => {
      dom += `
        <div class="swiper-slide">
            <img src="${image}" alt="">
        </div>
      `;
    });

    $(".images-modal .swiper-wrapper").append($(dom));

    $(".images-modal").show();
    this.swiperInstance = new Swiper(".swiper-container", {
      // Optional parameters
      loop: true,

      // If we need pagination
      pagination: {
        el: ".swiper-pagination",
      },

      // Navigation arrows
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },

      // And if we need scrollbar
      scrollbar: {
        el: ".swiper-scrollbar",
      },

      keyboard: {
        enabled: true,
        onlyInViewport: false,
      },
    });
  },
  closeImagesModal() {
    try {
      this.swiperInstance.destroy();
    } catch(e) {
      $(".images-modal").hide();
      $(".images-modal .swiper-container").remove();
      $(".images-viewer").append($(`
        <div class="swiper-container">
          <!-- Additional required wrapper -->
          <div class="swiper-wrapper"></div>
          <!-- If we need pagination -->
          <div class="swiper-pagination"></div>
      
          <!-- If we need navigation buttons -->
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </div>
      `));
    } 
    this.swiperInstance = null;
  },
  openVideoModal(src) {
    $(".video-modal .video-viewer-bd").append(
      $(`<iframe src="${src}" frameborder="0"></iframe>`)
    );
    $(".video-modal").show();
  },
  closeVideoModal() {
    $(".video-modal").hide();
    $(".video-modal .video-viewer-bd").empty();
  },
  initModal() {
    let that = this;

    //  add modal open event for each job title
    $(".originals").on("click", ".originals-item", function () {
      let type = $(this).attr("data-type");
      let src;

      if (type === "image") {
        src = $(this).attr("data-src-images");
        if (!src) return;
        src = src.split(",");
        that.openImagesModal(src);
      } else if (type === "video") {
        src = $(this).attr("data-src-video");
        if (!src) return;
        that.openVideoModal(src);
      }
    });

    $(".images-modal .modal-close").on("click", () => {
      this.closeImagesModal();
    });

    $(".video-modal .modal-close").on("click", () => {
      this.closeVideoModal();
    });
  },

  init() {
    console.log("init app....");
    this.initModal();
  },
};

//  init
App.init();
