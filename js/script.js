"use strict";
let application = {};
let price = {};
let sendData = new FormData();
const alertPlaceholder = document.getElementById('liveAlertPlaceholder'); 


// Функция для добавления всплывающего уведомления
const appendAlert = (message, type) => {
// Создание элемента всплывающего уведомления и добавление его в документ
if (alertPlaceholder) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
      <div class="alert alert-${type} alert-dismissible" role="alert">
         <div>${message}</div>
         <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    `;
    alertPlaceholder.append(wrapper);
    console.log(message)
  } else {
    console.error('liveAlertPlaceholder not found');
  }
};


// Обработчик события для кнопки, вызывающей всплывающее уведомление
const alertTrigger = document.getElementById('liveAlertBtn');
if (alertTrigger) {
    alertTrigger.addEventListener('click', () => {
        appendAlert('Nice, you triggered this alert message!', 'success');
    });
}

const api_key = "02ea2359-4533-408b-ad51-0fda9124b5d2";
// Переменные для маршрутов и пагинации
let walkingRoutes;
let walkingOrders;
let currentPage = 1;
let maxPage = 1;


// Функция для обработки маршрутов
function walkingRoutesHandler() {
    let url = new URL("https://edu.std-900.ist.mospolytech.ru/api/routes");
    url.searchParams.append('api_key', api_key);
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url.toString());
    xhr.responseType = 'json';
    xhr.onload = function () {
        walkingRoutes = this.response;
        renderWalkingRoutes(walkingRoutes);
        maxPage = Math.floor(this.response.length / 10) + 1;
        renderPagination();
    };
    xhr.send();
}

let names = {};
// Функция для обработки данных заявки
function walkingOrderHandler() {
//     let url = new URL("https://edu.std-900.ist.mospolytech.ru/api/orders");
//     url.searchParams.append('api_key', api_key);
//     let xhr = new XMLHttpRequest();
//     xhr.open('GET', url.toString());
//     xhr.responseType = 'json';
//     xhr.onload = function () {
//         walkingOrders = this.response;

//         let url = new URL("https://edu.std-900.ist.mospolytech.ru/api/routes");
//         url.searchParams.append('api_key', api_key);
//         let xhr = new XMLHttpRequest();
//         xhr.open('GET', url.toString());
//         xhr.responseType = 'json';
//         xhr.onload = function () {
//             walkingRoutes = this.response;
//             for (let i = 0; i <= walkingRouters.length; i++) {
//                 console.log(walkingRouters[i]);}
//         }; 
//         xhr.send();

//         renderWalkingOrders(walkingOrders);
//         maxPage = Math.floor(this.response.length / 10) + 1;
//         renderPagination();
//     };
//     xhr.send();
// }
    let url = new URL("https://edu.std-900.ist.mospolytech.ru/api/orders"); 
    url.searchParams.append('api_key', api_key); 
    let xhr = new XMLHttpRequest(); 
    xhr.open('GET', url.toString()); 
    xhr.responseType = 'json'; 
    xhr.onload = function () { 
        walkingOrders = this.response; 

    let url = new URL("https://edu.std-900.ist.mospolytech.ru/api/routes");
    url.searchParams.append('api_key', api_key);
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url.toString());
    xhr.responseType = 'json';
    xhr.onload = function () {
        walkingRoutes = this.response;
        for (var i in walkingRoutes){
        
            names[walkingRoutes[i].id] = walkingRoutes[i].name;
      };
        
      renderWalkingOrders(walkingOrders); 
      maxPage = Math.floor(this.response.length / 10) + 1; 
      renderPagination();     
    }; 
    xhr.send();

        
    }; 
    xhr.send();
}

// Функция для установки атрибутов для всплывающих подсказок
function setAttributesForTooltip(cell, tooltipText) {
    // Отрисовка списка маршрутов в таблице
    cell.setAttribute("data-bs-toggle", "tooltip");
    cell.setAttribute("data-bs-placement", "top");
    cell.setAttribute("data-bs-custom-class", "custom-tooltip");
    cell.setAttribute("data-bs-title", tooltipText);
}


// Функция для отрисовки списка маршрутов
function renderWalkingRoutes(walkingRoutes, fromTo = [0, 9]) {
    const maxLetters = Math.floor(window.screen.width / 10);
    const walkingRoutesTbody = document.querySelector('.walking-routes-tbody');
    walkingRoutesTbody.innerHTML = "";
    for (let i = fromTo[0]; i <= fromTo[1]; i++) {
        const walkingRoute = walkingRoutes[i];
        let tableRow = document.createElement("tr");
        let rowName = document.createElement("td");
        let rowDescription = document.createElement("td");
        let rowMainObjects = document.createElement("td");
        let rowSelect = document.createElement("td");
        rowName.textContent = walkingRoute.name.length <= maxLetters ? walkingRoute.name : walkingRoute.name.slice(0, maxLetters) + "...";
        rowDescription.textContent = walkingRoute.description.length <= maxLetters ? walkingRoute.description : walkingRoute.description.slice(0, maxLetters) + "...";
        rowMainObjects.textContent = walkingRoute.mainObject.length <= maxLetters ? walkingRoute.mainObject : walkingRoute.mainObject.slice(0, maxLetters) + "...";
        rowSelect.innerHTML = `<button type="button" class="id-${walkingRoute.id} btn btn-walking-route btn-outline-warning px-5" onclick="location.href='#pagination-walking-routes';">Выбрать</button>`;
        setAttributesForTooltip(rowName, walkingRoute.name);
        setAttributesForTooltip(rowDescription, walkingRoute.description);
        setAttributesForTooltip(rowMainObjects, walkingRoute.mainObject);
        tableRow.appendChild(rowName);
        tableRow.appendChild(rowDescription);
        tableRow.appendChild(rowMainObjects);
        tableRow.appendChild(rowSelect);
        walkingRoutesTbody.appendChild(tableRow);
    }
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
}


// // Функция для отрисовки списка заявок
// function renderWalkingOrders(walkingOrders, fromTo = [0, 9]) {
//     console.log('hhhh')
//     const maxLetters = Math.floor(window.screen.width / 10);
//     const walkingOrdersTbody = document.querySelector('.walking-orders-tbody');
//     walkingOrdersTbody.innerHTML = "";
//     for (let i = fromTo[0]; i <= fromTo[1]; i++) {
//         const walkingOrder = walkingOrders[i];
//         let tableRow = document.createElement("tr");
//         let rowNum = document.createElement("td");
//         let rowName = document.createElement("td");
//         let rowDate = document.createElement("td");
//         let rowPrice = document.createElement("td");
//         let rowDo = document.createElement("td");
//         rowNum.textContent = 1;
//         rowName.textContent = walkingOrder.guide_id.length <= maxLetters ? walkingOrder.guide_id : walkingOrder.guide_id.slice(0, maxLetters) + "...";
//         rowDate.textContent = walkingOrder.date.length <= maxLetters ? walkingOrder.date : walkingOrder.date.slice(0, maxLetters) + "...";
//         rowPrice.textContent = walkingOrder.price.length <= maxLetters ? walkingOrder.price : walkingOrder.price.slice(0, maxLetters) + "...";
//         rowDo.innerHTML = `<button type="button" class="id-${walkingOrder.id} btn btn-walking-orders btn-outline-warning px-5" onclick="location.href='#pagination-walking-orders';">Выбрать</button>`;
//         setAttributesForTooltip(rowName, walkingOrder.duration);
//         setAttributesForTooltip(rowDate, walkingOrder.date);
//         setAttributesForTooltip(rowPrice, walkingOrder.price);
//         tableRow.appendChild(rowNum);
//         tableRow.appendChild(rowName);
//         tableRow.appendChild(rowDate);
//         tableRow.appendChild(rowPrice)
//         tableRow.appendChild(rowDo);
//         walkingOrdersTbody.appendChild(tableRow);
//     }
//     const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
//     const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
// }

function renderWalkingOrders(walkingOrders, fromTo = [0, 9]) {
    const walkingOrdersTbody = document.querySelector('.walking-orders-tbody');
    walkingOrdersTbody.innerHTML = "";
    
    // Create table headers
    const tableHeaders = ["№", "Название маршрута", "Дата", "Стоимость", "Действие"];
    let tableRow = document.createElement("tr");
    tableHeaders.forEach(headerText => {
        let header = document.createElement("th");
        header.textContent = headerText;
        tableRow.appendChild(header);
    });
    walkingOrdersTbody.appendChild(tableRow);

    for (let i = fromTo[0]; i <= fromTo[1]; i++) {
        const walkingOrder = walkingOrders[i];
        console.log(walkingOrder)
        tableRow = document.createElement("tr");

        let rowNumber = document.createElement("td");
        rowNumber.textContent = i + 1;
        tableRow.appendChild(rowNumber);

        let rowName = document.createElement("td");
        rowName.textContent = names[walkingOrder.route_id];
        tableRow.appendChild(rowName);

        let rowDate = document.createElement("td");
        rowDate.textContent = walkingOrder.date;
        tableRow.appendChild(rowDate);

        let rowPrice = document.createElement("td");
        rowPrice.textContent = walkingOrder.price;
        tableRow.appendChild(rowPrice);

        let rowAction = document.createElement("td");
        let selectButton = document.createElement("button");
        let selectButton2 = document.createElement("button");
        let selectButton3 = document.createElement("button");
        selectButton.type = "button";
        selectButton2.type = "button";
        selectButton3.type = "button";
        selectButton.className = `id-${walkingOrder.id} btn btn-walking-order btn-outline-warning px-3`;
        selectButton2.className = `id-${walkingOrder.id} btn btn-walking-order btn-outline-warning px-3`;
        selectButton3.className = `id-${walkingOrder.id} btn btn-walking-order btn-outline-warning px-3`;
        selectButton.textContent = "Просмотреть";
        selectButton3.addEventListener("click", ()=>{
            const result = confirm("Завершить выполнение программы?");
            if(result===true)
                deliteOrder(walkingOrder.id);
        });

        selectButton2.textContent = "Редактировать";
        selectButton3.textContent = "Удалить";
        selectButton.addEventListener('click', readOrder);
        selectButton2.addEventListener('click', chengeOrder);
        
        
        rowAction.appendChild(selectButton);
        rowAction.appendChild(selectButton2);
        rowAction.appendChild(selectButton3);
        tableRow.appendChild(rowAction);

        walkingOrdersTbody.appendChild(tableRow);
    }
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
}


// // Функция на удаление записи 
function deliteOrder(idOrder) {
    let url = new URL("http://exam-2023-1-api.std-900.ist.mospolytech.ru/api/orders/" + String(idOrder));
    url.searchParams.append('api_key', api_key);
    let xhr = new XMLHttpRequest();
    xhr.open('DELETE', url.toString());
    xhr.responseType = 'json';
    xhr.onload = function () {
        console.log('тим круууут!')
        window.location.reload();
    };
    xhr.send();
    
    
} 

// // Функция на просмотр записи 
function readOrder() {
    // window.location = '/Users/nataliatarasenko/Downloads/Exam2-/modal-window/modal-window.html'
    
    selectButton.addEventListener("click", ()=>{
    const result = confirm("Завершить выполнение программы?");
    if(result===true)
        console.log("Работа программы завершена");
    else
        console.log("Программа продолжает работать");
});
} 

// // Функция на редактирование записи 
function chengeOrder() {
    window.location = '/Users/nataliatarasenko/Downloads/Exam2-/modal-window/modal-window.html'
} 


// Функция для отрисовки пагинации
function renderPagination(fromTo = [1, 3]) {
    let pageOfPages = document.getElementsByClassName("page-of-pages")[0];
    pageOfPages.innerHTML = `Страница ${currentPage} из ${maxPage}`;
    let pagination = document.getElementsByClassName("pagination")[0];
    pagination.innerHTML = "";
    let previous = document.createElement("li");
    previous.classList.add("page-item", "previous-btn");
    previous.innerHTML = '<a class="page-link page-previous" href="#walking-routes">Предыдущая</a>';
    pagination.appendChild(previous);
    for (let page = fromTo[0]; page < fromTo[1] + 1; page++) {
        let pg = document.createElement("li");
        pg.classList.add("page-item");
        pg.innerHTML = `<a class="page-link page-${page}" href="#walking-routes">${page}</a>`;
        pagination.appendChild(pg);
    }
    let next = document.createElement("li");
    next.classList.add("page-item", "next-btn");
    next.innerHTML = '<a class="page-link page-next" href="#walking-routes">Следующая</a>';
    pagination.appendChild(next);
}


// Функция для добавления языков в выпадающее меню
function addLanguages() {
    let lng = [];
    const languageDropdownMenu = document.querySelector('#language-dropdown-menu');
    languageDropdownMenu.innerHTML = '';
    for (let i = 0; i <= guides.length; i++) {
        if (!guides[i])
            return;
        if (lng.includes(guides[i].language))
            continue;
        lng.push(guides[i].language);
        let rowLanguage = document.createElement("li");
        let rowLanguageA = document.createElement("a");
        rowLanguageA.classList.add('dropdown-item', `language-${guides[i].language}`);
        rowLanguageA.innerHTML = guides[i].language;
        rowLanguage.appendChild(rowLanguageA);
        languageDropdownMenu === null || languageDropdownMenu === void 0 ? void 0 : languageDropdownMenu.appendChild(rowLanguage);
    }
}


let guides;
// Функция для отрисовки гидов
function renderGuides(language = "", expFrom = 0, expTo = 999) {
    const guidesTbody = document.querySelector('.guides-tbody');
    guidesTbody.innerHTML = "";
    const guidesContainer = document.getElementById('guides-container');
    guidesContainer.classList.remove('d-none');
    for (let i = 0; i <= guides.length; i++) {
        const guide = guides[i];
        let tableRow = document.createElement("tr");
        let rowPhoto = document.createElement("td");
        let rowBio = document.createElement("td");
        let rowLanguages = document.createElement("td");
        let rowExpirience = document.createElement("td");
        let rowPricePerHour = document.createElement("td");
        let rowSelect = document.createElement("td");
        if (!guide) {
            const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
            const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
            addLanguages();
            return;
        }
        rowPhoto.innerHTML = '<i class="fa-solid fa-id-badge fa-3x"></i>';
        rowBio.textContent = guide.name;
        rowLanguages.textContent = guide.language;
        rowExpirience.textContent = String(guide.workExperience);
        rowPricePerHour.textContent = String(guide.pricePerHour);
        rowSelect.innerHTML = `<button type="button" class="id-${guide.id} btn btn-guides btn-outline-primary px-5" data-bs-toggle="modal" data-bs-target="#application-formalization-modal">Выбрать</button>`;
        setAttributesForTooltip(rowBio, guide.name);
        setAttributesForTooltip(rowLanguages, guide.language);
        setAttributesForTooltip(rowExpirience, String(guide.workExperience));
        setAttributesForTooltip(rowPricePerHour, String(guide.pricePerHour));
        tableRow.appendChild(rowPhoto);
        tableRow.appendChild(rowBio);
        tableRow.appendChild(rowLanguages);
        tableRow.appendChild(rowExpirience);
        tableRow.appendChild(rowPricePerHour);
        tableRow.appendChild(rowSelect);
        if (!language) {
            if (expFrom <= guide.workExperience) {
                if (expTo >= guide.workExperience)
                    guidesTbody.appendChild(tableRow);
            }
        }
        else if (guide.language.toLowerCase().includes(language)) {
            if (expFrom <= guide.workExperience) {
                if (expTo >= guide.workExperience)
                    guidesTbody.appendChild(tableRow);
            }
        }
    }
}


// Обработчик события для кнопок пагинации
function pageBtnHandler(event) {
    const target = event.target;
    const page = target.classList[1].slice(5);
    let fromTo;
    if (Number.isNaN(Number(page))) { // previous or next btn
        if (page == "previous") {
            if (currentPage == 1)
                fromTo = [(Number(currentPage) - 1) * 10, Number(currentPage) * 10 - 1];
            else {
                currentPage -= 1;
                fromTo = [(Number(currentPage) - 1) * 10, Number(currentPage) * 10 - 1];
            }
        }
        else if (page == "next") {
            if (currentPage == maxPage)
                fromTo = [(Number(currentPage) - 1) * 10, Number(currentPage) * 10 - 1];
            else {
                currentPage += 1;
                fromTo = [(Number(currentPage) - 1) * 10, Number(currentPage) * 10 - 1];
            }
        }
        else {
            console.log("Unknown pagination btn");
            fromTo = [0, 9];
        }
    }
    else {
        currentPage = Number(page);
        fromTo = [(Number(page) - 1) * 10, Number(page) * 10 - 1];
    }
    let pageOfPages = document.getElementsByClassName("page-of-pages")[0];
    pageOfPages.innerHTML = `Страница ${currentPage} из ${maxPage}`;
    if (currentPage == 1)
        renderPagination();
    else if (currentPage == maxPage)
        renderPagination([maxPage - 2, maxPage]);
    else
        renderPagination([currentPage - 1, currentPage + 1]);
    renderWalkingRoutes(walkingRoutes, fromTo);
}


// Обработчик события для поиска
function searchHandler() {
    const findRouteInput = document.getElementById('find-route-input');
    let wr = [];
    for (const route of walkingRoutes) {
        if (route.name.toLowerCase().includes(findRouteInput.value.toLowerCase())) {
            wr.push(route);
        }
    }
    renderWalkingRoutes(wr);
}


// Обработчик события для клавиши "Enter"
function handleEnterKey(event) {
    if (event.key === "Enter") {
        searchHandler();
    }
}


let routeId;
// Обработчик события для кнопки выбора маршрута(появление гидов)
function walkingRouteBtnHandler(event) {
    const guideExpFromInput = document.querySelector('#guide-exp-from-input');
    const guideExpToInput = document.querySelector('#guide-exp-to-input');
    const language = document.querySelector('.language-input');
    guideExpFromInput.value = "";
    guideExpToInput.value = "";
    language.value = "";
    const target = event.target;
    routeId = Number(target.classList[0].slice(3));
    const guidesRouteName = document.querySelector('.guides-route-name');
    for (const route of walkingRoutes) {
        if (route.id == routeId) {
            guidesRouteName.innerHTML = route.name;
        }
    }
    let url = new URL(`https://edu.std-900.ist.mospolytech.ru/api/routes/${routeId}/guides`);
    url.searchParams.append('api_key', api_key);
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url.toString());
    xhr.responseType = 'json';
    xhr.onload = function () {
        guides = this.response;
        renderGuides();
    };
    xhr.send();
}


