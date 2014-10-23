 /*--------------- IE CSS -----------------
-----------------------------------------------*/

function isIE () {
    var myNav = navigator.userAgent.toLowerCase();
    return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
}

if (isIE() < 9 && isIE() != false) {
    $("head").append('<link rel="stylesheet" type="text/css" href="https://www.aig.co.za/aig/internet/ZA/en/ie_tcm3914-640953.css" />');
}

/*-------------------End IE CSS-----------------
-----------------------------------------------*/

 $(document).ready(function () {
   //$("ul#navListPanel li div").css({'opacity': '0.90', 'filter':'alpha(opacity=90)'}); // topMenu Opacity
   //$("#navContainer #navListPanel li.tabOnActive #subNav3").show()
  // $('#subNav3').show();
	  //$(".tabOnActive>div").show();
	var whatMenu = readCookie("tabSelect");
		$('li#li1>div').show()
			if (whatMenu == 1){ 
					$('li#li1>div').show()
				} else if (whatMenu == 2){ 
					$('li#li2>div').show()
				} else if (whatMenu == 3){ 
					$('li#li3>div').show()
			}

		//$('#topMenu #navListPanel>li').click(function () {
		//   $(this).children('#subNav3').show();
		// $(this).addClass('linkExtend');
		// });
    $('<p class="copyrightTxt">' + $('#siteFooter').text() + '</p>').prependTo('#footerSection');
    $('#siteFooter').hide();
    $('.detailAccModule .detModTitle:odd').addClass('odd');
    $('.detailAccModule .detModTitle:even').addClass('even');
    $('#logobanner2').insertAfter('#siteSearch');
    $('#pageFooter').insertAfter('.copyrightTxt');

	if($(".date")){
		var value;
		var newvalue;
		$(".date").each(function(){
		var value = $(this).text();
		var newValue = value.replace(" ", "");
		$(this).text(newValue);
		})
	} 
// Copyright line break
//	var html = $(".copyrightTxt").html();
//	html = html.substring(0, 42) + "<br>" + html.substring(42);
//	$(".copyrightTxt").html(html); 
});

function setCookie(c_name,value,exdays)
	{
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
	document.cookie=c_name + "=" + c_value;
	}
	
$(document).ready(function () {
	if ($('#li1').is('.tabOnActive')) {
		writeCookie('setMenu','1');
	} else if ($('#li2').is('.tabOnActive')) {
		writeCookie('setMenu','2');
	} /*else if ($('#li3').is('.tabOnActive')){
		writeCookie('setMenu','3');
	};*/
	/************************/
	/*if ($('#li1').is('.tabOnActive')) {
	writeCookie('setMenu','1');
	} else if ($('#li2').is('.tabOnActive')) {
		writeCookie('setMenu','2');
	} else if ($('#li3').is('.tabOnActive')){
		var whatMenu = readCookie("setMenu");
			if (whatMenu == 1){ 
			$('li#li1>div').show()
			} else if (whatMenu == 2){ 
			$('li#li2>div').show()
		} 
	};*/
	
	//Facebook
    $('<iframe src="//www.facebook.com/plugins/like.php?href='+encodeURIComponent(location.href)+' &amp;send=false&amp;layout=button_count&amp;width=90&amp;show_faces=false&amp;font=arial&amp;colorscheme=light&amp;action=like&amp;height=21" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:90px; height:21px;" allowTransparency="true"></iframe>').appendTo('#like-button')
	
	//$('#li3').click(function(){
	var whatMenu = readCookie("setMenu");
	if ($('#li32').is('.tabOnActive')) {
			writeCookie('setMenu','3');
		} else if (whatMenu == 1){ 
			$('li#li3>div').css('display','none');
			$('li#li1>div').show()
		} else if (whatMenu == 2){ 
			$('li#li3>div').css('display','none');
			$('li#li2>div').show()
		
		}
	//});
	//for table row
    if($("table").attr("border") != "0") {
    $("tr:even").addClass("odd");
    $("tr:odd").addClass("even");
    }
});

$(document).ready(function(){
if($.browser.msie && parseInt($.browser.version, 10) === 8){
		$("a[name='backToList']").html('&nbsp;');
	}		
//$('#subNav3').show();
function mainmenu(){
$(" #navListPanel li").hover(function(){
		$(this).find('ul:first').css({visibility: "visible",display: "none"}).show();
			},function(){
				$(this).find('ul:first').css({visibility: "hidden"});
			});
		}
		
$('#subNav3 ul li').hover(function () {
    if($(this).parent().parent().parent().hasClass('tabOnActive')) {} else {
        $(this).parent().parent().parent().addClass('tabOnActive');
    }
	}, function () {
		$(this).parent().parent().parent().removeClass('tabOnActive');
	});
	
$('#mastHead').append('<ul class="utiNavSec"></ul><ul id="rightTopMenu"></ul>');
$('#topLinks ul li a,#topLinks ul li span').each(function () {
    var t = $(this).text();
    if($(this).text().indexOf("01") >= 0) {
        $(this).text(t.replace("01", ""));
        $(this).parent().appendTo($(".utiNavSec"));
    }

    if($(this).text().indexOf("02") >= 0) {
        $(this).text(t.replace("02", ""));
        $(this).parent().appendTo($("#rightTopMenu"));
    }
    if($(this).text().indexOf("03") >= 0) {
        $(this).text(t.replace("03", ""));

    }
});
	$("li[role=menuitem]").each(function(){
		if($(this).html() == "\n\n"){
		$(this).remove();
		}
	});
});

/*---rotating carousel arrows--*/

