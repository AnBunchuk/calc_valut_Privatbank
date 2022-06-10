'use strict'

class Calc {
    constructor() {
        this.wrapper = document.querySelector('form');
        this.date = this.wrapper.querySelector('.date'); // используется только один раз в currentDate. Которая вызывается только один раз. Зачем создавать глобальую переменную
        this.nalBeznal = this.wrapper.querySelector('.nal_beznal'); // то же самое
        this.money1 = document.getElementById('money1');
        this.money2 = document.getElementById('money2');
        this.calc = this.wrapper.querySelector('.calc'); // вообще не используется?
        this.change = this.wrapper.querySelector('.change');// вообще не используется?
        this.currency_change1 = this.wrapper.querySelector('.currency_change1');// используется только один раз зачем глобальная?
        this.currency_change2 = this.wrapper.querySelector('.currency_change2');// используется только один раз зачем глобальная?
        this.cashValue = '1'; // нал-безнал //В таких случаях лучше использовать enum
        this.currency1 = '1';// верхняя валюта currency_change1
        this.currency2 = '40';// нижняя валюта currency_change2
        this.dataServer = [];
    }
    // текущее число
    currentDate() {
        let todey = new Date();
        let myMonth = todey.getMonth();
        // console.log(todey.getMonth());
        if (myMonth < 10) myMonth = '0' + ++myMonth; //можно String(today.getMonth() + 1).padStart(2, '0');
        let myDate = todey.getDate() + '.' + myMonth + '.' + todey.getFullYear(); // для дня не добавляешь 0 если < 10?
        this.date.innerText = myDate;
    }
    // поле нал-безнал
    cashNonCash() {
        this.nalBeznal.oninput = (e) => {
            let cash = e.target.selectedIndex;
            if (cash === 0) this.cashValue = '1';
            if (cash === 1) this.cashValue = '1.3';
            // console.log(this.cashValue)
        }
    }
    // поле меняю
    currencyChange1() {
        this.currency_change1.oninput = (e) => {
            let currency = e.target.selectedIndex;
            // switch case лучше. и тоже enum. Т.к просто значения не понятно человеку который не писал код за что отвечают. И так меньше возможные ошибки
            if (currency === 0) this.currency1 = this.dataServer[0].buy //usd '29.25490'
            if (currency === 1) this.currency1 = this.dataServer[1].buy; //eur '31.19010'
            if (currency === 2) this.currency1 = 1;
            // console.dir(this.currency1)
        }
    }
    // поле получаю
    currencyChange2() {
        this.currency_change2.oninput = (e) => {
            let currency = e.target.selectedIndex;
            // if (currency === 0) this.currency2 = '29.25490'; 
            // switch case лучше
            if (currency === 0) this.currency2 = 1 / this.dataServer[0].sale; //usd '32.78689'
            // if (currency === 1) this.currency2 = '31.19010'; 
            if (currency === 1) this.currency2 = 1 / this.dataServer[1].sale; //eur '35.08772'
            if (currency === 2) this.currency2 = 1;
            // console.dir(this.currency2)
        }
    }

    dataInput() {
        this.wrapper.addEventListener('click', (e) => {
            // console.dir(e.target)
            // нажатие кнопки "=" 
            if (e.target.value === "=") // лучше по id определять. тк он уникальный а значение нет. Зачем добавлять обработчик на всю форму если тебе нужно только нажатие на =
                this.calculation()
        })
    }
    calculation() {
            let rez = this.cashValue * (this.currency1 * this.money1.value * this.currency2) // зачем создавать переменную и сразу присваивать значение другой. можно this.money2.value = this.cashValue * ... 
            this.money2.value = rez;
    }

    dataPrivat() {
        // let dataServer = [];

        // создаем обьект для получаем данных с сервера
        const request = new XMLHttpRequest(); //

        // запрос на сервер откуда будем получать и в каком виде запрос
        request.open("GET", "https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11")
        // настройка заголока нашего соединения, т.е. в каком формате мы хотим получить данные
        // request.setRequestHeader('Content-type', 'application/json')// 'этот стандартный но не заработал!!!
        // API не разрешает запросы с другого домена. 'application/x-www-form-urlencoded' не требует таких настроек 
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        // производим само соединение
        request.send()

        // создаем слушатель когда данные будут получены
        request.addEventListener('readystatechange', (event) => {
            // ждем статуса "получен"
            if (request.readyState === 4 && request.status === 200) { // ничего в случае ошибки не делаешь? В таком случае код который в currencyChange1 и currencyChange2 будет вызавать ошибки и не считать. 
                // получаем текст сообщения в виде строки
                this.dataServer = request.responseText;
                // преобразуем к формату JSON
                this.dataServer = JSON.parse(this.dataServer) 
                console.log(this.dataServer);
// подставляем данные
this.currency1=this.dataServer[0].buy //Получается жесткая привязка между id у тебя и на сервере. А если они поменяют порядок? Почему не считывать значение валюты тоже и не создавать самому захардкодженные значения?
// this.currency_change2[0].selected=false
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
