<template>
  <div class="marker-info">
    <div class="marker-header" :style="headerStyle">
      <h3>Informações da Ocorrência</h3>
    </div>
    <div class="marker-content">
      <p><strong>Descrição:</strong> {{ marker.description || 'N/A' }}</p>
      <p><strong>Tipo:</strong> {{ marker.occurrence_type || 'N/A' }}</p>
      <p><strong>Coordenadas:</strong> {{ formatCoordinates(marker.latitude, marker.longitude) }}</p>
      <p><strong>Data e Hora:</strong> {{ formatDateTime(marker.date_time) }}</p>
    </div>
    <button @click="$emit('close')" class="close-button">Fechar</button>
  </div>
</template>

<script>
export default {
  name: 'MarkerInfoPanel',
  props: {
    marker: {
      type: Object,
      required: true
    }
  },
  emits: ['close'],
  data() {
    return {
      markerColors: {
        'Crime': '#FF0000',
        'Acidente': '#FFA500',
        'Emergência Médica': '#0000FF',
        'Incêndio': '#FF4500',
        'Desastre Natural': '#800080',
        'Tráfego': '#FFFF00',
        'Outros': '#808080'
      }
    };
  },
  computed: {
    headerStyle() {
      const color = this.getMarkerColor(this.marker.occurrence_type);
      return {
        backgroundColor: color,
        color: this.getContrastColor(color)
      };
    }
  },
  methods: {
    getMarkerColor(type) {
      return this.markerColors[type] || this.markerColors['Outros'];
    },
    getContrastColor(hex) {
      // Função simplificada para determinar se deve usar texto branco ou preto
      // baseado na cor de fundo
      if (!hex) return '#FFFFFF';

      // Remove o '#' se presente
      hex = hex.replace('#', '');

      // Converte para RGB
      const r = parseInt(hex.substr(0, 2), 16);
      const g = parseInt(hex.substr(2, 2), 16);
      const b = parseInt(hex.substr(4, 2), 16);

      // Calcula o brilho (fórmula YIQ)
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;

      // Retorna branco para cores escuras e preto para cores claras
      return brightness > 128 ? '#000000' : '#FFFFFF';
    },
    formatDateTime(dateString) {
      if (!dateString) return 'N/A';

      try {
        const date = new Date(dateString);
        return date.toLocaleString('pt-BR');
      } catch (e) {
        console.error('Erro ao formatar data:', e);
        return dateString || 'N/A';
      }
    },
    formatCoordinates(lat, lng) {
      if (!lat || !lng) return 'N/A';

      try {
        const latitude = parseFloat(lat);
        const longitude = parseFloat(lng);

        if (isNaN(latitude) || isNaN(longitude)) return 'N/A';

        return `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
      } catch (e) {
        console.error('Erro ao formatar coordenadas:', e);
        return 'N/A';
      }
    }
  }
};
</script>

<style scoped>
.marker-info {
  position: absolute;
  bottom: 120px;
  left: 50%;
  transform: translateX(-50%);
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 300px;
  max-width: 90%;
  z-index: 1000;
  overflow: hidden;
}

.marker-header {
  padding: 10px;
  text-align: center;
}

.marker-header h3 {
  margin: 0;
  font-size: 16px;
}

.marker-content {
  padding: 15px;
}

.marker-content p {
  margin: 8px 0;
  font-size: 14px;
  line-height: 1.4;
}

.close-button {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #e74c3c;
  color: #000000;
  border: none;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
}

.close-button:hover {
  background-color: #c0392b;
}
</style>