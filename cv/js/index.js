/**
 * Created by lc on 2016/8/28.
 */
$(document).ready(function() {
    $('#pagepiling').pagepiling({
        menu: '#menu',
        anchors: ['page1', 'page2', 'page3','page4','page5'],
        navigation: {
            'textColor': '#f2f2f2',
            'bulletsColor': '#ccc',
            'position': 'right',
            'tooltips': ['Home', 'Project','Professions', 'Education', 'Internship']
        }
    });
});