// Quiz Difícil - 10 questões avançadas com 10 segundos por questão
const quizQuestions = [
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
];

class QuizDificil {
    constructor() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.selectedAnswer = null;
        this.timeLeft = 10;
        this.timer = null;
        this.isTimerRunning = false;
        this.totalCorrect = 0;
        this.totalWrong = 0;
        this.userAnswers = [];
        this.startTime = null;
        this.endTime = null;
        
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
        this.timeLeft = 10;
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
            
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = 'answer';
            input.id = `option-${index}`;
            input.value = index;
    
            const label = document.createElement('label');
            label.htmlFor = `option-${index}`;
    
            // Tratamento de HTML nas opções
            if (option.includes('<') && option.includes('>')) {
                label.innerHTML = option.replace(/</g, '<').replace(/>/g, '>');
            } else {
                label.textContent = option;
            }
    
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
        const warningThreshold = Math.ceil(10 * 0.3);
        
        if (this.timeLeft <= warningThreshold) {
            this.timerElement.style.color = '#f44336'; // Vermelho
            this.timerElement.style.fontWeight = 'bold';
            this.timerElement.style.animation = 'pulse 0.5s infinite';
        } else if (this.timeLeft <= warningThreshold * 2) {
            this.timerElement.style.color = '#ff9800'; // Laranja
        } else {
            this.timerElement.style.color = '#4CAF50'; // Verde
        }
    }
    
    updateTimerVisual() {
        const percentage = (this.timeLeft / 10) * 100;
        this.timerElement.style.transform = `scale(${0.8 + (percentage / 100) * 0.4})`;
    }
    
    timeUp() {
        clearInterval(this.timer);
        this.isTimerRunning = false;
        
        // Se nenhuma resposta foi selecionada, marcar como errado
        if (this.selectedAnswer === null) {
            this.totalWrong++;
            this.wrongCountElement.textContent = this.totalWrong;
            this.userAnswers[this.currentQuestionIndex] = -1; // Marcar como não respondida
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
        
        // Cor da barra de progresso para difícil
        this.progressBar.style.backgroundColor = '#F44336';
    }
    
    playSound(type) {
        try {
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
        if (!this.isTimerRunning) return;
        
        this.selectedAnswer = answerIndex;
        this.userAnswers[this.currentQuestionIndex] = answerIndex;
        
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
        this.endTime = Date.now();
        const timeElapsed = Math.round((this.endTime - this.startTime) / 1000);
        
        // Salvar no leaderboard
        this.saveScore(this.score, quizQuestions.length, this.totalCorrect, this.totalWrong, timeElapsed);
        
        // Gerar relatório de aprendizagem
        const report = this.generateReport(quizQuestions, this.userAnswers, this.score, quizQuestions.length, timeElapsed);
        
        // Exibir resultados
        this.questionText.innerHTML = `
            <h2 style="color: #F44336;">🎉 Quiz Difícil Concluído!</h2>
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
            <div style="margin-top: 20px; text-align: center; color: #666;">
                <p><strong>Tempo total:</strong> ${timeElapsed}s</p>
                <p><strong>Nível:</strong> Difícil</p>
            </div>
        `;
        
        this.optionsContainer.innerHTML = '';
        this.explanationContainer.style.display = 'none';
        this.nextBtn.style.display = 'none';
        this.restartBtn.style.display = 'inline-block';
        this.timerElement.style.display = 'none';
        
        // Exibir relatório
        this.showReport(report);
    }
    
    saveScore(score, totalQuestions, correct, wrong, timeElapsed) {
        const leaderboard = JSON.parse(localStorage.getItem('quiz-leaderboard-dificil')) || [];
        const newScore = {
            score: score,
            totalQuestions: totalQuestions,
            correct: correct,
            wrong: wrong,
            timeElapsed: timeElapsed,
            date: new Date().toLocaleString('pt-BR')
        };
        
        leaderboard.push(newScore);
        leaderboard.sort((a, b) => b.score - a.score);
        
        // Manter apenas os 10 melhores
        if (leaderboard.length > 10) {
            leaderboard.length = 10;
        }
        
        localStorage.setItem('quiz-leaderboard-dificil', JSON.stringify(leaderboard));
    }
    
    generateReport(questions, userAnswers, score, totalQuestions, timeElapsed) {
        const categories = { 'HTML': 0, 'CSS': 0, 'JavaScript': 0 };
        const categoryTotal = { 'HTML': 0, 'CSS': 0, 'JavaScript': 0 };
        
        questions.forEach((question, index) => {
            categoryTotal[question.category]++;
            if (userAnswers[index] === question.answer) {
                categories[question.category]++;
            }
        });
        
        const categoryAccuracy = {};
        Object.keys(categories).forEach(category => {
            categoryAccuracy[category] = categoryTotal[category] > 0 
                ? Math.round((categories[category] / categoryTotal[category]) * 100) 
                : 0;
        });
        
        const overallAccuracy = Math.round((score / totalQuestions) * 100);
        const avgTimePerQuestion = timeElapsed / totalQuestions;
        
        return {
            difficulty: 'Difícil',
            score: score,
            totalQuestions: totalQuestions,
            correct: this.totalCorrect,
            wrong: this.totalWrong,
            timeElapsed: timeElapsed,
            overallAccuracy: overallAccuracy,
            avgTimePerQuestion: avgTimePerQuestion,
            categoryAccuracy: categoryAccuracy,
            categories: categories,
            categoryTotal: categoryTotal
        };
    }
    
    generateReportHTML(report) {
        const timePerformance = this.getTimePerformance(report.avgTimePerQuestion, 10);
        const recommendations = this.generateRecommendations(report.categoryAccuracy, report.avgTimePerQuestion, 10);
        
        return `
            <div class="learning-report">
                <div class="report-header">
                    <h2>🎓 Relatório de Aprendizagem - Nível Difícil</h2>
                    <div class="report-meta">
                        <span>🎯 Pontuação: ${report.score}/${report.totalQuestions}</span>
                        <span>⏱️ Tempo: ${report.timeElapsed}s</span>
                        <span>📊 Acurácia: ${report.overallAccuracy}%</span>
                    </div>
                </div>
                
                <div class="time-analysis">
                    <h3>⏱️ Análise de Tempo</h3>
                    <div class="time-performance ${timePerformance.class}">
                        <strong>Desempenho de Tempo:</strong> ${timePerformance.message}
                    </div>
                    <p><strong>Média por questão:</strong> ${report.avgTimePerQuestion.toFixed(1)}s</p>
                </div>
                
                <div class="category-analysis">
                    <h3>📈 Desempenho por Categoria</h3>
                    <div class="category-grid">
                        ${Object.keys(report.categoryAccuracy).map(category => {
                            const accuracy = report.categoryAccuracy[category];
                            const level = this.getPerformanceLevel(accuracy);
                            return `
                                <div class="category-card ${level}">
                                    <div class="category-header">
                                        <h4>${category}</h4>
                                        <div class="accuracy-score">${accuracy}%</div>
                                    </div>
                                    <div class="category-stats">
                                        <span class="stat-item">Acertos: ${report.categories[category]}/${report.categoryTotal[category]}</span>
                                        <span class="stat-item">Nível: ${this.getLevelText(level)}</span>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
                
                <div class="recommendations">
                    <h3>💡 Recomendações de Estudo</h3>
                    ${recommendations.map(rec => `
                        <div class="recommendation-card ${rec.priority}">
                            <div class="rec-header">
                                <span class="priority-icon">${rec.icon}</span>
                                <h4>${rec.title}</h4>
                            </div>
                            <div class="rec-message">${rec.message}</div>
                            <ul class="rec-suggestions">
                                ${rec.suggestions.map(sug => `<li>${sug}</li>`).join('')}
                            </ul>
                        </div>
                    `).join('')}
                </div>
                
                <div class="report-footer">
                    <p>Continue praticando para melhorar ainda mais seus conhecimentos! 🚀</p>
                </div>
            </div>
        `;
    }
    
    showReport(report) {
        const modal = document.createElement('div');
        modal.className = 'leaderboard-modal';
        modal.style.display = 'flex';
        modal.innerHTML = `
            <div class="modal-content large">
                <div class="modal-header">
                    <h2>🎓 Relatório de Aprendizagem</h2>
                    <button class="btn btn-secondary" onclick="this.closest('.leaderboard-modal').remove()">Fechar</button>
                </div>
                <div class="modal-body">
                    ${this.generateReportHTML(report)}
                    <div class="report-actions">
                        <button class="btn btn-primary" onclick="location.reload()">Jogar Novamente</button>
                        <button class="btn btn-secondary" onclick="this.closest('.leaderboard-modal').remove()">Fechar</button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
    
    getTimePerformance(avgTime, maxTime) {
        const ratio = avgTime / maxTime;
        if (ratio <= 0.3) return { class: 'excellent', message: 'Excelente! Você respondeu muito rápido.' };
        if (ratio <= 0.6) return { class: 'good', message: 'Bom! Seu tempo de resposta foi adequado.' };
        if (ratio <= 0.8) return { class: 'needs_improvement', message: 'Precisa melhorar. Tente ser mais rápido nas respostas.' };
        return { class: 'poor', message: 'Muito lento. Pratique para melhorar sua velocidade.' };
    }
    
    getPerformanceLevel(accuracy) {
        if (accuracy >= 90) return 'excellent';
        if (accuracy >= 70) return 'good';
        if (accuracy >= 50) return 'medium';
        return 'poor';
    }
    
    getLevelText(level) {
        switch(level) {
            case 'excellent': return 'Excelente';
            case 'good': return 'Bom';
            case 'medium': return 'Médio';
            case 'poor': return 'Precisa melhorar';
            default: return 'Desconhecido';
        }
    }
    
    generateRecommendations(categoryAccuracy, avgTimePerQuestion, maxTime) {
        const recommendations = [];
        
        // Recomendações baseadas em desempenho por categoria
        Object.keys(categoryAccuracy).forEach(category => {
            const accuracy = categoryAccuracy[category];
            if (accuracy < 50) {
                recommendations.push({
                    priority: 'high',
                    icon: '🔴',
                    title: `Estudar ${category}`,
                    message: `Seu desempenho em ${category} está abaixo do esperado. Foque nos fundamentos.`,
                    suggestions: [
                        'Revise os conceitos básicos de ' + category,
                        'Pratique exercícios relacionados a ' + category,
                        'Consulte documentação oficial da ' + category
                    ]
                });
            } else if (accuracy < 70) {
                recommendations.push({
                    priority: 'medium',
                    icon: '🟡',
                    title: `Melhorar ${category}`,
                    message: `Seu desempenho em ${category} é razoável, mas pode melhorar.`,
                    suggestions: [
                        'Faça revisões periódicas de ' + category,
                        'Resolva mais exercícios de ' + category,
                        'Aprofunde seus conhecimentos em ' + category
                    ]
                });
            } else {
                recommendations.push({
                    priority: 'low',
                    icon: '🟢',
                    title: `Manter ${category}`,
                    message: `Seu desempenho em ${category} está ótimo! Continue praticando.`,
                    suggestions: [
                        'Continue praticando ' + category,
                        'Desafie-se com questões mais avançadas de ' + category,
                        'Ensine o que aprendeu sobre ' + category
                    ]
                });
            }
        });
        
        // Recomendações baseadas no tempo
        const timeRatio = avgTimePerQuestion / maxTime;
        if (timeRatio > 0.8) {
            recommendations.push({
                priority: 'medium',
                icon: '⏱️',
                title: 'Melhorar Velocidade',
                message: 'Seu tempo de resposta está alto. Pratique para ser mais rápido.',
                suggestions: [
                    'Treine resolvendo questões contra o tempo',
                    'Familiarize-se melhor com os conceitos',
                    'Pratique testes de múltipla escolha'
                ]
            });
        }
        
        return recommendations;
    }
    
    
    restartQuiz() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.totalCorrect = 0;
        this.totalWrong = 0;
        this.userAnswers = new Array(quizQuestions.length).fill(null);
        this.startTime = Date.now();
        
        this.restartBtn.style.display = 'none';
        this.nextBtn.style.display = 'inline-block';
        this.correctCountElement.textContent = this.totalCorrect;
        this.wrongCountElement.textContent = this.totalWrong;
        this.updateProgressBar();
        this.loadQuestion();
    }
}

// Funções Globais para Modal de Saída
function showExitModal() {
    const modal = document.getElementById('exit-modal');
    if (modal) {
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }
}


// Inicializar o quiz quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    const quiz = new QuizDificil();
    quiz.startTime = Date.now();
});