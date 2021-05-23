import axios from 'axios'

// https://developers.google.com/places/web-service/autocomplete
export async function getPlaceAutocomplete(key: string, address: string) {
    const autocomplete = await axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json`, {
        params: {
            input: address,
            key: key,
            types: 'address'
        }
    });
    return autocomplete.data.predictions.map((prediction) => {
        return {
            place_id: prediction.place_id,
            description: prediction.description
        }
    })
}

// https://developers.google.com/maps/documentation/places/web-service/details
export async function getPlaceDetails(key: any, placeID: any): Promise<any> {
    /* From Thushan - I wasn't sure to complete this or not
    const placedetails = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json`, {
        params: {
            place_id : placeID,
            key: key
        }
    });
    return JSON.parse(placedetails.data.result)
    */
}