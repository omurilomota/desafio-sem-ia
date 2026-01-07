// Importar módulos
import { quizQuestions, difficultySettings } from './questions.js';
import { leaderboard } from './leaderboard.js';
import { learningReport } from './learningReport.js';

class QuizApp {
    constructor() {
        // Estado do quiz
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.selectedAnswer = null;
        this.timeLeft = 0;
        this.timer = null;
        this.isTimerRunning = false;
        this.totalCorrect = 0;
        this.totalWrong = 0;
        this.difficulty = null;
        this.questions = [];
        this.userAnswers = [];
        this.startTime = null;
        this.endTime = null;
        
        // Elementos DOM
        this.difficultySelector = document.getElementById('difficulty-selector');
        this.quizContainer = document.getElementById('quiz-container');
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
        this.difficultyDisplay = document.getElementById('difficulty-display');
        this.currentDifficulty = document.getElementById('current-difficulty');
        
        // Modais
        this.leaderboardModal = document.getElementById('leaderboard-modal');
        this.statsModal = document.getElementById('stats-modal');
        this.reportModal = document.getElementById('report-modal');
        
        // Inicializar
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.updateDifficultyDisplay();
    }
    
    setupEventListeners() {
        // Seleção de dificuldade
        document.querySelectorAll('.difficulty-card').forEach(card => {
            card.addEventListener('click', () => {
                const difficulty = card.dataset.difficulty;
                
                // Redirecionar para o HTML correspondente
                switch(difficulty) {
                    case 'easy':
                        window.location.href = 'quiz-facil.html';
                        break;
                    case 'medium':
                        window.location.href = 'quiz-medio.html';
                        break;
                    case 'hard':
                        window.location.href = 'quiz-dificil.html';
                        break;
                }
            });
        });
        
        // Controles do quiz
        this.nextBtn.addEventListener('click', () => this.nextQuestion());
        this.restartBtn.addEventListener('click', () => this.restartQuiz());
        this.timerBtn.addEventListener('click', () => this.startTimer());
        
        // Leaderboard
        document.getElementById('view-leaderboard-btn').addEventListener('click', () => this.showLeaderboard());
        document.getElementById('close-leaderboard-btn').addEventListener('click', () => this.hideLeaderboard());
        document.getElementById('clear-leaderboard-btn').addEventListener('click', () => this.clearLeaderboard());
        
        // Estatísticas
        document.getElementById('view-stats-btn').addEventListener('click', () => this.showStats());
        document.getElementById('close-stats-btn').addEventListener('click', () => this.hideStats());
        
        // Relatório
        document.getElementById('close-report-btn').addEventListener('click', () => this.hideReport());
        document.getElementById('play-again-btn').addEventListener('click', () => this.playAgain());
        document.getElementById('view-leaderboard-from-report-btn').addEventListener('click', () => {
            this.hideReport();
            this.showLeaderboard();
        });
        
        // Filtros do leaderboard
        document.querySelectorAll('.btn-filter').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.btn-filter').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.updateLeaderboardContent(e.target.dataset.filter);
            });
        });
    }
    
    startQuiz(difficulty) {
        this.difficulty = difficulty;
        this.difficultySelector.style.display = 'none';
        this.quizContainer.style.display = 'block';
        
        // Configurar questões
        this.questions = this.selectQuestions(difficulty);
        this.userAnswers = new Array(this.questions.length).fill(null);
        
        // Configurar temporizador
        const settings = difficultySettings[difficulty];
        this.timeLeft = settings.timePerQuestion;
        
        // Inicializar contadores
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.totalCorrect = 0;
        this.totalWrong = 0;
        this.startTime = Date.now();
        
        // Atualizar interface
        this.updateDifficultyDisplay();
        this.totalQuestionsElement.textContent = this.questions.length;
        this.correctCountElement.textContent = this.totalCorrect;
        this.wrongCountElement.textContent = this.totalWrong;
        this.updateProgressBar();
        this.loadQuestion();
    }
    
    selectQuestions(difficulty) {
        const allQuestions = quizQuestions[difficulty];
        const settings = difficultySettings[difficulty];
        
        // Embaralhar questões
        const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
        
        // Selecionar quantidade desejada
        return shuffled.slice(0, settings.questionCount);
    }
    
    updateDifficultyDisplay() {
        if (this.difficulty) {
            const settings = difficultySettings[this.difficulty];
            this.currentDifficulty.textContent = settings.name;
            this.currentDifficulty.dataset.difficulty = this.difficulty;
            this.difficultyDisplay.style.borderColor = settings.color;
        }
    }
    
    loadQuestion() {
        if (this.currentQuestionIndex >= this.questions.length) {
            this.showResults();
            return;
        }
    
        const question = this.questions[this.currentQuestionIndex];
    
        // Atualizar contador
        this.currentQuestionElement.textContent = this.currentQuestionIndex + 1;
        this.scoreElement.textContent = this.score;
    
        // Resetar temporizador
        const settings = difficultySettings[this.difficulty];
        this.timeLeft = settings.timePerQuestion;
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
        const settings = difficultySettings[this.difficulty];
        const warningThreshold = Math.ceil(settings.timePerQuestion * 0.3);
        
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
        const settings = difficultySettings[this.difficulty];
        const percentage = (this.timeLeft / settings.timePerQuestion) * 100;
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
        const totalQuestions = this.questions.length;
        const progress = ((this.currentQuestionIndex) / totalQuestions) * 100;
        
        this.progressBar.style.width = `${progress}%`;
        this.progressText.textContent = `${this.currentQuestionIndex} de ${totalQuestions}`;
        
        // Cor da barra de progresso baseada na dificuldade
        const settings = difficultySettings[this.difficulty];
        this.progressBar.style.backgroundColor = settings.color;
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
        const question = this.questions[this.currentQuestionIndex];
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
        leaderboard.saveScore(
            this.difficulty,
            this.score,
            this.questions.length,
            this.totalCorrect,
            this.totalWrong,
            timeElapsed
        );
        
        // Gerar relatório de aprendizagem
        const report = learningReport.generateReport(
            this.questions,
            this.userAnswers,
            this.difficulty,
            this.score,
            this.questions.length,
            timeElapsed
        );
        
        // Exibir resultados
        this.questionText.innerHTML = `
            <h2 style="color: #4CAF50;">🎉 Quiz Concluído!</h2>
            <p style="font-size: 1.2rem; margin-top: 20px;">
                Você acertou <strong>${this.score}</strong> de <strong>${this.questions.length}</strong> questões.
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
                <p><strong>Dificuldade:</strong> ${difficultySettings[this.difficulty].name}</p>
            </div>
        `;
        
        this.optionsContainer.innerHTML = '';
        this.explanationContainer.style.display = 'none';
        this.nextBtn.style.display = 'none';
        this.restartBtn.style.display = 'none';
        this.timerElement.style.display = 'none';
        
        // Exibir relatório
        this.showReport(report);
    }
    
    showReport(report) {
        this.reportModal.style.display = 'flex';
        document.getElementById('report-content').innerHTML = learningReport.generateReportHTML(report);
    }
    
    hideReport() {
        this.reportModal.style.display = 'none';
    }
    
    playAgain() {
        this.hideReport();
        this.restartQuiz();
    }
    
    restartQuiz() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.totalCorrect = 0;
        this.totalWrong = 0;
        this.userAnswers = new Array(this.questions.length).fill(null);
        this.startTime = Date.now();
        
        this.restartBtn.style.display = 'none';
        this.nextBtn.style.display = 'inline-block';
        this.correctCountElement.textContent = this.totalCorrect;
        this.wrongCountElement.textContent = this.totalWrong;
        this.updateProgressBar();
        this.loadQuestion();
    }
    
    // Leaderboard
    showLeaderboard() {
        this.leaderboardModal.style.display = 'flex';
        this.updateLeaderboardContent('all');
    }
    
    hideLeaderboard() {
        this.leaderboardModal.style.display = 'none';
    }
    
    updateLeaderboardContent(filter) {
        const content = document.getElementById('leaderboard-content');
        content.innerHTML = leaderboard.generateLeaderboardHTML(filter === 'all' ? null : filter);
    }
    
    clearLeaderboard() {
        if (confirm('Tem certeza que deseja limpar o leaderboard? Esta ação não pode ser desfeita.')) {
            leaderboard.clearLeaderboard();
            this.updateLeaderboardContent('all');
        }
    }
    
    // Estatísticas
    showStats() {
        this.statsModal.style.display = 'flex';
        const content = document.getElementById('stats-content');
        content.innerHTML = leaderboard.generateStatisticsHTML();
    }
    
    hideStats() {
        this.statsModal.style.display = 'none';
    }
}

// Inicializar o quiz quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    new QuizApp();
});
