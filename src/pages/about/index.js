import "./index.less";
import $ from "jquery";
import "swiper/css/swiper.css";
import Swiper from "swiper";

//  App
const App = {
  initTeamMemberClick() {
    $(".team-item").on("click", function () {
      $(this).addClass(".active").siblings().removeClass("active");
    });
  },

  initHistorySwiper() {
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

  init() {
    console.log("init app....");
    this.initTeamMemberClick();
    this.initHistorySwiper();
  },
};

//  init
App.init();
