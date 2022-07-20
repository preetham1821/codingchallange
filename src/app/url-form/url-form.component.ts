import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-url-form',
  templateUrl: './url-form.component.html',
  styleUrls: ['./url-form.component.css'],
})
export class UrlFormComponent {
  constructor(private httpClient: HttpClient) {}

  apiURL: string = 'https://api.shrtco.de/v2/shorten?url=';

  urlInput = '';
  shortenedurl = '';
  urlList = [];

  ngOnInit() {
    if (localStorage.getItem('urlListStorage') != null)
      this.urlList = JSON.parse(localStorage.getItem('urlListStorage'));
  }

  onSubmit() {
    this.getShortUrl().subscribe((res) => {
      this.shortenedurl = res.body;
      const result = this.shortenedurl['result'];
      console.log(result['full_short_link']);
      this.urlList.push(result['full_short_link']);
      localStorage.setItem('urlListStorage', JSON.stringify(this.urlList));
    });
  }

  copy(inputElement) {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }

  public getShortUrl(url?: string) {
    return this.httpClient
      .get<any>(`${this.apiURL + this.urlInput}`, { observe: 'response' })
      .pipe(
        tap((res) => {
          return res;
        })
      );
  }
}
