// ==UserScript==
// @name         imgur.direct
// @namespace    imgurdir
// @version      0.1.0
// @description  Adds image direct links for imgur uploads.
// @author       Jakub Rychecký <jakub@rychecky.cz>
// @license      WTFPL 2
// @include      *imgur.com*
// ==/UserScript==


create_direct();




function create_direct(){
    $('.post-image-container').each(function(){ // Every image container
      var img = $(this);
        
      if(!has_direct_link(img) && is_image_ready(img)){ // Doesn't have direct link yet and image is fully uploaded...
          write_direct_link(img);   
      }
    });
    
    setTimeout(create_direct, 500); // Let's repeat
}



function get_direct_link(img){
   var link = img.find('a.zoom').attr('href'); // Link from zoom
   link = 'http:'+link;
    
   return link;
}


function is_image_ready(img){
  var link = get_direct_link(img);
    
  return link.indexOf('undefined') == -1 && link.indexOf('blob') == -1;
}


function has_direct_link(img){
  return img.find('.direct').length > 0;
}

function write_direct_link(img){
   var css = { // CSS for textarea
     'width': '100%',
     'background': '#2C2F34',
     'text-align': 'center',
     'font-weight': 'bold',
     'font-size': '0.8em',
     'height': '28px',
     'margin-bottom': '0px'
   }
    
   var html = $('<textarea onclick="$(this).select()">'+get_direct_link(img)+'</textarea>'); // Direct link textarea
    
   html.addClass('direct').css(css);
    
   img.prepend(html);
}