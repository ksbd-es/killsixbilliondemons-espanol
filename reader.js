const body = document.querySelector('body');
const contenido = document.querySelector('#contenido');;
const counter = document.querySelector('#counter');
const image = document.querySelector('#imagen');
const contenedor = document.querySelector('.contenedor-pagina');

const data = {
  bk: [
    {
      id: 1,
      title: 'Mata 6 billones de demonios',
      ch: [
        {
          id: 1,
          title: 'Capitulo 1',
          pg: 17
        },
        {
          id: 2,
          title: 'Capitulo 2',
          pg: 19
        },
        {
          id: 3,
          title: 'Capitulo 3',
          pg: 20
        },
        {
          id: 4,
          title: 'Capitulo 4',
          pg: 22
        },
        {
          id: 5,
          title: 'Capitulo 5',
          pg: 9
        }
      ]
    },
    {
      id: 2,
      title: 'Portador de nombres',
      ch: [
        {
          id: 1,
          title: 'Capitulo 1',
          pg: 19,
        },
        {
          id: 2,
          title: 'Capitulo 2',
          pg: 20,
        },
        {
          id: 3,
          title: 'Capitulo 3',
          pg: 20,
        },
        {
          id: 4,
          title: 'Capitulo 4',
          pg: 21,
        },
        {
          id: 5,
          title: 'Capitulo 5',
          pg: 22,
        },
        {
          id: 6,
          title: 'Capitulo 6',
          pg: 20,
        }
        
      ]
    }
  ]

}

const pageCounter = {
  current: 0,
}
const chapterKeys = [];
const map = generateMap();

contenedor.addEventListener('click', (e)=>{
  const clickX = e.pageX;
  const pageThird = body.clientWidth / 3;
  if(clickX < pageThird ){
    moveToPreviousPage();
  }
  else if(clickX > pageThird && clickX < pageThird * 2 && e.target == pagina){
    console.log("Abrir imagen?");
    window.open(`img/comic/${books[paginaActual].pagina}.jpg`, 'blank');
  }
  else{
    moveToNextPage();
  }
})



function getPositionString(object) {
  let pathName = "/"+ data.bk[object.b-1].title.replace(/\s+/g, '-').toLowerCase();
  return  data.bk[object.b-1].title+" "+ '- Capitulo ' + object.c + '- Pagina ' + object.p + "\n" 
  + pathName+ '/' +object.b+ '-' + object.c + '-' + object.p+".jpg \n";
}



function setPageCounter(value) {
  if (value >= 0 && value <= map.size){
    pageCounter.current = value;
    //renderCounter();
    renderPage();
  }
  else  throw new Error('Invalid value');
}
function getPageCounter() {
  return pageCounter.current;
}
function increasePageCounter() {
  if(pageCounter.current < map.size -1){
    pageCounter.current++;
    //renderCounter();
    renderPage();
  }
  else throw new Error('Last page reached');
  
}

function decreasePageCounter() {
  if(pageCounter.current > 0){
    pageCounter.current--;
    //renderCounter();
    renderPage();
  }
  else throw new Error('First page reached');
  
}

function renderCounter() {
  counter.innerText = pageCounter.current + "\n" + getPositionString(map.get(pageCounter.current)) + "\n" 
  
}

function renderPage(){
  createImage(getPath(map.get(pageCounter.current)));
}

function getPath(object){
  let bookPathName = data.bk[object.b-1].title.replace(/\s+/g, '-').toLowerCase();
  return  "img/"+bookPathName+ '/' +object.b + '-' + object.c + '-' + object.p+".jpg";
}



function createBookTag(book, container){

  let bookTag = document.createElement('div');
  bookTag.innerText = book.title;
  bookTag.classList.add('bookTag');
  container.appendChild(bookTag);
}
function createChapterLink(chapter, container,chPos){
  let chapterLink = document.createElement('a');
  chapterLink.innerText = chapter.title;
  chapterLink.classList.add('chapterLink');
  chapterLink.setAttribute('data-path', chapterKeys[chPos]);
  chapterLink.addEventListener('click', ()=>{
    setPageCounter(parseInt(parseInt(chapterLink.getAttribute('data-path'))));
  })
  container.appendChild(chapterLink);
}

function generateDropdown(){
  const dropdown = document.querySelector('#dropdown-content');
  const dropbutton = document.querySelector("#dropdown-button");
  dropbutton.addEventListener("click", ()=>{
    console.log('hola')
    toggleDisplay();
    }
  );
  let chPos = 0;
  data.bk.forEach(book => {
    createBookTag(book, dropdown);
    let bookContainer = document.createElement('div');
    
    bookContainer.classList.add('bookContainer');
    bookContainer.setAttribute('id', book.id);
    dropdown.appendChild(bookContainer);
    book.ch.forEach(chapter => {
      createChapterLink(chapter, bookContainer, chPos);
      console.log(chapterKeys[chPos]);
      chPos++;
    })
    
  });
  
}
function toggleDisplay() {
  document.querySelector('#dropdown-content').classList.toggle("show");
}

function generateMap(){
  const bookMap = new Map();
  let mapKey = 0;
  for(let i = 0; i < data.bk.length; i++){
    let pgCounter = 1;
    for(let j = 0; j < data.bk[i].ch.length; j++){
      for(let k = 0; k < data.bk[i].ch[j].pg; k++){
        if(k == 0) {
          chapterKeys.push(mapKey);
        };
        //console.log(i,j,k, mapKey);
        const mapObject = {
          b: i + 1,
          c: j + 1,
          p: pgCounter
        }
        bookMap.set(mapKey, mapObject);
        pgCounter++;
        mapKey++;
      }
    }
  }
  return bookMap;
}


function moveToPreviousPage(){
  try{
    decreasePageCounter()
  }
  catch(err){
    alert(err);
  }
}
function moveToNextPage(){
  try{
    increasePageCounter()
  }
  catch(err){
    alert(err);
  }
}

function createImage(src) {
  const nuevaImagen = document.createElement('img');
  nuevaImagen.src = src;
  nuevaImagen.classList.add('loading');
  contenedor.replaceChildren(nuevaImagen);  
}



generateDropdown();
//renderCounter();
renderPage();


