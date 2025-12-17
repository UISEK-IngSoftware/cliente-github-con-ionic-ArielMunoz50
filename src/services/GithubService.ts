import axios from "axios";
import { RepositoryItem } from "../interfaces/RepositoryItem";
import { Userinfo } from "../interfaces/Userinfo";

const GITHUB_API_URL = import.meta.env.VITE_API_URL;
const GITHUB_API_TOKEN = import.meta.env.VITE_GITHUB_API_TOKEN;

export const fetchRepositories = async (): Promise<RepositoryItem[]> => {
    try {
        const response = await axios.get(`${GITHUB_API_URL}user/repos`, {
            headers: {
                Authorization: `Bearer ${GITHUB_API_TOKEN}`,
            },
            params: {
                per_page: 100,
                sort: "created",
                direction: "desc",
            },
        });
        const repositories: RepositoryItem[] = response.data.map((repo: any) => ({
            name: repo.name,
            description: repo.description ? repo.description : null,
            imageUrl: repo.owner? repo.owner.avatar_url : null,
            owner: repo.owner? repo.owner.login : null,
            lenguaje: repo.language ? repo.language : null,
        }));
        return repositories;
            }
                
        catch (error) {
        console.error("Error fetching repositories:", error);
        return [];
    }
}

export const createRepository = async (repo: RepositoryItem): Promise<void> => {
  try {
    await axios.post(
      `${GITHUB_API_URL}user/repos`,
      {
        name: repo.name,
        description: repo.description,
        private: false
      },
      {
        headers: {
          Authorization: `Bearer ${GITHUB_API_TOKEN}`,
          Accept: "application/vnd.github+json"
        }
      }
    );

    console.log("Repositorio creado exitosamente");
  } catch (error) {
    console.error("Error al crear el repositorio:", error);
    throw error;
  }
};

export const fetchUserInfo = async (): Promise<Userinfo | null> => {
  try {
    const response = await axios.get(`${GITHUB_API_URL}user`, {
      headers: {
        Authorization: `Bearer ${GITHUB_API_TOKEN}`,
      },
    });

    return response.data as Userinfo;

  } catch (error) {
    console.error("Error al obtener información del usuario:", error);

    const userInfo: Userinfo = {
      login: 'undefined',
      name: 'Usuario no encontrado',
      bio: 'No se encontró la biografía',
      avatar_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/GitHub_Invertocat_Logo.svg/1200px-GitHub_Invertocat_Logo.svg.png',
    };

    return userInfo;
  }
};
