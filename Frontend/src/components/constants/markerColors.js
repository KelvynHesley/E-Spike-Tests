export const MARKER_COLORS = {
    'Crime': '#FF0000', // Vermelho
    'Acidente': '#FFA500', // Laranja
    'Emergência Médica': '#0000FF', // Azul
    'Incêndio': '#FF4500', // Vermelho-alaranjado
    'Desastre Natural': '#800080', // Roxo
    'Tráfego': '#FFFF00', // Amarelo
    'Outros': '#808080' // Cinza
};

export const getMarkerColor = (type) => {
    return MARKER_COLORS[type] || MARKER_COLORS['Outros'];
};