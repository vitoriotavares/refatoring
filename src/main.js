let { createStatementData } = require("./createStatementData");

function statement(invoice, plays) {

	return plainTextStatement(invoice, plays)
	
	function plainTextStatement(invoice, plays){
		return renderPlainText(createStatementData(invoice, plays));
	}

	function htmlStatement(invoice, plays){
		return renderHtml(createStatementData(invoice, plays));
	}

	function renderHtml(data){
		let result = `<h1>Statement for ${data.customer}</h1>\n`
		result += '<table>\n'
		result += '<tr><th>play</th><th>seats</th><th>cost</th></tr>'

        for(let perf of data.performances){
            result += `<tr><td>${perf.play.name}</td><td>(${perf.audience}</td><td>${usd(perf.amount)}</td></tr>`;
        }
		result += '</table>\n'
        result += `<p>Amount owed is ${data.totalAmount}</p>\n`;
        result += `<p>You earned ${data.totalVolumeCredits} credits</p>\n`;
        return result;
	}

	function renderPlainText(data) {
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