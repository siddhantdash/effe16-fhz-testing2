$(document).ready(function(){

	$('.tent, #close').on('click', function(){
  		$('.wrap, #close').toggleClass('active');
  
  		return false;
	});

	$("#scroller-wrapper").hide();

	// Need to wait till all images have loaded.
	$(window).on("load",function(){
		var windowWidth = window.innerWidth,
			windowHeight = window.innerHeight,
			$tents = $(".tent"),
			tents = $(".tent").toArray(),
			layerContainer = $("#layer-container"),
			scrollerWrapper = $("#scroller-wrapper"),
			base = $("#base"),
			scrollpos = 0;

		$("#loader-till-window-load").fadeOut().promise().done(function(){
			scrollerWrapper.show();

			(function initPositions(){
				var currentLeft = 0,
					ferrisWheelLeft = 0;
					
				$tents.each(function(){

					var left = currentLeft + "px";
					$(this).css("left",left);

					if($(this).next().hasClass("leftjoin"))
						currentLeft += parseInt($(this).css("width"));
					else
						currentLeft += parseInt($(this).css("width")) + 60;

					if($(this).hasClass("main-tent")){
						scrollpos = parseInt($(this).css("left")) + parseInt($(this).css("width"))/2 - window.innerWidth/2;
						ferrisWheelLeft += parseInt($(this).css("left")) + window.innerWidth/2 - 30;
						console.log(scrollpos);
					}
				});

				width = currentLeft +  "px";
				layerContainer.css("width",width);
				base.css("width",width);
				$("#ferris-wheel").css("left",ferrisWheelLeft+"px");

			})();


			//Creates a draggable window in x-axis.
			Draggable.create($("#scroller-wrapper"), {type:"scrollLeft,",throwProps:true});

			tents.unshift($("#fence-layer"));
			tents.push($("#ferris-wheel"));
			TweenMax.staggerFrom(tents, 1, {
					y: "-100px",
				opacity: 0,
				ease: Power2.easeIn
			},0.1);


			//The scrollLeft of $("#scroller-wrapper") is positioned such that it is above the main tent.
			scrollerWrapper.scrollLeft(scrollpos);
		
		});
		
		assignEventHandlers();
		
		TweenMax.to($("#seats-wrapper"), 40,{
			rotation: 359,
			repeat: -1,
			ease: Linear.easeNone
		
		});

		TweenMax.to($("#seats-wrapper .seat"), 40,{
			rotation: -359,
			repeat: -1,
			ease: Linear.easeNone
		});	
	});
});


/*function showpopup(){
	TweenMax.staggerTo("#generic-popup", 1, {
					top: "15%",
				opacity: 1,
				ease: Power2.easeIn
			},0.1);
}

function hidepopup(){
	TweenMax.staggerTo("#generic-popup", 1, {
					top: "-70%",
				opacity: 0,
				ease: Power2.easeIn
			},0.1);
}

$('.tent').click(function(){
	showpopup();
});*/

function assignEventHandlers(){
	$(".tent img").hover(
		function(){
			TweenMax.to($(this).closest(".tent"), 0.2, {
				css: {
					scale: 1.1,
					transformOrigin: "center bottom"
				}
			});
		},
		function(){
			TweenMax.to($(".tent"), 0.2, {
				css:{
					scale: 1
				}
			});
		}
	);

	$("#tickets img,#access-area").hover(
		function(){
			TweenMax.to($(this).closest("div"), 0.2, {
				css: {
					scale: 1.2
				}
			});
		},
		function(){
			TweenMax.to($(this).closest("div"), 0.2, {
				css:{
					scale: 1
				}
			});
		}
	);	
}
