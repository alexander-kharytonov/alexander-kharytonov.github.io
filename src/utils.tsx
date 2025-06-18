export const NAVIGATION = [
  { title: 'Home', href: '/' },
  { title: 'Experience', href: '/experience' },
  { title: 'Skills', href: '/skills' },
  { title: 'Contact', href: '/contact' },
];

export function getInitials(name: string): string {
  if (!name) return '';
  return name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0].toUpperCase())
    .join('');
}
