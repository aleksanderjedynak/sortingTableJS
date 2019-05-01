var URL = 'https://jsonplaceholder.typicode.com/users';
let headTab = document.getElementsByClassName('headTab')[0];
let mainTab = document.getElementsByClassName('mainTab')[0];
let tabName = document.createDocumentFragment();
let colTab = document.createDocumentFragment();

function getUser(url){
     fetch(url)
        .then(response => response.json())
         .then(json => getUserTable(json))
}

function getUserTable(users) {
    let arrThead = [];
    for (const user of users) {
        for (const key in user) {
            if (user.hasOwnProperty(key)) {
                if (arrThead.indexOf(key)===-1){
                    arrThead.push(key);
                }
            }
        }
        getTbodyUserTable(user);
    }
    getTheadUserTable(arrThead);
    addTable();
}

function addTable(){
    let tr = document.createElement('tr');
    headTab.appendChild(tr).appendChild(tabName);
    mainTab.appendChild(colTab);
}

function getTheadUserTable(head){
    for (const element of head) {
        const th = document.createElement('th');
        th.appendChild(document.createTextNode(element));
        tabName.appendChild(th);
    }
}

function getTbodyUserTable(elems){
    let tr = document.createElement('tr');
    for (const elem in elems) {
        const td = document.createElement('td');
        if (typeof (elems[elem]) === 'object' ){
            let elemDeep = [];
            for (const details in elems[elem]) {
                if (typeof (elems[elem][details]) === 'object') {
                    continue;
                }
                elemDeep.push(elems[elem][details])
            }
            elems[elem] = elemDeep;
        }
        td.appendChild(document.createTextNode(elems[elem]));
        tr.appendChild(td)
    }
    colTab.appendChild(tr);
}

//start app
getUser(URL);
