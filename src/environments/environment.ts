/// <reference types="react-scripts" />

const backendURL = getURL()
// const host = location.protocol + '//' + location.host


function getURL(){
    return 'http://localhost:8080';
}

export const environment = {
    production: true,
    backendURL: backendURL,
    apiUrl: backendURL + '/api',
    version: '0.0.1'
}

export const settings = {
    title: 'T Anime |',
    config: {
        headers: {
            'content-type': 'multipart/form-data'
        },
    },
    highcharts: {
        timeZone: {
            time: {
                timezone: 'Europe/Kiev',
            },
        },
        global: {
            lang: {
                decimalPoint: ',',
                thousandsSep: '',
                loading: 'Data loading...',
                months: [
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                    'August',
                    'September',
                    'October',
                    'November',
                    'December',
                ],
                weekdays: ['Sunday ', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                exportButtonTitle: 'Export',
                printButtonTitle: 'Print',
                rangeSelectorFrom: 'From',
                rangeSelectorTo: 'To',
                rangeSelectorZoom: 'Zoom',
                downloadPNG: 'Download as PNG',
                downloadJPEG: 'Download as JPEG',
                downloadPDF: 'Download als PDF',
                downloadSVG: 'Download as SVG',
                resetZoom: 'Reset zoom',
                resetZoomTitle: 'Reset zoom title',
            },
        },
    }
}