$(document).ready(function(){

	$('<a id="bnrBtnLft">left</a>').prependTo('#gridTop #segmentBanner #thumbnail');
	$('<a id="bnrBtnRt">right</a>').appendTo('#gridTop #segmentBanner #thumbnail');
    $('#bnrBtnLft').click(function() {jumpImage(-1);});
    $('#bnrBtnRt').click(function() {jumpImage(1);});

    if($("#navBanner").length || $("#navBannerVert").length || $("#segmentBanner").length || $("#infoBanner").length) {
        $("body").addClass("hasBanner")
    }
    if($("#navBanner #thumbnail").length) {
        $("#navBanner #thumbnail .thumblist li").each(function (x) {
            if($("img", $(this)).length < 1) {
                $(this).addClass("noImage")
            }
        });
       thumbSection("thumbnail");
        //carousal("#navBanner #thumbnail", 5);
        $(".bnrDesc .thumblist a").click(function () {
            $("#thumbnail ul li").removeClass("on");
            $(".bannerSection").hide();
            $(".defaultBannerSection").show()
        })
    }
    if($("#thumbnail").length) {
        thumbSection("thumbnail")
    }
 if($("#footerSecDetails").length) {
        //carousal("#footerSecDetails", 5);
        $("#footerSecDetails ul.thumblist > li").each(function () {
            var $parThis = $(this),
                $childSize = $("ul", $parThis).size();
            if($childSize >= 2) {
                $parThis.attr("class", "cols" + $childSize + "")
            }
        })
    }
	if($(".moduleCarSection .moduleCarDtls").length) {
        $(".moduleCarSection .moduleCarDtls").each(function (z) {
            $(this).attr("id", "moduleCarousal" + z + "");
            carousal("#moduleCarousal" + z + "", 1)
        })
    }
    $(".bannerSection").eq(0).css("z-index", "1");
    $("#navBanner .bannerSection").each(function (x) {
        $(".bnrSectionDesc ul li a", this).each(function (y) {
            $(this).click(function (z) {
                z.preventDefault();
                showPop(x, (y + 1))
            })
        })
    });
    $(".popClose a").click(function (e) {
        hidePop();
        e.preventDefault()
    });
    $(".poprgt").click(function (e) {
        e.preventDefault();
        var openItem = $(".popBox:visible");
        var x = $(".popBox").index(openItem);
        var popNumber = $("#popBox" + x + " .popHolder > div").size();
        var popDisplay = popNumber - 1;
        var popWidth = $("#popBox" + x + " .popText1").outerWidth(true);
        var popPanelWidth = $("#popBox" + x + " .popHolder > div").size() * popWidth + 20;
        $("#popBox" + x + " .popHolder").width(popPanelWidth);
        var popLeft = $("#popBox" + x + " .popHolder").css("margin-left").replace("px", "");
        var animDetect = popLeft % popWidth;
        if(popLeft > -(popDisplay * popWidth) && (animDetect == 0)) {
            $("#popBox" + x + " .popHolder").animate({
                marginLeft: "-=" + popWidth
            }, 1000);
            $("#popBox" + x + " .poplft").fadeTo("fast", 1);
            if(popLeft / popWidth == 1 - popDisplay) {
                $("#popBox" + x + " .poprgt").fadeTo("fast", 0.2)
            }
        }
    });
    $(".poplft").click(function (e) {
        e.preventDefault();
        var openItem = $(".popBox:visible");
        var x = $(".popBox").index(openItem);
        var popNumber = $("#popBox" + x + " .popHolder > div").size();
        var popDisplay = popNumber - 1;
        var popWidth = $("#popBox" + x + " .popText1").outerWidth(true);
        var popPanelWidth = $("#popBox" + x + " .popHolder > div").size() * popWidth + 20;
        $("#popBox" + x + " .popHolder").width(popPanelWidth);
        var popLeft = $("#popBox" + x + " .popHolder").css("margin-left").replace("px", "");
        var animDetect = popLeft % popWidth;
        if(popLeft < 0 && (animDetect == 0)) {
            $("#popBox" + x + " .popHolder").animate({
                marginLeft: "+=" + popWidth
            }, 1000);
            $("#popBox" + x + " .poprgt").fadeTo("fast", 1);
            if(popLeft / popWidth == -1) {
                $("#popBox" + x + " .poplft").fadeTo("fast", 0.2)
            }
        }
    });
    if($("#navBannerVert").length) {
        $(".bannerSection:eq(0)", "#navBannerVert").show()
    }
});
function jumpImage(upDownVal){
	clearInterval(myInterval);
	Count = Count + upDownVal;
	runImidiatelly = true;
	runImages();
}
function showSlide(imgID, carouselID) {

    var parentID = $("" + carouselID + "").parents("div").attr("id");
    $("#" + parentID + " > div").hide();
    $("#" + parentID + " > span > div").hide();
    $("#" + parentID + " .bannerSection").eq(imgID).show();
    $("" + carouselID + "").show()
}

function hidePop() {
    $("#popContent,#popBg,.popBox").hide()
}

function showPop(x, y) {
    $("#popContent, #popBg, #popBox" + x + "").show();
    var popWidth = $("#popBox" + x + " .popText1").outerWidth(true);
    var popPanelWidth = $("#popBox" + x + " .popHolder > div").size() * popWidth + 20;
    $("#popBox" + x + " .popHolder").width(popPanelWidth);
    var popleft = -(y - 1) * popWidth;
    $("#popBox" + x + " .popHolder").css("margin-left", popleft);
    if(y == 1) {
        $("#popBox" + x + " .poplft").css("opacity", 0.2);
        $("#popBox" + x + " .poprgt").css("opacity", 1)
    } else {
        if(y == $("#popBox" + x + " .popHolder > div").length) {
            $("#popBox" + x + " .poprgt").css("opacity", 0.2);
            $("#popBox" + x + " .poplft").css("opacity", 1)
        } else {
            $("#popBox" + x + " .poprgt").css("opacity", 1);
            $("#popBox" + x + " .poplft").css("opacity", 1)
        }
    } if($("#popBox" + x + " .popHolder > div").length == 1) {
        $("#popBox" + x + " .poplft").css("opacity", 0.2);
        $("#popBox" + x + " .poprgt").css("opacity", 0.2)
    }
}

function carousal(carouselID, displayCount) {
    var thmbWidth = $("" + carouselID + " ul.thumblist li").outerWidth(true);
    $("" + carouselID + " ul.thumblist >li").each(function () {
        if($(this).outerWidth(true) < thmbWidth) {
            thmbWidth = $(this).outerWidth(true)
        }
    });
    if($("" + carouselID + " ul.thumblist > li > ul").length) {
        var thmbDisplay = $("" + carouselID + " ul.thumblist > li > ul").size() - displayCount;
        var thmbPanelWidth = $("" + carouselID + " ul.thumblist > li > ul").size() * thmbWidth
    } else {
        var thmbDisplay = $("" + carouselID + " ul.thumblist > li").size() - displayCount;
        var thmbPanelWidth = $("" + carouselID + " ul.thumblist li").size() * thmbWidth
    }
    $("" + carouselID + " ul.thumblist").width(thmbPanelWidth);
    if(carouselID != "#footerSecDetails") {
        if($("" + carouselID + " ul.thumblist > li").size() <= displayCount) {
            $("" + carouselID + " .btnlft, " + carouselID + " .btnrgt").css("visibility", "Hidden")
        }
    } else {
        var fthumblist = $("" + carouselID + " ul.thumblist").width();
        var fthumbholder = $("" + carouselID + " div.thumbholder").width();
        if(fthumblist <= fthumbholder) {
            $("" + carouselID + " .btnlft, " + carouselID + " .btnrgt").css("visibility", "Hidden")
        }
    }
    $("" + carouselID + " .btnlft").fadeTo("fast", 0.2);
    $(carouselID + " .btnrgt").click(function (e) {
        e.preventDefault();
        var thmbLeft = $("" + carouselID + " ul.thumblist").css("margin-left").replace("px", "");
        var animDetect = thmbLeft % thmbWidth;
        if(thmbLeft > -(thmbDisplay * thmbWidth) && (animDetect == 0)) {
            $("" + carouselID + " ul.thumblist").animate({
                marginLeft: "-=" + thmbWidth
            }, 1000);
            $("" + carouselID + " .btnlft").fadeTo("fast", 1);
            if(thmbLeft / thmbWidth == 1 - thmbDisplay) {
                $("" + carouselID + " .btnrgt").fadeTo("fast", 0.2)
            }
        }
    });
    $("" + carouselID + " .btnlft").click(function (e) {
        e.preventDefault();
        var thmbLeft = $("" + carouselID + " ul.thumblist").css("margin-left").replace("px", "");
        var animDetect = thmbLeft % thmbWidth;
        if(thmbLeft < 0 && (animDetect == 0)) {
            $("" + carouselID + " ul.thumblist").animate({
                marginLeft: "+=" + thmbWidth
            }, 1000);
            $("" + carouselID + " .btnrgt").fadeTo("fast", 1);
            if(thmbLeft / thmbWidth == -1) {
                $("" + carouselID + " .btnlft").fadeTo("fast", 0.2)
            }
        }
    })
}

function thumbSection(thumID) {
    if(!$("#navBanner").length) {
        $("#" + thumID + " ul li").eq(0).attr("class", "on")
    }
    $("#" + thumID + " ul li").each(function (z) {
        var $tThis = $(this);
        $tThis.attr("id", "carImg" + z + 1 + "").hover(function () {
            $tThis.addClass("hover")
        }, function () {
            $tThis.removeClass("hover")
        }).click(function (e) {
            e.preventDefault();
            $("#" + thumID + " ul li").removeClass("on");
            $tThis.attr("class", "on");
            showSlide($("#" + thumID + " ul li").index($tThis), "#" + thumID + "")
        })
    })
}; 

