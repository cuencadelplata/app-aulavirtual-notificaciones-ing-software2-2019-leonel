import { Notificacion } from "../src/Notificacion";
import { Usuario } from "../src/Usuario";
import { expect } from "chai";
import moment = require("moment");
import { Grupo } from "../src/Grupo";

describe("Notificacion", () => {
  it("Test Constructor Grupo", () => {
    let usuario = new Usuario("Schleicher", 41038330);
    let usuario1 = new Usuario("Augusto", 41038330);
    let usuario2 = new Usuario("Cristian", 41038330);
    let usuario3 = new Usuario("Agustin", 41038330);
    let fecha1 = moment("2016-01-01");
    let notificacion1 = new Notificacion(
      "Esta es un título1.",
      "Esto es una descripción1.",
      1111,
      fecha1,
      "lolo"
    );
    usuario.agregarNotificacion(notificacion1);
    let list = new Array<Usuario>();
    list.push(usuario1);
    list.push(usuario2);
    list.push(usuario3);
    let grupo = new Grupo(notificacion1, list);
    expect(grupo).not.null;
  });

  it("Test enviar mensaje desde grupo", () => {
    let usuario = new Usuario("Schleicher", 41038330);
    let usuario1 = new Usuario("Augusto", 41038330);
    let usuario2 = new Usuario("Cristian", 41038330);
    let usuario3 = new Usuario("Agustin", 41038330);
    let fecha1 = moment("2016-01-01");
    let notificacion1 = new Notificacion(
      "Esta es un título1.",
      "Esto es una descripción1.",
      1111,
      fecha1,
      "lolo"
    );
    usuario.agregarNotificacion(notificacion1);
    let list = new Array<Usuario>();
    list.push(usuario1);
    list.push(usuario2);
    list.push(usuario3);
    let grupo = new Grupo(notificacion1, list);
    grupo.enviarMensaje("Hola mundo!");

    expect(grupo.getMensajes()[0]).to.equal("Hola mundo!");
  });
});
