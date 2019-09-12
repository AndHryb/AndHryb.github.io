"use strict"
var formDef1 = [
    {label:'Название Сайта',kind:'longtext',name:'sitename'},
    {label:'URL сайта',kind:'longtext',name:'siteurl'},
    {label:'Посетителей в сутки',kind:'number',name:'visitors'},
    {label:'E-mail для связи',kind:'shorttext',name:'email'},
    {label:'Рубрика каталога',kind:'combo',name:'divisions',
        variants:[{text:'здоровье',value:1},{text:'домашний уют',value:2},{text:'бытовая техника',value:3}]},
    {label:'Размещение',kind:'radio',name:'payment',
        variants:[{text:'бесплатное',value:1},{text:'платное',value:2},{text:'VIP',value:3}]},
    {label:'Разрешить отзывы',kind:'check',name:'votes'},
    {label:'Описание сайта',kind:'memo',name:'description'},
    {label:'Опубликовать',kind:'submit'}
];
var formDef2 = [
    {label:'Фамилия',kind:'longtext',name:'Lastname'},
    {label:'Имя',kind:'longtext',name:'firsname'},
    {label:'Отчество',kind:'longtext',name:'secondname'},
    {label:'Возраст',kind:'number',name:'age'},
    {label:'Зарегестрироваться',kind:'submit'}
];
var form1 = document.getElementById('form_1');
var form2 = document.getElementById('form_2');
var formBuld = function(formDef,formElem){
    for(var i=0;i< formDef.length;i++){
        var elemDef= formDef[i];
        switch(elemDef.kind){
            case 'longtext':
                var container = document.createElement('div');
                var label = document.createElement('label');
                label.textContent = elemDef.label + ': ';
                var input = document.createElement('input');
                input.type = 'text';
                input.name = elemDef.name;
                formElem.appendChild(container);
                container.appendChild(label);
                container.appendChild(input);
            break;

           case'shorttext':
                var container = document.createElement('div');
                var label = document.createElement('label');
                label.textContent = elemDef.label + ': ';
                var input = document.createElement('input');
                input.type = 'text';
                input.name = elemDef.name;
                formElem.appendChild(container);
                container.appendChild(label);
                container.appendChild(input);
            break;

            case 'number':
                var container = document.createElement('div');
                var label = document.createElement('label');
                label.textContent = elemDef.label + ': ';
                var input = document.createElement('input');
                input.type = 'number';
                input.name = elemDef.name;
                formElem.appendChild(container);
                container.appendChild(label);
                container.appendChild(input);
            break;

            case 'combo':
                var container = document.createElement('div');
                var label = document.createElement('label');
                label.textContent = elemDef.label + ': ';
                var select = document.createElement('select');
                select.name = elemDef.name;
                formElem.appendChild(container);
                container.appendChild(label);
                container.appendChild(select);
                for (var j=0;j<elemDef.variants.length;j++) {
                        var totalVariant = elemDef.variants[j];
                        var option = document.createElement('option');
                        option.textContent = totalVariant.text + ' ';
                        option.value = totalVariant.value;
                        select.appendChild(option);
                }
            break;

            case 'radio':
                var container = document.createElement('div');
                var label = document.createElement('label');
                label.textContent = elemDef.label + ': ';
                formElem.appendChild(container);
                container.appendChild(label);

                for (var j=0;j<elemDef.variants.length;j++) {
                    var totalVariant = elemDef.variants[j];
                    var input = document.createElement('input');
                    var inputWrapper = document.createElement('span')
                    input.name = elemDef.name;
                    input.type = 'radio';
                    input.value = totalVariant.value;
                    inputWrapper .textContent = totalVariant.text + ' ';
                    container.appendChild(inputWrapper );
                    inputWrapper .appendChild(input);
                }
            break;

            case 'check':
                var container = document.createElement('div');
                var label = document.createElement('label');
                label.textContent = elemDef.label + ': ';
                var input = document.createElement('input');
                input.type = 'checkbox';
                input.name = elemDef.name;
                formElem.appendChild(container);
                container.appendChild(label);
                container.appendChild(input);
            break;

            case 'memo':
                var container = document.createElement('div');
                var label = document.createElement('label');
                label.textContent = elemDef.label + ': ';
                var input = document.createElement('input');
                input.type = 'text';
                input.name = elemDef.name;
                formElem.appendChild(container);
                container.appendChild(label);
                container.appendChild(input);
            break;

            case 'submit':
                var container = document.createElement('div');
                var input = document.createElement('input');
                input.type = 'submit';
                input.value = elemDef.label;
                formElem.appendChild(container);
                container.appendChild(input);
            break;

        }
    }
}

formBuld(formDef1,form1);
formBuld(formDef2,form2);
