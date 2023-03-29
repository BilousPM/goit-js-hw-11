const API_KEY = "key=34841382-75c0b952d5537088e5e81e69b"
const BASE_URL = 'https://pixabay.com/api/'


export default class PictureApiService {
    constructor() {
        this.inputFild = '';
        this.page = 1;
    }

    fetchPictures() {
        const url = `${BASE_URL}?${API_KEY}&q=${this.inputFild}&image_type=photo&orientation=horizontal&safesearch=false&per_page=40&page=${this.page}`
        
        return fetch(url).then(response => {
           if (!response.ok) {
               throw new Error(response.status)
            }
        
            return response.json().then(({hits}) => {
             this.page += 1;
             return hits
            })
        })
    }

    resetPage() {
        this.page =1
    }

    get value() {
        return this.inputFild;
    }

    set value(newValue) {
        this.inputFild = newValue;
    }
}
    
    
    
        

    
