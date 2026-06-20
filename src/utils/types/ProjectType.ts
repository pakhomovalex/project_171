type DonationType = 'full_price' | 'percentage';

type StatusType = 'moderation' | 'active' | 'archived' | 'draft';

export type ProjectType = {
  id: number,
  title: string,
  subtitle: string,
  author: {
    id: number,
    username: string,
    bio: string,
    avatar: string,
    full_name: string,
    telegram_url: string,
    instagram_url: string,
    facebook_url: string
  },
  category: {
    id: number,
    name: string,
    slug: string
  },
  images: [
    {
      id: number,
      image: string,
      order: number
    }
  ],
  description: string,
  fundraising_goal: string,
  target_amount: string,
  donation_type: DonationType,
  price: number,
  donation_percentage: number,
  monobank_jar_url: string,
  privatbank_konvert_url: string,
  paypal_me_url: string,
  other_payment_details: string,
  status: StatusType,
  created_at: Date
  end_date: Date,
  views_count: number
}