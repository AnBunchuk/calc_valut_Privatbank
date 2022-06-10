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
        this.cashValue = '1'; // нал-безнал
        this.currency1 = '1';// верхняя валюта "МЕНЯЮ" currency_change1
        this.currency2 = '40';// нижняя валюта "ПОЛУЧАЮ" currency_change2
        this.dataServer = [];
    }
    // текущее число
    currentDate() {
        let todey = new Date();
        let myMonth = todey.getMonth();
        if (myMonth < 10) myMonth = '0' + ++myMonth;
        let myDate = todey.getDate() + '.' + myMonth + '.' + todey.getFullYear();
        this.date.innerText = myDate;
    }
    // поле нал-безнал
    cashNonCash() {
        this.nalBeznal.oninput = (e) => {
            let cash = e.target.selectedIndex;
            if (cash === 0) this.cashValue = '1';
            if (cash === 1) this.cashValue = '1.3';
        }
    }
    // поле меняю
    currencyChange1() {
        this.currency_change1.oninput = (e) => {
            let currency = e.target.selectedIndex;
            if (currency === 0) this.currency1 = this.dataServer[0].buy //usd '29.25490'
            if (currency === 1) this.currency1 = this.dataServer[1].buy; //eur '31.19010'
            if (currency === 2) this.currency1 = 1;
        }
    }
    // поле получаю
    currencyChange2() {
        this.currency_change2.oninput = (e) => {
            let currency = e.target.selectedIndex;
            if (currency === 0) this.currency2 = 1 / this.dataServer[0].sale; //usd '32.78689'
            if (currency === 1) this.currency2 = 1 / this.dataServer[1].sale; //eur '35.08772'
            if (currency === 2) this.currency2 = 1;
        }
    }

    dataInput() {
        this.wrapper.addEventListener('click', (e) => {
            // нажатие кнопки "=" 
            if (e.target.value === "=")
                this.calculation()
        })
    }
    calculation() {
            let rez = this.cashValue * (this.currency1 * this.money1.value * this.currency2)
            this.money2.value = rez;
    }

    dataPrivat() {
        // создаем обьект для получаем данных с сервера
        const request = new XMLHttpRequest();
        // запрос на сервер откуда будем получать и в каком виде запрос
        request.open("GET", "https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11")
        // настройка заголока нашего соединения, т.е. в каком формате мы хотим получить данные
        // request.setRequestHeader('Content-type', 'application/json')// 'этот стандартный но не заработал!!!
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        // производим само соединение
        request.send()

        // создаем слушатель когда данные будут получены
        request.addEventListener('readystatechange', (event) => {
            // ждем статуса "получен"
            if (request.readyState === 4 && request.status === 200) {
                // получаем текст сообщения в виде строки
                this.dataServer = request.responseText;
                // преобразуем к формату JSON
                this.dataServer = JSON.parse(this.dataServer)
                console.log(this.dataServer);
                
                // подставляем данные
this.currency1=this.dataServer[0].buy
this.currency_change2[2].selected=true
this.currency2 = 1

            }
        })
    }





    init() {
        console.dir(this);
        this.dataPrivat()
        this.currentDate();
        this.cashNonCash();
        this.currencyChange1();
        this.currencyChange2();
        this.dataInput()



    }
}