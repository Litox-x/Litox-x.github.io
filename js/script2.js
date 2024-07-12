var input_type = 'from';
var myMap, myPlacemark, coords;

var hashes = new Array();
//hashes['услуги'] = 'services';

hashes['услуги'] = 'serv1';
hashes['цены'] = 'prices';
hashes['автопарк'] = 'autopark';
hashes['отзывы'] = 'reviews';
hashes['калькулятор'] = 'calculation';


$(document).ready(function() {

    $(".tarifs-new-wrapper .tabs .tab").click(function() {
        var target = "." + $(this).data('target');
        if ($(target).length) {
            $(".tarifs-new-wrapper .tabs .tab").removeClass('active');
            $(".tarifs-new-wrapper .items .item").removeClass('active');
            $(this).addClass('active');
            $(target).addClass('active');
        }
    });
    $('#calculation .gruzchik_count .gruz a').on('click', function() {
        var nn = '';
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
        } else {
            $('#calculation .gruzchik_count .gruz a.active').removeClass('active');
            $(this).addClass('active');
            nn = $(this).attr('href') - 0;
        }
        $('#calculation .gruzchik_count .gruz input').val(nn);
        return false
    });

    $('#calculation .input2 .on_map').on('click', function() {
        input_type = $(this).attr('name');
        $('#map_block .name').text($(this).attr('title'));
        open_popup('#map_block');
    });



    if ($('#stoimost_perevozki_form').length) {
        $('#stoimost_perevozki .red_button button').on('click', function() {
            $('#stoimost_perevozki_form').submit();
            //$('#stoimost_perevozki_form2').submit();	
        });

        $("#stoimost_perevozki_form").trigger('reset');
        $('#stoimost_perevozki_form input[name="tel"]').mask("+7 (999) 999-99-99");
        $('#stoimost_perevozki_form input[name="tel"]').keypress(function(event) {
            if (event.which == 13 || (event.ctrlKey && event.which == 13)) { $(this).blur();
                check_validate('#stoimost_perevozki_form input[name="tel"]'); }
        });
        $("#stoimost_perevozki_form").validate({
            rules: {

                tel: {
                    required: true
                }
            },
            messages: {

                tel: {
                    required: 'Введите телефон'
                }
            },
            submitHandler: function(form) {
                if ($('#stoimost_perevozki_form input[name="bot_check"]').length < 1) {
                    $("#stoimost_perevozki_form").append('<input type="hidden" name="bot_check" value="ok">');
                }
                $.post("ajax.php?type=letter", $("#stoimost_perevozki_form").serialize(), function(data) {});
                close_popups();
                open_popup('#services_sucess2');
                $('#stoimost_perevozki_form').trigger('reset');
                //$('#stoimost_perevozki_form2').trigger('reset'); 
                $('#calculation_form').trigger('reset');
                $('#calculation .links_list li.active a').click();
            }
        });
    }

    /*
    	if ($('#stoimost_perevozki_form2').length){
    	 $("#stoimost_perevozki_form2").trigger('reset');
    	$('#stoimost_perevozki_form2 input[name="tel"]').mask("+7 (999) 999-99-99");
    		 $('#stoimost_perevozki_form2 input[name="tel"]').keypress(function(event){
    				if(event.which==13||(event.ctrlKey && event.which==13)){ $(this).blur(); check_validate('#stoimost_perevozki_form2 input[name="tel"]');  }											
    															 });
    			  $("#stoimost_perevozki_form2").validate({
           rules:{ 
    			
    			tel:{
                    required: true
    				}	
           },
           messages:{
    			
    			tel:{
                    required: 'Введите телефон'
                }
           },
             submitHandler: function(form) {
    			 if ($('#stoimost_perevozki_form2 input[name="bot_check"]').length<1){
    				$("#stoimost_perevozki_form2").append('<input type="hidden" name="bot_check" value="ok">');
    			 }
    			 $.post("ajax.php?type=letter", $("#stoimost_perevozki_form2").serialize(), function(data) {  });
    		close_popups();
    		open_popup('#services_sucess');
    		$('#stoimost_perevozki_form').trigger('reset'); 
    		$('#stoimost_perevozki_form2').trigger('reset'); 
    		$('#calculation_form').trigger('reset');
    			 }
        });
    						   }	
      */
    if ($(".autopark-carousel").length) {
        $(".autopark-carousel").owlCarousel({
            singleItem: true,
            navigation: true,
            navigationText: false
        });
    }
    if ($(".autopark-carousel2").length) {
        $(".autopark-carousel2").owlCarousel({
            singleItem: true,
            navigation: true,
            navigationText: false,
            afterMove: function() {
                var nn = $('#calculation .tabs_content .tab_block.active .owl-page').index($('#calculation .tabs_content .tab_block.active .owl-page.active'));
                $('#calculation_form input[name="srok_arendi"]').val($('#calculation .tabs_content .tab_block.active .item:eq(' + nn + ') input[name="min_vremia_mkad"]').val());
                $('#calculation_form input[name="srok_arendi"]').attr('values', $('#calculation .tabs_content .tab_block.active .item:eq(' + nn + ') input[name="min_vremia_mkad"]').val());
                $('#calculation  .minus').click().hide();
            }
        });
    }

    $('#calculation .links_list li a').on('click', function() {

        $('#calculation .links_list li.active').removeClass('active');
        $(this.parentNode).addClass('active');
        var hr = $(this).attr('href');
        $('#calculation .tab_block').hide().removeClass('active');
        $(hr).show().addClass('active');

        var nn = $('#calculation .tabs_content .tab_block.active .owl-page').index($('#calculation .tabs_content .tab_block.active .owl-page.active'));
        $('#calculation_form input[name="srok_arendi"]').val($('#calculation .tabs_content .tab_block.active .item:eq(' + nn + ') input[name="min_vremia_mkad"]').val());
        $('#calculation_form input[name="srok_arendi"]').attr('values', $('#calculation .tabs_content .tab_block.active .item:eq(' + nn + ') input[name="min_vremia_mkad"]').val());
        $('#calculation  .minus').click().hide();

        return false;
    });


    if ($('#calculation_form').length) {

        $(window).load(function() {
            $('#calculation .links_list li.active a').click();
        });
        $("#calculation_form").trigger('reset');
        $("#calculation_form").validate({
            rules: {

                from: {
                    required: true
                },
                where: {
                    required: true
                }
            },
            messages: {

                from: {
                    required: 'Введите откуда перевезти'
                },
                where: {
                    required: 'Введите куда перевезти'
                }
            },
            submitHandler: function(form) {
                var nn = $('#calculation .tabs_content .tab_block.active .owl-page').index($('#calculation .tabs_content .tab_block.active .owl-page.active'));
                //$('#calculation_form input[name="car_type"]').val();
                //$('#calculation_form input[name="car_price"]').val();
                var st_gruzchik = $('#calculation_form input[name="count_gruzchiki"]').val() - 0;
                var st_a = $('#calculation .tabs_content .tab_block.active .item:eq(' + nn + ') input[name="price"]').val() - 0;
                var st_b = $('#calculation_form input[name="srok_arendi"]').val() - 0;
                var st_c = $('#calculation .tabs_content .tab_block.active .item:eq(' + nn + ') input[name="min_vremia_mkad"]').val() - 0;
                var st_d = $('#calculation .tabs_content .tab_block.active .item:eq(' + nn + ') input[name="dop_chas"]').val() - 0;

                if (st_b > st_c) {
                    var st_S = st_a + (st_b - st_c) * st_d;
                } else {
                    var st_S = st_a;
                }

                if (st_b <= 4) {
                    var st_G = st_gruzchik * 960;
                } else {
                    var st_G = st_b * 240 * st_gruzchik;
                }
                st_S = st_S + st_G;

                $('#stoimost_perevozki .price .num').text(st_S);

                var st_G = st_d + 240 * st_gruzchik;

                $('#stoimost_perevozki .dop_price .num').text(st_G);

                $('#stoimost_perevozki_form2 input[name="from"], #stoimost_perevozki_form input[name="from"]').val($('#calculation_form input[name="from"]').val());
                $('#stoimost_perevozki_form2 input[name="where"], #stoimost_perevozki_form input[name="where"]').val($('#calculation_form input[name="where"]:visible').val());
                $('#stoimost_perevozki_form2 input[name="price"], #stoimost_perevozki_form input[name="price"]').val(st_S);
                $('#stoimost_perevozki_form2 input[name="dop_chas"], #stoimost_perevozki_form input[name="dop_chas"]').val(st_G);
                $('#stoimost_perevozki_form2 input[name="car"], #stoimost_perevozki_form input[name="car"]').val($('#calculation .tabs_content .tab_block.active .item:eq(' + nn + ') input[name="car"]').val());
                $('#stoimost_perevozki_form2 input[name="count_gruzchiki"], #stoimost_perevozki_form input[name="count_gruzchiki"]').val(st_gruzchik);
                $('#stoimost_perevozki_form2 input[name="srok_arendi"], #stoimost_perevozki_form input[name="srok_arendi"]').val(st_b);

                if (st_gruzchik == 1) {
                    $('#gruzchiki_s').text('+ ' + st_gruzchik + ' грузчик');
                } else if (st_gruzchik > 1 && st_gruzchik < 5) {
                    $('#gruzchiki_s').text('+ ' + st_gruzchik + ' грузчика');
                } else if (st_gruzchik > 4) {
                    $('#gruzchiki_s').text('+ ' + st_gruzchik + ' грузчиков');
                } else {
                    $('#gruzchiki_s').text('');
                }
                st_b1 = st_b + '';
                var st_b_konec = st_b1.split('');

                if (st_b - 0 > 9 && st_b - 0 < 21) {
                    $('#chasi_s').text(st_b + ' часов');
                } else if (st_b_konec[st_b_konec.length - 1] > 4) {
                    $('#chasi_s').text(st_b + ' часов');
                } else if (st_b_konec[st_b_konec.length - 1] > 1 && st_b_konec[st_b_konec.length - 1] < 5) {
                    $('#chasi_s').text(st_b + ' часа');
                } else {
                    $('#chasi_s').text(st_b + ' час');
                }


                //  

                open_popup('#stoimost_perevozki');
            }
        });
    }




    var srok_arendi_num = 1;
    $('#calculation  .minus, #calculation  .plus').on('click', function() {

        if ($(this).hasClass('minus')) {
            $('#calculation  .plus').show();
            srok_arendi_num = $('#srok_arendi').val() - 0 - 1;

            if (srok_arendi_num <= ($('#srok_arendi').attr('values') - 0)) {
                $('#calculation  .minus').hide();
            }

            if (srok_arendi_num < ($('#srok_arendi').attr('values') - 0)) {
                srok_arendi_num = ($('#srok_arendi').attr('values') - 0);

            }
            $('#srok_arendi').val(srok_arendi_num);
        } else {
            $('#calculation  .minus').show();
            srok_arendi_num = $('#srok_arendi').val() - 0 + 1;
            $('#srok_arendi').val(srok_arendi_num);
        }
        if (srok_arendi_num >= 24) {
            $('#calculation  .plus').hide();
        }

        if (srok_arendi_num > 1 && srok_arendi_num < 10) {
            $('#calculation  .input3 .txt').removeClass('marg2').addClass('marg1');
        } else if (srok_arendi_num > 9) {
            $('#calculation  .input3 .txt').removeClass('marg1').addClass('marg2');
        } else {
            $('#calculation  .input3 .txt').removeClass('marg1').removeClass('marg2');
        }

        st_b1 = $('#srok_arendi').val() + '';
        var st_b_konec = st_b1.split('');

        if ($('#srok_arendi').val() - 0 > 9 && $('#srok_arendi').val() - 0 < 21) {
            $('#calculation  .input3 .txt').text('часов');
        } else if (st_b_konec[st_b_konec.length - 1] > 4) {
            $('#calculation  .input3 .txt').text('часов');
        } else if (st_b_konec[st_b_konec.length - 1] > 1 && st_b_konec[st_b_konec.length - 1] < 5) {
            $('#calculation  .input3 .txt').text('часа');
        } else {
            $('#calculation  .input3 .txt').text('час');
        }

    });




    if ($('#videoB').length) {
        if (device.iphone() == true) {
            $('#videoB').html('<video width="660" height="412" controls="controls" poster="/video/preview.jpg"><source src="/video/video.mp4" type=\'video/mp4; codecs="avc1.42E01E, mp4a.40.2"\'>Тег video не поддерживается вашим браузером.</video>');
        }

    }

    function slide_link() {
        var hash = decodeURI(window.location.hash).replace('#', '');
        if (hashes[hash]) {
            var id = hashes[hash];
            $('html, body').animate({ scrollTop: $('#' + id).offset().top + 20 });
        }
    }
    $(window).bind('hashchange', function() {
        slide_link();
    });
    if (window.location.hash != '') {
        slide_link();
    }
    $('#header .menu li a').on('click', function() {

        if (decodeURI(window.location.hash) == $(this).attr('href')) {
            slide_link();
        }
    });

    if (device.mobile() == true || device.tablet() == true) {
        $('body').addClass('mobile_version');
    }
    $(window).resize(function() {
        if ($('#cuselBox:visible').length > 0 && $('.cusel.cuselOpen').length > 0) {
            $('#cuselBox:visible').css({ 'left': $('.cusel.cuselOpen').offset().left });
        }
    });
    if ($('.lineForm').length) {
        if (device.mobile() == true || device.tablet() == true) {
            $('.lineForm').each(function() {
                $(this).html('<div class="cusel">' + $(this).html() + '</div>');
                $(this).addClass('mobile').find('.cusel').prepend('<div class="cuselFrameRight"></div><div class="cuselText"></val>');
            });
            $('.cusel select').on('change', function() {
                var res = $(this).find('option:selected').text();
                $(this.parentNode).find('.cuselText').html(res);
            });
            $('.cusel select').on('keyup', function() {
                $(this).change();
            });
            $('.cusel select').each(function() {
                $(this).change();
            });
        } else {
            var params = {
                changedEl: ".lineForm select",
                visRows: 10,
                scrollArrows: true
            };
            cuSel(params);
            $(".cusel").on("click", function(b) {
                var cvv = $(this).parent().attr('class').replace('lineForm', '');
                $("#cuselBox").attr('class', cvv);
            });

        }
    }
    if ($('.input_file').length) {
        $('.input_file input').on('change', function() {
            var vv = this.value.split("\\");
            vv = vv[vv.length - 1];
            $(this).parents('.input_file').find('.val').text(vv);
            $(this).blur();

        });
    }
    if ($('.change_checkbox').length) {
        enable_radios_checkboxes();
    }
    if ($.browser.msie && $.browser.version < 9) {
        $('input[placeholder],textarea[placeholder]').each(function() {
            var inp = this;
            $(inp).val($(inp).attr('placeholder'));
        });
        $('input[placeholder],textarea').on('blur', function() {
            if (this.value == '') { this.value = $(this).attr('placeholder'); }
        });
        $('input[placeholder],textarea').on('focus', function() {
            if (this.value == $(this).attr('placeholder')) { this.value = ''; }
        });
    }

    $('#top_action .close').on('click', function() {
        $('#top_action').animate({ 'height': 'hide' });
    });
    $('#autopark .links_list li a').on('click', function() {
        $('#autopark .links_list li.active').removeClass('active');
        $(this.parentNode).addClass('active');
        var hr = $(this).attr('href');
        $('#autopark .tab_block').hide().removeClass('active');
        $(hr).show().addClass('active');
        return false;
    });


    if ($('#spec_sentence_form').length) {

        $('#spec_sentence_form input[name="tel"]').mask("+7 (999) 999-99-99");
        $('#spec_sentence_form input[name="tel"]').keypress(function(event) {
            if (event.which == 13 || (event.ctrlKey && event.which == 13)) { $(this).blur();
                check_validate('#spec_sentence_form input[name="tel"]'); }
        });
        $("#spec_sentence_form").validate({
            rules: {

                name: {
                    required: true
                },
                tel: {
                    required: true
                }
            },
            messages: {

                name: {
                    required: 'Введите имя'
                },
                tel: {
                    required: 'Введите телефон'
                }
            },
            submitHandler: function(form) {
                if ($('#spec_sentence_form input[name="bot_check"]').length < 1) {
                    $("#spec_sentence_form").append('<input type="hidden" name="bot_check" value="ok">');
                }

                $.post("ajax.php?type=letter", $("#spec_sentence_form").serialize(), function(data) {});
                close_popups();

                open_popup('#spec_sentence_sucess');
                setTimeout(function() {
                    $('#spec_sentence_form').trigger('reset');


                }, 200);
            }
        });
    }
    if ($('#order_gazel_form').length) {
        $('#order_gazel_form input[name="tel"]').mask("+7 (999) 999-99-99");
        $('#order_gazel_form input[name="tel"]').keypress(function(event) {
            if (event.which == 13 || (event.ctrlKey && event.which == 13)) { $(this).blur();
                check_validate('#order_gazel_form input[name="tel"]'); }
        });
        $("#order_gazel_form").validate({
            rules: {

                name: {
                    required: true
                },
                tel: {
                    required: true
                }
            },
            messages: {

                name: {
                    required: 'Введите имя'
                },
                tel: {
                    required: 'Введите телефон'
                }
            },
            submitHandler: function(form) {
                if ($('#order_gazel_form input[name="bot_check"]').length < 1) {
                    $("#order_gazel_form").append('<input type="hidden" name="bot_check" value="ok">');
                }

                $.post("ajax.php?type=letter", $("#order_gazel_form").serialize(), function(data) {});
                close_popups();
                var txt = $('#order_gazel_form input[name="for_what"]:checked').val();
                $('#order_gazel_sucess .heading .head_text').text(txt);
                open_popup('#order_gazel_sucess');
                setTimeout(function() {
                    $('#order_gazel_form').trigger('reset');

                    disable_radios_checkboxes();
                    enable_radios_checkboxes();
                }, 300);
            }
        });
    }
    if ($('#order_popup_form').length) {

        $('#order_popup_form input[name="tel"]').mask("+7 (999) 999-99-99");

        $('#order_popup_form input[name="count_gruzchiki"]').mask("9?9");


        $('#order_popup_form input[name="tel"]').keypress(function(event) {
            if (event.which == 13 || (event.ctrlKey && event.which == 13)) { $(this).blur();
                check_validate('#order_popup_form input[name="tel"]'); }
        });
        $("#order_popup_form").validate({
            rules: {

                from: {
                    required: true
                },
                tel: {
                    required: true
                },
                where: {
                    required: true
                }
            },
            messages: {

                from: {
                    required: 'Введите откуда перевезти'
                },
                where: {
                    required: 'Введите куда перевезти'
                },
                tel: {
                    required: 'Введите телефон'
                }
            },
            submitHandler: function(form) {
                if ($('#order_popup_form input[name="bot_check"]').length < 1) {
                    $("#order_popup_form").append('<input type="hidden" name="bot_check" value="ok">');
                }

                $.post("ajax.php", $("#order_popup_form").serialize(), function(data) {});
                close_popups();
                open_popup('#order_popup_sucess');
                setTimeout(function() {
                    $('#order_popup_form').trigger('reset');
                    gorod();

                }, 200);
            }
        });
    }


    if ($('#onTop_bg').length) {
        $(window).scroll(function() {
            var top = self.pageYOffset || (document.documentElement && document.documentElement.scrollTop) || (document.body && document.body.scrollTop);
            var foot_top = $('#footer').offset().top - $(window).height();
            if (top > 300) { $('#onTop_bg').show(); } else { $('#onTop_bg').hide(); }
            /*
            			if (top>300 && top<foot_top) {$('#onTop_bg').show().removeClass('bott');}
            			else if (top>300 && top>=foot_top)	{$('#onTop_bg').show().addClass('bott');}
            			else {$('#onTop_bg').hide().removeClass('bott');}
            			*/
        });
        $('#onTop').on('click', function() {
            $('html, body').animate({ scrollTop: "0px" });
            return false;
        });
        $(window).scroll();
    }

    if ($('#loaders_work_form').length) {
        $('#loaders_work_form button[type="submit"]').removeAttr('disabled');
        $('#loaders_work_form input[name="tel"]').mask("+7 (999) 999-99-99");
        $('#loaders_work_form input[name="tel"]').keypress(function(event) {
            if (event.which == 13 || (event.ctrlKey && event.which == 13)) { $(this).blur();
                check_validate('#loaders_work_form input[name="tel"]'); }
        });
        $("#loaders_work_form").validate({
            rules: {

                name: {
                    required: true
                },
                tel: {
                    required: true
                }
            },
            messages: {

                name: {
                    required: 'Введите имя'
                },
                tel: {
                    required: 'Введите телефон'
                }
            },
            submitHandler: function(form) {
                if ($('#loaders_work_form input[name="bot_check"]').length < 1) {
                    $("#loaders_work_form").append('<input type="hidden" name="bot_check" value="ok">');
                }
                /*
	$('#loaders_work_form button[type="submit"]').text('').attr({'disabled':true});
	$('#cost_on_loaders_work .right .red_button .loader').show();
	*/

                $.post("ajax.php?type=letter", $("#loaders_work_form").serialize(), function(data) {});

                close_popups();
                open_popup('#loaders_work_sucess');

                setTimeout(function() {
                    $('#loaders_work_form').trigger('reset');

                }, 300);
            }
        });
    }

    if ($('#cupon_discount_form').length) {

        $("#cupon_discount_form").validate({
            rules: {
                mail: {
                    required: true,
                    email: true
                }
            },
            messages: {
                mail: {
                    required: 'Введите E-mail',
                    email: 'Введите корректный E-mail'
                }
            },
            submitHandler: function(form) {
                if ($('#cupon_discount_form input[name="bot_check"]').length < 1) {
                    $("#cupon_discount_form").append('<input type="hidden" name="bot_check" value="ok">');
                }


                $.post("ajax.php?type=letter", $("#cupon_discount_form").serialize(), function(data) {});
                close_popups();
                open_popup('#cupon_discount_sucess');
                setTimeout(function() {
                    $('#cupon_discount_form').trigger('reset');

                }, 300);
            }
        });
    }

    if ($('#free_evaluation_form').length) {

        $('#free_evaluation_form input[name="tel"]').mask("+7 (999) 999-99-99");
        $('#free_evaluation_form input[name="tel"]').keypress(function(event) {
            if (event.which == 13 || (event.ctrlKey && event.which == 13)) { $(this).blur();
                check_validate('#free_evaluation_form input[name="tel"]'); }
        });
        $("#free_evaluation_form").validate({
            rules: {
                tel: {
                    required: true
                }
            },
            messages: {
                tel: {
                    required: 'Введите телефон'
                }
            },
            submitHandler: function(form) {
                if ($('#free_evaluation_form input[name="bot_check"]').length < 1) {
                    $("#free_evaluation_form").append('<input type="hidden" name="bot_check" value="ok">');
                }

                $.post("ajax.php?type=letter", $("#free_evaluation_form").serialize(), function(data) {});

                close_popups();
                open_popup('#free_evaluation_sucess');

                setTimeout(function() {
                    $('#free_evaluation_form').trigger('reset');

                }, 200);
            }
        });
    }

    if ($('#tarif_form').length) {

        $('#tarif_form input[name="tel"]').mask("+7 (999) 999-99-99");
        $('#tarif_form input[name="tel"]').keypress(function(event) {
            if (event.which == 13 || (event.ctrlKey && event.which == 13)) { $(this).blur();
                check_validate('#tarif_form input[name="tel"]'); }
        });
        $("#tarif_form").validate({
            rules: {
                tel: {
                    required: true
                },
                name: {
                    required: true
                }
            },
            messages: {
                tel: {
                    required: 'Введите телефон'
                },
                name: {
                    required: 'Введите имя'
                }
            },
            submitHandler: function(form) {
                if ($('#tarif_form input[name="bot_check"]').length < 1) {
                    $("#tarif_form").append('<input type="hidden" name="bot_check" value="ok">');
                }

                var evant = $('#tarif_form input[name="evant"]').val();



                $.post("ajax.php?type=letter", $("#tarif_form").serialize(), function(data) {});

                close_popups();
                open_popup('#tarif_popup_sucess');

                setTimeout(function() {
                    $('#tarif_form').trigger('reset');

                }, 200);
            }
        });
    }
    if ($('#services_form').length) {

        $('#services_form input[name="tel"]').mask("+7 (999) 999-99-99");
        $('#services_form input[name="tel"]').keypress(function(event) {
            if (event.which == 13 || (event.ctrlKey && event.which == 13)) { $(this).blur();
                check_validate('#services_form input[name="tel"]'); }
        });
        $("#services_form").validate({
            rules: {
                tel: {
                    required: true
                },
                name: {
                    required: true
                }
            },
            messages: {
                tel: {
                    required: 'Введите телефон'
                },
                name: {
                    required: 'Введите имя'
                }
            },
            submitHandler: function(form) {
                if ($('#services_form input[name="bot_check"]').length < 1) {
                    $("#services_form").append('<input type="hidden" name="bot_check" value="ok">');
                }

                var evant = $('#services_form input[name="evant"]').val();
                $.post("ajax.php?type=letter", $("#services_form").serialize(), function(data) {});

                close_popups();
                open_popup('#services_sucess');

                setTimeout(function() {
                    $('#services_form').trigger('reset');

                }, 200);
            }
        });
    }


    if ($('#date_slider').length) {

        /*
		setTimeout(function(){
			$('#date_slider .jcarousel-pagination a').eq(1).click();					
							});
var date = new Date();
		var monthes = new Array('января','фераля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря');
	$('#today_day .month').text(monthes[date.getMonth()]);	
    $('#today_day .day').text(date.getDate());
	*/
    }


    if ($('#want_evaluation').length) {
        if ($.cookie("discount_window") && $.cookie("discount_window") == 2) { var do_nothing; } else {
            $('#want_evaluation').show();
        }
        $('#want_evaluation .close, #want_evaluation .block').on('click', function() {
            $('#want_evaluation').remove();
            $.cookie('discount_window', 2, { expires: 360, path: '/' });
        });
    }

    if ($('#cheepy_not_exist').length) {
        if ($.cookie("discount_window2") && $.cookie("discount_window2") == 2) { var do_nothing; } else {
            $('#cheepy_not_exist').show();
        }
        $('#cheepy_not_exist').on('click', function() {
            $('#cheepy_not_exist').remove();
            $.cookie('discount_window2', 2, { expires: 360, path: '/' });
        });
    }

    $('#order_popup dl dd .button').on('click', function() {
        input_type = $(this).attr('name');
        $('#YMapsID .ymaps-content-icon').click();
    });
    if ($('#YMapsID').length > 0) {
        ymaps.ready(init);

        $('#calculation .input2 .on_map').on('click', function() {
            myMap.container.fitToViewport();
        });

    }
    gorod();
    $('.popup_block').hide();
    $(window).load(function() {

    });
    if (device.mobile() == true || device.tablet() == true) {
        window.addEventListener("orientationchange", function() {
            if ($('.popup_block:visible').length) {
                setTimeout(function() {
                    $('html, body').animate({ scrollTop: $('.popup_block:visible').offset().top + 50 });
                }, 200);
            }
        })
    }

});
/*$(document).ready(function() end*/


