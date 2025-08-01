const Parser = require('rss-parser');
const fs = require('fs');

const parser = new Parser();
const mediumUser = 'berkay_agcay'; // Medium kullanıcı adını buraya yaz

(async () => {
    const feed = await parser.parseURL(`https://medium.com/feed/@${mediumUser}`);

    // Son 5 yazıyı al
    const posts = feed.items.slice(0, 1);

    // README dosyasını oku
    let readme = fs.readFileSync('README.md', 'utf8');

    // Yazı listesi markdown formatında
    const postList = posts.map(post => {
        const title = post.title;
        const link = post.link;
        return `- [${title}](${link})`;
    }).join('\n');

    // README'deki özel bölüm arasını değiştir
    const newReadme = readme.replace(/<!-- BLOG-POST-LIST:START -->([\s\S]*?)<!-- BLOG-POST-LIST:END -->/, `<!-- BLOG-POST-LIST:START -->\n${postList}\n<!-- BLOG-POST-LIST:END -->`);

    // Yeni README'yi yaz
    fs.writeFileSync('README.md', newReadme);

    console.log('README.md güncellendi.');
})();
