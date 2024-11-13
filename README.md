# Carbon Credits na Blockchain - Integridade e Rastreabilidade nas Compensações

Este projeto implementa um sistema de compensação de créditos de carbono na blockchain, garantindo a integridade e a rastreabilidade dos créditos. Ele utiliza contratos inteligentes para criar e transferir créditos de carbono, que são representados como tokens fungíveis. Além disso, um sistema de validação com oráculos permite marcar créditos como "usados" para evitar duplicação e reutilização de créditos.

## Índice

- [Motivação](#motivação)
- [Arquitetura do Projeto](#arquitetura-do-projeto)
- [Instalação e Configuração](#instalação-e-configuração)

## Motivação

Este projeto ilustra como a blockchain pode fornecer uma camada de confiança e transparência para sistemas de compensação de carbono, permitindo que empresas, governos e ONGs realizem transações seguras e rastreáveis de créditos de carbono.

## Arquitetura do Projeto

- **CarbonCreditToken**: Representa os créditos de carbono como tokens fungíveis usando o padrão ERC-20. Este contrato é responsável pelo gerenciamento do saldo inicial de créditos.
- **CarbonCreditRegistry**: Registra e gerencia os créditos de carbono, incluindo a criação, transferência e marcação de créditos como "usados".
- **MockOracle**: Simula um oráculo que pode validar créditos, marcando-os como "usados" de acordo com certas condições. Neste projeto, o oráculo é um endereço confiável que pode validar créditos.

## Instalação e Configuração

1. **Clone o Repositório**
    ```bash
    git clone https://github.com/seuusuario/carbon-credits-blockchain.git
    cd carbon-credits-blockchain
2. **Instale as dependências**
    ```bash
    npm install

    #Caso tenha erros nos próximos passos, talvez seja necessário rodar as dependências uma a uma:
    npm install @openzeppelin/contracts @chainlink/contracts
    npm install --save-dev hardhat
    npm install @nomicfoundation/hardhat-toolbox
3. **Compile**
    ```bash
    npx hardhat compile
4. **Inicie a Rede**
    ```bash
    npx hardhat node
5. **Empregue os Contratos**
    ```bash
    npx hardhat run scripts/deploy.js
6. **Interaja com os Contratos (em outro console)**
    ```bash
    npx hardhat console
