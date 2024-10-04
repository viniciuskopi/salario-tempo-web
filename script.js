// Função que calcula o tempo em segundos entre duas datas
function calculateTimeDifferenceInSeconds(startDate, endDate) {
    return Math.floor((endDate - startDate) / 1000);
}

// Função que atualiza o contador em tempo real
function updateSalaryCounter(salary, startTime) {
    const salaryElement = document.getElementById('current-salary');
    const decimalSalaryElement = document.getElementById('decimal-salary');
    const currentTime = new Date();

    // Tempo total de trabalho (30 dias, 23 horas e 59 minutos)
    const totalCycleSeconds = (30 * 24 * 60 * 60) + (23 * 60 * 60) + (59 * 60);

    // Tempo decorrido desde o início da contagem até agora
    const elapsedSeconds = calculateTimeDifferenceInSeconds(new Date(startTime), currentTime);
    const elapsedMilliseconds = (currentTime - new Date(startTime)) / 1000;

    if (elapsedSeconds >= totalCycleSeconds) {
        // Se passou um ciclo completo, reiniciar contagem
        startTime = new Date(currentTime.setHours(8, 0, 0, 0)).toISOString().slice(0, -8);
    } else {
        // Calcular o ganho acumulado
        const salaryPerSecond = salary / totalCycleSeconds;
        const accumulatedSalary = salaryPerSecond * elapsedSeconds;
        const accumulatedSalaryDecimal = salaryPerSecond * elapsedMilliseconds;

        // Truncar o valor principal para evitar que ele seja arredondado
        const truncatedSalary = Math.floor(accumulatedSalary * 100) / 100;
        salaryElement.textContent = truncatedSalary.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

        // Atualizar o valor com 7 casas decimais
        decimalSalaryElement.textContent = accumulatedSalaryDecimal.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 7,
            maximumFractionDigits: 7
        });
    }
}

// Função para iniciar o contador com base nos dados passados via query string
function startSalaryCounter() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const salary = parseFloat(urlParams.get('salary'));
    const startTime = urlParams.get('start-time');

    setInterval(() => updateSalaryCounter(salary, startTime), 100); // Atualização a cada 0.1 segundos
}

// Iniciar contador ao carregar a página
startSalaryCounter();
