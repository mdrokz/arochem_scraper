import fetch from "./fetch";

import { load } from "cheerio";
import { Attar, scrape_attars } from "./scrape";

import { writeFileSync } from "fs";

export const BASE_URL = "https://arochem.com";

const html = await fetch(BASE_URL);

const $ = load(html);

const attar_sections = $('.grid.grid--center');

type Section = string

type Sections = Record<string, string[]>;

let section_links: Sections = {};

type Data = Record<string, Attar[]> & { id: number };

const data: Data[] = [];


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
    // generate random number
    let id = Math.floor(Math.random() * section_links[keys].length);
    try {
        data.push(Object.assign({ "id": id }, { [keys]: await scrape_attars(section_links[keys]) }))
    } catch(e) {
        console.error(e);
    }
}

writeFileSync("arochem.json", JSON.stringify(data, null, 2));