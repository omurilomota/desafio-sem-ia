// Sistema de Relatório de Aprendizagem
class LearningReport {
    constructor() {
        this.categories = ['HTML', 'CSS', 'JavaScript'];
    }

    // Gerar relatório de aprendizagem
    generateReport(questions, userAnswers, difficulty, score, totalQuestions, timeElapsed) {
        const categoryStats = this.analyzePerformanceByCategory(questions, userAnswers);
        const recommendations = this.generateRecommendations(categoryStats);
        const timeAnalysis = this.analyzeTimePerformance(timeElapsed, difficulty, totalQuestions);
        
        return {
            difficulty: difficulty,
            score: score,
            totalQuestions: totalQuestions,
            timeElapsed: timeElapsed,
            categoryStats: categoryStats,
            recommendations: recommendations,
            timeAnalysis: timeAnalysis,
            timestamp: new Date().toLocaleString('pt-BR')
        };
    }

    // Analisar desempenho por categoria
    analyzePerformanceByCategory(questions, userAnswers) {
        const categoryStats = {};
        
        this.categories.forEach(category => {
            categoryStats[category] = {
                totalQuestions: 0,
                correctAnswers: 0,
                wrongAnswers: 0,
                accuracy: 0,
                questions: []
            };
        });

        questions.forEach((question, index) => {
            const category = question.category;
            const userAnswer = userAnswers[index];
            const isCorrect = userAnswer === question.answer;

            categoryStats[category].totalQuestions++;
            categoryStats[category].questions.push({
                question: question.question,
                userAnswer: userAnswer,
                correctAnswer: question.answer,
                isCorrect: isCorrect,
                explanation: question.explanation
            });

            if (isCorrect) {
                categoryStats[category].correctAnswers++;
            } else {
                categoryStats[category].wrongAnswers++;
            }
        });

        // Calcular acurácia por categoria
        this.categories.forEach(category => {
            const stats = categoryStats[category];
            if (stats.totalQuestions > 0) {
                stats.accuracy = Math.round((stats.correctAnswers / stats.totalQuestions) * 100);
            }
        });

        return categoryStats;
    }

    // Gerar recomendações de estudo
    generateRecommendations(categoryStats) {
        const recommendations = [];
        
        this.categories.forEach(category => {
            const stats = categoryStats[category];
            
            if (stats.accuracy < 50) {
                recommendations.push({
                    category: category,
                    priority: 'high',
                    message: `Necessita de estudo intensivo em ${category}. Acurácia: ${stats.accuracy}%.`,
                    suggestions: this.getSuggestionsForCategory(category, 'high')
                });
            } else if (stats.accuracy < 80) {
                recommendations.push({
                    category: category,
                    priority: 'medium',
                    message: `Melhorar conhecimentos em ${category}. Acurácia: ${stats.accuracy}%.`,
                    suggestions: this.getSuggestionsForCategory(category, 'medium')
                });
            } else if (stats.accuracy < 100) {
                recommendations.push({
                    category: category,
                    priority: 'low',
                    message: `Bom desempenho em ${category}, mas ainda há espaço para melhorias. Acurácia: ${stats.accuracy}%.`,
                    suggestions: this.getSuggestionsForCategory(category, 'low')
                });
            } else {
                recommendations.push({
                    category: category,
                    priority: 'excellent',
                    message: `Excelente desempenho em ${category}! Acurácia: ${stats.accuracy}%.`,
                    suggestions: this.getSuggestionsForCategory(category, 'excellent')
                });
            }
        });

        return recommendations;
    }

    // Obter sugestões de estudo por categoria e prioridade
    getSuggestionsForCategory(category, priority) {
        const suggestions = {
            HTML: {
                high: [
                    "Estudar a estrutura básica do HTML5",
                    "Aprender sobre tags semânticas",
                    "Praticar com formulários e validação",
                    "Entender atributos globais"
                ],
                medium: [
                    "Aprofundar conhecimentos em HTML semântico",
                    "Estudar atributos de acessibilidade",
                    "Praticar com APIs HTML5",
                    "Entender validação de formulários"
                ],
                low: [
                    "Explorar novos elementos HTML5",
                    "Estudar APIs avançadas",
                    "Praticar com microdados e schema.org",
                    "Aprender sobre performance HTML"
                ],
                excellent: [
                    "Ensinar HTML para iniciantes",
                    "Contribuir para projetos open source",
                    "Estudar especificações W3C",
                    "Explorar HTML avançado e inovações"
                ]
            },
            CSS: {
                high: [
                    "Aprender propriedades CSS básicas",
                    "Entender o modelo de caixa (box model)",
                    "Praticar com seletores e especificidade",
                    "Estudar posicionamento e layout"
                ],
                medium: [
                    "Aprofundar conhecimentos em Flexbox",
                    "Estudar CSS Grid",
                    "Praticar responsividade",
                    "Entender transições e animações"
                ],
                low: [
                    "Explorar CSS avançado",
                    "Estudar pré-processadores (Sass, Less)",
                    "Praticar com frameworks CSS",
                    "Aprender sobre performance CSS"
                ],
                excellent: [
                    "Criar sistemas de design",
                    "Ensinar CSS avançado",
                    "Contribuir para frameworks CSS",
                    "Explorar CSS-in-JS e soluções modernas"
                ]
            },
            JavaScript: {
                high: [
                    "Aprender sintaxe básica de JavaScript",
                    "Entender variáveis, tipos e operadores",
                    "Praticar com funções e escopo",
                    "Estudar manipulação de DOM"
                ],
                medium: [
                    "Aprofundar conhecimentos em arrays e objetos",
                    "Estudar eventos e manipulação de eventos",
                    "Praticar com AJAX e Fetch API",
                    "Entender programação assíncrona"
                ],
                low: [
                    "Explorar ES6+ features",
                    "Estudar programação funcional",
                    "Praticar com frameworks (React, Vue, Angular)",
                    "Aprender sobre testes e debugging"
                ],
                excellent: [
                    "Criar bibliotecas e frameworks",
                    "Ensinar programação avançada",
                    "Contribuir para projetos open source",
                    "Estudar arquitetura de aplicações"
                ]
            }
        };

        return suggestions[category][priority] || [];
    }

