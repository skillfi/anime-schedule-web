
import { forkJoin, Observable, Subscription, from } from 'rxjs';
import * as moment from 'moment';

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

    static getWindowDimension(){
        const {innerHeight: height, innerWidth: width, outerHeight: minHeight, outerWidth: minWidth} = window
        return {
            height, width, minWidth, minHeight
        }
    }
}