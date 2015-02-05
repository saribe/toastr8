requirejs.config({
    paths: {
        'text': '//cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text.min',
        'toastr8': '//rawgit.com/saribe/toastr8/master/dist/js/toastr8.min',
        //'toastr8': '../toastr8/dist/js/toastr8',
        'jquery': '//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min'
    }
});

define(['toastr8'], function (toastr8) {

    var avatars = [
        'http://icons.iconarchive.com/icons/wackypixel/dogs-n-puppies/128/Puppy-4-icon.png',
        'http://www.emoticonswallpapers.com/avatar/animals/Puppy-7.jpg',
        'https://31.media.tumblr.com/avatar_19642255c98d_128.png',
        'http://penzipet.herokuapp.com/assets/Puppy-1-icon-5f2890e4352b804e0f8b8f5aa9672873.png',
        'http://38.media.tumblr.com/avatar_14ee6ada72a4_128.png',
        'https://toferet.files.wordpress.com/2012/11/maru-20090425-125127.jpg',
        'http://3.bp.blogspot.com/-ePrVInluz5s/T57ICLQ1kgI/AAAAAAAAAcg/fapul3o62Po/s1600/maru.jpg',
        'http://www.pawspets.co.uk/images/love-bird.jpg',
        'http://lafeber.com/pet-birds/wp-content/uploads/parrot-grn.png',
        'http://www.iconarchive.com/download/i59176/fasticon/angry-birds/yellow-bird.ico',
        'http://androidmarket.googleusercontent.com/android/market/com.rovio.angrybirdsseasons/hi-256-9-347dae230614238a639d21508ae492302340b2ba',
        'http://lh4.googleusercontent.com/-DF_9UPVqkxc/AAAAAAAAAAI/AAAAAAAAFHg/a4f-VCnU4M4/photo.jpg',
        'http://rs2static.memecdn.com/images/avatars/s_694389_519b43205655d.jpg',
        'http://38.media.tumblr.com/avatar_fcef91ef5cf2_128.png',
        'http://gp6.googleusercontent.com/-dUsbYRAWMqI/AAAAAAAAAAI/AAAAAAAAAAA/Ntl4OJkcAt8/s100-c-k-no/photo.jpg',
        'http://www.vet-way.com/wp-content/themes/vetway/images/banner_dog.png'

    ];

    var al = avatars.length;
    var maxTimeOut = 811000;

    var init = function () {

        randomToast("info");
        randomToast("warning");
        randomToast("error");
        randomToast("success");

        return this;
    };


    $("[data-toastr8]").click(function(ev) {
        var type = $(ev.currentTarget).attr("data-toastr8");
        randomToast(type);
    });

    $("#throwToastr8").click(init);
    $("#throwGithub").click(function () {
        return toastr8.github({
            message: "<a href='https://github.com/saribe/toastr8'><i class='fa fa-link'></i> GitHub...</a>",
            title: "Toastr8 Page",
            imgURI: ["http://i.imgur.com/VUDoLwz.png"],
            timeOut: 5000
        });
    });

    $("#throwPage").click(function () {
        return toastr8.info({
            message: "<a href='http://samuel.maispc.com'><i class='fa fa-link'></i> About me...</a>",
            title: "Personal Page",
            imgURI: ["https://avatars0.githubusercontent.com/u/4276775?v=3&s=90"],
            iconClass: "glyphicon glyphicon-user text-warning",
            timeOut: 5000
        }).css("background-color", getRandomColor());

    });

    return {
        init: init
    };

    function getRandomColor() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.round(Math.random() * 15)];
        }
        return color;
    }
    function randomToast(type) {
        return toastr8[type]({
            message: "Go get him a nice meal...",
            title: "It is your pet's birthay.",
            imgURI: avatars[parseInt(Math.random() * al)],
            timeOut: (Math.random() * maxTimeOut) + 1
        });
    }
});