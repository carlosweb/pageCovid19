// pagina referencia
//laughing-wescoff-20eef6.netlify.com/

var url = "https://covid19.mathdro.id/api";
var url2 = "https://covid19.mathdro.id/api/countries";

async function getData(url) {
  const res = await fetch(url);
  let resOK = res && res.status;
  if (resOK === 200) {
    return res.json();
  }
}

getData(url2).then(data => {
  const countries = data.countries;
  const selectCountry = document.getElementById("country");

  countries.forEach(country => {
    const element = document.createElement("option");
    element.value = country.iso3;
    element.textContent = country.name;
    selectCountry.appendChild(element);
  });
  selectCountry.addEventListener("change", event => {
    if (event.target.value !== "0") {
      updateResults(`${url}/countries/${event.target.value}`);
    } else {
      updateResults(url);
    }
  });
});

function updateResults(url) {
  getData(url).then(data => {
    const data1 = document.querySelector("#data-1");
    const data2 = document.querySelector("#data-2");
    const data3 = document.querySelector("#data-3");
    const dados = data;
    const confirm = dados.confirmed;
    const recovered = dados.recovered;
    const deaths = dados.deaths;
    data1.innerHTML = new Intl.NumberFormat("pt-BR", {
      notation: "compact"
    }).format(confirm.value);
    data2.innerHTML = new Intl.NumberFormat("pt-BR", {
      notation: "compact"
    }).format(recovered.value);
    data3.innerHTML = new Intl.NumberFormat("pt-BR", {
      notation: "compact"
    }).format(deaths.value);
  });
}

updateResults(url);

function getHours() {
  let text;
  let day = new Date();
  let d = day.getDate();
  let m = day.getMonth() + 1;
  let y = day.getFullYear();
  const dayweek = document.querySelector("#dateWeek");
  const dayweek2 = document.querySelector("#dateWeek2");
  const dayweek3 = document.querySelector("#dateWeek3");

  switch (new Date().getDay()) {
    case 1:
      text = "Segunda";
      break;
    case 2:
      text = "Terça";
      break;
    case 3:
      text = "Quarta";
      break;
    case 4:
      text = "Quinta";
      break;
    case 5:
      text = "Sexta";
      break;
    case 6:
      text = "Sabado";
      break;
    default:
      text = "Domigo";
  }

  dayweek.innerHTML = `${text} - ${d}/${m}/${y}`;
  dayweek2.innerHTML = `${text} - ${d}/${m}/${y}`;
  dayweek3.innerHTML = `${text} - ${d}/${m}/${y}`;
}
getHours();
