/*****************Netbooster*******************/

<!--Start of DoubleClick Floodlight Tag: Please do not remove-->
<!--Activity name of this tag: AIG Conversion Pixel (http://)-->
<!--URL of the webpage where the tag is expected to be placed: http://www.aigdirect.fi -->
<!--This tag must be placed between the <body> and </body> tags, as close as possible to the opening tag.-->
<!--Creation Date: 04/09/2013-->
var axel = Math.random() + "";
var a = axel * 10000000000000;
document.write('<iframe src="https://4109440.fls.doubleclick.net/activityi;src=4109440;type=invmedia;cat=qnizxjgx;ord=' + a + '?" width="1" height="1" frameborder="0" style="display:none"></iframe>');
<!-- End of DoubleClick Floodlight Tag: Please do not remove -->

/*****************End Netbooster*******************/

/*****************Natural Search*******************/

<!-- DoubleClick DART Natural Search Standard Tracking Tag for DS3 DFA Network - AIG - EU - DFA (5134) : DS Agency - AIG EU (20300000000000623) : DS Advertiser - Chartis Direct Finland (21700000000007533) Please do not remove -->
<!-- Tag should be placed at the top of the page, after opening body tag and before DoubleClick Spotlight or Floodlight tag(s)-->
<!-- Creation Date: 04-23-2012 -->
// DoubleClick DART Natural Search Tracking Code
var loc = document.location.href;
if(loc.indexOf("http://") != -1) 
{
	if (document.referrer){
	var ord = Math.random()*1000000000000;
	document.write('<SCRIPT language="JavaScript1.1" SRC="https://ad.doubleclick.net/adj/N5134.nso.codesrv/B7847462;dcadv=4242906;sz=1x2;ord=' + ord + '?"><\/SCRIPT>');
	}
}

/*****************End Natural Search*******************/

/*****************Retargeting*******************/

// Start of DoubleClick Floodlight Tag: Please do not remove
// Activity name of this tag: aigdirect.fi retargeting generic
// URL of the webpage where the tag is expected to be placed: https://www.aigdirect.fi/etusivu_3037_388910.html
// This tag must be placed between the <body> and </body> tags, as close as possible to the opening tag.
// Creation Date: 01/28/2014

var axel = Math.random() + "";
var a = axel * 10000000000000;
document.write('<iframe src="https://3638750.fls.doubleclick.net/activityi;src=3638750;type=retar309;cat=aigdi164;ord=' + a + '?" width="1" height="1" frameborder="0" style="display:none"></iframe>');

/*****************End Retargeting*******************/

/*****************Policy Message*******************/

//Change the URL to the location of the cookie policy.
var url="/Tietosuojakaytanto_3037_388929.html";

//Add background hex color
var bgColor = "#FDEEC5";

//Add Cookie Name
var cookieName = "fiPolicyDisplayed";


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
		$("#messageContent").append('<a class="closeMessage" href="#">Lopettaa</a>');
		$(".closeMessage").css({"display" : "block", "position" : "relative", "margin-left" : "875px", "margin-top" : "10px"});
		$("#policyMessage a").css({"color": "#00A4E4", "text-decoration" : "underline"});
		$(".closeMessage").click(function(){
		$("#policyMessage").hide();
			});
		$("#policyMessage").show();
	});
}

/*****************End Policy Message*******************/
