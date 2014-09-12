$(document).ready(function(){
// Калькулятор
    var credit_percent = 20; //Значение с неба. К этому проценту прибавляется колличество дней
    // Подключение полос-слайдеров
    if( $('.range').size() > 0 ){
        //Сумма для вывода предупреждения
        if( $('#max_attention').size() > 0 ){
            var attention = $('#max_attention'),
                attention_max = attention.find('em').text(),
                regular_str = /(?=\B(?:\d{3})+(?!\d))/g;
            attention_max.replace( regular_str, ' ' );
            attention_max = parseInt(attention_max);
        }
        
        //Слайдер цены
        $( "#money .range" ).slider({
            range: "min",
            min: 5000,
            max: 30000,
            value: 20000,
            step: 250,
            slide: function(e, ui) {
                var credit = ui.value;
                $(ui.handle).parents('.range-line').find('.value span').html(credit).separation();
                $(ui.handle).parents('.range-line').find('input[type="text"]').val(credit).separationInput();
                
                var dot = $(ui.handle).parents('.range-line').find('.value');
                setTimeout(function(){
                    dot.css({'left': $(ui.handle).position().left });
                }, 20);
                
                //Передача значения в форму калькулятора
                $("#take > strong").text( $('#money input[type="text"]').val() ).separation();
                var percent = (( $( "#period .range" ).slider( "value" ) + credit_percent + 100 ) / 100).toFixed(2);
                var return_cash = Math.round( parseInt( $('#money input[type="text"]').val().replace(/\s+/g,'') )*percent );
                $("#return > strong").text( return_cash ).separation();
                
                //Проверка на макс сумму
                if( ui.value >= attention_max && attention ){ 
                    attention.stop().animate({'opacity': 1}, 100); 
                }else if( attention ){
                    attention.stop().animate({'opacity': 0}, 100); 
                }  
            },
            change: function(e, ui) {
                var credit = ui.value;
                $(ui.handle).parents('.range-line').find('.value span').html(credit).separation();
                $(ui.handle).parents('.range-line').find('input[type="text"]').val(credit).separationInput();
                
                var dot = $(ui.handle).parents('.range-line').find('.value');
                setTimeout(function(){
                    dot.css({'left': $(ui.handle).position().left });
                }, 20);
                
                //Передача значения в форму калькулятора
                $("#take > strong").text( $('#money input[type="text"]').val() ).separation();
                var percent = (( $( "#period .range" ).slider( "value" ) + credit_percent + 100 ) / 100).toFixed(2);
                var return_cash = Math.round( parseInt( $('#money input[type="text"]').val().replace(/\s+/g,'') )*percent );
                $("#return > strong").text( return_cash ).separation();
                
                //Проверка на макс сумму
                if( ui.value >= attention_max && attention ){ 
                    attention.stop().animate({'opacity': 1}, 100); 
                }else if( attention ){
                    attention.stop().animate({'opacity': 0}, 100); 
                }
            }
        });
        
        //Слайдер периода
        $( "#period .range" ).slider({
            range: "min",
            min: 5,
            max: 30,
            value: 10,
            step: 1,
            slide: function(e, ui) {
                var period = ui.value;
                $(ui.handle).parents('.range-line').find('.value span').html(period).separation();
                $(ui.handle).parents('.range-line').find('input[type="text"]').val(period).separationInput();
                
                var dot = $(ui.handle).parents('.range-line').find('.value');
                setTimeout(function(){
                    dot.css({'left': $(ui.handle).css('left') });
                }, 20);
                
                //Передача значения в форму калькулятора
                var percent = (( $( "#period .range" ).slider( "value" ) + credit_percent + 100 ) / 100).toFixed(2);
                var return_cash = Math.round( parseInt( $('#money input[type="text"]').val().replace(/\s+/g,'') )*percent );
                $("#return > strong").text( return_cash ).separation();
                getDate( ui.value );
            },
            change: function(e, ui) {
                var period = ui.value;
                $(ui.handle).parents('.range-line').find('.value span').html(period).separation();
                $(ui.handle).parents('.range-line').find('input[type="text"]').val(period).separationInput();
                
                var dot = $(ui.handle).parents('.range-line').find('.value');
                setTimeout(function(){
                    dot.css({'left': $(ui.handle).css('left') });
                }, 20);
                
                //Передача значения в форму калькулятора
                var percent = (( $( "#period .range" ).slider( "value" ) + credit_percent + 100 ) / 100).toFixed(2);
                var return_cash = Math.round( parseInt( $('#money input[type="text"]').val().replace(/\s+/g,'') )*percent );
                $("#return > strong").text( return_cash ).separation();
                getDate( ui.value );
            }
        });
        //Применение значений слайдера при загрузке
        $('.range-line .value span').each(function(){
            $(this).text( $(this).parents('.range-line').find('.range').slider( "value" ) );
            $(this).parent().css({'left': $(this).parents('.range-line').find('.ui-slider-handle').css('left') });
        });
        
        //Проверка ввода только цифр
        $('.range-line input').bind("change keyup input click", function() {
            if (this.value.match(/[^0-9]/g)) {
                this.value = this.value.replace(/[^0-9]/g, '');
            }
        });
        //Ограничение максимумом и минимумом
        $('.range-line input').bind("change blur", function() {
            var max_val = parseInt($(this).parents('.range-line').find('.max-value').text().replace(/\s+/g,'')),
                min_val = parseInt($(this).parents('.range-line').find('.min-value').text().replace(/\s+/g,'')),
                val = $(this).val().replace( ' ', ' ' );
            if (val == '') val = 0;
            val = parseInt(val.replace(/\s+/g,''));
            if (val > max_val) val = max_val;
            if (val < min_val) val = min_val;
            $(this).val(val).separationInput();
            $(this).parents('.range-line').find('.range').slider( "value", val );
            $(this).separationInput();
            //Передача значения в форму калькулятора
                $("#take > strong").text( $('#money input[type="text"]').val() ).separation();
                var percent = (( $( "#period .range" ).slider( "value" ) + credit_percent + 100 ) / 100).toFixed(2);
                var return_cash = Math.round( parseInt( $('#money input[type="text"]').val().replace(/\s+/g,'') )*percent );
                $("#return > strong").text( return_cash ).separation();
        });
        $('.range-line input').blur(function() {
            if (this.value == '') {
                this.value = parseInt($(this).parents('.range-line').find('.min-value').text().replace(/\s+/g,''));
            }
            $(this).separationInput();
        });
        
        //Кнопки +-
        $('.minus,.plus').click(function(){
            var slider = $(this).parents('.range-line').find('.range'),
                min = slider.slider( "option", "min" ),
                max = slider.slider( "option", "max" ),
                step = slider.slider( "option", "step" ),
                value = slider.slider( "value" );
            if( $(this).hasClass('minus') && ( value - step ) >= min ) value -= step;
            if( $(this).hasClass('plus') && ( value + step ) <= max ) value += step ;
            slider.slider( "value", value );
            $(this).parents('.range-line').find('input[type="text"]').val(value).separationInput();
            return false;
        });    
    };
    
    
    function getDate(days) {
        var term = new Date();
        term = addDays(term, days);
        var day_of_week = ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"];
        var month_of_year = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];
        var day_ = day_of_week[term.getDay()];
        var date_ = term.getDate();
        var month_ = month_of_year[term.getMonth()];
        var year_ = term.getYear() + 1900;
        $('#term > strong').html(date_);
        $('#term > div').html( month_ + ', ' + year_ + ' <br />' + day_ );
    }
    
    
    
//Конец калькулятора
    $.fn.separation = function(){
        var target = this.text();
        //this.attr('basicValue',target.match(/\d+/g)); //создаём атрибут специальный куда запишем начальное значение, для того что бы, можно было к нему обратится при необходимости
        var re = /(?=\B(?:\d{3})+(?!\d))/g;
        this.html(target.replace( re, ' ' ));
    };
    $.fn.separationInput = function(){
        var target = this.val();
        var re = /(?=\B(?:\d{3})+(?!\d))/g;
        this.val(target.replace( re, ' ' ));
    };
    
    //Аккордион
    $('.js-accordion_head').click(function(){
        var acc_head = $(this),
            acc_block = acc_head.parent(),
            acc_body = acc_block.children('.js-accordion_body');
        if( !acc_head.hasClass('active') ){
            acc_body.stop().slideDown(180, function(){
                acc_block.addClass('active');
                acc_head.addClass('active');
            });
        }else{
            acc_body.stop().slideUp(120, function(){
                acc_block.removeClass('active');
                acc_head.removeClass('active');
            });
        }
        return false;
    });
    
    //Вкладки
    $('.js-tabs_head a').click(function(){
        var tabs = $(this).parents('.js-tabs'),
            new_el = $(this),
            cur_el = tabs.find('.js-tabs_head a.active'),
            cur_tab = tabs.find('.js-tabs_body.active'),
            new_tab = tabs.find('.js-tabs_body' + new_el.attr('href'));
            
        if( !new_el.hasClass('active') ){
            cur_tab.hide();
            cur_tab.removeClass('active');
            cur_el.removeClass('active');
            new_tab.show();
            new_tab.addClass('active');
            new_el.addClass('active');
        }
        return false;
    });
    
    //Маска ввода телефона
    if( $('.phone-number').size() > 0 ){
        $('.phone-number').mask("+9(999)999-99-99");
    }
    if( $('.mobile-phone').size() > 0 ){
        $('.mobile-phone').mask("+9(999)999-99-99");
    }
        
    //Titles
    if ($('[title]').size() > 0) {
        $('[title]').tooltip({
            position: {
                my: "center bottom-20",
                at: "center top",
                using: function(position, feedback) {
                    $(this).css(position);
                    $("<div>")
                            .addClass("arrow")
                            .addClass(feedback.vertical)
                            .addClass(feedback.horizontal)
                            .appendTo(this);
                }
            },
            hide: {duration: 10}
        });
    }
    
    //Сброс ошибок
    $('.error').focus(function(){
        $(this).removeClass('error');
        $(this).parent().find('.standart-error').remove();
        if( $(this).parents('.input-wrapper.error').size() > 0 ) $(this).parents('.input-wrapper.error').removeClass('error');
    });
    
    //Заморозка слайдеров интервалов
    if( $('.calculate.freez').size() > 0 ){
            $( "#money .range, #period .range" ).slider( "option", "disabled", true );
        }
    
    //Select - Choosen
    if( $('.choosen').size() > 0 ){
        $(".choosen").chosen({disable_search_threshold: 5});
    }
    
    //Поле с календарем
    if ($('.datepicker').size() > 0) {
        $('.datepicker').datepicker({
            changeMonth: true,
            changeYear: true
        });
    }
    $('.datepicker-ico').click(function(){
        $(this).prev('.datepicker').focus();
        return false;
    });
    
});

