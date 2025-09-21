export type AuthorWithProject = {
  id: 0,
  username: string,
  full_name: string,
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
  facebook_url: string,
  date_joined: Date,
  project_count: 0,
  projects: [
    {
      id: number,
      title: string,
      subtitle: string,
      description: string,
      category: string,
      cover_image: string,
      donation_type: string,
      status: string,
      end_date: Date
    }
  ]
}