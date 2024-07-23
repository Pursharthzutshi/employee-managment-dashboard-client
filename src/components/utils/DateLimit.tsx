
function DateLimit() {
    const year = new Date().getFullYear();
    const month = String(new Date().getMonth() + 1).padStart(2, '0');
    const day = String(new Date().getDate()).padStart(2, '0');
    const date = `${year}-${month}-${day}`;
    return date

}

export default DateLimit