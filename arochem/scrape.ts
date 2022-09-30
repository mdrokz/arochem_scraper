import { load } from "cheerio";
import { BASE_URL } from ".";
import fetch from "./fetch";

export const scrape_attars = async (section_links: string[]) => {

    for(const section_link of section_links) {
        const html = await fetch(`${BASE_URL}${section_link}`);
        const $ = load(html);

        const attar_links = $('.grid-product__link>div>a').map(function(i,el) {return $(this).attr('href')}).toArray();

        for(const attar_link of attar_links) {
            if(attar_link) {
                const html = await fetch(`${BASE_URL}${attar_link}`);
                const $ = load(html);
    
                const description = $('.rte').text();
    
                console.log(description);
            }
        }
    }

};