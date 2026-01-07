// Sistema de Leaderboard com LocalStorage
class Leaderboard {
    constructor() {
        this.storageKey = 'quiz_leaderboard';
        this.maxEntries = 10;
    }

    // Salvar pontuação
    saveScore(difficulty, score, totalQuestions, correctAnswers, wrongAnswers, timeElapsed) {
        const leaderboard = this.getLeaderboard();
        const timestamp = new Date().toLocaleString('pt-BR');
        const accuracy = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
        
        const entry = {
            id: Date.now(),
            difficulty: difficulty,
            score: score,
            totalQuestions: totalQuestions,
            correctAnswers: correctAnswers,
            wrongAnswers: wrongAnswers,
            accuracy: accuracy,
            timeElapsed: timeElapsed,
            timestamp: timestamp
        };

        // Adicionar nova entrada
        leaderboard.push(entry);
        
        // Ordenar por pontuação (descendente)
        leaderboard.sort((a, b) => b.score - a.score);
        
        // Manter apenas as 10 melhores
        leaderboard.splice(this.maxEntries);
        
        // Salvar no LocalStorage
        localStorage.setItem(this.storageKey, JSON.stringify(leaderboard));
        
        return entry;
    }

    // Obter leaderboard completo
    getLeaderboard() {
        const data = localStorage.getItem(this.storageKey);
        return data ? JSON.parse(data) : [];
    }

    // Obter leaderboard por dificuldade
    getLeaderboardByDifficulty(difficulty) {
        const leaderboard = this.getLeaderboard();
        return leaderboard.filter(entry => entry.difficulty === difficulty);
    }

    // Obter melhor pontuação por dificuldade
    getBestScore(difficulty) {
        const entries = this.getLeaderboardByDifficulty(difficulty);
        return entries.length > 0 ? entries[0] : null;
    }

    // Obter estatísticas gerais
    getStatistics() {
        const leaderboard = this.getLeaderboard();
        
        if (leaderboard.length === 0) {
            return {
                totalGames: 0,
                averageScore: 0,
                bestScore: 0,
                accuracyByDifficulty: {}
            };
        }

        const totalGames = leaderboard.length;
        const averageScore = Math.round(leaderboard.reduce((sum, entry) => sum + entry.score, 0) / totalGames);
        const bestScore = Math.max(...leaderboard.map(entry => entry.score));
        
        // Calcular acurácia por dificuldade
        const accuracyByDifficulty = {};
        const difficulties = ['easy', 'medium', 'hard'];
        
        difficulties.forEach(diff => {
            const entries = this.getLeaderboardByDifficulty(diff);
            if (entries.length > 0) {
                const totalCorrect = entries.reduce((sum, entry) => sum + entry.correctAnswers, 0);
                const totalQuestions = entries.reduce((sum, entry) => sum + entry.totalQuestions, 0);
                accuracyByDifficulty[diff] = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
            } else {
                accuracyByDifficulty[diff] = 0;
            }
        });

        return {
            totalGames,
            averageScore,
            bestScore,
            accuracyByDifficulty
        };
    }

    // Limpar leaderboard
    clearLeaderboard() {
        localStorage.removeItem(this.storageKey);
    }

    // Gerar HTML para exibir leaderboard
    generateLeaderboardHTML(difficulty = null) {
        const entries = difficulty ? this.getLeaderboardByDifficulty(difficulty) : this.getLeaderboard();
        
        if (entries.length === 0) {
            return `
                <div class="empty-leaderboard">
                    <p>Nenhuma pontuação registrada ainda.</p>
                    <p>Jogue o quiz para aparecer aqui!</p>
                </div>
            `;
        }

        const difficultyName = difficulty ? difficultySettings[difficulty].name : 'Todas';
        
        let html = `
            <div class="leaderboard-header">
                <h3>🏆 Leaderboard - ${difficultyName}</h3>
                <div class="leaderboard-stats">
                    <span>Total de jogos: ${entries.length}</span>
                </div>
            </div>
            <div class="leaderboard-list">
                <div class="leaderboard-row header">
                    <span class="rank">#</span>
                    <span class="difficulty">Dificuldade</span>
                    <span class="score">Pontos</span>
                    <span class="accuracy">Acurácia</span>
                    <span class="date">Data</span>
                </div>
        `;

        entries.forEach((entry, index) => {
            const difficultyColor = difficultySettings[entry.difficulty].color;
            html += `
                <div class="leaderboard-row ${index === 0 ? 'top-score' : ''}">
                    <span class="rank">${index + 1}°</span>
                    <span class="difficulty" style="color: ${difficultyColor}">
                        <span class="difficulty-dot" style="background-color: ${difficultyColor}"></span>
                        ${difficultySettings[entry.difficulty].name}
                    </span>
                    <span class="score">${entry.score}</span>
                    <span class="accuracy">${entry.accuracy}%</span>
                    <span class="date">${entry.timestamp}</span>
                </div>
            `;
        });

        html += '</div>';
        return html;
    }

    // Gerar HTML para estatísticas
    generateStatisticsHTML() {
        const stats = this.getStatistics();
        
        if (stats.totalGames === 0) {
            return `
                <div class="empty-stats">
                    <p>Nenhuma estatística disponível.</p>
                    <p>Jogue o quiz para gerar estatísticas!</p>
                </div>
            `;
        }

        return `
            <div class="statistics-container">
                <h3>📊 Estatísticas Gerais</h3>
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-value">${stats.totalGames}</div>
                        <div class="stat-label">Total de Jogos</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">${stats.averageScore}</div>
                        <div class="stat-label">Média de Pontos</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">${stats.bestScore}</div>
                        <div class="stat-label">Melhor Pontuação</div>
                    </div>
                </div>
                <div class="accuracy-stats">
                    <h4>Acurácia por Dificuldade</h4>
                    <div class="accuracy-grid">
                        <div class="accuracy-item">
                            <span class="difficulty-dot easy"></span>
                            <span>Fácil: ${stats.accuracyByDifficulty.easy}%</span>
                        </div>
                        <div class="accuracy-item">
                            <span class="difficulty-dot medium"></span>
                            <span>Médio: ${stats.accuracyByDifficulty.medium}%</span>
                        </div>
                        <div class="accuracy-item">
                            <span class="difficulty-dot hard"></span>
                            <span>Difícil: ${stats.accuracyByDifficulty.hard}%</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

// Instância global do leaderboard
const leaderboard = new Leaderboard();

// Exportar para uso no quiz
export { leaderboard };