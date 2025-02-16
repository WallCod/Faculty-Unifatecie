package TestaPerfomance;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Collection;

public class TestaPerfomance {
    public static void main(String[] args) {
        int[] tamanhos = {50000, 100000, 150000, 200000};
        
    for (int tamanho : tamanhos) {
        //testando a perfomance do ArrayList
        Collection<Integer> arrayList = new ArrayList<>();
        long inicioArrayList = System.currentTimeMillis();

        for(int i = 0; i < tamanho; i++) {
            arrayList.add(i);
        }

        long fimArrayList = System.currentTimeMillis();
        long tempoArrayList = fimArrayList - inicioArrayList;
        System.out.println("tempo gasto para inserir " + tamanho + " números no ArrayList " + tempoArrayList + "ms");

        // testando a perfomance do hashset
        Collection<Integer> HashSet = new HashSet<>();
        long inicioHashSet = System.currentTimeMillis();

        for (int i = 0; i < tamanho; i++) {
            HashSet.add(i);
        }

        long fimHashSet = System.currentTimeMillis();
        long tempoHashSet = fimHashSet - inicioHashSet;
        System.out.println("tempo gasto para inserir " + tamanho + " números no HashSet " + tempoHashSet + "ms");
    
    }
  }
}