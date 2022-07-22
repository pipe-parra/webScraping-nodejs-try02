const PORT = 8000;
const axios = require('axios');
const cheerio = require('cheerio');
const { each } = require('cheerio/lib/api/traversing');
const express = require('express');

const app = express()

const url = 'https://www.theguardian.com/uk'; //es la pagina que escogi para realizar el web scraping

axios(url)
    .then(response => {
        const html = response.data
        // console.log(html);  probando si envia la data theguardian
        const $ = cheerio.load(html)

        const articles = [];   //aqui creo el array vacio [ara introducir los articulos] 
        $('.fc-item__title', html).each(function(){   //debvo actualizar la etiqueta que corresponda en la actualidad
            const title = $(this).text
            const url = $(this).find('a').attr('href')
            articles.push({
                title,
                url
            })    
        })
        console.log(articles);
    }).catch(err => console.log(err))

app.listen(PORT, ()=>console.log(`server running on PORT ${PORT}`));

