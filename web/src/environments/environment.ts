/// <reference types="react-scripts" />

const backendURL = getURL(false)
const host = document.location.protocol + '//' + document.location.host


function getURL(router: boolean){
    if (router){
        return `http://192.168.88.184:8080`
    }else {
        return 'http://localhost:8080';
    }


}

export const environment = {
    production: true,
    backendURL: backendURL,
    apiUrl: backendURL + '/api',
    version: '0.0.1'
}

export const client_secret = {
    web: {
        client_id: '211880826055-hsampufapfr4923soh4kbnabdpikp0s1.apps.googleusercontent.com',
        project_id: 'anime-376615',
        auth_uri: 'https://accounts.google.com/o/oauth2/auth',
        token_uri: 'https://oauth2.googleapis.com/token',
        auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
        client_secret: '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',
        redirect_uris: ['http://localhost:8080/api/v2/me'],
        javascript_origins: ["http://localhost:3000","http://localhost","https://skillfi.github.io"]
    }
}

export const timeline = {
    QUARTERS_PER_YEAR: 4,
    NUM_OF_YEARS: 3,
    MONTHS_PER_QUARTER: 3,
    START_YEAR: (year: number) => new Date(year),
    MONTHS_PER_YEAR: 12,
    MAX_TRACK_START_GAP: 4,
    MAX_ELEMENT_GAP: 8,
    NUM_OF_MONTHS: (years: number, month: number) => years * month,
    MAX_MONTH_SPAN: 8,
    MIN_MONTH_SPAN: 2
}

export const settings = {
    title: 'T Anime | ',
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
