import axios from 'axios'

const baseUrl = "https://mocki.io/v1/d172b987-a068-4ba6-9ae0-a17e91973f10";//'https://api.jsonbin.io/';//'https://api.jsonbin.io/v3';
//const binId = 'b/613da76daa02be1d4446adcc';
//const secretKey = '$2b$10$rm58Ra.Anq8XmbX.J/jC/OVhdaQkzQs5/uS0w9zyI2biOP6qfZMw6';

const FetchApiData = async () => {
    try{
    //    return await axios.get(`${baseUrl}${binId}`,{
    //        headers:{
    //         "secret-key": secretKey
    //        }
    //    })
      return await axios.get(baseUrl);
      
    }
    
    catch(error){
       console.error(`FetchApiData ERROR: ${error}`)
       // dispatch(errorOnFetchApiData(error.message))
    }
}

export default FetchApiData
