function statement(invoice, plays) {
	const statementData = {};

	statementData.customer = invoice.customer;
	statementData.performances = invoice.performances;

	return renderPlainText(statementData, plays);

	function renderPlainText(data, plays) {
		let result = `Statement for ${data.customer}\n`

		for(let perf of data.performances){
			result += `\n${playFor(perf).name}: ${usd(amountFor(perf))}(${perf.audience} seats)`;
		}

		result += `\nAmount owed is ${totalAmount()}\n`;
		result += `You earned ${totalVolumeCredits()} credits\n`;
		return result;

		function totalAmount() {
			let result = 0;
			for(let perf of data.performances){
				result += amountFor(perf);
			}
			return usd(result);
		}

		function totalVolumeCredits() {
			let result = 0;
			for(let perf of data.performances){
				result += volumeCreditsFor(perf);
			}
			return result;
		}
	}
	
	function amountFor(aPerformance) {
		let result = 0;
	
		switch(playFor(aPerformance).type) {
			case "tragedy":
				result = 40000;
				if(aPerformance.audience > 30){
					result += 1000*(aPerformance.audience - 30);
				}
				break;
			case "comedy":
				result = 30000;
				if(aPerformance.audience > 20){
					result += 10000 + 500*(aPerformance.audience - 20)
				}
				result += 300*aPerformance.audience;
				break;
			default:
				throw new Error(`unknown type: ${playFor(aPerformance).type}`);
		}
		return result;
	}

	function playFor(aPerformance) {
		return plays[aPerformance.playID]
	}

	function volumeCreditsFor(aPerfomance) {
		let result = 0;
		result += Math.max(aPerfomance.audience - 30,0);
		if ("comedy" === playFor(aPerfomance).type) 
			result += Math.floor(aPerfomance.audience / 5)
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