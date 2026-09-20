import { Libro } from '../models/Libro';
import { LibroRepository } from '../repositories/LibroRepository';

export class LibroService {
  private static repository = LibroRepository.getInstance();

  public static obtenerLibros(): Libro[] {
    return this.repository.obtenerLibros();
  }

  public static agregarLibro(titulo: string, autor: string, anio: number): Libro {
    const nuevoId = Date.now().toString();
    const nuevoLibro = new Libro(nuevoId, titulo, autor, anio);
    this.repository.agregarLibro(nuevoLibro);
    return nuevoLibro;
  }

  public static eliminarLibro(id: string): boolean {
    const librosAntes = this.repository.obtenerLibros().length;
    this.repository.eliminarLibro(id);
    const librosDespues = this.repository.obtenerLibros().length;
    return librosAntes !== librosDespues;
  }
}