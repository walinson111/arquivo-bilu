import axios from "axios";

const API_KEY = "nvPbEZhLk0bLLEvMROsCYcAswJe9kMClxebqyrfW";

export const nasaApi = axios.create({
  baseURL: "https://api.nasa.gov",
});

export async function getAstronomyPicture() {
  const response = await nasaApi.get(
    `/planetary/apod?api_key=${API_KEY}`
  );

  return response.data;
}