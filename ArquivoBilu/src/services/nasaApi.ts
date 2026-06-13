import axios from "axios";

const API_KEY = process.env.EXPO_PUBLIC_NASA_API_KEY;

if (!API_KEY) {
  throw new Error(
    "EXPO_PUBLIC_NASA_API_KEY não foi definida no arquivo .env"
  );
}

export const nasaApi = axios.create({
  baseURL: "https://api.nasa.gov",
});

export async function getAstronomyPicture() {
  const response = await nasaApi.get(
    `/planetary/apod?api_key=${API_KEY}`
  );

  return response.data;
}