function enable_radios_checkboxes() {
    $('.change_checkbox').addClass('hide_inp');
    $('.change_checkbox').each(function() {
        var span = document.createElement("span");
        span.className = 'ch_box';
        $(this).prepend(span);
        if ($(this).find('input[type="checkbox"]').attr('checked') == true || $(this).find('input[type="checkbox"]').attr('checked') == 'checked') {
            $(this).addClass('check');
        } else {
            $(span).removeClass('check');
        }
        if ($(this).find('input[type="radio"]').attr('checked') == true || $(this).find('input[type="radio"]').attr('checked') == 'checked') {
            $(this).addClass('check');
        } else {
            $(span).removeClass('check');
        }
    });
    $('.change_checkbox input[type="checkbox"]').bind('click', function() {
        check_checkboxes(this);
    });
    $('.change_checkbox input[type="radio"]').bind('click', function() {
        check_radiobuttons(this);
    });
}

function disable_radios_checkboxes() {
    $('.change_checkbox').each(function() {
        $(this).removeClass('hide_inp').removeClass('check').find('span.ch_box').remove();
        $(this).find('input').unbind('click');
    });
}

function check_checkboxes(n) {
    if ($(n).attr('checked') == true || $(n).attr('checked') == 'checked') {
        $(n.parentNode).addClass('check');
    } else {
        $(n.parentNode).removeClass('check');
    }
}

