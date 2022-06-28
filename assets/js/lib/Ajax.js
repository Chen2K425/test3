export default async function(url = '', m = 'GET', data = null) {
    let opt = {
        method: m,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'dataType' : 'application/json',
            'Content-Type': 'application/json',
        },
    };
    const token = sessionStorage.getItem('token');
    if (token){
        opt.headers['Authorization'] ='Bearer '+ token;
    }
    if (data !== null) {
        opt.body = JSON.stringify(data);
    }
    if (url == 'http://23.21.91.213/api/accregi') {
        // opt.first('mode: no-cors');
        // opt += "'mode: no-cors',";
        opt.mode = 'no-cors';
    }

    console.log(opt);
    const response = await fetch(url, opt);
    console.log(response);
    return response.json();
}
