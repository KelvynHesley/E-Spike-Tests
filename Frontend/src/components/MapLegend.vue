<template>
  <div class="map-legend" v-if="isVisible">
    <div class="legend-header">
      <h4>Legenda</h4>
      <button class="close-btn" @click="closeLegend">&times;</button>
    </div>
    <div class="legend-items">
      <div
          v-for="(color, type) in markerColors"
          :key="type"
          class="legend-item"
      >
        <div
            class="color-marker"
            :style="{ backgroundColor: color }"
        ></div>
        <span>{{ type }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MapLegend',
  data() {
    return {
      isVisible: true,
      markerColors: {
        'Crime': '#FF0000',
        'Ponto perigoso': '#FFA500',
        'Sua localizacao': '#009ad1'
      }
    };
  },
  methods: {
    closeLegend() {
      this.isVisible = false;
    }
  }
};
</script>

<style scoped>
.map-legend {
  position: absolute;
  bottom: 120px;
  right: 10px;
  background-color: #ffffff;
  padding: 12px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 900;
  max-width: 240px;
  font-family: 'Arial', sans-serif;
  transition: opacity 0.3s ease-out;
}

.legend-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 8px;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 8px;
  background-color: #f7f7f7;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

h4 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.close-btn {
  background: transparent;
  border: none;
  color: #666;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: color 0.2s ease;
}

.close-btn:hover {
  color: #000;
}

.legend-items {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.legend-item {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #555;
}

.color-marker {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  margin-right: 10px;
  border: 1px solid #ccc;
}
</style>
