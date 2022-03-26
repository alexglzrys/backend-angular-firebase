### Firebase Cloud Functions
Permite crear funciones las cuales se pueden comunicar con distintos servicios de Firebase y pueden ser invocadas como END POINTS desde una aplicación Front End. 

### Crear proyecto de Firebase Cloud Functions
```
firebase login
firebase init

-- Seleccionar proyecto existente
-- Seleccionar Cloud Functions
```

### Ejecutar proyecto de Firebase Cloud Functions en local
Actualmente Cloud Functions puede probarse de modo gratuito registrando una tarjeta de debito o crédito, si la tasa de peticiones excede lo permitido, Google comenzará a facturarnos. Mas sin embargo, se puede probar de modo local, sin la necesidad de subir las funciones programadas a Cloud Functions
```
cd functions
npm run serve

--- otra opción pero se necesita ejecutar los comandos por separado
tsc -w
firebase serve
```

### Asociar credenciales del proyecto Firebase en el proyecto de desarrollo
- Ir a la consola de Firebase
- Configuración del proyecto
- Cuentas de servicio
- Copiar fragmento de configuración de Admin SDK en el proyecto
- Generar clave privada y descargar el archivo con las credenciales de acceso al proyecto, finalmente colocarlas en el proyecto de desarrollo

### Deploy a Firebase
Esto se hace a nivel de proyecto y no dentro del directorio functions
```
firebase deploy
```

### Instalar paquetes de NodeJS adicionales al proyecto
Podemos instalar casi cualquier cosa de NodeJS sobre un proyecto realizado en Firebase

- Entrar al directorio functions e instalar los paquetes de NodeJS necesarios

```
cd functions
npm i express cors
npm i -D @types/express @types/cors
```

