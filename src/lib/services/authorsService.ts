import { httpClient as client } from "../api/http";
import { UserWithProjects } from "../../utils/types/user/index";


export const authorsService = {
  getAllAuthors: (): Promise<UserWithProjects[]> => client.get('/users/authors'),

  getAuthor: async (id: number, accessToken?: string): Promise<UserWithProjects> => {
    const headers: Record<string, string> = {};
    
    if (accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`;
    }
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/authors/${id}/`, {
      headers,
      // Важно: добавляем cache: 'no-store' для динамических данных
      cache: 'no-store',
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch author');
    }
    
    return res.json();
  },
}