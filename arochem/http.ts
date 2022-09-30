import {get} from 'http';


export function fetch(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
        get(url, (res) => {
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