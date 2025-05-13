// src/api/axios.js
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost/longLifeBack/public'
})

export default api