$(document).ready(function(){
	resizeWrapper();
});

function resizeWrapper(){
	$('[id$="requestForm"]').css("height", "0px");
	if(($('.stepContainer').height()+$('[id$="stepActionContainer"]').height())< $("#timeline-container").height()){
		$('[id$="requestForm"]').css("height", $("#timeline-container").height()+120+$('#div-step-2').height());
	}else{
		$('[id$="requestForm"]').css("height", $('.stepContainer').height()+$('[id$="stepActionContainer"]').height()+100+$('#div-step-2').height());
	}	
	
	$('[id$="div-step-1"]').css("padding-top" ,  $('#step-header').height()+50);
	
	$(document).ready(function (){
		$("[id$='cliente-bean-telefono']").keydown(function(event){
			numbersOnly(event);
		});

		$("[id$='telefono-negocio']").keydown(function(event){
			numbersOnly(event);
		});

		$("[id$='telefono-empresa']").keydown(function(event){
			numbersOnly(event);
		});

		$("[id$='telefono-empresa-conyuge']").keydown(function(event){
			numbersOnly(event);
		});

		$("[id$='numero-telefono-conyuge']").keydown(function(event){
			numbersOnly(event);
		});

		$("[id$='telefono-negocio-conyuge']").keydown(function(event){
			numbersOnly(event);
		});

		$("[id$='input-referencia1-telefono']").keydown(function(event){
			numbersOnly(event);
		});

		$("[id$='input-referencia2-telefono']").keydown(function(event){
			numbersOnly(event);
		});

		$("[id$='input-referencia3-telefono']").keydown(function(event){
			numbersOnly(event);
		});

		$("[id$='referencias-comerciales-telefono1']").keydown(function(event){
			numbersOnly(event);
		});

		$("[id$='referencias-comerciales-telefono2']").keydown(function(event){
			numbersOnly(event);
		});

		$("[id$='referencias-comerciales-telefono3']").keydown(function(event){
			numbersOnly(event);
		});
	});
}

$(window).scroll(function(){
	var scroll = $(window).scrollTop();
	/*-webkit-box-shadow: 0px 4px 19px 6px rgba(0, 0, 0, 0.75);
	-moz-box-shadow: 0px 4px 19px 6px rgba(0, 0, 0, 0.75);
	box-shadow: 0px 4px 19px 6px rgba(0, 0, 0, 0.75);*/
	if(scroll > 10){
		if($('#step-header').css("box-shadow")=="none"){
			$("#step-header").animate({width: "81.1%", margin : "0px 8.2%"}, 100 ,"swing");
			//$('#step-header').css("width", "80.5%");
			//$('#step-header').css("margin", "0px 8.4%");
			//$('#step-header').css("height", $('#step-header').height()+50);
			/*-webkit-box-shadow: 0px 15px 29px -11px rgba(0,0,0,0.5);
				-moz-box-shadow: 0px 15px 29px -11px rgba(0,0,0,0.5);
				box-shadow: 0px 15px 29px -11px rgba(0,0,0,0.5);*/
			
			$('#step-header').css("-webkit-box-shadow", "0px 15px 29px -11px rgba(0,0,0,0.5)");
			$('#step-header').css("-moz-box-shadow", "0px 15px 29px -11px rgba(0,0,0,0.5)");
			$('#step-header').css("box-shadow", "0px 15px 29px -11px rgba(0,0,0,0.5)");
			$('#step-header').css("z-index", "9999");
			$('#div-step-2').css("z-index", "2001");
			
			$('#heading').css("-webkit-box-shadow", "0px 6px 7px 1px rgba(0, 0, 0, 0.30)");
			$('#heading').css("-moz-box-shadow", "0px 6px 7px 1px rgba(0, 0, 0, 0.30)");
			$('#heading').css("box-shadow", "0px 6px 7px 1px rgba(0, 0, 0, 0.30)");
			
			$('#step-header').drags();
			$('#div-step-2').drags();
		}
	}else{
		$('#step-header').css("-webkit-box-shadow", "");
		$('#step-header').css("-moz-box-shadow", "");
		$('#step-header').css("box-shadow", "");
		$('#step-header').css("left", "");
		$('#step-header').css("top", "");
		$('#step-header').css("cursor", "");
		$("#step-header").animate({width: "80%", margin : "0px 8.7%"}, 100 ,"swing");
		$("#step-header").removeClass('active-handle').parent().removeClass('draggable');
		$('#div-step-2').css("z-index", "");
		
		$('#heading').css("-webkit-box-shadow", "");
		$('#heading').css("-moz-box-shadow", "");
		$('#heading').css("box-shadow", "");
		$('#step-header').unbind('mousemove');
		$('#step-header').unbind('mousedown');
		$('#div-step-2').unbind('mousemove');
		$('#div-step-2').unbind('mousedown');
		$('#div-step-2').css("left", "");
		$('#div-step-2').css("top", "");
		$('#div-step-2').css("cursor", "");
		//$("#step-header").animate({width: "80%", margin : "0px 8.7%"}, 500 ,"swing");
	}
//	$('#div-step-2').css("-webkit-transform", "translate3d(0px,"+scroll+"px ,1000px)");
//	$('#div-step-2').css("-ms-transform", "translate3d(0px,"+scroll+"px ,1000px)");
//	$('#div-step-2').css("-moz-transform", "translate3d(0px,"+scroll+"px ,1000px)");
});

function changeStepAction(){
	window.scrollTo(0, 0);
	resizeWrapper();
	initialize();
}

function changeStepAction2(){
	window.scrollTo(0, 0);
	resizeWrapper();
//	initialize();
}

function goToTheFirstStep(){
	$("[id$='step-1-button']").trigger("click");
}

(function($) {
    $.fn.drags = function(opt) {

        opt = $.extend({handle:"",cursor:"move"}, opt);

        if(opt.handle === "") {
            var $el = this;
        } else {
            var $el = this.find(opt.handle);
        }

        return $el.css('cursor', opt.cursor).on("mousedown", function(e) {
            if(opt.handle === "") {
                var $drag = $(this).addClass('draggable');
            } else {
                var $drag = $(this).addClass('active-handle').parent().addClass('draggable');
            }
            var z_idx = $drag.css('z-index'),
                drg_h = $drag.outerHeight(),
                drg_w = $drag.outerWidth(),
                pos_y = $drag.offset().top + drg_h - e.pageY,
                pos_x = $drag.offset().left + drg_w - e.pageX;
                $drag.css('z-index', 9999).parents().on("mousemove", function(e) {
	                $('.draggable').offset({
	                    top:e.pageY + pos_y - drg_h,
	                    left:e.pageX + pos_x - drg_w
	                }).on("mouseup", function() {
	                    $(this).removeClass('draggable').css('z-index', z_idx);
	                });
	            });
            e.preventDefault(); // disable selection
        }).on("mouseup", function() {
            if(opt.handle === "") {
                $(this).removeClass('draggable');
            } else {
                $(this).removeClass('active-handle').parent().removeClass('draggable');
            }
        });

    }
})(jQuery);

function cerrarVentana(){
	window.close();
	var newWindow = window.open('', '_self', ''); //open the current window
	newWindow.close();
}

