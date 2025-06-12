#!/bin/bash
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

echo "Iniciando verificação de saúde da infraestrutura..."

# 1. Verificar Frontend na porta 5173
echo -n "Verificando Frontend (localhost:5173)... "
if curl -s --head http://localhost:5173 | grep "200 OK" > /dev/null; then
  echo -e "${GREEN}OK${NC}"
else
  echo -e "${RED}FALHOU${NC}"; exit 1;
fi

# 2. Verificar Backend na porta 5174
echo -n "Verificando Backend e conexão com DB (localhost:5174/health)... "
HEALTH_STATUS=$(curl -s http://localhost:5174/health | grep '"database":"connected"')
if [ -n "$HEALTH_STATUS" ]; then
  echo -e "${GREEN}OK${NC}"
else
  echo -e "${RED}FALHOU${NC}";
  echo "Resposta do backend: $(curl -s http://localhost:5174/health)"
  exit 1;
fi

echo -e "\n${GREEN}Todos os serviços estão operacionais! ✔${NC}"
exit 0