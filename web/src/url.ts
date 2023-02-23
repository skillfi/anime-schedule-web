import {environment} from "./environments/environment";
import {Tools} from "./tools";

export class Url{
    basePath: string = environment.apiUrl;
    path: string = ''

    constructor(firstLevel: string, secondLevel?: string) {
        if (secondLevel){
            this.path = firstLevel + secondLevel;
        }
        else {
            this.path = firstLevel
        }
    }

    /**
     * Constructs a request with provided parameters
     * returns a string value.
     *
     * @param key param key string.
     * @param value string | number | array.
     * @param comma use comma separated array.
     *
     * @return void.
     */
    addQueryParameter(key: string, value?: string | number | any, comma?: boolean): void {
        if (key && !this.isEmptyValue(value)) {
            if (comma) {
                this.path = this.addArrayValuesCommaSeparated(key, value);
                return;
            }
            this.path = Array.isArray(value) ? this.addArrayValues(key, value) : this.addSingleValue(key, value);
        }
    }

    addFilters(filtersArray: any) {
        if (filtersArray && filtersArray.length > 0) {
            filtersArray.forEach((item: any) => {
                this.addQueryParameter(item.key, item.value);
            });
        }
    }

    private isEmptyValue(value: any): boolean {
        return value === undefined || value === null || value === '' || value === -1 || value === 0;
    }

    private addSingleValue(key: string, value: string | number | any) {
        return Tools.appendUrlParams(this.path, [{ key: key, value: value }]);
    }

    private addArrayValuesCommaSeparated(key: string, value: string | number | any) {
        if (value.length > 0) {
            return Tools.appendUrlParams(this.path, [{ key: key, value: value.join(',') }]);
        }

        return this.path;
    }

    private addArrayValues(key: string, value: string | number | any): string {
        let url = '';
        value.forEach((item: any) => {
            url += this.getSign(url) + key + '[]=' + item;
        });
        return this.path + url;
    }

    private getSign(string: string) {
        const substring = '?';
        return string.includes(substring) || this.path.includes(substring) ? '&' : '?';
    }
}