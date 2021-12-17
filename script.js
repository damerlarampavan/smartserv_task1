let table = document.getElementsByClassName('table')
table = table[0]

var url = "https://s3.amazonaws.com/open-to-cors/assignment.json"

fetch(url)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    let authors = data;
    for (const [key, value] of Object.entries(authors.products)) {
      var value1 = authors.products[`${key}`].title;
      var value2 = authors.products[`${key}`].price;
      var value3 = authors.products[`${key}`].popularity;
      var value4 = authors.products[`${key}`].subcategory;
      let tr = document.createElement('tr')
      let td1 = document.createElement('td');
      let td2 = document.createElement('td');
      let td3 = document.createElement('td');
      let td4 = document.createElement('td');
      td1.innerHTML = value1;
      td2.innerHTML = value2;
      td2.id = 'price';
      td3.innerHTML = value3;
      td4.innerHTML = value4;
      tr.appendChild(td1)
      tr.appendChild(td2)
      tr.appendChild(td3)
      tr.appendChild(td4)
      table.appendChild(tr)
    }
  });

const getCellValue = (a, b) => a.children[b].innerText || a.children[b].textContent;

const comparer = (ind, asc) => (a, b) => ((i, j) =>
  i !== '' && j !== '' && !isNaN(i) && !isNaN(j) ? i - j : i.toString().localeCompare(j)
)(getCellValue(asc ? a : b, ind), getCellValue(asc ? b : a, ind));

// do the work...
document.querySelectorAll('th').forEach(th => th.addEventListener('click', (() => {
  const table = th.closest('table');
  Array.from(table.querySelectorAll('tr:nth-child(n+2)'))
    .sort(comparer(Array.from(th.parentNode.children).indexOf(th), this.asc = !this.asc))
    .forEach(tr => table.appendChild(tr));
})));