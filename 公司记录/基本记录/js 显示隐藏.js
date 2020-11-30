//工具
define(function (require, exports, module) {
	var isload = false;

	exports.init = function (opts, dllparams) {


		var counter = 1;
		if (isload) {
			// 未加载时 由于加载顺序的问题，会漏掉第一个 refreshCompleted
			counter = 0;
		}
		// # 方法 点击跳转页面
		$("#setting").click(function () {
			$("#newnavid li[idstr=f79a1724cb344c63b7aa61424afde93e]", parent.document).click();
			$("#navsecid li[idstr=525d901a33954c5b97bbca2c989a2c9a]", parent.document).click();
		});
		$(".vue-grid-item.myproject").click(function(){
			var class_ = $(this).attr("class");
			var class_list = class_.split(" ");
			let one_menu = "";
			let two_menu = ""
			for (let i = 0; i < class_list.length; i++) {
				const curr_class = class_list[i];
				if(curr_class.indexOf("morelinkone_")==0){
					one_menu = curr_class.substring(12)
				}
				if(curr_class.indexOf("morelinktwo_")==0){
					two_menu = curr_class.substring(12)
				}
			}
			if(one_menu.length>0 && two_menu.length>0){
				$("#newnavid li[idstr='"+one_menu+"']",parent.document).click();
				$("#navsecid li[idstr='"+two_menu+"']",parent.document).click();
			}
		})
		

		//  # 方法 js显示隐藏
		//是否董事
		var combobox_isds = opts.element.find('[name=combobox1599461961584]');
		// 是否监事
		var combobox_isjs = opts.element.find('[name=combobox1599461979559]');
		//董事text
		var combobox_dsname = opts.element.find('[name=textbox1605786012169]');
		// 监事text
		var combobox_jsname = opts.element.find('[name=textbox1605786012649]');
		


		debugger;

		combobox_isds.on('change', function () {
			let result = combobox_isds.val()
			//选无==1 选有==2
			debugger;
			if (result == '1' || result == 1) {
				//textannotation_ds.css('display', 'none');
				document.querySelector(".textannotation1599450546024").style.display = 'none';
				//textannotation_ds.css("visibility", "hidden");
				//下拉
				combobox_dsname.parent().css('display', 'none');
			} else {
				//textannotation_ds.css('display', 'unset')
				document.querySelector(".textannotation1599450546024").style.display = 'unset';
				combobox_dsname.parent().css('display', 'unset');
			}
		}).trigger('change');

		combobox_isjs.on('change', function () {
			let result = combobox_isjs.val()
			//选无==1 选有==2
			if (result == '1' || result == 1) {

				document.querySelector(".textannotation1599450573185").style.display = 'none';
				combobox_jsname.parent().css('display', 'none');
			} else {

				document.querySelector(".textannotation1599450573185").style.display = 'unset';
				combobox_jsname.parent().css('display', 'unset');
			}
		}).trigger('change');

		
		//1. 拿到按钮。
		//2. 触发点击事件。
		//3. 
		
		$(".bottomfuncbtn[type=button]").click(function(){
			debugger;
				console.log("点了！");
				return false;
		}).trigger('click');



		$(".qstzxy[type=button]").on('click', function () {
			debugger;
			console.log("点了！b2");
			return false;

		}).trigger('click');

		$("[paramid=65237fb1-2f28-11eb-89ca-0242ac110002]").parent().on('click', function () {
			debugger;
			console.log("点了！2");
			return false;

		}).trigger('click');

	}
});