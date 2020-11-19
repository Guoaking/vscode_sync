//  # 方法 js显示隐藏
define(function (require, exports, module) {
	var isload = false;

	exports.init = function (opts, dllparams) {
		var counter = 1;
		if (isload) {
			// 未加载时 由于加载顺序的问题，会漏掉第一个 refreshCompleted
			counter = 0;
		}
		//是否董事
		var combobox_isds = opts.element.find('[name=combobox1599461961584]');
		// 是否监事
		var combobox_isjs = opts.element.find('[name=combobox1599461979559]');
		//董事text
		var combobox_dsname = opts.element.find('[name=combobox1599462092169]');
		// 监事text
		var combobox_jsname = opts.element.find('[name=combobox1599462129664]');
		// text 文字
		var textannotation_js = opts.element.find('[name=textannotation1599450573185]');
		var textannotation_ds = opts.element.find('[name=textannotation1599450546024]');


		debugger;

		combobox_isds.on('change', function () {
			let result = combobox_isds.val()
			//选无==1 选有==2
			debugger;
			if (result == '1' || result == 1) {
				//textannotation_ds.css('display', 'none');
				document.querySelector(".textannotation1599450546024").style.display = 'none';
				//textannotation_ds.css("visibility", "hidden");

				combobox_dsname.parent().css('display','none');
			} else {
				//textannotation_ds.css('display', 'unset')
				document.querySelector(".textannotation1599450546024").style.display = 'unset';
				combobox_dsname.parent().css('display','unset');
			}
		}).trigger('change');

		combobox_isjs.on('change', function () {
			let result = combobox_isjs.val()
			//选无==1 选有==2
			if (result == '1' || result == 1) {

				document.querySelector(".textannotation1599450573185").style.display = 'none';
				combobox_jsname.parent().css('display','none');
			} else {

				document.querySelector(".textannotation1599450573185").style.display = 'unset';
				combobox_jsname.parent().css('display','unset');
			}
		}).trigger('change');




	}
});