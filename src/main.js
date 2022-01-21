const Main = {
	statement: (invoice, plays) => {
		amountFor = (aPerformance) => {
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

		playFor = (aPerformance) => {
			return plays[aPerformance.playID]
		}

		let totalAmount = 0;
		let volumeCredits = 0;
		let result = `Statement for ${invoice.customer}\n`
		const format = new Intl.NumberFormat("en-US", {
			style: "currency", 
			currency: "USD", 
			minumumFractionDigits: 2
		}).format;
	
		for(let perf of invoice.performances){
			//soma creditos por volume
			volumeCredits += Math.max(perf.audience - 30,0);
			//soma um crédito extra para cada dez espectadores de comédia
			if ("comedy" === playFor(perf).type) 
				volumeCredits += Math.floor(perf.audience / 5)
			//exibe a linha para esta requisição
			result += `\n${playFor(perf).name}: ${format(amountFor(perf)/100)}`;
			totalAmount += amountFor(perf);
		}
		result += `\nAmount owed is ${format(totalAmount/100)}\n`;
		return result;
	}
}

module.exports = { Main }