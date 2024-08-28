<template>
  <div class="w-[900px] h-[500px] text-white text-center overflow-hidden rounded-3xl bg-gray-900 mt-10 p-5">
    <div>
      <h1 class="text-3xl font-medium mt-12">Погодное приложение</h1>
      <p class="text-2xl font-medium mt-2">Узнать погоду в {{ city == "" ? "вашем городе" : cityName }}</p>
      <input class="mt-7 bg-transparent border-b-2 border-black text-sm outline-none focus:border-b-green-400 mr-4 px-1 py-1" type="text" v-model="city" placeholder="Введите название города">
      <p class="text-red-500">{{ error }}</p>
      <div>
        <p>{{ showTemp }}</p>
        <p>{{ showFeelsLike }}</p>
        <p>{{ showMinTemp }}</p>
        <p>{{ showMaxTemp }}</p>
      </div>
    </div>
    <button @click="getWeather()" v-show="city != '' " class="bg-yellow-300 hover:-translate-y-1 hover:scale-105 transition-all duration-300 ease-in-out rounded-xl mt-5 px-4 py-2">Получить погоду</button>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
  data() {
    return {
      city: "",
      error: "",
      info: null
    };
  },
  computed: {
    cityName() {
      return "«" + this.city + "»";
    },
    showTemp() {
      return this.info ? "Температура: " + this.info.temp : "";
    },
    showFeelsLike() {
      return this.info ? "Ощущается как: " + this.info.feels_like : "";
    },
    showMinTemp() {
      return this.info ? "Минимальная температура: " + this.info.temp_min : "";
    },
    showMaxTemp() {
      return this.info ? "Максимальная температура: " + this.info.temp_max : "";
    },
  },
  methods: {
    getWeather() {
      if (this.city.trim().length < 2) {
        this.error = "Нужно название более одного символа :)";
        return false;
      }

      this.error = "";

      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&appid=3d9de74844d28377e81415151cbe6a66`)
        .then(res => {
          this.info = res.data.main; // Сохраняем только данные о погоде
        })
        .catch(error => {
          this.error = "Произошла ошибка при получении данных о погоде.";
          console.error(error);
        });
    }
  }
  };
</script>

<style scoped>
/* Ваши стили */
</style>
