import axios from 'axios'

//const baseUrl = 'https://jsonkeeper.com/b/XSMF'; this api throw error on 


const baseUrl = "https://mocki.io/v1/d172b987-a068-4ba6-9ae0-a17e91973f10";

const FetchApiData = async () => {
    try{
      return await axios.get(baseUrl);
    }
    catch(error){
       console.error(`FetchApiData ERROR: ${error}`)
       // dispatch(errorOnFetchApiData(error.message))
    }
}

export default FetchApiData
