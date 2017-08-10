module.exports = {
    methods: {
        uiColorChange() {
            let overlay = $('.overlay');
            if (overlay.length > 0) {
                $('#menu, .logo, .right-menu, .left-info-block, .inner-right-sidebar, .scroll-view, .mobile-logo, .owl-dots, .owl-arrows').addClass('white');
            } else {
                $('#menu, .logo, .right-menu, .left-info-block, .inner-right-sidebar, .scroll-view,.mobile-logo, .owl-dots, .owl-arrows').removeClass('white');
            }
        }
    }
}