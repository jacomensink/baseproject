$(window).load(function() {
	
});

$(function(){
	
	//Radio / checkbox replacement
	$('.radio-replacement, .checkbox-replacement').each(function(){
		var $this = $(this);
			label = $this.next('label');
		$this.wrapAll('<div class="replacement-container"></div>');
		label.appendTo( $this.parents('.replacement-container') );
	}).iCheck({
		checkboxClass: 'checkbox-replacement',
		radioClass: 'radio-replacement',
		labelHover: false,
		cursor: true,
		iCheckHelper:'replacement',
		insert:'<span class="replacement"></span>'
	});

});