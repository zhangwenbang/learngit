$(document).ready(function() {
	//menu 
	menueffe();
	
	//section all
	section()
	//其他在 section() afterRender 
	
	if(isIE()){
		$(".section3 .font_selction").css({bottom:"20%"})
	}

    
    
});


function isIE() { //ie?  
    if (!!window.ActiveXObject || "ActiveXObject" in window)  
        return true;  
    else  
        return false;  
}  


function section(){
	
	var zoomPic=true;
	
	
	$('#contain').fullpage({
		sectionsColor: ['#e8eaec', '#eeeeee', '#eeeeee', '#f8f8f8', '#f2f2f2', '#f7f7f7'],
		anchors: ['page1', 'page2', 'page3', 'page4', 'page5', 'page6'],
		menu: '#menu',
		afterLoad: function(anchorLink, index) {
			
			if(index==5){
				var se5_cont_len=$(".section5 .cont_ele").length;
				for(var m=0;m<se5_cont_len;m++){
					$(".section5 .cont_ele").eq(m).delay(m*600).animate({opacity:"1"},300)
				}
			}
			if(index==4 && zoomPic){
				zoomPic=false;
				
				new ZoomPic("jswbox");
				$("#jswbox li").eq(0).animate({opacity:1},600,function(){
					$("#jswbox li").eq(1).animate({opacity:1},600,function(){
						$("#jswbox li").eq(2).animate({opacity:1},600,function(){
							
						})
					})
				})
			}
			if(index == 1) {

				$(".section2 .cirEff").css({
					"transform": "rotate(0deg)",
					"transform-origin": "center center"
				});
			}else if(index == 2) {
				
				$(".section2 .font").eq(0).animate({opacity:"1"},1200);
				$(".section2 .font").eq(0).find(".h").animate({top:"0"},1200);
				$(".section2 .font").eq(0).find(".pwrap").animate({top:"70px"},1200,function(){
					scrollTop(0);
				});
				
				
				$.fn.fullpage.setAllowScrolling(false)

				var _index = 0;
				var time = true;
				var t;
				var len = $(".section2 .font").length;
				
				
				//鼠标滚动
				// jquery 兼容的滚轮事件
				$(document).on("mousewheel DOMMouseScroll", function(e) {

					var delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1)) || // chrome & ie
						(e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1)); // firefox

					if(delta > 0) {
						_index = 0;

						$(document).unbind("mousewheel DOMMouseScroll");
						$.fn.fullpage.setAllowScrolling(true);
						
						
						// 向上滚
						
						console.log("wheelup");

					} else if(delta < 0) {
						if(time) {
							time = false;
							clearTimeout(t)
							if(_index == 0) {
								_index++;
								section2_font(_index, len)
								$(".section2 .cirEff").css({
									"transform": "rotate(90deg)",
									"transform-origin": "center center"
								});

							} else if(_index == 1) {
								_index++;
								section2_font(_index, len)

								$(".section2 .cirEff").css({
									"transform": "rotate(180deg)",
									"transform-origin": "center center"
								});

							} else if(_index == 2) {
								_index++;
								section2_font(_index, len)
								$(".section2 .cirEff").css({
									"transform": "rotate(270deg)",
									"transform-origin": "center center"
								});

							} else {

							}
							time = false;
							t = setTimeout(function() {
								if(_index == 3) {
									_index = 0;
									$(document).unbind("mousewheel DOMMouseScroll");
									$.fn.fullpage.setAllowScrolling(true);
									
								}
								time = true;
							}, 2000);
						}
						
						
						// 向下滚
						console.log("wheeldown");
					}

				});

				//滚动结束
				
				
				//手指滑动
					slideSpan(_index,time,t,len);
					
				//手指滑动结束
				

				//					$(".section2 .cirEff").css({"transform":"rotate(90deg)","transform-origin":"center center"})
			}

		},
		onLeave: function(index, direction) {
			if(index == 2 && direction == 3) {

				$(".section2 .cirEff").css({
					"transform": "rotate(0deg)",
					"transform-origin": "center center"
				})
				var fontLen=$(".section2 .font").length;
				for(var w=0;w<fontLen;w++){
					$(".section2 .font").eq(w).css({opacity:"0.3"},800);
					$(".section2 .font").removeClass("fontshow")
					$(".section2 .font").eq(w).find(".h").css({top:"-500px"});
					$(".section2 .font").eq(w).find(".pwrap").css({top:"700px"});
					
					$(".section2 .font").eq(w).css({display:"none"});
				}
				$(".section2 .font").eq(0).addClass("fontshow")
				$(".section2 .font").eq(0).css({display:"block"});
				

			}
			if(index == 2 && direction == 1) {

				$(".section2 .cirEff").css({
					"transform": "rotate(0deg)",
					"transform-origin": "center center"
				})
				var fontLen=$(".section2 .font").length;
				for(var w=0;w<fontLen;w++){
					$(".section2 .font").eq(w).css({opacity:"0.3"});
					$(".section2 .font").removeClass("fontshow")
					$(".section2 .font").eq(w).find(".h").css({top:"-500px"});
					$(".section2 .font").eq(w).find(".pwrap").css({top:"700px"});
					$(".section2 .font").eq(w).css({display:"none"});
				}
				$(".section2 .font").eq(0).addClass("fontshow");
				$(".section2 .font").eq(0).css({display:"block"});
				
			}
		},
		afterRender: function() {
			
			//section1
			section1();
			
			//section2
			setCirWid();
			
			//section3
			section3Silder();
			index_gd_home('.section3 .imgWrap img', ".section3 .imgWrap", 750, 1080);
			
			//section4
			section4();
			//new ZoomPic("jswbox");
			
			//section5
			section5();
			
			//section5
			section6()
			//menu
			menuClick();
			
			$("html").css({visibility:"visible"});
		},
		afterResize: function() {
			setCirWid();
			
						
			$('.slider_02').trigger("destroy", {
				origOrder: false
			})
			$('.slider_01').trigger("destroy", {
				origOrder: false
			})
			
			$('.switch_wrap').trigger("destroy", {
				origOrder: false
			})
			
			$('.imgWrap_wrap').trigger("destroy", {
				origOrder: false
			})
			
			
			
			
			section3Silder();
		}
	});
}
	



