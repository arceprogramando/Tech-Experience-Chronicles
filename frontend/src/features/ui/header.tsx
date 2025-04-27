import { ReactElement } from 'react';
import NavigationMenu from './navigation/navigationmenu';
import Link from 'next/link';

export default function Header(): ReactElement {
  return (
    <header className="container flex items-center justify-between gap-4 py-2 text-black">
      <div className="flex items-center gap-8">
        <h1 className="font-bold text-2xl">
          <Link href="/">
            <span className="text-violet-500">Tech </span>Tests
          </Link>
        </h1>
        <Link href="/technical-tests" className="text-base font-medium">
          Explorar
        </Link>
      </div>
      <NavigationMenu />
    </header>
  );
}