$(window).load(function() {
    
    //Слайдер отзывов
    if( $('.reviews-slider').size() > 0 ){
       var people_block = $('.personage');
       $('.reviews-slider').carouFredSel({
            mousewheel: true,
            swipe: {
                onMouse: true,
                onTouch: true
            },
            items: {
                visible: 1
            },
            scroll: {
                items: 1,
                duration : 200,
                timeoutDuration : 5000,
                fx: 'crossfade',
                onBefore: function(data){
                    var people_img = data.items.visible.find('img.hidden').attr('src');
                    people_block.animate({'opacity': 0}, 150, function(){
                        people_block.css('backgroundImage', 'url('+ people_img +')');
                    });
                    people_block.animate({'opacity': 0}, 150, function(){
                        people_block.css('backgroundImage', 'url('+ people_img +')');
                    });
                },
                onAfter: function(data){
                    people_block.animate({'opacity': 1}, 200);
                    
                }
            },
            auto: false,
            prev: '#reviews .left',
            next: '#reviews .right'
        });
    }
    
    //Анимация при загрузке
    if ($('.start-animate').size() > 0) {
        var stop = 24000;
        var value1 = $("#money .range").slider('value'),
            scroll1 = $( "#money .range" );
        if ($('.attention').size() > 0)
            $('.attention').css({"display": "none"});
        var timer = setInterval(function() {
            if (value1 < stop) {
                value1 += 500;
                scroll1.slider("value", value1);
            } else if (value1 > stop) {
                value1 -= 500;
                scroll1.slider("value", value1);
            } else if (value1 == stop && stop == 24000) {
                stop = 6000;
                clearInterval(timer);
                setTimeout(function() {
                    var timer = setInterval(function() {
                        if (value1 < stop) {
                            value1 += 250;
                            scroll1.slider("value", value1);
                        } else if (value1 > stop) {
                            value1 -= 250;
                            scroll1.slider("value", value1);
                        } else if (value1 == stop && stop == 6000) {
                            stop = 10000;
                            clearInterval(timer);
                            setTimeout(function() {
                                var timer = setInterval(function() {
                                    if (value1 < stop) {
                                        value1 += 250;
                                        scroll1.slider("value", value1);
                                    } else if (value1 > stop) {
                                        value1 -= 250;
                                        scroll1.slider("value", value1);
                                    } else if (value1 == stop && stop == 10000) {
                                        if ($('.attention').size() > 0)
                                            $('.attention').css({"display": ""});
                                        clearInterval(timer);
                                    }
                                }, 10);
                            }, 250);
                        }
                    }, 10);
                }, 350);
            }
        }, 20);

        var stop2 = 23;
        var value2 = $("#period .range").slider('value'),
                scroll2 = $("#period .range");
        var timer2 = setInterval(function() {
            if (value2 < stop2) {
                value2++;
                scroll2.slider("value", value2);
            } else if (value2 > stop2) {
                value2--;
                scroll2.slider("value", value2);
            } else if (value2 == stop2 && stop2 == 23) {
                stop2 = 10;
                clearInterval(timer2);
                setTimeout(function() {
                    var timer2 = setInterval(function() {
                        if (value2 < stop2) {
                            value2++;
                            scroll2.slider("value", value2);
                        } else if (value2 > stop2) {
                            value2--;
                            scroll2.slider("value", value2);
                        } else if (value2 == stop2 && stop2 == 10) {
                            clearInterval(timer2);
                        }
                    }, 30);
                }, 100);
            }
        }, 30);
    }
    
    
    
    
});

