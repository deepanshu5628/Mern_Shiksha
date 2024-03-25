import { categories } from "../apis";
import {apiconnector} from "../apiconnector"

export const fetchcategorydetails=async(link)=>{
    let result;
    try {
      result = await apiconnector("POST", categories.CATEGORIES_API_GETCATEGORYPAGEDETAILS, { link: link })
      return result;
    } catch (error) {
      console.log("error occured in Get course of a specific Category in PageandComponentDataApi.jsx");
      return error;
    }
}