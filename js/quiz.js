// Quiz questions array
const quizQuestions = [
  {
    question: "Qual é a tag HTML5 usada para conteúdo de navegação?",
    options: [
      "nav",
      "menu",
      "navigation",
      "navigate"
    ],
    answer: 0,
    explanation: "A tag <nav> é usada em HTML5 para definir uma seção de navegação."
  },
  {
    question: "Qual atributo HTML define texto alternativo para imagens?",
    options: [
      "title",
      "src",
      "alt",
      "description"
    ],
    answer: 2,
    explanation: "O atributo 'alt' fornece texto alternativo para imagens quando não podem ser exibidas."
  },
  {
    question: "Em HTML, qual elemento é usado para criar uma lista ordenada?",
    options: [
      "ul",
      "ol",
      "li",
      "list"
    ],
    answer: 1,
    explanation: "A tag <ol> cria uma lista ordenada (numerada), enquanto <ul> cria uma lista não ordenada (com marcadores)."
  },
  {
    question: "Qual propriedade CSS é usada para alterar a cor de fundo de um elemento?",
    options: [
      "color",
      "background-color",
      "bgcolor",
      "background"
    ],
    answer: 1,
    explanation: "'background-color' define a cor de fundo de um elemento. 'color' altera apenas a cor do texto."
  },
  {
    question: "Em CSS, qual seletor é usado para aplicar estilos a um elemento com id 'header'?",
    options: [
      ".header",
      "#header",
      "*header",
      "&header"
    ],
    answer: 1,
    explanation: "O seletor '#' é usado para elementos com id específico, enquanto '.' é usado para classes."
  },
  {
    question: "Qual propriedade CSS controla o espaço entre o conteúdo de um elemento e sua borda?",
    options: [
      "margin",
      "border",
      "spacing",
      "padding"
    ],
    answer: 3,
    explanation: "'padding' controla o espaço interno, enquanto 'margin' controla o espaço externo do elemento."
  },
  {
    question: "Qual valor de 'display' faz um elemento se comportar como bloco, mas em linha?",
    options: [
      "block",
      "inline",
      "inline-block",
      "flex"
    ],
    answer: 2,
    explanation: "'inline-block' permite que elementos tenham largura e altura definidas (como block), mas fiquem em linha (como inline)."
  },
  {
    question: "Qual método JavaScript é usado para remover o último elemento de um array?",
    options: [
      "shift()",
      "pop()",
      "splice()",
      "removeLast()"
    ],
    answer: 1,
    explanation: "pop() remove o último elemento, shift() remove o primeiro, e splice() pode remover elementos em qualquer posição."
  },
  {
    question: "Como se declara uma variável que não pode ser reatribuída em JavaScript?",
    options: [
      "var",
      "let",
      "const",
      "static"
    ],
    answer: 2,
    explanation: "'const' declara uma variável constante que não pode ser reatribuída. Seu valor inicial é obrigatório."
  },
  {
    question: "Qual método converte JSON string em objeto JavaScript?",
    options: [
      "JSON.parse()",
      "JSON.stringify()",
      "JSON.convert()",
      "JSON.toObject()"
    ],
    answer: 0,
    explanation: "JSON.parse() converte string JSON em objeto, enquanto JSON.stringify() faz o oposto (objeto para string)."
  }
];

// Export for use in other modules (if needed)
export { quizQuestions };

class QuizApp {
    constructor() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.selectedAnswer = null;
        this.timeLeft = 15;
        this.timer = null;
        this.isTimerRunning = false;
        this.totalCorrect = 0;
        this.totalWrong = 0;
        
