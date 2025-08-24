export type User = {
  id: 0,
  username: string,
  email: string,
  first_name: string,
  last_name: string,
  avatar: string,
  bio: string,
  city: string,
  specialization: [
    {
      id: 0,
      name: string,
      slug: string
    }
  ],
  phone_number: string,
  telegram_url: string,
  instagram_url: string,
  facebook_url: string
};
