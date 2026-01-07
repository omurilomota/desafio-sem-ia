// Quiz Fácil - 10 questões básicas com 30 segundos por questão
const quizQuestions = [
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
];

class QuizFacil {
    constructor() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.selectedAnswer = null;
        this.timeLeft = 30;
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
        this.timeLeft = 30;
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
        const warningThreshold = Math.ceil(30 * 0.3);
        
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
        const percentage = (this.timeLeft / 30) * 100;
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
        
        // Cor da barra de progresso para fácil
        this.progressBar.style.backgroundColor = '#4CAF50';
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
            <h2 style="color: #4CAF50;">🎉 Quiz Fácil Concluído!</h2>
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
                <p><strong>Nível:</strong> Fácil</p>
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
        const leaderboard = JSON.parse(localStorage.getItem('quiz-leaderboard-facil')) || [];
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
        
        localStorage.setItem('quiz-leaderboard-facil', JSON.stringify(leaderboard));
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
            difficulty: 'Fácil',
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
        const timePerformance = this.getTimePerformance(report.avgTimePerQuestion, 30);
        const recommendations = this.generateRecommendations(report.categoryAccuracy, report.avgTimePerQuestion, 30);
        
        return `
            <div class="learning-report">
                <div class="report-header">
                    <h2>🎓 Relatório de Aprendizagem - Nível Fácil</h2>
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


// Inicializar o quiz quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    const quiz = new QuizFacil();
    quiz.startTime = Date.now();
});