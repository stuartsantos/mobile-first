var URLPath = "https://www-400.aig.ae";

function getQueryParamValue (name){
         name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
         var regexS = "[\\?&]" + name + "=([^&#]*)";
         var regex = new RegExp(regexS);
         var results = regex.exec(window.location.search);
         if (results == null) 
             return "";
         else 
             return decodeURIComponent(results[1].replace(/\+/g, " "));
}

function DTC_UAE_getCookie(w){
	cName = "";
	pCOOKIES = new Array();
	pCOOKIES = document.cookie.split('; ');
	for(bb = 0; bb < pCOOKIES.length; bb++){
		NmeVal  = new Array();
		NmeVal  = pCOOKIES[bb].split('=');
		if(NmeVal[0] == w){
			cName = unescape(NmeVal[1]);
		}
	}
	return cName;
}

function DTC_UAE_printCookies(w){
	cStr = "";
	pCOOKIES = new Array();
	pCOOKIES = document.cookie.split('; ');
	for(bb = 0; bb < pCOOKIES.length; bb++){
		NmeVal  = new Array();
		NmeVal  = pCOOKIES[bb].split('=');
		if(NmeVal[0]){
			cStr += NmeVal[0] + '=' + unescape(NmeVal[1]) + '; ';
		}
	}
	return cStr;
}

function DTC_UAE_setCookie(name, value, expires, path, domain, secure){
	document.cookie = name + "=" + escape(value) + "; ";
	
	if(expires){
		expires = setExpiration(expires);
		document.cookie += "expires=" + expires + "; ";
	}
	if(path){
		document.cookie += "path=" + path + "; ";
	}
	if(domain){
		document.cookie += "domain=" + domain + "; ";
	}
	if(secure){
		document.cookie += "secure; ";
	}
}

function DTC_UAE_setExpiration(cookieLife){
    var today = new Date();
    var expr = new Date(today.getTime() + cookieLife * 24 * 60 * 60 * 1000);
    return  expr.toGMTString();
}

(function(){
	var EBP_STAGING_DOMAIN='ebpstaging.aig.net';
	var EBP_LIVE_DOMAIN='www.aig.ae';
	var domain_name=window.location.host;
	var QA_ENV_COOKIE_VAL='QA';
	var MODL_ENV_COOKIE_VAL='MODL';
	var ENV_COOKIE_KEY='envName';
	var QA_TRANSACTION_DOMAIN='ftwldscimw124.r1-core.r1.aig.net:48540';
	var MODL_TRANSACTION_DOMAIN='www-400m.aig.ae';
	var PROD_TRANSACTION_DOMAIN='www-400.aig.ae';
	
	//Get the Query Parameter from the URL.
	var envName=getQueryParamValue('env');
	
	var isQAEnv=function(){
		//Get the Domain from Cookie also.
		var envFromCookie=DTC_UAE_getCookie(ENV_COOKIE_KEY);
		//We will check if the env is QA or not. If it is QA we will return true
		if(envName!=undefined && (envName=='QA' || envName=='qa') || envFromCookie==QA_ENV_COOKIE_VAL || domain_name==QA_TRANSACTION_DOMAIN){
			return true;
		}
		return false;
	};
	
	var isMODLEnv=function(){
		//We don't have to check for 'env' parameter in the URL here. We will just see if the domain is QA or not.
		//We also need to check if there is no cookie. 
		//TODO This cookie based approach can be confusing and can lead to issues in future. Need to have a better approach for this.
		var envFromCookie=DTC_UAE_getCookie(ENV_COOKIE_KEY);
		
		if(domain_name==EBP_STAGING_DOMAIN || domain_name==MODL_TRANSACTION_DOMAIN){
			return true;
		}
		return false;
	};
	
	var isPRODEnv=function(){
		if(domain_name==EBP_LIVE_DOMAIN || domain_name==PROD_TRANSACTION_DOMAIN){
			return true;	
		}
		return false;
	};
	
	//First preference is given to production.
	if(isPRODEnv()){
		//Check the domain once again. We don't nee to set it again since it is already set at the top.
		URLPath = "https://www-400.aig.ae";
	}
	else if(isQAEnv()){
		//It is QA environment
		URLPath='https://ftwldscimw124.r1-core.r1.aig.net:48540';
		DTC_UAE_setCookie(ENV_COOKIE_KEY,QA_ENV_COOKIE_VAL);
		//Set 	
	}else if(isMODLEnv()){
		//Since it is not QA and the domain is EBPStaging, it will be model
		URLPath='https://www-400m.aig.ae';	
		DTC_UAE_setCookie(ENV_COOKIE_KEY,MODL_ENV_COOKIE_VAL);
	}	
})();

if ($.browser.msie) {
    e = "header,menu,nav,footer,abbr,article,aside,audio,canvas,datalist,details,eventsource,figure,hgroup,mark,meter,output,progress,section,time,video";
    x = e;
    e = e.split(",");
    i = e.length;
    while (i--) {
        document.createElement(e[i])
    }
};
$(function(){
$('#breadCrumb').append('<span class="brSep">/</span><span class="bcModule"><a href="'+$('#subNav3 li.tabOnActive a').attr('href')+'">'+$('#subNav3 li.tabOnActive a').text()+'</a></span>');
	var reqText = $('#breadCrumb .bcModule:last a:first').text();
	var req2Text = $('#breadCrumb .bcModule:eq(1) a:first').text();
	var pageTitle = $('.pageTitle').text();
	if(trimText(reqText) == 'Car Insurance' || trimText(req2Text) == 'Car Insurance'){
		$('body').attr('id','CarInsurance');
	}
	else if(trimText(reqText) == 'Home Insurance' || trimText(req2Text) == 'Home Insurance'){
		$('body').attr('id','HomeInsurance');
	}
});

/**COMPAIGN CODE**/ 
function campaignHandler(){
		var compaignRef="cmpid";
		var compaignNodeRef;
		compaignNodeRef=getQueryParamValue(compaignRef);
		$("[name='cmpId']").each(function(index,node){
			node.value=compaignNodeRef;
		});
}

$(document).ready(function(){ 	
	injectTransacUrl();
	onchangeVehMake();
	campaignHandler();
	emptyOnChange("prodSelect","msg");
	
	if (document.getElementById("getQuote")) {
		createScript(URLPath + "/dcaae/referenceservlet?resourceid=countryDLMake&callback=handleCountryDLMake");
		createScript(URLPath + "/dcaae/referenceservlet?resourceid=getHomeRefData&callback=handleCovOptInfo");
		createScript(URLPath + "/dcaae/referenceservlet?resourceid=getRefData&callback=handleCovOptTripPlanUserInfo");
		getQuoteToggle();
	}
		//Tooltip starts
	$('.tooltipHomePage').each(function(index,node){
		$("#"+node.id).mouseover(function(evt){
			evt.stopPropagation();
			if(this.id==evt.target.id){
				showBox(evt);
			}
			
			
		});
		$("#"+node.id).mouseleave(function(evt){
			evt.stopPropagation();
			var refCont;
		    if(!(this.id==evt.target.id)){
		    	refCont=this.id+"toolObj";
		    	 $('#'+refCont).remove();
			}
		    if($(".tooltip").length>0){
		    	$(".tooltip").remove();
		    }
		});
	});

    function showBox(e){
    	e.preventDefault();
    	var refCont=e.target.id+"toolObj";   
    	var toolObjRef=document.createElement("div");
    	toolObjRef.id=e.target.id+"toolObj";
    	if($("#"+e.target.id).offset().left>0.8*$("#getQuote").offset().left+$("#getQuote").width()&&$("#getQuote").offset().left+$("#getQuote").width()>920){     
		toolObjRef.className="tooltip toolTipRight";
        }else if($("#"+e.target.id).offset().left>0.75*$("#getQuote").offset().left+$("#getQuote").width()&&$("#getQuote").offset().left+$("#getQuote").width()<930){
			toolObjRef.className="tooltip toolTipRight";
        }else{
          	toolObjRef.className="tooltip toolTipCmn";
        }    	
    	toolObjRef.innerHTML=toolTipMsgsObj[e.target.id];
    	//$(toolObjRef).insertAfter("#"+e.target.id);
    	$("#"+e.target.id).html(toolObjRef);
    
       /* var x = e.pageX + 20;
        var y = e.pageY + 20;
        $('.tooltip').fadeIn();
        $('.tooltip').offset({ left: x, top: y });*/
    }
    
  
    var toolTipMsgsObj={
    		homeSelectPlan:"<ul><li>Choose Silver for AED 70,000 limit of home contents coverage.</li>"+
    		"<li>Choose Gold for AED 135,000 limit of home contents coverage.</li>"+
    		"<li>Choose Platinum for AED 300,000 limit of home contents coverage.</li></ul>",
    	  vehiclePlateNoTips : "Select the country where you first obtained your driving license.",
		  NcdToolTips : "Please declare the number of years you have been driving without a claim at your fault ( e.g. 2 years without a claim). A No Claims Discount (NCD) letter will be needed from your previous insurer to validate this.",
    	  InsInfoCovOptionToolTipId:"<ul><li>Choose Individual if you are travelling by yourself.</li><li>Choose Family if you are travelling with family.</li></ul>",
			InsInfoTripToolTipId:"<ul><li>Choose Single Trip to cover a single trip of up to 90 days.</li>" +
					"<li>Choose Annual Multi Trip to cover all trips (each not exceeding 90 days) for a period of 1 year.</li></ul>",
			InsInfoAddCovToolTipId:"<ul><li>Select Terrorism coverage to cover for injuries incurred due to an act of terrorism.</li>"+
										"<li>Select Hazardous Sports coverage to cover for your sports activities such as motorcycle riding, motor scooter riding, mountaineering, bungee jumping, and similar sports. </li>"+
										"</ul>"
    	  
    }
	//Tooltip Ends
	
	// Renewal Links overidden
	
	$("#li31").click(function(){
	var linkValueAuto = URLPath+"/dcaae/ae/private/cmn/linkPage.jsp?linkId=AUTO_ACCOUNT_OVERVIEW_PATH_PAGE";
	
	//Needs to be changed after Renewal in Model is ready
	/*var linkValueAuto = "https://ftwldscimw124.r1-core.r1.aig.net:48540/dcaae/ae/private/cmn/linkPage.jsp?linkId=AUTO_ACCOUNT_OVERVIEW_PATH_PAGE";*/
	//console.log("linkValueAuto is: "+linkValueAuto);
	$(location).attr('href',linkValueAuto)
	/*alert("Please be advised that, online services are temporarily unavailable due to the maintenance activity. The online services are expected to be available again on Friday 2:00 PM. Please give us your contact details and we will call you back.\n Thank you for your patience.");*/
	});
	
		
	$("#li32").click(function(){
	var linkValueHome = URLPath+"/dcaae/ae/private/cmn/linkPage.jsp?linkId=HOME_ACCOUNT_OVERVIEW_PATH_PAGE";
	//Needs to be changed after Renewal in Model is ready
	/*var linkValueHome = "https://ftwldscimw124.r1-core.r1.aig.net:48540/dcaae/ae/private/cmn/linkPage.jsp?linkId=HOME_ACCOUNT_OVERVIEW_PATH_PAGE";*/
	//console.log("linkValueHome is:"+ linkValueHome);	
	$(location).attr('href',linkValueHome)
	
		/*alert("Please be advised that, online services are temporarily unavailable due to the maintenance activity. The online services are expected to be available again on Friday 2:00 PM. Please give us your contact details and we will call you back.\n Thank you for your patience.");*/

	});
		
	
});

function trimText(obj){
	obj = obj.replace(/^\s*|\s*$/g,'');
	return obj;
}


// Start QuickQuote Javascript

