requirejs.config({
    paths: {
        'text': '../lib/require/text',
        'toastr8': '../lib/toastr8/js/toastr8',
        'jquery': '../lib/jquery/jquery-1.9.1'
    }
});

define(['toastr8'], function (toastr8) {

    var init = function () {
        toastr8.info("Go get him a nice meal...", "It is your dog birthay.", { timeOut: (Math.random() * 21200) + 1 });
        toastr8.warning("This is a beautiful message body....", "It is your dog birthay!", { timeOut: (Math.random() * 831020) + 1 });
        toastr8.error("This is a beautiful message body....", "It is your dog birthay!");
        toastr8.success("This is a beautiful message body..", "It is your dog birthay!");


        toastr8.github("This is a beautiful message body.", "Alerta github", { timeOut: (Math.random() * 811000) + 1 });
        toastr8.googlePlus("This is a beautiful message body.", "Alerta Google+", { timeOut: (Math.random() * 811000) + 1 });
        toastr8.linux("This is a beautiful message body.", "Alerta Tuxxx");
        toastr8.facebook("This is a beautiful message body....", "Notificação Facebook", { timeOut: (Math.random() * 811000) + 1 }, "toast8-avatar");
        toastr8.twitter("This is a beautiful message body....", "Alerta Twitter", { timeOut: (Math.random() * 811000) + 1 });
        toastr8.windows("This is a beautiful message body....", "Alerta Windows 8", { timeOut: (Math.random() * 811000) + 1 });
        toastr8.linkedin("This is a beautiful message body....", "Alerta LinkdeIn", { timeOut: (Math.random() * 811000) + 1 }, "toast8-avatar");
        toastr8.android("This is a beautiful message body....", "Alerta Android", { timeOut: (Math.random() * 811000) + 1 });
        toastr8.skype("This is a beautiful message body....", "Alerta Skype", { timeOut: (Math.random() * 811000) + 1 });
        return this;
    };

    var init2 = function () {
      
    };

    function getRandomColor() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.round(Math.random() * 15)];
        }
        return color;
    }

    $("#throwToastr8").click(init);
    $("#throwToastr").click(init2);
    $("#throwGithub").click(function () {
        toastr8.github("<a href='https://github.com/saribe/toastr8'><i class='fa fa-link'></i> GitHub...</a>", "Toastr8 Page", { timeOut: (Math.random() * 911400) + 1 }, "toastr-logo");
    });
    
    $("#throwPage").click(function() {
        toastr8.error("<a href='http://samuel.maispc.com'><i class='fa fa-link'></i> About me...</a>", "Personal Page", { }, "toast8-avatar", "fa fa-user").css("background-color",getRandomColor());
    });
   // $(".fa-cog:nth-child(3)").click(init3);

    return {
        init: init,
        init2: init2
    };
});