$(document).ready(function(){
//border right bug fix
var $container = $('body #topLinks ul');
    $('body #topLinks ul li a').each(function(){
        var $thisLi = $(this);
        var offset = $thisLi.position();
        if(offset.left >= $container.width() - $thisLi.outerWidth()){
            $thisLi.css('border-right', 'none')
        }
    });
//gap fix
if ($("#gridTop #segmentBanner").length) {
        $("#grid_wrapper").addClass("nogap");
		}	
	
if($("#LeadgenGetQuote, .tabcontainer").length == 0) {
	$('#gridRight #assistanceForm .formcontainer').css('margin-top', 55 + 'px')
}
});

$(function () {
    $("#navContainer a[href^=#]").addClass("nonLink").click(function (e) {
        e.preventDefault()
    }); 
	$("a[data-code]").click(function (e) {
		var str = $(this).attr("data-code");
        var str2 = $(this).attr("data-name");
		var splitCode = str.split("-",2);
		var s=s_gi(s_account); 
		s.tl($(this),'o', str2 + ' | ' + splitCode[0] + ' | ' + splitCode[1]);
	});	
	$("form#URLLocation").submit(function (e) {
		e.preventDefault();
		window.location = $('#CocLocal').val();
		
	});	
	
    $("#navContainer #navListPanel > li").each(function () {
        var $navThis = $(this);
        var $childSize = $(".navBoxList ul", $navThis).size();
        if ($childSize <= 3) {
            $(".navBox", $navThis).parent().addClass("childItems" + $childSize + "")
        }
        if ($childSize >= 5) {
            $(".navBox", $navThis).parent().addClass("largeChildItems")
        }
    });
    $("#textResizeTop a, #textResizeBtm a").each(function (e) {
        $(this).click(function (z) {
            z.preventDefault();
            $("body").attr("class", $(this).attr("class"));
            $("#textResizeTop a, #textResizeBtm a").removeClass("active");
            $(this).addClass("active")
        })
    });
    /*if ($(".openTT").length) {
        $("#topMenu").css("margin-bottom", "23px")
    }*/
    $(".footerLink li").eq(0).attr("class", "first");
    slideIn($(".contactList>a"), "fast");
    $("a.offerLink").click(function (e) {
        $(this).parent().toggleClass("activated");
        $('html, body').animate({
            scrollTop: $("#footerSecContainer").offset().top
        }, 200);
        return false
    });
    if ($("ul#navListPanel").length) {
        $("ul#navListPanel").find("li:has(div)").addClass("arrow");
        $("ul#navListPanel li ul>li").hover(function () {
            $($(this).children("#navBox3"),this).show();
            if ($(this).children().length > 1) {
                $(this).addClass("selected")
            }
        }, function () {
            $("div:eq(0)", this).hide();
            if ($(this).children().length > 1) {
                $(this).removeClass("selected")
            }
        })
    }
    initAccordMenu("#gridCenter .catAccordion:eq(0)", 0);
    initAccordMenu("#gridBottom .catAccordion:eq(0)", 0);
    initAccordMenu("#gridCenter .catAccordion:eq(1)", 0);
    initAccordMenu("#gridBottom .catAccordion:eq(1)", 0);
    initAccordMenu("#gridCenter .catAccordion:eq(2)", 0);
    initAccordMenu("#gridBottom .catAccordion:eq(2)", 0);
    initAccordMenu(".accordionModule:eq(0)", 0);
    initAccordMenu(".accordionModule:eq(1)", 0);
    initAccordMenu(".accordionModule:eq(2)", 0);
    initAccordMenu(".accCenterModule", 0);
    $(".hpsAcc").each(function () {
        var $parThis = $(this);
        $(".accExpand", $parThis).click(function (e) {
            var $childThis = $(this);
            $(".catAccordion ul", $parThis).slideDown("slow", function () {
                equalHeight($("#gridRight, #gridCenter, #gridLeft"))
            }).parent().addClass("expanded");
            $childThis.hide();
            $(".accDefault", $parThis).show();
            e.preventDefault()
        });
        $(".accDefault", $parThis).click(function (e) {
            var $childThis1 = $(this);
            $(".catAccordion ul", $parThis).slideUp("slow", function () {
                equalHeight($("#gridRight, #gridCenter, #gridLeft"))
            }).parent().removeClass("expanded");
            $childThis1.hide();
            $(".accExpand", $parThis).show();
            e.preventDefault()
        })
    });
    $("#gridRight .rightModule ul.bulleted").parent().addClass("rightBulleted");
    $("#gridRight .rightModule ul.bigBulleted").parent().addClass("rightBigBulleted");
    $("#gridRight .rightModule ul.nonBulleted").parent().addClass("rightNonBulleted");
    $("#gridRight .rightModule ul.imageBulleted").parent().addClass("rightImageBulleted");
    $("#gridRight .rightModule.gradientBg").removeClass("rightBigBulleted");
    $("#gridRight .rightModule.gradientBg ul.imageBulleted").parent().removeClass("gradientBg").removeClass("rightImageBulleted").addClass("rightGradImageBulleted");
    $("#gridRight .rightModule.rightBigBulleted.rightNonBulleted").removeClass("rightBigBulleted").removeClass("rightNonBulleted").addClass("rightBigNonBulleted");
    $("#gridLeft .leftModule ul.bigBulleted").parent().addClass("leftBigBulleted");
    $("#gridLeft .leftModule ul.nonBulleted").parent().addClass("leftNonBulleted");
    $("#gridLeft .leftModule ul.imageBulleted").parent().addClass("leftImageBulleted");
    $(".tabModule").each(function () {
        var $thisPar = $(this);
        $(".tabContainer .tabModContent", $thisPar).each(function (e) {
            var $tChild = $(this);
            if ($("ul", $tChild).length < 1) {
                var z = $(".tabContainer .tabModContent", $thisPar).index($tChild);
                $(".tabList li", $thisPar).eq(z).remove();
                $(this).remove()
            }
        });
        $(".tabModContent", $thisPar).hide();
        $("ul.tabList li:first", $thisPar).addClass("active").show();
        $(".tabModContent:first", $thisPar).show();
        $("ul.tabList li", $thisPar).click(function () {
            var $thisChild = $(this);
            var findIndex = $("ul.tabList li", $thisPar).index(this);
            $("ul.tabList li", $thisPar).removeClass("active");
            $thisChild.addClass("active");
            $(".tabModContent", $thisPar).hide();
            $(".tabModContent", $thisPar).eq(findIndex).fadeIn();
            equalHeight($("#gridRight, #gridCenter, #gridLeft"));
            return false
        })
    });
    if ($(".indusProdContent").length) {
        $("#prodFilterSelect option").eq(0).attr("selected", true);
        $(".indusProdContent").hide();
        if ($(".indusProdOverview").length === 0) {
            $("#prodFilterSelect option").eq(1).attr("selected", true);
            $(".indusProdContent").show()
        }
        $("#prodFilterSelect").change(function () {
            var idx = document.getElementById("prodFilterSelect").selectedIndex;
            if ($(".indusProdOverview").is(":visible") && idx != 0) {
                $(".indusProdOverview").slideUp("slow", function () {
                    indusProducts()
                })
            } else {
                indusProducts()
            }
        });
        if ($(".prodOverviewLink").length) {
            $(".prodOverviewLink a").click(function (e) {
                e.preventDefault();
                $(".indusProdOverview").slideToggle("slow");
                $(".prodOverviewLink a").toggleClass("inActive");
                var $tClass = $(this).attr("class");
                if ($("#prodFilterSelect").length) {
                    var idx = document.getElementById("prodFilterSelect").selectedIndex;
                    if (idx == 0) {
                        $("#prodFilterSelect option:eq(1)").attr("selected", true)
                    } else {
                        if ($tClass == "" && idx != 0) {
                            $("#prodFilterSelect option:eq(0)").attr("selected", true)
                        }
                    }
                }
                indusProducts()
            })
        } else {
            $("#prodFilterSelect option").eq(1).attr("selected", true);
            $(".indusProdContent").show()
        }
        var selSize = $("#prodFilterSelect option").size();
        if (selSize == 2) {
            $("#prodFilterSelect").remove()
        }
    }
    if ($(".moduleOverviewLink").length) {
        $(".categoryWrap ul").slideUp(100);
        $(".moduleOverviewLink a").click(function (e) {
            e.preventDefault();
            $(".moduleOverviewLink a").toggleClass("inActive");
            var divPos = $(".categoryWrap .moduleOverview").css("position");
            var divHeight = $(".indusProdContainer").css("height");
            if (divPos == "relative") {
                $(".categoryWrap .moduleOverview").slideToggle("slow", function () {
                    $(".categoryWrap .moduleOverview").css("position", "absolute")
                });
                $(".categoryWrap ul").slideToggle("slow", function () {
                    equalHeight($("#gridRight, #gridCenter, #gridLeft"))
                })
            }
            if (divPos == "absolute") {
                $(".categoryWrap ul").slideToggle("slow");
                $(".categoryWrap .moduleOverview").slideToggle("slow");
                $(".categoryWrap .moduleOverview").css("position", "relative");
                equalHeight($("#gridRight, #gridCenter, #gridLeft"))
            }
        })
    }
    if ($(".detailAccModule").length) {
        $(".detailAccModule").each(function (x) {
            var $tParent = $(this);
            $(">ul", $tParent).each(function (y) {
                var $tChild = $(this);
                $($tChild).addClass("deActive");
                $(">ul", $tParent).addClass("deActive");
                $(">ul", $tParent).eq(0).removeClass("deActive").addClass("active");
                $(">ul.deActive .detModImage, >ul.deActive .detModDesc", $tParent).hide();
                var thisInActHeight = $($tChild).outerHeight();
                var thisActHeight = $($tChild).outerHeight();
                $tChild.click(function (z) {
                    if ($(this).attr("class") == "detModule deActive") {
                        $(">ul", $tParent).removeClass("active").removeClass("deActive");
                        $(">ul .detModImage, >ul .detModDesc", $tParent).slideUp(function () {
                            equalHeight($("#gridRight, #gridCenter, #gridLeft"))
                        });
                        $(">ul", $tParent).addClass("deActive");
                        $tChild.removeClass("deActive").addClass("active");
                        $(".detModImage, .detModDesc", $tChild).slideDown(function () {
                            equalHeight($("#gridRight, #gridCenter, #gridLeft"))
                        })
                    } else {
                        $(">ul", $tParent).removeClass("active").addClass("deActive");
                        $(">ul .detModImage, >ul .detModDesc", $tParent).slideUp(function () {
                            equalHeight($("#gridRight, #gridCenter, #gridLeft"))
                        })
                    }
                })
            })
        })
    }
    if ($("#srchPgForm").length) {
        var allWords = "",
            exactWords = "",
            moreWords = "";
        $("#wrdsField").keyup(function () {
            allWords = trimThis($(this).val());
            outPut()
        });
        $("#exactField").keyup(function () {
            exactWords = trimThis($(this).val());
            if (exactWords != "") {
                exactWords = '"' + exactWords + '"'
            }
            outPut()
        });
        $("#moreField").keyup(function () {
            moreWords = trimThis($(this).val());
            moreWords = moreWords.replace(/\s/g, " OR ");
            outPut()
        });

        function outPut() {
            strV = allWords + " " + exactWords + " " + moreWords;
            strV = strV.replace(/^\s\s*/, "").replace(/\s\s*$/, "");
            $("#searchTerm").val(strV)
        }
        $("#moreSearch").hide();
        $("#srchNeedMore").click(function () {
            $("#moreSearch").toggle("slow");
            $(this).toggleClass("active");
            return false
        });
        $("#searchLink, #srchPageBtn").click(function () {
            if ($("#srchPageLink").val() == $("#srchPageLinkTemp").val()) {
                $("#srchPageLink").val("");
                return true
            }
            return true
        })
    }
    $(".tipBtn1,.tipBtn2,.tipBtn3").click(function () {
        $(".tips1,.tips2,.tips3").hide();
        var btnClass = $(this).attr("class").replace("tipBtn", "");
        $(".tips" + btnClass).show()
    });
    $(".tips1 .closeTips, .tips2 .closeTips,.tips3 .closeTips").click(function () {
        var btnClass = $(this).parent().attr("class").replace("tips", "");
        $(".tips" + btnClass).hide()
    });
    if ($("#gridLeft #navlist").length) {
        $("body").addClass("withLeftNav")
    }
    if ($(".relatedDownload").length) {
        $(".relatedDownload a").each(function (e) {
            var fileType = $(this).attr("href").substr(($(this).attr("href").lastIndexOf(".") + 1));
            $(this).prev().addClass(fileType)
        })
    }
    if ($(".insightSection").length) {
        $(".insightSection").each(function () {
            var $mThis = $(this);
            var $docType = $("h3 a", $mThis).attr("href");
            var $ext = $docType.substr($docType.lastIndexOf(".") + 1);
            $(".icons", $mThis).addClass($ext)
        })
    }
    $("#searchBanner").insertAfter("#topMenu");
    if (($(".prodCol1").length == 1) && ($(".prodCol2").length == 0)) {
        $(".prodCol1").css("width", "100%");
        $(".prodCol1").css("border-left", "0");
        $(".prodCol1").css("padding-left", "0")
    }
    if (($(".prodCol1").length == 0) && ($(".prodCol2").length == 1)) {
        $(".prodCol2").css("width", "100%");
        $(".prodCol2").css("border-left", "0");
        $(".prodCol2").css("padding-left", "0")
    };
    equalHeight($("#gridRight, #gridCenter, #gridLeft"));
    $('a').each(function () {
     if($(this).attr("href")){
        var point = $(this).attr('href').lastIndexOf('.');
        var fileType = $(this).attr('href').substr(point);
        if (fileType == '.doc' || fileType == '.pdf' || fileType == '.xls' || fileType == '.ppt' || fileType == '.ppt' || fileType == '.swf' || fileType == '.vid' || fileType == '.calc') {
            $(this).attr('target', '_blank')
        }
        }
    })
});
var oldBodyOnLoad = window.onload;
window.onload = function () { };