let GuideId;
// Обработчик события для кнопки выбора гида
function GuideBtnHandler(event) {
    const target = event.target;
    GuideId = Number(target.classList[0].slice(3));
    let rt = {};
    let gd = {};
    for (const route of walkingRoutes) {
        if (route.id == routeId) {
            rt = route;
        }
    }
    for (const guide of guides) {
        if (guide.id == GuideId) {
            gd = guide;
        }
    }
    application = { walkingRoute: rt, giude: gd };
    const hoursNumber = document.querySelector('.modal-hour-input');
    const date = document.querySelector('.modal-date-input');
    const time = document.querySelector('.modal-time-input');
    const peopleCount = document.querySelector('.modal-people-count-input');
    const fast = document.querySelector('.modal-fast-checkbox');
    const transfer = document.querySelector('.modal-transfer-checkbox');
    hoursNumber.value = "";
    date.value = "";
    time.value = "";
    peopleCount.value = "";
    fast.checked = false;
    transfer.checked = false;
    applicationFormalizationHandler();
}


//ф-ция для обработки заявки
function applicationFormalizationHandler() {  
    const modalBio = document.querySelector('.modal-bio');
    modalBio.innerHTML = 'ФИО гида: ' + application.giude.name;
    const modalWalkingRouteName = document.querySelector('.modal-walking-route-name');
    modalWalkingRouteName.innerHTML = 'Название маршрута: ' + application.walkingRoute.name;
}
function modalHourBtnHandler(event) {
    const target = event.target;
    const input = document.querySelector('.modal-hour-input');
    let countHours = Number(target.classList[target.classList.length - 1].slice(11));
    input.value = "";
    input.value = String(countHours);
}