function injectTransacUrl(){
	
	if(document.getElementById("serviceRequestMyAccLogin")){
		$("#serviceRequestMyAccLogin").attr("href",URLPath+"/dcaae/ae/private/html/myaccount/accountOverview.jsp")
	} // for not login user
	
	if(document.getElementById("getQuote")){
		$("#retriveQuoteTriId").attr("href",URLPath+"/dcaae/ae/private/cmn/linkPage.jsp?linkId=AUTO_RETRIEVE_QUOTE_PATH")
	}
	
	$("#navListPanel li a").each(function(){
		if(this.title=='Claims'){
			$(this).attr('href',URLPath+'/dcaae/ae/public/html/claims/autoclaim.jsp');
		}		
		
		if(this.title=='Auto Renewal'){
			$(this).attr('href',URLPath+'/dcaae/ae/private/cmn/linkPage.jsp?linkId=AUTO_ACCOUNT_OVERVIEW_PATH_PAGE');
		}
		
		if(this.title=='Home Renewal'){
			$(this).attr('href',URLPath+'/dcaae/ae/private/cmn/linkPage.jsp?linkId=HOME_ACCOUNT_OVERVIEW_PATH_PAGE');
		}
		
		if(this.title=='My Account'){
			$(this).attr('href',URLPath+'/dcaae/ae/private/html/myaccount/accountOverview.jsp');
		}
		
		if(this.title=='Service Request'){
			$(this).attr('href',URLPath+'/dcaae/ae/private/cmn/linkPage.jsp?linkId=SVC_REQ_PATH_PAGE');
		}
	});
	
	var serviceRequstLink = $("#footerSecContainer a:contains('Service Request')");
	$(serviceRequstLink).attr('href',URLPath+'/dcaae/ae/private/cmn/linkPage.jsp?linkId=SVC_REQ_PATH_PAGE');
	
	$("#footerSecContainer a").each(function(){
		/* if(this.text =='Service Request'){
			$(this).attr('href',URLPath+'/dcaae/ae/private/cmn/linkPage.jsp?linkId=svcRq');
		} */
		
		if(this.text == 'My Account'){
				$(this).attr('href',URLPath+'/dcaae/ae/private/html/myaccount/accountOverview.jsp');
		}
		if(this.text =='Claims'){
			$(this).attr('href',URLPath+'/dcaae/ae/public/html/claims/autoclaim.jsp');
		}
	});
	
	/* if($("#gridCenter .navlist").length){

        $(".navlist li a").each(function(){

                                    if(this.innerHTML== 'My Account'){

                                                $(this).attr('href',URLPath+'/dcaae/ae/private/html/myaccount/accountOverview.jsp');

                                    }

                                    if(this.innerHTML=='Service Request'){

                                                $(this).attr('href',URLPath+'/dcaae/ae/private/cmn/linkPage.jsp?linkId=svcRq');

                                    }

                        });

            } */


}

function handleCountryDLMake(data){
	if(document.getElementById("getQuote")){
		try{
			var countryDl = data.vehAndCountryData.countryOfDL.countryDLInfo;
			$.each(countryDl, function(){
				$("#countryDL").append('<option value=\''+this.refDataCd+'\'>'+this.refDataVal+'</option>')
			})                                 

			var vehicleMakeList = data.vehAndCountryData.vehicleMakeList.vehicleMakeList;                              
			$.each(vehicleMakeList, function(){
				$("#vehicleMake").append('<option value=\''+this+'\'>'+this+'</option>')
			})         

			var salutationList = data.salutations.salutationInfo;                                  
			$.each(salutationList, function(){
				$("#autoSalutation").append('<option value=\''+this.refDataCd+'\'>'+this.refDataVal+'</option>')
			})			

			if(data.userData.loggedIn){
				var firstName=data.userData.firstName;
				$("#autoFname").attr('value',firstName) 
				var lastName=data.userData.lastName;
				$("#autoLname").attr('value',lastName)
				var emailAddress=data.userData.emailAddress;
				$("#autoEmail").attr('value',emailAddress)
				var phoneNumber=data.userData.phoneNumber;
				$("#automobileNo").attr('value',phoneNumber)
				var salutations=data.userData.salutations;
				$("#autoSalutation").val(salutations)		
				var areaCode=data.userData.areaCode;
				$("#autoareaCode").attr('value',areaCode)
			}
		}catch(e){if(window.console){console.log("Prepopulating auto fields "+e)}}
	}
}

function handleCovOptInfo(data){
	try{
		var homeSalList = data.salutationList.salutationRefList;
		$.each(homeSalList, function(){
			$("#homeSalutation").append('<option value=\''+this+'\'>'+this+'</option>')      
		})
	var ageArray = ["1", "2", "3","4","5","6","7","8","9","10","11", "12", "13","14","15","16","17","18","19","20","21", "22", "23","24","25","26"]; 
		var homeCvrType = data.coverageLimit.coverageType;
		var typeofHome = data.homeTypeList.homeTypeRefList;
		var homeEmirate = data.emiritesList.emiriteType;
		$.each(homeCvrType, function(){
			$("#coverLimit").append('<option value=\''+this.refDataCd+'\'>'+this.refDataVal+'</option>')
		})   
		$.each(typeofHome, function(){
			$("#houseType").append('<option value=\''+this.refDataCd+'\'>'+this.refDataVal+'</option>')
		})

		$.each(homeEmirate, function(){
			$("#emirateId").append('<option value=\''+this.refDataCd+'\'>'+this.refDataVal+'</option>')
		})
		$("#buildingAge").empty();
		$("#buildingAge").append('<option value=\'\'>Select</option>');
		
		$.each(ageArray, function(age, i){
		if (i != '26') {
			$("#buildingAge").append('<option value=\''+i+'\'>'+i+'</option>');
			
			}
			else {
					$("#buildingAge").append('<option value=\''+i+'\'>>25</option>');
			}
			
		}) 		

		if(data.userData.loggedIn){
			var firstName=data.userData.firstName;
			$("#HomefName").attr('value',firstName) 
			var lastName=data.userData.lastName;
			$("#HomelName").attr('value',lastName)
			var emailAddress=data.userData.emailAddress;
			$("#homeEmail").attr('value',emailAddress)
			var phoneNumber=data.userData.phoneNumber;
			$("#homemobileNo").attr('value',phoneNumber)
			var salutations=data.userData.salutations;
			$("#homeSalutation").val(salutations)	
			var areaCode =data.userData.areaCode;
			$("#homeAreaCode").attr('value',areaCode)

		
		}		
	}catch(e){if(window.console){console.log("Prepopulating home fields "+e)}}
}


function handleCovOptTripPlanUserInfo (data){
	try{
		var travelPlan = data.coveragePlan.coveragePlanInfo;
		$.each(travelPlan, function(){
				$("#CoverLPlan").append('<option value=\''+this.refDataCd+'\'>'+this.refDataVal+'</option>')
			}
		)

		var travelPlan = data.salutation.salutationInfo;
		$.each(travelPlan, function(){
				$("#travelSalutation").append('<option value=\''+this.refDataCd+'\'>'+this.refDataVal+'</option>')
			}
		)

		if(data.loggedUserInfo.loggedIn){
			var firstName=data.loggedUserInfo.firstName;
			$("#TravelfName").attr('value',firstName) 
			var lastName=data.loggedUserInfo.lastName;
			$("#TravellName").attr('value',lastName)
			var emailAddress=data.loggedUserInfo.emailAddress;
			$("#travelEmail").attr('value',emailAddress)
			var phoneNumber=data.loggedUserInfo.phoneNumber;
			$("#travelMobileNo").attr('value',phoneNumber)
			var salutations=data.loggedUserInfo.salutations;
			$("#travelSalutation").val(salutations)
			var areaCode =data.loggedUserInfo.areaCode;
			$("#travelareaCode").attr('value',areaCode)

		}
	}catch(e){if(window.console){console.log("Prepopulating travel fields "+e)}}
}

function handleVehMakeList(data){	
	if(document.getElementById("getQuote")){		
		try{
			$("#vehicleModel").children().remove();		
			$(data.VehicleModelList).each(function(){
				//console.log(this.modelName);
				$("#vehicleModel").append('<option value=\''+this.makeModelCode+'\'>'+this.modelName+'</option>');
			})
		}catch(e){console.log("Car make list data error "+e)}
	}
}

function populateModel(value){	
	if(document.getElementById("getQuote")){
		try{
			createScript(URLPath+"/dcaae/referenceservlet?resourceid=vehModelList&vehicleMake="+value+"&callback=handleVehMakeList");

		}catch(e){console.log("Car model data error "+e)}
	}
}

function onchangeVehMake(){
	if(document.getElementById("getQuote")){
		try{
			$("#vehicleMake").change(function(){
				if($("#vehicleMake").val()!=""){
					populateModel(this.value);
				}
			})
		}catch(e){console.log("Car make model data error "+e)}
	}
}

function createScript(linkvar){
	$.getScript(linkvar);
}
// End QuickQuote Javascript

/*call me */

function isSelectedCallMe(objTextInput, strID) {
    var retVal = false;
    var values = $('#' + objTextInput + '').val();
    if (values == 0) {
        $('#' + strID + '').show();
        $('#' + objTextInput + '').focus();
        retVal = false;
    } else {
        $('#' + strID + '').hide();
        retVal = true;
    }
    return retVal;
}
function  patternCheckCallMe(strFieldName, strID, strID2){
	 var objTextInput = $('#' + strFieldName);
    var strID = $('#' + strID);
    var strID2 = $('#' + strID2);
    var alphaExp = /^05[0-9]$/;
    var retVal = false;
    if (!objTextInput.val().length) {
        strID.show();
        strID2.hide();
        objTextInput.focus();
    } else if (!alphaExp.test(objTextInput.val())) {
        strID.hide();
        strID2.show();
        objTextInput.focus();
    } else {
        strID.hide();
        strID2.hide();
        retVal = true;
    }
    return retVal;


}

function numCheckCallMe(strFieldName, strID, strID2,strID3 ) {
    var objTextInput = $('#' + strFieldName);
    var strID = $('#' + strID);
    var strID2 = $('#' + strID2);
	var strID3 = $('#' + strID3);
    var alphaExp = /^[0-9]*$/;
    var retVal = false;
    if (!objTextInput.val().length) {
        strID.show();
        strID2.hide();
		strID3.hide();
        objTextInput.focus();
    } else if (!alphaExp.test(objTextInput.val())) {
        strID.hide();
        strID2.show();
		strID3.hide();
        objTextInput.focus();
    }else if (objTextInput.val().length < 7) {
        strID.hide();
        strID2.hide();
		strID3.show();
        objTextInput.focus();
    }
	else {
        strID.hide();
        strID2.hide();
        strID3.hide();
		retVal = true;
    }
    return retVal;
}


function validateCallMe(){	
	
	$("#assistanceForm .error").each(function(){

$(this).hide();
}); 
    var productInter=  document.getElementById("productInter").value;
    var callMeAreaCode=  document.getElementById("callQuoteAreaCode").value;
    var phoneCallNumber= document.getElementById("callQuoteMobileNo").value;
	if(patternCheckCallMe('callQuoteAreaCode',  'errCallMeAreaCodeNo', 'errCallMeAreaCodeNo1') && numCheckCallMe('callQuoteMobileNo', 'errCallMemobileNo', 'errCallMemobileNo1','errCallMemobileNo2')&&isSelectedCallMe('productInter','errProductInter')){
		try{
			//appendHiddenField('assistanceform');
			createScriptCallMe(URLPath+"/dcaae/referenceservlet?resourceid=callMe&phoneCallNumber="+phoneCallNumber+"&productInter="+productInter+"&stdCallCode="+callMeAreaCode+"&callback=handleCallMe");
		}catch(e){console.log("Call Me error "+e)}
	}
}

function handleCallMe(data){	
	$("<div id='callMeOverlay'></div>").appendTo($(".formcontainer")[0]);
	$("<div id='callMeMesg'>"+data.message+"<br /><br /><input type='button' value='close' class='button' id='closeCallMeOverlayId'/></div>").appendTo($(".formcontainer")[0]);
	$('#closeCallMeOverlayId').click(function(){
		$("#callMeOverlay").remove();
		$("#callMeMesg").remove();
	});
clearAssistanceFormData();
}

function clearAssistanceFormData(){
$("#assistanceForm input,select").each(function(){
    if(this.type !="button"){
       if(this.name == "areaCode"){
        $(this).val('05x');
       }
       if(this.name == "phoneNo"){
        $(this).val('xxxxxxx');
       }
       if(this.name=="productInter"){
        $(this).val('');
       }
    }
});
}
function createScriptCallMe(linkvar){
	if(document.getElementById("assistanceForm")){
		$.getScript(linkvar);
	}
} 
/*call me ends*/
/*******calendar Code Starts Here*******************/

