import axios from "axios";

const API_KEY = "9ac81f43-ad43-4980-bfe6-255cc811a279";

export const solarSystemApi = axios.create({
  baseURL: "https://api.le-systeme-solaire.net/rest",
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});

export async function getBodies() {
  const response = await solarSystemApi.get("/bodies");

  return response.data.bodies;
}