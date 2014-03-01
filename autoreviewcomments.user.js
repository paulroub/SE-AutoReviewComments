/*

// ==UserScript==
// @name           AutoReviewComments for Stack Exchange sites
// @namespace      benjol
// @version        1.3.2
// @description    No more re-typing the same comments over and over!
// @homepage       https://github.com/Benjol/SE-AutoReviewComments
// @grant          none
// @include http*://*stackoverflow.com/questions*
// @include http*://*stackoverflow.com/review*
// @include http*://*stackoverflow.com/admin/dashboard*
// @include http*://*stackoverflow.com/tools*
// @include http*://*serverfault.com/questions*
// @include http*://*serverfault.com/review*
// @include http*://*serverfault.com/admin/dashboard*
// @include http*://*serverfault.com/tools*
// @include http*://*superuser.com/questions*
// @include http*://*superuser.com/review*
// @include http*://*superuser.com/admin/dashboard*
// @include http*://*superuser.com/tools*
// @include http*://*stackexchange.com/questions*
// @include http*://*stackexchange.com/review*
// @include http*://*stackexchange.com/admin/dashboard*
// @include http*://*stackexchange.com/tools*
// @include http*://*askubuntu.com/questions*
// @include http*://*askubuntu.com/review*
// @include http*://*askubuntu.com/admin/dashboard*
// @include http*://*askubuntu.com/tools*
// @include http*://*answers.onstartups.com/questions*
// @include http*://*answers.onstartups.com/review*
// @include http*://*answers.onstartups.com/admin/dashboard*
// @include http*://*answers.onstartups.com/tools*
// @include http*://*mathoverflow.net/questions*
// @include http*://*mathoverflow.net/review*
// @include http*://*mathoverflow.net/admin/dashboard*
// @include http*://*mathoverflow.net/tools*
// @include http*://discuss.area51.stackexchange.com/questions/*
// @include http*://discuss.area51.stackexchange.com/review*
// @include http*://discuss.area51.stackexchange.com/admin/dashboard*
// @include http*://discuss.area51.stackexchange.com/tools*
// @include http*://stackapps.com/questions*
// @include http*://stackapps.com/review*
// @include http*://stackapps.com/admin/dashboard*
// @include http*://stackapps.com/tools*
// ==/UserScript==
*/
function with_jquery(e){var s=document.createElement("script");s.type="text/javascript";s.textContent="("+e.toString()+")(jQuery)";document.body.appendChild(s)}
with_jquery(function(e){StackExchange.ready(function(){function s(a){window["selfUpdaterCallback:"+t]=function(b){b>z&&a(b,z,t)};e("<script />").attr("src",t).appendTo("head")}function f(a){return localStorage[A+a]}function h(a,b){localStorage[A+a]=b}function m(a){for(var b=localStorage.length-1;0<=b;b--){var d=localStorage.key(b);0==d.indexOf(A+a)&&localStorage.removeItem(d)}}function R(a){var b=new Date/1E3,d=(new Date).setHours(0,0,0)/1E3,d=b-d,b=b-a;if(b<F)return Math.round(b)+" seconds ago";
if(b<G)return Math.round(b/F)+" minutes ago";if(b<d)return Math.round(b/G)+" hours ago";if(b<H+d)return"yesterday";a=new Date(1E3*a);return b<I?"on "+J[a.getDay()]:a.toDateString()}function S(a){if(1E4>a)return a;if(1E5>a){var b=Math.floor(Math.round(a/100)/10);a=Math.round((a-1E3*b)/100);return b+(0<a?"."+a:"")+"k"}return Math.round(a/1E3)+"k"}function T(a){a=a.parents("div").find(".post-signature:last").first().find(".user-details > a:not([id])");return a.length?a.attr("href").split("/")[2]:"[NULL]"}
function U(){var a=e("#question").find(".owner").find(".user-details > a:not([id])");if(a.length)return a.text();a=e("#question").find(".owner").find(".user-details");return a.length?a.text():"[NULL]"}function V(a,b){var d=b.find("#userinfo");isNaN(a)?d.fadeOutAndRemove():e.ajax({type:"GET",url:"http://api.stackexchange.com/2.2/users/"+a+"?site="+v+"&jsonp=?",dataType:"jsonp",timeout:2E3,success:function(c){if(0<c.items.length){c=c.items[0];new Date/1E3-c.creation_date<w&&(u=!0,b.find(".action-desc").prepend(n));
B=c.display_name;var e=c.user_type.charAt(0).toUpperCase()+c.user_type.slice(1)+' user <strong><a href="/users/'+a+'" target="_blank">'+B+"</a></strong>,                                 member <strong>",g=c.creation_date,k=new Date/1E3,W=new Date(1E3*g),f=(new Date).setHours(0,0,0)/1E3,f=k-f,g=k-g,k="";g<f?k="since today":g<H+f?k="since yesterday":g<I?k="since "+J[W.getDay()]:g>x?(k="for "+Math.round(g/x)+" years",g%x>p&&(k+=", "+Math.round(g%x/p)+" months")):g>p?(k="for "+Math.round(g/p)+" months",
g%p>w&&(k+=", "+Math.round(g%p/w)+" weeks")):k="for "+Math.round(g/w)+" weeks";c=e+k+"</strong>,                                                                    last seen <strong>"+R(c.last_access_date)+"</strong>,                                                              reputation <strong>"+S(c.reputation)+"</strong>";d.html(c.replace(/ +/g," "))}else d.fadeOutAndRemove()},error:function(){d.fadeOutAndRemove()}})}function X(a){var b=a.find("#main"),d=e('<div><textarea/><a class="jsonp">jsonp</a><span class="lsep"> | </span><a class="save">save</a><span class="lsep"> | </span><a class="cancel">cancel</a></div>');
d.css({position:"absolute",left:b.position().left,top:b.position().top,width:b.css("width"),height:b.css("height"),background:"white"});for(var b="",c=0;c<f("commentcount");c++)var l=f("name-"+c),g=f("desc-"+c),b=b+("###"+l+"\n"+C(g)+"\n\n");d.find("textarea").width("100%").height("95%").val(b);d.find(".jsonp").click(function(){for(var a="callback(\n[\n",b=0;b<f("commentcount");b++)a+='{ "name": "'+f("name-"+b)+'", "description": "'+f("desc-"+b).replace(/"/g,'\\"')+'"},\n\n';d.find("textarea").val(a+
"]\n)");d.find("a:lt(2)").remove();d.find(".lsep:lt(2)").remove()});d.find(".cancel").click(function(){d.fadeOutAndRemove()});d.find(".save").click(function(){var b=d.find("textarea").val();m("name-");m("desc-");for(var b=b.split("\n"),c=0,g=0,f=0;f<b.length;f++){var l=e.trim(b[f]);0==l.indexOf("#")?(l=l.replace(/^#+/g,""),h("name-"+c,l),c++):0<l.length&&(l=D(l),h("desc-"+g,E(l)),g++)}h("commentcount",Math.min(c,g));q(a);d.fadeOutAndRemove()});a.append(d)}function C(a){markdown=a.replace(/<a href="(.+?)">(.+?)<\/a>/g,
"[$2]($1)").replace(/&amp;/g,"&");return markdown.replace(/<em>(.+?)<\/em>/g,"*$1*").replace(/<strong>(.+?)<\/strong>/g,"**$1**")}function D(a){html=a.replace(/\[([^\]]+)\]\((.+?)\)/g,'<a href="$2">$1</a>');return html.replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>").replace(/\*([^`]+?)\*/g,"<em>$1</em>")}function E(a){var b=RegExp("http://"+v,"g");return a.replace(RegExp(r,"g"),"$SITENAME$").replace(b,"http://$SITEURL$")}function Y(a){var b=a.html(),d=E(a.html().replace(n,""));if(!(-1<d.indexOf("<textarea"))){d=
e("<textarea />").css("height",2*a.height()).css("width",a.css("width")).val(C(d));a.parent("label").attr("for","borken");var c=e("<a>save</a>").click(function(){var b=e(this).parent(),c=D(b.find("textarea").val());h(b.attr("id"),E(c));b.html((u?n:"")+c.replace(/\$SITENAME\$/g,r).replace(/\$SITEURL\$/g,v));K(a)}).add('<span class="lsep"> | </span>').add(e("<a>cancel</a>").click(function(){e(this).parent().html(b);K(a)}));a.html(d.add(c))}}function K(a){a=a.parent("label");a.attr("for",a.prev().attr("id"))}
function L(){m("name-");m("desc-");e.each(M,function(a,b){h("name-"+a,b.Name);h("desc-"+a,b.Description)});h("commentcount",M.length)}function q(a){f("commentcount")||L();var b=a.find(".action-list");b.empty();for(var d=0;d<f("commentcount");d++){var c;c=f("name-"+d);c=-1<c.indexOf("[Q]")?"question":-1<c.indexOf("[A]")?"answer":"any";if("any"==c||c==a.posttype)c=f("desc-"+d).replace(/\$SITENAME\$/g,r).replace(/\$SITEURL\$/g,v).replace(/\$/g,"$$$"),c=Z.replace(/\$ID\$/g,d).replace("$NAME$",f("name-"+
d).replace(/\$/g,"$$$")).replace("$DESCRIPTION$",(u?n:"")+c),b.append(c)}N(a);$(a)}function $(a){a.find("label > span").dblclick(function(){Y(e(this))});a.find("input:radio").click(function(){a.find(".popup-submit").removeAttr("disabled");e(this).parents("ul").find(".action-selected").removeClass("action-selected");"hide"==f("hide-desc")&&e(this).parents("ul").find(".action-desc").hide();e(this).parent().addClass("action-selected").find(".action-desc").show()});a.find("input:radio").keyup(function(b){13==
b.which&&(b.preventDefault(),a.find(".popup-submit").trigger("click"))})}function N(a){a=a.find("ul.action-list li:not(.action-selected) span[id*='desc-']");"hide"==f("hide-desc")?a.hide():a.show()}function O(a,b,d,c){d=d.replace(/\n/g,"<BR/>");b=e(aa.replace("$TITLE$",b).replace("$BODY$",d));b.find(".notify-close").click(function(){e(this).parent().fadeOutAndRemove();c()});a.find("h2").before(b)}function ba(a,b,d){e.ajax({type:"GET",url:a+"?jsonp=?",dataType:"jsonp",jsonpCallback:"callback",timeout:2E3,
success:b,error:d,async:!1})}function ca(a){var b=(new Date).setHours(0,0,0,0),d=f("LastUpdateCheckDay");null==d&&O(a,"Please read this!",'Thanks for installing this script.                             Please note that you can EDIT the texts inline by double-clicking them.                             For other options, please read the full text <a href="http://stackapps.com/q/2116" target="_blank">here</a>.',function(){});if(null!=d&&d!=b){var c=f("LastVersionAcknowledged");s(function(b,d,e){b!=c&&
O(a,"New Version!","A new version ("+b+') of the <a href="http://stackapps.com/q/2116">AutoReviewComments</a> userscript is now available (this notification will only appear once per new version, and per site).',function(){h("LastVersionAcknowledged",b)})})}h("LastUpdateCheckDay",b)}function P(a,b,d){ba(a,function(a){h("commentcount",a.length);m("name-");m("desc-");e.each(a,function(a,b){h("name-"+a,b.name);h("desc-"+a,D(b.description))});b()},d)}function da(a){var b=a.find("#remote-popup"),d=b.find("#remoteerror1"),
c=b.find("#remoteurl"),e=b.find("#remoteauto"),g=b.find("#throbber1");a.find(".popup-actions-remote").click(function(){c.val(f("RemoteUrl"));e.prop("checked","true"==f("AutoRemote"));b.show()});a.find(".remote-cancel").click(function(){g.hide();d.text("");b.hide()});a.find(".remote-save").click(function(){h("RemoteUrl",c.val());h("AutoRemote",e.prop("checked"));b.hide()});a.find(".remote-get").click(function(){g.show();P(c.val(),function(){q(a);g.hide()},function(a,b){d.text(b)})})}function ea(a){var b=
a.find("#welcome-popup"),d=b.find("#customwelcome");a.find(".popup-actions-welcome").click(function(){d.val(n);b.show()});a.find(".welcome-cancel").click(function(){b.hide()});a.find(".welcome-force").click(function(){u=!0;q(a);b.hide()});a.find(".welcome-save").click(function(){var a=""==d.val()?"NONE":d.val();h("WelcomeMessage",a);n=d.val();b.hide()})}var z="1.3.2",t="https://github.com/Benjol/SE-AutoReviewComments/raw/master/dist/autoreviewcomments.min.user.js";if(window["selfUpdaterCallback:"+
t])window["selfUpdaterCallback:"+t](z);else{var v=window.location.hostname,y=document.title.split(" - "),r=y[y.length-1],B="user",Q="OP",A="AutoReviewComments-";"Stack Exchange"==r&&(r=y[y.length-2]);f("WelcomeMessage")||h("WelcomeMessage","Welcome to "+r+"! ");var n="NONE"==f("WelcomeMessage")?"":f("WelcomeMessage"),u=!1,aa='<div id="announcement" style="background:orange;padding:7px;margin-bottom:10px;font-size:15px"> <span class="notify-close" style="border:2px solid black;cursor:pointer;display:block;float:right;margin:0 4px;padding:0 4px;line-height:17px"> <a title="dismiss this notification" style="color:black;text-decoration:none;font-weight:bold;font-size:16px">x</a> </span> <strong>$TITLE$</strong> $BODY$ </div>',
Z='<li> <input id="comment-$ID$" type="radio" name="commentreview"/> <label for="comment-$ID$"> <span id="name-$ID$" class="action-name">$NAME$</span> <span id="desc-$ID$" class="action-desc">$DESCRIPTION$</span> </label> </li>',M=[{Name:"Answers just to say Thanks!",Description:'Please don\'t add "thanks" as answers. Invest some time in the site and you will gain sufficient <a href="http://$SITEURL$/privileges">privileges</a> to upvote answers you like, which is the $SITENAME$ way of saying thank you.'},
{Name:"Nothing but a URL (and isn't spam)",Description:'Whilst this may theoretically answer the question, <a href="http://meta.stackoverflow.com/q/8259">it would be preferable</a> to include the essential parts of the answer here, and provide the link for reference.'},{Name:"Requests to OP for further information",Description:"This is really a comment, not an answer. With a bit more rep, <a href=\"http://$SITEURL$/privileges/comment\">you will be able to post comments</a>. For the moment I've added the comment for you, and I'm flagging this post for deletion."},
{Name:"OP using an answer for further information",Description:"Please use the <em>Post answer</em> button only for actual answers. You should modify your original question to add additional information."},{Name:"OP adding a new question as an answer",Description:'If you have another question, please ask it by clicking the <a href="http://$SITEURL$/questions/ask">Ask Question</a> button.'},{Name:"Another user adding a 'Me too!'",Description:'If you have a NEW question, please ask it by clicking the <a href="http://$SITEURL$/questions/ask">Ask Question</a> button. If you have sufficient reputation, <a href="http://$SITEURL$/privileges/vote-up">you may upvote</a> the question. Alternatively, "star" it as a favorite and you will be notified of any new answers.'}],
J="Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),F=60,G=3600,H=86400,I=518400,w=604800,p=2592E3,x=31536E3;e("#content").delegate(".comments-link","click",function(){var a=e(this).attr("id").replace("-link",""),b=e(this).parents(".question, .answer").attr("class").split(" ")[0];if(!(0<e("#"+a).find(".comment-auto-link").length)){var d=e('<span class="lsep"> | </span>').add(e('<a class="comment-auto-link">auto</a>').click(function(){var c=e('<div id="popup" class="popup" style="width:690px; position: absolute; display: block"> <div id="close" class="popup-close"><a title="close this popup (or hit Esc)">&#215;</a></div> <h2 class="handle">Which review comment to insert?</h2> <div style="overflow:hidden" id="main"> <div class="popup-active-pane"> <div id="userinfo" style="padding:5px;background:#EAEFEF"> <img src="http://sstatic.net/img/progress-dots.gif"/> </div> <ul class="action-list" style="height:440;overflow-y:auto"> </ul> </div> <div style="display:none" class="share-tip" id="remote-popup"> enter url for remote source of comments (use import/export to create jsonp) <input id="remoteurl" type="text" style="display: block; width: 400px;"/> <img id="throbber1" style="display:none" src="http://sstatic.net/img/progress-dots.gif"/> <span id="remoteerror1" style="color:red"/> <div style="float:left"> <input type="checkbox" id="remoteauto"/> <label title="get from remote on every page refresh" for="remoteauto">auto-get</label> </div> <div style="float:right"> <a class="remote-get">get now</a> <span class="lsep"> | </span> <a class="remote-save">save</a> <span class="lsep"> | </span> <a class="remote-cancel">cancel</a> </div> </div> <div style="display:none" class="share-tip" id="welcome-popup"> configure "welcome" message (empty=none): <div> <input id="customwelcome" type="text" style="width: 300px;"/> </div> <div style="float:right"> <a class="welcome-force">force</a> <span class="lsep"> | </span> <a class="welcome-save">save</a> <span class="lsep"> | </span> <a class="welcome-cancel">cancel</a> </div> </div> <div class="popup-actions"> <div style="float: left; margin-top: 18px;"> <a title="close this popup (or hit Esc)" class="popup-actions-cancel">cancel</a> <span class="lsep"> | </span> <a title="see info about this popup" class="popup-actions-help" href="http://stackapps.com/q/2116" target="_blank">info</a> <span class="lsep"> | </span> <a class="popup-actions-see">see-through</a> <span class="lsep"> | </span> <a title="reset any custom comments" class="popup-actions-reset">reset</a> <span class="lsep"> | </span> <a title="use this to import/export all comments" class="popup-actions-impexp">import/export</a> <span class="lsep"> | </span> <a title="use this to hide/show all comments" class="popup-actions-toggledesc">show/hide desc</a> <span class="lsep"> | </span> <a title="setup remote source" class="popup-actions-remote">remote</a> <img id="throbber2" style="display:none" src="http://sstatic.net/img/progress-dots.gif"/> <span id="remoteerror2" style="color:red"/> <span class="lsep"> | </span> <a title="configure welcome" class="popup-actions-welcome">welcome</a> </div> <div style="float:right;"> <input class="popup-submit" type="button" disabled="disabled" style="float:none; margin-left: 5px" value="Insert"> </div> </div> </div> </div>');
c.find(".popup-close").click(function(){c.fadeOutAndRemove()});c.posttype=b;u=!1;q(c);c.find(".popup-actions-cancel").click(function(){c.fadeOutAndRemove()});c.find(".popup-actions-reset").click(function(){L();q(c)});c.find(".popup-actions-see").hover(function(){c.fadeTo("fast","0.4").children().not("#close").fadeTo("fast","0.0")},function(){c.fadeTo("fast","1.0").children().not("#close").fadeTo("fast","1.0")});c.find(".popup-actions-impexp").click(function(){X(c)});c.find(".popup-actions-toggledesc").click(function(){var a=
f("hide-desc")||"show";h("hide-desc","show"==a?"hide":"show");N(c)});da(c);ea(c);c.find(".popup-submit").click(function(){var b=c.find("input:radio:checked"),b=C(b.parent().find(".action-desc").html()).replace(/\[username\]/g,B).replace(/\[OP\]/g,Q);e("#"+a).find("textarea").val(b).focus();b=b.indexOf("[type here]");0<=b&&e("#"+a).find("textarea")[0].setSelectionRange(b,b+11);c.fadeOutAndRemove()});if(!window.VersionChecked&&"true"==f("AutoRemote")){var d=c.find("#throbber2"),g=c.find("#remoteerror2");
d.show();P(f("RemoteUrl"),function(){q(c);d.hide()},function(a,b){g.text(b)})}e("#"+a).append(c);c.center();StackExchange.helpers.bindMovablePopups();var k=T(e(this));V(k,c);Q=U();window.VersionChecked||(ca(c),window.VersionChecked=!0)}));setTimeout(function(){e("#"+a).find(".comment-help-link").parent().append(d)},15)}})}})});
