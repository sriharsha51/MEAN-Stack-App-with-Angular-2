import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class BlogService {
  options;
  domain = this.authService.domain;
  
    constructor(private http: Http,
                private authService: AuthService) { }
  
    createAuthenticationHeaders() {
      this.authService.loadToken();
      this.options = new RequestOptions({
        headers: new Headers({
          'Content-Type': 'application/json',
          'authorization': this.authService.authToken
        })
      });
    }

    newBlog(blog) {//create headers
      this.createAuthenticationHeaders(); //all middleware after authentication middleware needs authToken to be sent to backend for authentication 
      return this.http.post(this.domain + 'blogs/newBlog', blog, this.options).map(res => res.json());
    }

    getAllBlogs() {
      this.createAuthenticationHeaders();//create and send headers
      return this.http.get(this.domain + 'blogs/allBlogs', this.options).map(res => res.json());
    }
  }
