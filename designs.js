/* PIXEL ART MAKER PROJECT FROM ALC FOR FRONT END DEVELOPMENT BEGINNER'S COURSE */


// add some jQuery animation on page load
 $(function(){
 	$('form').hide().delay(6000).fadeIn(3500);
 	$('.color-content').hide();
  $('button').hide();
 	$('h1').hide().delay(4300).show(5);
    $('body').prepend('<div id="hint"><h3 id="hint-header">Pixel Art Maker</h3><div id="hint-message">Click grid cell or press down mouse and hover over grid cells to fill with color🎆🎇</div></div>');
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
	     tableRow = '<tr  class="tableRow" draggable="false" ></tr>',
	     tableData = '<td class="tableData" draggable="false"></td>';

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

//dynamically set color of grid cells to  #colorPicker value on click and on mousedown+hover

function pixelColor(){
    const attr = $(this).attr('style');
    typeof attr === "undefined" || typeof attr === "boolean" ? (  $(this).css({ 'background-color' : $('#colorPicker').val() }) ) : ( $(this).removeAttr('style') );
  }

$('table').on('click', '.tableData', pixelColor)
    .one('click','.tableData', function(){
          $('button').show();
    });

$('table').mousedown(function(){
   $('.tableData').on('mouseenter', pixelColor);
});

$('table').mouseup(function() {
   $('.tableData').off('mouseenter', pixelColor);
});

//use html2canvas to save art
$('button').click(function() {
     html2canvas($('#pixelCanvas'), {
        onrendered: function(canvas) {
          const img = canvas.toDataURL("image/png");
          const link = img.replace(/^data:image\/png/, "data:application/octet-stream");
           $('a').attr('download','My_Art.png').attr('href', link);
        }
     });
});
