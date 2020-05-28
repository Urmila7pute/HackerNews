import axios from 'axios';

export const baseurl="http://hn.algolia.com/api/v1/";
export const AllStoriesUrl=`${baseurl}search?query=foo&tags=story`;

export const AllStories= async (page)=>{
    const data =await axios.get(`${AllStoriesUrl}&page=${page}`);
    return data;
}