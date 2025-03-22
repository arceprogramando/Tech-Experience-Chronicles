import { JSX } from 'react';
import Link from 'next/link';

export interface Links {
  url: string;
  title: string;
}

const linksData: Links[] = [
  { url: '/', title: 'HomePage' },
  { url: '/login', title: 'Login' },
];

export default function Header(): JSX.Element {
  return (
    <header className="text-white p-4">
      <nav aria-label="Menú de navegación">
        <ul className="flex gap-4">
          {linksData.map(
            (link): JSX.Element => (
              <li key={link.url}>
                <Link href={link.url} className="hover:underline">
                  {link.title}
                </Link>
              </li>
            )
          )}
        </ul>
      </nav>
    </header>
  );
}
