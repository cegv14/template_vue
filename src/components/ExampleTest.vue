<template>
  <div>
    <p>{{ message }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Este es el último en el código, pero debería ir al principio
const message = ref('Hola Mundo')

// Este debería ir antes de la declaración de 'message'
</script>