var winCal;
var dtToday;
var Cal;
var MonthName;
var WeekDayName1;
var WeekDayName2;
var calFormat;
var funcNode;
var exDateTime;//Existing Date and Time
var selDate;//selected date. version 1.7
var calSpanID = ""; // span ID
var domStyle = null; // span DOM object with style
var cnLeft = "0";//left coordinate of calendar span
var cnTop = "0";//top coordinate of calendar span
var xpos = 0; // mouse x position
var ypos = 0; // mouse y position
var calHeight = 0; // calendar height
var CalWidth = 163;// calendar width
var CellWidth = 30;// width of day cell.
var TimeMode = 24;// TimeMode value. 12 or 24
var StartYear = 65; //First Year in drop down year selection
var EndYear =50; // The last year of pickable date. if current year is 2011, the last year that still picker will be 2016 (2011+5)
var CalPosOffsetX = 0; //X position offset relative to calendar icon, can be negative value
var CalPosOffsetY = 40; //Y position offset relative to calendar icon, can be negative value
var referenceId;
var calstatus="y";

//Configurable parameters

//var WindowTitle = "DateTime Picker";//Date Time Picker title.

var SpanBorderColor = "#000000";//span border color
var SpanBgColor = "";
var MonthYearColor = "";
var WeekHeadColor = "";
var SundayColor = "";
var SaturdayColor = "";
var WeekDayColor ="";
var FontColor ="";
var TodayColor = "";
var SelDateColor = "";
var YrSelColor = "";
var MthSelColor = "";
var HoverColor = "";
var DisableColor = "gray"; //color of disabled cell.
var CalBgColor = "white"; //Background color of Calendar window.*/

var WeekChar = 3;//number of character for week day. if 2 then Mo,Tu,We. if 3 then Mon,Tue,Wed.
var DateSeparator = "/";//Date Separator, you can change it to "-" if you want.
var ShowLongMonth = true;//Show long month name in Calendar header. example: "January".
var ShowMonthYear = false;//Show Month and Year in Calendar header.
var ThemeBg = "";//Background image of Calendar window.
var PrecedeZero = true;//Preceding zero [true|false]
var MondayFirstDay = false;//true:Use Monday as first day; false:Sunday as first day. [true|false]  //added in version 1.7
var UseImageFiles = true;//Use image files with "arrows" and "close" button
var DisableBeforeToday = true; //Make date before today unclickable.
var imageFilesPath = "images/";
var headerStyle= 'background:url("titleBar.png")repeat-x #BCD5F0;width:160px;padding:0;';



//use the Month and Weekday in your preferred language.

var MonthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var WeekDayName1 = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
var WeekDayName2 = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

var TMonthName = ['??????','??????????','??????','??????','???????','????????','???????','???????','???????','??????','?????????','???????','??????','??????????','??????','??????','???????','????????','???????','???????','???????','??????','?????????','???????'];
var TWeekDayName1 = ['??.','?.','?.','?.','??.','?.','?.'];
var TWeekDayName2= ['?.','?.','?.','??.','?.','?.','??.'];

//end Configurable parameters
function callback(id, datum) {
	var CalId = document.getElementById(id);
	if (datum=== 'undefined') { 
	var d = new Date(); 
	datum = d.getDate() + '/' +(d.getMonth()+1) + '/' + d.getFullYear(); 
	} 
	window.calDatum=datum;
	CalId.value=datum;
	if(funcNode!=''){
		eval(funcNode);
	}
	winCal.style.visibility='hidden';
}
//end Global variable

function getYear(normalYear) {
	if(calFormat.toUpperCase() === "TH") {
		return parseInt(normalYear)+543;
	} else if(calFormat.toUpperCase() === "EN") {
		return normalYear;
	}
}
function getElementsByClassName(node, classname) {
    var a = [];
    var re = new RegExp('(^| )'+classname+'( |$)');
    var els = node.getElementsByTagName("*");
    for(var i=0,j=els.length; i<j; i++)
        if(re.test(els[i].className))a.push(els[i]);
    return a;
}
// Calendar prototype
function Calendar(pDate, pCtrl)
{

	//Properties
	this.Date = pDate.getDate();//selected date
	this.Month = pDate.getMonth();//selected month number
	this.Year = pDate.getFullYear();//selected year in 4 digits
	this.Hours = pDate.getHours();

	if (pDate.getMinutes() < 10)
	{
		this.Minutes = "0" + pDate.getMinutes();
	}
	else
	{
		this.Minutes = pDate.getMinutes();
	}

	if (pDate.getSeconds() < 10)
	{
		this.Seconds = "0" + pDate.getSeconds();
	}
	else
	{
		this.Seconds = pDate.getSeconds();
	}


	this.MyWindow = winCal;
	this.Ctrl = pCtrl;
	this.Format = "ddMMyyyy";
	this.Separator = DateSeparator;
	this.ShowTime = false;
	this.Scroller = "DROPDOWN";
	if (pDate.getHours() < 12)
	{
		this.AMorPM = "AM";
	}
	else
	{
		this.AMorPM = "PM";
	}

	this.ShowSeconds = false;
}

Calendar.prototype.GetMonthIndex = function (shortMonthName)
{
	for (var i = 0; i < 12; i += 1)
	{
		if (MonthName[i].substring(0, 3) === shortMonthName)
		{
			return i;
		}
	}
};

Calendar.prototype.IncYear = function () {
    if (Cal.Year <= dtToday.getFullYear()+EndYear)
	    Cal.Year += 1;
};

Calendar.prototype.DecYear = function () {
    if (Cal.Year >=StartYear)
	    Cal.Year -= 1;
};

Calendar.prototype.IncMonth = function() {
    if (Cal.Year <= dtToday.getFullYear() + EndYear) {
        Cal.Month += 1;
        if (Cal.Month >= 12) {
            Cal.Month = 0;
            Cal.IncYear();
        }
    }
};

Calendar.prototype.DecMonth = function() {
    if (Cal.Year >= StartYear) {
        Cal.Month -= 1;
        if (Cal.Month < 0) {
            Cal.Month = 11;
            Cal.DecYear();
        }
    }
};

Calendar.prototype.SwitchMth = function (intMth)
{
	Cal.Month = parseInt(intMth, 10);
};

Calendar.prototype.SwitchYear = function (intYear)
{
	Cal.Year = parseInt(intYear, 10);
};

Calendar.prototype.SetHour = function (intHour)
{
	var MaxHour,
	MinHour,
	HourExp = new RegExp("^\\d\\d"),
	SingleDigit = new RegExp("\\d");

	if (TimeMode === 24)
	{
		MaxHour = 23;
		MinHour = 0;
	}
	else if (TimeMode === 12)
	{
		MaxHour = 12;
		MinHour = 1;
	}
	else
	{
		alert("TimeMode can only be 12 or 24");
	}

	if ((HourExp.test(intHour) || SingleDigit.test(intHour)) && (parseInt(intHour, 10) > MaxHour))
	{
		intHour = MinHour;
	}

	else if ((HourExp.test(intHour) || SingleDigit.test(intHour)) && (parseInt(intHour, 10) < MinHour))
	{
		intHour = MaxHour;
	}

	if (SingleDigit.test(intHour))
	{
		intHour = "0" + intHour;
	}

	if (HourExp.test(intHour) && (parseInt(intHour, 10) <= MaxHour) && (parseInt(intHour, 10) >= MinHour))
	{
		if ((TimeMode === 12) && (Cal.AMorPM === "PM"))
		{
			if (parseInt(intHour, 10) === 12)
			{
				Cal.Hours = 12;
			}
			else
			{
				Cal.Hours = parseInt(intHour, 10) + 12;
			}
		}

		else if ((TimeMode === 12) && (Cal.AMorPM === "AM"))
		{
			if (intHour === 12)
			{
				intHour -= 12;
			}

			Cal.Hours = parseInt(intHour, 10);
		}

		else if (TimeMode === 24)
		{
			Cal.Hours = parseInt(intHour, 10);
		}
	}

};

Calendar.prototype.SetMinute = function (intMin)
{
	var MaxMin = 59,
	MinMin = 0,

	SingleDigit = new RegExp("\\d"),
	SingleDigit2 = new RegExp("^\\d{1}$"),
	MinExp = new RegExp("^\\d{2}$"),

	strMin = 0;

	if ((MinExp.test(intMin) || SingleDigit.test(intMin)) && (parseInt(intMin, 10) > MaxMin))
	{
		intMin = MinMin;
	}

	else if ((MinExp.test(intMin) || SingleDigit.test(intMin)) && (parseInt(intMin, 10) < MinMin))
	{
		intMin = MaxMin;
	}

	strMin = intMin + "";
	if (SingleDigit2.test(intMin))
	{
		strMin = "0" + strMin;
	}

	if ((MinExp.test(intMin) || SingleDigit.test(intMin)) && (parseInt(intMin, 10) <= 59) && (parseInt(intMin, 10) >= 0))
	{
		Cal.Minutes = strMin;
	}
};

Calendar.prototype.SetSecond = function (intSec)
{
	var MaxSec = 59,
	MinSec = 0,

	SingleDigit = new RegExp("\\d"),
	SingleDigit2 = new RegExp("^\\d{1}$"),
	SecExp = new RegExp("^\\d{2}$"),

	strSec = 0;

	if ((SecExp.test(intSec) || SingleDigit.test(intSec)) && (parseInt(intSec, 10) > MaxSec))
	{
		intSec = MinSec;
	}

	else if ((SecExp.test(intSec) || SingleDigit.test(intSec)) && (parseInt(intSec, 10) < MinSec))
	{
		intSec = MaxSec;
	}

	strSec = intSec + "";
	if (SingleDigit2.test(intSec))
	{
		strSec = "0" + strSec;
	}

	if ((SecExp.test(intSec) || SingleDigit.test(intSec)) && (parseInt(intSec, 10) <= 59) && (parseInt(intSec, 10) >= 0))
	{
		Cal.Seconds = strSec;
	}

};

Calendar.prototype.SetAmPm = function (pvalue)
{
	this.AMorPM = pvalue;
	if (pvalue === "PM")
	{
		this.Hours = parseInt(this.Hours, 10) + 12;
		if (this.Hours === 24)
		{
			this.Hours = 12;
		}
	}

	else if (pvalue === "AM")
	{
		this.Hours -= 12;
	}
};

Calendar.prototype.getShowHour = function ()
{
	var finalHour;

	if (TimeMode === 12)
	{
		if (parseInt(this.Hours, 10) === 0)
		{
			this.AMorPM = "AM";
			finalHour = parseInt(this.Hours, 10) + 12;
		}

		else if (parseInt(this.Hours, 10) === 12)
		{
			this.AMorPM = "PM";
			finalHour = 12;
		}

		else if (this.Hours > 12)
		{
			this.AMorPM = "PM";
			if ((this.Hours - 12) < 10)
			{
				finalHour = "0" + ((parseInt(this.Hours, 10)) - 12);
			}
			else
			{
				finalHour = parseInt(this.Hours, 10) - 12;
			}
		}
		else
		{
			this.AMorPM = "AM";
			if (this.Hours < 10)
			{
				finalHour = "0" + parseInt(this.Hours, 10);
			}
			else
			{
				finalHour = this.Hours;
			}
		}
	}

	else if (TimeMode === 24)
	{
		if (this.Hours < 10)
		{
			finalHour = "0" + parseInt(this.Hours, 10);
		}
		else
		{
			finalHour = this.Hours;
		}
	}

	return finalHour;
};

Calendar.prototype.getShowAMorPM = function ()
{
	return this.AMorPM;
};

Calendar.prototype.GetMonthName = function (IsLong)
{
	var Month = MonthName[this.Month];
	if (IsLong)
	{
		return Month;
	}
	else
	{
		return Month.substr(0, 3);
	}
};

Calendar.prototype.GetMonDays = function() { //Get number of days in a month

    var DaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (Cal.IsLeapYear()) {
        DaysInMonth[1] = 29;
    }

    return DaysInMonth[this.Month];
};