var document_scroll;
function popUp(type, media){
    var popup = $('.popup#' + type),
        popup_body = popup.find('article');
    document_scroll = $(window).scrollTop();
    $('html,body').stop().animate( {'scrollTop':0 }, 200);
    if( type == 'video' ) {popup_body.find('iframe').replaceWith( '<iframe width="640" height="480" src="' + media + '" allowfullscreen="" frameborder="0"></iframe>' );}
    popup.css({
        'opacity': 0,
        'display': 'block'
    });
    var popup_height = popup.height();
    popup.css({
        'margin-top': -(popup_height/2)
    });
    
    if( type == 'deferral' ) Differal();
    
    $('.mask_popup').fadeIn(250);
    popup.animate({'opacity': 1}, 200).addClass('active');
    $(document).bind('click.myEvent', function(e) {
        if ($(e.target).closest(popup_body).length == 0) {
            closePopUp();
            $(document).unbind('click.myEvent');
        }
    });
    popupControlHeight();
    return false;
}
function closePopUp(){
    var popup = $('.popup.active');
    popupControlHeight_Clear();
    popup.removeClass('active').animate({'opacity': 0}, 200, function(){
        if( popup.attr('id') == 'video' ) popup.find('article').find('iframe').replaceWith( '<iframe></iframe>' );
        popup.css({
            'display': 'none'
        });
        $(document).unbind('click.myEvent');
    });
    $('.mask_popup').fadeOut(250);
    $('html,body').stop().animate( {'scrollTop': document_scroll }, 200);
    return false;
}
function changePopUp(type){
    var popup = $('.popup.active');
    popup.removeClass('active').animate({'opacity': 0}, 200, function(){
        popup.css({
            'display': 'none'
        });
        $(document).unbind('click.myEvent');
        popUp(type);
    });
    
    return false;
}

