/*****************Natural Search*******************/

/*DoubleClick DART Natural Search Standard Tracking Tag for DS3
DFA Network - AIG - DFA (4827) : DS Agency - AIG (20100000000000604) : DS Advertiser - AIG Direct Hungary (21700000000029573)
Please do not remove
Tag should be placed at the top of the page, after opening body tag and before DoubleClick Spotlight or Floodlight tag(s)
Creation Date: 10-23-2013 */
//Script updated for Tridion Sitewide Use.
// DoubleClick DART Natural Search Tracking Code
$(document).ready(function(){
if (document.referrer){
var ord = Math.random()*1000000000000;
$('body').prepend('<SCRIPT language="JavaScript1.1" SRC="https://ad.doubleclick.net/adj/N4827.nso.codesrv/B7920120.104358409;dcadv=4292934;sz=1x2;ord=' + ord + '?"><\/SCRIPT>');
}
});

/*****************End Natural Search*******************/

/*****************Policy Message*******************/

//Change the URL to the location of the cookie policy.
var url="/hasznalati-feltetelek_3118_405147.html";

//Add background hex color
var bgColor = "#FDEEC5";

//Add Cookie Name
var cookieName = "huPolicyDisplayed";


$(document).ready(function(){

	displayCookiePolicy();

	if($('.faqglosSection').length) {
		$('.faqglosSection > p.backTop').hide();
	}

});

function displayCookiePolicy()
{
var wasPolicyShown = readCookie(cookieName);
	if(!wasPolicyShown){
		createDiv();
		writeCookie(cookieName,"yes", 8766);	
	}
	else{
		//do nothing
	}		
}

function createDiv(){
	$contentBlocks = '<div id="policyMessage"><div id="messageContent"></div></div>';
	$("body").prepend($contentBlocks);
	$("#policyMessage").css({"display" : "none", "width" : "914px", "margin" : 0 + " auto", "background-color" : bgColor, "padding" : "20px 20px 10px"});
	$(".closeMessage").css({"display" : "block", "float" : "right"});
	populateDiv();
}

function populateDiv(){
	$("#messageContent").load(url + " .addOns > ul > li > div", function(){
		$("#messageContent").append('<a class="closeMessage" href="#">Close</a>');
		$(".closeMessage").css({"display" : "block", "position" : "relative", "margin-left" : "875px", "margin-top" : "10px"});
		$("#policyMessage a").css({"color": "#00A4E4", "text-decoration" : "underline"});
		$(".closeMessage").click(function(){
		$("#policyMessage").hide();
			});
		$("#policyMessage").show();
	});
}

/*****************End Policy Message*******************/
