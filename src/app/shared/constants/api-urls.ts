const baseUrl = 'https://api.chucknorris.io/jokes';

const randomJokeUrl = `${baseUrl}/random`;

export const apiUrls = {
  categories: `${baseUrl}/categories`,
  randomJoke: randomJokeUrl,
  randomJokeByCategory: `${randomJokeUrl}?category`,
  searchJokes: `${baseUrl}/search?query`
}