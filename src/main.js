let { createStatementData } = require("./createStatementData");

function statement(invoice, plays) {
	
	return renderPlainText(createStatementData(invoice, plays));

	function renderPlainText(data, plays) {
        let result = `Statement for ${data.customer}\n`

        for(let perf of data.performances){
            result += `\n${perf.play.name}: ${usd(perf.amount)}(${perf.audience} seats)`;
        }

        result += `\nAmount owed is ${data.totalAmount}\n`;
        result += `You earned ${data.totalVolumeCredits} credits\n`;
        return result;
    }

	function usd(aNumber) {
        return new Intl.NumberFormat("en-US", {
            style: "currency", 
            currency: "USD", 
            minumumFractionDigits: 2
        }).format(aNumber/100);
    }
}


module.exports = { statement }