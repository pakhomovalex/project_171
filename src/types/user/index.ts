export type User = {
  id: 0,
  username: string,
  full_name: string,
  avatar: string,
  city: string,
  specialization: [
    {
      id: 0,
      name: string,
      slug: string
    }
  ],
  date_joined: Date,
  project_count: number,
  phone_number: string,
  telegram_url: string,
  instagram_url: string,
  facebook_url: string
};
