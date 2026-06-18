import { httpClient as client } from "../api/http";
import { ProjectBrief } from "../../utils/types/user";
import { Project } from "next/dist/build/swc/types";
import { ProjectType } from "../../utils/types/ProjectType";

export const projectsService = {
  // Получить список проектов (краткие)
  getProjects: (): Promise<ProjectBrief[]> =>
    client.get('/projects/'),

  // Получить детали проекта (полный)
  getProject: (id: number): Promise<ProjectType> =>
    client.get(`/projects/${id}/`),

  // Создать проект
  createProject: (data: FormData | Partial<Project>) => {
    const isFormData = data instanceof FormData;
    return client.post('/projects/', data, {
      headers: isFormData
        ? { 'Content-Type': 'multipart/form-data' }
        : { 'Content-Type': 'application/json' },
    });
  },

  getCategories: (): Promise<{ id: number; name: string; slug: string }[]> => 
    client.get('/projects/categories/'),

  // Обновить проект
  updateProject: (id: number, data: FormData | Partial<Project>) => {
  const isFormData = data instanceof FormData;
return client.patch(`/projects/${id}/`, data, {
  headers: isFormData
    ? { 'Content-Type': 'multipart/form-data' }
    : { 'Content-Type': 'application/json' },
});
},

// Удалить проект
deleteProject: (id: number) =>
  client.delete(`/projects/${id}/`),
};