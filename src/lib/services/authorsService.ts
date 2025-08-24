import { User } from "@/types/user";
import { httpClient as client } from "../api/http";


export const authorsService = {
  getAllAuthors: (): Promise<User[]> => client.get('/authors'),

  getAuthor: (id: number): Promise<User> => client.get(`/authors/${id}`),
}