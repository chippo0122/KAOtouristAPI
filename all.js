var xhr = new XMLHttpRequest();
var change = document.getElementById('select');
var opList = document.querySelector('.output-list');
var page = document.querySelector('.pagination');
var hot = document.querySelector('.hot-sec');
var data;
xhr.open('get', 'https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json', true);
xhr.send(null);
xhr.onload = function(e){
    data = JSON.parse(xhr.responseText).result.records;
    init();
}
change.addEventListener('change', selectZone, false);
hot.addEventListener('click', hotSecCheck, false);
function init(){
    document.querySelector('.district-top').textContent = '全部區域';
    page.classList.remove('d-none');
    write(data);
};
function hotSecCheck(e){
    if(e.target.nodeName === 'A'){
        selectZone(e.target.innerText, 'hot-sec');
    }
}
function selectZone(value , permit){
    let zone = change.value;
    if(permit === 'hot-sec'){
        zone = value;
    }
    let zoneList = [];
    if(zone==="0"){
        init();
        return;
    }
    for(let i=0 ; i< data.length; i++){
        if(data[i].Zone === zone){
            zoneList.push(data[i]);
        }
    }
    document.querySelector('.district-top').textContent = zone;
    write(zoneList);
};
function write(dataSelect){
    let str = [];
    let dataPg = pagination(dataSelect);
    for(let i = 0 ; i < dataPg.length ; i++){
        let collector = '';
        for(let j = 0; j < dataPg[i].length; j++){
            collector += '<li class="card">'+
            '<img class="card-img-top" src="' + dataPg[i][j].Picture1 + '" alt="' + dataPg[i][j].Picdescribe1 + '">'+
            '<div class="card-body position-relative">'+
                '<h4 class="tour-spot position-absolute text-light fs-3">' +  dataPg[i][j].Name + '</h4>'+
                '<p><img class="icon" src="helpers/assets/icons_clock.png" alt="">'+
                    '<span class="open-time">' +  dataPg[i][j].Opentime + '</span></p>'+
                '<p><img class="icon" src="helpers/assets/icons_tag.png" alt="">'+
                    '<span class="address">' +  dataPg[i][j].Add + '</span></p>'+                       
                '<p><img class="icon" src="helpers/assets/icons_phone.png" alt=""><span class="phone">' + dataPg[i][j].Tel + '</span></p></div></li>';
        }
        str.push(collector);
    }
    opList.innerHTML = str[0];
    //for adjust pagination
    if(dataPg.length <= 1){
        page.classList.add('d-none');
    }
    page.addEventListener('click', function(e){
        if(e.target.nodeName === 'A'){
            let page = Number(e.target.dataset.page) - 1;
            opList.innerHTML = str[page];
        }
    })
};
function pagination(arr){
    let page = 12;
    let sector = [];
    for(let i =0 ; i<arr.length; i++){
        let item = parseInt(i/page);
        if(i%page === 0){
            sector.push([]);
        };
        sector[item].push(arr[i]);
    }
    return sector;
};

