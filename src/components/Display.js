import { View, Text, StyleSheet } from 'react-native';

export default function Display({ expressao, resultado, memoria }) {
  return (
    <View style={styles.painel}>
      <Text style={styles.memoria}>{memoria !== 0 ? 'M' : ' '}</Text>
      <Text style={styles.expressao}>{expressao || '0'}</Text>
      <Text style={styles.resultado}>{resultado}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  painel: {
    width: '100%',
    alignItems: 'flex-end',
    backgroundColor: 'lightgray',
    borderWidth: 2,
    borderColor: 'black',
    padding: 10,
    marginBottom: 20,
  },
  memoria: { fontSize: 16, fontWeight: 'bold', color: '#4a0303' },
  expressao: { fontSize: 36, fontWeight: 'bold' },
  resultado: { fontSize: 24, color: '#444444', minHeight: 30 },
});
