"use strict"
var formObj = document.forms.my_form;
function devValid(focusWhenError) {
    var devElem = formObj.elements.developers;
    var devValue = devElem.value;
    var devErr = document.getElementById('dev_err');
    if (devValue){
        devErr.textContent = '';
        return true;
    } else {
        devErr.textContent = 'Заполните это поле';
        if (focusWhenError) {
            devElem.focus();
        }
        return false;
    }
}
document.forms.my_form.elements.developers.addEventListener('blur',function(EO){ devValid(false);});

function nameValid(focusWhenError) {
    var nameElem = formObj.elements.site_name;
    var nameValue = nameElem.value;
    var nameErr = document.getElementById('name_err');
    if (nameValue){
        nameErr.textContent = '';
        return true;
    } else {
        nameErr.textContent = 'Заполните это поле';
        if (focusWhenError) {
            nameElem.focus();
        }
        return false;
    }
}
document.forms.my_form.elements.site_name.addEventListener('blur',function(EO){ nameValid(false);});

function urlValid(focusWhenError) {
    var urlElem = formObj.elements.site_url;
    var urlValue = urlElem.value;
    var urlErr = document.getElementById('url_err');
    if (urlValue){
        urlErr.textContent = '';
        return true;
    } else {
        urlErr.textContent = 'Заполните это поле';
        if (focusWhenError) {
            urlElem.focus();
        }
        return false;
    }
}
document.forms.my_form.elements.site_url.addEventListener('blur',function(EO){ urlValid(false);});

function dateValid(focusWhenError) {
    var dateElem = formObj.elements.date_start;
    var dateValue = dateElem.value;
    var date =  dateValue.split('-');
    var currentDate = new Date();
    var enteredDate = new Date(date[0],(date[1]-1),date[2]);
    var timeForFillOut = 86400000;
    var dateErr = document.getElementById('date_err');
    if (enteredDate.getTime()>(currentDate.getTime()-timeForFillOut || dateValue )){
        dateErr.textContent = '';
        return true;
    } else {
        dateErr.textContent = 'Заполните коректно дату';
        if (focusWhenError) {
            dateElem.focus();
        }
        return false;
    }
}
document.forms.my_form.elements.date_start.addEventListener('blur',function(EO){ dateValid(false);});

function visitorsValid(focusWhenError) {
    var visitorsElem = formObj.elements.visitors;
    var visitorsValue = visitorsElem.value;
    var visitorsErr = document.getElementById('visitors_err');
    if (visitorsValue>=0&&visitorsValue!==''){
        visitorsErr.textContent = '';
        return true;
    } else {
        if (visitorsValue < 0) {
            visitorsErr.textContent = 'Количество посетителей,не может быть отрицательным';
        } else {
        visitorsErr.textContent = 'Заполните это поле';
        };
        if (focusWhenError) {
            visitorsElem.focus();
        }
        return false;
    }
}
document.forms.my_form.elements.visitors.addEventListener('blur',function(EO){ visitorsValid(false);});

function emailValid(focusWhenError) {
    var emailElem = formObj.elements.email;
    var emailValue = emailElem.value;
    var isEmail =  emailValue.indexOf('@');
    var emailErr = document.getElementById('email_err');
    if (emailValue && isEmail !== -1){
        emailErr.textContent = '';
        return true;
    } else {
        emailErr.textContent = 'Введите адрес электронной почты';
        if (focusWhenError) {
            emailElem.focus();
        }
        return false;
    }
}
document.forms.my_form.elements.email.addEventListener('blur',function(EO){ emailValid(false);});

function catalogValid(focusWhenError) {
    var catalogElem = formObj.elements.catalog_item;
    var catalogValue = catalogElem.value;
    var catalogErr = document.getElementById('catalog_err');
    if (catalogValue && catalogValue !=='0'){
        catalogErr.textContent = '';
        return true;
    } else {
        catalogErr.textContent = 'Выберете элемент из списка';
        if (focusWhenError) {
            catalogElem.focus();
        }
        return false;
    }
}
document.forms.my_form.elements.catalog_item.addEventListener('blur',function(EO){ catalogValid(false);});

function placementValid(focusWhenError) {
    var placementElem = formObj.elements.placement[0];
    var isChecked = false;
    for(var i=0;i<formObj.elements.placement.length;i++){
        if(formObj.elements.placement[i].checked){
            isChecked = true;
        }
    }

    var placementErr = document.getElementById('placement_err');
    if (formObj.elements.placement[1].checked||formObj.elements.placement[2].checked){
        placementErr.textContent = '';
        return true;
    } else if(formObj.elements.placement[0].checked) {
        placementErr.textContent = 'Бесплатное размещение не доступно для вашего аккаунта';
        if (focusWhenError) {
            placementElem.scrollIntoView();
        }
        return false;
    } else if(!isChecked) {
        placementErr.textContent = 'Выберите элемент';
        if (focusWhenError) {
            placementElem.scrollIntoView();
        }
        return false;
    }
}
for(var i=0;i<document.forms.my_form.elements.placement.length;i++){
    document.forms.my_form.elements.placement[i].addEventListener('change',function(EO){ placementValid(false);});
}


function feedBackValid(focusWhenError) {
    var feedBackElem = formObj.elements.feedback;
    var feedBackErr = document.getElementById('feedback_err');
    if (feedBackElem.checked){
        feedBackErr.textContent = '';
        return true;
    } else {
        feedBackErr.textContent = 'Разрешите отзывы';
        if (focusWhenError) {
            feedBackElem.scrollIntoView();
        }
        return false;
    }
}
document.forms.my_form.elements.feedback.addEventListener('change',function(EO){ feedBackValid(false);});

function descriptionValid(focusWhenError) {
    var descriptionElem = formObj.elements.description;
    var descriptionValue = descriptionElem.value;
    var descriptionErr = document.getElementById('description_err');
    if (descriptionValue){
        descriptionErr.textContent = '';
        return true;
    } else {
        descriptionErr.textContent = 'Заполните это поле';
        if (focusWhenError) {
            descriptionElem.focus();
        }
        return false;
    }
}
document.forms.my_form.elements.description.addEventListener('blur',function(EO){ descriptionValid(false);});

document.forms.my_form.onsubmit = function (EO){
    var okValid = true;
    okValid = devValid(okValid) && okValid;
    okValid = nameValid(okValid) && okValid;
    okValid = urlValid(okValid) && okValid;
    okValid = dateValid(okValid) && okValid;
    okValid = visitorsValid(okValid) && okValid;
    okValid = emailValid(okValid)&& okValid;
    okValid = catalogValid(okValid) && okValid;
    okValid = placementValid(okValid) && okValid;
    okValid = feedBackValid(okValid) && okValid;
    okValid = descriptionValid(okValid) && okValid;
    if(!okValid){
        EO.preventDefault()
    }
}

