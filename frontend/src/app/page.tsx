import { ReactElement } from 'react';

export default function Home(): ReactElement {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-4xl font-bold">Plataforma de Pruebas Técnicas</h2>
      <p className="text-gray-500">
        Descubre, comparte y aprende de pruebas técnicas reales
      </p>
    </div>
  );
}
