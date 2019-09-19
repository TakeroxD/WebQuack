
/*
1. Función que muestra y esconde la sección para hacer comentarios 
   al hacer click el botón 'Escribe una reseña'. 
   on click!
   (5 puntos)
*/

$('#escribe_reseña').on('click',function(event){
  $('#seccion_comentario').removeClass('default')
})



/*
2. Cargar los comentarios de el archivo comentarios.xml o bien de 
  https://tc2026daw.github.io/instrucciones/misc/comentarios.xml 
  (función ajax, 25 puntos)
*/

$.ajax({
  url:'https://tc2026daw.github.io/instrucciones/misc/comentarios.xml',
  type:'GET',
  dataType:'xml',
  success: function(data){
    console.log(data)
    let newHtml = ''
    $(data).find('comment').each(function(){
      newHtml += `
        <div class="nombre">
          ${$(this).find('name').text()}
        </div>`
      newHtml += getStarsSpans($(this).find('stars').text())
      newHtml += `
        <span class="date">
          ${$(this).find('date').text()}
        </span>
        <div class="review">
          ${$(this).find('text').text()}
        </div>`
    })>
    $('#seccion_reviews').append(newHtml)
  } ,
  error: function(errorMsg){
    console.log(errorMsg)
  }
})

/*
3. Funcion que apendiza el nuevo comentario al darle click a PUBLICAR
  on click!
  (función, 35 puntos)
*/

$('#btn-publicar').on('click',function(event){
  if($('#nombre').val != '' && $('#comentario').text() != ''){
    let newHtml = ''
    newHtml += `
          <div class="nombre">
            ${$('#nombre').val()}
          </div>`
    newHtml += getStarsSpans($('input[name="rating"]:checked').val())
    newHtml += `
          <span class="date"> justo ahora </span>
          <div class="review">
            ${$('#comentario').text()}
          </div>`
    $('#seccion_reviews').append(newHtml)

    $('#nombre').val('')
    $('#email').val('')
    $('#comentario').text('')
    $('input[name="rating"]').prop('checked', false);
    $('#error_comment').addClass('default') 
    $('#seccion_comentario').addClass('default') 
  } else {
    $('#error_comment').removeClass('default')
  }
})


/*
4. Funcion que limpia el nombre, el email y el div "#comentarios" al darle
   click en "btn-limpiar" con leyenda de "CANCELAR"
   on click!
  (5 puntos)
*/

$('#btn-limpiar').on('click',function(event){
  $('#nombre').val('')
  $('#email').val('')
  $('#comentario').text('')
  $('input[name="rating"]').prop('checked', false);
  $('#error_comment').addClass('default')
  $('#seccion_comentario').addClass('default')
})


/*
Funcion que recibe un numero de stars y regresa los 5 spans 
que simbolizan las estrellas del rating. por ejemplo:
let stars = 3;
let html = getStarsSpans(stars);

html = '
<span class="fa fa-star checked"></span>
<span class="fa fa-star checked"></span>
<span class="fa fa-star checked"></span>
<span class="fa fa-star"></span>
<span class="fa fa-star"></span>
'
*/
function getStarsSpans(stars) {
  let new_html = '';
  for( let i = 0; i < stars; i++) {
    new_html += `
      <span class="fa fa-star checked"></span>
    `;
  }

  for ( let i = 0; i < 5 - stars; i++ ) {
    new_html += `
      <span class="fa fa-star"></span>
    `;
  }

  return new_html;
}