function check_radiobuttons(n) {
    var name1 = $(n).attr('name');
    $('.change_checkbox input[name="' + name1 + '"]').each(function() {
        if ($(this).attr('checked') == true || $(this).attr('checked') == 'checked') {
            $(this).parents('.change_checkbox').addClass('check');
        } else {
            $(this).parents('.change_checkbox').removeClass('check');
        }
    })

}

function close_popups() {
    $('.popup_block,#popup_bg').css({ 'display': 'none' });
}

function open_popup(div) {
    var top = self.pageYOffset || (document.documentElement && document.documentElement.scrollTop) || (document.body && document.body.scrollTop);
    $('#popup_bg').show();
    $(div).css({ 'display': 'block', 'visibility': 'visible', 'left': '50%' });
    var hh = ($(div).css('paddingTop').replace('px', '') - 0) + ($(div).css('paddingBottom').replace('px', '') - 0) + $(div).height();

    if (device.mobile() == true) {
        Bheight = 45;
    } else {
        var Bheight = ($(window).height() - hh) / 2;
        if (Bheight < 20) { Bheight = 40; }
    }

    topPos = top + Bheight;


    $(div).css({ 'top': topPos, 'bottom': 'auto' });


    $('.popup_block .close, #popup_bg').on('click', function() {
        $('.popup_block,#popup_bg').css({ 'display': 'none' });
    });

}

