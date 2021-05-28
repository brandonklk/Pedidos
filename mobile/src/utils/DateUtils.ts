//obtem a data e hora em milisegundos
export const getDateAndHoursCurrentInMilliseconds = () => {
    try {
        return Date.now();
    } catch (e) {
        console.error("Erro ao obter login do usuário.")
    }
}
