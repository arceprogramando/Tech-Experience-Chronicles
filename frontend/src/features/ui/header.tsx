import { JSX } from 'react';
import NavigationMenu from './navigation/navigationmenu';

export default function Header(): JSX.Element {
  return (
    <header className="container mx-auto gap-4 py-2 text-white ">
      <NavigationMenu />
    </header>
  );
}
