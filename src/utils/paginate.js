import _ from "lodash";
export function paginate(items, pageNumber, pageSize) {
  // calculate starting index
  const startIndex = (pageNumber - 1) * pageSize;
  // converte array to lodash-friendsly object in order to do chaining
  // _.take() - takes items from array, but only in a lodash wrapper
  // _(items) - reutrns a lodash object in order to do chaining
  // _.value p- convert to a regular array

  return _(items)
    .slice(startIndex)
    .take(pageSize)
    .value();
  //
}
