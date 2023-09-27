const books = [
  {id: 1, libro:1, capitulo:1, pagina:1,},
  {id: 2, libro:1, capitulo:1, pagina:2,},
  {id: 3, libro:1, capitulo:1, pagina:3,},
  {id: 4, libro:1, capitulo:1, pagina:4,},
  {id: 5, libro:1, capitulo:1, pagina:5,},
  {id: 6, libro:1, capitulo:1, pagina:6,},
  {id: 7, libro:1, capitulo:1, pagina:7,},
  {id: 8, libro:1, capitulo:1, pagina:8,},
  {id: 9, libro:1, capitulo:1, pagina:9,},
  {id: 10, libro:1, capitulo:1, pagina:10,},
  {id: 11, libro:1, capitulo:1, pagina:11,},
  {id: 12, libro:1, capitulo:1, pagina:12,},
  {id: 13, libro:1, capitulo:1, pagina:13,},
  {id: 14, libro:1, capitulo:1, pagina:14,},
  {id: 15, libro:1, capitulo:1, pagina:15,},
  {id: 16, libro:1, capitulo:1, pagina:16,},
  {id: 17, libro:1, capitulo:1, pagina:17,},
  {id: 18, libro:1, capitulo:2, pagina:18,},
  {id: 19, libro:1, capitulo:2, pagina:19,},
  {id: 20, libro:1, capitulo:2, pagina:20,},
  {id: 21, libro:1, capitulo:2, pagina:21,},
  {id: 22, libro:1, capitulo:2, pagina:22,},
  {id: 23, libro:1, capitulo:2, pagina:23,},
  {id: 24, libro:1, capitulo:2, pagina:24,},
  {id: 25, libro:1, capitulo:2, pagina:25,},
  {id: 26, libro:1, capitulo:2, pagina:26,},
  {id: 27, libro:1, capitulo:2, pagina:27,},
  {id: 28, libro:1, capitulo:2, pagina:28,},
  {id: 29, libro:1, capitulo:2, pagina:29,},
  {id: 30, libro:1, capitulo:2, pagina:30,},
  {id: 31, libro:1, capitulo:2, pagina:31,},
  {id: 32, libro:1, capitulo:2, pagina:32,},
  {id: 33, libro:1, capitulo:2, pagina:33,},
  {id: 34, libro:1, capitulo:2, pagina:34,},
  {id: 35, libro:1, capitulo:2, pagina:35,},
  {id: 36, libro:1, capitulo:3, pagina:36,},
  {id: 37, libro:1, capitulo:3, pagina:37,},
  {id: 38, libro:1, capitulo:3, pagina:38,},
  {id: 39, libro:1, capitulo:3, pagina:39,},
  {id: 40, libro:1, capitulo:3, pagina:40,},
  {id: 41, libro:1, capitulo:3, pagina:41,},
  {id: 42, libro:1, capitulo:3, pagina:42,},
  {id: 43, libro:1, capitulo:3, pagina:43,},
  {id: 44, libro:1, capitulo:3, pagina:44,},
  {id: 45, libro:1, capitulo:3, pagina:45,},
  {id: 46, libro:1, capitulo:3, pagina:46,},
  {id: 47, libro:1, capitulo:3, pagina:47,},
  {id: 48, libro:1, capitulo:3, pagina:48,},
  {id: 49, libro:1, capitulo:3, pagina:49,},
  {id: 50, libro:1, capitulo:3, pagina:50,},
  {id: 51, libro:1, capitulo:3, pagina:51,},
  {id: 52, libro:1, capitulo:3, pagina:52,},
  {id: 53, libro:1, capitulo:3, pagina:53,},
  {id: 54, libro:1, capitulo:3, pagina:54,},
  {id: 55, libro:1, capitulo:3, pagina:55,},
  {id: 56, libro:1, capitulo:4, pagina:56,},
  {id: 57, libro:1, capitulo:4, pagina:57,},
  {id: 58, libro:1, capitulo:4, pagina:58,},
  {id: 59, libro:1, capitulo:4, pagina:59,},
  {id: 60, libro:1, capitulo:4, pagina:60,},
  {id: 61, libro:1, capitulo:4, pagina:61,},
  {id: 62, libro:1, capitulo:4, pagina:62,},
  {id: 63, libro:1, capitulo:4, pagina:63,},
  {id: 64, libro:1, capitulo:4, pagina:64,},
  {id: 65, libro:1, capitulo:4, pagina:65,},
  {id: 66, libro:1, capitulo:4, pagina:66,},
  {id: 67, libro:1, capitulo:4, pagina:67,},
  {id: 68, libro:1, capitulo:4, pagina:68,},
  {id: 69, libro:1, capitulo:4, pagina:69,},
  {id: 70, libro:1, capitulo:4, pagina:70,},
  {id: 71, libro:1, capitulo:4, pagina:71,},
  {id: 72, libro:1, capitulo:4, pagina:72,},
  {id: 73, libro:1, capitulo:4, pagina:73,},
  {id: 74, libro:1, capitulo:4, pagina:74,},
  {id: 75, libro:1, capitulo:4, pagina:75,},
  {id: 76, libro:1, capitulo:4, pagina:76,},
  {id: 77, libro:1, capitulo:4, pagina:77,},
  {id: 78, libro:1, capitulo:4, pagina:78,},
  {id: 79, libro:1, capitulo:5, pagina:79,},
  {id: 80, libro:1, capitulo:5, pagina:80,},
  {id: 81, libro:1, capitulo:5, pagina:81,},
  {id: 82, libro:1, capitulo:5, pagina:82,},
  {id: 83, libro:1, capitulo:5, pagina:83,},
  {id: 84, libro:1, capitulo:5, pagina:84,},
  {id: 85, libro:1, capitulo:5, pagina:85,},
  {id: 86, libro:1, capitulo:5, pagina:86,},
  {id: 87, libro:1, capitulo:5, pagina:87,},
];
const bookNames = {
  "1": "Mata 6 Billones de Demonios",
  "2": "Portador de Nombres",
  "3": "Buscador de Tronos",
  "4": "Rey de Espadas",
  "5": "Destructor de Infinidades",
  "6": ""

}

