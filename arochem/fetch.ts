import { get } from 'https';
import { parse } from 'url';


export default function fetch(url: `https://${string}.com` | `https://${string}.com${string}`): Promise<string> {
    return new Promise((resolve, reject) => {
        const { port, hostname, pathname } = parse(url);
        get({ port: port, host: hostname, path: pathname, headers: { ['User-Agent']: 'Mozilla/5.0 (X11; Linux armv7l) AppleWebKit/537.36 (KHTML, like Gecko) Raspbian Chromium/74.0.3729.157 Chrome/74.0.3729.157 Safari/537.36' } }, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                resolve(data);
            });
        }).on('error', (err) => {
            reject(err);
        });
    });
}