    // Analisar performance de tempo
    analyzeTimePerformance(timeElapsed, difficulty, totalQuestions) {
        const settings = difficultySettings[difficulty];
        const totalTime = totalQuestions * settings.timePerQuestion;
        const efficiency = totalTime > 0 ? Math.round((timeElapsed / totalTime) * 100) : 0;
        
        let performance = 'excellent';
        if (efficiency > 120) performance = 'poor';
        else if (efficiency > 100) performance = 'needs_improvement';
        else if (efficiency > 80) performance = 'good';
        
        return {
            efficiency: efficiency,
            performance: performance,
            totalTime: totalTime,
            timeElapsed: timeElapsed,
            message: this.getTimePerformanceMessage(performance, efficiency)
        };
    }

    // Mensagem de performance de tempo
    getTimePerformanceMessage(performance, efficiency) {
        switch (performance) {
            case 'excellent':
                return `Excelente! Você completou o quiz em ${efficiency}% do tempo disponível.`;
            case 'good':
                return `Bom! Você completou o quiz em ${efficiency}% do tempo disponível.`;
            case 'needs_improvement':
                return `Precisa melhorar! Você utilizou ${efficiency}% do tempo disponível.`;
            case 'poor':
                return `Atenção! Você utilizou ${efficiency}% do tempo disponível.`;
            default:
                return 'Análise de tempo concluída.';
        }
    }

    // Gerar HTML do relatório
    generateReportHTML(report) {
        const { difficulty, score, totalQuestions, timeElapsed, categoryStats, recommendations, timeAnalysis } = report;
        
        let html = `
            <div class="learning-report">
                <div class="report-header">
                    <h2>📊 Relatório de Aprendizagem</h2>
                    <div class="report-meta">
                        <span class="difficulty-tag ${difficulty}">${difficultySettings[difficulty].name}</span>
                        <span class="score-info">Pontuação: ${score}/${totalQuestions}</span>
                        <span class="time-info">Tempo: ${timeElapsed}s</span>
                    </div>
                </div>
        `;

        // Análise de tempo
        html += `
            <div class="time-analysis">
                <h3>⏱️ Análise de Tempo</h3>
                <div class="time-performance ${timeAnalysis.performance}">
                    <p>${timeAnalysis.message}</p>
                </div>
            </div>
        `;

        // Desempenho por categoria
        html += `
            <div class="category-analysis">
                <h3>🎯 Desempenho por Categoria</h3>
                <div class="category-grid">
        `;

        this.categories.forEach(category => {
            const stats = categoryStats[category];
            const accuracyClass = stats.accuracy < 50 ? 'poor' : stats.accuracy < 80 ? 'medium' : stats.accuracy < 100 ? 'good' : 'excellent';
            
            html += `
                <div class="category-card ${accuracyClass}">
                    <div class="category-header">
                        <h4>${category}</h4>
                        <span class="accuracy-score">${stats.accuracy}%</span>
                    </div>
                    <div class="category-stats">
                        <span class="stat-item">✅ ${stats.correctAnswers} corretas</span>
                        <span class="stat-item">❌ ${stats.wrongAnswers} erradas</span>
                        <span class="stat-item">📝 ${stats.totalQuestions} questões</span>
                    </div>
                </div>
            `;
        });

        html += `
                </div>
            </div>
        `;

        // Recomendações
        html += `
            <div class="recommendations">
                <h3>📚 Recomendações de Estudo</h3>
        `;

        recommendations.forEach(rec => {
            const priorityIcon = rec.priority === 'high' ? '🔴' : rec.priority === 'medium' ? '🟡' : rec.priority === 'low' ? '🟢' : '⭐';
            const priorityClass = rec.priority === 'excellent' ? 'good' : rec.priority;
            
            html += `
                <div class="recommendation-card ${priorityClass}">
                    <div class="rec-header">
                        <span class="priority-icon">${priorityIcon}</span>
                        <h4>${rec.category}</h4>
                    </div>
                    <p class="rec-message">${rec.message}</p>
                    <ul class="rec-suggestions">
            `;

            rec.suggestions.forEach(suggestion => {
                html += `<li>• ${suggestion}</li>`;
            });

            html += `
                    </ul>
                </div>
            `;
        });

        html += `
            </div>
            
            <div class="report-footer">
                <p>💡 Dica: Revise as questões que você errou e pratique os tópicos recomendados para melhorar seu desempenho!</p>
            </div>
        `;

        return html;
    }
}

// Instância global do relatório de aprendizagem
const learningReport = new LearningReport();

// Exportar para uso no quiz
export { learningReport };