import * as titlesAPI from "./fakeGenreService";

const titles = [{
    name: "Titles!!!!",
    path: "title"
  },
  {
    name: "Genre",
    path: "genre.name"
  },
  {
    name: "Number In Stock",
    path: "numberInStock"
  },
  {
    name: "Like",
    path: "like"
  },
  {
    key: "delete"
  }
]

export function getTitles() {
  return titles.filter(t => t);
}