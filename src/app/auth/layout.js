import Link from "next/link";
import Image from "next/image";

export default function AuthLayout({ children }) {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] h-[100svh] justify-center p-5">
      <div className="flex flex-col justify-center items-center w-full">
        <Image
          src="/logo.png"
          width={150}
          height={150}
          alt="photo-party logo"
        />
        <div className="flex flex-col gap-y-2 -mt-5">
          <h3 className="text-4xl text-center">Bienvenido a</h3>
          <h1 className="text-5xl text-center font-semibold text-primary-500">
            Photo Party
          </h1>
          <p className="text-center text-lg">
            Cumple divertidos retos en tu fiesta y captura los momentos más
            icónicos. 📸💃
          </p>
        </div>
      </div>
    </div>
    // <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
    //     <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
    //         <div className="mb-6 text-center">
    //             <h1 className="text-2xl font-semibold">MyApp</h1>
    //             <p className="text-sm text-gray-500">Inicia sesión o regístrate</p>
    //         </div>
    //         {children}
    //     </div>
    //     <footer className="mt-6 text-sm text-gray-500">
    //         <p>
    //             ¿No tienes una cuenta?{' '}
    //             <Link href="/auth/register" className="text-blue-500">
    //                 Regístrate aquí
    //             </Link>
    //         </p>
    //     </footer>
    // </div>
  );
}