function cat_item_jcarousel(sped, id, wra, autoplay) {
    var jcarousel = $(id).find('.jcarousel');
    $(jcarousel).find('.item').each(function(i) {
        $(this).attr('val', i + 1);
    });
    if (id == '#date_slider') {
        var how = true;
        wra = null;
    } else {
        var how = false;
    }
    jcarousel
        .jcarousel({
            wrap: wra,
            vartical: how,
            animation: {
                duration: sped,
                complete: function() {
                    if (id == '#date_slider') {
                        var indx = $(id).find('.jcarousel-pagination a.active').text() - 0 - 1;
                        $(jcarousel).find('li').eq(indx).find('input[type="radio"]').click();
                        $('#free_evaluation_popup  .people .dogovors').hide();
                        $('#dogovors_' + indx).show();
                    }
                }
            }
        });

    $(id).find('.jcarousel-control-prev')
        .jcarouselControl({
            target: '-=1'
        });

    $(id).find('.jcarousel-control-next')
        .jcarouselControl({
            target: '+=1'
        });
    $(id).find('.jcarousel-pagination')
        .on('jcarouselpagination:active', 'a', function() {
            $(this).addClass('active');
            var indx = $(this).text() - 0;

            $(jcarousel).find('.item.active').removeClass('active');
            $(jcarousel).find('.item[val="' + indx + '"]').addClass('active');

        })
        .on('jcarouselpagination:inactive', 'a', function() {
            $(this).removeClass('active');

        })
        .on('click', function(e) {
            e.preventDefault();
        })
        .jcarouselPagination({
            perPage: 1,
            item: function(page) {
                return '<a href="#' + page + '" >' + page + '</a>';
            }
        });
    if (autoplay != false) {
        $(jcarousel).jcarouselAutoscroll({
            interval: autoplay,
            target: '+=1',
            autostart: true
        });
    }
}

