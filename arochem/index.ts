import fetch from "./fetch";

import { load } from "cheerio";
import { Attar, scrape_attars } from "./scrape";

export const BASE_URL = "https://arochem.com";

const html = await fetch(BASE_URL);

const $ = load(html);

const attar_sections = $('.grid.grid--center');

type Section = string

type Sections = Record<string, string[]>;

let section_links: Sections = {};


const data: Record<Section,Attar[]>[] = [];


for (const sections of attar_sections[0].children) {
    let names = $(sections).children();
    let section_name = $(names[0]).text();

    let section = [];

    for (const name of names.splice(1)) {
        let link = $(name).children().attr('href');
        section.push(link);
    }
    section_links[section_name.trim()] = section;
}

for (const keys of Object.keys(section_links)) {
    data.push({[keys]: await scrape_attars(section_links[keys])});
}

console.log(data);