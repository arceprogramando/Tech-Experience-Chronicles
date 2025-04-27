import { ReactElement } from 'react';

export default function CreateTest(): ReactElement {
  return (
    <div className="container flex flex-col items-center justify-center gap-4 py-8 text-black">
      <h1 className="text-3xl font-bold">Crear Prueba</h1>
      <p className="text-lg">
        Crea una prueba técnica para compartirla con la comunidad
      </p>
    </div>
  );
}