//функция обрабатывает данные из полей ввода в модальном окне.
function appFormModalHandler() { 
    const hoursNumber = document.querySelector('.modal-hour-input');
    const date = document.querySelector('.modal-date-input');
    const time = document.querySelector('.modal-time-input');
    const peopleCount = document.querySelector('.modal-people-count-input');
    const fast = document.querySelector('.modal-fast-checkbox');
    const transfer = document.querySelector('.modal-transfer-checkbox');
    let isThisDayOff = 1;
    let isItMorning = 0;
    let isItEvening = 0;
    let fastCoef = 1;
    let transferCoef = 1;
    let priceNumberOfVisitors = 0;
    if (new Date(date.value).getDay() in [0, 6] || String(new Date(date.value)) in
        ['2024-01-01', '2024-01-02', '2024-01-03', '2024-01-04', '2024-01-05', '2024-01-08', '2024-02-23', '2024-03-08', '2024-04-29',
            '2024-04-30', '2024-05-01', '2024-05-09', '2024-05-10', '2024-06-12', '2024-11-04', '2024-12-30', '2024-12-31'])
        isThisDayOff = 1.5;
    if (time.value >= '09:00' && time.value <= '12:00')
        isItMorning = 400;
    if (time.value >= '20:00' && time.value <= '23:00')
        isItEvening = 1000;
    if (Number(peopleCount.value) >= 1 && Number(peopleCount.value) < 5)
        priceNumberOfVisitors = 0;
    else if (Number(peopleCount.value) >= 5 && Number(peopleCount.value) < 10)
        priceNumberOfVisitors = 1000;
    else
        priceNumberOfVisitors = 1500;
    if (fast.checked)
        if (Number(peopleCount.value) >= 1 && Number(peopleCount.value) < 5)
            fastCoef = 1.15;
            if (Number(peopleCount.value) >= 5 && Number(peopleCount.value) <= 10)
                fastCoef = 1.25;
    if (transfer.checked) {
        if  (peopleCount.value) {
            transferCoef = Number(peopleCount.value);
        }
        else {
            transferCoef = 0;
        }
    }
    price = {
        guideServiceCost: application.giude.pricePerHour,
        hoursNumber: Number(hoursNumber.value),
        isThisDayOff: isThisDayOff,
        isItMorning: isItMorning,
        isItEvening: isItEvening,
        priceNumberOfVisitors: priceNumberOfVisitors,
        fastCoef: fastCoef,
        transferCoef: transferCoef,
    };
    updatePrice();
}


