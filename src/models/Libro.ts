export class Libro {
  
  private _id: string;
  private _titulo: string;
  private _autor: string;
  private _anio: number;

constructor(id: string, titulo: string, autor: string, anio: number) {
    this._id = id;
    this._titulo = titulo;
    this._autor = autor;
    this._anio = anio;
  }

  public get id(): string {
    return this._id;
  }

  public get titulo(): string {
    return this._titulo;
  }

  public get autor(): string {
    return this._autor;
  }

  public get anio(): number {
    return this._anio;
  }

  public set titulo(titulo: string) {
    if (titulo.trim().length > 0) {
      this._titulo = titulo;
    }
  }

  public set autor(autor: string) {
    if (autor.trim().length > 0) {
      this._autor = autor;
    }
  }

  public set anio(anio: number) {
    if (anio > 0) {
      this._anio = anio;
    }
  }

  public obtenerDetalleCompleto(): string {
    return `"${this._titulo}" por ${this._autor} (${this._anio})`;
  }
}