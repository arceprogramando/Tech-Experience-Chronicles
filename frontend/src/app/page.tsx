import Link from 'next/link';
import { ReactElement } from 'react';

export default function Home(): ReactElement {
  return (
    <>
      <section className="flex flex-col items-center text-center py-12">
        <h2 className="text-4xl font-bold">Plataforma de Pruebas Técnicas</h2>
        <p className="text-gray-500 mt-4">
          Descubre, comparte y aprende de pruebas técnicas reales
        </p>
      </section>
      <div className="flex justify-center gap-4">
        <Link
          href={'/create-test'}
          className="py-2 px-4 bg-violet text-white rounded-lg"
        >
          Crear Prueba técnica
        </Link>
        <Link
          href={'/technical-tests'}
          className="py-2 px-4 border-2 rounded-lg"
        >
          Explorar más pruebas
        </Link>
      </div>
    </>
  );
}
