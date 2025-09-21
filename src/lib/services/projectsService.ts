import { ProjectType } from "@/types/ProjectType";
import { httpClient as client } from "../api/http";

type CreateProjectType = Omit<ProjectType,
  'createdAt'
  & 'id'
  & 'images'
  & 'category'
  & 'author'
>

export const projectsService = {
  getActiveProjects: (): Promise<ProjectType[]> => client.get('/projects'),

  createProject: (project: CreateProjectType): Promise<ProjectType> =>
    client.post('/projects', project),

  getProjectById: (id: number): Promise<ProjectType> => client.get(`/projects/${id}`),

  updateProjectAll: (id: number, data: CreateProjectType): Promise<ProjectType> => {
    return client.put(`/projects/${id}`, data);
  },

  updateProject: (id: number, data: object): Promise<ProjectType> => {
    return client.patch(`/projects/${id}`, data);
  },

  deleteProject: (id: number) => client.delete(`/projects/${id}`),

  uploadImageToProject: (id: number, photo: string) =>
    client.post(`/projects/${id}/upload-image`, { photo })
};