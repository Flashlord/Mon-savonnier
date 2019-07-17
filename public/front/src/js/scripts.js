/*include /libs/jquery.core.js*/
/*include /libs/jquery.easing.js*/
/*include /libs/owl.carousel.js*/

// --------------------- MASTER PART -------------------------- //
// ------------------------------------------------------------ //

var Master = {

    onready : function(){

        this.init_body_nav();
        this.scroll_slides();
        this.init_footer();
        this.init_quantity();

        this.init_block_products();
        this.init_block_product();
        this.init_block_catslider();
    },

    onload : function(){

        this.scroll_body();
        this.scroll_slides();
    },

    onresize : function(){

        this.final_event( function(){
            $(document).trigger('scroll');
            Master.scroll_slides();
        }, 300, 'late-resize');

        this.scroll_body();
    },

    onscroll : function(){

        this.final_event( function(){
            Master.scroll_body();
            Master.scroll_slides();
        }, 10, 'late-scroll');
    },

    init_youtube_api : function(){

        var yt_tag      = document.createElement('script');
        yt_tag.src = "https://www.youtube.com/iframe_api";

        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(yt_tag, firstScriptTag);
    },

    init_share : function(){

        $('.share-pinterest').on('click', function(e){
            e.preventDefault();

            var s=document.createElement('script');
            s.setAttribute('type','text/javascript');
            s.setAttribute('charset','UTF-8');
            s.setAttribute('src','https://assets.pinterest.com/js/pinmarklet.js?r='+Math.random()*99999999);

            document.body.appendChild(s);
        });

        $('.share-facebook').on('click', function(e){
            e.preventDefault();
            var url = $(this).attr('data-url'),
                title = $(this).attr('data-title');

            window.open('https://www.facebook.com/share.php?u='+url,'facebook_share','menubar=no, status=no, scrollbars=no, menubar=no, width=250, height=200');
        });

        $('.share-twitter').on('click', function(e){
            e.preventDefault();
            var url = $(this).attr('data-url'),
                title = $(this).attr('data-title');
            var win = window.open( 'https://twitter.com/intent/tweet?url=' + url + '&text=' + title, 'ShareOnTwitter', Master.get_window_options());
            win.opener = null; // 2
        });
    },

    get_window_options : function() {

      var width = 500;
      var height = 350;
      var left = (window.innerWidth / 2) - (width / 2);
      var top = (window.innerHeight / 2) - (height / 2);

      return [
        'resizable,scrollbars,status',
        'height=' + height,
        'width=' + width,
        'left=' + left,
        'top=' + top,
      ].join();
    },

    scroll_body : function(){

        if($(window).scrollTop()>300){
            $('body').addClass('body--scroll');
        }else{
            $('body').removeClass('body--scroll');
        }

        if($(window).scrollTop()>$(window).height()){
            $('body').addClass('body--winscroll');
        }else{
            $('body').removeClass('body--winscroll');
        }
    },

    init_body_nav : function(){

        $('.cbo-header .header-burger').on('click', function(e){
            e.preventDefault();
            $('body').toggleClass('body--nav');
        });
    },

    init_quantity : function(){

        $('.cbo-quantity button').on('click', function(){

            var $input = $(this).parent().find('input');
            var quantity = $input.val();
            var min = $input.attr('min');
            var max = $input.attr('max');

            if($(this).hasClass('quantity-less')){
                if((quantity > min || typeof(min) == 'undefined'))
                    quantity--;
            }
            else{ 
                if(quantity < max || typeof(max) == 'undefined')
                    quantity++;
            }

            $input.val( quantity );
        });
    },

    init_footer : function(){

        $('.cbo-footer .footer-bottom .col-title').on('click', function(e){
            e.preventDefault();
            $(this).parent().toggleClass('active');
        });
    },

    init_block_products : function(){

        $('.cbo-products .products-filters .filters-head').on('click', function(){
            $(this).parent().toggleClass('active');
        });

        $('.cbo-products .products-filters .box-head').on('click', function(){
            $(this).parent().toggleClass('active');
        });
    },

    init_block_product : function(){

        var $slider = $('.cbo-product .product-top .top-content .content-slider');

        // Owl Carousel instance
        $slider.owlCarousel({
            items:1,
            margin:20,
            smartSpeed:300,
            nav:false,
            dots:false
        });
    },

    init_block_catslider : function(){

        var $slider = $('.cbo-catslider .catslider-list');
        var $navlinks = $('.cbo-catslider .catslider-nav a');

        // Owl Carousel instance
        $slider.owlCarousel({
            items:1,
            margin:20,
            smartSpeed:300,
            onInitialized:function( a ){

                $slider.find('.owl-item')
                    .eq( 0 )
                    .addClass('translated');

                $navlinks
                    .eq( 0 )
                    .addClass('active');
            },
            onTranslated:function( a ){

                $slider.find('.owl-item')
                    .removeClass('translated')
                    .eq( a.item.index )
                    .addClass('translated');

                $navlinks
                    .removeClass('active')
                    .eq( a.item.index )
                    .addClass('active');
            }
        });

        // Go to the slide
        $('.cbo-catslider .catslider-nav a').on('click', function(e) {
            e.preventDefault();
            var index = $navlinks.index( $(this) );
            $slider.trigger('to.owl.carousel', [ index ]);
        });
    },

    scroll_links : function(){

        $('[data-scroller]').on('click', function(e){
            e.preventDefault();
            var target = $(this).attr('data-scroller');
            Master.scroll_to( target, {
                offset: -80
            });
        });
    },

    scroll_slides : function(){

        var animations = [
            {
                selector: '.slide-up',
                class: 'anim-slide-up'
            },
            {
                selector: '.slide-down',
                class: 'anim-slide-down'
            },
            {
                selector: '.slide-left',
                class: 'anim-slide-left'
            },
            {
                selector: '.slide-right',
                class: 'anim-slide-right'
            },
            {
                selector: '.scale-up',
                class: 'anim-scale-up'
            }
        ];

        var win_top = $(window).scrollTop();
        var win_height = $(window).height();
        var win_width = $(window).width();
        var min_width_delay = 768;
        var coeff = .9;

        $.each( animations, function( i, animation ){

            $( animation.selector ).each(function(){

                var $el = $(this);
                var pos = $el.offset().top;
                var delay = parseInt( $el.attr('data-delay') );

                if(isNaN(delay) || win_width < min_width_delay){ 
                    delay = 0;
                }

                if (pos < win_top + (win_height*coeff)) {
                    setTimeout( function(){ 
                        $el.addClass( animation.class );
                    }, delay);
                }
            });
        });
    },

    // Permet d'attendre le dernier évènement
    // lors d'actions comme un resize de la fenêtre
    // et donc d'éviter de saturer le browser
    // callback (function) : le callback à executer
    // ms (integer) : le temps à attendre en ms
    // uniqueId (string) : clé unique pour identifier le timer

    commonFinalTimer : [],
    final_event : function(callback, ms, uniqueId) {

        if (!uniqueId) {
          uniqueId = "Don't call this twice without a uniqueId";
        }
        if (this.commonFinalTimer[uniqueId]) {
          clearTimeout (this.commonFinalTimer[uniqueId]);
        }
        this.commonFinalTimer[uniqueId] = setTimeout(callback, ms);
    },

    // Déplace le scroll vertical jusqu'à l'élément fourni
    // target (jQuery object or Integer) : l'objet ou la position à atteindre
    // opts (object) : options de la méthode

    scroll_to : function(target, opts){

        var config = {
            "offset" : 0,
            "parent" : $('html, body'),
            "callback" : false,
            "duration" : 1000
        };

        for (var attrname in opts) { config[attrname] = opts[attrname]; }

        var $parent = $( config.parent );
        var currentpos = $parent.scrollTop();

        var pos = target;
        if($(target).get().length > 0){
            pos = parseInt($(target).position().top);
            pos += currentpos;
        }
        
        pos += config.offset;

        $parent.stop(true,true).animate({ scrollTop: pos },config.duration, "easeInOutExpo", function(){
            if(typeof(callback) != "undefined")
                callback();
        });
    }
};

