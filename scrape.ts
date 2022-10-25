import { load } from "cheerio";
import { BASE_URL } from ".";
import fetch from "./fetch";

export type Attar = { name: string, section: string, description: string };

export const scrape_attars = async (section_links: string[]): Promise<Attar[]> => {

    const attar: Attar[] = [];

    for (const section_link of section_links) {
        const split = section_link.split('/');
        const section_name = split[split.length - 1];
        const html = await fetch(`${BASE_URL}${section_link}`);
        const $ = load(html);

        const attar_links = $('.grid-product__link>div>a').map(function (_i, _el) { return $(this).attr('href') }).toArray();

        for (const attar_link of attar_links) {
            if (attar_link) {
                const split = attar_link.split('/')
                const name = split[split.length - 1];
                const html = await fetch(`${BASE_URL}${attar_link}`);
                const $ = load(html);

                const description = $('.rte').text();

                console.log(name, section_name);

                attar.push({ name, section: section_name, description });
            };
        }
    }
    return attar;
}