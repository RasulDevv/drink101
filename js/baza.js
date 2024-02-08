let products = data.map(product => {
    return {
        ...product,
        Prices: prc(product.pr),
        ["Amounts"]: ams(product.pr),
        ["check"]: '',
        get Summ() {
            return this.Prices[this.check] * this.Amounts[this.check]
        },
        get HighSumm() {
            let sum = 0
            this.Amounts.forEach((amount, i) => {
                sum += amount * this.Prices[i]
            })
            return sum + sum * 0.15
        }
    }
})

function prc(pr) {
    return Object.values(pr).sort((a, b) => a > b ? 1 : -1)
}

function ams(pr) {
    return Object.keys(pr).map(() => 0)
}



// let qwertyuiop = [1, 30, 4, 21, 100000]

// qwertyuiop.sort((a,b) => {
//     console.log(a, b)  
// })

/*
    a = 30;     b = 1
    a = 4;      b = 30
    a = 21;     b = 4
    a = 100000; b = 21
*/

// console.log(qwertyuiop)