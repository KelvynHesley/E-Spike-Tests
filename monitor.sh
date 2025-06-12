#!/bin/bash

# --- Configuração ---
BASE_URL="http://localhost:5174"
TEST_USER_EMAIL="monitor@test.com"
TEST_USER_PASSWORD="uma_senha_segura_123"
TOKEN=""

# --- Cores para o Output ---
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# --- Função de Teste Corrigida ---
run_test() {
    local TEST_NAME=$1
    local METHOD=$2
    local ENDPOINT=$3
    
    printf "${YELLOW}%-40s${NC}" "$TEST_NAME"

    # Usa um array para construir os argumentos do cURL de forma segura
    local CURL_ARGS=(
        "-s"
        "-o" "/dev/null"
        "-w" "%{http_code} %{time_total}"
        "-X" "$METHOD"
        "-H" "Content-Type: application/json"
    )

    # Adiciona o cabeçalho de autenticação ao array APENAS se o token existir
    if [ ! -z "$TOKEN" ]; then
        CURL_ARGS+=("-H" "Authorization: Bearer $TOKEN")
    fi

    # Executa o cURL passando os argumentos do array de forma segura
    local RESPONSE=$(curl "${CURL_ARGS[@]}" "$BASE_URL$ENDPOINT")
    
    local HTTP_CODE=$(echo "$RESPONSE" | awk '{print $1}')
    local TIME_TOTAL=$(echo "$RESPONSE" | awk '{print $2}')

    if [[ "$HTTP_CODE" -ge 200 && "$HTTP_CODE" -lt 300 ]]; then
        printf "${GREEN}SUCESSO${NC} (Código: ${HTTP_CODE}, Tempo: ${TIME_TOTAL}s)\n"
    else
        printf "${RED}FALHA${NC}   (Código: ${HTTP_CODE}, Tempo: ${TIME_TOTAL}s)\n"
    fi
}

echo "--- Iniciando Testes de Monitoramento de Endpoints Críticos ---"

run_test "Saúde Geral da API" "GET" "/health"

echo "--- Autenticação e Obtenção de Token ---"
LOGIN_PAYLOAD="{\"email\":\"$TEST_USER_EMAIL\",\"password\":\"$TEST_USER_PASSWORD\"}"
LOGIN_RESPONSE=$(curl -s -X POST -H "Content-Type: application/json" -d "$LOGIN_PAYLOAD" "$BASE_URL/auth/login")

if [[ $(echo "$LOGIN_RESPONSE" | grep "token") ]]; then
    TOKEN=$(echo "$LOGIN_RESPONSE" | sed -e 's/.*"token":"\([^"]*\)".*/\1/')
    echo -e "${GREEN}Token de autenticação obtido com sucesso.${NC}"
else
    echo -e "${RED}Falha ao obter token de autenticação. Verifique as credenciais do usuário de teste.${NC}"
    exit 1
fi

echo "--- Testes de Endpoints Protegidos ---"
run_test "Leitura de Marcadores" "GET" "/api/markers"
run_test "Leitura de Alertas" "GET" "/api/alerts"
run_test "Leitura de Ocorrências" "GET" "/api/occurrences"

echo "--- Testes de Monitoramento Concluídos ---"