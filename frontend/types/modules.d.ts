declare module 'lucide-react' {
  import * as React from 'react';
  export interface LucideProps extends React.SVGProps<SVGSVGElement> {
    size?: string | number;
    color?: string;
    strokeWidth?: string | number;
    className?: string;
  }
  export type Icon = React.ForwardRefExoticComponent<
    React.PropsWithoutRef<LucideProps> & React.RefAttributes<SVGSVGElement>
  >;

  export const Star: Icon;
  export const Clock: Icon;
  export const Search: Icon;
  export const Menu: Icon;
  export const X: Icon;
  export const User: Icon;
  export const ShieldCheck: Icon;
  export const Calendar: Icon;
  export const LogOut: Icon;
  export const ChevronDown: Icon;
  export const Sparkles: Icon;
  export const Heart: Icon;
  export const MapPin: Icon;
  export const ArrowRight: Icon;
  export const ArrowLeft: Icon;
  export const AlertCircle: Icon;
  export const Loader2: Icon;
  export const CheckCircle2: Icon;
  export const CheckCircle: Icon;
  export const ShieldAlert: Icon;
  export const Compass: Icon;
  export const Building: Icon;
  export const Car: Icon;
  export const CalendarCheck: Icon;
  export const Users: Icon;
  export const Plus: Icon;
  export const Trash2: Icon;
  export const TrendingUp: Icon;
  export const RefreshCw: Icon;
  export const Shield: Icon;
  export const Snowflake: Icon;
  export const Fuel: Icon;
  export const Hotel: Icon;
  export const Check: Icon;
  export const BookOpen: Icon;
  export const Mail: Icon;
  export const Phone: Icon;
  export const Send: Icon;
  export const MessageCircle: Icon;
  export const Tag: Icon;
  export const HeartHandshake: Icon;

  const icons: { [key: string]: Icon };
  export default icons;
}
