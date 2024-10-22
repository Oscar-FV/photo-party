import { Button } from "../../../common/atoms/button/Button";
import Input from "../../../common/atoms/forms/Input"
const LoginPage = () => {
  return <div className="flex flex-col gap-y-3 mt-10">
    <Input placeholder={"Ingresa tu nombre de usuario"}/>
    <Input placeholder={"Ingresa tu contraseña"}/>

    <div className="mt-4 flex flex-col">
        <Button color="primary" width="block"> ¡Que comience la fiesta! </Button>
        <Button color="ghost" width="block" size={"xs"}> ¿Aun no tienes cuenta? ¡Registrate! </Button>
    </div>
  </div>;
};

export default LoginPage;
