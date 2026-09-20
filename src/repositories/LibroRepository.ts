import { Libro } from '../models/Libro';

export class LibroRepository {
  private static instancia: LibroRepository;

  private libros: Libro[] = [
    new Libro('1', 'Cien años de soledad', 'Gabriel García Márquez', 1967),
    new Libro('2', 'Don Quijote de la Mancha', 'Miguel de Cervantes', 1605),
    new Libro('3', 'El principito', 'Antoine de Saint-Exupéry', 1943),
  ];

  private constructor() {}


  public static getInstance(): LibroRepository {
    if (!LibroRepository.instancia) {
      LibroRepository.instancia = new LibroRepository();
    }
    return LibroRepository.instancia;
  }

  public obtenerLibros(): Libro[] {
    return [...this.libros];
  }

  public agregarLibro(libro: Libro): void {
    this.libros.push(libro);
  }

  public eliminarLibro(id: string): void {
    this.libros = this.libros.filter((libro) => libro.id !== id);
  }
}