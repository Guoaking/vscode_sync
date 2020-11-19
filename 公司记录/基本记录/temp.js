define(function (require, exports, module) {
	var isload = false;

	exports.init = function (opts, dllparams) {
		var counter = 1;
		if (isload) {
			// 未加载时 由于加载顺序的问题，会漏掉第一个 refreshCompleted
			counter = 0;
		}
        //项目名称元素
        var projNameEle = opts.element.find('[name=textbox_projectname]');
        // 企业简称
        var entpriseEle = opts.element.find('[name=combobox_selectenterprise]');
        //融资轮次
		var roundEle = opts.element.find('[name=combobox_round]');

        // 项目名称 拼接  企业名称+融资轮次
		projNameEle.val(entpriseEle.find(':selected').text() + roundEle.find(':selected').text());
		roundEle.on('change', function () {
			projNameEle.val(entpriseEle.find(':selected').text() + roundEle.find(':selected').text());
		});

		debugger;
        
        //通过单选  选中未选中切换
		var resultElement = opts.element.find('[name=checkbox_init_result][type=hidden]');
		resultElement.on('change' , function(){
            var result =resultElement .val();
            //单选参数==1
			if (result && (result == '1' || result == 1)) {
                //  不通过单选 = 0 未选中
				opts.element.find('[name=checkbox1588061377689]').prop('checked' , 0);
			}
		}).trigger('change');
        // 文件上传
		opts.element.find('[name=filecontrol]').fileuploadview('option' , 'ObjectId',opts.element.find('[name=textboxfilegroup]').val() );

	}

	var result1  = combobox_isds.find(':selected').text()
	let result2  = combobox_isjs.find(':selected').text()
	let result3  = combobox_isjs.text()
	let result4  = combobox_isjs.val()
});