function indusProducts() {
    if ($("#prodFilterSelect").length) {
        var idx = document.getElementById("prodFilterSelect").selectedIndex;
        if (idx == 1) {
            $(".indusProdContent").slideDown("slow", function () {
                equalHeight($("#gridRight, #gridCenter, #gridLeft"))
            });
            $(".prodOverviewLink a").addClass("inActive")
        } else {
            if (idx == 0) {
                $(".indusProdContent").slideUp();
                $(".indusProdOverview").slideDown("slow", function () {
                    equalHeight($("#gridRight, #gridCenter, #gridLeft"))
                });
                $(".prodOverviewLink a").attr("class", "")
            } else {
                if (idx > 1) {
                    $(".indusProdContent").slideUp().eq(idx - 2).slideDown("slow", function () {
                        equalHeight($("#gridRight, #gridCenter, #gridLeft"))
                    });
                    $(".prodOverviewLink a").addClass("inActive")
                } else {
                    $(".indusProdContent").slideUp().eq(idx).slideDown("slow", function () {
                        equalHeight($("#gridRight, #gridCenter, #gridLeft"))
                    })
                }
            }
        }
    } else {
        $(".indusProdContent").slideDown(function () {
            equalHeight($("#gridRight, #gridCenter, #gridLeft"))
        })
    }
}
function equalHeight(group) {
	return true;
    // var obj = $.browser.msie;
    // var objv = $.browser;
    // if (obj && objv.version < 7) {
       // group.each(function () {
         //   $(this).height("0px")
      //  });
//        var tallest = 0;
 //       group.each(function () {
//            var thisHeight = $(this).height();
//            if (thisHeight > tallest) {
//                tallest = thisHeight
//            }
//        });
//        group.each(function () {
//            $(this).height(tallest)
//        })
//    } else {
//        group.each(function () {
//           $(this).height("auto")
//        });
//        var tallest = 0;
//        group.each(function () {
//            var thisHeight = $(this).height();
//            if (thisHeight > tallest) {
//               tallest = thisHeight
//            }
//        });
//        group.each(function () {
//            $(this).height(tallest - 30)
//        })
//    }
}
function slideIn(element, speed) {
    $(element).next().hide();
    $(element).click(function (e) {
        e.preventDefault();
        $(this).parent().toggleClass("activated");
        $(this).next().slideToggle("speed", function () {
            equalHeight($("#gridRight, #gridCenter, #gridLeft"))
        })
    })
}
function addClass() {
    $("body").addClass("pagePreLoad")
}
function initAccordMenu(accorElemt, sel) {
    $("" + accorElemt + ">li").each(function () {
        $(this).hover(function () {
            $(this).addClass("hOver")
        }, function () {
            $(this).removeClass("hOver")
        })
    });
    $("" + accorElemt + " ul").hide().eq(sel).show().parent().addClass("expanded");
    $("" + accorElemt + " li div").click(function () {
        var checkElement = $(this).next();
        if ((checkElement.is("ul")) && (!checkElement.is(":visible"))) {
            $("" + accorElemt + " ul:visible").slideUp("slow", function () {
                equalHeight($("#gridRight, #gridCenter, #gridLeft"))
            }).parent().removeClass("expanded");
            checkElement.slideDown("slow", function () {
                equalHeight($("#gridRight, #gridCenter, #gridLeft"))
            }).parent().addClass("expanded")
        }
    })
}
function initSimpleAccordMenu(accorElemt, sel) {
    equalHeight($("" + accorElemt + " > li > div"));
    $("" + accorElemt + " ul").hide();
    $("" + accorElemt + " li div").click(function () {
        $(this).next().slideToggle("normal")
    })
}
function trimThis(str) {
    return str = str.replace(/^\s\s*/, "").replace(/\s\s*$/, "").replace(/\s{2,}/g, " ")
}
try {
    document.execCommand("BackgroundImageCache", false, true)
} catch (e) { }
function showSection(x) {
    var bcID = "section" + x;
    document.getElementById(bcID).style.display = "block";
    if (document.getElementById("DivShim")) {
        DivSetVisible(true, document.getElementById(bcID))
    }
}
function hideSection(x) {
    var bcID = "section" + x;
    document.getElementById(bcID).style.display = "none";
    if (document.getElementById("DivShim")) {
        document.getElementById("DivShim").style.display = "none"
    }
}
$.getScript = function (url, callback, cache) {
    $.ajax({
        type: "GET",
        url: url,
        success: callback,
        dataType: "script",
        cache: true
    })
};
$(function () {
    if ($('#gridRight a[href*=".swf"], #gridRight a[href*="youtube.com/embed/"], #gridTop a[href*="youtube.com/embed/"], #gridTop a[href*=".swf"], #gridCenter a[href*="youtube.com/embed/"], #gridCenter a[href*=".swf"], #gridCenter a[href*="/embed"], #gridBottom a[href*=".swf"], #gridLeft a[href*=".swf"], #gridBottom a[href*="youtube.com/embed/"], #gridLeft a[href*="youtube.com/embed/"]').length) {
        $.getScript("http://www-111.chartisinsurance.com/js/showFlash.js");
        $('#gridRight a[href*=".swf"], #gridTop a[href*=".swf"], a[href*="youtube.com/embed/"], #gridCenter a[href*=".swf"], #gridBottom a[href*=".swf"], #gridLeft a[href*=".swf"]').click(function (e) {
            e.preventDefault();
            var $src = $(this).attr("href"),
                vidWidth = gup("width", $src),
                vidHeight = gup("height", $src),
                $contentBlocks = '<div id="overLayBg"></div><div id="overLayBlock"><div id="overLayContent"><a class="closeLayer" href="#Close"></a></div></div>';
            $("body").prepend($contentBlocks);
            $("#overLayBg").css("display", "block");
            $("#overLayBlock").css("display", "block");
            if (vidHeight == "") { vidHeight = "360" };
            if (vidWidth == "") { vidWidth = "640" };
            $("#overLayContent").css("height", "" + vidHeight + "px").css("width", "" + vidWidth + "px").center();
            var $strVar = '<div id="flashBanner1" style="width:' + vidWidth + "px;height:" + vidHeight + 'px"><strong>You need to upgrade your Flash Player.</strong></br>Please download the latest version of flash player from <a href="http://www.adobe.com/go/getflash/">here</a>.</div>';

            if ($('a[href*="youtube.com/embed/"]').length) {
                $src = $src + "&autoplay=1&origin=" + location.hostname;

                var $strVar = '<div id="flashBanner1" style="width:' + vidWidth + "px;height:" + vidHeight + 'px"><iframe width="' + vidWidth + '" height="' + vidHeight + '" type="text/html" src="' + $src + '" frameborder="0" allowfullscreen></iframe></div>';
                $("#overLayContent").append($strVar);
            } else {
                $("#overLayContent").append($strVar);
                var so = new showFlash($src, "flashBanners", vidWidth, vidHeight, "9", "");
                so.addParam("allowScriptAccess", "always");
                so.addParam("wmode", "opaque");
                so.addParam("swliveconnect", "true");
                so.write("flashBanner1");
            }
            fullHeightOn();
            $("#overLayContent a").click(function (e1) {
                e1.preventDefault();
                
                $("#overLayBlock, #overLayBg").hide().remove();
				$("#flashBanner1").html("");
            });
            if ($("#overLayBg").is(":visible")) {
                $(window).bind("resize", function () {
                    fullHeightOn();
                    $("#overLayContent").center()
                })
            } else {
                $(window).unbind("resize")
            }
        })
    }
});
jQuery.fn.center = function () {
    this.css("position", "absolute");
    this.css("top", ($(window).height() - this.height()) / 2 + $(window).scrollTop() + "px");
    this.css("left", ($(window).width() - this.width()) / 2 + $(window).scrollLeft() + "px");
    return this
};

