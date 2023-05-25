const fs = require('fs');
const http = require('http');
const url = require('url');

////////////////////////////////////
//SERVER


const tempOverview = fs.readFileSync(`${__dirname}/starter/templates/overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/starter/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/starter/templates/template-product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/starter/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const replaceTemplate = (temp, product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENT%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);
    
    if (!product.organic) {
        output = output.replace(/{%NOT-ORGANIC%}/g, 'not-organic');
    }
    return output;
}


const server = http.createServer((req,res) => {
    console.log(req.url);


    const pathName = req.url;

    //Overview page
    if (pathName === '/' || pathName === '/overview') {
        res.writeHead(200, {'Content-Type': 'text/html'});

        const cards = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
        const output = tempOverview.replace('{%CARDS%}', cards);

        res.end(output);
    } 
    
    
    //product page
    else if (pathName === '/product'){
        res.end('This is the product page');
    } 
    
    //api page
    else if (pathName === '/api'){
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(data);
    } 
    
    //not found
    else {
        res.writeHead(404), {
            'Content-Type': 'text/html',
            'my-own-header' : 'hello-world'
        };
        res.end('<h1>page not found</h1>')
    }

    // res.end('hello from the server');
});

server.listen(8000, '127.0.0.1', () => {
    console.log('server is running on port 8000!');
});

////////////////////////////////////















// const textIn = fs.readFileSync('./starter/txt/input.txt','utf-8');
// console.log(textIn);

// fs.readFile('./starter/txt/input.txt','utf-8', (err, data) => console.log(data));
// console.log('reading file...');

// const textOut = `This is what we know about avocado ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync('./starter/txt/output.txt',textOut);
// console.log('file written');