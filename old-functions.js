function generateCalculations(row) {
  if (row.childElementCount === 6) {
    const cells = row.querySelectorAll('td');
    numerator = cells[3].textContent.replace(",", "");
    numerator = parseFloat(numerator.trim());
    const denominator = parseFloat(cells[5].textContent.trim());

    divisionResult = parseFloat((numerator / denominator).toFixed(2)); // Format to 2 decimal places
    multi = Math.floor(divisionResult) * Math.floor(denominator);
    const newCell = cells[5].cloneNode(true);
    newCell.textContent = divisionResult + " / " + multi;
    row.appendChild(newCell);
  }
}

function appendTableHeader(row) {
  console.log("appendTableHeader called");
  if (row.childElementCount === 6) {
    console.log("appendTableHeader executed");
    calcHeader = row.lastChild.cloneNode(true);
    //calcHeader.appendChild(calcHeader.querySelector("button > div")); // make this not a button
    //calcHeader.querySelector("button").remove();
    calcHeader.querySelector("div > div").remove();
    calcHeader.querySelector("p").textContent = "Calculations";
    row.appendChild(calcHeader);
  } else {
    console.log("appendTableHeader failed, " + row.childElementCount + " columns present.")
  }
}

const observer = new MutationObserver(() => {
  console.log("mutation detected");
  document.querySelectorAll("TBODY > TR, THEAD > TR").forEach((node) => {
    if (node.childElementCount === 6 && node.parentNode.nodeName === "TBODY" && validPath()) {
      console.log("genCalc called");
      generateCalculations(node);
    } else if (node.childElementCount === 6 && node.parentNode.nodeName === "THEAD" && validPath()) {
      console.log("appendTableHeader called");
      appendTableHeader(node);
    }
  })
});