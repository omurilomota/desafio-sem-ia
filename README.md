# Quiz de Programação - Sistema Completo

## 🎯 Visão Geral

Sistema de quiz completo com 3 níveis de dificuldade, temporizador, leaderboard e relatório de aprendizagem. Cada nível tem seu próprio arquivo HTML e JavaScript para fácil acesso e personalização.

## 📁 Estrutura de Arquivos

```
desafio-sem-ia/
├── 🎮 **ARQUIVOS PRINCIPAIS**
│   ├── quiz.html              # Versão completa com seleção de dificuldade
│   ├── quiz-facil.html        # Nível fácil (30s por questão)
│   ├── quiz-medio.html        # Nível médio (20s por questão)
│   └── quiz-dificil.html      # Nível difícil (10s por questão)
│
├── 📝 **ARQUIVOS JAVASCRIPT**
│   ├── js/quiz.js            # Versão completa (arquitetura modular)
│   ├── js/quiz-facil.js      # Nível fácil (10 questões básicas)
│   ├── js/quiz-medio.js      # Nível médio (10 questões intermediárias)
│   ├── js/quiz-dificil.js    # Nível difícil (10 questões avançadas)
│   ├── js/questions.js       # Sistema de questões por dificuldade
│   ├── js/leaderboard.js     # Sistema de leaderboard com LocalStorage
│   └── js/learningReport.js  # Sistema de relatório de aprendizagem
│
├── 🎨 **ARQUIVOS CSS**
│   └── css/quiz.css          # Estilos CSS (completo, incluindo modais)
│
└── 📚 **DOCUMENTAÇÃO**
    ├── IMPLEMENTACAO.md      # Documentação da implementação completa
    └── README.md             # Este arquivo
```

## 🎮 Como Usar

### 🎯 **Opção 1: Versão Completa (Recomendada)**
Abra [`quiz.html`](quiz.html) para acessar a versão completa com:
- Seleção de dificuldade na mesma página
- Leaderboard integrado
- Estatísticas gerais
- Relatório de aprendizagem detalhado

### 📱 **Opção 2: Arquivos Separados por Nível**
- **Nível Fácil**: [`quiz-facil.html`](quiz-facil.html) - 30s por questão, questões básicas
- **Nível Médio**: [`quiz-medio.html`](quiz-medio.html) - 20s por questão, questões intermediárias
- **Nível Difícil**: [`quiz-dificil.html`](quiz-dificil.html) - 10s por questão, questões avançadas

### 🚪 **Botão de Sair**
Cada nível de dificuldade tem um botão "Sair do Desafio" no header que permite:
- Retornar ao menu principal
- Confirmar saída antes de sair
- Manter a experiência de navegação limpa

## ✨ Funcionalidades

### ⏰ **Temporizador Inteligente**
- **Fácil**: 30 segundos por questão
- **Médio**: 20 segundos por questão
- **Difícil**: 10 segundos por questão
- Cores dinâmicas (verde → laranja → vermelho)
- Efeitos visuais de urgência

### 🔒 **Controle de Acesso**
- Opções bloqueadas até iniciar o temporizador
- Feedback visual com opacidade reduzida
- Impede respostas antes do início oficial

### 📊 **Leaderboard com LocalStorage**
- Persistência de dados entre sessões
- Pontuações separadas por nível de dificuldade
- Top 10 melhores pontuações
- Filtros interativos por dificuldade

### 🎓 **Relatório de Aprendizagem**
- Análise por categoria (HTML, CSS, JavaScript)
- Recomendações personalizadas de estudo
- Análise de tempo e eficiência
- Feedback visual com cores e indicadores

### 🎵 **Efeitos Sonoros**
- Sons diferentes para acertos, erros, tempo e início
- Gerados com Web Audio API (sem arquivos externos)
- Compatível com navegadores modernos

### ✅ **Visual de Acertos e Erros**
- Feedback imediato com cores e animações
- Fundo verde para respostas corretas, vermelho para erradas
- Efeito de piscar e mudança de cor na pergunta
- Explicação destacada com bordas coloridas

## 🧠 Sistema de Questões

### **Nível Fácil (10 questões)**
- Conceitos básicos de HTML, CSS e JavaScript
- Perguntas diretas e objetivas
- Ideal para iniciantes

### **Nível Médio (10 questões)**
- Conceitos intermediários e aplicação prática
- Perguntas com maior complexidade
- Ideal para consolidar conhecimentos

### **Nível Difícil (10 questões)**
- Conceitos avançados e profundos
- Perguntas sobre nuances e detalhes
- Ideal para dominar o conteúdo

## 🏆 Sistema de Leaderboard

Cada nível tem seu próprio leaderboard salvo no LocalStorage:
- `quiz-leaderboard-facil` - Pontuações do nível fácil
- `quiz-leaderboard-medio` - Pontuações do nível médio
- `quiz-leaderboard-dificil` - Pontuações do nível difícil

## 📈 Relatório de Aprendizagem

O relatório inclui:
- **Análise de Desempenho**: Por categoria (HTML, CSS, JavaScript)
- **Recomendações Personalizadas**: Baseadas nos erros cometidos
- **Análise de Tempo**: Eficiência e performance
- **Feedback Visual**: Com cores e indicadores de nível de domínio

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Semântica e acessibilidade
- **CSS3**: Animações, gradientes, Grid, Flexbox
- **JavaScript ES6+**: Classes, módulos, arrow functions
- **Web Audio API**: Efeitos sonoros programáticos
- **LocalStorage**: Persistência de dados sem banco de dados

## 🎯 Resultado Final

O sistema oferece uma experiência completa de aprendizagem com:
- ✅ 3 níveis de dificuldade independentes
- ✅ Temporizadores configuráveis
- ✅ Leaderboard com persistência
- ✅ Relatórios de aprendizagem detalhados
- ✅ Interface responsiva e moderna
- ✅ Sistema totalmente funcional e testado

## 🚀 Próximos Passos

Para expandir o sistema, você pode:
1. Adicionar mais categorias de questões
2. Implementar sistema de login
3. Criar questões aleatórias
4. Adicionar sistema de conquistas
5. Integrar com APIs externas

---

**Desenvolvido sem IA** - Todo o código foi criado manualmente com boas práticas de programação! 🎉