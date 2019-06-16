import { Notificacion } from '../src/Notificacion';
import { Usuario } from '../src/Usuario';
import { expect } from 'chai';
import moment = require("moment");
import { Canal } from '../src/Canal';

describe('Usuario', () => {
 
    it('Test Constructor Usuario', () => {
    
        let usuario = new Usuario('Agustín Aguirre Ruíz Díaz',41038330);

        expect(usuario.getNombre()).to.equal("Agustín Aguirre Ruíz Díaz");

        expect(usuario.getDni()).to.equal(41038330);


    }); 
    it('Test Agregar Notificacion Usuario', () => {
    
        let usuario = new Usuario('Agustín Aguirre Ruíz Díaz',41038330);
        var fecha = moment('2016-01-01');
        let notificacion = new Notificacion('','',123,fecha,'');

        expect(usuario.getNotificaciones().length).to.equal(0);

        usuario.agregarNotificacion(notificacion);

        expect(usuario.getNotificaciones().length).to.equal(1);
        
        


    }); 

    it('Test Eliminar por ID', () => {
        
        let usuario = new Usuario('Agustín Aguirre Ruíz Díaz',41038330);
        var fecha1 = moment('2016-01-01');
        var fecha2 = moment('2016-02-02');
        var fecha3 = moment('2016-03-03')
        let notificacion1 = new Notificacion('Esta es un título1.','Esto es una descripción1.',123,fecha1,'Agustín Aguirre Ruíz Díaz.');
        let notificacion3 = new Notificacion('Esta es un título3.','Esto es una descripción3.',191919,fecha1,'Julio Cesar Blanco.');
        let notificacion2 = new Notificacion('Esta es un título2.','Esto es una descripción2.',456,fecha2,'Nombre de Remitente2.');
        let notificacion4 = new Notificacion('Esta es un título4.','Esto es una descripción4.',191911,fecha3,'Julio Cesar Blanco.');
        let notificacion5 = new Notificacion('Esta es un título5.','Esto es una descripción5.',789,fecha1,'Julio Cesar Blanco.');
        

        usuario.agregarNotificacion(notificacion1);        
        usuario.agregarNotificacion(notificacion2);
        usuario.agregarNotificacion(notificacion3);
        usuario.agregarNotificacion(notificacion4);
        usuario.agregarNotificacion(notificacion5);

        expect(usuario.getNotificaciones().length).to.equal(5);
        expect(usuario.getNotificaciones()[3].getId()).to.equal(191911);
        usuario.eliminar(191911);
        expect(usuario.getNotificaciones().length).to.equal(4);
        expect(usuario.getNotificaciones()[3].getId()).to.not.equal(191911);
    });

    it("Subscribir usuario a un canal", () => {
        let usuario = new Usuario("Persona 1", 32232323);
        let canal = new Canal();

        usuario.subscribirse(canal);

        expect(canal.getUsuarios().length).to.equal(1);
    });

    
    it("Subscribir usuario a un canal", () => {
        let usuario = new Usuario("Persona 1", 32232323);
        let canal = new Canal();

        usuario.subscribirse(canal);

        expect(canal.getUsuarios().length).to.equal(1);

        usuario.desubscribirse(canal);

        expect(canal.getUsuarios().length).to.equal(0);
    });
});