//функция вызывается при нажатии кнопки отправки заявки.
function modalBtnSendHandler() { 
    console.log('kok');
    if (!dataCorrectnessCheck()) {
        return;}
    console.log(sendData);
    let url = new URL("https://edu.std-900.ist.mospolytech.ru/api/orders");
    url.searchParams.append('api_key', api_key);
    let xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('POST', url);
    xhr.send(sendData);
    xhr.onload = () => {
        if (xhr.readyState == 4 && xhr.status == 200)
            appendAlert(`Заявка №${xhr.response.id} успешно создана`, 'success');
        else
            appendAlert(`Ошибка ${xhr.response.error}`, 'danger');
    };
}


//функция обновляет отображение итоговой стоимости экскурсии на веб-странице.
function updatePrice() {
    const finalPrice = document.querySelector('.modal-final-value');
    const fastCheckbox = document.querySelector('.modal-fast-checkbox');
    const transferCheckbox = document.querySelector('.modal-transfer-checkbox');
    const translateExtra = document.querySelector('.modal-option-fast-extra');
    const transferExtra = document.querySelector('.modal-option-transfer-extra');
    const peopleCount = document.querySelector('.modal-people-count-input');
    
    const базоваяСтоимость = price.guideServiceCost * price.hoursNumber * price.isThisDayOff + price.isItMorning + price.isItEvening + price.priceNumberOfVisitors;
    
    const fPrice = Math.round(базоваяСтоимость * price.fastCoef);

    if (fastCheckbox.checked && peopleCount.value) {
        if ((parseInt(peopleCount.value) >= 1) && (parseInt(peopleCount.value) < 5))
            translateExtra.innerHTML = `(${Math.round(базоваяСтоимость * 0.15)}₽)`;
        
        else 
            if ((parseInt(peopleCount.value) >= 5) && (parseInt(peopleCount.value) <= 10))
                translateExtra.innerHTML = `(${Math.round(базоваяСтоимость * 0.25)}₽)`;
            else
                translateExtra.innerHTML = "";
    }

    else
        translateExtra.innerHTML = "";

    if (transferCheckbox.checked && peopleCount.value) {
        const новаяСтоимость = базоваяСтоимость + (1000 * parseInt(peopleCount.value));
        finalPrice.innerHTML = 'Итоговая стоимость: ' + String(fPrice + (1000 * parseInt(peopleCount.value))) + "₽";
    } else {
        transferExtra.innerHTML = "";
        finalPrice.innerHTML = 'Итоговая стоимость: ' + String(fPrice) + "₽";
    }

    return fPrice;
}