//touch move
	function slideSpan(_index,time,t,len){
		var slideTo3=false;
		var slideRight=document.getElementsByClassName("section2")[0];
		var movestart=0;
		slideRight.addEventListener('touchstart',function(event){
			movestart=event.changedTouches[0].pageY;

			
			if(event.stopPropagation){
			 	 event.stopPropagation();
			 }else{
			 	event.cancelBubble = true;
			 }
		},false);
		
		slideRight.addEventListener('touchend',function(event){
			var movesend=event.changedTouches[0].pageY;
			if(movesend-movestart>80){
				
				_index = 0;

				$(document).unbind("mousewheel DOMMouseScroll");
				
				
				$.fn.fullpage.setAllowScrolling(true,'up');
				slideTo3=false;
				location.href="#page1"
				
				// 向下滚
				
				
				console.log("touchdown");
			}else if(movesend-movestart<-80){
				if(time) {
					time = false;
					clearTimeout(t)
					if(_index == 0) {
						_index++;
						section2_font(_index, len)
						$(".section2 .cirEff").css({
							"transform": "rotate(90deg)",
							"transform-origin": "center center"
						});

					} else if(_index == 1) {
						_index++;
						section2_font(_index, len)

						$(".section2 .cirEff").css({
							"transform": "rotate(180deg)",
							"transform-origin": "center center"
						});

					} else if(_index == 2) {
						_index++;
						section2_font(_index, len)
						$(".section2 .cirEff").css({
							"transform": "rotate(270deg)",
							"transform-origin": "center center"
						});

					} else {

					}
					time = false;
					
					if(_index == 3 && slideTo3) {
						_index = 0;
						slideTo3=false;
						location.href="#page3";
					}
					
					t = setTimeout(function() {
						if(_index == 3) {
							slideTo3=true;
							
							$(document).unbind("mousewheel DOMMouseScroll");
							$.fn.fullpage.setAllowScrolling(true);
							
						}
						time = true;
					}, 2000);
				}
				
				// 向上滚
				
				console.log("touchup");
			}
			
			if(event.stopPropagation){
			 	 event.stopPropagation();
			 }else{
			 	event.cancelBubble = true;
			 }
		},false)
		
		
		
	}

	
	
	
	//section1
		function section1(){
			setTimeout(function(){
				$(" .section1_inner .icons").animate({opacity:"0"},800,function(){
					$(" .section1_inner .logo_home").animate({opacity:"1"},800)
				})
			},4000)
			
			
		}
	
	
	

	//section2 font
	function section2_font(_index, len) {
		$(".section2 .font").eq(_index).find(".pw_scroll").stop().animate({
			"scrollTop": "0"
		});
		for(var i = 0; i < len; i++) {
			if(i != _index && $(".section2 .font").eq(i).hasClass("fontshow")) {

				$(".section2 .font").eq(i).stop().animate({
					
				}, function() {
					$(this).css({
						display: "none"
					});
					$(this).removeClass("fontshow");

					$(".section2 .font").eq(_index).css({
							display: "block"
						});
					$(".section2 .font").eq(_index).animate({
						opacity: "1"
					}, function() {
						$(".section2 .font").eq(_index).animate({opacity:"1"},1200);
						$(".section2 .font").eq(_index).find(".h").animate({top:"0"},1200);
						$(".section2 .font").eq(_index).find(".pwrap").animate({top:"70px"},1200,function(){
							$(".section2 .font").eq(_index).addClass("fontshow");
							scrollTop(_index);
						});
						
					})

				})
			}
		}
	}
	//scrollTop
	function scrollTop(_index) {

		var wapWid = $(".section2 .font").eq(_index).find(".pw_scroll").height()
		var contWid = $(".section2 .font").eq(_index).find(".pw_scroll .p").height()
		var scrolTO = contWid - wapWid;
		
		$(".section2 .font").eq(_index).find(".pw_scroll").stop().delay(800).animate({
			'scrollTop': (scrolTO + 50) + 'px'
		}, 1000);
	}

	

	function menueffe() {
		$(".sliderMenu").click(function() {
			$("#menu").css({
				display: "block",
				opacity: '1'
			});
			$("#menu li").eq(0).animate({
				opacity: "1"
			}, "fast", function() {
				$("#menu li").eq(1).animate({
					opacity: "1"
				}, "fast", function() {
					$("#menu li").eq(2).animate({
						opacity: "1"
					}, "fast", function() {
						$("#menu li").eq(3).animate({
							opacity: "1"
						}, "fast", function() {
							$("#menu li").eq(4).animate({
								opacity: "1"
							}, "fast", function() {
								$("#menu li").eq(5).animate({
									opacity: "1"
								}, "fast", function() {

									$("#menu .close").animate({
										opacity: "1"
									}, "fast", function() {})

								})
							})
						})
					})
				})

			})
		})

		$("#menu .next").click(function() {
			$("#menu").animate({
				opacity: "0"
			}, function() {
				$("#menu li").css({
					opacity: "0"
				});
				$("#menu").css({
					display: "none"
				});
				$("#menu .close").css({
					opacity: "0"
				});
			})
		})
		$("#menu .close").click(function() {

			$("#menu").animate({
				opacity: "0"
			}, function() {
				$("#menu li").css({
					opacity: "0"
				});
				$("#menu").css({
					display: "none"
				});
				$("#menu .close").css({
					opacity: "0"
				});
			})
		})
	}

	

	function setCirWid() {
		var hig = $(".section2 .cirWrap").height();
		$(".section2 .cirWrap").width(hig);
	}

	
			
		//最后一屏lunbo新增
	var wsliderbanner=function(big_el){
		
		
		    $(big_el).carouFredSel({
				items:{
					'visible':1,
				},
				responsive: true,
				'scroll': {'duration': 600,'items': 1, 'fx': 'crossfade'},
				'swipe': {'onMouse': true},
				'auto': true,
				
			});
			
	};    
	
	
	
	function section3Silder() {
		$('.slider_01').carouFredSel({
			
			responsive: true,
			'scroll': {
				'duration': 600,
				'items': 1,
			},
			'swipe': {
				'onMouse': true
			},
			'auto': false,
			'synchronise': ".switch_wrap"
		});
		
		$(".switch_wrap").carouFredSel({
			height:'100%',
			responsive: true,
			width:'100%',
			items: {
                   visible: 7,
                   width:'100%',
           },
			'scroll': {
				'duration': 600,
				'items': false
			},
			'direction': "down",
			'auto': false,
			'synchronise': ".slider_02"
		});
		
		
		$('.slider_02').carouFredSel({
			
			responsive: true,
			'scroll': {
				'duration': 600,
				'items': 1,
				event: 'click'
			},
			'swipe': {
				'onMouse': true
			},
			'pagination': {
				'container': ".switch_wrap",
				'anchorBuilder': false
			},
			'auto': false,
			'synchronise': ".slider_01"

		});

		 wsliderbanner(".imgWrap_wrap"); 

	}

	function index_gd_home(a, b, w, h) {
		var $window = $(b);
		var $windowWidth = function() {
			return $window.width();
		};
		var $windowHeight = function() {
			return $window.height();
		};
		$window.fssResize(function() {
			var width = $windowWidth();
			var height = $windowHeight();

			$(b).each(function() {
				$this = $(this);
				$this.height(height).width(width);
				$this.triggerHandler("configuration", {
					height: height,
					width: width,
					items: {
						width: width
					}
				});
				$this.triggerHandler("updateSizes");
			});

		});

		$(a).each(function() {
			$(this).fullscreenstage({
				'width': w,
				'height': h
			});
		});

		$(window).fssResize();

	}

	//section4
	function section4(){
		$(".section4_inner .more").click(function(){
			
			var _html=$(this).parent().parent().parent().parent().html();
			$("#pomp .contentWrap").children().detach();
			$("#pomp .contentWrap").append(_html)
			$("#pomp").css({display:"block"})
		})
		
		$("#pomp .close").click(function(){
			$("#pomp").css({display:"none"})
		})
		
	}
	
	
	
	//section5
	function section5(){
		$(".section5 .cont_ele").mouseenter(function() {
			var that=this;
			$(".section5 .cont01").stop().animate({opacity:"0"},function(){
				var len = $(".section5 .cont_ele").length;
				var _index = $(that).index();
				for(var i = 0; i < len; i++) {
					$(".section5 .cont_ele").eq(i).removeClass("active");
					if(i % 2 == 0) {
						$(".section5 .cont_ele").eq(i).find(".imgele").attr("src", "/themes/basic/skin/images/ele_b_n.png")
					} else {
						$(".section5 .cont_ele").eq(i).find(".imgele").attr("src", "/themes/basic/skin/images/ele_t_n.png")
					}
		
				}
				$(".section5 .cont_ele").eq(_index).addClass("active");
				if(_index % 2 == 0) {
					$(".section5 .cont_ele").eq(_index).find(".imgele").attr("src", "/themes/basic/skin/images/ele_b_a.png")
				} else {
					$(".section5 .cont_ele").eq(_index).find(".imgele").attr("src", "/themes/basic/skin/images/ele_t_a.png")
				}
		
				for(var i = 0; i < len; i++) {
					if($(".section5 .cont01 .show01").eq(i).hasClass("showtotal") & i !== _index) {
						$(".section5 .cont01 .show01").eq(i).removeClass("showtotal");
						$(".section5 .cont01 .show01").eq(i).css({
							display: "none"
						});
						$(".section5 .cont01 .show01").eq(_index).addClass("showtotal")
						$(".section5 .cont01 .show01").eq(_index).css({
							display: "block"
						});
						$(".section5 .cont01 .show01").eq(_index).animate({
							opacity: "1"
						})
					}
				}
				$(".section5 .cont01").animate({opacity:"1"});
			})
			
			
	
		})

	}
	
	//section6
	function section6(){
		$(".section6 .four_ele").mouseenter(function(){
			$(this).find(".p").animate({opacity:"1"})
			var _index=$(this).index();
			if(_index==0){
				$("img",this).attr("src","/themes/basic/skin/images/1234.gif");
			}else if(_index==1){
				$("img",this).attr("src","/themes/basic/skin/images/phone01.gif");
			}else if(_index==2){
				$("img",this).attr("src","/themes/basic/skin/images/fax01.gif");
			}else if(_index==3){
				$("img",this).attr("src","/themes/basic/skin/images/email01.gif");
			}
			
			
			
		})
		$(".section6 .four_ele").mouseleave(function(){
			$(this).find(".p").animate({opacity:"0"});
			var _index=$(this).index();
			if(_index==0){
				$("img",this).attr("src","/themes/basic/skin/images/address.png");
			}else if(_index==1){
				$("img",this).attr("src","/themes/basic/skin/images/phone.png");
			}else if(_index==2){
				$("img",this).attr("src","/themes/basic/skin/images/fax.png");
			}else if(_index==3){
				$("img",this).attr("src","/themes/basic/skin/images/email.png");
			}
		})
	}
	
	//menu
	function menuClick(){
		$("#menu li .next").click(function(){
			var _index=$(this).parent().parent().index()+1;
			$(document).unbind("mousewheel DOMMouseScroll");
			$.fn.fullpage.setAllowScrolling(true);
			$(".section2 .cirEff").css({
					"transform": "rotate(0deg)",
					"transform-origin": "center center"
				})
			var fontLen=$(".section2 .font").length;
				for(var w=0;w<fontLen;w++){
					$(".section2 .font").eq(w).css({opacity:"0.3"});
					$(".section2 .font").removeClass("fontshow")
					$(".section2 .font").eq(w).css({display:"none"});
					$(".section2 .font").eq(w).find(".h").css({top:"-500px"});
					$(".section2 .font").eq(w).find(".pwrap").css({top:"700px"});
				}
				$(".section2 .font").eq(0).addClass("fontshow")
				$(".section2 .font").eq(0).css({display:"block"});
				
			location.href="#page"+_index;
		})
	}
	
	