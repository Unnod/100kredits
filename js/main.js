
$(function () {
    setTimeout(
        function () {
            jQuery(".preloader").fadeOut();
        }
        , 1000);

    new WOW().init();

    $(document).on('keyup', function () {
        return event.charCode >= 48
    });

    $(".questions__item").on('click', function () {
        $(this).children(".questions__item-text").slideToggle();
        $(this).toggleClass('active');
    });

    $('.partners__items').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        prevArrow: '<button class="slick-arrow prev-arrow icon-keyboard_arrow_down"></button>',
        nextArrow: '<button class="slick-arrow next-arrow icon-keyboard_arrow_down"></button>',
        responsive: [
            {
                breakpoint: 870,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,

                }
            },
            {
                breakpoint: 540,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,

                }
            },
        ]
    });

    $(".sum-credit").ionRangeSlider({
        skin: "round",
        type: "single",
        min: 5000,
        max: 3000000,
        step: 5000,
        from: 100000
    });

    $(".term-credit").ionRangeSlider({
        skin: "round",
        type: "single",
        min: 2,
        max: 180,
        step: 1,
        from: 12
    });

    let inputMobile = $('.input-mobile');
    let inputDesktop = $('.input-desktop');

    inputDesktop.addClass('remove');

    const percent = 5.9;
    let inputDesktop_val = ".irs.irs--round.js-irs-0 .irs-single";
    let inputDesktop_month = ".irs.irs--round.js-irs-1 .irs-single";
    let inputMobile_val = ".input-mobile-sum";
    let inputMobile_month = ".input-mobile-term";

    let inputChange = function (val, month) {
        let strVal;
        let mounthes;
        if (val == inputDesktop_val) {
            strVal = $(val).text();
            mounthes = parseInt($(month).text());
        } else {
            strVal = $(val).val();
            mounthes = parseInt($(month).val());
        };

        let intVal = parseInt(strVal.replace(/\s+/g, ""));
        let newVal = Math.round(parseInt(intVal * percent / 100 * mounthes / 12));
        $('.header__main-form-info-sum .header__main-form-info-number').text(strVal);
        $('.header__main-form-info-percent .header__main-form-info-number').text(Math.round(intVal * percent / 100 * mounthes / 12));
        let str;
        let result;
        str = '' + newVal;
        result = str.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
        $('.header__main-form-info-percent .header__main-form-info-number').text(result);
        let sum = newVal + intVal;
        str = '' + sum;
        result = str.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
        $('.header__main-form-info-return .header__main-form-info-number').text(result);
    };

    if ($(window).width() >= 830) {
        inputChange(inputDesktop_val, inputDesktop_month);
    } else {
        inputChange(inputMobile_val, inputMobile_month);
    }

    $(".input-mobile").on("change", function () {
        let val = $(this).val();
        let max = parseInt($(this).attr("max"));
        let min = parseInt($(this).attr("min"));
        if (!val) {
            if ($(this).hasClass('input-mobile-sum')) {
                $(this).val(100000);
            } else {
                $(this).val(2);
            }
        }

        if (val > max) {
            $(this).val(max);
        }

        if (val < min) {
            $(this).val(min);
        }

    })

    $('.application').click(function (event) {
        let val = $(".header__main-form-info-sum .header__main-form-info-number").text();
        window.open(
            "https://creditoros.ru/zayavka?sumcredit=" + parseInt(val.replace(/\s+/g, "")),
            "_blank"
        );
        window.location.href = "https://creditoros.ru/spisok";
        return false;
    });


    var slider = $('.advantages__items');

    var settings = {
        slidesToShow: 2,
        slidesToScroll: 2,
        prevArrow: '<button class="slick-arrow prev-arrow icon-keyboard_arrow_down"></button>',
        nextArrow: '<button class="slick-arrow next-arrow icon-keyboard_arrow_down"></button>',
        responsive: [
            {
                breakpoint: 730,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,

                }
            }
        ]
    }

    $(window).on('resize', function () {

        if ($(window).width() >= 830) {
            if ($('.irs--round').hasClass('hide')) {
                $('.irs--round').removeClass('hide');
            }

            if (!inputMobile.hasClass('hide')) {
                inputMobile.addClass('hide');
            }

            if (slider.hasClass('slick-initialized')) {
                slider.slick('unslick');
            }

            inputChange(inputDesktop_val, inputDesktop_month);

            $(".irs.irs--round.js-irs-0 .irs-single").off("DOMSubtreeModified", function () {
                inputChange(inputDesktop_val, inputDesktop_month);
            });

            $(".irs.irs--round.js-irs-1 .irs-single").off("DOMSubtreeModified", function () {
                inputChange(inputDesktop_val, inputDesktop_month);
            });

            $(".irs.irs--round.js-irs-0 .irs-single").on("DOMSubtreeModified", function () {
                inputChange(inputDesktop_val, inputDesktop_month);
            });

            $(".irs.irs--round.js-irs-1 .irs-single").on("DOMSubtreeModified", function () {
                inputChange(inputDesktop_val, inputDesktop_month);
            });

            return;
        }
        else {
            if (!$('.irs--round').hasClass('hide')) {
                $('.irs--round').addClass('hide');
            }
            if (inputMobile.hasClass('hide')) {
                inputMobile.removeClass('hide');
            }

            inputChange(inputMobile_val, inputMobile_month);

            $(inputMobile_val).off("change", function () {
                inputChange(inputMobile_val, inputMobile_month);
            });

            $(inputMobile_month).off("change", function () {
                inputChange(inputMobile_val, inputMobile_month);
            });

            $(inputMobile_val).on("change", function () {
                inputChange(inputMobile_val, inputMobile_month);
            });

            $(inputMobile_month).on("change", function () {
                inputChange(inputMobile_val, inputMobile_month);
            });

            if (!slider.hasClass('slick-initialized')) {
                return slider.slick(settings);
            }


        }
    });

    $(window).trigger('resize');






});