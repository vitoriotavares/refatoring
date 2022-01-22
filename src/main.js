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

		volumeCreditsFor = (aPerfomance) => {
			let result = 0;
			result += Math.max(aPerfomance.audience - 30,0);
			if ("comedy" === playFor(aPerfomance).type) 
				result += Math.floor(aPerfomance.audience / 5)
			return result;
		}

		usd = (aNumber) => {
			return new Intl.NumberFormat("en-US", {
				style: "currency", 
				currency: "USD", 
				minumumFractionDigits: 2
			}).format(aNumber/100);
		}

		totalVolumeCredits = () => {
			let result = 0;
			for(let perf of invoice.performances){
				result += volumeCreditsFor(perf);
			}
			return result;
		}

		algumaCoisa = () => {
			let result = 0;
			for(let perf of invoice.performances){
				result += amountFor(perf);
			}
			return usd(result);
		}

		let result = `Statement for ${invoice.customer}\n`
		
		for(let perf of invoice.performances){
			result += `\n${playFor(perf).name}: ${usd(amountFor(perf))}(${perf.audience} seats)`;
		}

		result += `\nAmount owed is ${algumaCoisa()}\n`;
		result += `You earned ${totalVolumeCredits()} credits\n`;
		return result;
	}
}

module.exports = { Main }