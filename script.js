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

function sortBy(event){
    let target = event.target;
    let index = target.cellIndex;
    let tabRow = document.querySelectorAll('.mainTab tr');
    let nodesArray = [].slice.call(tabRow);
    let order = (target.className ==="" || target.className === "desc") ? "asc" : "desc";
    nodesArray.sort(function(a, b){
        let prev = a.children[index].textContent;
        let next = b.children[index].textContent;
        
        if (index === 0) {
            return order === "asc" ? prev - next : next - prev;
        } else if (prev < next) {
            return order === "asc" ? -1 : 1;
        } else if (prev > next) {
            return order === "asc" ? 1 : -1;
        }else{
            return 0;
        }
    })
    nodesArray.forEach(newItem => {
        colTab.appendChild(newItem) 
    });
    Object.entries(target.parentElement.children).forEach(([key, value]) => {
        return key !== index ? value.className = "" : null;
    });
    target.className = order;
    mainTab.appendChild(colTab);
}

function getTheadUserTable(head){
    for (const element of head) {
        const th = document.createElement('th');
        th.appendChild(document.createTextNode(element));
        th.addEventListener("click", sortBy, false);
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