//функция проверяет корректность введенных пользователем данных, таких как длительность экскурсии, дата, время, количество человек и другие параметры.
function dataCorrectnessCheck() { 
    let flag = true;
    const hoursNumber = document.querySelector('.modal-hour-input');
    const date = document.querySelector('.modal-date-input');
    const time = document.querySelector('.modal-time-input');
    const peopleCount = document.querySelector('.modal-people-count-input');
    const fast = document.querySelector('.modal-fast-checkbox');
    const transfer = document.querySelector('.modal-transfer-checkbox');
    if (!Number(hoursNumber.value)) {
        appendAlert(`Выбрано недопустимое значение длительности экскурсии! Доступные значения от 1 до 3 часов. Вы не выбрали длительность экскурсии.`, 'danger');
        flag = false;
    }
    else if (Number(hoursNumber.value) < 1 || Number(hoursNumber.value) > 3) {
        appendAlert(`Выбрано недопустимое значение длительности экскурсии! Доступные значения от 1 до 3 часов. Вы выбрали ${hoursNumber.value}.`, 'danger');
        flag = false;
    }
    const selectedDate = new Date(date.value);
    const newSelectedDate = String(selectedDate.getDate()).padStart(2, '0') + "." + String(selectedDate.getMonth() + 1).padStart(2, '0') + "." + selectedDate.getFullYear();
    const today = new Date();
    const newToday = String(today.getDate() + 1).padStart(2, '0') + '.' + String(today.getMonth() + 1).padStart(2, '0') + '.' + today.getFullYear();
    const oldToday = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate() + 1).padStart(2, '0');
    if (newSelectedDate == "NaN.NaN.NaN") {
        appendAlert(`Выбрана недопустимая дата экскурсии! Доступны даты с ${newToday} по 31.12.2024. Вы не выбрали дату.`, 'danger');
        flag = false;
    }
    else if (date.value < oldToday || date.value > "2024-12-31") {
        appendAlert(`Выбрана недопустимая дата экскурсии! Доступны даты с ${newToday} по 31.12.2024. Вы выбрали ${newSelectedDate}.`, 'danger');
        flag = false;
    }
    if (!time.value) {
        appendAlert(`Выбрано недопустимое время экскурсии! Доступное время с 09:00 до 23:00. Вы не выбрали время.`, 'danger');
        flag = false;
    }
    else if (time.value < "09:00" || time.value > "23:00") {
        appendAlert(`Выбрано недопустимое время экскурсии! Доступное время с 09:00 до 23:00. Вы выбрали ${time.value}.`, 'danger');
        flag = false;
    }
    if (!Number(peopleCount.value)) {
        appendAlert(`Выбрано недопустимое количество человек для экскурсии! Доступное количество от 1 до 20 человек. Вы не выбрали количество человек.`, 'danger');
        flag = false;
    }
    else if (Number(peopleCount.value) < 1 || Number(peopleCount.value) > 20) {
        appendAlert(`Выбрано недопустимое количество человек для экскурсии! Доступное количество от 1 до 20 человек. Вы выбрали ${peopleCount.value}.`, 'danger');
        flag = false;
    }
    sendData.append('guide_id', String(application.giude.id));
    sendData.append('route_id', String(application.walkingRoute.id));
    sendData.append('date', String(date.value));
    sendData.append('time', String(time.value));
    sendData.append('duration', String(hoursNumber.value));
    sendData.append('persons', String(peopleCount.value));
    sendData.append('price', String(updatePrice()));
    sendData.append('optionFirst', fast.checked ? '1' : '0');
    sendData.append('optionSecond', transfer.checked ? '1' : '0');
    return flag;
}

