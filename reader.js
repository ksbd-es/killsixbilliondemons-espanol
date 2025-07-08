const body = document.querySelector('body');
const contenido = document.querySelector('#contenido');;
const counter = document.querySelector('#counter');
const image = document.querySelector('.contenedor-pagina .imagen');
const contenedor = document.querySelector('.contenedor-pagina');
const btnDropdown = document.querySelector('#dropdown-button');
const btnCh = document.querySelector('#chapter-button');
const btnPg = document.querySelector('#page-button');
const dropdown = document.querySelector('#dropdown-content');
const dropdownPage = document.querySelector('#dropdown-page');
const btnPrev = document.querySelector('#prev');
const btnNext = document.querySelector('#next');


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

btnPg.addEventListener("click", ()=>{
  toggleDisplay(dropdownPage);
  }
);

body.addEventListener('click', (e)=>{
  if(e.target != dropdown && e.target != btnDropdown){
    document.querySelector('#dropdown-content').classList.remove("show");
  }
})

body.addEventListener('click', (e)=>{
  if(e.target != dropdown && e.target != btnPg){
    document.querySelector('#dropdown-page').classList.remove("show");
  }
})
body.addEventListener('keydown', (e)=>{
  console.log(e.key);
  if(e.key == 'ArrowRight') moveToNextPage();
  if(e.key == 'ArrowLeft') moveToPreviousPage();
})

contenedor.addEventListener('click', (e)=>{
  const clickX = e.pageX;
  const pageThird = body.clientWidth / 3;
  const pageHalf = body.clientWidth / 2;
  const dist = pageHalf - clickX;
  if(Math.abs(dist) < 50){
    console.log("hola");
    window.open(`${getPath(map.get(pageCounter.current))}`, 'blank');
  }
  else if(dist >0){
    moveToPreviousPage();
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

  let isNewChapter = false;
  if(map.get(value).c != map.get(pageCounter.current).c || map.get(value).b != map.get(pageCounter.current).b){
    isNewChapter = true;

  }

  if (value >= 0 && value < map.size){
    pageCounter.current = value;
    //renderCounter();
    renderPage();
    renderButtons();
    if(isNewChapter){
      generatePageDropdown();
    }
  }
  else  throw new Error('Invalid value');
}
function getPageCounter() {
  return pageCounter.current;
}

function increasePageCounter() {
  let isNewChapter = false;
  if(map.get(pageCounter.current + 1).c != map.get(pageCounter.current).c || map.get(pageCounter.current + 1).b != map.get(pageCounter.current).b){
    isNewChapter = true;

  }
  if(pageCounter.current < map.size -1){
    pageCounter.current++;
    //renderCounter();
    renderPage();
    renderButtons();
    if(isNewChapter){
      generatePageDropdown();
    }

  }
  //else throw new Error('Last page reached');


}

function decreasePageCounter() {
  let isNewChapter = false;
  if(map.get(pageCounter.current -1).c != map.get(pageCounter.current).c || map.get(pageCounter.current -1).b != map.get(pageCounter.current).b ){
    isNewChapter = true;

  }
  if(pageCounter.current > 0){
    pageCounter.current--;
    //renderCounter();
    renderPage();
    renderButtons();

    if(isNewChapter){
      generatePageDropdown();
    }
  }
  //else throw new Error('First page reached');

}

function renderCounter() {
  counter.innerText = pageCounter.current + "\n" + getPositionString(map.get(pageCounter.current)) + "\n"

}

function renderPage(){
  createImage(getPath(map.get(pageCounter.current)));
  body.scrollTo(100, 100);
}
function renderButtons(){
  if(pageCounter.current == 0){
    btnPrev.disabled = true;
    //btnPrev.classList.add('hidden');
  }
  else{
    btnPrev.disabled = false;
    //btnNext.classList.remove('hidden');
  }
  if(pageCounter.current == map.size -1){
    btnNext.disabled = true;
    //btnNext.classList.add('hidden');
  }
  else{
    btnNext.disabled = false;
    //btnNext.classList.remove('hidden');
  }
}

function getPath(object){
  let bookPathName = data.bk[object.b-1].title.replace(/\s+/g, '-').toLowerCase();
  return  "img/"+bookPathName+ '/' +object.b + '-' + object.c + '-' + object.p+".jpg";
}



function createBookTag(book, container){

  let bookTag = document.createElement('div');
  bookTag.innerText = book.title.toUpperCase();
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

function createPageLink(container,index){
  let pageLink = document.createElement('a');
  const pg = map.get(pageCounter.current).p;
  let counter = index + chapterKeys[getChPos()];
  pageLink.innerText = "Página " +  (index + 1);
  pageLink.classList.add('pageLink');

  pageLink.setAttribute('data-path', counter);
  pageLink.addEventListener('click', ()=>{
    console.log(pageLink.getAttribute('data-path'));
    setPageCounter(parseInt(pageLink.getAttribute('data-path')));

  })
  container.appendChild(pageLink);
}

function generateDropdown(){
  const dropdown = document.querySelector('#dropdown-content');
  const dropbutton = document.querySelector("#dropdown-button");

  dropbutton.addEventListener("click", ()=>{
    console.log('hola')
    toggleDisplay(dropdown);
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
/*

function generateChapterDropdown(dropdown, target){
  const dropdown = document.querySelector('#dropdown-content');
  const dropbutton = document.querySelector("#dropdown-button");

  dropbutton.addEventListener("click", ()=>{
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
  */

function generatePageDropdown(){
  const dropdown = document.querySelector('#dropdown-page');
  const dropbutton = document.querySelector("#page-button");
  dropdown.childNodes.forEach(element => {
    element.remove();
  })


  let bkIndex = map.get(pageCounter.current).b - 1;
  let chIndex = map.get(pageCounter.current).c - 1;
  let chapterLength = data.bk[bkIndex].ch[chIndex].pg;

  let pageContainer = document.createElement('div');
  pageContainer.classList.add('pageContainer');
  pageContainer.setAttribute('id', "pageContainer");
  dropdown.appendChild(pageContainer);

  for(let i = 0; i < chapterLength; i++){
    createPageLink(pageContainer,i);
  }






}
function toggleDisplay(menu) {
  menu.classList.toggle("show");
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

function getChPos(){
  const book = map.get(pageCounter.current).b;
  const chapter = parseInt(map.get(pageCounter.current).c);
  let chPos = chapter - 1;

  if(book != 1){
    for(let i = 0; i < book - 1; i++){
      chPos += data.bk[i].ch.length;
    }
  }
  return chPos;
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
  nuevaImagen.classList.add('imagen');
  contenedor.replaceChildren(nuevaImagen);
}

function printMap(){
  map.forEach((value, key) => {
    //console.log(key, " | "+value.b + "-" + value.c + "-" + value.p);
    console.log(key, " | "+ map.get(key).b + "-" + map.get(key).c + "-" + map.get(key).p);
  })
}

function toggleShow(button){
  button.classList.toggle("");
}


generateDropdown();
generatePageDropdown();
//renderCounter();

renderPage();
renderButtons();


