const ROUTE_PATTERNS = {
  exclude: [
    /snapshotID=/
  ],

  include: [
    /^\/$/,
    /^\/stash/
  ]
};

function validPath() {
    const { pathname, search } = window.location;

    if (ROUTE_PATTERNS.exclude.some(p => p.test(search))) {
        return false;
    }
    return ROUTE_PATTERNS.include.some(p => p.test(pathname));
}

/*
function tableInjection() {

}

const table = document.querySelector("table.mantine-Table-table");
*/

if (validPath()) {
    console.log("Path is valid.")
    document.body.style.border = "5px solid red";
} else {
    console.log("Path is invalid.")
}
/*
if validPath new mutator

*/
