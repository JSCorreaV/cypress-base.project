export function parseElementsListToTextsList(elementList) {
    return [...elementList].map((element) =>
        element.textContent.trim().replace('  ', ' ')
    );
}
