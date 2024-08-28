import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import './assets/main.css'

createApp(App).mount('#app')

axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&appid=3d9de74844d28377e81415151cbe6a66`)
  .then(res => {
    this.info = res.data.main; // сохраняем только основные данные о погоде
  })
  .catch(error => {
    this.error = "Произошла ошибка при получении данных о погоде.";
    console.error(error);
  });