Calendar.prototype.IsLeapYear = function ()
{
	if ((this.Year % 4) === 0)
	{
		if ((this.Year % 100 === 0) && (this.Year % 400) !== 0)
		{
			return false;
		}
		else
		{
			return true;
		}
	}
	else
	{
		return false;
	}
};

Calendar.prototype.FormatDate = function (pDate)
{
	var MonthDigit = this.Month + 1;
	if (PrecedeZero === true)
	{
		if ((pDate < 10) && String(pDate).length===1) //length checking added in version 2.2
		{		
			pDate = "0" + pDate;
		}
		if (MonthDigit < 10)
		{
			MonthDigit = "0" + MonthDigit;
		}if(!DisableBeforeToday){
			this.Format="DDMMYYYY";
		}
	}

		switch (this.Format.toUpperCase())
		{
			case "DDMMYYYY":
			return (pDate + DateSeparator + MonthDigit + DateSeparator + getYear(parseInt(this.Year)));
			case "DDMMMYYYY":
			return (pDate + DateSeparator + this.GetMonthName(false) + DateSeparator + getYear(this.Year));
			case "MMDDYYYY":
			return (MonthDigit + DateSeparator + pDate + DateSeparator + getYear(this.Year));
			case "MMMDDYYYY":
			return (this.GetMonthName(false) + DateSeparator + pDate + DateSeparator + getYear(this.Year));
			case "YYYYMMDD":
			return (getYear(this.Year) + DateSeparator + MonthDigit + DateSeparator + pDate);
			case "YYMMDD":
			return (String(getYear(this.Year)).substring(2, 4) + DateSeparator + MonthDigit + DateSeparator + pDate);
			case "YYMMMDD":
			return (String(getYear(this.Year)).substring(2, 4) + DateSeparator + this.GetMonthName(false) + DateSeparator + pDate);
			case "YYYYMMMDD":
			return (getYear(this.Year) + DateSeparator + this.GetMonthName(false) + DateSeparator + pDate);
			default:
			return (pDate + DateSeparator + (this.Month + 1) + DateSeparator + getYear(this.Year));
		}
};

// end Calendar prototype

function GenCell(pValue, pHighLight, pColor, pClickable)
{ //Generate table cell with value
	var PValue,
	PCellStr,
	PClickable,
	vTimeStr;

	if (!pValue)
	{
		PValue = "";
	}
	else
	{
		PValue = pValue;
	}

	if(pColor!=""&&pColor!=undefined){
		pColor=pColor;
	}else{
		pColor ="#OOO" ;
	}

	    
	
	if (pClickable !== undefined){
		PClickable = pClickable;
	}
	else{
		PClickable = true;
	}

	if (Cal.ShowTime)
	{
		vTimeStr = ' ' + Cal.Hours + ':' + Cal.Minutes;
		if (Cal.ShowSeconds)
		{
			vTimeStr += ':' + Cal.Seconds;
		}
		if (TimeMode === 12)
		{
			vTimeStr += ' ' + Cal.AMorPM;
		}
	}

	else
	{
		vTimeStr = "";
	}

	if (PValue !== "")
	{
		if (PClickable === true) {
		    if (Cal.ShowTime === true)
		    { PCellStr = "<td id='c" + PValue + "' class='calTD' style='text-align:center;cursor:pointer;color:"+pColor+"' onmousedown='selectDate(this," + PValue + ");'>" + PValue + "</td>"; }
		    else { PCellStr = "<td class='calTD' style='text-align:center;cursor:pointer;color:#000;font-weight:bold' onmouseover='changeBorder(this, 0);' onmouseout=\"changeBorder(this, 1, '" + pColor + "');\" onClick=\"javascript:callback('" + Cal.Ctrl + "','" + Cal.FormatDate(PValue) + "');\">" + PValue + "</td>"; }
		}
		else
		{ PCellStr = "<td style='text-align:center;color:"+pColor+"' class='calTD'>"+PValue+"</td>"; }
	}
	else
	{ PCellStr = "<td style='text-align:center;color:"+pColor+"' class='calTD'>&nbsp;</td>"; }

	return PCellStr;
}