// обработчик события для выбора языка гида (ставит язык)
function languageBtnHandler(event) {
    const target = event.target;
    const input = document.querySelector('.language-input');
    const guideExpFromInput = document.querySelector('#guide-exp-from-input');
    const guideExpToInput = document.querySelector('#guide-exp-to-input');
    let language = target.classList[target.classList.length - 1].slice(9);
    input.value = "";
    input.value = String(language);
    if (Number(guideExpFromInput.value) >= 0 && Number(guideExpToInput.value) >= 0) {
        let from = Number(guideExpFromInput.value) ? Number(guideExpFromInput.value) : 0;
        let to = Number(guideExpToInput.value) ? Number(guideExpToInput.value) : 999;
        renderGuides(language.toLowerCase(), from, to);
    }
}

// обработчик события для ввода параметров гида (показывает выбор гида)
function guideInputHandler(event) {
    const guideExpFromInput = document.querySelector('#guide-exp-from-input');
    const guideExpToInput = document.querySelector('#guide-exp-to-input');
    const language = document.querySelector('.language-input');
    if (Number(guideExpFromInput.value) >= 0 && Number(guideExpToInput.value) >= 0) {
        let from = Number(guideExpFromInput.value) ? Number(guideExpFromInput.value) : 0;
        let to = Number(guideExpToInput.value) ? Number(guideExpToInput.value) : 999;
        renderGuides(language.value.toLowerCase(), from, to);
    }
}

