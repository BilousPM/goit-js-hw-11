import './css/styles.css';
import PictureApiService from './component_js/pikcture_api_service'
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const refs = {
    searchFormEl: document.querySelector('#search-form'),
    cardContainer: document.querySelector('.gallery'),
    loadMoBtnEl: document.querySelector('.load-more')
};

// new SimpleLightbox('.gallery a', {
//   captionsData: 'alt',
// });

const picturesApiService = new PictureApiService();

refs.searchFormEl.addEventListener('submit', hendleSearchSubmit);
refs.loadMoBtnEl.addEventListener('click', hendleLoadMOClick);

function hendleSearchSubmit(e) {
    e.preventDefault();
    picturesApiService.value = e.target.elements.searchQuery.value.trim();

    if (picturesApiService.value === '') {
        Notiflix.Notify.warning('Please enter, what exactly you want to find?');
        return;
    }
    picturesApiService.resetPage();
    picturesApiService.fetchPictures().then(({hits, totalHits }) => {
        if (hits.length === 0) {
            clearGalery();
            Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
            return;
        }

        clearGalery()
        renderMarkUp(hits)
        Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`)
        
    
        if (totalHits < 40) {
            loadMorButtonDisable()
            return;
        }

        loadMorButtonEnable()
    }).catch('an error occurred, please try again later');
}

function hendleLoadMOClick() {
    loadMorButtonDisable()
    picturesApiService.fetchPictures().then(card => {
        renderMarkUp(card.hits)
        loadMorButtonEnable()
        if (card.hits.length < 40) {
            loadMorButtonDisable()
            Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
        }
    }).catch('an error occurred, please try again later');
}

function renderMarkUp(data) {
    
const markUp = createMarkUp(data)
refs.cardContainer.insertAdjacentHTML('beforeend', markUp)

}

function clearGalery() {
    refs.cardContainer.innerHTML = "";
}

function createMarkUp(array) {
 
    return array.map((picture) => {

        const{tags, webformatURL, likes, views, comments, downloads, largeImageURL} = picture
        return `<div class="photo-card">
  <a href="${largeImageURL}" class="link-img">
  <img class="gallery__image"
  src="${webformatURL}" 
  alt="${tags}" 
  width="340px" 
  height="220px" 
  loading="lazy" />
  </a>
<div class="info">
    <p class="info-item">
      <b>Likes <br />${likes}</b>
    </p>
    <p class="info-item">
      <b>Views <br />${views}</b>
    </p>
    <p class="info-item">
      <b>Comments <br />${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads <br />${downloads}</b>
    </p>
  </div>
</div>`
    }).join("");
};

function loadMorButtonDisable() {
    refs.loadMoBtnEl.classList.add('hidden')
}

function loadMorButtonEnable() {
    refs.loadMoBtnEl.classList.remove('hidden')
}



// const { height: cardHeight } = document.querySelector(".gallery").firstElementChild.getBoundingClientRect();


// window.scrollBy({
//   top: cardHeight * 2,
//   behavior: "smooth",
// });

// var nodeObj = document.querySelector('.button-node');

// nodeObj.scrollIntoView({
//    behavior: "smooth",
//    block:    "start" 
// });