function popupControlHeight(){
    var popup = $('.popup.active'),
        window_height = $(window).height();
    if( popup.height() > window_height ){
        popup.addClass('popup-absolute');
        $('body > *:not(.mask_popup, .popup)').each(function(){
            var block = $(this);
            if( !(block.css('position') == 'absolute') && !(block.css('position') == 'fixed') ){
                var top = block.offset().top,
                    left = block.offset().left;
                block.css({'top':top, 'left':left});
                setTimeout(function(){ block.addClass('fixed-block'); }, 250);
            }
        });
    }else if( popup.hasClass('popup-absolute') ){
        popupControlHeight_Clear();
    }
}
function popupControlHeight_Clear(){
    var popup = $('.popup.active');
    popup.removeClass('popup-absolute');
    $('body > *.fixed-block').each(function() {
        var block = $(this);
        block.css({'top': '', 'left': ''});
        block.removeClass('fixed-block');
    });
}

jQuery(function ($) {
    $('.popup-open').bind('click', function(){
        var type = $(this).attr('name');
        if( type=='video' ){
            var video_link = $(this).attr('href');
            popUp(type, video_link);
        }else{
            popUp(type);   
        }
        return false;
    });
    $('.close-popup, .popup .close').bind('click', function(){
        closePopUp();
        return false;
    });
    $('.popup-change').bind('click', function(){
        var type = $(this).attr('name');
        changePopUp(type);
        return false;
    });
    
    $(window).resize(function() {
        if( $('.popup.active').size() > 0 ) popupControlHeight();
    }).resize();
    
});


