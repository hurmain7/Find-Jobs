import axios from 'axios';
import reverseGeocode from 'latlng-to-zip';
import qs from 'qs';
import Geocoder from 'react-native-geocoding';
//import wc from 'which-country';
import {
  FETCH_JOBS,
  LIKE_JOB, CLEAR_LIKED_JOBS
} from './types';

const key = 'GoogleApiKey';
const JOB_ROOT_URL = 'https://api.indeed.com/ads/apisearch?';
const JOB_QUERY_PARAMS = {
  publisher: 'publisherKey',
  format: 'json',
  v: '2',
  //co:'pk',
  latlong: 1,
  radius: 10,
//  l: 'Lahore'
};
//
const buildJobsUrl = (zip, jobname) => {
  const query = qs.stringify({ ...JOB_QUERY_PARAMS, q: jobname, l: zip });
  return `${JOB_ROOT_URL}${query}`;
};

function getCountry(addrComponents) {
    for (var i = 0; i < addrComponents.length; i++) {
        if (addrComponents[i].types[0] == "country") {
            return addrComponents[i].short_name;
        }
        if (addrComponents[i].types.length == 2) {
            if (addrComponents[i].types[0] == "political") {
                return addrComponents[i].short_name;
            }
        }
    }
    return false;
};

function getPostalCode(addrComponents) {
  for (var i = 0; i < addrComponents.length; i++) {
    if (addrComponents[i].types[0] == "postal_code") {
      return addrComponents[i].short_name;
    }
  }
};

function getCity(addrComponents) {
    for (var i = 0; i < addrComponents.length; i++) {
        if (addrComponents[i].types[0] == "administrative_area_level_2") {
            return addrComponents[i].short_name;
        }
        if (addrComponents[i].types.length == 2) {
            if (addrComponents[i].types[0] == "political") {
                return addrComponents[i].short_name;
            }
        }
    }
    return false;
};

function getLocality(addrComponents) {
    for (var i = 0; i < addrComponents.length; i++) {
        if (addrComponents[i].types[0] == "locality") {
            return addrComponents[i].short_name;
        }
        if (addrComponents[i].types.length == 2) {
            if (addrComponents[i].types[0] == "political") {
                return addrComponents[i].short_name;
            }
        }
    }
    return false;
};

export const fetchJobs = (region,jobname, callback) => async (dispatch) => {
  try {
//    let zip = await reverseGeocode(region, key);
  //  console.log(zip)
  //  zip = 'asd'
//    let wc1 = wc([region.longitude, region.latitude])
  //  console.log(wc1)
    Geocoder.init("GoogleApiKey");
    let datas = await Geocoder.from(region.latitude, region.longitude);
    console.log(datas);
    let countryCode = getCountry(datas.results[0].address_components);
    let countryCode1 = countryCode.toLowerCase().toString();
    let zip = getLocality(datas.results[0].address_components);
    if(zip)
    {
      const url = buildJobsUrl(zip, jobname, countryCode);
      let { data } = await axios.get(url);
      dispatch({ type: FETCH_JOBS, payload: data });
      callback;
    }
    else {
      let zip = getCity(datas.results[0].address_components);
      const url = buildJobsUrl(zip, jobname, countryCode);
      let { data } = await axios.get(url);
      dispatch({ type: FETCH_JOBS, payload: data });
      callback;
    }

    console.log(countryCode1);
    console.log(zip);
  }
  catch(e)
    {
      console.log(e);
    }
  };


  //  const url = buildJobsUrl(zip, jobname);
  //  let { data } = await axios.get(url);
//   console.log(data)
//    dispatch({ type: FETCH_JOBS, payload: data })
//    callback;
//  }
//  catch(error) {
//  console.error(error);
//  }
//};


export const likeJob = (job) => {
  return {
    payload: job,
    type: LIKE_JOB
  };
};

export const clearLikedJobs = () => {
  console.log('s')
  return { type: CLEAR_LIKED_JOBS };
};
