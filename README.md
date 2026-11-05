# ExpoCalc

Calculadora em React Native (Expo SDK 54) usada na aula de Desenvolvimento de dispositivos móveis (Fatec ADS).
Esta versão é o resultado final da aula: componentes, histórico com FlatList, persistência com AsyncStorage e navegação entre duas telas.

## Como rodar

```bash
npm install
npx expo start
```

Abra no Expo Go (SDK 54) ou aperte `a` para o emulador Android.

## Estrutura

```text
App.js                      navegação (Home e Historico)
src/
  components/
    Botao.js                botão reutilizável (props: label, onPress, tipo)
    Display.js              painel com expressão, resultado e indicador de memória
    Teclado.js              teclas geradas a partir de um array com .map()
  screens/
    HomeScreen.js           calculadora, estado e histórico
    HistoricoScreen.js      lista de contas com FlatList
  storage/
    historico.js            salvar e carregar com AsyncStorage
  utils/
    calcular.js             cálculo da expressão (sem eval)
```

## Pacotes da aula

Instalados com as versões do SDK 54:
`@react-navigation/native`, `@react-navigation/native-stack`, `react-native-screens`,
`react-native-safe-area-context` e `@react-native-async-storage/async-storage`.
