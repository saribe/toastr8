requirejs.config({
    paths: {
        'text': '../lib/require/text',
        'toastr': '../lib/toastr/js/toastr',
        'toastr8': '../lib/toastr8/js/toastr8',
        'jquery': '../lib/jquery/jquery-1.9.1'
    }
});

define(['toastr', 'toastr8'], function (toastr, toastr8) {

    

    var init = function () {
        toastr8.info("Go get him a nice meal...", "It is your dog birthay.", { newestOnTop: true, timeOut: (Math.random() * 21200) + 1 }).css("background-color", getRandomColor());
        toastr8.warning("This is a beautiful message body....", "It is your dog birthay!", { newestOnTop: true, timeOut: (Math.random() * 831020) + 1 }).css("background-color", getRandomColor());
        toastr8.error("This is a beautiful message body....", "It is your dog birthay!", { newestOnTop: true, timeOut: (Math.random() * 11400) + 1 }, "toast8-default").css("background-color", getRandomColor());
        toastr8.success("This is a beautiful message body.This is a beautiful message body.This is a beautiful message body....", "It is your dog birthay!", { newestOnTop: true, timeOut: (Math.random() * 10300) + 1 }).css("background-color", getRandomColor());


        toastr8.github("This is a beautiful message body.", "Alerta github", { newestOnTop: true, timeOut: (Math.random() * 811000) + 1 });
        toastr8.googlePlus("This is a beautiful message body.", "Alerta Google+", { newestOnTop: true, timeOut: (Math.random() * 811000) + 1 });
        toastr8.linux("This is a beautiful message body.", "Alerta Tuxxx", { newestOnTop: true, timeOut: (Math.random() * 811000) + 1 });
        toastr8.facebook("This is a beautiful message body....", "Notificação Facebook", { newestOnTop: true, timeOut: (Math.random() * 811000) + 1 }, "toast8-avatar");
        toastr8.twitter("This is a beautiful message body....", "Alerta Twitter", { newestOnTop: true, timeOut: (Math.random() * 811000) + 1 });
        toastr8.windows("This is a beautiful message body....", "Alerta Windows 8", { newestOnTop: true, timeOut: (Math.random() * 811000) + 1 });
        toastr8.linkedin("This is a beautiful message body....", "Alerta LinkdeIn", { newestOnTop: true, timeOut: (Math.random() * 811000) + 1 }, "toast8-avatar");
        toastr8.android("This is a beautiful message body....", "Alerta Android", { newestOnTop: true, timeOut: (Math.random() * 811000) + 1 });
        toastr8.skype("This is a beautiful message body....", "Alerta Skype", { newestOnTop: true, timeOut: (Math.random() * 811000) + 1 });
        return this;
    };

    var init2 = function () {
        toastr.options.positionClass = 'toast8-bottom-left';
        toastr.info("This is a beautiful message body....", "It is your dog birthay!");
        toastr.warning("This is a beautiful message body....", "It is your dog birthay!");
        toastr.error("This is a beautiful message body....", "It is your dog birthay!");
        toastr.success("This is a beautiful message body....", "It is your dog birthay!");
    };

    function getRandomColor() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.round(Math.random() * 15)];
        }
        return color;
    }

    $("a[style*=blue]").click(init);
    $("a[style*=red]").click(init2);
   // $(".fa-cog:nth-child(3)").click(init3);

    return {
        init: init,
        init2: init2
    };
});