function fullHeightOn() {
    $("#overLayBg").height("" + getDocHeight() + "px").width("" + getDocWidth() + "px")
}
function getDocHeight() {
    return Math.max($(document).height(), $(window).height(), $("#body_wrapper").outerHeight(true), document.documentElement.clientHeight)
}
function getDocWidth() {
    return Math.max($("body").width(), $(window).width(), $("#body_wrapper").outerWidth(true), document.documentElement.clientWidth)
}
function gup(name, src) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)",
        regex = new RegExp(regexS),
        results = regex.exec(src);
    if (results == null) {
        return ""
    } else {
        return results[1]
    }
}
if ($.browser.msie) {
    e = "header,menu,nav,footer,abbr,article,aside,audio,canvas,datalist,details,eventsource,figure,hgroup,mark,meter,output,progress,section,time,video";
    x = e;
    e = e.split(",");
    i = e.length;
    while (i--) {
        document.createElement(e[i])
    }
};

// DivOverLay Function for leadership 
function OverLayDivPopup(eventObject) {
	
	jQuery.fn.center = function () {
    this.css("position", "absolute");
    this.css("top", ($(window).height() - this.height()) / 4 + $(window).scrollTop() + "px");
    this.css("left", ($(window).width() - this.width()) / 2 + $(window).scrollLeft() + "px");
    return this
};

    var $src = $(eventObject).attr("href"),
        vidWidth = 500,
        vidHeight = '100%',
        $contentBlocks = '<div id="overLayBg"></div><div id="overLayBlock"><div id="overLayContent"><a class="closeLayer1" href="#Close"></a></div></div>';
    $("body").prepend($contentBlocks);
    $("#overLayBg").css("display", "block").css("z-index", 1000);
    $("#overLayBlock").css("display", "block").css("z-index", 1000);
    $("#overLayContent").css('height', 'auto').css("width", "" + vidWidth + "px").center().css("padding-left", 20 + "px").css("padding-right", 20 + "px").css("padding-top", 20 + "px").css("padding-bottom", 10 + "px");
    var divname = eventObject.id + 'div';
    var content = document.getElementById(divname).innerHTML;
    var $strVar = '<div id="flashBanner1" style="width:' + vidWidth + "px;height:" + vidHeight + 'px">' + content + '</div>';
    $("#overLayContent").append($strVar);
    fullHeightOn();
    $("#overLayContent a").click(function (e1) {
        e1.preventDefault();
       
        $("#overLayBlock,#overLayBg").hide().remove();
    $("#flashBanner1").html("");
   });
    if ($("#overLayBg").is(":visible")) {
        $(window).bind("resize", function () {
            fullHeightOn();
            $("#overLayContent").center()
        })
    } else {
        $(window).unbind("resize")
    }
};
function buildPromoLinks() {
    var fileLink,iframeSrc;
    var queryStr = window.location.search.substring(1);
    if (queryStr != null && queryStr != "") { 
// if querystring exists only , append to all the hrefs
        if (document.getElementsByTagName('a')) {
            for (var i = 0; (fileLink = document.getElementsByTagName('a')[i]); i++) {
                if (fileLink.href.indexOf('?') != -1) { 
// if the link has already querystring then append value with &
                    fileLink.href = fileLink.href + '&' + queryStr;
                } else { 
// if the link does not have querystring then add querystring
                    if (fileLink.href != "" || fileLink.href != "#") {
if ( (fileLink.href.indexOf('javascript'.toLowerCase()) != 0) && (fileLink.href.indexOf('mailto'.toLowerCase()) != 0) ) {
                            fileLink.href = fileLink.href + '?' + queryStr;
                        }
                    } // end file is not null
                }
            } // end for loop for a tags
        } // end if document a tags

        if (document.getElementsByTagName('iframe')) {
                    for (var i = 0; (iframeSrc = document.getElementsByTagName('iframe')[i]); i++) {
                        if (iframeSrc.src.indexOf('?') != -1) { 
// if the link has already querystring then append value with &
                            iframeSrc.src = iframeSrc.src + '&' + queryStr;
                        } else { 
// if the link does not have querystring then add querystring
if (iframeSrc.src != "" || iframeSrc.src != "#" || iframeSrc.src.indexOf('javascript'.toLowerCase()) > 0 || iframeSrc.src.indexOf('mailto'.toLowerCase()) > 0) {
                                iframeSrc.src = iframeSrc.src + '?' + queryStr;
                            }
                        }
                    } // end for loop for iframe tags
        } // end if document iframe tags

    } // end if queryStr
}
// call the javascript function after window loads
var previousOnload = window.onload;
window.onload = function() {
    if (previousOnload) {
        previousOnload();
    }
    buildPromoLinks();
}
function loadPhoneNumber(name) {
var cmpid = decodeURI((RegExp(name + '=' + '(.+?)(&|$)').exec(location.search) || [, 'ALLADT'])[1]);
var lead_value = cmpid;
if (cmpid == 'ACC' || cmpid == 'acc') {
lead_value = 'Agent Client campaign';
}
if (cmpid == 'BAC' || cmpid == 'bac') {
lead_value = 'Banner Ad';
}
if (cmpid == 'CAC' || cmpid == 'cac') {
lead_value = 'Classified Ad';
}
if (cmpid == 'CMC' || cmpid == 'cmc') {
lead_value = 'Direct Mail';
}
if (cmpid == 'KAC' || cmpid == 'kac') {
lead_value = 'Keyword Ad';
}
if (cmpid == 'KNC' || cmpid == 'knc') {
lead_value = 'Keyword network campaign (Paid Key Word)';
}
if (cmpid == 'LEC' || cmpid == 'lec') {
lead_value = 'Link Exchange';
}
if (cmpid == 'NLC' || cmpid == 'nlc') {
lead_value = 'Newsletter';
}
if (cmpid == 'PAC' || cmpid == 'pac') {
lead_value = 'Print Ad';
}
if (cmpid == 'RAC' || cmpid == 'rac') {
lead_value = 'Rich Media Ad';
}
if (cmpid == 'SPC' || cmpid == 'spc') {
lead_value = 'Sponsorship';
}
if (cmpid == 'OTC' || cmpid == 'otc') {
lead_value = 'Other';
}
if (cmpid == 'SRC' || cmpid == 'src') {
lead_value = 'Search';
}
if (cmpid == 'DIS' || cmpid == 'dis') {
lead_value = 'Display';
}
if (cmpid == 'AFC' || cmpid == 'afc') {
lead_value = 'Affiliate';
}
if (cmpid == 'EMC' || cmpid == 'emc') {
lead_value = 'E-mail';
}
if (cmpid == 'FCB' || cmpid == 'fcb') {
lead_value = 'Facebook Ad';
}
if (cmpid == 'TRG' || cmpid == 'trg') {
lead_value = 'Retargeting';
}
if (cmpid == 'ITD' || cmpid == 'itd') {
lead_value = 'International Display Ad';
}
if (cmpid == 'AFC' || cmpid == 'afc' || cmpid == 'EMC' || cmpid == 'emc') {
$('#gridRight .gradientBg').css('display', 'none');
} else {
$('#gridRight .gradientBg').css('display', 'block');
}
$('#leadsource').val(lead_value);
}
$(document).ready(function () {
loadPhoneNumber('cmpid');
// adding cmd value to the returnURL vale
var URL = window.location.href;
var cmpindex = URL.indexOf('cmpid=');
var pos = URL.indexOf('?');
var nstr = URL.slice(pos);
var returl = $('#retURL').attr('value');
if(cmpindex==-1) {
$('#retURL').attr('value', returl + '?cmpid=OTC');
}else {
$('#retURL').attr('value', returl + nstr);
/* $('a').each(function(){
	var href=$(this).attr('href');
	if(href!='#'){
	href=href+nstr;
	$(this).attr('href', href);
	}
}); */
}
});

