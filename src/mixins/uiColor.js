module.exports = {
    methods: {
        uiColorChange() {
            let overlay = document.querySelectorAll('.overlay');
            if (overlay.length > 0) {
                $('#menu, .logo, .right-menu, .left-info-block, .inner-right-sidebar, .scroll-view, .mobile-logo').addClass('white');
            } else {
                $('#menu, .logo, .right-menu, .left-info-block, .inner-right-sidebar, .scroll-view,.mobile-logo ').removeClass('white');
            }
        }
    }
}