// pagina referencia
//laughing-wescoff-20eef6.netlify.com/

const covid19_url = 'https://covid19.mathdro.id/api';

const fetchData = async (url) => {
	const response = await fetch(url);
	return response.json();
};

const updateCountries = async (url) => {
	const { countries } = await fetchData(`${covid19_url}/countries`);
	const selectCountriesElement = document.getElementById('country');

	countries.forEach((country) => {
		const element = document.createElement('option');
		element.value = country.iso3;
		element.textContent = country.name;
		selectCountriesElement.appendChild(element);
	});

	selectCountriesElement.addEventListener('change', (event) => {
		if (event.target.value !== '0') {
			updateResults(`${covid19_url}/countries/${event.target.value}`);
		} else {
			updateResults(covid19_url);
		}
	});
};

const updateResults = async (url) => {
	const { confirmed, recovered, deaths, lastUpdate } = await fetchData(url);

	const confirmedCasesElement = document.querySelector('#data-1');
	const recoveredCasesElement = document.querySelector('#data-2');
	const deathsCasesElement = document.querySelector('#data-3');

	const dayweek = document.querySelector('#dateWeek');
	const dayweek2 = document.querySelector('#dateWeek2');
	const dayweek3 = document.querySelector('#dateWeek3');

	dayweek.textContent = formatDate(lastUpdate);
	dayweek2.textContent = formatDate(lastUpdate);
	dayweek3.textContent = formatDate(lastUpdate);

	confirmedCasesElement.textContent = new Intl.NumberFormat('pt-BR', {
		notation: 'compact'
	}).format(confirmed.value);
	recoveredCasesElement.textContent = new Intl.NumberFormat('pt-BR', {
		notation: 'compact'
	}).format(recovered.value);
	deathsCasesElement.textContent = new Intl.NumberFormat('pt-BR', {
		notation: 'compact'
	}).format(deaths.value);
};

const formatDate = (date) => {
	const daysOfTheWeek = [ 'Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado' ];

	const dateObject = new Date(date);
	const dayOfTheWeek = dateObject.getDay();
	const day = dateObject.getDate();
	const month = dateObject.getMonth() + 1;
	const year = dateObject.getFullYear();

	return `${daysOfTheWeek[dayOfTheWeek]} - ${day}/${month}/${year}`;
};

(() => {
	updateCountries(`${covid19_url}/countries`);
	updateResults(covid19_url);
})();
