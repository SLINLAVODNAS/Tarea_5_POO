Tarea 6 - Patrones Singleton y Repository
Cambios realizados
Se creó la clase LibroRepository para centralizar la gestión de los libros.

Se implementó el patrón Singleton en el repositorio con constructor privado y método getInstance(), asegurando una única instancia en toda la aplicación

LibroService fue modificado para delegar todas las operaciones a través de LibroRepository.getInstance().

Se verificó en la consola que dos llamadas a getInstance() retornan la misma instancia (true).
