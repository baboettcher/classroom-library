const columns = [{
  name: "Los titulos",
  path: "title",
  content: ""
},
{
  name: "Genre",
  path: "genre.name",
  content: ""
},
{
  name: "Number In Stock",
  path: "numberInStock",
  content: ""
},
{
  name: "Like",
  path: "like",
  content: ""
},
{
  key: "delete",
  content: ""
}
]

export function getColumns() {
  return columns.filter(c => c);
}