function RenderCssCal(bNewCal)
{

	if (typeof bNewCal === "undefined" || bNewCal !== true)
	{
		bNewCal = false;
	}
	var vCalHeader,
	vCalData,
	vCalTime = "",
	vCalClosing = "",
	winCalData = "",
	CalDate,

	i,
	j,

	SelectStr,
	vDayCount = 0,
	vFirstDay,

	WeekDayName = [],//Added version 1.7
	strCell,

	showHour,
	ShowArrows = false,
	HourCellWidth = "35px", //cell width with seconds.

	SelectAm,
	SelectPm,

	funcCalback,

	headID,
	e,
	cssStr,
	style,
	cssText,
	span;

	calHeight = 0; // reset the window height on refresh

	// Set the default cursor for the calendar

	winCalData = "<span style='cursor:auto;'>";
	vCalHeader = "<table><tbody>";

	//Table for Month & Year Selector

	vCalHeader += "<tr><td colspan='7'><table cellpadding='0' cellspacing='0'><tr >";
	//******************Month and Year selector in dropdown list************************

	if (Cal.Scroller === "DROPDOWN")
	{
	    vCalHeader += "<td><select name='MonthSelector' onChange='javascript:Cal.SwitchMth(this.selectedIndex);RenderCssCal();'>";
		for (i = 0; i < 12; i += 1)
		{
			if (i === Cal.Month)
			{
				SelectStr = "Selected";
			}
			else
			{
				SelectStr = "";
			}
			if(calFormat.toUpperCase() === "TH") {
				vCalHeader += "<option " + SelectStr + " value=" + i + ">" + TMonthName[i] + "</option>";
			} else if(calFormat.toUpperCase() === "EN") {
				vCalHeader += "<option " + SelectStr + " value=" + i + ">" + MonthName[i] + "</option>";
			}
		}

		vCalHeader += "</select></td>";
		//Year selector

		vCalHeader += "<td><select name='YearSelector' size='1' onChange='javascript:Cal.SwitchYear(this.value);RenderCssCal();'>";
		for (i = dtToday.getFullYear() - StartYear; i <= (dtToday.getFullYear() + EndYear); i += 1)
		{
			if (i === Cal.Year)
			{
				SelectStr = 'selected="selected"';
			}
			else
			{
				SelectStr = '';
			}
			vCalHeader += "<option " + SelectStr + " value=" + i + ">" + getYear(i) + "</option>\n";
		}

		vCalHeader += "</select></td>\n";
		calHeight += 30;
	}

	//******************End Month and Year selector in dropdown list*********************

	//******************Month and Year selector in arrow*********************************

	else if (Cal.Scroller === "ARROW")
	{
		if (UseImageFiles)
		{
			vCalHeader += "<td><img onmousedown='javascript:Cal.DecYear();RenderCssCal();' src='"+imageFilesPath+"cal_fastreverse.gif' width='13px' height='9' onmouseover='changeBorder(this, 0)' onmouseout='changeBorder(this, 1)' style='border:1px solid white'></td>\n";//Year scroller (decrease 1 year)
			vCalHeader += "<td><img onmousedown='javascript:Cal.DecMonth();RenderCssCal();' src='" + imageFilesPath + "cal_reverse.gif' width='13px' height='9' onmouseover='changeBorder(this, 0)' onmouseout='changeBorder(this, 1)' style='border:1px solid white'></td>\n"; //Month scroller (decrease 1 month)
			vCalHeader += "<td width='70%' class='calR' style='color:"+YrSelColor+"'>"+ Cal.GetMonthName(ShowLongMonth) + " " + Cal.Year + "</td>"; //Month and Year
			vCalHeader += "<td><img onmousedown='javascript:Cal.IncMonth();RenderCssCal();' src='" + imageFilesPath + "cal_forward.gif' width='13px' height='9' onmouseover='changeBorder(this, 0)' onmouseout='changeBorder(this, 1)' style='border:1px solid white'></td>\n"; //Month scroller (increase 1 month)
			vCalHeader += "<td><img onmousedown='javascript:Cal.IncYear();RenderCssCal();' src='" + imageFilesPath + "cal_fastforward.gif' width='13px' height='9' onmouseover='changeBorder(this, 0)' onmouseout='changeBorder(this, 1)' style='border:1px solid white'></td>\n"; //Year scroller (increase 1 year)
			calHeight += 22;
		}
		else
		{
			vCalHeader += "<td><span id='dec_year' title='reverse year' onmousedown='javascript:Cal.DecYear();RenderCssCal();' onmouseover='changeBorder(this, 0)' onmouseout='changeBorder(this, 1)' style='border:1px solid white; color:" + YrSelColor + "'>-</span></td>";//Year scroller (decrease 1 year)
			vCalHeader += "<td><span id='dec_month' title='reverse month' onmousedown='javascript:Cal.DecMonth();RenderCssCal();' onmouseover='changeBorder(this, 0)' onmouseout='changeBorder(this, 1)' style='border:1px solid white'>&lt;</span></td>\n";//Month scroller (decrease 1 month)
			vCalHeader += "<td width='70%' class='calR' style='color:" + YrSelColor + "'>" + Cal.GetMonthName(ShowLongMonth) + " " + Cal.Year + "</td>\n"; //Month and Year
			vCalHeader += "<td><span id='inc_month' title='forward month' onmousedown='javascript:Cal.IncMonth();RenderCssCal();' onmouseover='changeBorder(this, 0)' onmouseout='changeBorder(this, 1)' style='border:1px solid white'>&gt;</span></td>\n";//Month scroller (increase 1 month)
			vCalHeader += "<td><span id='inc_year' title='forward year' onmousedown='javascript:Cal.IncYear();RenderCssCal();'  onmouseover='changeBorder(this, 0)' onmouseout='changeBorder(this, 1)' style='border:1px solid white; color:" + YrSelColor + "'>+</span></td>\n";//Year scroller (increase 1 year)
			calHeight += 22;
		}
	}

	vCalHeader += "</tr></table></td></tr>";

	//******************End Month and Year selector in arrow******************************

	//Calendar header shows Month and Year
	if (ShowMonthYear && Cal.Scroller === "DROPDOWN")
	{
			vCalHeader += "<tr><td colspan='7' class='calR' style='color:" + MonthYearColor + "'>" + Cal.GetMonthName(ShowLongMonth) + " " + getYear(Cal.Year) + "</td></tr>";
	   		calHeight += 19;
	}

	//Week day header

	vCalHeader += "<tr><td colspan=\"7\"><table style='border-collapse:collapse;' cellpadding='0'cellspacing='0'>";

	if (MondayFirstDay === true)
	{
		if(calFormat.toUpperCase() === "TH") {
			WeekDayName = TWeekDayName2;
		} else if(calFormat.toUpperCase() === "EN") {
			WeekDayName = WeekDayName2;
		}
	}
	else
	{
		if(calFormat.toUpperCase() === "TH") {
			WeekDayName = TWeekDayName1;
		} else if(calFormat.toUpperCase() === "EN") {
			WeekDayName = WeekDayName1;
		}
	}
	for (i = 0; i < 7; i += 1)
	{
	    vCalHeader += "<td style='width:"+CellWidth+"px;color:#000' class='calTD'>" + WeekDayName[i].substr(0, WeekChar) + "</td>";
	}

	calHeight += 19;
	vCalHeader += "</tr>";
	//Calendar detail
	CalDate = new Date(Cal.Year, Cal.Month);
	CalDate.setDate(1);

	vFirstDay = CalDate.getDay();

	//Added version 1.7

	if (MondayFirstDay === true)
	{
		vFirstDay -= 1;
		if (vFirstDay === -1)
		{
			vFirstDay = 6;
		}
	}

	//Added version 1.7
	vCalData = "<tr style='background:white;'>";
	calHeight += 19;
	for (i = 0; i < vFirstDay; i += 1)
	{
		vCalData = vCalData + GenCell();
		vDayCount = vDayCount + 1;
	}

	//Added version 1.7
	for (j = 1; j <= Cal.GetMonDays(); j += 1)
	{
		if ((vDayCount % 7 === 0) && (j > 1))
		{
			vCalData = vCalData + "<tr style='background:white;'>";
		}

		vDayCount = vDayCount + 1;
		//added version 2.1.2
		if (DisableBeforeToday === true && ((j > dtToday.getDate()) && (Cal.Month === dtToday.getMonth()) && (Cal.Year === dtToday.getFullYear()) || (Cal.Month > dtToday.getMonth()) && (Cal.Year === dtToday.getFullYear()) || (Cal.Year > dtToday.getFullYear())))
		{
			strCell = GenCell(j, false, DisableColor, false);//Before today's date is not clickable
		}
		else if (DisableBeforeToday === false && ((j < dtToday.getDate()) && (Cal.Month === dtToday.getMonth()) && (Cal.Year === dtToday.getFullYear()) || (Cal.Month < dtToday.getMonth()) && (Cal.Year === dtToday.getFullYear()) || (Cal.Year < dtToday.getFullYear())))
		{
			strCell = GenCell(j, false, DisableColor, false);//Before today's date is not clickable
		}
		//if End Year + Current Year = Cal.Year. Disable.
		else if (Cal.Year > (dtToday.getFullYear()+EndYear))
		{
		    strCell = GenCell(j, false, DisableColor, false); 
		}
		else if ((j === dtToday.getDate()) && (Cal.Month === dtToday.getMonth()) && (Cal.Year === dtToday.getFullYear()))
		{
			strCell = GenCell(j, true, TodayColor);//Highlight today's date
		}
		else
		{
			if ((j === selDate.getDate()) && (Cal.Month === selDate.getMonth()) && (Cal.Year === selDate.getFullYear())){
			     //modified version 1.7
				strCell = GenCell(j, true, SelDateColor);
            }
			else
			{
				if (MondayFirstDay === true)
				{
					if (vDayCount % 7 === 0)
					{
						strCell = GenCell(j, false, SundayColor);
					}
					else if ((vDayCount + 1) % 7 === 0)
					{
						strCell = GenCell(j, false, SaturdayColor);
					}
					else
					{
						strCell = GenCell(j, null, WeekDayColor);
					}
				}
				else
				{
					if (vDayCount % 7 === 0)
					{
						strCell = GenCell(j, false, SaturdayColor);
					}
					else if ((vDayCount + 6) % 7 === 0)
					{
						strCell = GenCell(j, false, SundayColor);
					}
					else
					{
						strCell = GenCell(j, null, WeekDayColor);
					}
				}
			}
		}

		vCalData = vCalData + strCell;

		if ((vDayCount % 7 === 0) && (j < Cal.GetMonDays()))
		{
			vCalData = vCalData + "</tr>";
			calHeight += 19;
		}
	}

	// finish the table proper

	if (vDayCount % 7 !== 0)
	{
		while (vDayCount % 7 !== 0)
		{
			vCalData = vCalData + GenCell();
			vDayCount = vDayCount + 1;
		}
	}

	vCalData = vCalData + "</table></td></tr>";


	//Time picker
	if (Cal.ShowTime === true)
	{
		showHour = Cal.getShowHour();

		if (Cal.ShowSeconds === false && TimeMode === 24)
		{
			ShowArrows = true;
			HourCellWidth = "10px";
		}

		vCalTime = "<tr><td colspan='7' style=\"text-align:center;\"><table cellpadding='0' cellspacing='0'><tbody><tr><td height='5px' width='" + HourCellWidth + "'>&nbsp;</td>";

		if (ShowArrows && UseImageFiles) //this is where the up and down arrow control the hour.
		{
		    vCalTime += "<td style='vertical-align:middle;'><table cellspacing='0' cellpadding='0' style='line-height:0pt;width:100%;'><tr><td style='text-align:center;'><img onclick='nextStep(\"Hour\", \"plus\");' onmousedown='startSpin(\"Hour\", \"plus\");' onmouseup='stopSpin();' src='" + imageFilesPath + "cal_plus.gif' width='13px' height='9px' onmouseover='changeBorder(this, 0)' onmouseout='changeBorder(this, 1)' style='border:1px solid white'></td></tr><tr><td style='text-align:center;'><img onclick='nextStep(\"Hour\", \"minus\");' onmousedown='startSpin(\"Hour\", \"minus\");' onmouseup='stopSpin();' src='" + imageFilesPath + "cal_minus.gif' width='13px' height='9px' onmouseover='changeBorder(this, 0)' onmouseout='changeBorder(this, 1)' style='border:1px solid white'></td></tr></table></td>\n";
		}

		vCalTime += "<td width='22px'><input type='text' name='hour' maxlength=2 size=1 style=\"WIDTH:22px\" value=" + showHour + " onkeyup=\"javascript:Cal.SetHour(this.value)\">";
		vCalTime += "</td><td style='font-weight:bold;text-align:center;'>:</td><td width='22px'>";
		vCalTime += "<input type='text' name='minute' maxlength=2 size=1 style=\"WIDTH: 22px\" value=" + Cal.Minutes + " onkeyup=\"javascript:Cal.SetMinute(this.value)\">";

		if (Cal.ShowSeconds)
		{
		    vCalTime += "</td><td style='font-weight:bold;'>:</td><td width='22px'>";
			vCalTime += "<input type='text' name='second' maxlength=2 size=1 style=\"WIDTH: 22px\" value=" + Cal.Seconds + " onkeyup=\"javascript:Cal.SetSecond(parseInt(this.value,10))\">";
		}

		if (TimeMode === 12)
		{
			SelectAm = (Cal.AMorPM === "AM") ? "Selected" : "";
			SelectPm = (Cal.AMorPM === "PM") ? "Selected" : "";

			vCalTime += "</td><td>";
			vCalTime += "<select name=\"ampm\" onChange=\"javascript:Cal.SetAmPm(this.options[this.selectedIndex].value);\">\n";
			vCalTime += "<option " + SelectAm + " value=\"AM\">AM</option>";
			vCalTime += "<option " + SelectPm + " value=\"PM\">PM<option>";
			vCalTime += "</select>";
		}

		if (ShowArrows && UseImageFiles) //this is where the up and down arrow to change the "Minute".
		{
		    vCalTime += "</td>\n<td style='vertical-align:middle;'><table cellspacing='0' cellpadding='0' style='line-height:0pt;width:100%'><tr><td style='text-align:center;'><img onclick='nextStep(\"Minute\", \"plus\");' onmousedown='startSpin(\"Minute\", \"plus\");' onmouseup='stopSpin();' src='" + imageFilesPath + "cal_plus.gif' width='13px' height='9px' onmouseover='changeBorder(this, 0)' onmouseout='changeBorder(this, 1)' style='border:1px solid white'></td></tr><tr><td style='text-align:center;'><img onmousedown='startSpin(\"Minute\", \"minus\");' onmouseup='stopSpin();' onclick='nextStep(\"Minute\",\"minus\");' src='" + imageFilesPath + "cal_minus.gif' width='13px' height='9px' onmouseover='changeBorder(this, 0)' onmouseout='changeBorder(this, 1)' style='border:1px solid white'></td></tr></table>";
		}

		vCalTime += "</td>\n<td align='right' valign='bottom' width='" + HourCellWidth + "px'></td></tr>";
		//vCalTime += "<tr><td colspan='7' style=\"text-align:center;\"><input style='width:60px;font-size:12px;' onClick='javascript:closewin(\"" + Cal.Ctrl + "\");'  type=\"button\" value=\"OK\">&nbsp;<input style='width:60px;font-size:12px;' onClick='javascript: winCal.style.visibility = \"hidden\"' type=\"button\" value=\"Cancel\"></td></tr>";
	}
	else //if not to show time.
	{
	   /*  vCalTime += "\n<tr>\n<td colspan='7' style=\"text-align:right;\">";
	    //close button
	    if (UseImageFiles) {
	        vCalClosing += "<img onmousedown='javascript:closewin(\"" + Cal.Ctrl + "\"); stopSpin();' src='"+imageFilesPath+"cal_close.gif' width='16px' height='14px' onmouseover='changeBorder(this,0)' onmouseout='changeBorder(this, 1)' style='border:1px solid white'></td>";
	    }
	    else {
	        vCalClosing += "<span id='close_cal' title='close'onmousedown='javascript:closewin(\"" + Cal.Ctrl + "\");stopSpin();' onmouseover='changeBorder(this, 0)'onmouseout='changeBorder(this, 1)' style='border:1px solid white; font-size: 10pt;'>x</span></td>";
	    } */
	    vCalClosing += "</tr>";
	}



	vCalClosing += "</tbody></table></td></tr>";
	calHeight += 31;
	vCalClosing += "</tbody></table>\n</span>";





	// determines if there is enough space to open the cal above the position where it is called
	/* if (ypos > calHeight)
	{
		ypos = ypos - calHeight;
	} */

	if (!winCal)
	{
		headID = document.getElementsByTagName("head")[0];

		// add javascript function to the span cal
		e = document.createElement("script");
		e.type = "text/javascript";
		e.language = "javascript";
		e.text = funcCalback;
		headID.appendChild(e);
		// add stylesheet to the span cal

		cssStr = ".calTD {font-size: 11px; text-align: center; border:0; }\n";
		cssStr += ".calR {font-size: 11px; text-align: center; font-weight: bold;}";

		style = document.createElement("style");
		style.type = "text/css";
		style.rel = "stylesheet";
		if (style.styleSheet)
		{ // IE
			style.styleSheet.cssText = cssStr;
		}

		else
		{ // w3c
			cssText = document.createTextNode(cssStr);
			style.appendChild(cssText);
		}

		headID.appendChild(style);
		// create the outer frame that allows the cal. to be moved
		divRef = document.createElement("div");
		divRef.id = referenceId+"calID";
		calSpanID=referenceId+"calID";
		divRef.style.position = "absolute";
		divRef.className ="calDynWidget";
		divRef.style.left =document.getElementById(referenceId).offsetLeft  + 'px';
		//span.style.top = (ypos - CalPosOffsetY) + 'px';
		divRef.style.width = CalWidth + 'px';
		//divRef.style.border = "1px solid #656565";
		divRef.style.padding = "0";
		divRef.style.cursor = "move";
		divRef.style.backgroundColor = SpanBgColor;
		divRef.style.zIndex = 100;
		
		
		var parentNodeRef=document.getElementById(referenceId);
		if (parentNodeRef.nextSibling) {
			parentNodeRef.parentNode.insertBefore(divRef, parentNodeRef.nextSibling);
		}
		else {
			parentNodeRef.parentNode.appendChild(divRef);
		}
		document.getElementById(calSpanID).onmousedown=function(){
			calstatus="n";
		};
		document.getElementById(calSpanID).onblur=function(){
			calstatus="n";
		};
		document.getElementById(calSpanID).onmouseout=function(){			
				calstatus="y";
			
		};
		
		document.getElementById(referenceId).onmouseover=function() {
			calstatus = "n";
		};
		document.getElementById(referenceId).onmouseout=function() {
			
				calstatus="y";
						
		};
		document.getElementById(referenceId).onblur=function(){
			if(calstatus=="y"){
			var len=getElementsByClassName(document.body,'calDynWidget');;	 
			if(len!=""&&len.length>=0){
				for(i=0;i<len.length;i++){
					element=document.getElementById(len[i].id);
					element.parentNode.removeChild(element);
				}					
				calstatus="n";
			}			
		  }
		};
		
		//parentNodeRef.innerHTML=parentNodeRef.innerHTML+divRef;
		winCal = document.getElementById(calSpanID);
	}

	else
	{
		winCal = document.getElementById(calSpanID);
		winCal.style.visibility = "visible";
		winCal.style.Height = calHeight;

		// set the position for a new calendar only
		if (bNewCal === true)
		{
			winCal.style.left = (document.getElementById(referenceId).offsetLeft  + CalPosOffsetX) + 'px';
			//winCal.style.top = (ypos - CalPosOffsetY) + 'px';
		}
	}

	winCal.innerHTML = winCalData + vCalHeader + vCalData + vCalTime + vCalClosing;
	return true;
}




