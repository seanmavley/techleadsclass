import { AppSettings } from './constants';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromPromise';

@Injectable()
export class CodeService {

  getHeaders() {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')
    });
    return headers;
  }


  constructor(public http: Http) {
  }

  /**
  * Save a card
  */
  create_code(param) {
    return this.http.post(AppSettings.API_ENDPOINT + '/code/create', JSON.stringify(param), { headers: this.getHeaders() })
      .map((res) => {
        return res;
      })
  }

  delete_code(codeObj) {
    let param = {
      'code': codeObj,
    }

    return this.http.post(AppSettings.API_ENDPOINT + '/code/delete', JSON.stringify(param), { headers: this.getHeaders() })
      .map((res) => {
        return res
      })
  }
  /**
  * Returns list of user contributed cards
  * @param {string} username
  * @returns {Observable}
  */

  user_codes() {
    return this.http.get(`${AppSettings.API_ENDPOINT}/code/user-codes`, { headers: this.getHeaders() })
      .map((res) => {
        return res
      })
  }

  /**
   * Toggles a code's 'stolenity'
   * @param {code_id} code_id Code id of item to update
   * @param {is_stolen} is_stolen Boolean to change. Value is determined by caller.
   */
  toggle_is_stolen(code_id: string, is_stolen: boolean ) {
    const params = {
      code_id: code_id,
      is_stolen: is_stolen
    };

    return this.http.post(`${AppSettings.API_ENDPOINT}/code/update-stolen`, JSON.stringify(params), { headers: this.getHeaders() })
      .map((res) => {
        return res;
      })
  }

  /**
   * Searches for codes
   * @param search What to search for
   */
    search(term: string) {
    const params = {
      term: term,
    };

    return this.http.get(`${AppSettings.API_ENDPOINT}/code/search?search=${params.term}`, { headers: this.getHeaders() })
      .map((res) => {
        return res;
      })
  }
}
