const cheerio = require('cheerio');

// Links
const baseUrl = 'http://172.16.50.4/';

export const getMainCategories = async () => {
  try {
    const response = await fetch(baseUrl);
    // console.log(response)
    ;
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const html = await response.text();
    //console.log(html);

    const $ = cheerio.load(html);

    const categories = [];

    $('.work-grids a').each((index, element) => { // Use a function with index and element parameters
      const category = $(element).text(); // 
      const link = $(element).attr('href');
    
      categories.push({ category, link });
    });

    //console.log(categories);
    return categories;
  } catch (err) {
    console.error('Error with fetching main categories:', err.message || err);
    return []; // Empty array to indicate an error
  }
};

export const fetchMovieYear = async (link) => {
    const response = await fetch(link);
    const html = await response.text();
    //console.log(html);
    const $ = cheerio.load(html);

    const years = [];

    $('#fallback tr td').each(function (i, el) {
        const title = $(el).find('a').text();
        const link = $(el).find('a').attr('href');

        if(title != "" && title != 'Parent Directory') years.push({title, link});
      });
    
    return years;
}

export const fetchMovieData = async (link) => {
  const link_7 = 'http://172.16.50.7' + link;
  const response_7 = await fetch(link_7);

  const link_14 = 'http://172.16.50.14' + link;
  const response_14 = await fetch(link_14);

  let response = null;
  if(response_7.status == 404){
    response = response_14;
  }else response = response_7;

  const html = await response.text();

  // console.log(html);
  const $ = cheerio.load(html);

  const movie = [];

  $('#fallback tr td').each(function (i, el) {
      const title = $(el).find('a').text();
      const link = $(el).find('a').attr('href');

      if(title != "" && title != 'Parent Directory') movie.push({title, link});
    });
  
    // console.log(movie);
  return movie;
}


export const fetchMovie = async (link) => {
  const link_7 = 'http://172.16.50.7' + link;
  const response_7 = await fetch(link_7);

  const link_14 = 'http://172.16.50.14' + link;
  const response_14 = await fetch(link_14);

  let response = null;
  if(response_7.status == 404){
    response = response_14;
  }else response = response_7;

  const html = await response.text();

  // console.log(html);
  const $ = cheerio.load(html);

  const movie = {};

  $('#fallback tr td').each(function (i, el) {
      const title = $(el).find('a').text();
      const link = $(el).find('a').attr('href');

      var substrForMKV = title.slice(-4);
      console.log(substrForMKV);

      if(substrForMKV === '.jpg' || substrForMKV ==='.png') movie.img = link;
      else if(substrForMKV === '.mkv') movie.link = link;
    });

    movie.link = validatedUrl(movie.link);
    return movie;
}

export const validatedUrl = async (link) => {
  const link_7 = 'http://172.16.50.7' + link;
  const response_7 = await fetch(link_7);

  const link_14 = 'http://172.16.50.14' + link;
  const response_14 = await fetch(link_14);

  link = null;
  if(response_7.status == 404){
    link = link_14;
  }else link = link_7;

  return link;
}