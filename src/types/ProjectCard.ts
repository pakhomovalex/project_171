type DonationType = 'full_price' | 'percentage';

type StatusType = 'moderation' | 'active' | 'archived' | 'draft';

export type ProjectCardType = {
  id: number,
  title: string,
  subtitle: string,
  cover_image: string,
  category: {
    id: number,
    name: string,
    slug: string
  },
  description: string,
  donation_type: DonationType,
  end_date: Date,
  status: StatusType,
  donation_percentage: number
  target_amount: number
}