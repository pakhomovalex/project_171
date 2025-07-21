export type UserType = {
  id: number,
  username: string,
  email: string,
  first_name: string,
  last_name: string,
  avatar: string,
  bio: string,
  city: string,
  phone_number: string,
  telegram_url: string,
  instagram_url: string,
  facebook_url: string,
  specialization: [
    {
      id: number,
      name: string,
      slug: string,
    }
  ],
  projects: number[],
  createdAt: string,
}