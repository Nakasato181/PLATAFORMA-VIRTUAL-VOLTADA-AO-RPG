# Explicação Básica do Site - Versão 2.0 (Servidor Local)

Este repositório contém o código para a versão 2.0 do servidor local, onde você pode hospedar o site em sua máquina pessoal usando Node.js.

## Instalações Necessárias

Antes de rodar o projeto, você precisará garantir que as seguintes ferramentas estejam instaladas:

### 1. **Node.js**
   - **O que é?** Node.js é um ambiente de execução JavaScript que permite executar JavaScript no lado do servidor.
   - **Como instalar?**
     - Acesse [Node.js official website](https://nodejs.org/).
     - Baixe e instale a versão LTS (Long Term Support), que é a mais estável.

### 2. **Visual Studio Code**
   - **O que é?** Visual Studio Code (VS Code) é um editor de código-fonte leve, mas poderoso, que oferece diversas funcionalidades úteis para desenvolvedores.
   - **Como instalar?**
     - Acesse [Visual Studio Code website](https://code.visualstudio.com/).
     - Baixe e instale a versão adequada para o seu sistema operacional.

## Passos para Rodar o Projeto

1. **Clone o Repositório**
   - Se você ainda não clonou o repositório, utilize um dos métodos abaixo:

   **Método 1: Usando Git (Recomendado)**
   - Abra o terminal (ou prompt de comando) e execute o comando:

     git clone https://github.com/Nakasato181/PLATAFORMA-VIRTUAL-VOLTADA-AO-RPG.git

   - Isso irá clonar o repositório diretamente para sua máquina.

   **Método 2: Baixar pelo GitHub**
   - Se você não tem o Git instalado, pode simplesmente baixar o código em formato ZIP diretamente do GitHub:
     - Acesse a página do repositório no GitHub: [PLATAFORMA VIRTUAL VOLTADA AO RPG](https://github.com/Nakasato181/PLATAFORMA-VIRTUAL-VOLTADA-AO-RPG)
     - Clique no botão "Code" e selecione "Download ZIP".
     - Extraia o arquivo ZIP em uma pasta de sua escolha

   
**2. Instale as Dependências**

Abra o Node.js no terminal.

**Navegue até a pasta do projeto usando o comando cd (substitua pelo caminho correto da pasta):**

cd /caminho/para/a/pasta/do/projeto

Verifique se o arquivo package.json está presente nessa pasta.

**Execute o comando para instalar as dependências:**

npm install

npm install express socket.io

Isso instalará todas as dependências necessárias listadas no arquivo package.json.

**3. Inicie o Servidor**

Após instalar as dependências:

Certifique-se de estar na pasta do projeto.
**Inicie o servidor com o comando:**
npm start

**O servidor estará rodando localmente e geralmente estará acessível em:**

http://localhost:3000
