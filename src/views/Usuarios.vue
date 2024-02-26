<template>
  <div>
    <h1>Lista de Usuarios</h1>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>DUI</th>
          <th>Nombres</th>
          <th>Apellidos</th>
          <th>Fecha de Nacimiento</th>
          <th>Correo</th>
          <th>Teléfono</th>
          <th>Generación</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.dui }}</td>
          <td>{{ user.nombres }}</td>
          <td>{{ user.apellidos }}</td>
          <td>{{ user.fecha_nacimiento }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.telefono }}</td>
          <td>{{ user.generacion.nombre }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      users: []
    };
  },
  mounted() {
    this.fetchUserData();
  },
  methods: {
    async fetchUserData() {
      try {
        const response = await axios.get('http://localhost:8000/api/visitantes/get');
        this.users = response.data;
      } catch (error) {
        console.error('Error al obtener los datos de los usuarios:', error);
      }
    }
  }
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

thead th, tbody td {
  border: 1px solid #ddd;
  padding: 8px;
}

thead th {
  background-color: #f2f2f2;
  text-align: left;
}
</style>
