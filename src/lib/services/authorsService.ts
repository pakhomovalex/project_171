import { httpClient as client } from "../api/http";
import { AuthorWithProject } from "@/types/AuthorWithProjects";


export const authorsService = {
  getAllAuthors: (): Promise<AuthorWithProject[]> => client.get('/users/authors'),

  getAuthor: (id: number): Promise<AuthorWithProject> => client.get(`/users/authors/${id}`),
}