/*----------- Banner Script---------------
------------------------------------------ */
$(document).ready(function () {
    if ($("#segmentBanner").length || $("#segmentBannerVert").length || $("#segmentBanner").length || $("#infoBanner").length) {
        $("body").addClass("hasBanner");
		//$("#gridRight").css('height','auto');
		//$("#gridCenter").css('height','auto');
    }	
    if ($("#segmentBanner #thumbnail").length) {
        $("#segmentBanner #thumbnail .thumblist li").each(function (x) {
            if ($("img", $(this)).length < 1) {
                $(this).addClass("noImage")
            }
        });
        thumbSection("thumbnail");
        //carousal("#segmentBanner #thumbnail", 5);
		carousalLocal("#segmentBanner #thumbnail", $("#segmentBanner #thumbnail li").length);
        /*$(".bnrDesc a").click(function () {
            $("#thumbnail ul li").removeClass("on");
            $(".bannerSection").hide();
            $(".defaultBannerSection").show()
        })*/
    }
    if ($("#thumbnail").length) {
        thumbSection("thumbnail")
    }
    if ($("#footerSecDetails").length) {
        // carousalLocal("#footerSecDetails", 5);  
        $("#footerSecDetails ul.thumblist > li").each(function () {
            var $parThis = $(this),
                $childSize = $("ul", $parThis).size();
            if ($childSize >= 2) {
                $parThis.attr("class", "cols" + $childSize + "")
            }
        })
    }
    if ($(".moduleCarSection .moduleCarDtls").length) {
        $(".moduleCarSection .moduleCarDtls").each(function (z) {
            $(this).attr("id", "moduleCarousal" + z + "");
            carousal("#moduleCarousal" + z + "", 1)
        })
    }
    $(".bannerSection").eq(0).css("z-index", "1");
	$(".bannerSection:gt(0)").hide();
	$(".defaultBannerSection").hide();
	$(".bannerSection").eq(0).css("display", "block");
    $("#segmentBanner .bannerSection").each(function (x) {
        $(".bnrSectionDesc ul li a", this).each(function (y) {
            $(this).click(function (z) {
                z.preventDefault();
                showPop(x, (y + 1))
            })
        })
    });
    $(".popClose a").click(function (e) {
        hidePop();
        e.preventDefault()
    });
    $(".poprgt").click(function (e) {
        e.preventDefault();
        var openItem = $(".popBox:visible");
        var x = $(".popBox").index(openItem);
        var popNumber = $("#popBox" + x + " .popHolder > div").size();
        var popDisplay = popNumber - 1;
        var popWidth = $("#popBox" + x + " .popText1").outerWidth(true);
        var popPanelWidth = $("#popBox" + x + " .popHolder > div").size() * popWidth + 20;
        $("#popBox" + x + " .popHolder").width(popPanelWidth);
        var popLeft = $("#popBox" + x + " .popHolder").css("margin-left").replace("px", "");
        var animDetect = popLeft % popWidth;
        if (popLeft > -(popDisplay * popWidth) && (animDetect == 0)) {
            $("#popBox" + x + " .popHolder").animate({
                marginLeft: "-=" + popWidth
            }, 1000);
            $("#popBox" + x + " .poplft").fadeTo("fast", 1);
            if (popLeft / popWidth == 1 - popDisplay) {
                $("#popBox" + x + " .poprgt").fadeTo("fast", 0.2)
            }
        }
    });
    $(".poplft").click(function (e) {
        e.preventDefault();
        var openItem = $(".popBox:visible");
        var x = $(".popBox").index(openItem);
        var popNumber = $("#popBox" + x + " .popHolder > div").size();
        var popDisplay = popNumber - 1;
        var popWidth = $("#popBox" + x + " .popText1").outerWidth(true);
        var popPanelWidth = $("#popBox" + x + " .popHolder > div").size() * popWidth + 20;
        $("#popBox" + x + " .popHolder").width(popPanelWidth);
        var popLeft = $("#popBox" + x + " .popHolder").css("margin-left").replace("px", "");
        var animDetect = popLeft % popWidth;
        if (popLeft < 0 && (animDetect == 0)) {
            $("#popBox" + x + " .popHolder").animate({
                marginLeft: "+=" + popWidth
            }, 1000);
            $("#popBox" + x + " .poprgt").fadeTo("fast", 1);
            if (popLeft / popWidth == -1) {
                $("#popBox" + x + " .poplft").fadeTo("fast", 0.2)
            }
        }
    });
    if ($("#navBannerVert").length) {
        $(".bannerSection:eq(0)", "#navBannerVert").show()
    }
	$('#segmentBanner .bannerSection').append('<img class="whiteFinder" alt="" src="/aig/internet/en/ae/whiteFinder_tcm3699-480855.png" />');
});

