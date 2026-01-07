import axios from "axios";
import { RepositoryItem } from "../interfaces/RepositoryItem";
import { Userinfo } from "../interfaces/Userinfo";
import AuthServices from "./AuthServices";

const GITHUB_API_URL = import.meta.env.VITE_API_URL;

const githubApi = axios.create({
  baseURL: GITHUB_API_URL,
});

githubApi.interceptors.request.use(
  (config) => {
    const authHeader = AuthServices.getAuthHeaders();

    if (authHeader.Authorization) {
      config.headers.Authorization = authHeader.Authorization;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export const fetchRepositories = async (): Promise<RepositoryItem[]> => {
  try {
    const response = await githubApi.get(`user/repos`, {
      params: {
        per_page: 100,
        sort: "created",
        direction: "desc",
      },
    });

    const repositories: RepositoryItem[] = response.data.map((repo: any) => ({
      name: repo.name,
      description: repo.description ? repo.description : null,
      imageUrl: repo.owner ? repo.owner.avatar_url : null,
      owner: repo.owner ? repo.owner.login : null,
      lenguaje: repo.language ? repo.language : null,
    }));

    return repositories;
  } catch (error) {
    console.error("Error fetching repositories:", error);
    return [];
  }
};

export const createRepository = async (repo: RepositoryItem): Promise<void> => {
  try {
    await githubApi.post(`user/repos`, {
      name: repo.name,
      description: repo.description,
      private: false,
    });

    console.log("Repositorio creado exitosamente");
  } catch (error) {
    console.error("Error al crear el repositorio:", error);
    throw error;
  }
};

export const fetchUserInfo = async (): Promise<Userinfo | null> => {
  try {
    const response = await githubApi.get(`user`);
    return response.data as Userinfo;
  } catch (error) {
    console.error("Error al obtener información del usuario:", error);

    const userInfo: Userinfo = {
      login: "undefined",
      name: "Usuario no encontrado",
      bio: "No se encontró la biografía",
      avatar_url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/GitHub_Invertocat_Logo.svg/1200px-GitHub_Invertocat_Logo.svg.png",
    };

    return userInfo;
  }
};
