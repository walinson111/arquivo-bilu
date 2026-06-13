# Arquivo Bilu

## Sobre o projeto

O Arquivo Bilu é um aplicativo mobile desenvolvido com React Native e Expo que reúne informações sobre o universo em uma experiência visual e interativa.

O projeto permite explorar conteúdos relacionados ao Sistema Solar, estrelas, corpos celestes e fenômenos UFO/UAP, oferecendo uma forma simples e acessível de aprender mais sobre astronomia e temas ligados à exploração espacial.

A proposta é centralizar informações que normalmente estão espalhadas por diferentes fontes em uma única aplicação, proporcionando uma navegação intuitiva e uma experiência agradável para estudantes, curiosos e entusiastas do espaço.

## Funcionalidades

Atualmente, o aplicativo oferece:

* Visualização dos planetas do Sistema Solar;
* Consulta de informações detalhadas sobre cada planeta;
* Exploração de diferentes corpos celestes;
* Catálogo de estrelas com informações e curiosidades;
* Seção dedicada a casos e registros de UFOs/UAPs;
* Exibição da Imagem Astronômica do Dia (APOD) por meio da API da NASA;
* Sistema de favoritos para salvar conteúdos de interesse;
* Interface temática inspirada na exploração espacial;
* Navegação intuitiva entre as diferentes seções do aplicativo.

## API utilizada

O projeto utiliza a API pública da NASA para obtenção de imagens e informações astronômicas.

Documentação oficial:

https://api.nasa.gov/

Endpoint utilizado:

https://api.nasa.gov/#apod

## Tecnologias utilizadas

* React Native
* Expo
* TypeScript
* React Navigation
* React Native Reanimated
* Three.js
* React Three Fiber
* Axios
* Async Storage

## Configuração do ambiente

Por questões de segurança, o arquivo `.env` não está incluído neste repositório, pois contém a chave de acesso utilizada para consumir a API da NASA.

Para executar o projeto, crie um arquivo chamado `.env` na raiz do projeto contendo:

```env
EXPO_PUBLIC_NASA_API_KEY=SUA_CHAVE_AQUI
```

A chave utilizada durante o desenvolvimento será disponibilizada separadamente para fins de avaliação.

Também é disponibilizado um arquivo `.env.example` como modelo para configuração do ambiente.

## Como executar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/walinson111/arquivo-bilu.git
```

### 2. Acesse a pasta do projeto

```bash
cd ArquivoBilu
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Inicie o projeto

```bash
npx expo start
```

### 5. Execute no dispositivo

Após iniciar o Expo:

* Pressione `a` para abrir no Android;
* Pressione `w` para abrir na Web;
* Ou escaneie o QR Code utilizando o aplicativo Expo Go no celular.

## Estrutura do projeto

```text
src/
├── components/       # Componentes reutilizáveis (TabBar, SpaceCard)
├── constants/        # Dados estáticos e mapas de imagens/texturas
├── context/          # Contextos globais (Auth, Favoritos)
├── hooks/            # Hooks customizados
├── navigation/       # Navegadores e tipos de rotas
├── screens/          # Telas organizadas por módulo
│   ├── Auth/
│   ├── Favorites/
│   ├── Home/
│   ├── Profile/
│   ├── UFO/
│   └── Universe/
├── services/         # Integrações com APIs externas (NASA, Sistema Solar)
├── theme/            # Cores, fontes e estilos globais compartilhados
└── types/            # Tipos TypeScript globais
```

## Próximos passos

Algumas melhorias planejadas para versões futuras:

* Ampliação do catálogo de corpos celestes;
* Inclusão de novos casos UFO/UAP;
* Banco de dados próprio para armazenamento de conteúdos;
* Sistema de busca por objetos astronômicos;
* Melhorias de desempenho e experiência do usuário;
* Expansão do conteúdo educativo sobre astronomia;
* Disponibilização do aplicativo na Play Store.

## Objetivo do projeto

O Arquivo Bilu foi desenvolvido como um projeto de estudo e portfólio, com foco no aprendizado de desenvolvimento mobile utilizando React Native, consumo de APIs, gerenciamento de navegação, persistência de dados e construção de interfaces modernas e interativas.

Além do aspecto técnico, o projeto busca incentivar a curiosidade e o interesse pela astronomia por meio de uma experiência acessível e visualmente atrativa.

## Autor

Walinson Pereira
