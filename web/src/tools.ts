import {Subscription} from 'rxjs';
import {settings, timeline} from "./environments/environment";
import {Episode, IAnime, ITrack, TracTimeline} from "./app/types/types";

/**
 * contains a list of loaded scripts
 */
export const LOADED_SCRIPTS: string[] = [];

export class Tools {
    /**
     * convert a object of objects to an array of objects
     * @param object object of objects
     */
    static objectToArray(object: any): any[] {
        let arr = [];
        if (!Array.isArray(object)) {
            for (const key in object) {
                if (object.hasOwnProperty(key)) {
                    arr.push(object[key]);
                }
            }
        } else {
            arr = [...object];
        }
        return arr;
    }

    /**
     * clone object (copy without reference)
     * @param object any data object
     */
    static cloneObject(object: any): any {
        return JSON.parse(JSON.stringify(object));
    }

    /**
     * return the value of a property or default value if property doesn't exist
     * @param object any object
     * @param propertyName any property name string
     * @param defaultValue any default value
     */
    static getProperty(object: any, propertyName: string, defaultValue?: any) {
        if (object && propertyName in object) {
            return object[propertyName];
        }
        return defaultValue;
    }

    static groupBy(arr: any[], key: string) {
        return Object.values(
            arr.reduce(function (groups, item) {
                const val = item[key];
                groups[val] = groups[val] || [];
                groups[val].push(item);
                return groups;
            }, {})
        );
    }

    /**
     * returns a url string with appended params
     * @param url eg. https://www.google.com/index.php?abc=123
     * @param params e.g. [{key: 'test', value: 'hallo'}]
     */
    static appendUrlParams(url: string, params: { key: string; value: string | number }[]): string {
        const _url: URL = new URL(url);
        const _usp: URLSearchParams = new URLSearchParams(_url.search);
        params.forEach((param: any) => {
            _usp.set(param.key, param.value);
        });
        return _url.toString().replace(_url.search, '') + '?' + _usp.toString();
    }

    /**
     * unsubscribe from a list of subscriptions
     * @param subscriptions
     */
    static unsubscribeAll(subscriptions: Subscription[]) {
        subscriptions.forEach((subsciption) => {
            subsciption.unsubscribe();
        });
    }

    /**
     * new lines 2 line break
     * @param text
     */
    static nl2br(text: string) {
        return text ? text.replace(/(?:\r\n|\r|\n)/g, '<br>') : '';
    }

    /**
     * check is empty object
     * @param text
     */
    static isEmptyObject(obj: any) {
        return Object.keys(obj).length === 0 && obj.constructor === Object;
    }

    /**
     * show n signs after comma
     * @param value
     * @param precision
     */

    static round(value: number, precision: number = 0): number {
        const multiplier = Math.pow(10, precision || 0);
        return Math.round(value * multiplier) / multiplier;
    }

