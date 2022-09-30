import {get,} from 'https';


export default function fetch(url: `${string}.com`): Promise<string> {
    return new Promise((resolve, reject) => {
        get({host: 'https',hostname: url, headers: {['User-Agent']: 'Mozilla/5.0 (X11; Linux armv7l) AppleWebKit/537.36 (KHTML, like Gecko) Raspbian Chromium/74.0.3729.157 Chrome/74.0.3729.157 Safari/537.36'}}, (res) => {
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