import localforage from 'localforage';
import Ajax from './util/Ajax';

(function(){
    var month_picker = document.querySelector('.datepicker__month'),
        teasers = document.querySelector('.teasers'),
        date={},
        loading_spinner = '<div class="uil-ring-css" style="transform:scale(0.69);"><div></div></div>';

    (function set_max_date(input){
        let today = new Date();
        let year = today.getFullYear();
        let month = today.getMonth()+1;
        let mth_leading_zero = month < 10 ? `0${month}` : `${month}`;
        input.setAttribute('max', `${year}-${mth_leading_zero}`);
    })(month_picker);

    function render_teasers(item){
        let headline = item.headline.main;
        let link = item.web_url;
        let snippet = item.snippet;
        let pub_date = new Date(item.pub_date);
        let keywords = {get values(){
            let kws = [];
            for(let j of item.keywords){
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

    function assign_date(){
        let raw_date = month_picker.value,
            date_str = raw_date.split('-');
        date.year = date_str[0];
        date.month = parseInt(date_str[1], 10); // strip leading zero
    }

    document.querySelector('.datepicker').addEventListener('submit', function(e){
        e.preventDefault();
        assign_date();
        if (month_picker.value){
            teasers.innerHTML='';
            teasers.insertAdjacentHTML('afterbegin', loading_spinner);
            localforage.keys()
                .then(keys => {
                    if (keys.indexOf(month_picker.value) > -1) {
                        teasers.innerHTML='';
                        localforage.getItem(month_picker.value)
                            .then(items => items.map(render_teasers));
                    } else {
                        return new Promise ((resolve, reject) =>    {
                            Ajax.post('/', date)
                            .then(response => {
                                teasers.innerHTML='';
                                return JSON.parse(response);
                            })
                            .then(parsed => {
                                let storageObject = [],
                                    items = parsed.response.docs;
                                items.map(item => {
                                    let { headline, web_url, snippet, pub_date, keywords } = item;
                                    storageObject.push(
                                        { headline: headline,
                                            web_url: web_url,
                                            snippet: snippet,
                                            pub_date: pub_date,
                                            keywords: keywords
                                        });
                                });
                                return storageObject;
                            })
                            .then(storageObject => {
                                localforage.setItem(month_picker.value, storageObject);
                                resolve(storageObject.map(render_teasers));
                            })
                            .catch(err => {
                                console.error('Error resolving request: ', err);
                                reject(err);
                            });
                        });
                    }
                })
                .catch(err => {
                    console.error('Error retrieving teaser data: ', err);
                });
        }
    });
})();
