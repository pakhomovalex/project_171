type DonationType = 'full_price' | 'percentage';

type StatusType = 'moderation' | 'active' | 'archived' | 'draft';

export type ProjectType = {
  id: number,
  title: string,
  subtitle: string,
  author: {
    id: 0,
    username: string,
    avatar: string,
    full_name: string
  },
  category: {
    id: 0,
    name: string,
    slug: "L5tSg_FM94imu4_ahnOQGs7LWKRGZHbMY"
  },
  images: [
    {
      id: 0,
      image: string,
      order: 9223372036854776000
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