$(function(){
    Master.onready();
});

$(window).on( 'load', function(){
    Master.onload();
});

$(window).on( 'resize', function(){
    Master.onresize();
});

$(window).on( 'scroll', function(){
    Master.onscroll();
});

// --------------------- YOUTUBE ------------------- //
// ------------------------------------------------- //

var yt_videos   = [];
var yt_timers   = [];

function onYouTubeIframeAPIReady() {

    $('.player-embed').each(function(){

        var id = $(this).attr('id');
        var video = $(this).attr('data-id');

        yt_videos[id] = new YT.Player(id, {
          height: '138',
          width: '245',
          videoId: video,
          playerVars : {
            'modestbranding': 1,
            'showinfo': 0,
            'controls': 0,
            'iv_load_policy': 3,
            'fs': 0
          },
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });

        function onPlayerReady(event) {
            $('#'+id).parent().addClass('video-player--ready');
        }

        var stateChangeTimer;
        function onPlayerStateChange(event) {

            if(event.data == 0 || event.data == 2){

                yt_timers[id] = setTimeout( function(){
                                    $('#'+id).parent().removeClass('video-player--playing');
                                }, 1000);
            }

            if(event.data == 1){
                clearTimeout(yt_timers[id]);
                $('#'+id).parent().addClass('video-player--playing');
            }
        }

        function stopVideo(id){
            var $parent = $('#'+id).parent();
            $parent.removeClass('video-player--playing');
            yt_videos[id].stopVideo();
        }

        function playVideo(id){
            var $parent = $('#'+id).parent();
            $parent.removeClass('video-player--loading');
            $parent.addClass('video-player--playing');
            yt_videos[id].playVideo();
        }

        $('.player-button').on('click', function(e){
            e.preventDefault();
            var $parent = $(this).closest('.cbo-video');
            var $embed = $parent.find('.player-embed');
            var id = $embed.attr('id');
            $parent.addClass('video-player--loading');
            setTimeout( function(){ playVideo(id); }, 1500);
        });

        $('.player-close').on('click', function(e){
            e.preventDefault();
            var $parent = $(this).closest('.cbo-video');
            var $embed = $parent.find('.player-embed');
            var id = $embed.attr('id');
            stopVideo(id);
            $('#'+id).parent().removeClass('video-player--playing');
        });

    });
}