; 
const body = document.querySelector('body');
const chapterSelector = document.querySelector('#chapter-select');
const LIMITE_SUPERIOR = 86;
const LIMITE_INFERIOR = 0;
const optionList = document.querySelectorAll("option");

chapterSelector.addEventListener('change', (e)=>{
  console.log(e);
  switch (e.target.value){
    case '1':
      paginaActual = 0;
      setSrc(paginaActual);
      break;
    case '2':
      paginaActual = 17;
      setSrc(paginaActual);
      break;
    case '3':
      paginaActual = 36;
      setSrc(paginaActual);
      break;
    case '4':
      paginaActual = 55;
      setSrc(paginaActual);
      break;
    case '5':
      paginaActual = 78;
      setSrc(paginaActual);
      break;
  }
})

body.addEventListener('click', (e)=>{

  const clickX = e.pageX;
  const pageThird = body.clientWidth / 3;
  if(clickX < pageThird){
    anteriorPagina();
  }
  else if(clickX > pageThird && clickX < pageThird * 2 && e.target == pagina){
    console.log("Abrir imagen?");
    window.open(`img/comic/${books[paginaActual].pagina}.jpg`, 'blank');
  }
  else{
    siguientePagina();
  }

})
const pagina = document.querySelector("#imagen");
let paginaActual = 0;



function setSrc(posicion){

  const positionString = `${books[posicion].pagina}`; 
  let dirCompleta = `img/comic/${positionString}.jpg`;
  

  console.log(posicion);

  pagina.setAttribute("src", dirCompleta);
  setTitulo();

  
  return;

  

}


function setTitulo(){
  const header = document.querySelector("h2");
  const texto = document.querySelector("p");

  header.innerText = `Libro ${books[paginaActual].libro}: ${bookNames[books[paginaActual].libro]} - Capítulo ${books[paginaActual].capitulo} - Página ${books[paginaActual].pagina} `;
}


function siguientePagina(){

  if(paginaActual === LIMITE_SUPERIOR) return;
  
  paginaActual = paginaActual + 1;
  setSrc(paginaActual);
  setTitulo();
  console.log(pagina.getAttribute("src"));

}

function anteriorPagina(){
  
  if(paginaActual === LIMITE_INFERIOR) return;
  paginaActual = paginaActual - 1;
  setSrc(paginaActual);
  console.log(pagina.getAttribute("src"));
  
  
  

}

function iniciarPagina(){
  setSrc(paginaActual);
}



iniciarPagina();






