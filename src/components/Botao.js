import { TouchableOpacity, Text, StyleSheet } from 'react-native';

// tipo 'controle' = linha de cima (MRC, M-, M+, Raiz, OFF); 'numero' = demais teclas
export default function Botao({ label, onPress, tipo = 'numero' }) {
  const ehControle = tipo === 'controle';

  return (
    <TouchableOpacity
      style={ehControle ? styles.botao : styles.botaoNumeros}
      onPress={() => onPress(label)}
    >
      <Text style={ehControle ? styles.textControle : styles.textNumeros}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const base = {
  backgroundColor: '#f0f0f0',
  borderRadius: 10,
  borderWidth: 3,
  borderColor: 'gray',
  height: 60,
  padding: 10,
  marginTop: 20,
};

const styles = StyleSheet.create({
  botao: { ...base, width: '17%' },
  botaoNumeros: { ...base, width: '22%' },
  textControle: { color: 'black' },
  textNumeros: { fontSize: 24, fontWeight: 'bold', textAlign: 'center' },
});
