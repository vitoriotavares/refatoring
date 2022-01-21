let { Main } = require('./main')

describe('main', () => {
    it('#statement', () => {
        const fs = require('fs');
        let invoice = JSON.parse(fs.readFileSync('src/invoices.json'));
        let plays = JSON.parse(fs.readFileSync('src/plays.json'));
        result = Main.statement(invoice, plays)
        //expect(result.replace(/\s/g, '')).toEqual('StatementforBigCoJorge:$400.00Vitorio:$360.00Tavares:$400.00Amountowedis$1,160.00');
        expect(result.replace(/\s/g, '')).toEqual('StatementforBigCoHamlet:$650.00AsYouLikeIt:$580.00Othello:$500.00Amountowedis$1,730.00');
    })
})