// Загрузка на страницу
window.onload = function () {
    var _a;
    walkingRoutesHandler();
    const paginationElement = document.querySelector('.pagination');
    if (paginationElement)
        paginationElement.onclick = pageBtnHandler;
    const findRouteBtn = document.getElementById('find-route-btn');
    findRouteBtn === null || findRouteBtn === void 0 ? void 0 : findRouteBtn.addEventListener("click", searchHandler);
    const findRouteInput = document.getElementById('find-route-input');
    findRouteInput === null || findRouteInput === void 0 ? void 0 : findRouteInput.addEventListener("input", searchHandler);
    findRouteBtn === null || findRouteBtn === void 0 ? void 0 : findRouteBtn.addEventListener("keydown", handleEnterKey);
    const walkingRouteBtn = document.querySelector('.walking-routes-tbody');
    if (walkingRouteBtn)
        walkingRouteBtn.onclick = walkingRouteBtnHandler;
    const GuideBtn = document.querySelector('.guides-tbody');
    if (GuideBtn)
        GuideBtn.onclick = GuideBtnHandler;
    const modalHourBtn = document.querySelector('.modal-hour-dropdown-menu');
    if (modalHourBtn)
        modalHourBtn.onclick = modalHourBtnHandler;
    const appFormModal = document.querySelector('#application-formalization-modal');
    if (appFormModal)
        appFormModal.onclick = appFormModalHandler;
    const modalBtnSend = document.querySelector('.modal-btn-send');
    if (modalBtnSend)
        modalBtnSend.onclick = modalBtnSendHandler;
    const languageBtn = document.querySelector('#language-dropdown-menu');
    if (languageBtn)
        languageBtn.onclick = languageBtnHandler;
    const guideExpFromInput = document.querySelector('#guide-exp-from-input');
    if (guideExpFromInput)
        guideExpFromInput.oninput = guideInputHandler;
    const guideExpToInput = document.querySelector('#guide-exp-to-input');
    if (guideExpToInput)
        guideExpToInput.oninput = guideInputHandler;
    const languageInput = document.querySelector('.language-input');
    if (languageInput)
        languageInput.oninput = guideInputHandler;
    (_a = document.getElementById('application-formalization-modal')) === null || _a === void 0 ? void 0 : _a.addEventListener('hidden.bs.modal', function () {
        window.location.hash = '#header';
    });
};

walkingOrderHandler()