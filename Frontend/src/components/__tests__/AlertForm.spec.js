import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import AlertForm from '../AlertForm.vue'; // Ajuste o caminho se necessário

// Mock da constante importada
vi.mock('../constants/severityLevels.js', () => ({
  SEVERITY_LEVELS: [
    { value: 'low', label: 'Baixo' },
    { value: 'medium', label: 'Médio' },
    { value: 'high', label: 'Alto' },
  ],
}));

// Mock do Vue Router
const mockRouter = {
  push: vi.fn(),
};

// Mock da API de Geolocalização
const mockGeolocation = {
  getCurrentPosition: vi.fn(),
};

// Configura o mock no objeto global antes de cada teste
beforeEach(() => {
  // Limpa chamadas anteriores dos mocks
  mockRouter.push.mockClear();
  mockGeolocation.getCurrentPosition.mockClear();
  
  // Define o mock da geolocalização no objeto 'navigator' global
  Object.defineProperty(global.navigator, 'geolocation', {
    value: mockGeolocation,
    configurable: true,
  });
});

describe('AlertForm.vue', () => {
  // Função auxiliar para montar o componente com props e mocks padrão
  const mountComponent = (props = {}) => {
    return mount(AlertForm, {
      props: {
        alertData: {},
        userId: 'user-123',
        isSubmitting: false,
        ...props,
      },
      global: {
        mocks: {
          $router: mockRouter, // Injete o mock do router
        },
      },
    });
  };

  it('renderiza o formulário corretamente', () => {
    const wrapper = mountComponent();
    expect(wrapper.find('h3').text()).toBe('Crie um Alerta');
    expect(wrapper.find('#alert_message').exists()).toBe(true);
    expect(wrapper.find('#severity_level').exists()).toBe(true);
    expect(wrapper.find('#alert_radius').exists()).toBe(true);
    expect(wrapper.find('button[type="submit"]').text()).toBe('Enviar Alerta');
  });

  it('emite o evento "submit" com os dados corretos ao submeter o formulário', async () => {
    // Simula uma resposta de sucesso da geolocalização
    const mockPosition = {
      coords: { latitude: -23.55, longitude: -46.63 },
    };
    mockGeolocation.getCurrentPosition.mockImplementationOnce((success) => success(mockPosition));

    const wrapper = mountComponent();

    // Simula o preenchimento do formulário
    await wrapper.find('#alert_message').setValue('Assalto na avenida principal');
    await wrapper.find('#severity_level').setValue('high');
    await wrapper.find('#alert_radius').setValue('500');

    // Simula o envio
    await wrapper.find('form').trigger('submit');

    // Verifica se o evento 'submit' foi emitido
    expect(wrapper.emitted()).toHaveProperty('submit');

    // Verifica se o payload do evento contém os dados corretos
    const submittedData = wrapper.emitted('submit')[0][0];
    expect(submittedData.alert_message).toBe('Assalto na avenida principal');
    expect(submittedData.severity_level).toBe('high');
    expect(submittedData.alert_radius).toBe(500);
    expect(submittedData.latitude).toBe(-23.55);
    expect(submittedData.longitude).toBe(-46.63);
    expect(submittedData.user_id).toBe('user-123');

    // Verifica se o evento 'close' e a navegação ocorreram
    expect(wrapper.emitted()).toHaveProperty('close');
    expect(mockRouter.push).toHaveBeenCalledWith('/Mapa');
  });

  it('exibe o estado de "Enviando..." quando a prop isSubmitting é true', () => {
    const wrapper = mountComponent({ isSubmitting: true });
    const submitButton = wrapper.find('button[type="submit"]');
    
    expect(submitButton.text()).toBe('Enviando...');
    expect(submitButton.attributes('disabled')).toBeDefined();
  });

  it('emite o evento "close" e navega ao clicar no botão Fechar', async () => {
    const wrapper = mountComponent();
    
    // Encontra o botão "Fechar" (evitando o de submit)
    await wrapper.find('button.bg-gray-500').trigger('click');

    expect(wrapper.emitted()).toHaveProperty('close');
    expect(mockRouter.push).toHaveBeenCalledWith('/Mapa');
  });
});