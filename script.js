let jsonURL = "https://www.luizpicolo.com.br/api.json"; 
let XHR = new XMLHttpRequest();
XHR.open("GET", jsonURL);
XHR.responseType = "json";
XHR.send();

XHR.onload = function(){
  let noticias = XHR.response;
  var elemento = document.getElementById('notdestaque');
  var elemento = document.getElementById('noticia');

  class CustomError extends Error {
  constructor(mensagem) {
    super(mensagem);
    this.name = "NoticiaError"

  }
}

  class Noticia {
  constructor(title, author, publishedAt, description, url){
    this.title = title;
    this.author = author;
    this.publishedAt = publishedAt;
    this.description = description;
    this.url = url;
  }
  mostrar_noticia(){
    if(this.title != ""){
    return `<section>
      <div class="noticia">
<center>
       <h1><a class="titnoticia" href="${this.url}">${this.title}</h1></a>
      <p>${this.author}</p>
      <p>${this.publishedAt}</p>
      <p>by ${this.description}</p>
</center>
      </div>
      </section>`}
    else{
      throw new CustomError('O título está faltando')
      }
  }
}
  //const elemento = document.getElementById('noticias');
  

  
  class NoticiaDestaque extends Noticia {
    constructor(urlToImage, title, author, publishedAt, description, url){
      super(title, author, publishedAt, description, url)
      this.urlToImage = urlToImage;
    }
    mostrarDestaque(){
      return `<section>
      <div class="notdestaque">
      <center>
      <img src="${this.urlToImage}" class="imagem" width= "90%"/>
      </center>
      </br>
<div class="lado">
      <h1><a class="titdestaque" href="${this.url}">${this.title}</a></h1>
      <p>${this.author}</p>
      <p>${this.description}</p>
      <p>by ${this.publishedAt}</p>
</div>
      </div>
     </section>`
    }
  }
     

   let noticiaDestaque = new NoticiaDestaque(
     noticias.articles[0].urlToImage,
     noticias.articles[0].title,
     noticias.articles[0].publishedAt,
     noticias.articles[0].author,
     noticias.articles[0].description,
     noticias.articles[0].url)
      elemento.insertAdjacentHTML('afterbegin', noticiaDestaque.mostrarDestaque());

 noticias.articles.shift();
  
   noticias.articles.forEach(noticia =>{
    let notnot = new Noticia (noticia.title, noticia.publishedAt, noticia.description, noticia.author, noticia.url, noticia.urlToImage);
    elemento.insertAdjacentHTML('beforeend', notnot.mostrar_noticia());
  })

}

  