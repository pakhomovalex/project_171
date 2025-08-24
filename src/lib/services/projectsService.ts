import { Project } from "next/dist/build/swc/types";
import { httpClient as client } from "../api/http";

type CreateProjectType = Omit<Project,
  'createdAt'
  & 'id'
  & 'images'
  & 'category'
  & 'author'
>

export const projectsService = {
  getActiveProjects: (): Promise<Project[]> => client.get('/projects'),

  createProject: (project: CreateProjectType): Promise<Project> =>
    client.post('/projects', project),

  getProjectById: (id: number): Promise<Project> => client.get(`/projects/${id}`),

  updateProjectAll: (id: number, data: CreateProjectType): Promise<Project> => {
    return client.put(`/projects/${id}`, data);
  },

  updateProject: (id: number, data: object): Promise<Project> => {
    return client.patch(`/projects/${id}`, data);
  },

  deleteProject: (id: number) => client.delete(`/projects/${id}`),

  uploadImageToProject: (id: number, photo: string) =>
    client.post(`/projects/${id}/upload-image`, { photo })
};