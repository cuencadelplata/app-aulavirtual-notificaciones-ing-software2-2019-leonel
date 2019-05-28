
let Parser = require('rss-parser');
let parser = new Parser();

// Crea y devuelve json a partir de url de canal rss
export async function parsear( url ){
 
  let feed = await parser.parseURL(url);
  
  //let json = JSON.stringify(feed, null, "\t");
  return feed;
}
