import { useState } from 'react';
import {
  FlatList,
  Text,
  View,
  Button,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { limpar, salvar } from '../storage/historico';

export default function HistoricoScreen({ route, navigation }) {
  // a lista vira estado para a tela poder mudar (limpar / excluir)
  const [lista, setLista] = useState(route.params.historico);

  // Evolução 1: apaga tudo, do celular e da tela
  async function aoLimpar() {
    await limpar();
    setLista([]);
  }

  // Evolução 2: remove só uma conta
  async function excluir(id) {
    const nova = lista.filter((item) => item.id !== id); // lista nova, sem mutar o estado
    setLista(nova);
    await salvar(nova);
  }

  // Evolução 3: volta para a Home levando o resultado da conta.
  // "toque" muda a cada toque, para a Home perceber mesmo se o valor for igual.
  function reutilizar(item) {
    navigation.popTo('Home', { valor: item.resultado, toque: Date.now() });
  }

  return (
    <View style={styles.container}>
      <View style={styles.botaoLimpar}>
        <Button title="Limpar histórico" onPress={aoLimpar} />
      </View>
      <FlatList
        style={styles.lista}
        data={lista}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <TouchableOpacity
              style={styles.conta}
              onPress={() => reutilizar(item)}
            >
              <Text style={styles.linha}>
                {item.conta} = {item.resultado}
              </Text>
            </TouchableOpacity>
            <Button
              title="Excluir"
              color="#b00020"
              onPress={() => excluir(item.id)}
            />
          </View>
        )}
        ListEmptyComponent={<Text style={styles.linha}>Nenhuma conta ainda</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#4a0303' },
  lista: { flex: 1 },
  botaoLimpar: { margin: 12 },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 12,
  },
  conta: { flex: 1 },
  linha: { fontSize: 24, padding: 12, color: 'white' },
});
