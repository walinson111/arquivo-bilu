import axios from "axios";

// A chave fica em .env (EXPO_PUBLIC_NASA_API_KEY).
// Variáveis com prefixo EXPO_PUBLIC_ são injetadas em build time pelo Expo.
// Nunca coloque a chave diretamente no código.
const API_KEY = process.env.EXPO_PUBLIC_NASA_API_KEY ?? "DEMO_KEY";

export const nasaApi = axios.create({
  baseURL: "https://api.nasa.gov",
});

export async function getAstronomyPicture() {
  const response = await nasaApi.get(`/planetary/apod?api_key=${API_KEY}`);
  return response.data;
}