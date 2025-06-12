import { ref } from 'vue';
import MarkerService from '@/services/markerService';

export function useMarkerManager() {
    const processedPoints = ref([]);
    const selectedMarker = ref(null);

    const fetchMarkers = async () => {
        try {
            console.log('Buscando marcadores...');
            const markers = await MarkerService.getAllMarkers();
            console.log('Markers recebidos do backend:', markers);

            // Garante que todos os marcadores têm as propriedades necessárias
            processedPoints.value = markers.map(marker => ({
                latitude: parseFloat(marker.latitude),
                longitude: parseFloat(marker.longitude),
                description: marker.description || 'Sem descrição',
                id: marker.id || marker._id,
                occurrence_type: marker.occurrence_type,
                date_time: marker.date_time
            }));

            console.log('Pontos processados:', processedPoints.value);
        } catch (error) {
            console.error('Erro ao buscar marcadores:', error);
            throw error;
        }
    };

    const fetchMarkerInfo = async (markerId) => {
        try {
            if (!markerId) {
                throw new Error('ID do marcador está undefined');
            }
            const response = await MarkerService.getMarkerById(markerId);
            selectedMarker.value = response;
        } catch (error) {
            console.error('Erro ao buscar informações do marcador:', error);
            throw error;
        }
    };

    const refreshMarkers = async () => {
        await fetchMarkers();
    };

    return {
        processedPoints,
        selectedMarker,
        fetchMarkers,
        fetchMarkerInfo,
        refreshMarkers
    };
}