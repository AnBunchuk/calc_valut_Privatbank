'use strict'

class Calc {
    constructor() {
        this.wrapper = document.querySelector('form');
        this.date = this.wrapper.querySelector('.date');
        this.nalBeznal = this.wrapper.querySelector('.nal_beznal');
        this.money1 = document.getElementById('money1');
        this.money2 = document.getElementById('money2');
        this.calc = this.wrapper.querySelector('.calc');
        this.change = this.wrapper.querySelector('.change');
        this.currency_change1 = this.wrapper.querySelector('.currency_change1');
        this.currency_change2 = this.wrapper.querySelector('.currency_change2');
        this.cashValue = '1';
        this.currency1 = '1';
        this.currency2 = '40';
    }

    currentDate() {
        let todey = new Date();
        let myMonth = todey.getMonth();
        // console.log(todey.getMonth());
        if (myMonth < 10) myMonth = '0' + myMonth;
        let myDate = todey.getDate() + '.' + myMonth + '.' + todey.getFullYear();
        this.date.innerText = myDate;
    }
    cashNonCash() {
        this.nalBeznal.oninput = (e) => {
            let cash = e.target.selectedIndex;
            if (cash === 0) this.cashValue = '1';
            if (cash === 1) this.cashValue = '1.3';
            console.log(this.cashValue)
        }
    }
    currencyChange1() {
        this.currency_change1.oninput = (e) => {
            let currency = e.target.selectedIndex;
            if (currency === 0) this.currency1 = '1';
            if (currency === 1) this.currency1 = '1.3';
            if (currency === 2) this.currency1 = '40';
            console.dir(this.currency1)
        }
    }
    currencyChange2() {
        this.currency_change2.oninput = (e) => {
            let currency = e.target.selectedIndex;
            if (currency === 0) this.currency2 = '1';
            if (currency === 1) this.currency2 = '1.3';
            if (currency === 2) this.currency2 = '40';
            console.dir(this.currency2)
        }
    }


    dataInput() {
        this.wrapper.addEventListener('click', (e) => {
            console.dir(e.target)

            if (e.target.value === "=")
                this.calculation()
        })
    }
    calculation() {
      let rez =  this.cashValue* (this.currency1*this.money1.value*this.currency2)
      console.log(rez)
      this.money2.value=rez;
    }




    init() {
        console.dir(this);
        this.currentDate();
        this.cashNonCash();
        this.currencyChange1();
        this.currencyChange2();
        this.dataInput()



    }
}