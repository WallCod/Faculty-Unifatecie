## Desenvolvimento JAVA com uma classe TestaPerformance. 📚📚

---
**Exercícios** 

 - De início, era pra desenvolver um código em JAVA, com uma classe para a inserção de 30 mil números em uma ArrayList.


  - Depois de desenvolvido o programa, tivemos que fazer pesquisas, alterando os valores entre 30 mil a 200 mil, para verificar o tempo gasto por cada um do arrays exigidos para implementação separadamente, indentificando assim qual deles apresentará a melhor performance. 

  ---



### Sobre o código primário

---

**Importação das Classes Necessárias:**

Importamos ArrayList, HashSet e Collection da biblioteca Java.

**Definição da Classe** TestaPerformance:

Criamos a classe TestaPerformance com o método main.

**Testando a Performance do ArrayList:**

Criamos uma coleção ArrayList e usamos System.currentTimeMillis() para capturar o tempo de início.

Usamos um loop for para adicionar 30 mil números à lista.

Capturamos o tempo de fim e calculamos o tempo gasto.

Imprimimos o tempo gasto para inserir 30 mil números no ArrayList.

**Testando a Performance do HashSet:**

Criamos uma coleção HashSet e usamos System.currentTimeMillis() para capturar o tempo de início.

Usamos um loop for para adicionar 30 mil números ao conjunto.

Capturamos o tempo de fim e calculamos o tempo gasto.

Imprimimos o tempo gasto para inserir 30 mil números no HashSet.

---

### Sobre o código secundário

---

**Definição dos Tamanhos:**

**Código Primário:** Testa apenas com um tamanho fixo de 30 mil números.

**Código Secundário:** Introduz um array tamanhos com múltiplos valores de tamanho (50 mil, 100 mil, 150 mil, 200 mil) para testes variados.

**Loop para Testes de Tamanhos Múltiplos:**

**Código Primário:** Não possui loop, apenas insere 30 mil números.

**Código Secundário:** Adiciona um loop for para iterar sobre os diferentes tamanhos definidos no array tamanhos.

**Inserção de Elementos:**

**Código Primário:** Insere exatamente 30 mil números tanto no ArrayList quanto no HashSet.

**Código Secundário:** Insere números conforme o valor atual do tamanho definido pelo loop, permitindo testes com 50 mil, 100 mil, 150 mil e 200 mil números.

**Mensuração do Tempo:**

**Código Primário:** Medição do tempo é fixa para 30 mil números.

**Código Secundário:** Medição do tempo é variável e ajustada conforme o tamanho atual da iteração no loop.

**Output Dinâmico:**

**Código Primário:** Saída fixa para 30 mil números.

**Código Secundário:** Saída dinamicamente ajustada para refletir o número atual de inserções em cada iteração.

Essas mudanças permite que meçamos o tempo de inserção de diferentes quantidades de elementos nos ArrayList e HashSet, proporcionando uma visão mais completa da performance dessas estruturas de dados para diferentes volumes de dados.

---


### Resultados dos Testes:

**ArrayList<>():**

Tempo gasto para inserir 50.000 números: 4ms

Tempo gasto para inserir 100.000 números: 2ms

Tempo gasto para inserir 150.000 números: 3ms

Tempo gasto para inserir 200.000 números: 1ms

**HashSet<>():**

Tempo gasto para inserir 50.000 números: 5ms

Tempo gasto para inserir 100.000 números: 9ms

Tempo gasto para inserir 150.000 números: 10ms

Tempo gasto para inserir 200.000 números: 12ms

**Análise:**

O **ArrayList<>()** apresentou a melhor performance nos testes para todos os tamanhos de inserções, com o menor tempo sendo 1ms para 200.000 elementos.

O **HashSet<>()** teve tempos ligeiramente mais altos em comparação com o ArrayList<>(), com o melhor tempo sendo 5ms para 50.000 elementos.

---

#### Tabela Preenchida

![logo Tabela](./img/tabela.jpeg)


