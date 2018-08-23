/* PIXEL ART MAKER PROJECT FROM ALC FOR FRONT END DEVELOPMENT BEGINNER'S COURSE */


//declare required variables
const el = $('input[name=width]');
  let maxWidth;


// add some jQuery animation on page load
 $(function(){
 	tableWidth();
 	$('form').hide().delay(6000).fadeIn(3500);
 	$('.color-content').hide();
  $('#download-button').hide();
 	$('h1').hide().delay(4300).show(5);
  $('.hint').hide().delay(6500).show(500);
    $('body').prepend('<div id="hint"><h3 id="hint-header">Pixel Art Maker</h3><p>....Activate the creative genius in YOU🎆🎇</p></div>');
    $('#hint>p').show().delay(2300).fadeOut(2000);
    $('#hint>p').queue(function(){
            $('#hint').remove();
            $(this).dequeue();
    });
 });

// CREATE MAX WIDTH DEPENDING ON WIDTH OF USER'S DEVICE

const tableWidth = function(){
  if (window.innerWidth < 320 ) {
    maxWidth= '25';
  }else if(window.innerWidth > 320 && window.innerWidth < 500){
    maxWidth= '30';
  }else if(window.innerWidth > 520 && window.innerWidth < 620){
    maxWidth= '35';
  }else if(window.innerWidth > 620 && window.innerWidth < 820){
    maxWidth= '40';
  }else if(window.innerWidth > 820 && window.innerWidth < 920){
    maxWidth= '45';
  }else if(window.innerWidth > 920 ){
    maxWidth= '50';
  }
  el.attr('max', maxWidth);   
};



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
          $('#download-button').show();
    });

$('table').mousedown(function(){
   $('.tableData').on('mouseenter', pixelColor);
});

$('table').mouseup(function() {
   $('.tableData').off('mouseenter', pixelColor);
});

//use html2canvas to save art 
const canvasPix = function() {
     html2canvas($('#pixelCanvas'), {
        onrendered: function(canvas) {
          const img = canvas.toDataURL("image/png");
          const link = img.replace(/^data:image\/png/, 'data:application/octet-stream');
           $('a').attr('download','My_Art.png').attr('href', link);
        }
     });
   }
document.querySelector('#download-button').addEventListener('click', canvasPix, true);
window.addEventListener('resize', tableWidth);