function check_validate(form) {
    $(form).blur();
    if ($(form).val() == '') {

        $(form).addClass('error').next('label.error').css({ 'display': 'block' });

    }
    $(form).find('input[name="tel"]').focus();


}


function init() {
    //Определяем начальные параметры карты
    myMap = new ymaps.Map('YMapsID', {
        center: [55.753994, 37.622093],
        zoom: 12,
        behaviors: ['default', 'scrollZoom']
    });

    // Создание кнопки определения местоположения
    var button = new GeolocationButton({
        data: {
            image: '/images/wifi.png',
            title: 'Определить местоположение'
        },
        geolocationOptions: {
            enableHighAccuracy: true // Режим получения наиболее точных данных
        }
    }, {
        // Зададим опции для кнопки.
        selectOnClick: false
    });

    //Добавляем элементы управления на карту
    myMap.controls
        .add('zoomControl')
        .add(button, { top: 10, left: 3 });

    coords = [55.753994, 37.622093];

    //Определяем метку и добавляем ее на карту				
    myPlacemark = new ymaps.Placemark(coords, {}, { preset: "twirl#redIcon", draggable: true });
    myMap.geoObjects.add(myPlacemark);

    //Отслеживаем событие перемещения метки
    myPlacemark.events.add("dragend", function(e) {
        coords = this.geometry.getCoordinates();
        savecoordinats();
    }, myPlacemark);

    //Отслеживаем событие щелчка по карте
    myMap.events.add('click', function(e) {
        coords = e.get('coordPosition');
        myPlacemark.geometry.setCoordinates(coords);
        savecoordinats();
    });

    //Ослеживаем событие изменения области просмотра карты - масштаб и центр карты
    myMap.events.add('boundschange', function(event) {
        if (event.get('newZoom') != event.get('oldZoom')) {
            //savecoordinats();
        }
        if (event.get('newCenter') != event.get('oldCenter')) {
            //savecoordinats();
        }

    });
    //savecoordinats ();
}


