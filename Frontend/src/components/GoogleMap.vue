<template>
  <div>
    <div ref="mapContainer" :style="{ height: '90vh', width: '95vw' }"></div>
  </div>
</template>

<script>
import { Loader } from '@googlemaps/js-api-loader';

export default {
  name: 'GoogleMap',
  props: {
    apiKey: {
      type: String,
      required: true,
    },
    points: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      map: null,
      markers: [],
      userMarker: null,
    };
  },
  methods: {
    async initializeMap() {
      try {
        const loader = new Loader({
          apiKey: this.apiKey,
          version: 'weekly',
        });

        await loader.load();

        if (!this.$refs.mapContainer) {
          console.error('Elemento do mapa não encontrado.');
          return;
        }

        this.map = new google.maps.Map(this.$refs.mapContainer, {
          center: { lat: -23.5979089, lng: -46.9269129 }, // Local padrão antes de obter a posição
          zoom: 16,
        });

        this.getUserLocation(); // Obtém e adiciona marcador para localização do usuário
        this.updateMarkers(); // Atualiza os outros marcadores
      } catch (error) {
        console.error('Erro ao inicializar o mapa:', error);
      }
    },

    /**
     * Obtém a localização do usuário e adiciona um marcador
     */
    getUserLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          this.map.setCenter(userLocation);

          if (this.userMarker) {
            this.userMarker.setMap(null);
          }

          this.userMarker = new google.maps.Marker({
            position: userLocation,
            map: this.map,
            title: 'Sua localização',
            icon: {
              url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
            },
          });
        }, (error) => {
          console.error('Erro ao obter localização do usuário:', error);
        });
      } else {
        console.error('Geolocalização não suportada no navegador.');
      }
    },

    updateMarkers() {
      this.points.forEach((point) => this.addMarker(point));
    },

    addMarker(point) {
      if (!point.latitude || !point.longitude) return;

      const marker = new google.maps.Marker({
        position: { lat: point.latitude, lng: point.longitude },
        map: this.map,
        title: point.description || 'Marcador',
      });

      marker.addListener('click', () => {
        this.$emit('marker-clicked', point);
      });

      this.markers.push(marker);
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.initializeMap();
    });
  },
};
</script>
