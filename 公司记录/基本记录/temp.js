define(function (require, exports, module) {


    var isload = false;
    
    exports.init = function (opts, dllparams) {
		var enterpriseEle=	opts.element.find('[name=enterprisesidasinput]');
		
		setTimeout(() => {
			opts.element.find('.bottomfuncbtn button').attr('disabled' ,( enterpriseEle.val()?false:true));			
		}, 200);



		
		var projectEle=	opts.element.find('[name=name]');
		setTimeout(() => {
			opts.element.find('.bottomfuncbtn button').attr('disabled' ,( projectEle.val()?false:true));			
		}, 200);




    }
});