function savecoordinats() {
    var new_coords = [coords[0].toFixed(4), coords[1].toFixed(4)];

    document.getElementById("latlongmet").value = new_coords;
    var center = myMap.getCenter();
    var new_center = [center[0].toFixed(4), center[1].toFixed(4)];
    get_address(1);
}

function get_address(is_enter) {
    $.ajax({
        url: "ajax.php?action=geo_address",
        type: "POST",
        data: { url: $("#latlongmet").val() },
        success: function(html) {

            $('#location_address').val(html);

            if (is_enter === 1) {

                if (input_type == 'from') {
                    if ($('#inp_from:visible').length > 0) {
                        $('#inp_from').val(html);
                    }
                } else if (input_type == 'where') {
                    if ($('#inp_to:visible').length > 0) {
                        $('#inp_to').val(html);
                    }
                } else if (input_type == 'where1') {
                    $('#kuda,#kuda2').val(html).blur();
                    $('#map_block .address').text(html);
                } else if (input_type == 'from1') {
                    $('#otkuda').val(html).blur();
                    $('#map_block .address').text(html);
                } else {}
            }

        },
        error: function(html) { rescont = 'Ошибка геокодирования';
            $('#location_address').val(rescont); }
    });
}

function open_tarif(name, price, ev) {

    $('#tarif_popup .heading').text(name);
    $('#tarif_popup_sucess .heading').text(name);
    $('#tarif_form input[name="tarif"]').val(name + ', ' + price + ' руб.');
    $('#tarif_form input[name="subject"]').val(name);
    $('#tarif_form input[name="evant"]').val(ev);
    open_popup('#tarif_popup');
}

function list1(ev, txt, price) {
    txt = txt.toUpperCase();
    $('#services_form input[name="service"]').val(txt);
    $('#services_form input[name="subject"]').val(txt);
    $('#services_popup .heading').text(txt);
    if (price) {
        $('#services_popup .heading').append('<span class="price">' + price + '</span>');
        $('#services_form input[name="price"]').val(price);
    }
    $('#services_sucess .heading').text(txt);
    $('#services_form input[name="evant"]').val(ev);

    open_popup('#services_popup');
}

function gorod() {
    var CV = $('#city').val();
    $('form input[name="gorod"]').each(function() {
        $(this).val(CV);
    });
    $('#order_popup_form input[name="from"]').val(CV).keyup();

    if (CV == 'Минск') {
        $('#city_place1').text('Минску');
    } else {
        $('#city_place1').text('городу');
        /* $('#city_place3').text('городе'); */
    }
}
$('#datetimepicker').datetimepicker({ language: 'ru' });