function Differal(){
    var credit_percent = 3;
    var plus_summ;
        $( "#deferral-period .deferral_range" ).slider({
            range: "min",
            min: 5,
            max: 30,
            value: 12,
            step: 1,
            slide: function(e, ui) {
                var deferral = ui.value;
                $(ui.handle).parents('.deferral-line').find('.value span').html(deferral).separation();
                $(ui.handle).parents('.deferral-line').find('input[type="text"]').val(deferral).separationInput();
                
                var dot = $(ui.handle).parents('.deferral-line').find('.value');
                setTimeout(function(){
                    dot.css({'left': $(ui.handle).position().left });
                }, 20);
                
                //Передача значения в форму калькулятора
                plus_summ = ui.value*credit_percent*100;
                $('#new-summ strong').text( plus_summ ).separation();
                $('#end-summ strong').text( plus_summ + 3490 ).separation();
                delayDay( ui.value );
                
            },
            change: function(e, ui) {
                var deferral = ui.value;
                $(ui.handle).parents('.deferral-line').find('.value span').html(deferral).separation();
                var dot = $(ui.handle).parents('.deferral-line').find('.value');
                dot.css({'left': $(ui.handle).css('left') });
                
                //Передача значения в форму калькулятора
                plus_summ = ui.value*credit_percent*100;
                $('#new-summ strong').text( plus_summ ).separation();
                $('#end-summ strong').text( plus_summ + 3490 ).separation();
                delayDay( ui.value );
            }
        });
        
        $('.deferral-line .value span').each(function(){
            $(this).text( $(this).parents('.deferral-line').find('.deferral_range').slider( "value" ) );
            $(this).parent().css({'left': $(this).parents('.deferral-line').find('.ui-slider-handle').css('left') });
        });
        
        //Проверка ввода только цифр
        $('.deferral-line input').bind("change keyup input click", function() {
            if (this.value.match(/[^0-9]/g)) {
                this.value = this.value.replace(/[^0-9]/g, '');
            }
        });
        //Ограничение максимумом и минимумом
        $('.deferral-line input').bind("change blur", function() {
            var max_val = parseInt($(this).parents('.deferral-line').find('.max-value').text().replace(/\s+/g,'')),
                min_val = parseInt($(this).parents('.deferral-line').find('.min-value').text().replace(/\s+/g,'')),
                val = $(this).val().replace( ' ', ' ' );
            if (val == '') val = 0;
            val = parseInt(val.replace(/\s+/g,''));
            if (val > max_val) val = max_val;
            if (val < min_val) val = min_val;
            $(this).val(val).separationInput();
            $(this).parents('.deferral-line').find('.deferral_range').slider( "value", val );
            $(this).separationInput();
        });
        $('.deferral-line input').blur(function() {
            if (this.value == '') {
                this.value = parseInt($(this).parents('.deferral-line').find('.min-value').text().replace(/\s+/g,''));
            }
            $(this).separationInput();
        });
        
        //Кнопки +-
        $('.minus_deferral,.plus_deferral').click(function(){
            var slider = $(this).parents('.deferral-line').find('.deferral_range'),
                min = slider.slider( "option", "min" ),
                max = slider.slider( "option", "max" ),
                step = slider.slider( "option", "step" ),
                value = slider.slider( "value" );
            if( $(this).hasClass('minus_deferral') && ( value - step ) >= min ) value -= step;
            if( $(this).hasClass('plus_deferral') && ( value + step ) <= max ) value += step ;
            slider.slider( "value", value );
            $(this).parents('.deferral-line').find('input[type="text"]').val(value).separationInput();
            return false;
        });    
        
        function delayDay(days) {
        var term = new Date();
        term = addDays(term, days);
        var day_of_week = ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"];
        var month_of_year = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];
        var day_ = day_of_week[term.getDay()];
        var date_ = term.getDate();
        var month_ = month_of_year[term.getMonth()];
        var year_ = term.getYear() + 1900;
        $('#new-date > strong').html(date_);
        $('#new-date > div').html( month_ + ', ' + year_ + ' <br />' + day_ );
    }
    
    
}

function addDays(date, n) {
        // может отличаться на час, если произошло событие перевода времени
        var d = new Date();
        d.setTime(date.getTime() + n * 24 * 60 * 60 * 1000);
        return d;
    }

jQuery(function($){
    if( $( ".datepicker" ).size()>0 ){
	$.datepicker.regional['ru'] = {
		closeText: 'Закрыть',
		prevText: '&#x3C;Пред',
		nextText: 'След&#x3E;',
		currentText: 'Сегодня',
		monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь',
		'Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
		monthNamesShort: ['Янв','Фев','Мар','Апр','Май','Июн',
		'Июл','Авг','Сен','Окт','Ноя','Дек'],
		dayNames: ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'],
		dayNamesShort: ['вск','пнд','втр','срд','чтв','птн','сбт'],
		dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
		weekHeader: 'Нед',
		dateFormat: 'dd.mm.yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['ru']);
    }
});