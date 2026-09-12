import { Libro } from '../models/Libro';

export class LibroService {
  // Lista en memoria con un par de libros iniciales
  private static libros: Libro[] = [
    new Libro('1', 'Cien años de soledad', 'Gabriel García Márquez', 1967),
    new Libro('2', 'Don Quijote de la Mancha', 'Miguel de Cervantes', 1605),
  ];

  // Obtener todos los libros
  public static obtenerLibros(): Libro[] {
    return [...this.libros];
  }

  // Agregar un libro usando la clase Libro
  public static agregarLibro(titulo: string, autor: string, anio: number): Libro {
    const nuevoId = Date.now().toString();
    const nuevoLibro = new Libro(nuevoId, titulo, autor, anio);
    this.libros.push(nuevoLibro);
    return nuevoLibro;
  }

  // Eliminar un libro por id
  public static eliminarLibro(id: string): boolean {
    const indice = this.libros.findIndex(libro => libro.id === id);
    if (indice !== -1) {
      this.libros.splice(indice, 1);
      return true;
    }
    return false;
  }
}