function NewCssCal(pCtrl,constraint,funcName)
{
	var  pFormat;
	var pScroller; 
	var pShowTime;
	var  pTimeMode;
	var  pShowSeconds;
	var curDate=new Date();
	calFormat = 'EN';
    referenceId=pCtrl;
	if(constraint!=""&&constraint!=undefined){
		EndYear=parseInt(constraint.split("-")[1]);
		StartYear=parseInt(constraint.split("-")[0]);
		DisableBeforeToday=false;
	}else{
		EndYear=0;
		StartYear=65;
		DisableBeforeToday=true;
	}
	if(funcName!=""&&funcName!=undefined&&funcName!=""+null){
		funcNode=funcName+"()";
	}else{
		funcNode="";
	}
	var len=getElementsByClassName(document.body,'calDynWidget');	 
	if(len!=""&&len.length>=0){
		for(i=0;i<len.length;i++){
			element=document.getElementById(len[i].id);
			element.parentNode.removeChild(element);
		}					
		
	}
	winCal="";
	dtToday = new Date();
	dtToday = curDate;
	Cal = new Calendar(dtToday);
	
	if (pShowTime !== undefined)
	{
	    if (pShowTime) {
	        Cal.ShowTime = true;
	    }
	    else {
	        Cal.ShowTime = false;
	    }

		if (pTimeMode)
		{
			pTimeMode = parseInt(pTimeMode, 10);
		}
		if (pTimeMode === 12 || pTimeMode === 24)
		{
			TimeMode = pTimeMode;
		}
		else
		{
			TimeMode = 24;
		}

		if (pShowSeconds !== undefined)
		{
			if (pShowSeconds)
			{
				Cal.ShowSeconds = true;
			}
			else
			{
				Cal.ShowSeconds = false;
			}
		}
		else
		{
			Cal.ShowSeconds = false;
		}

	}

	if (pCtrl !== undefined)
	{
		Cal.Ctrl = pCtrl;
	}

	if (pFormat !== undefined)
	{
		Cal.Format = pFormat.toUpperCase();
	}
	else
	{
		Cal.Format = "DDMMYYYY";
	}

	if (pScroller !== undefined)
	{
		if (pScroller.toUpperCase() === "ARROW")
		{
			Cal.Scroller = "ARROW";
		}
		else
		{
			Cal.Scroller = "DROPDOWN";
		}
	}

	exDateTime = document.getElementById(pCtrl).value; //Existing Date Time value in textbox.

	if (exDateTime)
	{ //Parse existing Date String
		var Sp1 = exDateTime.indexOf(DateSeparator, 0),//Index of Date Separator 1
		Sp2 = exDateTime.indexOf(DateSeparator, parseInt(Sp1, 10) + 1),//Index of Date Separator 2
		tSp1,//Index of Time Separator 1
		tSp2,//Index of Time Separator 2
		strMonth,
		strDate,
		strYear,
		intMonth,
		YearPattern,
		strHour,
		strMinute,
		strSecond,
		winHeight,
		offset = parseInt(Cal.Format.toUpperCase().lastIndexOf("M"), 10) - parseInt(Cal.Format.toUpperCase().indexOf("M"), 10) - 1,
		strAMPM = "";
		//parse month

		if (Cal.Format.toUpperCase() === "DDMMYYYY" || Cal.Format.toUpperCase() === "DDMMMYYYY")
		{
			if (DateSeparator === "/")
			{
				strMonth = exDateTime.substring(2, 4 + offset);
				strDate = exDateTime.substring(0, 2);
				strYear = exDateTime.substring(4 + offset, 8 + offset);
			}
			else
			{
				if (exDateTime.indexOf("D*") !== -1)
				{   //DTG
					strMonth = exDateTime.substring(8, 11);
					strDate  = exDateTime.substring(0, 2);
					strYear  = "20" + exDateTime.substring(11, 13);  //Hack, nur für Jahreszahlen ab 2000

				}
				else
				{
					strMonth = exDateTime.substring(Sp1 + 1, Sp2);
					strDate = exDateTime.substring(0, Sp1);
					strYear = exDateTime.substring(Sp2 + 1, Sp2 + 5);
				}
			}
		}

		else if (Cal.Format.toUpperCase() === "MMDDYYYY" || Cal.Format.toUpperCase() === "MMMDDYYYY"){
			if (DateSeparator === ""){
				strMonth = exDateTime.substring(0, 2 + offset);
				strDate = exDateTime.substring(2 + offset, 4 + offset);
				strYear = exDateTime.substring(4 + offset, 8 + offset);
			}
			else{
				strMonth = exDateTime.substring(0, Sp1);
				strDate = exDateTime.substring(Sp1 + 1, Sp2);
				strYear = exDateTime.substring(Sp2 + 1, Sp2 + 5);
			}
		}

		else if (Cal.Format.toUpperCase() === "YYYYMMDD" || Cal.Format.toUpperCase() === "YYYYMMMDD")
		{
			if (DateSeparator === ""){
				strMonth = exDateTime.substring(4, 6 + offset);
				strDate = exDateTime.substring(6 + offset, 8 + offset);
				strYear = exDateTime.substring(0, 4);
			}
			else{
				strMonth = exDateTime.substring(Sp1 + 1, Sp2);
				strDate = exDateTime.substring(Sp2 + 1, Sp2 + 3);
				strYear = exDateTime.substring(0, Sp1);
			}
		}

		else if (Cal.Format.toUpperCase() === "YYMMDD" || Cal.Format.toUpperCase() === "YYMMMDD")
		{
			if (DateSeparator === "")
			{
				strMonth = exDateTime.substring(2, 4 + offset);
				strDate = exDateTime.substring(4 + offset, 6 + offset);
				strYear = exDateTime.substring(0, 2);
			}
			else
			{
				strMonth = exDateTime.substring(Sp1 + 1, Sp2);
				strDate = exDateTime.substring(Sp2 + 1, Sp2 + 3);
				strYear = exDateTime.substring(0, Sp1);
			}
		}

		if (isNaN(strMonth)){
			intMonth = Cal.GetMonthIndex(strMonth);
		}
		else{
			intMonth = parseInt(strMonth, 10) - 1;
		}
		if ((parseInt(intMonth, 10) >= 0) && (parseInt(intMonth, 10) < 12))	{
			Cal.Month = intMonth;
		}
		//end parse month

		//parse year
		YearPattern = /^\d{4}$/;
		if (YearPattern.test(strYear)) {
		    if ((parseInt(strYear, 10)>=StartYear) && (parseInt(strYear, 10)<= (dtToday.getFullYear()+EndYear)))
		        Cal.Year = parseInt(strYear, 10);
		}
		//end parse year
		
		//parse Date
		if ((parseInt(strDate, 10) <= Cal.GetMonDays()) && (parseInt(strDate, 10) >= 1)) {
			Cal.Date = strDate;
		}
		//end parse Date

		//parse time

		if (Cal.ShowTime === true)
		{

			//parse AM or PM

			if (TimeMode === 12)
			{
				strAMPM = exDateTime.substring(exDateTime.length - 2, exDateTime.length);
				Cal.AMorPM = strAMPM;
			}

			tSp1 = exDateTime.indexOf(":", 0);
			tSp2 = exDateTime.indexOf(":", (parseInt(tSp1, 10) + 1));
			if (tSp1 > 0)
			{

				strHour = exDateTime.substring(tSp1, tSp1 - 2);
				Cal.SetHour(strHour);

				strMinute = exDateTime.substring(tSp1 + 1, tSp1 + 3);
				Cal.SetMinute(strMinute);

				strSecond = exDateTime.substring(tSp2 + 1, tSp2 + 3);
				Cal.SetSecond(strSecond);

			}
			else if (exDateTime.indexOf("D*") !== -1)
			{   //DTG
				strHour = exDateTime.substring(2, 4);
				Cal.SetHour(strHour);
				strMinute = exDateTime.substring(4, 6);
				Cal.SetMinute(strMinute);

			}
		}

	}

	selDate = new Date(Cal.Year, Cal.Month, Cal.Date);//version 1.7
	RenderCssCal(true);
}

function closewin(id) {

    if (Cal.ShowTime === true) {
        var MaxYear = dtToday.getFullYear() + EndYear;
        var beforeToday =
                    (Cal.Date < dtToday.getDate()) &&
                    (Cal.Month === dtToday.getMonth()) &&
                    (Cal.Year === dtToday.getFullYear())
                    ||
                    (Cal.Month < dtToday.getMonth()) &&
                    (Cal.Year === dtToday.getFullYear())
                    ||
                    (Cal.Year < dtToday.getFullYear());

        if ((Cal.Year >= MaxYear) && (Cal.Year <= StartYear) && (Cal.Month === selDate.getMonth()) && (Cal.Year === selDate.getFullYear())) {
            if (DisableBeforeToday === true) {
                if (beforeToday === false) {
                    callback(id, Cal.FormatDate(Cal.Date));
                }
            }
            else
                callback(id, Cal.FormatDate(Cal.Date));
        }
    }
    
	
	
}

function changeBorder(element, col, oldBgColor)
{
	/*if (col === 0)
	{
		element.style.background = HoverColor;
		element.style.borderColor = "black";
		element.style.cursor = "pointer";
	}

	else
	{
		if (oldBgColor)
		{
			element.style.background = oldBgColor;
		}
		else
		{
			element.style.background = "white";
		}
		element.style.borderColor = "white";
		element.style.cursor = "auto";
	}*/
}

function selectDate(element, date) {
    Cal.Date = date;
    selDate = new Date(Cal.Year, Cal.Month, Cal.Date);
    element.style.background = SelDateColor;
    RenderCssCal();
}

function pickIt(evt){
      var objectID;  
      if (document.addEventListener){ 
           objectID = evt.target.id;
      }else{
            objectID = event.srcElement.id;     
      }
      if (objectID.indexOf(calSpanID) === -1){
      if(calstatus=='y'){
         	var len=getElementsByClassName(document.body,'calDynWidget');;    
			if(len!=""&&len.length>=0){
               	for(i=0;i<len.length;i++){
                	element=document.getElementById(len[i].id);
                    element.parentNode.removeChild(element);
                }
				   calstatus="n";
                }
            }      
      }
}

document.onmousedown = pickIt;


// performs a single increment or decrement
function nextStep(whatSpinner, direction)
{
	if (whatSpinner === "Hour")
	{
		if (direction === "plus")
		{
			Cal.SetHour(Cal.Hours + 1);
			RenderCssCal();
		}
		else if (direction === "minus")
		{
			Cal.SetHour(Cal.Hours - 1);
			RenderCssCal();
		}
	}
	else if (whatSpinner === "Minute")
	{
		if (direction === "plus")
		{
			Cal.SetMinute(parseInt(Cal.Minutes, 10) + 1);
			RenderCssCal();
		}
		else if (direction === "minus")
		{
			Cal.SetMinute(parseInt(Cal.Minutes, 10) - 1);
			RenderCssCal();
		}
	}

}

// starts the time spinner
function startSpin(whatSpinner, direction)
{
	document.thisLoop = setInterval(function ()
	{
		nextStep(whatSpinner, direction);
	}, 125); //125 ms
}

//stops the time spinner
function stopSpin()
{
	clearInterval(document.thisLoop);
}

/***********Calendar Code ends Here***************/

/***********Validation check starts Here*****************/
function alphanumericCheck(strFieldName, strID) {
    var objTextInput = $('#' + strFieldName);
    var strID = $('#' + strID);
    var alphaExp = /^[\w\u0E00-\u0E7F ]+$/gi;
    var retVal = false;
    if (!objTextInput.val().length) {
        strID.show();
        objTextInput.focus();
    } else if (!alphaExp.test(objTextInput.val())) {
        strID.show();
        objTextInput.focus();
    } else {
        strID.hide();
        retVal = true;
    }
    return retVal;
}

function alphaCheck(strFieldName, strID, strID2) {
    var objTextInput = $('#' + strFieldName);
    var strID = $('#' + strID);
    var strID2 = $('#' + strID2);
    //var alphaExp = /^[a-zA-Z\s\u4E00-\u9FA0]/gi;
    var alphaExp = /^[a-zA-Z\s]+$/gi;
    var retVal = false;
    if (!objTextInput.val().length) {
        strID.show();
        strID2.hide();
        objTextInput.focus();
    } else if (!alphaExp.test(objTextInput.val())) {
        strID.hide();
        strID2.show();
        objTextInput.focus();
    } else {
        strID.hide();
        strID2.hide();
        retVal = true;
    }
    return retVal;
}

