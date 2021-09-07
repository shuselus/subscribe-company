import axios from 'axios'

const baseUrl = 'https://api.jsonbin.io/';
const apiPath = 'b/61316d8ec4352e1d0767ef45';
const secretKey = '$2b$10$.4wgKaby4mGk011wlLE8X.sjvAX9kaTPER32jQynfXRPhX7DhFsnu';

const FetchApiData = async () => {
    try{
       return await axios.get(`${baseUrl}${apiPath}`,{
           headers:{
            "secret-key": secretKey
           }
       })
    }
    
    catch(error){
       console.error(`FetchApiData ERROR: ${error}`)
       // dispatch(errorOnFetchApiData(error.message))
    }
}

export default FetchApiData
