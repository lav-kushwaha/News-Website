const API_KEY="faaae3943aff4089a63c0358327db171"
const url="https://newsapi.org/v2/everything?q=";

window.addEventListener('load',() =>fetchNews("India"));

function reload(){
   window.location.reload();
}

async function fetchNews(query){
   const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
   // const res = await fetch(`https://newsapi.org/v2/everything?q=India&apiKey=faaae3943aff4089a63c0358327db171`);
   const data = await res.json();
   bindData(data.articles);
}

// Data Binding
function bindData(articles){
    const cardsContainer = document.getElementById('cards-container');
    const newsCardTemplate=document.getElementById('template-news-card');

    cardsContainer.innerHTML='';

    articles.forEach(article=>{
        if(!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone,article);
        cardsContainer.appendChild(cardClone);
    });
}

// Data Fill in cards
function fillDataInCard(cardClone,article){

     const newsImg = cardClone.querySelector('#news-img');
     const newsTittle = cardClone.querySelector('#news-title');
     const newsSource = cardClone.querySelector('#news-source');
     const newsDesc = cardClone.querySelector('#news-desc');

     newsImg.src=article.urlToImage;
     newsTittle.innerHTML=article.title;
     newsDesc.innerHTML=article.description;

     const date = new Date(article.publishedAt).toLocaleString('en-Us',{
        timeZone:"Asia/Jakarta"
     });

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener('click',()=>{
      window.open(article.url,"_blank");
    });
}


//Current selected Link active functionality.
let curSelectedNav=null;
function onNavItemClick(id){
   fetchNews(id);
   const navItem = document.getElementById(id);
   curSelectedNav?.classList.remove("active");
   curSelectedNav=navItem;
   curSelectedNav.classList.add("active");
}


// Search-Functionality
const searchButton = document.getElementById('search-button');
const searchText = document.getElementById('search-text')

searchButton.addEventListener('click',()=>{
   const query = searchText.value;
   if(!query) return;
   fetchNews(query);
   curSelectedNav?.classList.remove("active");

});


//Responsive Navbar Code.
const toggle = document.getElementById('toggle');
const navLinks = document.getElementById('nav-links');
const search = document.getElementById('search-links');

toggle.addEventListener('click',()=>{
   navLinks.classList.toggle('active');
   search.classList.toggle('active');
})