function showSlide(imgID, carouselID) {
    var parentID = $("" + carouselID + "").parents("div").attr("id");
    $("#" + parentID + " > div").hide();
    $("#" + parentID + " > span > div").hide();
    $("#" + parentID + " .bannerSection").eq(imgID).show();
    $("" + carouselID + "").show()
}
function hidePop() {
    $("#popContent,#popBg,.popBox").hide()
}
function showPop(x, y) {
    $("#popContent, #popBg, #popBox" + x + "").show();
    var popWidth = $("#popBox" + x + " .popText1").outerWidth(true);
    var popPanelWidth = $("#popBox" + x + " .popHolder > div").size() * popWidth + 20;
    $("#popBox" + x + " .popHolder").width(popPanelWidth);
    var popleft = -(y - 1) * popWidth;
    $("#popBox" + x + " .popHolder").css("margin-left", popleft);
    if (y == 1) {
        $("#popBox" + x + " .poplft").css("opacity", 0.2);
        $("#popBox" + x + " .poprgt").css("opacity", 1)
    } else {
        if (y == $("#popBox" + x + " .popHolder > div").length) {
            $("#popBox" + x + " .poprgt").css("opacity", 0.2);
            $("#popBox" + x + " .poplft").css("opacity", 1)
        } else {
            $("#popBox" + x + " .poprgt").css("opacity", 1);
            $("#popBox" + x + " .poplft").css("opacity", 1)
        }
    }
    if ($("#popBox" + x + " .popHolder > div").length == 1) {
        $("#popBox" + x + " .poplft").css("opacity", 0.2);
        $("#popBox" + x + " .poprgt").css("opacity", 0.2)
    }
}
var Count=0,  myInterval, runImidiatelly = false;
function carousalLocal(carouselID, displayCount) {
    var thmbWidth = $("" + carouselID + " ul.thumblist li").outerWidth(true);
    $("" + carouselID + " ul.thumblist >li").each(function () {
        if ($(this).outerWidth(true) < thmbWidth) {
            thmbWidth = $(this).outerWidth(true)
        }
    });

    if (carouselID != "#footerSecDetails") {
        if ($("" + carouselID + " ul.thumblist > li").size() <= displayCount) {
            $("" + carouselID + " .btnlft, " + carouselID + " .btnrgt").css("visibility", "Hidden")
        }
    } else {
        var fthumblist = $("" + carouselID + " ul.thumblist").width();
        var fthumbholder = $("" + carouselID + " div.thumbholder").width();
        if (fthumblist <= fthumbholder) {
            $("" + carouselID + " .btnlft, " + carouselID + " .btnrgt").css("visibility", "Hidden")
        }
    }
    $("" + carouselID + " .btnlft").fadeTo("fast", 0.2);
	runImages();
}
function runImages(){
	if (runImidiatelly){
		setImage();
		runImidiatelly = false;
	}
	myInterval = setInterval(function(){
		if(Count == 99)
			return false;
		Count++;
		setImage();
	 }, 8000);
}
function setImage(){
	var thisMany = $('.bannerSection').length;
	if(Count > thisMany - 1)
		Count = 0;
	if(Count < 0)
		Count = thisMany - 1;

	$("#thumbnail ul li").removeClass("on");
	$("#thumbnail ul li").eq(Count).addClass("on");
	$('.bannerSection').fadeOut('slow');
	$('.bannerSection').eq(Count).fadeIn('slow');
}
function thumbSection(thumID) {
    if ($("#segmentBanner").length) {
        $("#" + thumID + " ul li").eq(0).attr("class", "on");
    }
    $("#" + thumID + " ul li").each(function (z) {
        var $tThis = $(this);
        $tThis.attr("id", "carImg" + z + 1 + "").hover(function () {
            $tThis.addClass("hover")
        }, function () {
            $tThis.removeClass("hover")
        }).click(function (e) {
            e.preventDefault();
			$("#" + thumID + " ul li").removeClass("on");	
			$tThis.attr("class", "on");
			showSlide($("#" + thumID + " ul li").index($tThis), "#" + thumID + "")
			//Count=$("#" + thumID + " ul li").index($tThis)-1;
			Count = 99;	
        })
    })
};
$(document).ready(function () {
   $("#topMenu").insertAfter("#mastHead");
});
function equalHeight(group) {
      var obj = $.browser.msie;
      var objv = $.browser;
	  
      if(obj && objv.version < 7){
		group.each(function() {
			$(this).addClass('IE');
		});			  
	  }
	  else{
		group.each(function() {
			//$(this).addClass('nonIE');
		});	
	  };
	var tallest = 0;
	group.each(function() {
		var thisHeight = $(this).height();
		if(thisHeight > tallest) {
			tallest = thisHeight;
		}
	});
	//group.height(tallest);	
	group.each(function() {
		$(this).css('height',tallest);
	});	
}

