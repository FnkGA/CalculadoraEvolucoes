import { View, StyleSheet } from 'react-native';
import Botao from './Botao';

const LINHAS = [
  { tipo: 'controle', teclas: ['MRC', 'M-', 'M+', 'Raiz', 'OFF'] },
  { tipo: 'numero', teclas: ['AC', 'C', '+/-', '%'] },
  { tipo: 'numero', teclas: ['7', '8', '9', '/'] },
  { tipo: 'numero', teclas: ['4', '5', '6', 'X'] },
  { tipo: 'numero', teclas: ['1', '2', '3', '-'] },
  { tipo: 'numero', teclas: ['0', '.', '=', '+'] },
];

export default function Teclado({ onPress }) {
  return (
    <View style={styles.teclado}>
      {LINHAS.map((linha, i) => (
        <View key={i} style={styles.linha}>
          {linha.teclas.map((tecla) => (
            <Botao
              key={tecla}
              label={tecla}
              tipo={linha.tipo}
              onPress={onPress}
            />
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  teclado: { width: '100%' },
  linha: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
});
