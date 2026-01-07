// Sistema de questões por nível de dificuldade
const quizQuestions = {
    easy: [
        {
            question: "Qual é a tag HTML5 usada para conteúdo de navegação?",
            options: ["nav", "menu", "navigation", "navigate"],
            answer: 0,
            explanation: "A tag <nav> é usada em HTML5 para definir uma seção de navegação.",
            category: "HTML"
        },
        {
            question: "Qual atributo HTML define texto alternativo para imagens?",
            options: ["title", "src", "alt", "description"],
            answer: 2,
            explanation: "O atributo 'alt' fornece texto alternativo para imagens quando não podem ser exibidas.",
            category: "HTML"
        },
        {
            question: "Em HTML, qual elemento é usado para criar uma lista ordenada?",
            options: ["ul", "ol", "li", "list"],
            answer: 1,
            explanation: "A tag <ol> cria uma lista ordenada (numerada), enquanto <ul> cria uma lista não ordenada (com marcadores).",
            category: "HTML"
        },
        {
            question: "Qual propriedade CSS é usada para alterar a cor de fundo de um elemento?",
            options: ["color", "background-color", "bgcolor", "background"],
            answer: 1,
            explanation: "'background-color' define a cor de fundo de um elemento. 'color' altera apenas a cor do texto.",
            category: "CSS"
        },
        {
            question: "Em CSS, qual seletor é usado para aplicar estilos a um elemento com id 'header'?",
            options: [".header", "#header", "*header", "&header"],
            answer: 1,
            explanation: "O seletor '#' é usado para elementos com id específico, enquanto '.' é usado para classes.",
            category: "CSS"
        },
        {
            question: "Qual propriedade CSS controla o espaço entre o conteúdo de um elemento e sua borda?",
            options: ["margin", "border", "spacing", "padding"],
            answer: 3,
            explanation: "'padding' controla o espaço interno, enquanto 'margin' controla o espaço externo do elemento.",
            category: "CSS"
        },
        {
            question: "Qual valor de 'display' faz um elemento se comportar como bloco, mas em linha?",
            options: ["block", "inline", "inline-block", "flex"],
            answer: 2,
            explanation: "'inline-block' permite que elementos tenham largura e altura definidas (como block), mas fiquem em linha (como inline).",
            category: "CSS"
        },
        {
            question: "Qual método JavaScript é usado para remover o último elemento de um array?",
            options: ["shift()", "pop()", "splice()", "removeLast()"],
            answer: 1,
            explanation: "pop() remove o último elemento, shift() remove o primeiro, e splice() pode remover elementos em qualquer posição.",
            category: "JavaScript"
        },
        {
            question: "Como se declara uma variável que não pode ser reatribuída em JavaScript?",
            options: ["var", "let", "const", "static"],
            answer: 2,
            explanation: "'const' declara uma variável constante que não pode ser reatribuída. Seu valor inicial é obrigatório.",
            category: "JavaScript"
        },
        {
            question: "Qual método converte JSON string em objeto JavaScript?",
            options: ["JSON.parse()", "JSON.stringify()", "JSON.convert()", "JSON.toObject()"],
            answer: 0,
            explanation: "JSON.parse() converte string JSON em objeto, enquanto JSON.stringify() faz o oposto (objeto para string).",
            category: "JavaScript"
        }
    ],
    
    medium: [
        {
            question: "Qual é o propósito do atributo 'defer' em tags script?",
            options: [
                "Atrasar o carregamento do script",
                "Executar o script após o DOM ser carregado",
                "Carregar o script em paralelo",
                "Impedir a execução do script"
            ],
            answer: 1,
            explanation: "O atributo 'defer' faz com que o script seja executado após o DOM ser completamente carregado, mas antes do evento 'load'.",
            category: "HTML"
        },
        {
            question: "Qual pseudo-classe CSS é usada para estilizar um elemento quando o mouse está sobre ele?",
            options: [":hover", ":focus", ":active", ":visited"],
            answer: 0,
            explanation: "A pseudo-classe :hover é aplicada quando o cursor do mouse está sobre o elemento.",
            category: "CSS"
        },
        {
            question: "Qual propriedade CSS é usada para criar sombras em caixas?",
            options: [
                "box-shadow",
                "text-shadow",
                "shadow",
                "drop-shadow"
            ],
            answer: 0,
            explanation: "A propriedade 'box-shadow' cria sombras ao redor de caixas (elementos), enquanto 'text-shadow' cria sombras em texto.",
            category: "CSS"
        },
        {
            question: "Qual é a diferença entre '==' e '===' em JavaScript?",
            options: [
                "Nenhuma diferença",
                "== compara valor, === compara valor e tipo",
                "== compara tipo, === compara valor",
                "== é mais rápido"
            ],
            answer: 1,
            explanation: "O operador '==' faz coerção de tipo antes da comparação, enquanto '===' compara valor e tipo sem coerção.",
            category: "JavaScript"
        },
        {
            question: "Qual método é usado para iterar sobre os elementos de um array em JavaScript?",
            options: [
                "forEach()",
                "for()",
                "while()",
                "loop()"
            ],
            answer: 0,
            explanation: "forEach() é um método de array que executa uma função para cada elemento do array.",
            category: "JavaScript"
        },
        {
            question: "Qual é o resultado de 'typeof null' em JavaScript?",
            options: ["null", "object", "undefined", "string"],
            answer: 1,
            explanation: "Em JavaScript, 'typeof null' retorna 'object', que é um bug histórico da linguagem.",
            category: "JavaScript"
        },
        {
            question: "Qual propriedade CSS é usada para controlar o fluxo de texto ao redor de um elemento?",
            options: ["float", "position", "display", "overflow"],
            answer: 0,
            explanation: "A propriedade 'float' permite que elementos flutuem à esquerda ou direita, controlando o fluxo de texto ao redor.",
            category: "CSS"
        },
        {
            question: "Qual é o propósito do 'localStorage' em JavaScript?",
            options: [
                "Armazenar dados temporariamente",
                "Armazenar dados permanentemente no navegador",
                "Armazenar dados no servidor",
                "Armazenar dados na sessão"
            ],
            answer: 1,
            explanation: "localStorage permite armazenar dados no navegador que persistem mesmo após fechar a janela.",
            category: "JavaScript"
        },
        {
            question: "Qual é a diferença entre 'let' e 'var' em JavaScript?",
            options: [
                "Nenhuma diferença",
                "let tem escopo de bloco, var tem escopo de função",
                "var é mais moderno",
                "let não pode ser redeclarado"
            ],
            answer: 1,
            explanation: "let tem escopo de bloco ({}), enquanto var tem escopo de função e pode vazar para o escopo global.",
            category: "JavaScript"
        },
        {
            question: "Qual é o método correto para adicionar um elemento ao final de um array?",
            options: ["push()", "append()", "add()", "insert()"],
            answer: 0,
            explanation: "O método push() adiciona um ou mais elementos ao final do array e retorna o novo comprimento.",
            category: "JavaScript"
        }
    ],
    
    hard: [
        {
            question: "Qual é o propósito do 'event delegation' em JavaScript?",
            options: [
                "Melhorar a performance de eventos",
                "Permitir que eventos sejam capturados em elementos pais",
                "Criar eventos personalizados",
                "Remover eventos duplicados"
            ],
            answer: 1,
            explanation: "Event delegation permite que um único manipulador de eventos gerencie eventos de múltiplos elementos filhos, capturando eventos no elemento pai.",
            category: "JavaScript"
        },
        {
            question: "Qual é a diferença entre 'call', 'apply' e 'bind' em JavaScript?",
            options: [
                "call e apply executam imediatamente, bind cria uma nova função",
                "Todos executam imediatamente",
                "Todos criam novas funções",
                "call usa array, apply usa argumentos separados"
            ],
            answer: 0,
            explanation: "call() e apply() executam a função imediatamente com o this especificado, enquanto bind() retorna uma nova função com o this vinculado.",
            category: "JavaScript"
        },
        {
            question: "Qual é o conceito de 'closure' em JavaScript?",
            options: [
                "Uma função que não tem retorno",
                "Uma função que tem acesso a variáveis externas",
                "Uma função que se auto-executa",
                "Uma função que não pode ser chamada"
            ],
            answer: 1,
            explanation: "Closure é quando uma função interna tem acesso a variáveis de uma função externa, mesmo após a função externa ter terminado.",
            category: "JavaScript"
        },
        {
            question: "Qual é o propósito do 'box-sizing: border-box' em CSS?",
            options: [
                "Incluir padding e border no tamanho total do elemento",
                "Excluir padding do tamanho do elemento",
                "Excluir border do tamanho do elemento",
                "Ignorar padding e border"
            ],
            answer: 0,
            explanation: "border-box faz com que padding e border sejam incluídos no tamanho total do elemento, facilitando o cálculo de layouts.",
            category: "CSS"
        },
        {
            question: "Qual é a diferença entre 'position: relative' e 'position: absolute'?",
            options: [
                "relative posiciona em relação ao documento, absolute em relação ao pai",
                "relative posiciona em relação ao pai, absolute em relação ao documento",
                "relative não afeta o fluxo, absolute remove do fluxo",
                "relative cria um novo contexto de empilhamento"
            ],
            answer: 2,
            explanation: "relative posiciona o elemento em relação à sua posição normal sem remover do fluxo, enquanto absolute remove o elemento do fluxo e posiciona em relação ao ancestral posicionado mais próximo.",
            category: "CSS"
        },
        {
            question: "Qual é o propósito do 'flex-wrap' em CSS Flexbox?",
            options: [
                "Controlar a direção dos itens",
                "Permitir que itens quebrem para a próxima linha",
                "Controlar o tamanho dos itens",
                "Alinhar itens verticalmente"
            ],
            answer: 1,
            explanation: "flex-wrap controla se os itens flexíveis podem quebrar para a próxima linha quando não cabem na linha atual.",
            category: "CSS"
        },
        {
            question: "Qual é o conceito de 'hoisting' em JavaScript?",
            options: [
                "Variáveis são movidas para o topo do escopo",
                "Funções são executadas antes de serem declaradas",
                "Variáveis são inicializadas com undefined",
                "Todas as opções acima"
            ],
            answer: 3,
            explanation: "Hoisting é o comportamento do JavaScript de mover declarações de variáveis e funções para o topo do escopo antes da execução do código.",
            category: "JavaScript"
        },
        {
            question: "Qual é a diferença entre 'async' e 'defer' em scripts HTML?",
            options: [
                "async carrega em paralelo, defer carrega sequencialmente",
                "async pode executar fora de ordem, defer mantém a ordem",
                "defer é mais rápido que async",
                "async não bloqueia o parser"
            ],
            answer: 1,
            explanation: "async carrega e executa scripts assim que estiverem prontos (fora de ordem), enquanto defer carrega em paralelo mas executa na ordem, após o DOM ser carregado.",
            category: "HTML"
        },
        {
            question: "Qual é o propósito do 'z-index' em CSS?",
            options: [
                "Controlar a ordem de empilhamento de elementos",
                "Controlar a transparência",
                "Controlar o tamanho do elemento",
                "Controlar a posição absoluta"
            ],
            answer: 0,
            explanation: "z-index controla a ordem de empilhamento de elementos posicionados, determinando qual elemento aparece na frente.",
            category: "CSS"
        },
        {
            question: "Qual é o conceito de 'promises' em JavaScript?",
            options: [
                "Um objeto que representa um valor futuro",
                "Uma função síncrona",
                "Um tipo de dado primitivo",
                "Um método de array"
            ],
            answer: 0,
            explanation: "Promises são objetos que representam um valor que pode estar disponível agora, no futuro ou nunca, permitindo manipular operações assíncronas.",
            category: "JavaScript"
        }
    ]
};

// Configurações de dificuldade
const difficultySettings = {
    easy: {
        name: "Fácil",
        timePerQuestion: 30,
        questionCount: 10,
        color: "#4CAF50"
    },
    medium: {
        name: "Médio", 
        timePerQuestion: 20,
        questionCount: 10,
        color: "#FF9800"
    },
    hard: {
        name: "Difícil",
        timePerQuestion: 10,
        questionCount: 10,
        color: "#F44336"
    }
};

// Exportar para uso no quiz
export { quizQuestions, difficultySettings };