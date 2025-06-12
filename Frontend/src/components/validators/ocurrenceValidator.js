export class OccurrenceValidator {
    validate(occurrenceData, position) {
        const validationErrors = [];

        if (!occurrenceData.description?.trim()) {
            validationErrors.push('Descrição é obrigatória');
        }

        if (!occurrenceData.occurrence_type) {
            validationErrors.push('Tipo de ocorrência é obrigatório');
        }

        if (!position) {
            validationErrors.push('Selecione um local no mapa');
        } else {
            if (typeof position.lat !== 'number' || isNaN(position.lat)) {
                validationErrors.push('Latitude inválida');
            }
            if (typeof position.lng !== 'number' || isNaN(position.lng)) {
                validationErrors.push('Longitude inválida');
            }
        }

        return validationErrors;
    }
}

export default new OccurrenceValidator();