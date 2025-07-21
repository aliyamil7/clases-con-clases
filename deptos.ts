class Departamento {
  nombre: string;

  constructor(nombre: string) {
    this.nombre = nombre;
  }

  getName() {
    return this.nombre;
  }
}

class Piso {
  nombre: string;
  departamentos: Departamento[];

  constructor(nombre: string, departamentos: Departamento[] = []) {
    this.nombre = nombre;
    this.departamentos = departamentos;
  }

  pushDepartamento(departamento: Departamento) {
    this.departamentos.push(departamento);
  }

  getDepartamentos() {
    return this.departamentos;
  }
}

class Edificio {
  piso: Piso[];

  constructor(piso: Piso[]) {
    this.piso = piso;
  }
  addDepartamentoToPiso(nombreDelPiso: string, departamento: Departamento) {
    let pisoEncontrado = false; // Bandera para verificar si se encontró el piso

    for (let i = 0; i < this.piso.length; i++) {
      if (this.piso[i].nombre === nombreDelPiso) {
        this.piso[i].pushDepartamento(departamento); // Agregar el departamento
        pisoEncontrado = true; // Cambiar la bandera a true
        break; // Salir del bucle
      }
    }

    if (!pisoEncontrado) {
      console.error("Piso no encontrado"); // Mostrar error si no existe
    }
  }
  getDepartamentosByPiso(nombreDelPiso: string): Departamento[] {
    for (let i = 0; i < this.piso.length; i++) {
      if (this.piso[i].nombre === nombreDelPiso) {
        return this.piso[i].getDepartamentos();
      }
    }
    console.error("Piso no encontrado");
    return [];
  }
}

function testClaseEdificio() {
  const unPiso = new Piso("planta baja");
  const otroPiso = new Piso("primer piso");
  const unEdificio = new Edificio([unPiso, otroPiso]);
  const deptoUno = new Departamento("depto uno");
  const deptoDos = new Departamento("depto dos");
  const deptoTres = new Departamento("depto tres");
  unEdificio.addDepartamentoToPiso("planta baja", deptoUno);
  unEdificio.addDepartamentoToPiso("planta baja", deptoDos);
  unEdificio.addDepartamentoToPiso("planta baja", deptoTres);

  const deptos = unEdificio.getDepartamentosByPiso("planta baja");
  const deptosEmpty = unEdificio.getDepartamentosByPiso("primer piso");

  if (
    Array.isArray(deptosEmpty) &&
    deptosEmpty.length == 0 &&
    deptos.length == 3 &&
    deptos[2].getName() == "depto tres"
  ) {
    console.log("testClaseBandaApartment passed okey");
  } else {
    throw "testClaseBandaApartment not passed";
  }
}

function main() {
  testClaseEdificio();
}
main();
