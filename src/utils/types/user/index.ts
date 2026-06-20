// ============ БАЗОВЫЕ ТИПЫ ============
export interface Specialization {
  id: number;
  name: string;
  slug: string;
}

export interface SocialLinks {
  phone_number: string;
  telegram_url: string;
  instagram_url:  string;
  facebook_url: string;
}

export type DonationType = 'full_price' | 'percentage';
export type StatusType = 'moderation' | 'active' | 'archived' | 'draft';

// ============ ПРОЕКТ (краткий, для списков) ============

export interface ProjectBrief {
  id: number;
  title: string;
  subtitle: string;
  cover_image: string;
  category: {
    id: number;
    name: string;
    slug: string;
  };
  description: string;
  donation_type: DonationType;
  status: StatusType;
  end_date: Date; // ISO строка, не Date
  target_amount: number;
  donation_percentage: number;
  can_edit?: boolean
}

// ============ ПОЛЬЗОВАТЕЛЬ (единый тип) ============

export interface User {
  id: number;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  full_name: string; // computed: `${first_name} ${last_name}`.trim()
  
  // Профиль
  avatar: string | null;
  bio: string;
  city: string;
  specialization: Specialization | null; // объект, не массив
  
  // Контакты
  phone_number: string;
  telegram_url: string;
  instagram_url: string;
  facebook_url: string;
  
  // Мета
  is_staff: boolean;
  is_superuser: boolean;
  date_joined: string; // ISO строка
  last_login: string | null;
  
  // Статистика (опционально, приходит с некоторых эндпоинтов)
  project_count?: number;
}

// ============ ПОЛЬЗОВАТЕЛЬ С ПРОЕКТАМИ (для страницы автора) ============

export interface UserWithProjects extends User {
  projects: ProjectBrief[];
}

// ============ ДЛЯ ФОРМЫ РЕДАКТИРОВАНИЯ ============

export interface UserProfileUpdate {
  first_name?: string;
  last_name?: string;
  bio?: string;
  city?: string;
  specialization?: number | null; // ID специализации
  phone_number?: string;
  telegram_url?: string;
  instagram_url?: string;
  facebook_url?: string;
  avatar?: File | null;
}