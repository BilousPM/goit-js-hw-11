import axios from "axios";

const API_KEY = "key=34841382-75c0b952d5537088e5e81e69b"
const BASE_URL = 'https://pixabay.com/api/'

export default class PictureApiService {
    constructor() {
        this.inputFild = '';
        this.page = 1;
    }

    fetchPictures() {
        const url = `${BASE_URL}?${API_KEY}&q=${this.inputFild}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`
        
        return axios.get(url)
            .then(({data:{hits, totalHits}}) => {
                this.page += 1;
                return {hits, totalHits}
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
    
    
    
        

    
