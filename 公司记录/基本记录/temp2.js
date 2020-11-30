define(function (require, exports, module) {
    var uibase = require("uibase");
    require('bootstrap');
    require('uiutils');
    require('uiutilsserverpush');
    require("dbenums");
    require("layout");
    require('ztree');
    require('uidialog');
    if (location.href.indexOf("native=1") == -1 && $.browser.msie && parseInt($.browser.version) < 9) {
    	$("#downnewbrs").dialog({width:700, height:300, modal:true, title:"请下载最新版IE浏览器或使用360、QQ等第三方浏览器的极速模式！", showOnlyClose:true});
    	return;
    }
    require('ztree3');
    require("uicombobox");
    require("zeroclipboard");
    require("vueutils");
    require("mousetrap");
    var nativeair = require("nativeair");
    
    if (window['gofuncstring'] && window['loginsuccessed']) {
		$.showLoading({text:"后台正在进入待办处理阶段，请耐心等待...",customClass:"loadingtext"});
	}
    
    if (window['errorlogininfo']) {
    	uibase.alert(window['errorlogininfo']);
    }
    
    var filtertext = "";
    
    /** 月份主题切换快捷键(需主题自身支持) begin */
    var cssmonth = new Date().getMonth();
    var monthchange = function (monthadd) {
    	$(document.body).removeClass("bd_month" + cssmonth);
    	cssmonth+=monthadd;
    	if (cssmonth >= 12) {
    		cssmonth = 0;
    	}
    	if (cssmonth < 0) {
    		cssmonth = 11;
    	}
    	$(document.body).addClass("bd_month" + cssmonth);
    }
    Mousetrap.bind(['ctrl+alt+shift+.'], function(e) {
    	monthchange(1);
	});
    Mousetrap.bind(['ctrl+alt+shift+,'], function(e) {
    	monthchange(-1);
	});
    /** 月份主题切换快捷键 end */
    
 // 常用控件的封装
    jQuery.fn.extend({
    	// 通用异步菜单树
    	gzMenuTree: function(origOptions) {
    		var options = {
    				itemClick: $.noop, // 当树节点被点击时触发
    				itemDoubleClick: $.noop,
    				successcreatetree: $.noop
    		}
    		var opts = $.extend (true, {}, options, origOptions);
    		var setting = {
    				expandSpeed : "",
    				showLine : true,
    				checkable : false,
    				fontCss:function(setting, treenode) {
    					if (treenode.hl) {
    						return {"font-weight":"bold"};
    					}
    				},
    				async: !filtertext,
    				asyncUrl: ctx + "/gz/menumanage/MenuManageController/getMenuNameOrMenuId.vot?filtertext=" + encodeURIComponent(encodeURIComponent(filtertext)),
    				asyncParam: ['sid'],
    				callback : {
    					click: function(id,treid, treenode) {
    						opts.itemClick.apply(this, arguments);
    						$(".deptinfodiv dl.dl-horizontal dd").empty();
    						$(".deptinfodiv dl.dl-horizontal").wrapDataByClass(treenode);
    					},
    					dblclick: opts.itemDoubleClick
    				}
    		};
    		
    		var thisObj = this;
    		
    		if (filtertext) {
    			$.post(ctx + "/gz/menumanage/MenuManageController/getMenuNameOrMenuId.vot?filtertext=" + encodeURIComponent(encodeURIComponent(filtertext)), function(data){
    				var createdztree = thisObj.zTree(setting, data);
    				if ($.isFunction(opts.successcreatetree)) {
    					opts.successcreatetree(createdztree);
    				}
    			}, "json");
    			return;
    		}
    		return this.zTree(setting);
    	}
    });
    
    exports.init = function () {
    	
    	var menudatas = null;
    	var menupnodemap = {};
    	
    	var loginaction = function(verifiedpos, slidercontainer) {
    		$.post(ctx + "/checkLoginInfo.vot", encodeURI($("#tologinform").serialize()) + (verifiedpos?"&verifiedpos=" + verifiedpos:""), function(data){
				if (data == 'true') {
					$.post(ctx + "/LoginAction.vot", encodeURI($("#tologinform").serialize()) + (verifiedpos?"&verifiedpos=" + verifiedpos:""), function(data){
						if (data.indexOf("loginbody") == -1) {
							loginSuccess();
						}
					});
				} else {
					if (data && data != 'false') {
						uibase.alert(data, !!slidercontainer);
						if (data == '验证失败！') {
							$(".gologin").data("imgveryfying", false);
							$(".gologin").click();
						}
					} else {
						uibase.alert("帐号或密码不正确！");
					}
				}
				if (slidercontainer) {
					slidercontainer.dialog("destroy");
				}
				return;
			});
    	}
    	
    	$(".gologin").click(function(){
    		if (verifycodetype == '2') {// 滑动验证
    			if ($(this).data("imgveryfying"))
    				return;
    			
    			$(this).data("imgveryfying", true);
    			seajs.use("slider", function(md){
    				$.getJSON(ctx + "/getVerifyCodeImgDatas.vot", function(imgdata) {
    					var slidercontainer = $('<div style="position:relative;width:320px;"><img class="fitimg" src="data:image/png;base64,' + imgdata.fitimg + '" style="box-shadow:0 0px 2px 2px rgba(0,0,0,.5); position:absolute;left:0;top:30px;z-index:2;"/>\
    							<img alt="Red Star" src="data:image/png;base64,' + imgdata.originimg + '" /><div class="slidercontainer"></div></div>')
    					.dialog({buttons:{},className:"slide_verify_dialog", onClose: function(){
    						$(".gologin").data("imgveryfying", false);
    					}});
    					
    					slidercontainer.find(".slidercontainer").slider({min:0, max:305, value:20, slide: function(e, ui){
	    						slidercontainer.find(".fitimg").css("left", ui.value - 20);
	    					}, change: function(e, ui){
	    						loginaction(ui.value - 20, slidercontainer);
	    					}
    					});
    					
    				});
    			});
    		} else {
    			loginaction();
    		}
    	});
    	
    	if (window['loginsuccessed']) {
    		loginSuccess();
    	}
    	
    	function gotoModuleByRemind (source_function_id, msg_id) {
    		var thefinalarr = ['4A95FDC4948A4982B466B1874D876A10','menu_message_center_aaaa','menu_cur_user_info_aaaa','585b36edde0c4788a34a7676c969c971','fc58a1830f4c469babb46402a1c5747f'];
    		if (!source_function_id || source_function_id == 'null') {// 若不含有功能点来源的消息直接弹出消息处理框
    			$.getJSON(ctx + "/gz/commonsearch/CommonSearchController/getOneFunctionParam.vot?type=redirections&sid=1365f2a66ed943b691e5de30d7c4d353&id=1901", function(onefuncparam) {
    				seajs.use("uicomsearch", function(){
    					var comsearchobj = $("<div style='display:none'></div>").comsearch({onlycreate:true});
    					if (msg_id)
    						comsearchobj.data("uiComsearch")._toLaunchFuncs(onefuncparam, {msg_id:msg_id});
    				});
    			});
    			return;
    		}
			if (source_function_id) {
				
				var sfd = source_function_id;
				// 菜单当中找路径'
				function findfunc(cdmenus, patharr) {
					for (var i = 0; i < cdmenus.length; ++i) {
						var funcid = cdmenus[i].fd;
						funcid = /\d+/.exec(funcid);
						patharr.push(cdmenus[i].id);
						if (sfd == funcid) {
							return patharr; 
						}
						var finalpath = findfunc(cdmenus[i].cd, patharr);
						if (finalpath)
							return finalpath;
						
						patharr.pop();
					}
					// 4A95FDC4948A4982B466B1874D876A10,f79a1724cb344c63b7aa61424afde93e,7846f98e1ccc4ec29e8e5d0c41a4a9d5,bc2f33086b3941e9aeee5898e9574882
					// bc2f33086b3941e9aeee5898e9574882,7846f98e1ccc4ec29e8e5d0c41a4a9d5,f79a1724cb344c63b7aa61424afde93e
					return null;
				}
				
				var patharr = ['4A95FDC4948A4982B466B1874D876A10'];
				patharr = findfunc(menudatas, patharr);
				if (patharr)
					thefinalarr = patharr; 
				else
					thefinalarr = null;
			}
			
			if (thefinalarr)
				gotoModuleImmedia(thefinalarr);
    	}
    	
    	
    	function tolocationMenuById(menuId, notneedfd) {
    		
    		function findhasfdmenu(cdmenus, patharr) {
				for (var i = 0; i < cdmenus.length; ++i) {
					patharr.push(cdmenus[i].id);
					if (cdmenus[i].fd) {
						return patharr; 
					}
					var finalpath = findhasfdmenu(cdmenus[i].cd, patharr);
					if (finalpath)
						return finalpath;
					
					patharr.pop();
				}
			}
			
			// 菜单当中找路径'
			function findfuncbymenuid(cdmenus, patharr) {
				for (var i = 0; i < cdmenus.length; ++i) {
					patharr.push(cdmenus[i].id);
					if (cdmenus[i].id == menuId) {
						if (!notneedfd)
							findhasfdmenu(cdmenus[i].cd, patharr)
						return patharr;
					}
					var finalpath = findfuncbymenuid(cdmenus[i].cd, patharr);
					if (finalpath)
						return finalpath;
					
					patharr.pop();
				}
				// 4A95FDC4948A4982B466B1874D876A10,f79a1724cb344c63b7aa61424afde93e,7846f98e1ccc4ec29e8e5d0c41a4a9d5,bc2f33086b3941e9aeee5898e9574882
				// bc2f33086b3941e9aeee5898e9574882,7846f98e1ccc4ec29e8e5d0c41a4a9d5,f79a1724cb344c63b7aa61424afde93e
				return null;
			}
			var thefinalarr = null;
			var patharr = ['4A95FDC4948A4982B466B1874D876A10'];
			patharr = findfuncbymenuid(menudatas, patharr);
			if (patharr)
				thefinalarr = patharr; 
			else
				thefinalarr = null;
			
			if (thefinalarr)
				gotoModuleImmedia(thefinalarr);
    	}
    	
    	window['tolocationMenuByIdGlobal'] = tolocationMenuById;
    	
    	function loginSuccess() {
    		
    		
    		// 加载非用户缓存数据 begin
    		var cachsuccess = false;
    		var cachingmsg = null;
    		var loadingtime = "";
    		var loadingseconds = 0;
    		if (window['browsercache_loadingseconds'] && window['browsercache_loadingseconds'] != '0' && window['browsercache_loadingseconds'] != 'null') {
    			loadingseconds = parseInt(window['browsercache_loadingseconds'], 10);
    			loadingtime = "（可能需要" + loadingseconds + "秒）";
    		}
    		
    		function getuicachedata() {
    			cachsuccess = false;
    			setTimeout(function(){
        			if (!cachsuccess) {
    	    			cachingmsg = $.message({
    	    				message:"为提高后续操作性能，正在加载缓存数据" + loadingtime + "，请稍后...",
    	    				type: 'success',
    	    				iconClass:"el-icon-loading",
    	    				duration:0
    	    			});
        			}
        		}, 700);
    			
    			$.ajax({
    				url:ctx + "/common/getuicachedata.vot",
    				timeout:loadingseconds * 1000,
    				success:function(allcachedata,st, xhr) {
    					if (allcachedata) {
            				allcachedata = JSON.parse(allcachedata);
            				window['allcachedata'] = allcachedata;
            			}
            			cachsuccess = true;
            			if (cachingmsg) {
            				cachingmsg.close();
            				cachingmsg = null;
            				uibase.alert("加载完成，请正常使用！", true);
            			}
    				},
    				error:function(xhr,st,err){
    					if (!cachsuccess) {
    	    				if (cachingmsg) {
    	        				cachingmsg.close();
    	        				cachingmsg = null;
    	        				uibase.confirm("由于网络缓慢，加载超时，是否重新尝试加载？", function(closefunc){
    	        					getuicachedata();
    	        					closefunc(true);
    	        				});
    	        			}
    	    			}
    				}
    			});
    		}
    		getuicachedata();
    		// 加载非用户缓存数据 end
    		
    		$.get(ctx + "/common/getusercachedata.vot", function(allusercachedata) {
    			if (allusercachedata) {
    				allusercachedata = JSON.parse(allusercachedata);
    				window['allusercachedata'] = allusercachedata;
    			}
    		});
    		
    		$.get(ctx + "/common/getsysprop.vot?propname=login_cognos", function(lc){
    			if (lc == '1') {
    				$.get(ctx + "/common/getsysprop.vot?propname=cognos_dburl", function(dburl){
						  seajs.use(ctx + "/js/cognos_login.js",  function(){
							  $.cognos_login(window['_current_user'], dburl, "aaaaaa", ctx + "/gz/CognosIntegrateController/getCognosInfos.vot", function(success, trusttick){
								  if (success) {
//									  setTimeout(function(){
//									  setiframelink(endparams.joitn("&"), trusttick);
//									  }, 500)
								  }
							  });
						  });
					});
    			}
    		});
    		
    		$.drawWaterMark();
    		
    		$.get(ctx + "/common/getDisabledRightTopBtn.vot", function(data){
    			$("#commontopbtnul, #commontopbtnul li").show();
    			data && $("." + data.split(",").join(",.") + ",." + data.split(",").join("-split,.") + "-split").hide();
    		});
    		
    		$.getJSON(ctx + "/common/getLogonInfo.vot", function(data){
    			$(".headerfunc").wrapDataByClass(data);
    			window['_current_user'] = data.username;
    			window['_current_dept'] = data.dept;
    		});
    		
    		setTimeout(function(){
    			$(".ico-gohgico").popover({animation:true, placement: 'bottom', content:"合规管理系统，请点击此进入", trigger:'auto'}).popover('show');
    		}, 1000);
    		
    		var setcurrtheme = function(){
    			var currtheme = $.cookie('currtheme');
    			if (currtheme) {
    				$("#themecss").remove();
    				if (currtheme != 'defaults')
    					$(document.body).append('<link id="themecss" rel="stylesheet" href="' + ctx + '/themes/' + currtheme + '/defaults.css"/>');
    			}
    		}
    		setcurrtheme();
    		
    		$(".ico-changesurf").popover({animation:true, placement: 'bottom', html:true, trigger:'auto',
    			content:function(){
    					var currtheme = $.cookie('currtheme');
    				    var themes = "<div>";
    				    var themsjson = JSON.parse($(".ico-changesurf").attr("themes"));
    				    $(themsjson).each(function(){
    				    	if (currtheme == this.sid || !currtheme && this.sid == 'defaults') {
    				    		danselected = " selected ";	
    				    	} else {
    				    		danselected = "";
    				    	}
    				    	var thumbnail = "/themes/" + this.sid;
    				    	if (this.sid == 'defaults') {
    				    		thumbnail = "/common/css";
    				    	}
    				    	
    				    	themes += "<div themecode=" + this.sid + " class='danfc surfc" + danselected + 
    				    	"'><div style='background-image:url(" + ctx + thumbnail + "/assets/thumbnail.png)' class='surfp'></div><div>" + this.themename + "</div></div>"
    				    });
    				    themes += "<div style='clear:left;'></div></div>";
    					return themes;
    				}
    			}).click(function(e){
    				$(".ico-changesurf").popover("show");
    				e.stopPropagation();
    			});
    		
    		$(".headerfunc").on("click", ".surfc", function(e){
    			$.cookie('currtheme', $(this).attr("themecode"));
    			$(this).parent().find(".surfc").removeClass("selected");
    			$(this).addClass("selected");
    			
    			if ($(this).is(".danfc")) {
    				danselected = " selected ";
    				shenselected = " ";
    			} else {
    				danselected = "  ";
    				shenselected = " selected ";
    			}
    			$(".ico-changesurf").popover("hide");
    			e.stopPropagation();
    		
    			setcurrtheme();
    		});
    		
    		$(".exchangelang").popover({animation:true, placement: 'bottom', html:true, trigger:'auto',
				content:function(){
						var antelope_lang = $.cookie('antelope_lang');
						var langselect = "<div class='zh_CN' style='cursor:pointer'>中文</div><div class='en_US' style='cursor:pointer'>English</div>";
						return langselect;
					}
				}).click(function(e){
					$(".exchangelang").popover("show");
					e.stopPropagation();
				});
    		
    		$(".headerfunc").on("click", ".zh_CN,.en_US", function(e){
    			$.cookie('antelope_lang', $(this).attr("class"));
    			location = location.href;
    			e.stopPropagation();
    		});
    		
    		$("body").click(function(){
    			$(".ico-gohgico,.ico-changesurf,.exchangelang").popover("hide");
    		});
    		setTimeout(function(){
    			$(".ico-gohgico").popover("hide");
    		}, 5000);
    		
    		// 获取弹窗提醒信息
    		clearInterval(window['sys_msg_alert']);
    		var alertmsgfunc = function() {
    			$.getJSON(ctx + "/common/getReceivedMessage.vot?nocache=" + Math.random(), function(data){
    				
    				if (data.length) {
    					reloadMarquee();
    				}
    				
    				$(data).each(function(idx){
    					var thisObj = this;
    					setTimeout(function(){
    						
    						if (thisObj.webpopup !== '0' || (!thisObj.source_function_id)) {
								$.notify({
									title: thisObj.title||'',
									message: thisObj.content||'',
									source_function_id: thisObj.source_function_id,
									receiversid: thisObj.receiversid,
									msg_id: thisObj.msg_id,
									type: "info",
									onClick: function() {
				    					clickMessageed(this.receiversid, this.source_function_id, this.msg_id);
									}
								});
    						}
    						if (thisObj.websound !== '0' || (!thisObj.source_function_id)) {
								try {
									if (document.getElementById("audi"))
										audi.play();
								} catch (e) {
								}
    						}
    					}, 1000 * idx);
    				});
    			});
    		}
//    		window['sys_msg_alert'] = setInterval(alertmsgfunc, msg_alertsecond * 1000);
    		alertmsgfunc();
    		
    		$.subscribe("indexpopover", function(msgdata){
    			$.notify({
					title: msgdata.title||'',
					message: msgdata.content||'',
					source_function_id: msgdata.source_function_id,
					receiversid: msgdata.receiversid,
					msg_id: msgdata.msg_id,
					type: "info",
					duration:window['_notify_duration'] || 4500,
					onClick: function() {
    					clickMessageed(this.receiversid, this.source_function_id, this.msg_id);
					}
				});
    			try {
					if (document.getElementById("audi"))
						audi.play();
				} catch (e) {
				}
				
				reloadMarquee();
				
    		});
    		
    		
    		window['openMustDoThingDialog'] = function() {
    			if (window['mustdothingarray'].length) {
    				var onething = window['mustdothingarray'].pop();
    				if (onething.widgettype == 'typepwd') {
    					$(".ico-pwd").trigger("click", {isMust:true});  					
    				}
    				
    				if (onething.widgettype == 'dynamicview') {
    					seajs.use("uidynamicview", function(){
    						var tform = $("<form class='form-horizontal'></form>");
    						  
							tform.hide();
    						  
    						tform.appendTo(document.body);
    						
    						tform.dynamicview({dynamicid:onething.widgetid, oparams: onething.widgetparams||{},
							  dllparam:null,
							  complete: function(){
								  // 内部按钮外控
								  var diagbtn = {};
								  tform.find(".isoutput").each(function(){
									  diagbtn[$.trim(this.innerText)] = {className:$(this).attr("btnclass")||'', text:this.innerText, relatebtnobj:this, click: function(e, success, orginbtn){
										  $(orginbtn.relatebtnobj).on("completedysubmit", function(e, succ){
											  success(succ);
										  }).click();
									  }}
								  });
								  
								  tform.dialog({
									  animate: false,
									  resizable: true,
									  showFullScreenBtn: true,
									  forbidClose:true,
									  title: "",
									  buttons: {},
									  onClose: function() {
										  setTimeout(function(){tform.remove();}, 0);
										  window['openMustDoThingDialog']();
									  }
								  });
								  tform.show();
								  tform.closest(".modal-dialog").width(tform.children("div").width() + 35);
								  tform.on("completesubmit", function(){
									  tform.dialog("close");
								  });
//    							  callbackfunc({defaultFullScreen:thisObj._getDefFullScreenFunction(operatejson), buttons: function(){return diagbtn}})}}
							  }
    						});
    					});
    				}
    			}
    		}
    		
    		// 核对系统使用前强制要求完成的工作
    		$.getJSON(ctx + "/common/getMustDoThings.vot", function(data){
    			window['mustdothingarray'] = data;
    			window['openMustDoThingDialog']();
    		});
    		
    		// 获取平台更新日志界面信息
    		$.get(ctx + "/common/getPfUpdatePage.vot", function(data){
    			if (data) {
    				var zhou = /^\d+/.exec(data);
    				var dtitle = "平台第" + (parseInt(zhou, 10) - 1) + "周更新日志";
//    				$("<div/>").appendTo(document.body).load(ctx + "/verlogs/" + data).dialog({showOnlyClose:true, title:dtitle, resizable:true});
    			}
    		});
    		
	    	$.getJSON(ctx + "/gz/menumanage/MenuManageController/getMenuInfo.vot?filter=true&onlyshowchecked=true", function(data){
	    		if (!data || !data.length)
	    			data = [{cd:[]}];
	    		
	    		var html = "<li class='m_menu_00' path='/gz/indexmodule.jsp'>" + $.i18n('antelope.home') + "</li>";
	    		window['show_home_tab'] = data[0].cd[0].ih == '1' ? "0":"1";
	    		if (window['show_home_tab'] != '1') {
	    			html = "";	
	    		}
	    		
//	    		data[0].cd = $.grep( data[0].cd, function(elementOfArray, indexInArray){
//	    			return elementOfArray.im != '1';
//	    		});
	    	
	    		$(data[0].cd).each(function(idx){
	    			this.parent_objid = data[0].id;
	    			menupnodemap[this.parent_objid] = data[0];
	    			html += "<li class='m_menu_0" + (idx + 1) + "' idstr='" + this.id + "' " + (this.im == '1' ? " style='display:none;' " : "") + ">" + this.n + "</li>";
	    		});
	    		$(".newnav ul").html(html);
	    		
	    		$(".newnav ul").find("[idstr]").each(function(idx){
	    			if (data[0].cd.length > idx)
	    				$(this).data("menudata", data[0].cd[idx]);
	    		});
	    		
	    		menudatas = data[0].cd;
	    		setTimeout(function(){
	    			setGoLeftRightVisible();
	    		}, 0);
	    		
	//    		prop, speed, easing, callback
				var optall = jQuery.speed( 200, null, null );
				
				optall.progress = function() {
					$(".addblur").css("filter", "blur(" + $("#tempdiv").css("left"));
					$(".addblur").css("-webkit-filter", "blur(" + $("#tempdiv").css("left"));
					$(".addblur").css("-moz-filter", "blur(" + $("#tempdiv").css("left"));
	    		}
				
				var doAnimation = function() {
					// Operate on a copy of prop so per-property easing won't be lost
					var anim = jQuery.Animation( this, jQuery.extend( {}, {left:0} ), optall );
	
					// Empty animations, or finishing resolves immediately
					if (jQuery._data( this, "finish" ) ) {
						anim.stop( true );
					}
				};
				
				$("#loginarea").fadeOut()
				$("#opaciytdiv").fadeOut();
				$("html body").css("overflow-y", "auto");
				if (cangoblur()) {
					$("#tempdiv").each(doAnimation);
				} else {
					$("#loginbgdiv").fadeOut();
					$("#addblurcontainer").fadeIn();
				}
				
				// 定位首页菜单。
				if (!window['leveltwo_id'])// 有固定需要定位的菜单，则不定位首页
					$(".newnav ul li").first().click();
				if (window['gofuncstring']) {// 当有功能条件字符串时，进入到待办界面
					// arrparams
					var sid = "";
					var arrparams = window['gofuncstring'].split("&");
					for (var i = 0; i < arrparams.length; ++i) {
						if (arrparams[i].split("=")[0] == 'sid') {
							sid = arrparams[i].split("=")[1];
							break;
						}
					}
					window['gofuncstring'] = "sid=" + sid + "&forward_dll=Kingstar.Core.Workflow.dll?Kingstar.Core.Workflow.Runtime.FrmFlowFormNode@InitOldFlow";
					
// http://risk.oatest.gzs.com.cn:81/antelopegz?sysId=test1&modelId=4E0A2CAD3C616E35E0535D0514ACA8C7&templateFormId=4DFAD6CEC3003DE6E0535D0514ACA48B&formInstanceId=4FB53C35C2101702E0535D0514AC545B&processId=15c15907572162fbf2cf9a34b69b0362&flowTemplateId=15ba9d95dfa04fa0e6d169c43ada706d
//					4A95FDC4948A4982B466B1874D876A10,f79a1724cb344c63b7aa61424afde93e,7846f98e1ccc4ec29e8e5d0c41a4a9d5,e82b9ea7282f4992bc151de9874b467a
					if (window['iscc'] == '1') {
						gotoModuleImmedia(['4A95FDC4948A4982B466B1874D876A10','menu_message_center_aaaa','menu_cur_user_info_aaaa','63e24832cfa74a5e820176c9057c35c7','fce7fb225b9a4e7eb3a2c2c3e07c9292']);
					} else {
						gotoModuleImmedia(['4A95FDC4948A4982B466B1874D876A10','menu_message_center_aaaa','menu_cur_user_info_aaaa','63e24832cfa74a5e820176c9057c35c7','24a1a73dcc8647118fca512fb8dbcda9']);
					}
				}
				
				
				// 定位指定菜单
				if (window['leveltwo_id']) {// 直接定位二级菜单位置
					tolocationMenuById(window['leveltwo_id']);
				}
				
				if (window['enmenupath']) {
					gotoModuleImmedia(window['enmenupath']);
				}
				
//				$(".header").animate({top:-97}, "fast").hover(function(){
//					$(".header").css("top",0);
////					$(".header").animate({top:0}, "fast");
//				}, function(){
//					$(".header").css("top",-97);
////					$(".header").animate({top:-97}, "fast");
//				});
				
//				gotoModuleImmedia(['4A95FDC4948A4982B466B1874D876A10','menu_message_center_aaaa','menu_cur_user_info_aaaa','1487161550559','1487161550560']);
//				gotoModuleImmedia(['4A95FDC4948A4982B466B1874D876A10','f79a1724cb344c63b7aa61424afde93e','7846f98e1ccc4ec29e8e5d0c41a4a9d5','e82b9ea7282f4992bc151de9874b467a']);
				
				resizeModuleContentMenu();
	    	});
	    	
	    	// im 初始化
	    	if (window['show_im_chatarea'] == '1') {
	    		seajs.use("uiim", function(){
	    			$.im();
	    		});
	    	}
	    	nativeair.checkNativeSettings();
    	}
    	
    	var gotobipage = function(currmenudata, jqcontainer, ep, ifrheight) {
    		if (currmenudata.fd.indexOf("pagemodule.jsp") != -1 || currmenudata.fd == '/ui' || currmenudata.dt == '4' || currmenudata.fd.indexOf("Antelope新平台操作手册.htm") != -1) {
    			if (!ifrheight)	{
    				ifrheight = "99.5%";
    			}
    			jqcontainer.html('<iframe src="' + ctx + currmenudata.fd + '" frameborder="0" style="margin:0; padding:0; border: 0; width:99.9%; height:' + ifrheight + ';"></iframe>')
    			return;
    		}
    		
    		if (currmenudata.fd.indexOf("http://") != -1 && currmenudata.dg == '1') {
    			open(currmenudata.fd);
    			return true;
    		}

			var getrectparams = function(paramname, defval) {
				var iframeht = new RegExp(paramname + "=[^&]+").exec(currmenudata.fd);
				if (!iframeht || iframeht.length == 0) {
					iframeht = defval;
				} else {
					iframeht = iframeht[0].split("=")[1];
				}
				
				return iframeht;
			}
			var ifrht = getrectparams("ifrheight", 1000);
			var ifrwi = getrectparams("ifrwidth", 1200);
			// http://10.22.9.74/views/v1_1/1?:embed=y&:showShareOptions=true&:display_count=no&:showVizHome=no#9&ifrheight=1500&ifrwidth=900
			
			var setiframelink = function (endparamstr, trusttick) {
				
			   var askflag = "?";
			   if (currmenudata.fd.indexOf("?") != -1) {
				   askflag = "&";
			   }
			   
			   var finalfd = currmenudata.fd;
			   if (trusttick) {
				   finalfd = finalfd + askflag + endparamstr;
				   if (finalfd.indexOf("views") != -1 && finalfd.indexOf("embed=y") != -1) {
					   finalfd = ctx + "/gz/tableau.jsp?fdurl=" + encodeURIComponent(finalfd);
				   }
			   }
			   
			   var marhtml = '<div id="marqueepart" style="position:absolute; top:0; left:0; right:0; height: 0px; border-style: solid; border-color: #cde8fb; border-width: 0 0 1px 0; background: #f2f2f2; overflow:hidden;">\
					<marquee onmouseover="this.stop()" onmouseout="this.start()" style="height:100%;  color: #3d89df; text-decoration: none;\
					position:absolute; top:0; left:0; right:40px; padding-top:4px; width:auto; \
					font-size: 14px;">\
					</marquee>\
					<button class="glyphicon glyphicon-remove-circle" onclick="$(this).parent().slideUp();" style="position: absolute; right:0; font-size: 19px; top:5px; border:none; background: none;"></button>\
				</div>';
				
			   if ((ifrwi + "").indexOf("%") == -1) {
					ifrwi = ifrwi + "px";
				} else {
					ifrwi = ifrwi.replace("%25", "%");
				}
			   jqcontainer.html('<div style="text-align:center;background-color:#f2f2f2;position:relative;">' + marhtml + '<iframe src="' + finalfd + '" frameborder="0" style="margin:0 auto;border: 0; width:' + ifrwi + '; height:' + ifrht + 'px;"></iframe></div>')
			   reloadMarquee();
			}
			
			$.getJSON(ctx + "/gz/menumanage/MenuManageController/getOuterlinkParams.vot?id=" + currmenudata.id, function(params) {
				var endparams = [];
				for (var pkey in params) {
					endparams.push(pkey + "=" + params[pkey]);
				}
				if (currmenudata.fd.indexOf("views") != -1 && currmenudata.fd.indexOf("embed=y") != -1) {
					$.get(ctx + "/common/getsysprop.vot?propname=cognos_dburl", function(dburl){
						  seajs.use(ctx + "/js/cognos_login.js",  function(){
							  $.cognos_login(window['_current_user'], dburl, currmenudata.fd, ctx + "/gz/CognosIntegrateController/getCognosInfos.vot", function(success, trusttick){
								  if (success) {
//									  setTimeout(function(){
									  setiframelink(endparams.join("&"), trusttick);
//									  }, 500)
								  }
							  })
							  
						  });
					  });
				} else {
					setiframelink(endparams.join("&"));
				}
			});
    	}
    	
    	function changeNavsecStatus(isstable, isclicknav) {
    		if (isstable) {
    			$(".navsec").css("position", "inherit");
    		} else {
    			$(".navsec").css("position", "absolute");
    			if (!isclicknav) {
    				$(".navsec").slideUp("fast");
    			}
    		}
    		resizeModuleContentMenu();
			var layout = $("#modulecontentmenu").data("layout");
			if (layout) {
				layout.options.resizeWithWindow = false;
				layout.resizeAll();
			}
    	}
    	
    	function gotoPortalPage(currmenudata, ep) {
    		if (currmenudata && currmenudata.fd && (currmenudata.fd.indexOf(".psml") != -1 || currmenudata.fd.indexOf("http://") != -1) || currmenudata.dt == '4') {
    			if (currmenudata.dt == '4' && !currmenudata.fd.startsWith('/common/customportal/')) {
        			var protalidparams = "";
        			if (currmenudata.fd) {
        				protalidparams = "?portalid=" + currmenudata.fd;
        			}
        			currmenudata.fd = "/common/customportal/" + window['custom_portal_skin'] + ".jsp" + protalidparams;
        		}
    			
				$.recordAccess(currmenudata.fd, currmenudata.n,  currmenudata.id);
				
				if (currmenudata.fd.indexOf("http://") != -1 || currmenudata.dt == '4') {
					if (ep != 'norefresh') {
						var ifrheight = null;
						if (currmenudata.dt == '4') {
							var iframeht = new RegExp("ifrheight=[^&]+").exec(currmenudata.fd);
							if (!iframeht || iframeht.length == 0) {
								ifrheight = "100%";
							} else {
								ifrheight = iframeht[0].split("=")[1] + "px";
							}
						}
						var isnewwindow = gotobipage(currmenudata, $("#modulecontent"), ep, ifrheight);
						if (isnewwindow)
							return true;
					}
				} else {
					
					var tpath = currmenudata.fd;
		    		if(tpath.indexOf('?') != -1) {
		    			tpath = tpath + "&view=true&nocache=" + Math.random();
		      		} else {
		      			tpath = tpath + "?view=true&nocache=" + Math.random();
		      		}
					
					$("#modulecontent").load(ctx + tpath, function(){
					});
					
					if (currmenudata.fd.indexOf("pswidth") != -1) {
						var params = currmenudata.fd.split("?")[1];
						var paramsarr = params.split("&");
						$(paramsarr).each(function(){
							if (this.indexOf("pswidth") != -1) {
								$("#modulecontent").css("width", this.split("=")[1] + "px").css("margin", "0 auto");
							}
						});
					}
					
				}
				
    			$("#modulecontent").show().addClass("isportal");
    			$(document.body).css("overflow-y", "auto");
    			$("#modulecontentmenu").hide();
    			resizeModuleContentMenu();
    			var navsecjq = $(".navsec");
    			if (!navsecjq.data("tempstable")) {
    				navsecjq.slideUp("fast", resizeModuleContentMenu);
    			}
    			if (navsecjq.data("tempstable")) {// 临时固定
    				navsecjq.data("lastactiveobj", currmenudata);
    			}
    			return true;
    		}
    		
    		return false;
    	} 
    	
    	$(".newnav").on("click", "li", function(e) {
    		var isorginactive = $(e.target).is(".active");
    		if (!isorginactive) {
	    		$(".newnav li").removeClass("active");
	    		$(this).addClass("active");
    		}
    		
    		var midx = $.inArray(this, $(".newnav li"));
    		
    		if (midx == 0 && window['show_home_tab'] == '1') {
    			$(".navsec").slideUp("fast", resizeModuleContentMenu);
    		} else {
    			var suplus = 1;
    			if (window['show_home_tab'] != '1') {
    				suplus = 0;
    			}
    			
    			var currmenudata = menudatas[midx - suplus];
    			if (gotoPortalPage(currmenudata))
    				return;
    			
    			if ($(this).data("menudata") && $(this).data("menudata").fd) {// 若一级菜单挂接了功能，显示功能
        			showAndGotoModule(this);
        		} else if (!isorginactive) { // 若切换的不是激活状态，则更换下方菜单
	    			$(".navsecinner ul").empty();
	    			
	    			$(menudatas[midx - suplus].cd).each(function(){
	    				this.parent_objid = menudatas[midx - suplus].id;
	    				menupnodemap[this.parent_objid] = menudatas[midx - suplus]; 
	    				var sechtml = "";
//	    				if (this.i) {
//	    					var imgurl = ctx + '/gz/resourcemanage/ResourceManageController/getSingleImageData.vot?imagesid=' + this.i;
//	    					sechtml = '<li class="ico-secion" idstr="' + this.id + '" style="background-image:url(\'' + imgurl + '\')">' + this.n + '</li>';
//	    				} else {
	    					sechtml = '<li class="ico-secion" idstr="' + this.id + '">' + this.n + '</li>';
//	    				}
	    				$(sechtml).data("menudata", this).appendTo($(".navsecinner ul"));
	    			});
	    			$(".navsecinner ul").hide().fadeIn("fast");
    			}
    			if (!$(".newnav").data("ismockclick")) {
    				var onemenudata = menudatas[midx - suplus];
    				if (onemenudata.aa == '1') {// 固定
    					changeNavsecStatus(true);
    					var navsecjq = $(".navsec"); 
    					navsecjq.data("tempstable", true);
    		    		if (navsecjq.find(".navsecinner li.active").length == 0) {
    		    			if (navsecjq.data("lastactiveobj")) {
    		    				var laobj = navsecjq.data("lastactiveobj");
    		    				navsecjq.find(".navsecinner li").each(function(){
    		    					if ($(this).data("menudata") == laobj) {
    		    						$(this).trigger("click", "norefresh");
    		    					}
    		    				});
    		    			} else {
    		    				navsecjq.find(".navsecinner li:first").click();
    		    			}
    		    			
    		    		}
    				} else {
    					if ($(".navsec").css("position", "inherit").data("tempstable", true)) {
    						changeNavsecStatus(false, true);
    						$(".navsec").data("tempstable", false);
    					}
    				}
    				if (!($(this).data("menudata") && $(this).data("menudata").fd)) {// 只有不存在功能的时候显示下拉二级菜单
    					$(".navsec").slideDown("fast", resizeModuleContentMenu);
    				}
    			}
    			setGoLeftRightVisible();
    		}
    		
    		if (gotoModule($(this).attr("path")))
    			return;
    	}).on("dblclick", "li", function(){
    		if ("1" != window['disabled_dblclick_level_one_menu']) {
    			changeNavsecStatus($(".navsec").css("position") == 'absolute');
    		}
    	});
    	
    	
    	$(document).on("click", function(){
    		if ($(".navsec").css("position") == 'absolute') {
    			$(".navsec").slideUp("fast");
    		}
    	});
    	
    	$(".newnav,.navsec").on("click", function(e){
    		e.stopPropagation();
    	});
    	
    	var showAndGotoModule = function(thisObj){
    		$("#modulecontent").hide();
			$(document.body).css("overflow-y", "hidden");
			$("#modulecontentmenu").show();
			
			// 布局
			$("#modulecontentmenu").layout({north:{spacing_open:0, size:24}, west:{size:window['leftnav_defwidth']}, fxName:'none', center__children:{north:{spacing_open:0}, onresize_end: function(){
			}}, onresize_end: function() {
	    	}});
			
			$("#modulecontentmenu").data("layout").close("west");
			
			gotoModuleOuter($(thisObj).data("menudata"));
    	}
    	
    	$("#navsecid").on("click", "li", function(e, ep) {
    		var dotnavsec = $(".navsec");
    		var navsecthat = this;
    		dotnavsec.find("li").removeClass("active");
    		$(this).addClass("active");
    		if (dotnavsec.css("position") == 'absolute') {
    			dotnavsec.slideUp("fast");
    		}
    		
    		if (gotoPortalPage($(this).data("menudata"), ep))
				return;
    		
    		if ($(this).data("menudata").fd) {
    			showAndGotoModule(this);
    			return;
    		}
    		
    		if (gotoModule($(this).attr("path")))
    			return;
    		
    		
    		// 组装banner条 
			var bannerhtml = [];
			bannerhtml.unshift('<li> ' + dotnavsec.find("li.active").text() + '</li>');
			bannerhtml.unshift('<li> ' + $(".newnav").find("li.active").text() + '</li>');
			$("#crumbline").html('<li class="crumbico"></li>' + bannerhtml.join('<li class="gap"></li>'));
    		
    		// 三级及后N级菜单显示
			$("#menutheme").remove();
			if ($(this).data("menudata").st) {// 若存在导航专用主题，则加载
				$('<link id="menutheme" rel="stylesheet" href="' + ctx + '/themes/' + $(this).data("menudata").st + '/defaults.css"/>').appendTo("body");
			}
			
    		var levelmenus = $(this).data("menudata").cd;
    		if (levelmenus && levelmenus.length) {
    			$("#modulecontent").hide();
    			$(document.body).css("overflow-y", "hidden");
    			$("#modulecontentmenu").show();
    			
    			if ($("#modulecontentmenu").data("layout"))
    				$("#modulecontentmenu").data("layout").open("west");
    			
    			// 布局
    			$("#modulecontentmenu").layout({north:{spacing_open:0, size:24}, panes:{tips:{Resize:"调整大小",Close:"关闭"}}, west:{size:window['leftnav_defwidth']}, fxName:'none', center__children:{north:{spacing_open:0}, onresize_end: function(){
    			}}, onresize_end: function() {
    				$("[_echarts_instance_]").trigger("layoutresize");
    	    	}});
    			if($(".ui-layout-toggler-west").hasClass("ui-layout-toggler-open")==false){
    				$(".ui-layout-toggler-west").click();
    			}
    			// 显示导航树结构
    			
    			// 处理菜单图标  
    			function dealwithlevelmenus(parenmenus,ppparent) {
    				for (var i = 0; i < parenmenus.length; ++i) {
    					var onepmenu = parenmenus[i];
    					onepmenu.parent_objid = ppparent.id;
    					menupnodemap[onepmenu.parent_objid] = ppparent; 
    					if (onepmenu.i ) {
    						if (onepmenu.i.indexOf("css:") != -1) {
    							onepmenu['iconSkin'] = onepmenu.i.substring(4);
    							onepmenu['icon'] = ctx + "/common/css/assets/none.png";
    						} else {
	    						if (onepmenu.i.indexOf("imagesid") == -1 && onepmenu.i.indexOf("newdocico") == -1 )
	    							onepmenu['icon'] = ctx + "/gz/resourcemanage/ResourceManageController/getSingleImageData.vot?imagesid=" + onepmenu.i;
    						}
    					} else {
//    						onepmenu['icon'] = ctx + "/gz/css/assets/newdocico.png";
    					}
    					if (onepmenu.cd) {
    						dealwithlevelmenus(onepmenu.cd, onepmenu);
    					}
    				}
    			}
    			
    			dealwithlevelmenus(levelmenus, $(navsecthat).data("menudata"));
    			
    			var setting = {
    				view: {
    					showLine : false,	
    				},
					expandSpeed : "",
					data: {
						key: {
							children: "cd",
							name:'n'
						}
					},
					check: {
						enable: false
					},
					checkedCol :"checked",
					checkType: { "Y": "ps", "N": "ps" },
					callback : {
						onClick: function(e, treeId, treenode){
							gotoModuleOuter(treenode);
						}
					}
				};
    			//alert(JSON.stringify(levelmenus));
				$.fn.zTree3.init($("#westnavtree"), setting, levelmenus);
    			
    			// alert(levelmenus.length);
    		}
    		
    	});
    	
    	
    	function gotoModuleOuter(treenode) {
    		if (treenode.dt == '4') {
    			var protalidparams = "";
    			if (treenode.fd) {
    				protalidparams = "?portalid=" + treenode.fd;
    			}
    			treenode.fd = "/common/customportal/" + window['custom_portal_skin'] + ".jsp" + protalidparams;
    		}
    		
    		if (treenode.fd) {
    			
    			$.recordAccess(treenode.fd, treenode.n, treenode.id);
    			
				var funcid = treenode.fd;
				funcid = /\d+/.exec(funcid);

				var comsch = null;
				if (!funcid || treenode.fd.indexOf("ImportFile") != -1) {
					var dllparams = treenode.fd.split("#");
					if (dllparams.length > 1) {
						dllparams = "&dllparams=" + encodeURIComponent(dllparams[1]);
					} else {
						dllparams = "";
					}
					if (treenode.funcjspname) {
						if (treenode.isabs) {
							comsch = treenode.funcjspname + "?action=getInitConfigDatas&" + dllparams;
						} else {
							comsch = "/gz/dllcounterparts/" + treenode.funcjspname + "?action=getInitConfigDatas&" + dllparams;
						}
					} else
						comsch = treenode.fd;
				} else {
					comsch = "/gz/commonsearch.jsp?action=getInitConfigDatas&id=" + funcid + "&fd=" + encodeURIComponent(encodeURIComponent(treenode.fd));
				}
				
				if ((comsch == '/ui' || treenode.dt == '4') && treenode.dg == '1') {
					open(ctx + comsch);
					return;
				}
				
				// 全局按钮根据是否为新页签来判断是否清空
				var findopenedmodule = $("[modulepath=\"" + comsch + "\"]");
				if (!findopenedmodule.length) {
					$(".globalbtncontainer").html('');// 全局按钮区域清空
    			}
				
				gotoModule(comsch, treenode.n, treenode.fd, treenode);
			}
			// 组装banner条 
			var bannerhtml = [];
			var inittreenode = treenode;
			var issectreenode = !treenode.getParentNode;
			while (treenode) {
				bannerhtml.unshift('<li treenodeid="' + treenode.id + '">' + treenode.n + '</li>');// <li class="gap"></li>';
				if (treenode.getParentNode)
					treenode = treenode.getParentNode();
				else
					treenode = null;
			}
			
			if (inittreenode && inittreenode.parent_objid != '4A95FDC4948A4982B466B1874D876A10') {
				if (!issectreenode)
					bannerhtml.unshift('<li> ' + $(".navsec li.active").text() + '</li>');
				bannerhtml.unshift('<li>' + $(".newnav li.active").text() + '</li>');
			}
			
			$("#crumbline").html('<li class="crumbico"></li>' + bannerhtml.join('<li class="gap"></li>'));
			
			
			
			$("#crumbline li").click(function(){
				tolocationMenuById($(this).attr("treenodeid"), true);
			});
			
			 var client = new ZeroClipboard( $(".crumbico")[0] );
			  client.on( "ready", function( readyEvent ) {
				  client.setText(bannerhtml.join(">").replace(/(<li[^>]*>|\s)/gi,"").replace(/<\/li>/gi,"").replace("^>"));
				  client.on( "aftercopy", function( event ) {
					  uibase.alert("复制成功");
			      });
			  });
    	}
    	
    	$(".goleft,.goright").click(function(){
    		var animatelen = $(this).parent().width() - 300;
    		var currleft = parseInt($(this).parent().find("ul").css("left"));
    		if (isNaN(currleft)) {
    			currleft = 0;
    		}
    		
    		if ($(this).is(".goright")) {
    			animatelen = -animatelen;
    		}
    		
    		currleft += animatelen;
    		currleft = Math.max(-parseInt($(this).parent().find("ul").width()) + 500, currleft);
    		currleft = Math.min(0, currleft);
    		
    		$(this).parent().find("ul").animate({left:currleft}, function(){
    			setGoLeftRightVisible();
    		});
    	});
    	
    	
    	$("#bfullscreenbtn").click(function (){
    		 uibase.alert('请您按键盘F11键即可！');
    		 $(document.body).css('paddingRight', 0);
    	});
    	
    	$(".globalbtncontainer").on("globalbtnadded", function(){
    		var layout = $("#modulecontentmenu").data("layout");
			if (layout) {
				layout.options.resizeWithWindow = false;
				layout.resizeAll();
			}    		
    	});
    	
    	$(".ico-pwd").click(function (e, data){
    		var eventdata = data;
    		var modifypwddig = $('<form>\
    				<div class="form-group form-group-sm "><label class="control-label col-sm-4">' + $.i18n('antelope.oldpwd') + '\
					</label>\
					<div class="col-sm-6">\
	    				<input name="oldpassword" type="password" valid=\'{"required":true,"label":"' + $.i18n('antelope.oldpwd') + '"}\' class="form-control input-sm"><b class="required"/>\
					</div></div>\
    				<div class="form-group form-group-sm "><label class="control-label col-sm-4">' + $.i18n('antelope.newpwd') + '\
    				</label>\
    				<div class="col-sm-6">\
    					<input name="newpassword" type="password" valid=\'{"required":true,"label":"' + $.i18n('antelope.newpwd') + '"}\' class="form-control input-sm"><b class="required"/>\
    				</div></div>\
    				<div class="form-group form-group-sm "><label class="control-label col-sm-4">' + $.i18n('antelope.newpwdagain') + '\
    				</label>\
    				<div class="col-sm-6">\
    					<input name="newpassword2" type="password" valid=\'{"required":true,"label":"' + $.i18n('antelope.newpwdsec') + '"}\' class="form-control input-sm"><b class="required"/>\
    				</div></div>\
    				<div class="form-group form-group-sm col-sm-12" style="padding-top:10px;">\
    				</div>\
    		</form>').dialog({
    			className:"modifypass",
    			title:$.i18n("antelope.pwdchange"),
    			forbidClose:data && data.isMust,
    			callback: function(success){
    				if (!modifypwddig.validate()) {
    					success(false);
    					return;
    				}
    				
    				if (modifypwddig.find("[name=newpassword]").val() != modifypwddig.find("[name=newpassword2]").val()) {
    					uibase.alert($.i18n("antelope.pwddif") + "！");
    					success(false);
    					return;
    				}
    				
    				seajs.use(ctx + "/gz/organizationmanage/DepartmentManageController/getPasswordRules.vot", function(md) {
    					var tdata = md.data;
    					var newpassword = modifypwddig.find("[name=newpassword]").val();
    					if (tdata.pwd_open == '1') {
    						
    						if (tdata.pwd_lencheck == '1') {
    							if (newpassword.length < parseInt(tdata.pwd_minlen)) {
    								uibase.alert($.i18n("antelope.pwdlenlest") + tdata.pwd_minlen + $.i18n("antelope.pwdlensuffix") + "！");
    								success(false);
        							return;
    							}
    							if (newpassword.length > parseInt(tdata.pwd_maxlen)) {
    								uibase.alert($.i18n("antelope.pwdlenmost") + tdata.pwd_maxlen + $.i18n("antelope.pwdlensuffix") + "！");
    								success(false);
        							return;
    							}
    							
    						}
	    					
	    					
	    					if (tdata.pwd_letter=='1' && (!/[a-z]/.test(modifypwddig.find("[name=newpassword]").val()) || !/[A-Z]/.test(modifypwddig.find("[name=newpassword]").val()))) {
	    						uibase.alert($.i18n("antelope.pwduplowcase") + "！");
	    						success(false);
	    						return;
	    					}
	    					
	    					if (tdata.pwd_diffold=='1' && modifypwddig.find("[name=newpassword]").val() == modifypwddig.find("[name=oldpassword]").val()) {
	    						uibase.alert($.i18n("antelope.pwdsameold") + "！");
	    						success(false);
	    						return;
	    					}
	    					
	    					if (tdata.pwd_likeold=='1') {
	    						var npass = modifypwddig.find("[name=newpassword]").val()
	    						var opass = modifypwddig.find("[name=oldpassword]").val()
	    						
	    						var lesid = Math.ceil(npass.length * 0.9);
	    						for (var i = 0; i < npass.length && i < opass.length; ++i) {
	    							if (npass.charAt(i) != opass.charAt(i))
	    								break;
	    							
	    							if (i + 1 >= lesid) {
	    								uibase.alert($.i18n("antelope.pwdlikeold") + "！");
	    								success(false);
	    								return;
	    							}
	    						}
	    					}
    					
    					}
    					
    					$.post(ctx + "/common/UserRoleOrgController/changePwd.vot", encodeURI(modifypwddig.serialize()), function(data){
    						if (data.success) {
    							uibase.alert($.i18n("antelope.pwdsuc") + "！", true);
    							success(true);
    							
    							if (eventdata && eventdata.isMust) {// 若为强制完成，则需要继续剩余强制完成项
    								window['openMustDoThingDialog']();    								
    							}
    							
    						} else {
    							uibase.alert(data.msg);
    							success(false);
    						}
    					}, "json");
    				});
    				
    				
    				
//    				 if(/[0-9]/.test(psw))  count++;  if(/[a-z]/.test(psw))  count++;   if(/[A-Z]/.test(psw))  count++;
    				
    				
    			}
    		});
    		
//	   		 uibase.alert('修改密码');
	   		 $(document.body).css('paddingRight', 0);
    	});
    	
    	$(document).keyup(function (e){
    		if (e.keyCode == 120) {
    			$("#fullscreenbtn").click();
    		}
    	});
    	
    	// 新建自定义界面
    	$("#addtabbtn").click(function() {
    		gotoModule('/gz/dllcounterparts/customportal.jsp', '自定义界面', null, {fd:'CustomPortalController'});
    	});
    	
    	$("#fullscreenbtn").click(function (){
    		
    		var isfull = true;
    		if ($(this).text() == $.i18n("antelope.fullscreen")) {
	    		$(".header,.footer").css("overflow", 'hidden').height(0);
	    		$(this).text($.i18n("antelope.cancelfullscreen"));
	    		isfull = true;
    		} else {
	    		$(".header,.footer").css("overflow", 'hidden').height("auto");
	    		$(this).text($.i18n("antelope.fullscreen"));
	    		isfull = false;
    		}
    		resizeModuleContentMenu();
    		var layout = $("#modulecontentmenu").data("layout");
			if (layout) {
				layout.options.resizeWithWindow = false;
				layout.resizeAll();
				if (isfull) {
					layout.close("west");
				} else {
					layout.open("west");
				}
			}
			
    	});
    	
    	$(".moretablist").click(function(){
    		var moretablist = $("<div class='moretabfind' style='display:none'>\
    				<input class='form-control input-sm'/>\
    		</div>").css("top", $(this).offset().top + 30).appendTo("body").css("position", "absolute").fadeIn();
    		var tabnames = [];
    		$("#moduletab").find("a").each(function(){
    			tabnames.push({"t":$(this).text().replace("×","")});
    		});
    		moretablist.find("input").combobox({
    			dataProvider:tabnames, labelfield:"t",
				appendTo: moretablist,
				autoFocus: true,
				select: function(e, ui) {
					var offstleft = $("#moduletab").find("a:contains(" + ui.item.label + ")").click();
					if (moretablist.find("input").data("uiCombobox")) {
						moretablist.find("input").combobox("destroy");
	    				moretablist.remove();
					}
				},
				search: function() {
					setTimeout(function(){
						moretablist.find("ul").css("left", 0);
					}, 0);
				}
    		}).autocomplete('search', '').focus().blur(function() {
    			var navi = navigator.userAgent;
    			if ($.browser.msie && parseFloat($.browser.version) <= 8) {
    				setTimeout(function(){
    					if (moretablist.find("input").data("uiCombobox")) {
    						moretablist.find("input").combobox("destroy");
    						moretablist.remove();
    					}
    				}, 200);
    			} else {
    				if (moretablist.find("input").data("uiCombobox")) {
    					moretablist.find("input").combobox("destroy");
    					moretablist.remove();
    				}
    			}
    		});
    		
    		moretablist.find(".ui-autocomplete").css({"width": "auto", "white-space":"nowrap", "position":"static"});
    	});
    	
    	
    	function setGoLeftRightVisible() {
    		$(".goleft").each(function(){
    			var currleft = parseInt($(this).parent().find("ul").css("left"));
        		if (isNaN(currleft)) {
        			currleft = 0;
        		}
        		
        		if (currleft < 0) {
        			$(this).fadeIn("fast");
        		} else {
        			$(this).fadeOut("fast");
        		}
        		
        		if ($(this).parent().find("ul").width() > -currleft + $(this).parent().width()) {
        			$(this).parent().find(".goright").fadeIn("fast");
        		} else {
        			$(this).parent().find(".goright").fadeOut("fast");
        		}
    		});
    	}
    	
    	$(window).resize(setGoLeftRightVisible);
    	$.positionMenuEnabled = true;
    	var ctabjqobj = $('.tabcontainer .ctab').on('shown.bs.tab', 'a', function (e) {
    		
    		var layout = $($(e.target).attr("href")).data("layout");
    		
    		if (layout) {
    			layout.options.resizeWithWindow = false; // set option just in case not already set
    			setTimeout(function(){
    				$($(e.target).attr("href")).fadeIn();
    				layout.resizeAll();
    			}, 0);
    		}
    		
    		$($(e.target).attr("href")).trigger("tabcontentshown");
    		
    		// 切换菜单
    		
    		var tabattr = $(e.target).parent().data("tabattr");
    		
    		var fullpath = [];
    		var parentobj = tabattr.pathnode;
    		while (parentobj) {
    			fullpath.unshift(parentobj.id);
    			var nextparent = null;
    			if (nextparent == null) {
    				nextparent = menupnodemap[parentobj.parent_objid];
    			}
    			parentobj = nextparent;
    		}
    		if ($.positionMenuEnabled) {
    			positionMenu(fullpath);
    		}
		})
		
		if ("1" == window['performance_moduletabswitch']) {
			ctabjqobj.on("hide.bs.tab", function(e){
				var tabhref = $(e.target).attr("href");
				window[tabhref] = $(tabhref).detach();
			}).on("show.bs.tab", function(e) {
				var tabhref = $(e.target).attr("href");
				if (window[tabhref]) {
					window[tabhref].hide()
					$(".modulecontainer>.tab-content").append(window[tabhref]);
				}
			});
		}
		
    	
    	function clickMessageed(receiversid, sourcefunctionid, msg_id) {
    		$.get(ctx + "/common/receivedMessageClicked.vot?receiversid=" + receiversid, function(data){
				gotoModuleByRemind(sourcefunctionid, msg_id);
				reloadMarquee();
			});
    	}
    	
    	function reloadMarquee() {
    		$.getJSON(ctx + "/common/getReceivedMessage.vot?unreaded=true&nocache=" + Math.random(), function(data){
				var marqueelink = "";
    			$(data).each(function(idx){
    				marqueelink += "<a msg_id='" + this.msg_id + "' receiversid='" + this.receiversid + "' source_function_id='" + this.source_function_id + "' href='javascript:void(0);' >" + this.title + "</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
    			});
    			if (data.length) {
    				$("#marqueepart").find("marquee").html(marqueelink).end().animate({height:30}).on("click", "a", function(){
    					var receiversid = $(this).attr("receiversid");
    					var sourcefunctionid = $(this).attr("source_function_id");
    					clickMessageed(receiversid, sourcefunctionid, $(this).attr("msg_id"));
    				});
    				$("#marqueepart").show();
    			} else {
    				$("#marqueepart").hide();
    			}
			});
    	}
    	
    	var comsearchstoinit = [];
    	
    	function extractComSearchParams(path, fd, treenode) {
    		// 解析参数
    		var comsearchp = {
    				funcid:(/\d+/.exec(path)),
    				hasloaded: false,
    				visibles: {}
    		};
    		
    		if (treenode.dt && treenode.dt == '5') {// 非纯数字的功能点
    			comsearchp.funcid = fd;
    		}
			
			var fdparts = fd.split(",");
			
			if (fdparts.length >= 3 && "1" == fdparts[2]) {
				comsearchp.visibles.linedetail = true;
			}
			
			if (treenode.sc == 0) {
				comsearchp.visibles.querypart = false;
			}
			
			if (treenode.ac == 1) {
				comsearchp.autoquery = true;
			}
			
			if (treenode.sp) {
				if (treenode.sp == '0') {
					comsearchp.visibles.linedetail = false;
				} else {
					comsearchp.visibles.linedetail = true;
				}
			}
			return comsearchp;
    	}
    	
    	function gotoModule(path, modulename, fd, treenode) {
    		if (!path)
    			return;
    		
    		
    		var thisObj = this;
    		
    		//防止缓存
    		var tpath = path;
    		if(tpath.indexOf('?') != -1) {
    			tpath = tpath + "&stopcache=" + Math.random();
      		} else {
      			tpath = tpath + "?stopcache=" + Math.random();
      		}
    		$("#modulecontent").removeClass("isportal");
    		if (tpath.indexOf("indexmodule") != -1) {
    			$("#modulecontent").load(ctx + tpath, function(){
    				var hrefsub = /[^./]*\./.exec(path) + "";
    				var jspnamepart = hrefsub.substring(0, hrefsub.length - 1);
					if (window[jspnamepart])
						window[jspnamepart]();
					reloadMarquee();
					$("#indexmodulebgimag").fadeIn();
    			});
    			$("#modulecontent").show();
    			$(document.body).css("overflow-y", "auto");
    			$("#modulecontentmenu").hide();
    			resizeModuleContentMenu();
    		} else {
    			// 挂接新页签
    			var findopenedmodule = $("[modulepath=\"" + treenode.id + "\"]");
    			if (findopenedmodule.length) {
    				findopenedmodule.click();
    				if (window['gofuncstring']) {// 若存在定位功能转向，则刷新当前页签
    					var activetabpane = findopenedmodule.parent().data("tabpane");
    					$(activetabpane).trigger("refreshTab");
    				}
    				return;
    			}
    			
    			var extctxmenus = {};
    			if (treenode.tm && treenode.tm[0] == '[') {
    				var tmarr = JSON.parse(treenode.tm);
    				$(tmarr).each(function(){
    					extctxmenus[this.eventkey] = this.name;
    				});
    			}
    			
    			if (treenode.dg == '1' && path.indexOf("commonsearch.jsp") != -1) {
    				var comsearchp = extractComSearchParams(path, fd, treenode);
					open(ctx + "/common/jsp/commonsearchtab.jsp?function_id=" + comsearchp.funcid + "&current_menu_id=" + treenode.id);
					return;
				}
    			
    			$(".modulecontainer .mctab").tabadd({modulepath:treenode.id, label:modulename, pathnode:treenode}, {funcid:(/\d+/.exec(path)), "modulename":modulename}, ".modulecontainer>.tab-content", function(tabpane) {
    				
    				
    				if (treenode.fd.indexOf("http://") != -1 || treenode.fd.indexOf(".psml") != -1) {
    					$(tabpane).css("overflow", "auto");
    					$(".notabmask").hide();
    				}
    				
    				if (treenode.fd.indexOf("pagemodule.jsp") != -1 || treenode.fd == '/ui' || treenode.dt == '4' || treenode.fd.indexOf("Antelope新平台操作手册.htm") != -1) {
    					$(".notabmask").hide();
    				}
					if (treenode.fd.indexOf("http://") != -1 || treenode.fd.indexOf("pagemodule.jsp") != -1 || treenode.fd == '/ui' || treenode.dt == '4' || treenode.fd.indexOf("Antelope新平台操作手册.htm") != -1) {
    					gotobipage(treenode, $(tabpane));
    					return;
					}
					
					if (treenode.fd.indexOf(".psml") != -1) {
						var fdtpath = treenode.fd;
			    		if(fdtpath.indexOf('?') != -1) {
			    			fdtpath = fdtpath + "&view=true&nocache=" + Math.random();
			      		} else {
			      			fdtpath = fdtpath + "?view=true&nocache=" + Math.random();
			      		}
						$(tabpane).load(ctx + fdtpath);
    					return;
					}
					
   					if (treenode.dt && treenode.dt == '3') {
   						seajs.use("uidynamicview", function(){
   							tabpane.dynamicview({dynamicid:treenode.fd});
   						});
   						$(".notabmask").hide();
   						$(tabpane).css("overflow", "auto");
   					} else if (path.indexOf("commonsearch.jsp") != -1) {
    					
    					// 解析参数
    					var comsearchp = extractComSearchParams(path, fd, treenode);
    					
    					if (!$.isLoadingShowing)
    						$.showLoading({customClass:"loadingtext", target:tabpane[0], text:$.i18n('antelope.loading')});
    					
    					comsearchp.thetabpane = tabpane;
    					comsearchstoinit.push(comsearchp);
    					
    					seajs.use("uicomsearch", function(){
    						for (var i = 0; i < comsearchstoinit.length; ++i) {
    							if (comsearchstoinit[i].outeroptinited) {
    								continue;
    							}
    							comsearchstoinit[i].outeroptinited = true;
    							comsearchstoinit[i].complete = function(){
    								$.hideLoading();
    							}
    							comsearchstoinit[i].needclearcontainer = false;
    							
    							// 补充菜单号外部参数方便功能点内部宏使用
    							if (!comsearchstoinit[i].oparams) {
    								comsearchstoinit[i].oparams = {}
    							}
    							comsearchstoinit[i].oparams['current_menu_id'] = treenode.id;
    							
								$(comsearchstoinit[i].thetabpane).comsearch(comsearchstoinit[i]);
    							
    						}
    					});
    					
    					$(".notabmask").hide();
    				} else {
    					
    					if (treenode.fd.indexOf("http://") != -1) {
    						$(tabpane).css("overflow", "auto");
        					gotobipage(treenode, $(tabpane));
        					$(".notabmask").hide();
        					return;
    					}
    					
    					
    					$(tabpane).load(ctx + tpath, function(){
    						this.formobj = this;
    						var hrefsub = /[^./]*\./.exec(path) + "";
    						var jspnamepart = hrefsub.substring(0, hrefsub.length - 1);
    						// 通用查询特殊处理
    						if (path.indexOf("commonsearch.jsp") != -1) {
    							var idpart = /id=[^&]+/.exec(path) + "";
    							if (idpart) {
    								idpart = idpart.split("=")[1];
    								if (window[jspnamepart + "_" + idpart])
    									window[jspnamepart + "_" + idpart](this);
    							}
    							
    						} else {
    							if (window[jspnamepart])
    								window[jspnamepart](this);
    						}
    						
    						$(".notabmask").hide();
    					});
    				}
    				
    			}, null, null, null, null, extctxmenus);
    			
    		}
    		return true;
    	}
    	
    	// 模块显示界面高度动态调整
    	function resizeModuleContentMenu() {
    		var toresizecontent = "#modulecontentmenu,#modulecontent";
    		if ($("#modulecontent").is(".isportal")) {
				// 0426 当前项目portal自适应
    			// toresizecontent = "#modulecontentmenu";
    			// $("#modulecontent").css("height", "auto");
    		}
    		if (window['justpos']) {
    			$(toresizecontent).height($(window).height() - $(".header").height() - $(".footer").height());
    		} else {
    			if (window['leveltwo_id'] && window['show_fullpage_when_use_url_menu_id'] != '1') {
    				$(toresizecontent).height($(window).height());
    			} else {
    				$(toresizecontent).height($(window).height() - $(".header").height() - $(".footer").height());
    			}
    		}
    		
    		var layout = $("#modulecontentmenu").data("layout");
			if (layout) {
				layout.options.resizeWithWindow = false;
				layout.resizeAll();
			}
    	}
    	
    	$(window).resize(resizeModuleContentMenu);
    	
    	resizeModuleContentMenu();
    	
    	function closeOneModuleTab(e) {
    		$.positionMenuEnabled = false;// 暂时关闭菜单跟踪
    		
    		var tabid = $(this).closest("a").attr("href");
    		if (window[tabid]) {
    			delete window[tabid];
    		}
			$(document.body).trigger("tabcloseing", {tabid:tabid});
			
    		if ($(this).closest("li").is(".active")) {
	    		var prevobj = $(this).closest("li").prev();
	    		var toactivea = null;
	    		if (prevobj.length) {
	    			toactivea = prevobj.find("a").click();
	    		} else {
	    			toactivea = $(this).closest("li").next().find("a").click();
	    		}
    		} else {
    			setTimeout(setActiveTabVisible, 0);
    		}
    		
    		$($(this).closest("a").attr("href")).remove();
    		var currul = $(this).closest("li").parent();
    		$(this).closest("li").remove();
    		if (currul.children("li").size() == 0) {
    			$(".notabmask").show();
    		}
    		
			$("#moretabct").text($("#moduletab").children("li").size());
			
    		e.stopPropagation();
    		
    		$.positionMenuEnabled = true;
    		return false;
    	}
    	
    	// 页签关闭
    	$(".tabcontainer .nav-tabs.ctab").on("click", "li a .closeicon", closeOneModuleTab);
    	$(".tabcontainer .nav-tabs.ctab").on("dblclick", "li a", closeOneModuleTab);
    	
    	
    	
    	$(".tabcontainer .nav-tabs.ctab").on("click", "li a", function(){
    		setTimeout(setActiveTabVisible, 0);
    	});
    	
    	function setActiveTabVisible() {
    		var mdtab = $("#moduletab");
    		
    		var curractiveli = mdtab.find("li.active");
    		var offstleft = curractiveli.offset().left;
    		var offstwidth = curractiveli.width();
			var tabcoffleft = mdtab.offset().left;
			
			var pwidth = mdtab.parent().width();
			var pleft = mdtab.parent().offset().left;
			
			
			var lastli = mdtab.find("li:last");
    		var lastoffstleft = lastli.offset().left;
    		var lastoffstwidth = lastli.width();
			
			var targetleftposition = null;
			var distanceright = pleft + pwidth - 57 - (lastoffstleft + lastoffstwidth);
			if (offstleft < pleft) {
				targetleftposition = Math.min(0, tabcoffleft - offstleft + 13);
				if (tabcoffleft - pleft + distanceright > targetleftposition) {
					targetleftposition = Math.min(0, tabcoffleft - pleft + distanceright);
				}
			} else if (pleft + pwidth - 57 - offstleft - offstwidth < 0) {
				targetleftposition = Math.min(0, (pleft + pwidth) - (offstleft - mdtab.position().left + offstwidth + 57));
			} else {
				if (distanceright > 0) {
					targetleftposition = Math.min(0, tabcoffleft - pleft  + distanceright);
				}
			}
    		
			if (targetleftposition !== null)
				mdtab.animate({left:targetleftposition}, "fast");
    	}
    	
    	$(".ico-search").on("click", function(e){
    		if($(".search_panel").is(':hidden')) {
    			$(".search_panel").slideDown("slow");
    		}else {
    			$(".search_panel").slideUp("slow");
    		}
    	});
    	
    	$(".panel_body_icon").on("click", function(e){
    		var keywords = $(".panel_body_text").val();
    		filtertext = keywords;
    		readMenuInfo();
    	});
    	
    	$(".ico-globalsearch").on("click", function(e){
    		if($(".globalsearch_panel").is(':hidden')) {
    			$(".globalsearch_panel").slideDown("slow");
    		}else {
    			$(".globalsearch_panel").slideUp("slow");
    		}
    	});
    	
    	$(".panel_body_icon2").on("click", function(e){
    		var keywords = $(".panel_body_text2").val();
    		$.post(ctx + "/gz/indexglobalsearch.jsp?action=getSearchResult","keywords=" + encodeURIComponent(encodeURIComponent(keywords)), function(data){
    			$(".globalqcontainer").html(data);
    		});
        });
        


    };

            // 点击设置按钮
            $("#setting").click(function(){
                $("#newnavid li[idstr=f79a1724cb344c63b7aa61424afde93e]",parent.document).click();
            });
});


