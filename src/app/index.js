const mockData = [
    {
        firstname: 'John',
        lastname: 'Doe',
        handle: 'instagram',
    },
    {
        firstname: 'Jane',
        lastname: 'Doe',
        handle: 'x',
    },
    {
        firstname: 'Checo',
        lastname: 'Perez',
        handle: 'threads',
    },
];

// Let's say that the user requested some data
document
    .querySelector('[data-ui=load-data-button')
    .addEventListener('click', () => {
        const tableBody = document.querySelector('.table tbody');
        tableBody.innerHTML = 'Loading...';

        setTimeout(() => {
            tableBody.innerHTML = '';
            mockData.forEach((person, index) => {
                tableBody.innerHTML += `<tr>
                    <th scope="row">${index}</th>
                    <td>${person.firstname}</td>
                    <td>${person.lastname}</td>
                    <td>@${person.handle}</td>
            </tr>`;
            });
        }, 5000); // API time response
    });

$(function () {
    // Check if the browser supports the native date input
    var isNativeDatePickerSupported = (function () {
        var input = document.createElement('input');
        input.setAttribute('type', 'date');
        return input.type !== 'text';
    })();

    // If native date input is not supported, use jQuery UI datepicker
    if (!isNativeDatePickerSupported) {
        $('#startDate').datepicker();
    }
});
