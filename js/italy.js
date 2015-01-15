/***************** Travel Guard Italy Retargeting ************************

Start of DoubleClick Floodlight Tag: Please do not remove
Activity name of this tag: TravelGuard.it homepage
URL of the webpage where the tag is expected to be placed: http://www.travelguard.it
This tag must be placed between the <body> and </body> tags, as close as possible to the opening tag.
Creation Date: 11/20/2009 */

var loc = document.location.href;
if(loc.indexOf("http://") != -1) {
	var axel = Math.random() + "";
	var a = axel * 10000000000000;
	document.write('<iframe src="http://fls.doubleclick.net/activityi;src=2540241;type=retar504;cat=trave671;ord=' + a + '?" width="1" height="1" frameborder="0"></iframe>');
}

/*********** End of Travel Guard Italy Retargeting Tag *****************/

/***************** Travel Guard Italy Natural Search *********************

DoubleClick DART Natural Search Standard Tracking Tag for DS3 DFA Network - AIG - EU - DFA (5134) : DS Agency - AIG EU (20300000000000623) : DS Advertiser - Travel Guard Italy (21300000000004968): Please do not remove
Web site URL to be tracked: http://www.Travelguard.it
Tag should be placed at the top of the page, after opening body tag and before DoubleClick Spotlight or Floodlight tag(s)
Creation Date: 03-18-2010 */

var loc = document.location.href;
if(loc.indexOf("http://") != -1) 
{
	if (document.referrer){
	var ord = Math.random()*1000000000000;
	document.write('<SCRIPT language="JavaScript1.1" SRC="http://ad.doubleclick.net/adj/N5134.nso.codesrv/B6148972;dcadv=3466816;sz=1x2;ord=' + ord + '?"><\/SCRIPT>');
	}
}

/************** End of Travel Guard Italy Natural Search Tag ************/

/******************** Consumer Italy Natural Search *********************

DoubleClick DART Natural Search Standard Tracking Tag for DS3
DFA Network - AIG - EU - DFA (5134) : DS Agency - AIG EU (20300000000000623) : DS Advertiser - Chartis Direct Italy (21700000000008881)
Creation Date: 06-12-2012 */

if (document.referrer){
var ord = Math.random()*1000000000000;
document.write('<SCRIPT language="JavaScript1.1" SRC="https://ad.doubleclick.net/adj/N5134.nso.codesrv/B6716559;dcadv=3710282;sz=1x2;ord=' + ord + '?"><\/SCRIPT>');
}

/************** Consumer Italy Natural Search Tag ************/

/***************** Consumer Italy Retargeting ************************/

var axel = Math.random() + "";
var a = axel * 10000000000000;
document.write('<iframe src="//3706550.fls.doubleclick.net/activityi;src=3706550;type=td_la549;cat=tdlan942;ord=' + a + '?" width="1" height="1" frameborder="0" style="display:none"></iframe>');

/************** Consumer Italy Retargeting Tag ************/

/*****************Policy Message*******************/

//Change the URL to the location of the cookie policy.
var url="/privacy-policy-italy_4011_623184.html";

//Add background hex color
var bgColor = "#FDEEC5";

//Add Cookie Name
var cookieName = "itPolicyDisplayed";


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
	$("#policyMessage").css({"display" : "none", "width" : "940px", "margin" : 0 + " auto", "background-color" : bgColor, "padding" : "20px 20px 10px"});
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

