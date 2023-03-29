import './css/styles.css';
import PictureApiService from './component_js/pikcture_api_service'

const refs = {
    searchFormEl: document.querySelector('#search-form'),
    cardContainer: document.querySelector('.gallery'),
    loadMoBtnEl: document.querySelector('.load-more')
};

const picturesApiService = new PictureApiService();

refs.searchFormEl.addEventListener('submit', hendleSearchSubmit);
refs.loadMoBtnEl.addEventListener('click', hendleLoadMOClick);

function hendleSearchSubmit(e) {
    e.preventDefault();
    picturesApiService.value = e.target.elements.searchQuery.value.trim();

    if (picturesApiService.value === '') {
        console.log('Please enter, what exactly you want to find?');
        return;
    }
    picturesApiService.resetPage();
    picturesApiService.fetchPictures().then(card => {
        if (card.length === 0) {
            clearGalery()
            console.log("Sorry, there are no images matching your search query. Please try again.");
            return;
        }
        clearGalery()
        renderMarkUp(card)
        loadMorButtonEnable()
    })
}

function hendleLoadMOClick() {
    loadMorButtonDisable
    picturesApiService.fetchPictures().then(card => {
        renderMarkUp(card)
        loadMorButtonEnable()
    })
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
        return `<div class="photo-card">
  <img src="${picture.webformatURL}" alt="${picture.tags}" width="340px" height="220px" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes <br />${picture.likes}</b>
    </p>
    <p class="info-item">
      <b>Views <br />${picture.views}</b>
    </p>
    <p class="info-item">
      <b>Comments <br />${picture.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads <br />${picture.downloads}</b>
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
