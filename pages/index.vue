<template>
    <div>
      <h2>filtrer les bières</h2>
      <input type="number" v-model.number="priceMax" />
      <button @click="filterBieres()">Filtrer</button>
      <div>
        <h2 v-for="biere in filteredBieres" :key="biere.id">
          <img :src="biere.image" />
          <NuxtLink :to="`/bieres-client/${biere.id}`">{{ biere.name }}</NuxtLink>
          <p>{{biere.price}}</p>
          <button @click="addToFavorites(biere.id)">Ajouter aux favoris</button>
        </h2>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';

  
  
  const route = useRoute();
  const router = useRouter();
  
  const priceMax = ref<number | null>(route.query.pricemax ? parseFloat(route.query.pricemax as string) : null);
  const bieres = ref<any[]>([]);
  const favorites = ref([]);
  
  const fetchBieres = async () => {
    try {
      const response = await fetch('https://api.sampleapis.com/beers/ale');
      const data = await response.json();
      bieres.value = data;
    } catch (error) {
      console.error(error);
    }
  };
  
  const filteredBieres = computed(() => {
    if (priceMax.value) {
      return bieres.value.filter(biere => Number(biere.price.replace('$', '')) <= priceMax.value);
    } else {
      return bieres.value;
    }
  });
  
  const filterBieres = () => {
    const query = { pricemax: priceMax.value?.toString() || '' };
    router.push({ query });
  };
  
  const addToFavorites = (beerId) => {
      if (!favorites.includes(beerId)) {
        favorites.push(beerId)
        $toast.success('Biére ajoutée aux favoris')
      } else {
        this.$toast.warning('Biére déjà dans les favoris')
      }
    }

  onMounted(fetchBieres);
  </script>