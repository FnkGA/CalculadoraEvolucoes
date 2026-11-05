// Funções de cálculo da calculadora (sem usar eval).
// Operadores: + - X /   (X = multiplicação)

const OPERADORES = '+-X/';

export function ehOperador(c) {
  return c !== '' && OPERADORES.includes(c);
}

// Transforma "5X-3+2" em [5, 'X', -3, '+', 2]. Devolve null se estiver incompleta.
function separar(expressao) {
  const tokens = [];
  let atual = '';
  for (const c of expressao) {
    if (ehOperador(c)) {
      if (atual === '') {
        if (c === '-') {
          atual = '-'; // sinal negativo no começo ou depois de outro operador
          continue;
        }
        return null;
      }
      if (atual === '-') return null;
      tokens.push(parseFloat(atual), c);
      atual = '';
    } else {
      atual += c;
    }
  }
  if (atual === '' || atual === '-') return null;
  tokens.push(parseFloat(atual));
  return tokens;
}

// Devolve um número, ou o texto 'Erro'.
export function calcular(expressao) {
  const t = separar(expressao);
  if (!t) return 'Erro';
  if (t.some((x) => typeof x === 'number' && Number.isNaN(x))) return 'Erro';

  // 1ª passada: multiplicação e divisão
  const resto = [t[0]];
  for (let i = 1; i < t.length; i += 2) {
    const op = t[i];
    const n = t[i + 1];
    if (op === 'X') {
      resto.push(resto.pop() * n);
    } else if (op === '/') {
      if (n === 0) return 'Erro';
      resto.push(resto.pop() / n);
    } else {
      resto.push(op, n);
    }
  }

  // 2ª passada: soma e subtração, da esquerda para a direita
  let total = resto[0];
  for (let i = 1; i < resto.length; i += 2) {
    total = resto[i] === '+' ? total + resto[i + 1] : total - resto[i + 1];
  }

  if (!Number.isFinite(total)) return 'Erro';
  return parseFloat(total.toFixed(10)); // evita 0.1 + 0.2 = 0.30000000000000004
}

// Último número digitado (com o sinal, se for um sinal e não uma subtração).
export function ultimoNumero(expressao) {
  let i = expressao.length;
  while (i > 0 && !ehOperador(expressao[i - 1])) i--;
  if (i > 0 && expressao[i - 1] === '-' && (i === 1 || ehOperador(expressao[i - 2]))) {
    i--;
  }
  return { inicio: i, texto: expressao.slice(i) };
}

// Tecla +/-
export function alternarSinal(expressao) {
  const { inicio, texto } = ultimoNumero(expressao);
  if (texto === '' || texto === '-') return expressao;
  const novo = texto.startsWith('-') ? texto.slice(1) : '-' + texto;
  return expressao.slice(0, inicio) + novo;
}

// Tecla %
export function porcentagem(expressao) {
  const { inicio, texto } = ultimoNumero(expressao);
  const n = parseFloat(texto);
  if (Number.isNaN(n)) return expressao;
  return expressao.slice(0, inicio) + String(parseFloat((n / 100).toFixed(10)));
}
