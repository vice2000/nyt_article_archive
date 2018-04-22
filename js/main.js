(function(){
    var month_picker = document.querySelector('.datepicker__month'),
        teasers = document.querySelector('.teasers'),
        date={},
        docs = [],
        msg,
        loading_spinner = '<div class="uil-ring-css" style="transform:scale(0.69);"><div></div></div>',
        localforage = require('localforage');

    (function set_max_date(input){
        let today = new Date();
        let year = today.getFullYear();
        let month = today.getMonth()+1;
        let mth_leading_zero = month < 10 ? `0${month}` : `${month}`;
        input.setAttribute('max', `${year}-${mth_leading_zero}`);
    })(month_picker);

    function render_teasers(){
        for (let i = 0, len = docs.length; i < len; i+=1){
            let headline = docs[i].headline.main;
            let link = docs[i].web_url;
            let snippet = docs[i].snippet;
            let pub_date = new Date(docs[i].pub_date);
            let keywords = {get values(){
                let kws = [];
                for(let j of docs[i].keywords){
                    kws.push(j.value);
                }
                return kws.join(' | ');
            }};
            let teaser = `<article>
                          <h2><a href="${link}">${headline}</a></h2>
                          <small>${pub_date.getFullYear()}-${pub_date.getMonth()+1}-${pub_date.getDate()}</small>
                          <p>${snippet}</p>
                          <small>${keywords.values}<small>
                          </article>`;
            teasers.insertAdjacentHTML('afterbegin', teaser);
        }
    }

    function assign_date(){
        let raw_date = month_picker.value,
            date_str = raw_date.split('-');
        date.year = date_str[0];
        date.month = parseInt(date_str[1], 10); // strip leading zero
    }

    document.querySelector('.datepicker').addEventListener('submit', function(e){
        e.preventDefault();
        assign_date();
        let req_headers = new Headers();
        req_headers.append('Content-Type', 'application/json');
        let date_json = JSON.stringify(date);
        let request = new Request('/', {method: 'POST', headers: req_headers, body: date_json });
        if (month_picker.value){
            teasers.innerHTML='';
            teasers.insertAdjacentHTML('afterbegin', loading_spinner);
            localforage.keys()
                .then(keys => {
                    if (keys.indexOf(month_picker.value) > -1) {
                        localforage.getItem(month_picker.value)
                            .then(item => {docs = item;})
                            .then(() => {render_teasers();});
                    } else {
                        fetch(request).then(function(response) {
                            if (response.status === 200){
                                return response.json().then(function(json) {
                                    docs = json;
                                    localforage.setItem(`${month_picker.value}`, docs);
                                }).then(function(){
                                    teasers.innerHTML='';
                                    render_teasers();
                                });
                            } else {
                                return response.json().then(function(json){
                                    msg = json.message;
                                }).then(function(){
                                    teasers.innerHTML=`<h1>${response.status} ${response.statusText}</h1><p>${msg}</p>`;
                                });
                            }
                        });
                    }
                })
                .catch(err => { console.error(`Error retrieving data to render teasers: ${err}`);});
        }
    });
})();
