<template>
  <div>
    <h1>Registro de Usuario</h1>
    <form @submit.prevent="registerUser" class="user-registration-form">
      <label for="nombre">Nombre:</label>
      <input type="text" id="nombre" v-model="formData.nombres" required>
      
      <label for="apellidos">Apellidos:</label>
      <input type="text" id="apellidos" v-model="formData.apellidos" required>
      
      <label for="dui">DUI:</label>
      <input type="text" id="dui" v-model="formData.dui" required>

      <label for="email">Correo:</label>
      <input type="text" id="email" v-model="formData.email" required>
      
      <label for="fecha_nacimiento">Fecha de Nacimiento:</label>
      <input type="date" id="fecha_nacimiento" v-model="formData.fecha_nacimiento" required placeholder="24/12/1995">
      
      <label for="telefono">Teléfono:</label>
      <input type="tel" id="telefono" v-model="formData.telefono" required>
      
      <button type="submit">Registrar</button>
    </form>
    <p v-if="registrationMessage" class="registration-message">{{ registrationMessage }}</p>
    <div v-if="showAlert" class="success-alert">{{ registrationMessage }}</div>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      formData: {
        dui: '',
        nombres: '',
        apellidos: '',
        fecha_nacimiento: '',
        telefono: '',
        email: ''
      },
      registrationMessage: '',
      showAlert: false

    };
  },
  methods: {
    async registerUser() {
      try {
        const response = await axios.post('http://localhost:8000/api/visitantes/store', this.formData);
        this.registrationMessage = 'Usuario registrado con exito!';
        this.showAlert = true; // Mostrar la alerta
        setTimeout(() => {
          this.registrationMessage = ''; 
          this.showAlert = false; // Ocultar la alerta después de 2 segundos
        }, 2000);
        
        this.clearForm();
      } catch (error) {
        console.error('Error al registrar el usuario:', error);
        this.registrationMessage = 'Error al registrar el usuario';
      }

    },
    clearForm() {
      // Reiniciar los valores del formulario
      this.formData.dui = '';
      this.formData.nombres = '';
      this.formData.apellidos = '';
      this.formData.fecha_nacimiento = '';
      this.formData.telefono = '';
      this.formData.email = '';

    }
  }
};
</script>

<style scoped>
.user-registration-form {
  max-width: 400px;
  margin: 0 auto;
}

.user-registration-form label {
  display: block;
  margin-bottom: 0.5rem;
}

.user-registration-form input {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
}

.user-registration-form button {
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
}

.user-registration-form button:hover {
  background-color: #0056b3;
}

.registration-message {
  margin-top: 1rem;
  color: #fff;
  font-style: italic;
}

.success-alert {
  margin-top: 1rem;
  padding: 0.5rem;
  background-color: #4caf50;
  color: white;
  text-align: center;
}
</style>
