En esta fase, el alumnado debe profundizar en los aspectos técnicos y conceptuales del proyecto mediante:
## Requisitos funcionales y no funcionales
> Identificar y detallar las funcionalidades de la aplicación (requisitos funcionales) y las características de calidad (requisitos no funcionales).

### Funcionales
#### General
- El usuario puede elegir utilizar la aplicación con o sin registrar una cuenta. En caso de no tener una, toda la información se guardará en la caché del navegador y no en la base de datos.
#### Perfil
- El usuario podrá añadir información personal, la cual se mostrará en su perfil y, algunos datos (peso, altura, etc), se podrán emplear para la presentación y los cálculos dentro del seguimiento atlético. Algunas opciones estarán limitadas dependiendo de si el usuario tiene o no una cuenta de usuario.
#### Configuración
- Se podrán realizar varios cambios tanto estéticos como funcionales dentro de la sección de configuración.
#### Seguimiento
- El usuario podrá crear el registro de sus entrenamientos desde la página de inicio seleccionando el día en el que ha entrenado en el calendario de entrenamiento.
- Se podrá crear un nuevo registro de entrenamiento desde cualquier parte de la aplicación web mediate un botón. Al pulsarlo, dará la opción de registrar el día actual o seleccionar otro distinto.
- Dentro del día a registrar, el usuario deberá elegir entre las plantillas de entrenamiento existentes, las que el mismo a creado o crear una nueva. Estas se rellenarán con los datos de los ejercicios realizados.
- Los ejercicios del portal educativo que el usuario haya marcado como favoritos se podrán emplear para el seguimiento, haciendo que sea más fácil especificar que tipo de ejercicio se ha hecho y añadir la información.
#### Herramientas
- Se dispondrá en todo momento de un desplegable con múltiples herramientas para ayudar con el entrenamiento (***IMC, One Rep Max, etc***). Estas herramientas se pueden incorporar en el seguimiento diario para añadir datos adicionales.
#### Portal educativo
- El usuario dispondrá de una barra de búsqueda y un desplegable con secciones para encontrar los ejercicios que busca.
- El usuario podrá guardar ejercicios en  favoritos, permitiendo acceder a ellos directamente tanto en el perfil como desde la sección ***favoritos*** del portal educativo.
- Dentro de un ejercicio, el usuario podrá leer la información de este y acceder a contenido multimedia como imágenes y vídeos.
### No funcionales
- La aplicación debe ser funcional en cualquier navegador web moderno.
- Se debe poder ejecutar tanto en escritorio como en dispositivos móviles.
- Se debe emplear un SGBD (sistema Gestor de Base de Datos) para almacenar los datos.
- La interfaz de usuario debe ser moderna e intuitiva para el usuario.
- Los cambios realizados y las transiciones entre ventanas deben realizarse en tiempo real.