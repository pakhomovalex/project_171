import { httpClient as client } from "../api/http";
import { UserWithProjects } from "@/types/user/index";


export const authorsService = {
  getAllAuthors: (): Promise<UserWithProjects[]> => client.get('/users/authors'),

  getAuthor: (id: number): Promise<UserWithProjects> => client.get(`/users/authors/${id}`),
}