/*-------------- Last-Child -------------------
-----------------------------------------------*/

$(document).ready(function(){
    $(".nonBulleted li:last-child").addClass('last-child')
});

/*-------------- Viewport ---------------------
-----------------------------------------------*/
$(document).ready(function(){
	$('head').append('<meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">');
});

/*------------Responsive Tables ---------------
-----------------------------------------------*/
$(document).ready(function() {
  var switched = false;
  var updateTables = function() {
    if (($(window).width() < 980) && !switched ){
      switched = true;
      $("table.customClass1").each(function(i, element) {
        splitTable($(element));
      });
      return true;
    }
    else if (switched && ($(window).width() > 980)) {
      switched = false;
      $("table.customClass1").each(function(i, element) {
        unsplitTable($(element));
      });
    }
  };
   
  $(window).load(updateTables);
  $(window).on("redraw",function(){switched=false;updateTables();}); // An event to listen for
  $(window).on("resize", updateTables);
   
	
	function splitTable(original)
	{
		original.wrap("<div class='table-wrapper' />");
		
		var copy = original.clone();
		copy.find("td:not(:first-child), th:not(:first-child)").css("display", "none");
		copy.removeClass("customClass1");
		
		original.closest(".table-wrapper").append(copy);
		copy.wrap("<div class='pinned' />");
		original.wrap("<div class='scrollable' />");

    setCellHeights(original, copy);
	}
	
	function unsplitTable(original) {
    original.closest(".table-wrapper").find(".pinned").remove();
    original.unwrap();
    original.unwrap();
	}

  function setCellHeights(original, copy) {
    var tr = original.find('tr'),
        tr_copy = copy.find('tr'),
        heights = [];

    tr.each(function (index) {
      var self = $(this),
          tx = self.find('th, td');

      tx.each(function () {
        var height = $(this).outerHeight(true);
        heights[index] = heights[index] || 0;
        if (height > heights[index]) heights[index] = height;
      });

    });

    tr_copy.each(function (index) {
      $(this).height(heights[index]);
    });
  }

});

/*
$(document).ready(function(){
	if(window.innerWidth-$(window).width()<5 && window.screen.width<768)
		var screenWidth=window.screen.width;
	else
		var screenWidth=$(window).width();
		
		if(screenWidth < 981){
		$('#mastHead').insertBefore('#body_wrapper');
		$('#topMenu').insertAfter('#mastHead');
		
		$('#siteSearch').toggle(function(){
			$('#body_wrapper').animate({left: $('#topMenu').width() +'px'});
		},function(){
			$('#body_wrapper').animate({left: 0});
		});
		
		}
	});
*/	

/*------------Responsive Menu ---------------
-----------------------------------------------*/
$(function() {

var bodyHTML ='<div id="bg"></div>';
$(bodyHTML).prependTo('body');

$('#mastHead #siteSearch').click(function (e) {
    e.preventDefault();
    var $bdy = $('#body_wrapper');
    $bdy.addClass('mobileMenu');
    $('#bg').show();
    $('#navContainer').css('z-index', '1001');
    resize();
});
$('#bg').click(function (e) {
    var $bdy = $('#body_wrapper');
    $bdy.removeClass('mobileMenu');
    $('#bg').hide();
    $('#navContainer').css('z-index', '0');
});

function resize() { 
    if ($('#bg').css('display') == 'block') {
        var bgHght = Math.max($('#body_wrapper').height(), $(document).height()) + 'px';
        $('#bg').css('height', bgHght);
    }
}   

     
});

/*------------Select Nav ---------------
-----------------------------------------------*/
$(function() {
       
      // Create the dropdown base
      $("<select />").appendTo(".catNav");

      // Create default option selected
      $("<option />", {
         "selected": "selected",
         "value"   : ""
      }).appendTo(".catNav select");

      $(".catNav li.active span").clone().appendTo("option[selected]");
      
      // Populate dropdown with menu items
      $(".catNav li a").each(function() {
       var el = $(this);
       $("<option />", {
           "value"   : el.attr("href"),
           "text"    : el.text()
       }).appendTo(".catNav select");
      });
      
       // To make dropdown actually work
      $(".catNav select").change(function() {
        window.location = $(this).find("option:selected").val();
      });
     
     });

/*------------Clickjacking ---------------
-----------------------------------------------*/
document.getElementsByTagName('html')[0].style.display='none';
if( self == top ) {
document.documentElement.style.display = 'block' ;
} else {
top.location = self.location ;
}

/*------------Carousel Fix ---------------
-----------------------------------------------*/
$(document).ready(function(){
    $(".defaultBannerSection").remove(); //remove default banner

    $("li#carImg01").removeClass("noImage").addClass("on"); //make first slide default

    //remove last 2 br tags
    for (var i = 0; i < 2; i++) {
        $("a.carBackBtn").prev().remove();
    }
});

/*---------Consumer/Commercial Redirect --------
-----------------------------------------------*/

$(document).ready(function() {
    var cookie = document.cookie;
    var referrer = document.referrer;
    var commercialURL = $(".utiNavSec li:eq(1) a").attr("href");
    var consumerURL = $(".utiNavSec li:eq(0) a").attr("href");
    var page = document.URL;
    var pageID = page.substr(-11);

    if (referrer.indexOf("aig") >= 0 && cookie.indexOf("segment=commercial") >= 0) {
        document.cookie="segment=consumer";
    }

        else if (consumerURL.indexOf(pageID) >= 0 && cookie.indexOf("segment=commercial") >= 0) {
            location.replace(commercialURL);
    }

    else {
        document.cookie="segment=consumer";
    };
});

