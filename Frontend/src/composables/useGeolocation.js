export function useGeolocation() {
    const getUserPosition = () => {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocalização não é suportada pelo seu navegador.'));
                return;
            }

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                },
                (error) => {
                    let errorMessage = 'Erro ao obter localização.';
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            errorMessage = 'Permissão de localização negada.';
                            break;
                        case error.POSITION_UNAVAILABLE:
                            errorMessage = 'Informação de localização indisponível.';
                            break;
                        case error.TIMEOUT:
                            errorMessage = 'Tempo esgotado ao obter localização.';
                            break;
                    }
                    reject(new Error(errorMessage));
                }
            );
        });
    };

    return {
        getUserPosition
    };
}