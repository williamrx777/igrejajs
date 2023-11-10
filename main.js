// main.js

document.addEventListener("DOMContentLoaded", function () {
    const cultosList = document.getElementById("cultosList");

    const showSpinner = () => {
        const spinner = document.createElement('div');
        spinner.className = 'spinner';
        return spinner;
    };

    const showCultoData = (culto) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <h2>${culto.id}</h2>
            <div class="iframe-container">
                <iframe title="Culto ${culto.id}" src="${culto.culto}" width="800" height="600" frameborder="0" allowfullscreen></iframe>
            </div>
            <p class="dataAtual">Data: ${culto.dataAtual}</p>
        `;
        cultosList.appendChild(listItem);
    };

    // Initially, show the spinner
    cultosList.appendChild(showSpinner());

    fetch('https://comunidade-rompendo-em-fe.onrender.com/igreja')
        .then(response => response.json())
        .then(data => {
            console.log('Data from the server:', data);

            // Remove the spinner once data is available
            const spinner = cultosList.querySelector('.spinner');
            if (spinner) {
                spinner.style.display = 'none';
            }

            if (Array.isArray(data) && data.length > 0) {
                data.forEach(culto => {
                    showCultoData(culto);
                });
            } else {
                console.error('Error: The server response does not contain valid culto values.');
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});
