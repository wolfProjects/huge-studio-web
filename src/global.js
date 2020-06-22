
import $ from 'jquery';

//  Global
export const Global = {
    initMobileHeader() {
        $('.mobile-header-nav-icon').on('click', () => {
            $('.mobile-header-nav, .mobile-header-mask').addClass('active');
        });

        $('.mobile-header-close, .mobile-header-mask').on('click', () => {
            $('.mobile-header-nav, .mobile-header-mask').removeClass('active');
        });
    },

    init() {
        console.log('init global....');
        this.initMobileHeader();
    }
};

//  init
Global.init();