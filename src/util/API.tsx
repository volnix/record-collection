import Record from './Record';

const perPage: number = 100;

const getRecords = async () => {
    let records: Record[] = [];

    const folder = await fetch('https://api.discogs.com/users/nvolgas/collection/folders/0', {
        headers: {'User-Agent': 'records.nickvolgas.com'}
    }).then(res => res.json());

    const pages = Math.ceil(folder.count / perPage);
    let requests: Promise<any>[] = [];
    for(let i = 1; i <= pages; i++) {
        requests.push(fetch(`https://api.discogs.com/users/nvolgas/collection/folders/0/releases?page=${i}&per_page=${perPage}`).then(res => res.json()));
    }

    await Promise.all(requests).then((pages: Array<any>) => {
        pages.forEach(page => {
            page.releases.forEach(release => {
                records.push({
                    id: release.id as string,
                    artist: release.basic_information.artists[0].name as string,
                    album: release.basic_information.title,
                    dateAdded: new Date(release.date_added),
                    imageUrl: ''
                });
            });
        });
    });

    return records;
};

export { getRecords };