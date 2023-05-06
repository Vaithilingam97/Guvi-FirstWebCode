// const searchButton = document.getElementById("searchButton");

// searchButton.addEventListener("click", async (event) => {

//   event.preventDefault();
//   const searchInput = document.getElementById("searchInput").value;
  
//   try {
//     const response = await fetch(`https://api.openbrewerydb.org/breweries/search?query=${searchInput}`);
//     const data = await response.json();
//     const table = document.getElementById("resultTable");

//     table.innerHTML = "";

//     const headerRow = table.insertRow();
//     const nameHeader = headerRow.insertCell(0);
//     const typeHeader = headerRow.insertCell(1);
//     const addressHeader = headerRow.insertCell(2);
//     const websiteHeader = headerRow.insertCell(3);
//     const phoneHeader = headerRow.insertCell(4);
//     nameHeader.innerHTML = "<b>Name</b>";
//     typeHeader.innerHTML = "<b>Type</b>";
//     addressHeader.innerHTML = "<b>Address</b>";
//     websiteHeader.innerHTML = "<b>Website</b>";
//     phoneHeader.innerHTML = "<b>Phone</b>";

//     data.forEach((brewery) => {
//       const row = table.insertRow();
//       const nameCell = row.insertCell(0);
//       const typeCell = row.insertCell(1);
//       const addressCell = row.insertCell(2);
//       const websiteCell = row.insertCell(3);
//       const phoneCell = row.insertCell(4);
//       nameCell.innerText = brewery.name;
//       typeCell.innerText = brewery.brewery_type;
//       addressCell.innerText = `${brewery.street}, ${brewery.city}, ${brewery.state}, ${brewery.postal_code}`;
//       websiteCell.innerHTML = `<a href="${brewery.website_url}" target="_blank">${brewery.website_url}</a>`;
//       phoneCell.innerText = brewery.phone || "-";
//     });
//   } catch (error) {

//     console.error(error);
//     alert("Failed to fetch data from Open Brewery API.");
//   }
// });


const searchButton = document.getElementById("searchButton");

function fetchBreweries(searchInput) {
  return fetch(`https://api.openbrewerydb.org/breweries/search?query=${searchInput}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to fetch data from Open Brewery API.");
      }
      return response.json();
    })
    .then(data => data)
    .catch(error => {
      console.error(error);
      throw error;
    });
}

function createTable(data) {
  const table = document.getElementById("resultTable");
  table.innerHTML = "";

  const headerRow = table.insertRow();
  const nameHeader = headerRow.insertCell(0);
  const typeHeader = headerRow.insertCell(1);
  const addressHeader = headerRow.insertCell(2);
  const websiteHeader = headerRow.insertCell(3);
  const phoneHeader = headerRow.insertCell(4);
  nameHeader.innerHTML = "<b>Name</b>";
  typeHeader.innerHTML = "<b>Type</b>";
  addressHeader.innerHTML = "<b>Address</b>";
  websiteHeader.innerHTML = "<b>Website</b>";
  phoneHeader.innerHTML = "<b>Phone</b>";

  data.forEach((brewery) => {
    const row = table.insertRow();
    const nameCell = row.insertCell(0);
    const typeCell = row.insertCell(1);
    const addressCell = row.insertCell(2);
    const websiteCell = row.insertCell(3);
    const phoneCell = row.insertCell(4);
    nameCell.innerText = brewery.name;
    typeCell.innerText = brewery.brewery_type;
    addressCell.innerText = `${brewery.street}, ${brewery.city}, ${brewery.state}, ${brewery.postal_code}`;
    websiteCell.innerHTML = `<a href="${brewery.website_url}" target="_blank">${brewery.website_url}</a>`;
    phoneCell.innerText = brewery.phone || "-";
  });
}

searchButton.addEventListener("click", async (event) => {
  event.preventDefault();
  const searchInput = document.getElementById("searchInput").value;
  try {
    const data = await fetchBreweries(searchInput);
    createTable(data);
  } catch (error) {
    alert(error.message);
  }
});


