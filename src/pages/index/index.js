import "./index.less";
import $ from "jquery";
import "swiper/css/swiper.css";
import Swiper from "swiper";

//  App
const App = {
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
    $(".kv-bd").on("click",  '.kv-image',  function () {
      let type = $(this).attr("data-type");
      let src;

      if (type === "video") {
        src = $(this).attr("data-src-video");
        if (!src) return;
        that.openVideoModal(src);
      }
    });

    $(".video-modal .modal-close").on("click", () => {
      this.closeVideoModal();
    });
  },
  initKvSwiper() {
    this.swiperInstance = new Swiper(".swiper-container", {
      // Optional parameters
      loop: true,

      effect: "fade",

      autoplay: {
        delay: 400000,
        disableOnInteraction: false,
      },

      // If we need pagination
      pagination: {
        el: ".swiper-pagination",
      },

      keyboard: {
        enabled: true,
        onlyInViewport: false,
      },
    });
  },
  init() {
    console.log("init app....");
    this.initModal();
    this.initKvSwiper();
  },
};

//  init
App.init();
