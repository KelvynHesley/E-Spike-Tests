// src/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5173/', // Substitua pela URL base da sua API
  timeout: 1000,
  headers: {'Content-Type': 'application/json'},
});

export default instance;