function numCheck(strFieldName, strID, strID2,strID3 ) {
    var objTextInput = $('#' + strFieldName);
    var strID = $('#' + strID);
    var strID2 = $('#' + strID2);
	var strID3 = $('#' + strID3);
    var alphaExp = /^[0-9]+$/;
    var retVal = false;
    if (!objTextInput.val().length) {
        strID.show();
        strID2.hide();
		strID3.hide();
        objTextInput.focus();
    } else if (!alphaExp.test(objTextInput.val())) {
        strID.hide();
        strID2.show();
		strID3.hide();
        objTextInput.focus();
    }else if (objTextInput.val().length < 7) {
        strID.hide();
        strID2.hide();
		strID3.show();
        objTextInput.focus();
    }
	else {
        strID.hide();
        strID2.hide();
        strID3.hide();
		retVal = true;
    }
    return retVal;
}

function dobCheck(strFieldName, strID, strID2) {

    var objTextInput = $('#' + strFieldName);
    var strID = $('#' + strID);
    var strID2 = $('#' + strID2);
    var alphaExp = /^(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[012])[/](19|20)[0-9][0-9]$/;
    var retVal = false;
    var values=objTextInput.val();
    if(values==""||values=="dd/mm/yyyy"){
        strID.show();
        strID2.hide();
        objTextInput.focus();
	}else if (!alphaExp.test(objTextInput.val())) {
		strID.hide();
		strID2.show();
		objTextInput.focus();
    } else {
        strID.hide();
		strID2.hide();
		retVal = true;
	}
    return retVal;
}

function radioCheck(cName, strID) //Radio validation
{
    var radioCheckBox = $("input." + cName + ":checked").length;
    var retVal = false;
    if (!radioCheckBox) {
        $('#' + strID + '').show();
        $("input." + cName + ":first").focus();
    } else {
        $('#' + strID + '').hide();
        retVal = true;
    }
    return retVal;
}
function emailCheck(strFieldName, strID, strID2) {
    var objTextInput = $('#' + strFieldName);
    var strID = $('#' + strID);
    var strID2 = $('#' + strID2);
    //var alphaExp = /\w+@[A-Za-z_]+?\.[a-zA-Z]{2,6}/;
    var alphaExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    //var alphaExp = /^[a-zA-Z_\u4E00-\u9FA0]+@[a-zA-Z\u4E00-\u9FA0]+\.[a-zA-Z\u4E00-\u9FA0]{2,6}$/;
    var retVal = false;
    if (!objTextInput.val().length) {
        strID.show();
        strID2.hide();
        objTextInput.focus();
    } else if (!alphaExp.test(objTextInput.val())) {
        strID2.show();
        strID.hide();
        objTextInput.focus();
    } else {
        strID.hide();
        strID2.hide();
        retVal = true;
    }
    return retVal;
}

function isSelected(objTextInput, strID) {
    var retVal = false;
    var values = $('#' + objTextInput + '').val();
    if (values == 0) {
        $('#' + strID + '').show();
        $('#' + objTextInput + '').focus();
        retVal = false;
    } else {
        $('#' + strID + '').hide();
        retVal = true;
    }
    return retVal;
}
function  patternCheck(strFieldName, strID, strID2){
	 var objTextInput = $('#' + strFieldName);
    var strID = $('#' + strID);
    var strID2 = $('#' + strID2);
    var alphaExp = /^05[0-9]$/;
    var retVal = false;
    if (!objTextInput.val().length) {
        strID.show();
        strID2.hide();
        objTextInput.focus();
    } else if (!alphaExp.test(objTextInput.val())) {
        strID.hide();
        strID2.show();
        objTextInput.focus();
    } else {
        strID.hide();
        strID2.hide();
	   retVal = true;
    }
    return retVal;
}

function promoCheck(strFieldName, strID){
	var objTextInput = $('#' + strFieldName);
	var strID = $('#' + strID);
	var retVal = false;
	if(objTextInput.val().length){
		strID.show();
	}else{
		strID.hide();
		retVal = true;
	}
	return retVal;
}
function appendHiddenField(frmElement){
	var hdnElement=document.createElement("input");
	var fornElemnt=frmElement;
	hdnElement.type="hidden";
	hdnElement.name="resourceId";
	hdnElement.value=window.location.href.split("=")[1];
	$('form[name='+fornElemnt+']').append(hdnElement);
}
/***********Validation Check Ends Here*******************/

function validateAuto() {
$("#getQuote .error").each(function(){
    $(this).hide();
});
    if (
    isSelected('countryDL', 'errautoCountryDL') && isSelected('vehicleMake', 'errvehicleMake') && isSelected('vehicleModel', 'errvehicleModel') && isSelected('vehicleYear', 'errvehicleYear') && isSelected('autoSalutation', 'errautoSal') && alphaCheck('autoFname', 'errautoFname', 'errautoFname1') && alphaCheck('autoLname', 'errautoLname', 'errautoLname1') && dobCheck('autoDob', 'errautoDob', 'errautoDob1') &&  patternCheck('autoareaCode',  'errautoAreaCodeNo', 'errautoAreaCodeNo1') && numCheck('automobileNo', 'errautomobileNo', 'errautomobileNo1','errautomobileNo2')&& emailCheck('autoEmail', 'errautoEmail', 'errautoEmail1')) {
	//&& promoCheck('autoPromoCode','errAutoPromo')
	//appendHiddenField('autoForm');
	document.autoForm.action = URLPath+"/dcaae/resourceservlet?resourceid=getQuoteFromTridion";
	//Doubleclick code - AutoForm
		var vCountry = $("#countryDL option:selected").text();
		var vMake = $("#vehicleMake option:selected").text();
		var vModel = $("#vehicleModel option:selected").text();
		var vYear = $("#vehicleYear option:selected").text();
		var aDob = $("#autoDob").val();
		var aSalutation = $("#autoSalutation option:selected").text();
		var aPromoCode = $("#autoPromoCode").val();
		var axel = Math.random() + "";
		var a = axel * 10000000000000;
		
		var urlString="https://4101399.fls.doubleclick.net/activityi;src=4101399;type=car_o219;cat=carov168;u1=" + vCountry + ";u2=" + vMake + ";u3=" + vModel + ";u4=" + vYear + ";u5=" + aDob + ";u6=" + aSalutation + ";u7=" + aPromoCode + ";ord=" + a + "?";
		var encodedUrl=encodeURI(urlString);
		/* var iframeMarkup="<iframe src="+encodedUrl+" width='1' height='1' frameborder='0' style='display:none'></iframe>";
		$(iframeMarkup).appendTo('body'); */

		// End of Doubleclick code	
	
        return true;
    } else {
        return false;
    }
}
function validateHome() {
$("#getQuote .error").each(function(){
    $(this).hide();
});
    if (
    isSelected('coverLimit', 'errcoverLimit') && isSelected('homeSalutation', 'errHomeSal') && alphaCheck('HomefName', 'errHomefName', 'errHomefName1')  && alphaCheck('HomelName', 'errHomelName', 'errHomelName1') && patternCheck('homeAreaCode', 'errhomeAreaCodeNo', 'errhomeAreaCodeNo1') && numCheck('homemobileNo', 'errhomemobileNo', 'errhomemobileNo1','errhomemobileNo2')&& dobCheck('dateOfBirth', 'errHomeDate', 'errHomeDate1')   && isSelected('houseType', 'errhouseType')  && isSelected('buildingAge', 'errbuildingAge') && isSelected('emirateId', 'erremirateId') && emailCheck('homeEmail', 'errhomeEmail', 'errhomeEmail1')/* && promoCheck('homePromoCode','errHomePromo') */) {
	//appendHiddenField('homeform');
	document.homeform.action = URLPath+"/dcaae/resourceservlet?resourceid=getHomeQuoteFromTridion";
	
	//Doubleclick code - HomeForm
		var cLimit = $("#coverLimit option:selected").text();
		var hSalutation = $("#homeSalutation option:selected").text();
		var hPromoCode = $("#homePromoCode").val();
		var axel = Math.random() + "";
		var a = axel * 10000000000000;

		var urlString = "https://4194796.fls.doubleclick.net/activityi;src=4194796;type=quote786;cat=1-quo529;u1=" + cLimit + ";u3=" + hPromoCode + ";u2=" + hSalutation + ";ord=" + a + "?";
		var encodedUrl=encodeURI(urlString);
		var iframeMarkup="<iframe src="+encodedUrl+" width='1' height='1' frameborder='0' style='display:none'></iframe>";
		$(iframeMarkup).appendTo('body');
		//End of doubleclick code
	
        return true;
    } else {
        return false;
    }
}
function validateTravel() {
	document.getElementById("tridionTravelEndDtIdHidden").value = document.getElementById("travelEDate").value; 
$("#getQuote .error").each(function(){
    $(this).hide();
});
  if (document.getElementById("errorMsgDataDisplay").innerHTML == "") {
   	if (radioCheck('travelRadio1', 'errtravelRadio1') && radioCheck('travelRadio2', 'errtravelRadio2') && dobCheck('travelSDate', 'errtravelSDate', 'errtravelSDate1') && dobCheck('travelEDate', 'errtravelEDate', 'errtravelEDate1') && isSelected('CoverLPlan', 'errCoverLPlan') && isSelected('travelSalutation', 'errTravelSal') && alphaCheck('TravelfName', 'errTravelfName', 'errTravelfName1') && alphaCheck('TravellName', 'errTravellName', 'errTravellName1') && dobCheck('travelDob', 'errtravelDob', 'errtravelDob1') && patternCheck('travelareaCode', 'errtravelareaCode', 'errtravelareaCode1') && numCheck('travelMobileNo', 'errtravelMobileNo', 'errtravelMobileNo1','errtravelMobileNo2') && emailCheck('travelEmail', 'errtravelEmail', 'errtravelEmail1')/* && promoCheck('travelPromoCode','errTravelPromo')*/) {
   		
			//appendHiddenField('travelForm');
		document.travelForm.action = URLPath+"/dcaae/resourceservlet?resourceid=getTravelQuoteFromTridion";
		
	//Doubleclick code - TravelForm
		var tSalutation = $("#travelSalutation option:selected").text();
		var tDob = $("#travelDob").val();
		var tPromoCode = $("#tPromoCode").val();
		var cLPlan = $("#CoverLPlan option:selected").text();
		var tSDate = $("#travelSDate").val();
		var tEDate = $("#travelEDate").val();
		var tType = $("input[name='trip']:checked").val()
		var cOption = $("input[name='group']:checked").val()
		var axel = Math.random() + "";
		var a = axel * 10000000000000;
		
		var urlString = "https://4194794.fls.doubleclick.net/activityi;src=4194794;type=quote416;cat=quote266;u6=" + tSalutation + ";u7=" + tDob + ";u8=" + tPromoCode + ";u1=" + cOption + ";u3=" + tSDate + ";u2=" + tType + ";u5=" + cLPlan + ";u4=" + tEDate + ";ord=" + a + "?";
		var encodedUrl=encodeURI(urlString);
		var iframeMarkup="<iframe src="+encodedUrl+" width='1' height='1' frameborder='0' style='display:none'></iframe>";
		$(iframeMarkup).appendTo('body');

		//End of doubleclick code
	
		
		return true;
   	}
   	else {
   		return false;
   	}
   }else{
   	return false;
   }
}





