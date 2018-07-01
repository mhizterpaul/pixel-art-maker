/* PIXEL ART MAKER PROJECT FROM ALC FOR FRONT END DEVELOPMENT BEGINNER'S COURSE */


// add some jQuery animation on page load
 $(function(){
 	$('form').hide().delay(6000).fadeIn(3500);
 	$('.color-content').hide();
 	$('h1').hide().delay(4300).show(5);
    $('body').prepend('<div id="hint"><h3 id="hint-header">Pixel Art Maker</h3><div id="hint-message">Create pixel art right in your browser🎆🎇🎊</div></div>');
    $('#hint-message').show().delay(2300).fadeOut(2000);
    $('#hint-message').queue(function(){
            $('#hint').remove();
            $(this).dequeue();
    });
 });

// Select color input
// Select size input
// When size is submitted by the user, call makeGrid()

function makeGrid(event) {
	//declare variables to hold all required information from index.html
	const gridHeight = Number($('#inputHeight').val()),
	     gridWidth = Number($('#inputWidth').val()),
	     tableRow = '<tr  class = "tableRow"></tr>',
	     tableData = '<td class = "tableData"></td>';

   //remove any table onclick; if any
	$('.tableRow').remove();

   //dynamically create table based from user input
    for ( let i = gridHeight; i > 0; i--) {
	$('#pixelCanvas').append(tableRow);
}
    for ( let j = gridWidth; j > 0; j--) {
	$('.tableRow').append(tableData);
   } 

   //prevent default action on form  
   event.preventDefault();
}

//on submit of form call the makeGrid function and also show color picker
$('form').submit(makeGrid).one('submit', function(){
	$(".color-content").show("slow");
});

//set color of grid cells to  #colorPicker value on click
$('table').on('click', '.tableData', function(){
    const attr = $(this).attr('style');
    typeof attr === "undefined" || typeof attr === "boolean" ? (  $(this).css({ 'background-color' : $('#colorPicker').val() }) ) : ( $(this).removeAttr('style') );
});

