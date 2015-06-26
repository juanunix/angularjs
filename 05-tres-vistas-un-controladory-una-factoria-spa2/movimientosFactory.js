(function () {
    // Las factorías, y los servicios, son funciones estándar
    // Una gran diferencia con los controladores es que son singleton
    // Eso los convierte en un buen lugar para compartir datos
    var movimientosFactory =   function ()  {
        // el array de movimientos y el total lo mantiene la factoría
        // de esta forma sobrevive a las recargas de controladores
        var movimientos = [];
        // Normalmente estos datos se persisten en servidores remotos
        // o al menos se almacenan en el browser
        var total = {
            ingresos: 0,
            gastos: 0
        };
        // las factorias siempre devuelven objetos, para eso son fábricas
		// en este caso le llamo result
        // Estos objetos pueden contener funciones de lógica reutilizables     
        var result  =   {};
       
        result.getMovimientos =   function ()  {
            return movimientos;
        };
        result.getTotal =   function ()  {
            return total;
        };
        result.postMovimiento =   function (movimiento)  {
            movimientos.push(movimiento);
            total.ingresos += movimiento.esIngreso * movimiento.importe;
            total.gastos += movimiento.esGasto * movimiento.importe;
        };
        
        result.balance = function () {
            return total.ingresos - total.gastos
        }
        result.tipo = function (movimiento) {
            return movimiento.esIngreso && 'Ingreso' || 'Gasto'
        }
        
        // Exponemos funcionalidad devolviendo el objeto creado,
        // para que el cliente explote sus métodos 
        return result;
    };   
    // se registran dentro de un módulo con la palabra clave factory
    angular.module('controlCajaApp').factory('movimientosFactory', movimientosFactory);
}());