function getQuoteToggle(){
	if(document.getElementById("getQuote")){
		$(".tabClass").click(function(){				
		$(".tabClass").removeClass("activeTab");	    
		$(this).addClass("activeTab");	    	    
		$(".tabContent").hide();
		if(this.id=="autoTab"){
			$("#autoForm").show();
		}
		if(this.id=="homeTab"){
			$("#homeForm").show();
		}
		if(this.id=="travelTab"){
			$("#travelForm").show();
		}
	
	});
	}
	
	
	if(document.getElementById("getQuote")){
		if(document.getElementById("autoForm")){
			document.getElementById("autoDob").onfocus=function(evt){
				if(document.getElementById("autoDob").value == 'dd/mm/yyyy') { document.getElementById("autoDob").value = ''} 
				NewCssCal('autoDob','','');					 
				$("[name='autoForm'] .button").click(function(){
					$("#autoDLCountryHidden").value=$("#countryDL option:selected").text() ;
					$("#autoModelHidden").value=$("#vehicleModel option:selected").text() ; 
				})
		}}
		
		if(document.getElementById("travelForm")){
		document.getElementById("travelDob").onfocus=function(){
			if(document.getElementById("travelDob").value == 'dd/mm/yyyy') { document.getElementById("travelDob").value = ''} 
			
		   	NewCssCal('travelDob','','');				  
		};
		document.getElementById("travelSDate").onfocus=function(){
			if(document.getElementById("travelSDate").value == 'dd/mm/yyyy') { document.getElementById("travelSDate").value = ''} 
		
		    NewCssCal('travelSDate','0-50','dataValueExtract');	
	      
	    };
		document.getElementById("travelEDate").onfocus=function(){
			if(document.getElementById("travelEDate").value == 'dd/mm/yyyy') { document.getElementById("travelEDate").value = ''} 
		var curDate = new Date();
		NewCssCal('travelEDate','0-50','endDateValidation');	      
	    };
		document.getElementById("multiTrip").onclick=function(){
       
             var dateStore=new Date();
             var endDate=new Date();
             var endDate=new Date(endDate.setDate(endDate.getDate() + 365)) ;
			 var monthVal=dateStore.getMonth()+1;
			 var dateVal=dateStore.getDate();
			 var endVal=endDate.getDate();
			  if(monthVal<10){
			 	monthVal="0"+monthVal;
			 }else{
			 	monthVal=monthVal;
		 	}if(dateVal<10){
			 	dateVal="0"+dateVal;
			 }else{
			 	dateVal=dateVal;
		 	}
			if(endVal<10){
			 	endVal="0"+endVal;
			 }else{
			 	endVal=endVal;
		 	}
            document.getElementById("travelSDate").value=dateVal+"/"+monthVal+"/"+dateStore.getFullYear();
            document.getElementById("travelEDate").value=endVal+"/"+monthVal+"/"+endDate.getFullYear();
            document.getElementById("travelEDate").disabled= true;
			document.getElementById("errorMsgDataDisplay").innerHTML="";         
		};
		document.getElementById("singleTrip").onclick=function(){
        
            document.getElementById("travelSDate").value="dd/mm/yyyy";
            document.getElementById("travelEDate").value="dd/mm/yyyy";
			document.getElementById("travelEDate").disabled=false; 
		}};
	
	
		if(document.getElementById("homeForm")){
			document.getElementById("dateOfBirth").onfocus=function(evt){
				if(document.getElementById("dateOfBirth").value == 'dd/mm/yyyy') { document.getElementById("dateOfBirth").value = ''} 
				NewCssCal('dateOfBirth','','');					
			
		}}
		

}
}


function dataValueExtract(){
    if (document.getElementById("multiTrip").checked) {
        var startDateHold = document.getElementById("travelSDate").value;
        var starYear = document.getElementById("travelSDate").value.split("/");
        var totalDate = new Date(starYear[2], starYear[1] - 1, starYear[0]);
        var endDate = totalDate.setDate(totalDate.getDate() + 365);
        var monthValue;
        var dateValue;
        endDate = new Date(endDate);
        if (endDate.getMonth() < 9) {
            var end = endDate.getMonth() + 1;
            monthValue = "0" + end;
        }
        else {
            monthValue = endDate.getMonth() + 1;
        }
if (endDate.getDate() < 10) {
            var end = endDate.getDate();
            dateValue = "0" + end;
        }
        else {
            dateValue = endDate.getDate();
        }
        document.getElementById("travelEDate").value = dateValue + "/" + monthValue + "/" + endDate.getFullYear();
        document.getElementById("travelEDate").disabled = true;
    }
}




function endDateValidation(){
	   if(document.getElementById("singleTrip").checked){				
					var startDate=(document.getElementById("travelSDate").value).split("/");
					var endDate=(document.getElementById("travelEDate").value).split("/");
					var startDateRef= parseInt(new Date(endDate[2],endDate[1],endDate[0]).getTime() - new Date(startDate[2],startDate[1],startDate[0]).getTime());
					if((startDateRef/84600000)>90){
					document.getElementById("errorMsgDataDisplay").innerHTML="<span>Choose Annual Multi-trip for the required duration.</span>";
					}else{
					document.getElementById("errorMsgDataDisplay").innerHTML="";
					}
       	  
		}
	
	}
/****** Home LeadGenCode Goes Here******************/

function getUserInfo(){ 
	 createScript(URLPath+"/dcaae/referenceservlet?resourceid=getUserInfo&callback=displayUserInfo");
 }
 

function showUserMsg(data){
	console.log("in showUserMsg "+data);
	document.getElementById("msg").innerHTML = data.resultSet.message;
}



function displayUserInfo(resultSet){
	var data=resultSet;
    if (data.loggedIn == true) {
        $('#homefName')[0].value = data.firstName;
        $('#homelName')[0].value = data.lastName;
        $('#homeAreaCode')[0].value = data.areaCode;
        $('#homemobileNo')[0].value = data.phoneNumber;
        $('#homeEmail')[0].value = data.email;
    }
}
function displayMsgtoUser(data){
	document.getElementById("msg").innerHTML=data.message;
	setSelectedIndex();

}

this.trackLeadGenInfo = function(pageName,product){
 	var events = "event10";
 	if (s != undefined) {
 		trackPageHits(pageName, events, product);
 	}
 }

 this.getPageNameFromTridion = function(){
 	if (s != undefined) {
 		return s.pageName;
 	}
 	return "";
 }

 this.getParamsForSiteCatalyst = function(formFields){
 	var product = document.getElementById("prodSelect").options[document.getElementById("prodSelect").selectedIndex].text;
 	var pageName = getPageNameFromTridion();
 	trackLeadGenInfo(pageName,product);
 }

 function saveLeadGen(){
 	var url = URLPath+"/dcaae/referenceservlet?resourceid=saveLeadGen&callback=displayMsgtoUser";
 	var formFields ="&"+$('#leadgenform').serialize();
 	url+=formFields;
    createScript(url);
     try {
 		getParamsForSiteCatalyst(formFields);
 	}catch(e){
 		console.log("Error while sending Lead Gen information to Site Catalyst["+e+"]");
 	}
 }


function leadGen(selProduct){
$("#LeadgenGetQuote .error").each(function(){
$(this).hide();
}); 
	if(selProduct){
        if (isSelected('homeSalutation', 'errHomeSal') && alphaCheck('homefName', 'errHomefName', 'errHomefName1') && alphaCheck('homelName', 'errHomelName', 'errHomelName1')&& patternCheck('homeAreaCode', 'errhomeAreaCodeNo','errhomeAreaCodeNo1') && numCheck('homemobileNo', 'errhomemobileNo', 'errhomemobileNo1','errhomemobileNo2') && emailCheck('homeEmail', 'errhomeEmail', 'errhomeEmail1') && isSelected('prodSelect', 'errSectProd')) {
            saveLeadGen();
        }	
	}else{
        if (isSelected('homeSalutation', 'errHomeSal') && alphaCheck('homefName', 'errHomefName', 'errHomefName1') && alphaCheck('homelName', 'errHomelName', 'errHomelName1') && patternCheck('homeAreaCode', 'errhomeAreaCodeNo','errhomeAreaCodeNo1') && numCheck('homemobileNo', 'errhomemobileNo', 'errhomemobileNo1','errhomemobileNo2') && emailCheck('homeEmail', 'errhomeEmail', 'errhomeEmail1') ) {
            saveLeadGen();
        }
	}
}

//function for empty some div on change of some dropdown
function emptyOnChange(selectId, emptyId){
	if(document.getElementById(selectId)){
		$("#"+selectId).bind('onchange', function(){
			if(document.getElementById(emptyId)){
				$("#"+emptyId).empty();
			}
		})
	}
}

function setSelectedIndex(){
        try {
            var ele = document.getElementById("prodSelect");
            for (var i = 0; i < ele.options.length; i++) {
                if (ele.options[i].value == "") {
                    ele.options[i].selected = true;
                    return;
                }
            }
        } 
        catch (e) {
               console.log(" error occured while setting "+e);        
        }
    }

	/**********************************************Outagemessage*********************************/
// JavaScript Document
var UDPage = "https://www.aig.ae/_3699_486340.html";
$(document).ready(function(){ 
	
	//injectTransacUrl();
	//onchangeVehMake();
	if (document.getElementById("getQuote")) {
		prodDepGetQuote();
	}
	
	if (document.getElementById("gridDetailNav")) {
		prodDepProductsGetQuote();
	}
	
 	if(document.getElementById("assistanceForm")){
		//prodDepNeedAsst();
	}
	
	
	if(document.getElementById("LeadgenGetQuote")){
	//prodDepLeadGen();
	}
	 
});
function prodDepProductsGetQuote(){

	$("#getQuote").css("position","relative");
	$("#getQuote").append("<div id='getQuoteOverLayInner'></div>")
	$("#getQuote").append("<div id='getQuoteDiabledInner'><h5>THIS SECTION IS UNDER MAINTENANCE</h5><p>Please be advised that our online services are temporarily unavailable due to a maintenance activity. Our services are expected to resume on 14 November 2014, Friday at 01:00 PM UAE Time. <br/><br/> Thank you for your patience.</p></div>")
}
function prodDepGetQuote(){

	$(".hasBanner #getQuote").css("position","relative");
	$(".hasBanner #getQuote").append("<div id='getQuoteOverLay'></div>")
	$(".hasBanner #getQuote").append("<div id='getQuoteDiabled'><h5>THIS SECTION IS UNDER MAINTENANCE</h5><p>Please be advised that our online services are temporarily unavailable due to a maintenance activity. Our services are expected to resume on 14 November 2014, Friday at 01:00 PM UAE Time.<br/><br/> Thank you for your patience.</p></div>")
	
}

/*function prodDepNeedAsst(){
	$("#assistanceForm").append("<div id='needAsstOverLay'></div>")
	$("#assistanceForm").append("<div id='needAsstOverLayDiabled'><h5>THIS SECTION IS UNDER MAINTENANCE</h5><p>Please be advised that, online services are temporarily unavailable due to the maintenance activity. The online services are expected to be available again on Sunday 07:00 AM Dubai Time. <br /> <br /> Thank you for your patience.</p></div>")
	if($('body').hasClass("hasBanner")){		
		$("#assistanceForm").css("position","absolute")
	}else{
		$("#assistanceForm").css("position","relative")
	}
}

function prodDepLeadGen(){
	$("#LeadgenGetQuote").css("position","relative");
	$("#LeadgenGetQuote").append("<div id='leadGenOverLay'></div>")
	$("#LeadgenGetQuote").append("<div id='leadGenDiabled'><h5>THIS SECTION IS UNDER MAINTENANCE</h5><p>Please be advised that, online services are temporarily unavailable due to the maintenance activity. The online services are expected to be available again on Sunday 07:00 AM Dubai Time. <br /> <br /> Thank you for your patience.</p></div>")
}*/

/*function injectTransacUrl(){
	if(document.getElementById("serviceRequestMyAccLogin")){
		$("#serviceRequestMyAccLogin").attr("href",UDPage)
	} // for not login user
	
	if(document.getElementById("getQuote")){
		$("#retriveQuoteTriId").attr("href",UDPage)
	}
	
	$("#navListPanel li a").each(function(){
		 if(this.title=='Claims'){
			$(this).attr('href',UDPage);
		} 
		
		if(this.title=='Auto Renewal'){
			$(this).attr('href',UDPage);
		}	
});	

	
		$("#topLinks a").each(function(){
				if(this.innerHTML=='Service Request'){
				$(this).attr('href',UDPage);
			}
			if(this.innerHTML == "Contact Us"){
				$(this).attr('href',UDPage);
			}
			if(this.innerHTML == 'My Account'){
				$(this).attr('href',UDPage);
			}
		});
		
	
	if($("#gridCenter .navlist").length){
		$(".navlist li a").each(function(){
				if(this.innerHTML== 'My Account'){
					$(this).attr('href',UDPage);
				}
				if(this.innerHTML=='Service Request'){
					$(this).attr('href',UDPage);
				}
			});
		}

} */