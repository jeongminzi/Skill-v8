import React from 'react';
import * as Lucide from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '../../../lib/cn';

// @spec-managed:start props
export interface IconProps {
  name: string;
  size?: 16 | 18 | 20 | 24 | 32;
  strokeWidth?: number;
  filled?: boolean;
  className?: string;
}
// @spec-managed:end

const ICONS: Record<string, LucideIcon> = {
  back: Lucide.ArrowLeft,
  forward: Lucide.ArrowRight,
  chevron_right: Lucide.ChevronRight,
  chevron_down: Lucide.ChevronDown,
  close: Lucide.X,
  add: Lucide.Plus,
  home: Lucide.Home,
  search: Lucide.Search,
  bell: Lucide.Bell,
  notifications: Lucide.Bell,
  star: Lucide.Star,
  heart: Lucide.Heart,
  favorite: Lucide.Heart,
  location: Lucide.MapPin,
  user: Lucide.User,
  person: Lucide.User,
  event: Lucide.Calendar,
  event_note: Lucide.CalendarDays,
  travel_explore: Lucide.Compass,
  storefront: Lucide.Store,
  inventory_2: Lucide.Package,
  restaurant: Lucide.UtensilsCrossed,
  face: Lucide.Smile,
  smile: Lucide.Smile,
  checkroom: Lucide.Shirt,
  pets: Lucide.PawPrint,
  dashboard: Lucide.LayoutGrid,
  business_center: Lucide.Briefcase,
  delete: Lucide.Trash2,
  edit: Lucide.Pencil,
  chat: Lucide.MessageCircle,
  settings: Lucide.Settings,
  check_circle: Lucide.CheckCircle2,
  tune: Lucide.SlidersHorizontal,
  photo_camera: Lucide.Camera,
  spinner: Lucide.Loader2,
  smartphone: Lucide.Smartphone,
  building: Lucide.Building2,
  monitor: Lucide.MonitorCog,
  sparkles: Lucide.Sparkles,
  // category-icon keys (mirror app/lib/category-icons.ts)
  camera: Lucide.Camera,
  usercircle: Lucide.UserCircle,
  users: Lucide.Users,
  baby: Lucide.Baby,
  briefcase: Lucide.Briefcase,
  dog: Lucide.Dog,
  cat: Lucide.Cat,
  pawprint: Lucide.PawPrint,
  dumbbell: Lucide.Dumbbell,
  gift: Lucide.Gift,
  flower: Lucide.Flower2,
  leaf: Lucide.Leaf,
  image: Lucide.ImageIcon,
  sun: Lucide.Sun,
  coffee: Lucide.Coffee,
  cake: Lucide.Cake,
  phone: Lucide.Phone,
  clock: Lucide.Clock,
};

export function Icon({ name, size = 20, strokeWidth = 1.75, filled = false, className }: IconProps) {
  const Cmp = ICONS[name] ?? Lucide.HelpCircle;
  return (
    <Cmp
      size={size}
      strokeWidth={strokeWidth}
      fill={filled ? 'currentColor' : 'none'}
      aria-hidden
      className={cn('shrink-0', className)}
    />
  );
}

export const ICON_NAMES = Object.keys(ICONS);
