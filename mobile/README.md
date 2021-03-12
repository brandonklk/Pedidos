## Mobile aplicação pedidos mercado

## Forma de executar
- `npm install` e `npm start`

## Tecnologias

- React Native
- Axios
- React Navigation
- React Icons
- Expo
- Formik
- Yup
- Material-UI
- Material-UI Icons

## Instalar o expo no sua máquina
- `npm install --global expo-cli`

## Como rodar

- Realizar o downlod do Node
- Realizar o download do aplicativo `expo` no seu celular
- Rodar `npm install` e `npm start` na pasta raiz
- Um site será aberto e um QR code aparecerá
- Abra o aplicativo baixado e aponte a sua câmera para o QR code
- Nesse momento a aplicação será aberta no seu celular

## Configuração do arquivo `envi.config.tsx`

- O arquivo `envi.config.tsx` é o arquivo responsavel por guardar o ip onde esta configurado o back-end.

- Criar um arquivo na pasta raiz do projeto no mobile chamado `envi.config.tsx` o conteúdo do arquivo ficaram da seguinte forma

```javascript
export default {
    ipBackEnd: process.env.IP_BACK_END ?? 'Numero do ip onde esta o back-end',
}
```