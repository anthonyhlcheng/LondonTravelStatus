import axios from 'axios';

export default axios.create({
    baseURL: "https://api.tfl.gov.uk/",
    params: {
        app_id: 'ENTER APP ID',
        app_key: 'ENTER APP KEY'
    }
})