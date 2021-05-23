
import { getPlaceAutocomplete } from './googleapi'
var parser = require('parse-address-australia'); 

export async function getAutoCompleteDetails(address: any): Promise<any> {
    const apiKey = process.env.GOOGLE_PLACE_API_KEY;
    // get autocomplete results
    const res = getPlaceAutocomplete(process.env.GOOGLE_PLACE_API_KEY, address).then(async (autocompleteResults) => {
        const res = []
        let iMatches = 0;
        autocompleteResults.forEach(address => {
            if (address.description.includes('Australia'))
            {
                const contents = [];
                const components = [];
                contents['suggestion'] = address.description;
                
                var location = parser.parseLocation(address.description);
                components['unit'] = location['sec_unit_num'] !== undefined ? parseInt(location['sec_unit_num']) : null;
                components['street_number'] = location['number'] !== undefined ? parseInt(location['number']) : null;
                components['street_name'] = location['street'] !== undefined ? location['street'] : null;
                components['suburb'] = location['city'] !== undefined ? location['city'] : null;
                components['postcode'] = location['postcode'] !== undefined ? parseInt(location['postcode']) : null;
                components['state'] = location['state'] !== undefined ? location['state'] : null;
                components['country'] = 'Australia';//parser dosen't give the country
                
                contents['components'] = components;
                res[iMatches++] = contents;
            }
        });
        return res
    })
    
    // loop over and get details and map results
    return res
}