    static getFormData(data: any) {
        const formData = new FormData();

        for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                const element = data[key];

                //checkbox can be false
                if (element || element === false) {
                    if (key === 'image') {
                        formData.append('image', element, element.name);
                    } else {
                        formData.append(key, element);
                    }
                }
            }
        }

        return formData;
    }

    static buildSubtrack = (trackId: number, episodeId: number | string, subTrack: Episode) => ({
        id: `anime-${trackId}-episode-${episodeId}`,
        title: subTrack.title,
        elements: Tools.buildSubElements(subTrack)
    });

    static buildTrack(data: IAnime[], i: number) {
        if (data.length > 0 && i <= data.length - 1) {
            const tracks = data[i].episode.map((episode) => {
                return Tools.buildSubtrack(data[i].aid, episode.eid.toString(), episode)
            })
            const track: ITrack = {
                id: `anime-${data[i].aid}`,
                title: data[i].title_en,
                elements: Tools.buildElements(data[i]),
                tracks: tracks,
                isOpen: false
            }

            return track;
        }

    };

    static buildTrackStartGap = () =>
        Math.floor(Math.random() * timeline.MAX_TRACK_START_GAP);

    static buildElementGap = () =>
        Math.floor(Math.random() * timeline.MAX_ELEMENT_GAP);

    static buildQuarterCells = () => {
        const v = [];
        for (let i = 0; i < timeline.QUARTERS_PER_YEAR * timeline.NUM_OF_YEARS; i += 1) {
            const quarter = (i % 4) + 1;
            const startMonth = i * timeline.MONTHS_PER_QUARTER;
            const s = Tools.addMonthsToYear(2022, startMonth);
            const e = Tools.addMonthsToYear(2022, startMonth + timeline.MONTHS_PER_QUARTER);
            v.push({
                id: `${s.year}-q${quarter}`,
                title: `Q${quarter} ${s.year}`,
                start:  new Date(`${s.year}-${s.month}-01`),
                end: new Date(`${e.year}-${e.month}-01`)
            });
        }
        return v;
    };

    static hexToRgb(hex: string) {
        const v = parseInt(hex, 16);
        const r = (v >> 16) & 255;
        const g = (v >> 8) & 255;
        const b = v & 255;
        return [r, g, b];
    };

    static colourIsLight = (r: number, g: number, b: number) => {
        const a = 1 - (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        return a < 0.5;
    };

    static getTitleEnd(episodeInTitle: number, startDate: Date) {
        const release_date = new Date(startDate)
        return new Date(release_date.getFullYear(), release_date.getMonth(), release_date.getDate()+7*episodeInTitle)
    }

    static buildElement(title: string, i: number | string, start: Date, end: Date, trackId: number | string, image: string, element: any) {
        // @ts-ignore
        const color = Tools.colourIsLight(...Tools.hexToRgb(image)) ? "#000000" : "#ffffff";
        const track_element: TracTimeline = {
            id: `a-${trackId}-ep-${i}`,
            title: title,
            start: start,
            element: element,
            end: end,
            style: {
                background: image ? `url(${image}) center no-repeat`: '#565679',
                alignContent: 'center',
                color: color,
                borderRadius: '4px',
                boxShadow: '1px 1px 0px rgba(0, 0, 0, 0.25)',
                textTransform: 'capitalize',
                fontFamily: 'Consolas'
            }, i: i
        }
        return track_element;
    };

    static buildElements = (element: IAnime) => {
        const v: TracTimeline[] = [];
        let i = 1;

        const start = new Date(element.release_date)
        const end = Tools.getTitleEnd(element.episodes, element.release_date);
        element.episode.map((ep)=>{
            v.push(
                Tools.buildElement(
                    element.title_en, ep.eid, start, end, element.aid, element.image, element
                )
            );
        })


        return v;
    };

    static buildSubElements = (element: Episode) => {
        const v: TracTimeline[] = [];
        let i = 1;
        const end = new Date(element.air_date)
        v.push(
            Tools.buildElement(
                element.title, i, new Date(element.air_date), new Date(end.getFullYear(), end.getMonth(), end.getDate()+1), element.eid, '', element
            )
        );

        return v;
    };

    static addMonthsToYear = (year: number, monthsToAdd: number) => {
        let y = year;
        let m = monthsToAdd;
        while (m >= 12) {
            m -= 12;
            y += 1;
        }
        return {year: y, month: m + 1};
    };

    static buildMonthCells = () => {
        const v = [];
        for (let i = 0; i < timeline.MONTHS_PER_YEAR * timeline.NUM_OF_YEARS; i += 1) {
            const startMonth = i;
            const start = Tools.addMonthsToYearAsDate(2022, startMonth);
            const end = Tools.addMonthsToYearAsDate(2022, startMonth + 1);
            v.push({
                id: `m${startMonth}`,
                title: settings.highcharts.global.lang.months[i % 12],
                start,
                end
            });
        }
        return v;
    };

    static fill = (n: number) => {
        const arr = [];
        for (let i = 0; i < n; i += 1) {
            arr.push(i);
        }
        return arr;
    };

    static addMonthsToYearAsDate = (year: number, monthsToAdd: number) => {
        const r = Tools.addMonthsToYear(year, monthsToAdd);
        return new Date(`${r.year}-${r.month}`);
    };

    static buildTimebar = () => [
        {
            id: "quarters",
            title: "Quarters",
            cells: Tools.buildQuarterCells(),
            style: {}
        },
        {
            id: "months",
            title: "Months",
            cells: Tools.buildMonthCells(),
            useAsGrid: true,
            style: {}
        }
    ];

    static getWindowDimension() {
        const {innerHeight: height, innerWidth: width, outerHeight: minHeight, outerWidth: minWidth} = window
        return {
            height, width, minWidth, minHeight
        }
    }
}