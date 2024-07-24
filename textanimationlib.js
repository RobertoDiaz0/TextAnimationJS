/*Esta función anima textos. 
bar_state es una variable global que está ligada al estado del sitio. Controla cuando la función debe dejar de funcionar (Ej: cuando
se pasa a otro segmento dentro del sitio)

*/

// TEXT ANIMATION FUNCTION
function animateText() {
  let i = 0; // Contador para caracteres dentro de una frase
  let l = 0; // Contador para frases dentro de profiletextarray
  let animatedtext = ["Texto para animar" // Selecciona el elemento donde se escribirá el texto
  , "Texto para animar"] 

  let cursor = true; // Variable para controlar el titilar del cursor

  function write() {
    //Función de parpadeo del cursor
    function fcursor() {
      if (bar_state === 0) { // Considerando que bar_state controla el estado de alguna barra o elemento similar
        if (!cursor) {
          animatedtext.insertAdjacentHTML("beforeend", "|"); // Agrega el cursor si no está presente
          cursor = true;
          setTimeout(fcursor, 500); // Tiempo de parpadeo del cursor
        } else {
          let contenido = animatedtext.innerHTML;
          animatedtext.innerHTML = contenido.slice(0, -1); // Elimina el cursor
          cursor = false;
          setTimeout(fcursor, 500); // Tiempo de parpadeo del cursor
        }
      }
    }

    if (l < profiletextarray.length) { // Verifica si aún hay frases por escribir
      if (i < profiletextarray[l].length) { // Verifica si aún hay caracteres por escribir en la frase actual
        animatedtext.innerHTML = animatedtext.innerHTML.slice(0, -1); // Elimina el cursor anterior
        animatedtext.insertAdjacentHTML("beforeend", profiletextarray[l][i]); // Agrega el siguiente caracter
        animatedtext.insertAdjacentHTML("beforeend", "|"); // Agrega el cursor
        i = i + 1; // Incrementa el contador de caracteres
        if (bar_state === 0) { // Verifica el estado de la barra o elemento similar
          setTimeout(write, 50); // Pausa antes de escribir el siguiente caracter
        }
      } else {
        if (l < profiletextarray.length - 1) { // Verifica si no es la última frase
          cursor = true;
          animatedtext.innerHTML = animatedtext.innerHTML.slice(0, -1); // Elimina el cursor anterior
          animatedtext.insertAdjacentHTML("beforeend", "<br>"); // Agrega un salto de línea
          animatedtext.insertAdjacentHTML("beforeend", "|"); // Agrega el cursor
        }
        i = 0; // Reinicia el contador de caracteres
        l = l + 1; // Incrementa el contador de frases
        if (bar_state === 0) { // Verifica el estado de la barra o elemento similar
          if (!(l == profiletextarray.length)) { // Verifica si no es la última frase
            setTimeout(write, 20); // Pausa antes de escribir la siguiente frase
          } else {
            fcursor(); // Inicia el titilado del cursor
          }
        }
      }
    }

    write(); // Inicia la función de escritura
  }
}
