import Link from "next/link";
import { JSX } from "react";
import linksData from "./linksdata";



export default function NavigationMenu(): JSX.Element{
    return (
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
    );
}