        // Elementos DOM
        this.questionText = document.getElementById('question-text');
        this.optionsContainer = document.getElementById('options-container');
        this.explanationContainer = document.getElementById('explanation-container');
        this.explanationText = document.getElementById('explanation-text');
        this.nextBtn = document.getElementById('next-btn');
        this.restartBtn = document.getElementById('restart-btn');
        this.scoreElement = document.getElementById('score');
        this.currentQuestionElement = document.getElementById('current-question');
        this.totalQuestionsElement = document.getElementById('total-questions');
        this.timerElement = document.getElementById('timer');
        this.timerBtn = document.getElementById('start-timer-btn');
        this.progressContainer = document.getElementById('progress-container');
        this.progressBar = document.getElementById('progress-bar');
        this.progressText = document.getElementById('progress-text');
        this.correctCountElement = document.getElementById('correct-count');
        this.wrongCountElement = document.getElementById('wrong-count');
        
        // Inicializar
        this.init();
    }
    
    init() {
        this.totalQuestionsElement.textContent = quizQuestions.length;
        this.correctCountElement.textContent = this.totalCorrect;
        this.wrongCountElement.textContent = this.totalWrong;
        this.updateProgressBar();
        this.loadQuestion();
        
        // Event listeners
        this.nextBtn.addEventListener('click', () => this.nextQuestion());
        this.restartBtn.addEventListener('click', () => this.restartQuiz());
        this.timerBtn.addEventListener('click', () => this.startTimer());
    }
    
    loadQuestion() {
        if (this.currentQuestionIndex >= quizQuestions.length) {
            this.showResults();
            return;
        }
    
        const question = quizQuestions[this.currentQuestionIndex];
    
        // Atualizar contador
        this.currentQuestionElement.textContent = this.currentQuestionIndex + 1;
        this.scoreElement.textContent = this.score;
    
        // Resetar temporizador
        this.timeLeft = 15;
        this.isTimerRunning = false;
        this.updateTimerDisplay();
        this.timerBtn.style.display = 'inline-block';
        this.nextBtn.style.display = 'none';
        this.timerElement.style.display = 'block';
        
        // Bloquear opções até iniciar o temporizador
        this.disableOptions();
    
        // Limpar seleção anterior
        this.selectedAnswer = null;
        this.explanationContainer.style.display = 'none';
        this.nextBtn.disabled = true;
    
        // Exibir pergunta
        this.questionText.textContent = question.question;
    
        // Gerar opções
        this.optionsContainer.innerHTML = '';
        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'option';
            optionElement.style.color = '#333 !important';
            optionElement.style.visibility = 'visible !important';
            optionElement.style.opacity = '1 !important';
    
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = 'answer';
            input.id = `option-${index}`;
            input.value = index;
    
            const label = document.createElement('label');
            label.htmlFor = `option-${index}`;
    
            // Aplicação da correção: lógica correta de exibição
            if (option.includes('<') && option.includes('>')) {
                label.innerHTML = option.replace(/</g, '<').replace(/>/g, '>');
            } else {
                label.textContent = option;
            }
    
            label.style.color = '#333 !important';
            label.style.visibility = 'visible !important';
            label.style.opacity = '1 !important';
            label.style.fontWeight = '500 !important';
            label.style.textShadow = 'none !important';
            label.style.display = 'inline-block !important';
            label.style.lineHeight = '1.4 !important';
            label.style.cursor = 'pointer';
            label.style.flexGrow = '1';
            label.style.userSelect = 'none';
    
            optionElement.appendChild(input);
            optionElement.appendChild(label);
    
            optionElement.addEventListener('click', () => {
                this.selectAnswer(index);
            });
    
            label.addEventListener('click', (e) => {
                e.stopPropagation();
                this.selectAnswer(index);
            });
    
            this.optionsContainer.appendChild(optionElement);
        });
    }
    
    startTimer() {
        if (this.isTimerRunning) return;
        
        this.isTimerRunning = true;
        this.timerBtn.style.display = 'none';
        this.enableOptions();
        this.playSound('start');
        
        this.timer = setInterval(() => {
            this.timeLeft--;
            this.updateTimerDisplay();
            
            // Efeito visual do temporizador
            this.updateTimerVisual();
            
            if (this.timeLeft <= 0) {
                this.timeUp();
            }
        }, 1000);
    }
    
    updateTimerDisplay() {
        this.timerElement.textContent = `${this.timeLeft}s`;
        
        // Mudar cor do temporizador conforme o tempo diminui
        if (this.timeLeft <= 5) {
            this.timerElement.style.color = '#f44336'; // Vermelho
            this.timerElement.style.fontWeight = 'bold';
            this.timerElement.style.animation = 'pulse 0.5s infinite';
        } else if (this.timeLeft <= 10) {
            this.timerElement.style.color = '#ff9800'; // Laranja
        } else {
            this.timerElement.style.color = '#4CAF50'; // Verde
        }
    }
    
    updateTimerVisual() {
        const percentage = (this.timeLeft / 15) * 100;
        this.timerElement.style.transform = `scale(${0.8 + (percentage / 100) * 0.4})`;
    }
    
    timeUp() {
        clearInterval(this.timer);
        this.isTimerRunning = false;
        
        // Se nenhuma resposta foi selecionada, marcar como errado
        if (this.selectedAnswer === null) {
            this.totalWrong++;
            this.wrongCountElement.textContent = this.totalWrong;
            this.showTimeUpFeedback();
        }
        
        this.nextBtn.style.display = 'inline-block';
        this.nextBtn.disabled = false;
        this.playSound('timeUp');
    }
    
    disableOptions() {
        const options = this.optionsContainer.querySelectorAll('.option');
        options.forEach(option => {
            option.style.opacity = '0.5';
            option.style.pointerEvents = 'none';
            option.style.cursor = 'not-allowed';
        });
    }
    
    enableOptions() {
        const options = this.optionsContainer.querySelectorAll('.option');
        options.forEach(option => {
            option.style.opacity = '1';
            option.style.pointerEvents = 'auto';
            option.style.cursor = 'pointer';
        });
    }
    
    updateProgressBar() {
        const totalQuestions = quizQuestions.length;
        const progress = ((this.currentQuestionIndex) / totalQuestions) * 100;
        
        this.progressBar.style.width = `${progress}%`;
        this.progressText.textContent = `${this.currentQuestionIndex} de ${totalQuestions}`;
        
        // Cor da barra de progresso
        if (progress < 30) {
            this.progressBar.style.backgroundColor = '#2196F3'; // Azul
        } else if (progress < 70) {
            this.progressBar.style.backgroundColor = '#FF9800'; // Laranja
        } else {
            this.progressBar.style.backgroundColor = '#4CAF50'; // Verde
        }
    }
    
    playSound(type) {
        try {
            // Criar sons simples com Web Audio API
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            if (type === 'correct') {
                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
                oscillator.start();
                oscillator.stop(audioContext.currentTime + 0.3);
            } else if (type === 'wrong') {
                oscillator.type = 'sawtooth';
                oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
                oscillator.start();
                oscillator.stop(audioContext.currentTime + 0.5);
            } else if (type === 'timeUp') {
                oscillator.type = 'square';
                oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
                oscillator.start();
                oscillator.stop(audioContext.currentTime + 0.2);
            } else if (type === 'start') {
                oscillator.type = 'triangle';
                oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
                oscillator.start();
                oscillator.stop(audioContext.currentTime + 0.4);
            }
        } catch (e) {
            console.log('Áudio não suportado neste navegador');
        }
    }
    
    showTimeUpFeedback() {
        this.explanationText.innerHTML = '<strong>⏰ Tempo esgotado!</strong> Nenhuma resposta foi selecionada.';
        this.explanationContainer.style.display = 'block';
        this.explanationContainer.style.backgroundColor = '#ffebee';
        this.explanationContainer.style.borderColor = '#f44336';
    }
    
    selectAnswer(answerIndex) {
        if (!this.isTimerRunning) return; // Não permitir seleção se o temporizador não estiver rodando
        
        this.selectedAnswer = answerIndex;
        
        // Destacar opção selecionada
        const options = this.optionsContainer.querySelectorAll('.option');
        options.forEach((option, index) => {
            if (index === answerIndex) {
                option.classList.add('selected');
            } else {
                option.classList.remove('selected');
            }
        });
        
        // Verificar resposta
        const question = quizQuestions[this.currentQuestionIndex];
        const isCorrect = answerIndex === question.answer;
        
        if (isCorrect) {
            this.score++;
            this.totalCorrect++;
            this.scoreElement.textContent = this.score;
            this.correctCountElement.textContent = this.totalCorrect;
            this.showCorrectFeedback();
            this.playSound('correct');
        } else {
            this.totalWrong++;
            this.wrongCountElement.textContent = this.totalWrong;
            this.showWrongFeedback();
            this.playSound('wrong');
        }
        
        // Mostrar explicação
        this.explanationText.textContent = question.explanation;
        this.explanationContainer.style.display = 'block';
        
        // Parar temporizador
        clearInterval(this.timer);
        this.isTimerRunning = false;
        
        // Habilitar botão próximo
        this.nextBtn.style.display = 'inline-block';
        this.nextBtn.disabled = false;
    }
    
    showCorrectFeedback() {
        this.explanationContainer.style.backgroundColor = '#e8f5e9';
        this.explanationContainer.style.borderColor = '#4caf50';
        this.explanationText.innerHTML = `<strong>✅ Correto!</strong> ${this.explanationText.textContent}`;
        
        // Efeito visual de acerto
        this.questionText.style.color = '#4caf50';
        this.questionText.style.fontWeight = 'bold';
        setTimeout(() => {
            this.questionText.style.color = '#2c3e50';
            this.questionText.style.fontWeight = 'normal';
        }, 1000);
    }
    
    showWrongFeedback() {
        this.explanationContainer.style.backgroundColor = '#ffebee';
        this.explanationContainer.style.borderColor = '#f44336';
        this.explanationText.innerHTML = `<strong>❌ Errado!</strong> ${this.explanationText.textContent}`;
        
        // Efeito visual de erro
        this.questionText.style.color = '#f44336';
        this.questionText.style.fontWeight = 'bold';
        setTimeout(() => {
            this.questionText.style.color = '#2c3e50';
            this.questionText.style.fontWeight = 'normal';
        }, 1000);
    }
    
    nextQuestion() {
        this.currentQuestionIndex++;
        this.updateProgressBar();
        this.loadQuestion();
    }
    
    showResults() {
        clearInterval(this.timer);
        this.questionText.innerHTML = `
            <h2 style="color: #4CAF50;">🎉 Quiz Concluído!</h2>
            <p style="font-size: 1.2rem; margin-top: 20px;">
                Você acertou <strong>${this.score}</strong> de <strong>${quizQuestions.length}</strong> questões.
            </p>
            <div style="display: flex; gap: 20px; margin-top: 20px; justify-content: center;">
                <div style="text-align: center; padding: 10px; background: #e8f5e9; border-radius: 8px; border: 2px solid #4caf50;">
                    <div style="font-size: 2rem; font-weight: bold; color: #4caf50;">${this.totalCorrect}</div>
                    <div style="color: #2e7d32; font-weight: bold;">Corretas</div>
                </div>
                <div style="text-align: center; padding: 10px; background: #ffebee; border-radius: 8px; border: 2px solid #f44336;">
                    <div style="font-size: 2rem; font-weight: bold; color: #f44336;">${this.totalWrong}</div>
                    <div style="color: #c62828; font-weight: bold;">Erradas</div>
                </div>
            </div>
        `;
        
        this.optionsContainer.innerHTML = '';
        this.explanationContainer.style.display = 'none';
        this.nextBtn.style.display = 'none';
        this.restartBtn.style.display = 'inline-block';
        this.timerElement.style.display = 'none';
    }
    
    restartQuiz() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.totalCorrect = 0;
        this.totalWrong = 0;
        this.restartBtn.style.display = 'none';
        this.nextBtn.style.display = 'inline-block';
        this.correctCountElement.textContent = this.totalCorrect;
        this.wrongCountElement.textContent = this.totalWrong;
        this.updateProgressBar();
        this.loadQuestion();
    }
}

// Inicializar o quiz quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    new QuizApp();
});
