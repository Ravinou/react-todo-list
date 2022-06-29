import axios from "axios";

const instance = axios.create({
    baseURL: 'https://VOTRE-URL-FIREBASE'
});

export default instance;