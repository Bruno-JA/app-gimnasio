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
- Se dispondrá en todo momento de un desplegable con múltiples herramientas para ayudar con el entrenamiento (***volumen total levantado, One Rep Max, etc***). Estas herramientas se pueden incorporar en el seguimiento diario para añadir datos adicionales.
#### Portal educativo
- El usuario dispondrá de una barra de búsqueda y un desplegable con secciones para encontrar los ejercicios que busca.
- El usuario podrá guardar ejercicios en  favoritos, permitiendo acceder a ellos directamente tanto en el perfil como desde la sección ***favoritos*** del portal educativo.
- Dentro de un ejercicio, el usuario podrá leer la información de este y acceder a contenido multimedia como imágenes y vídeos.
### No funcionales
- La aplicación debe ser funcional en cualquier navegador web moderno.
- Se debe poder ejecutar tanto en escritorio como en dispositivos móviles.
- Se debe emplear un **SGBD** (sistema Gestor de Base de Datos) para almacenar los datos.
- La interfaz de usuario debe ser moderna e intuitiva para el usuario.
- Los cambios realizados y las transiciones entre ventanas deben realizarse en tiempo real.
***
## Estudio del arte
Se han dividido las soluciones existentes para cada característica que presentará la aplicación.
### Registro y seguimiento de entrenamientos
#### Strong Workout Tracker Gym Log
[Página web oficial](https://www.strong.app)
[Uso de la aplicación](https://www.youtube.com/watch?v=nSxliX45qF0)

Enfocada en el análisis del progreso a lo largo del tiempo, la aplicación **Strong** permite visualizar estadísticas detalladas sobre cargas, repeticiones y rendimiento en los entrenamientos de fuerza.

La aplicación cuenta con opciones como:
- especificar los días de entrenamiento y de descanso.
- acceso a un historial con todos los entrenamientos realizados.
- rutinas personalizadas de entrenamientos.
- Un apartado con herramientas de medición.
- Un apartado donde ver y añadir ejercicios a la rutina.

Las funcionalidades, gráficos y reportes que ofrece Strong son una base importante para poder desarrollar una herramienta que permita a los usuarios evaluar su evolución deportiva de manera clara y precisa. 
### Portal educativo
#### Nike Training Club
[Página web oficial](https://www.nike.com/es/ntc-app)
[Tour de la aplicación](https://www.youtube.com/watch?v=n4LjN4NYBZ8)
Esta aplicación proporciona entrenamientos guiados y material educativo sobre técnicas de entrenamiento y prevención de lesiones. Cuenta con un amplio catálogo de entrenamientos, tanto para ganar músculo, yoga, ejercicios de respiración, etc.

La aplicación también cuenta con un buscador y categorías dependiendo del tipo de entrenamiento que se quiera realizar.

Denetro de los ejercicios se muestran datos como el tiempo, la dificultad, si se requiere de equipo, etc. También incluye un vídeo en el que se explica el ejercicio al detalle y su ejecución, así como precauciones previas.

El acceso a contenido educativo relevante para el usuario permite una mejora en las técnicas y el conocimiento deportivo, haciendo así que los entrenamientos sean más efectivos y el progreso mejore.

Bibliografía:
- https://www.strong.app/
- https://www.youtube.com/watch?v=nSxliX45qF0
- https://www.nike.com/es/ntc-app
- https://www.youtube.com/watch?v=n4LjN4NYBZ8
## Justificación de viabilidad
A continuación se muestran las distintas características a cumplir para garantizar la viabilidad de la aplicación. 
### Viabilidad Técnica
#### Lenguajes y frameworks
- React para desarrollar una experiencia rápida y atractiva para los usuarios, permitiendo una fácil escalabilidad y modificación para cambios futuros.
- Javascript trabajará en conjunto con React para el desarrollo de la lógica y la comunicación con APIs externas, permitiendo desarrollar las características funcionales de la aplicación y acceder a recursos externos disponibles.
### Backend y base de datos
- PHP permitirá la comunicación con la base de datos, es un lenguaje muy robusto para manejar tanto los datos locales en el navegador como los de la base de datos.
- NodeJS permitirá poder aplicar toda lógica de javascript desde el servicio de hosting.
- MySQL, al igual que PHP, es un lenguaje muy estable y fiable, se encargará de almacenar datos del usuario y otros recursos.
#### Almacenamiento y hosting
- Tanto para el despliegue de la aplicación como el hosting se emplearan los servicios AWS (*Amazon Web Service*) gracias al servicio **CodeDeploy** para el despliegue rápido de aplicaciones y al de alojamiento de sitios web de AWS.
#### Otras herramientas y servicios
- Dentro de la aplicación, se emplearán APIs externas como la de **CalorieNinja** para el valor nutricional de alimentos.
### Viabilidad económica

Para logotipos, diseños, tipografías y otros medios artísticos se emplearán recursos gratuitos y de uso libre, mientras que el logo será diseñado por el mismo desarrollador.

La aplicación contaría con contenido educativo proporcionado por medios públicos y la propia comunidad, por lo que no se añade un gasto en esa sección. Está abierta la posibilidad de invertir en contenido de mayor calidad en un futuro.

Al emplearse herramientas open-source como React, PHP y MySQL, se reducen los costes necesarios en licencias de software. Sin embargo, el despliegue y hosting va a mano de AWS, que añade un coste a la hora de mantener la aplicación disponible para los usuarios. Si que es verdad que AWS cuenta con pruebas gratuitas que se podrían emplear, pero limitarían el tráfico web y rendimiento de la aplicación. 

El mantenimiento de la aplicación correría a cuenta del desarrollador, asegurando actualizaciones periódicas de seguridad y optimización. En caso de que el proyecto siga creciendo, se abriría la posibilidad a la comunidad de ayudar en el mantenimiento y mejora del proyecto.

Inicialmente, la aplicación no tiene un objetivo comercial, ya que sería gratuita, pero si fuera necesario se añadirían opciones de pago con un modelo de suscripción en un futuro, así como el almacenamiento y posterior venta de información de navegación del usuario (*siempre con su consentimiento y solo se registrará y venderán datos anónimos de uso*).

### Viabilidad operativa
Aunque existen aplicaciones con un enfoque similar, no existe ninguna que:
- Disponga de todas las características en una misma plataforma.
- Den al usuario una amplia variedad de opciones y flexibilidad.
- Se enfoque en una gran variedad de disciplinar deportivas y la posibilidad de combinarlas.

Ademas, la aplicación contaría con una buena recepción y éxito ya que:

- El mercado se encuentra saturado con aplicaciones de deporte y ninguna cuenta con una herramienta robusta que de un enfoque general para muchas disciplinas deportivas.
- Todas las aplicaciones te obligan a tener una cuenta creada y activa para poder emplearla.
- Muchas de estas aplicaciones se encuentran limitadas o son prácticamente inútiles si no dispones de una suscripción de pago activa.

Por ello, considero que dentro del mercado la aplicación sería bien recibida, ya que es más fácil y cómodo tener todo lo necesario para el entrenamiento en una misma plataforma centralizada.