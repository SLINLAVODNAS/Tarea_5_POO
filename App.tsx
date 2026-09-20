import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Libro } from './src/models/Libro';
import { LibroService } from './src/services/LibroService';
import { LibroRepository } from './src/repositories/LibroRepository';

export default function App() {
  // Comprobación del patrón Singleton al iniciar la app
  useEffect(() => {
    const repo1 = LibroRepository.getInstance();
    const repo2 = LibroRepository.getInstance();

    console.log('PRUEBA PATRÓN SINGLETON');
    console.log('Instancia 1:', repo1);
    console.log('Instancia 2:', repo2);
    console.log('¿Ambas llamadas retornan la misma instancia?:', repo1 === repo2);
    console.log('-------------------------------');
  }, []);

  // Estado local para los libros y los campos del formulario
  const [libros, setLibros] = useState<Libro[]>(LibroService.obtenerLibros());
  const [titulo, setTitulo] = useState<string>('');
  const [autor, setAutor] = useState<string>('');
  const [anio, setAnio] = useState<string>('');

  const handleAgregar = () => {
    if (!titulo.trim() || !autor.trim() || !anio.trim()) {
      Alert.alert('Error', 'Todos los campos son obligatorios.');
      return;
    }

    const anioNumero = parseInt(anio, 10);
    if (isNaN(anioNumero) || anioNumero <= 0) {
      Alert.alert('Error', 'Ingrese un año válido.');
      return;
    }

    LibroService.agregarLibro(titulo.trim(), autor.trim(), anioNumero);
    setLibros(LibroService.obtenerLibros());

    setTitulo('');
    setAutor('');
    setAnio('');
  };

  const handleEliminar = (id: string) => {
    LibroService.eliminarLibro(id);
    setLibros(LibroService.obtenerLibros());
  };

  const renderItem = ({ item }: { item: Libro }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.titulo}</Text>
        <Text style={styles.cardDetail}>{item.obtenerDetalleCompleto()}</Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleEliminar(item.id)}
      >
        <Text style={styles.deleteButtonText}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.mainTitle}>Mis Libros</Text>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Título del libro"
          value={titulo}
          onChangeText={setTitulo}
        />
        <TextInput
          style={styles.input}
          placeholder="Autor"
          value={autor}
          onChangeText={setAutor}
        />
        <TextInput
          style={styles.input}
          placeholder="Año de publicación"
          value={anio}
          onChangeText={setAnio}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAgregar}>
          <Text style={styles.addButtonText}>Agregar Libro</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={libros}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No hay libros registrados.</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  mainTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 20,
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    fontSize: 15,
    backgroundColor: '#F9FAFB',
  },
  addButton: {
    backgroundColor: '#2563EB',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  listContainer: {
    paddingBottom: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  cardContent: {
    flex: 1,
    marginRight: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  cardDetail: {
    fontSize: 14,
    color: '#4B5563',
  },
  deleteButton: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    color: '#6B7280',
    marginTop: 30,
    fontSize: 15,
  },
});