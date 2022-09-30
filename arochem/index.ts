import fetch from "./fetch";

import * as cheerio from "cheerio";

const BASE_URL = "arochem.com";

const html = await fetch(BASE_URL);

const $ = cheerio.load(html);

const attar_sections = $('.grid.grid--center');

type Section = Record<string,string[]>;

let section_links: Section[] = [];


for (const sections of attar_sections[0].children) {
    let names = $(sections).children();
    let section_name = $(names[0]).text();

    let section = [];
    
    for(const name of names.splice(1)) {
        let link = $(name).children().attr('href');
        section.push(link);
    }
    section_links.push({[section_name.trim()]: section});
}

console.log(section_links);