describe('Usuario > Mostrar Notificaciones', () => {

    it('Test Mostrar 0 Notificaciones', () => {

        let usuario = new Usuario('Agustín Aguirre Ruíz Díaz', 41038330);
        expect(usuario.mostrar([])).to.equal('Sin Datos');
    });

    it('Test Mostrar 1 Notificacion', () => {

        let usuario = new Usuario('Agustín Aguirre Ruíz Díaz', 41038330);
        let n1 = new Notificacion('Esta es un título1.', 'Esto es una descripción1.', 1111, moment('2016-01-01'), 'Agustín Aguirre Ruíz Díaz.');
       
        let esperado = `1) ${n1.getTitulo()} por ${n1.getRemitente()}`;
        expect(usuario.mostrar([n1])).to.equal('1) Esta es un título1. por Agustín Aguirre Ruíz Díaz.');
    });

    it('Test Mostrar 2 Notificaciones', () => {

        let usuario = new Usuario('Agustín Aguirre Ruíz Díaz', 41038330);
        let n1 = new Notificacion('Esta es un título1.', 'Esto es una descripción1.', 1111, moment('2016-01-01'), 'Agustín Aguirre Ruíz Díaz.');
        let n2 = new Notificacion('Esta es un título2.', 'Esto es una descripción2.', 2222, moment('2016-01-01'), 'Jose A.');

        let esperado = `1) ${n1.getTitulo()} por ${n1.getRemitente()}\n2) ${n2.getTitulo()} por ${n2.getRemitente()}`;
        expect(usuario.mostrar([n1, n2])).to.equal(esperado);
    });
});


 describe('Usuario > Filtrar Notificaciones', () => {

    
    it('Filtrar por Fecha', () => {

        let usuario = new Usuario('Agustín Aguirre Ruíz Díaz', 41038330);
        var fecha1 = moment('2016-01-01');
        var fecha2 = moment('2016-02-02');
        let notificacion1 = new Notificacion('Esta es un título1.', 'Esto es una descripción1.', 1111, fecha1, 'Agustín Aguirre Ruíz Díaz.');
        let notificacion2 = new Notificacion('Esta es un título3.', 'Esto es una descripción3.', 2222, fecha1, 'Julio Cesar Blanco.');
        let notificacion3 = new Notificacion('Esta es un título2.', 'Esto es una descripción2.', 3333, fecha2, 'Jose A.');



        usuario.agregarNotificacion(notificacion1);
        usuario.agregarNotificacion(notificacion2);
        usuario.agregarNotificacion(notificacion3);

        expect(usuario.filtrarFecha(usuario.getNotificaciones(), '2016-01-01').length).to.equal(2);
        // notificaciones id 1111 y id 2222 tienen fecha 2016-01-01
        expect(usuario.filtrarFecha(usuario.getNotificaciones(), '2016-01-01')[0].getId()).to.equal(notificacion1.getId());
        expect(usuario.filtrarFecha(usuario.getNotificaciones(), '2016-01-01')[1].getId()).to.equal(notificacion2.getId());
    });

    it("Filtrar por Fecha sin notificaciones", () => {

        let usuario = new Usuario('Agustín Aguirre Ruíz Díaz', 41038330);

        expect(usuario.filtrarFecha(usuario.getNotificaciones(), '2016-01-01').length).to.equal(0);
    });

    it("Filtrar por fecha sin parametro fecha", () => {
        let usuario = new Usuario('Agustín Aguirre Ruíz Díaz', 41038330);
        var fecha1 = moment('2016-01-01');
        var fecha2 = moment('2016-02-02');
        let notificacion1 = new Notificacion('Esta es un título1.', 'Esto es una descripción1.', 1111, fecha1, 'Agustín Aguirre Ruíz Díaz.');
        let notificacion2 = new Notificacion('Esta es un título3.', 'Esto es una descripción3.', 2222, fecha1, 'Julio Cesar Blanco.');
        let notificacion3 = new Notificacion('Esta es un título2.', 'Esto es una descripción2.', 3333, fecha2, 'Jose A.');

        usuario.agregarNotificacion(notificacion1);
        usuario.agregarNotificacion(notificacion2);
        usuario.agregarNotificacion(notificacion3);

        expect(usuario.filtrarFecha(usuario.getNotificaciones(), "").length).to.equal(0);
        expect(usuario.filtrarFecha(usuario.getNotificaciones(), "").includes(notificacion1)).to.equal(false);
        expect(usuario.filtrarFecha(usuario.getNotificaciones(), "").includes(notificacion2)).to.equal(false);
        expect(usuario.filtrarFecha(usuario.getNotificaciones(), "").includes(notificacion3)).to.equal(false);
    });

     it('Filtrar por visto', () => {

         let usuario = new Usuario('Agustín Aguirre Ruíz Díaz', 41038330);
         var fecha1 = moment('2016-01-01');
         var fecha2 = moment('2016-02-02');
         var fecha3 = moment('2016-03-03')
         let notificacion1 = new Notificacion('Esta es un título1.', 'Esto es una descripción1.', 1111, fecha1, 'Agustín Aguirre Ruíz Díaz.');
         let notificacion2 = new Notificacion('Esta es un título2.', 'Esto es una descripción2.', 2222, fecha2, 'Jose A.');
         let notificacion3 = new Notificacion('Esta es un título3.', 'Esto es una descripción3.', 3333, fecha2, 'Julio Cesar Blanco.');
         let notificacion4 = new Notificacion('Esta es un título4.', 'Esto es una descripción4.', 4444, fecha3, 'Julio Cesar Blanco.');
         let notificacion5 = new Notificacion('Esta es un título5.', 'Esto es una descripción5.', 5555, fecha2, 'Julio Cesar Blanco.');
         let notificacion6 = new Notificacion('Esta es un título6.', 'Esto es una descripción6.', 6666, fecha2, 'Julio Cesar Blanco.');
         

         usuario.agregarNotificacion(notificacion1);
         usuario.agregarNotificacion(notificacion2);
         usuario.agregarNotificacion(notificacion3);
         usuario.agregarNotificacion(notificacion4);
         usuario.agregarNotificacion(notificacion5);
         usuario.agregarNotificacion(notificacion6);
   
         usuario.getNotificaciones()[0].cambiarVisto();
         
         //comprobar que el tamaño del arreglo que devuelve el filtrar por visto sea igual a 1
         expect(usuario.filtrarVisto(usuario.getNotificaciones(),true).length).to.equal(1);
         
         //comprobar que la notificacion que posee el visto igual a true esta incluida en el arreglo que devuelve filtrarVisto
         expect(usuario.filtrarVisto(usuario.getNotificaciones(),true).includes(notificacion1)).to.equal(true);
        
         
     });

     it('Filtrar por visto sin notificaciones', () => {

        let usuario = new Usuario('Agustín Aguirre Ruíz Díaz', 41038330);
       
        //comprobar que el tamaño del arreglo que devuelve el filtrar por visto sea igual a 0
        //en el caso de que el usuario no tenga notificaiones
        expect(usuario.filtrarVisto(usuario.getNotificaciones(),true).length).to.equal(0);
     
       
        
    });

    describe('Usuario > Filtrar Notificaciones', () => {
        it('Test Filtrar por Texto sin Texto', () => {
    
            let usuario = new Usuario('Agustín Aguirre Ruíz Díaz', 41038330);
            var fecha = moment('2016-01-01');
            var fecha2 = moment('2016-02-02');
            let notificacion1 = new Notificacion('Esta es un título1.', 'Esto es una descripción1.', 1111, fecha, 'Agustín Aguirre Ruíz Díaz.');
            let notificacion3 = new Notificacion('Esta es un título3.', 'Esto es una descripción3.', 2222, fecha2, 'Agustín Aguirre Ruíz Díaz.');
            let notificacion2 = new Notificacion('Esta es un título2.', 'Esto es una descripción2.', 3333, fecha, 'Julio Cesar Blanco.');
    
            usuario.agregarNotificacion(notificacion1);
            usuario.agregarNotificacion(notificacion2);
            usuario.agregarNotificacion(notificacion3);
            expect(usuario.getNotificaciones().length).to.equal(3);
            expect(usuario.filtrarTexto(usuario.getNotificaciones(),null).length).to.equal(0);
        });
        it('Test Filtrar por Texto con Remitente', () => {
    
           let usuario = new Usuario('Agustín Aguirre Ruíz Díaz', 41038330);
           var fecha = moment('2016-01-01');
    
           let notificacion1 = new Notificacion('Esta es un título1.', 'Esto es una descripción5.', 1111, fecha, 'Agustín Aguirre Ruíz Díaz.');
           let notificacion2 = new Notificacion('Esta es un título1.', 'Esto es una descripción5.', 2222, fecha, 'Agustín Aguirre Ruíz Díaz.');
           let notificacion3 = new Notificacion('Esta es un título3.', 'Esto es una descripción5.', 3333, fecha, 'Julio Cesar Blanco.');
           let notificacion4 = new Notificacion('Esta es un título5.', 'Esto es una descripción5.', 4444, fecha, 'Julio Cesar Blanco.');
           let notificacion5 = new Notificacion('Esta es un título5.', 'Esto es una descripción5.', 5555, fecha, 'Julio Cesar Blanco.');
           usuario.agregarNotificacion(notificacion1);
           usuario.agregarNotificacion(notificacion2);
           usuario.agregarNotificacion(notificacion3);
           usuario.agregarNotificacion(notificacion4);
            usuario.agregarNotificacion(notificacion5);
    
            expect(usuario.getNotificaciones().length).to.equal(5);
    
            //expect(usuario.filtrarTexto(usuario.getNotificaciones(),'Agustín Aguirre Ruíz Díaz.').length).to.equal(2);
            //expect(usuario.filtrarTexto(usuario.getNotificaciones(),'Esta es un título1.').length).to.equal(2);
            expect(usuario.filtrarTexto(usuario.getNotificaciones(),"Julio Cesar Blanco.").length).to.equal(3);
    
           
            
           });
           it('Test Filtrar por Texto con Descripción', () => {
    
            let usuario = new Usuario('Agustín Aguirre Ruíz Díaz', 41038330);
            var fecha = moment('2016-01-01');
    
            let notificacion1 = new Notificacion('Esta es un título1.', 'Esto es una descripción5.', 1111, fecha, 'Agustín Aguirre Ruíz Díaz.');
            let notificacion2 = new Notificacion('Esta es un título1.', 'Esto es una descripción5.', 2222, fecha, 'Agustín Aguirre Ruíz Díaz.');
            let notificacion3 = new Notificacion('Esta es un título3.', 'Esto es una descripción5.', 3333, fecha, 'Julio Cesar Blanco.');
            let notificacion4 = new Notificacion('Esta es un título5.', 'Esto es una descripción5.', 4444, fecha, 'Julio Cesar Blanco.');
            let notificacion5 = new Notificacion('Esta es un título5.', 'Esto es una descripción4.', 5555, fecha, 'Julio Cesar Blanco.');
    
            usuario.agregarNotificacion(notificacion1);
            usuario.agregarNotificacion(notificacion2);
            usuario.agregarNotificacion(notificacion3);
            usuario.agregarNotificacion(notificacion4);
            usuario.agregarNotificacion(notificacion5);
    
            expect(usuario.getNotificaciones().length).to.equal(5);
    
            expect(usuario.filtrarTexto(usuario.getNotificaciones(),'Esto es una descripción5.').length).to.equal(4);    
            
           });
           it('Test Filtrar por Texto con Titulo', () => {
    
            let usuario = new Usuario('Agustín Aguirre Ruíz Díaz', 41038330);
            var fecha = moment('2016-01-01');
    
            let notificacion1 = new Notificacion('Esta es un título1.', 'Esto es una descripción5.', 1111, fecha, 'Agustín Aguirre Ruíz Díaz.');
            let notificacion2 = new Notificacion('Esta es un título1.', 'Esto es una descripción5.', 2222, fecha, 'Agustín Aguirre Ruíz Díaz.');
            let notificacion3 = new Notificacion('Esta es un título3.', 'Esto es una descripción5.', 3333, fecha, 'Julio Cesar Blanco.');
            let notificacion4 = new Notificacion('Esta es un título5.', 'Esto es una descripción5.', 4444, fecha, 'Julio Cesar Blanco.');
            let notificacion5 = new Notificacion('Esta es un título5.', 'Esto es una descripción5.', 5555, fecha, 'Julio Cesar Blanco.');
            usuario.agregarNotificacion(notificacion1);
            usuario.agregarNotificacion(notificacion2);
            usuario.agregarNotificacion(notificacion3);
            usuario.agregarNotificacion(notificacion4);
            usuario.agregarNotificacion(notificacion5);
    
            expect(usuario.getNotificaciones().length).to.equal(5);
    
            expect(usuario.filtrarTexto(usuario.getNotificaciones(),'Esta es un título1.').length).to.equal(2);
           
            
           });
        it('Test Filtrar por Texto sin Texto y con un arreglo Vacío', () => {
    
            let usuario = new Usuario('Agustín Aguirre Ruíz Díaz', 41038330);
            
            expect(usuario.getNotificaciones().length).to.equal(0);
            expect(usuario.filtrarTexto(usuario.getNotificaciones(),null).length).to.equal(0);
        });
    });

    it('Filtrar por Fecha, Texto y Visto', () => {

        let usuario = new Usuario('Agustín Aguirre Ruíz Díaz', 41038330);
        let fecha1 =  moment('2016-01-01');
        let fecha2 =  moment('2016-02-01');
        let fecha3 =  moment('2016-03-01');
        let fecha4 =  moment('2016-04-01');

        let notificacion1 = new Notificacion('Esta es un título1.', 'Esto es una descripción1.', 1111, fecha1, 'Jose A.');
        let notificacion2 = new Notificacion('Esta es un título2.', 'Esto es una descripción2.', 2222, fecha1, 'Julio Cesar Blanco.');
        let notificacion3 = new Notificacion('Esta es un título3.', 'Esto es una descripción3.', 3333, fecha2, 'Jose A.');
        let notificacion4 = new Notificacion('Esta es un título4.', 'Esto es una descripción4.', 4444, fecha3, 'Julio Cesar Blanco.');
        let notificacion5 = new Notificacion('Esta es un título5.', 'Esto es una descripción5.', 5555, fecha4, 'Cristian Ricardo Saraceni');



        usuario.agregarNotificacion(notificacion1);
        usuario.agregarNotificacion(notificacion2);
        usuario.agregarNotificacion(notificacion3);
        usuario.agregarNotificacion(notificacion4);
        usuario.agregarNotificacion(notificacion5);

        usuario.getNotificaciones()[0].cambiarVisto();

        expect(usuario.filtrar('2016-01-01','Jose A.', true).length).to.equal(1);
        expect(usuario.filtrar('2016-01-01','Jose A.', true).includes(notificacion1)).to.equal(true);
	expect(usuario.filtrar('2016-01-01','Jose A.', true).includes(notificacion2)).to.equal(false);
	expect(usuario.filtrar('2016-01-01','Jose A.', true).includes(notificacion3)).to.equal(false);
	expect(usuario.filtrar('2016-01-01','Jose A.', true).includes(notificacion4)).to.equal(false);
	expect(usuario.filtrar('2016-01-01','Jose A.', true).includes(notificacion5)).to.equal(false);
    });

    it('Filtrar por Fecha sin texto y sin visto', () => {

        let usuario = new Usuario('Agustín Aguirre Ruíz Díaz', 41038330);
        let fecha1 =  moment('2016-01-01');
        let fecha2 =  moment('2016-02-01');
        let fecha3 =  moment('2016-03-01');
        let fecha4 =  moment('2016-04-01');

        let notificacion1 = new Notificacion('Esta es un título1.', 'Esto es una descripción1.', 1111, fecha1, 'Jose A.');
        let notificacion2 = new Notificacion('Esta es un título2.', 'Esto es una descripción2.', 2222, fecha1, 'Julio Cesar Blanco.');
        let notificacion3 = new Notificacion('Esta es un título3.', 'Esto es una descripción3.', 3333, fecha2, 'Jose A.');
        let notificacion4 = new Notificacion('Esta es un título4.', 'Esto es una descripción4.', 4444, fecha3, 'Julio Cesar Blanco.');
        let notificacion5 = new Notificacion('Esta es un título5.', 'Esto es una descripción5.', 5555, fecha4, 'Cristian Ricardo Saraceni');



        usuario.agregarNotificacion(notificacion1);
        usuario.agregarNotificacion(notificacion2);
        usuario.agregarNotificacion(notificacion3);
        usuario.agregarNotificacion(notificacion4);
        usuario.agregarNotificacion(notificacion5);


        expect(usuario.filtrar('2016-01-01').length).to.equal(2);
        expect(usuario.filtrar('2016-01-01').includes(notificacion1)).to.equal(true);
	expect(usuario.filtrar('2016-01-01').includes(notificacion2)).to.equal(true);
	expect(usuario.filtrar('2016-01-01').includes(notificacion3)).to.equal(false);
	expect(usuario.filtrar('2016-01-01').includes(notificacion4)).to.equal(false);
	expect(usuario.filtrar('2016-01-01').includes(notificacion5)).to.equal(false);
    });

    it('Filtrar por Texto sin fecha y sin visto', () => {

        let usuario = new Usuario('Agustín Aguirre Ruíz Díaz', 41038330);
        let fecha1 =  moment('2016-01-01');
        let fecha2 =  moment('2016-02-01');
        let fecha3 =  moment('2016-03-01');
        let fecha4 =  moment('2016-04-01');

        let notificacion1 = new Notificacion('Esta es un título1.', 'Esto es una descripción1.', 1111, fecha1, 'Jose A.');
        let notificacion2 = new Notificacion('Esta es un título2.', 'Esto es una descripción2.', 2222, fecha1, 'Julio Cesar Blanco.');
        let notificacion3 = new Notificacion('Esta es un título3.', 'Esto es una descripción3.', 3333, fecha2, 'Jose A.');
        let notificacion4 = new Notificacion('Esta es un título4.', 'Esto es una descripción4.', 4444, fecha3, 'Julio Cesar Blanco.');
        let notificacion5 = new Notificacion('Esta es un título5.', 'Esto es una descripción5.', 5555, fecha4, 'Cristian Ricardo Saraceni');



        usuario.agregarNotificacion(notificacion1);
        usuario.agregarNotificacion(notificacion2);
        usuario.agregarNotificacion(notificacion3);
        usuario.agregarNotificacion(notificacion4);
        usuario.agregarNotificacion(notificacion5);

        usuario.getNotificaciones()[0].cambiarVisto();

        expect(usuario.filtrar(undefined, 'Jose A.').length).to.equal(2);
        expect(usuario.filtrar(undefined,'Jose A.').includes(notificacion1)).to.equal(true);
	expect(usuario.filtrar(undefined,'Jose A.').includes(notificacion2)).to.equal(false);
	expect(usuario.filtrar(undefined,'Jose A.').includes(notificacion3)).to.equal(true);
	expect(usuario.filtrar(undefined,'Jose A.').includes(notificacion4)).to.equal(false);
	expect(usuario.filtrar(undefined,'Jose A.').includes(notificacion5)).to.equal(false);
    });

    it('Filtrar por Visto sin fecha y sin texto', () => {

        let usuario = new Usuario('Agustín Aguirre Ruíz Díaz', 41038330);
        let fecha1 =  moment('2016-01-01');
        let fecha2 =  moment('2016-02-01');
        let fecha3 =  moment('2016-03-01');
        let fecha4 =  moment('2016-04-01');

        let notificacion1 = new Notificacion('Esta es un título1.', 'Esto es una descripción1.', 1111, fecha1, 'Jose A.');
        let notificacion2 = new Notificacion('Esta es un título2.', 'Esto es una descripción2.', 2222, fecha1, 'Julio Cesar Blanco.');
        let notificacion3 = new Notificacion('Esta es un título3.', 'Esto es una descripción3.', 3333, fecha2, 'Jose A.');
        let notificacion4 = new Notificacion('Esta es un título4.', 'Esto es una descripción4.', 4444, fecha3, 'Julio Cesar Blanco.');
        let notificacion5 = new Notificacion('Esta es un título5.', 'Esto es una descripción5.', 5555, fecha4, 'Cristian Ricardo Saraceni');



        usuario.agregarNotificacion(notificacion1);
        usuario.agregarNotificacion(notificacion2);
        usuario.agregarNotificacion(notificacion3);
        usuario.agregarNotificacion(notificacion4);
        usuario.agregarNotificacion(notificacion5);

        usuario.getNotificaciones()[0].cambiarVisto();

        expect(usuario.filtrar(undefined,undefined ,true).length).to.equal(1);
        expect(usuario.filtrar(undefined,undefined ,true).includes(notificacion1)).to.equal(true);
	expect(usuario.filtrar(undefined, undefined,true).includes(notificacion2)).to.equal(false);
	expect(usuario.filtrar(undefined, undefined,true).includes(notificacion3)).to.equal(false);
	expect(usuario.filtrar(undefined, undefined,true).includes(notificacion4)).to.equal(false);
	expect(usuario.filtrar(undefined,undefined ,true).includes(notificacion5)).to.equal(false);
    });
    it('Filtrar sin parametros', () => {

        let usuario = new Usuario('Agustín Aguirre Ruíz Díaz', 41038330);
        let fecha1 =  moment('2016-01-01');
        let fecha2 =  moment('2016-02-01');
        let fecha3 =  moment('2016-03-01');
        let fecha4 =  moment('2016-04-01');

        let notificacion1 = new Notificacion('Esta es un título1.', 'Esto es una descripción1.', 1111, fecha1, 'Jose A.');
        let notificacion2 = new Notificacion('Esta es un título2.', 'Esto es una descripción2.', 2222, fecha1, 'Julio Cesar Blanco.');
        let notificacion3 = new Notificacion('Esta es un título3.', 'Esto es una descripción3.', 3333, fecha2, 'Jose A.');
        let notificacion4 = new Notificacion('Esta es un título4.', 'Esto es una descripción4.', 4444, fecha3, 'Julio Cesar Blanco.');
        let notificacion5 = new Notificacion('Esta es un título5.', 'Esto es una descripción5.', 5555, fecha4, 'Cristian Ricardo Saraceni');



        usuario.agregarNotificacion(notificacion1);
        usuario.agregarNotificacion(notificacion2);
        usuario.agregarNotificacion(notificacion3);
        usuario.agregarNotificacion(notificacion4);
        usuario.agregarNotificacion(notificacion5);

        usuario.getNotificaciones()[0].cambiarVisto();

        expect(usuario.filtrar().length).to.equal(5);
        expect(usuario.filtrar().includes(notificacion1)).to.equal(true);
	expect(usuario.filtrar().includes(notificacion2)).to.equal(true);
	expect(usuario.filtrar().includes(notificacion3)).to.equal(true);
	expect(usuario.filtrar().includes(notificacion4)).to.equal(true);
	expect(usuario.filtrar().includes(notificacion5)).to.equal(true);
    });

   
 });

 describe('Usuario > notificaciones', () => {

    it('Marcar todas como no leidas', () => {

        let usuario = new Usuario('Schleicher', 41038330);
        let fecha1 =  moment('2016-01-01');
        let fecha2 =  moment('2016-02-01');
        let fecha3 =  moment('2016-03-01');
        let fecha4 =  moment('2016-04-01');

        let notificacion1 = new Notificacion('Esta es un título1.', 'Esto es una descripción1.', 1111, fecha1, 'lolo');
        let notificacion2 = new Notificacion('Esta es un título2.', 'Esto es una descripción2.', 2222, fecha1, 'Julio Cesar Blanco.');
        let notificacion3 = new Notificacion('Esta es un título3.', 'Esto es una descripción3.', 3333, fecha2, 'cris');
        let notificacion4 = new Notificacion('Esta es un título4.', 'Esto es una descripción4.', 4444, fecha3, 'agus');
        let notificacion5 = new Notificacion('Esta es un título5.', 'Esto es una descripción5.', 5555, fecha4, 'Cristian Ricardo Saraceni');



        usuario.agregarNotificacion(notificacion1);
        usuario.agregarNotificacion(notificacion2);
        usuario.agregarNotificacion(notificacion3);
        usuario.agregarNotificacion(notificacion4);
        usuario.agregarNotificacion(notificacion5);

        usuario.marcarNoLeidas();
        
        expect(usuario.getNotificaciones()[0].getVisto()).to.equal(false);
        expect(usuario.getNotificaciones()[1].getVisto()).to.equal(false);
        expect(usuario.getNotificaciones()[2].getVisto()).to.equal(false);
        expect(usuario.getNotificaciones()[3].getVisto()).to.equal(false);
        expect(usuario.getNotificaciones()[4].getVisto()).to.equal(false);
        
    
    });

    it('comparte notificacion', () => {

        let usuario = new Usuario('Schleicher', 41038330);
        let usuario1 = new Usuario('Augusto', 41038330);
        let usuario2 = new Usuario('Cristian', 41038330);
        let usuario3 = new Usuario('Agustin', 41038330);
        let fecha1 =  moment('2016-01-01');
        let notificacion1 = new Notificacion('Esta es un título1.', 'Esto es una descripción1.', 1111, fecha1, 'lolo');
        usuario.agregarNotificacion(notificacion1);
        let list = new Array<Usuario>();
        list.push(usuario1);
        list.push(usuario2);
        list.push(usuario3);  
        
    
        usuario.compartirNotif(notificacion1, list);
        
        expect(usuario1.getNotificaciones()[0].getTitulo()).to.equal("Esta es un título1.");
        expect(usuario2.getNotificaciones()[0].getTitulo()).to.equal("Esta es un título1.");
        expect(usuario3.getNotificaciones()[0].getTitulo()).to.equal("Esta es un título1.");

        
    
    });




});