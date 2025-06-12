const AlertService = require('../service/AlertService');
const Alert = require('../model/Alert');

jest.mock('../model/Alert'); // Mocka o model Alert

describe('AlertService.createAlert', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('deve criar um alerta com dados válidos', async () => {
        const mockData = {
            alert_message: 'Roubo na área',
            severity_level: 'alto',
            latitude: -23.5,
            longitude: -46.6
        };

        const mockUserId = 'user123';

        const mockAlertTime = new Date();

        // Mock do método save
        const mockSave = jest.fn().mockResolvedValue({
            _id: 'alert123',
            ...mockData,
            user_id: mockUserId,
            alert_time: mockAlertTime
        });

        // Mock da classe Alert
        Alert.mockImplementation(function () {
            return {
                ...mockData,
                user_id: mockUserId,
                alert_time: mockAlertTime,
                save: mockSave
            };
        });

        const result = await AlertService.createAlert(mockData, mockUserId);

        expect(Alert).toHaveBeenCalledWith({
            ...mockData,
            user_id: mockUserId,
            alert_time: expect.any(Date)
        });

        expect(mockSave).toHaveBeenCalled();
        expect(result).toEqual(expect.objectContaining({
            _id: 'alert123',
            alert_message: mockData.alert_message,
            user_id: mockUserId
        }));
    });

    it('deve lançar erro se dados estiverem incompletos', async () => {
        const invalidData = {
            alert_message: 'Fumaça na área'
            // faltam severity_level, latitude e longitude
        };

        await expect(AlertService.createAlert(invalidData, 'user123'))
            .rejects
            .toThrow('Dados do alerta incompletos');
    });
});
