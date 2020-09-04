import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IBlog } from '../interfaces/blog.interface'

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(
    private http: HttpClient
  ) { }

  getBlog(): Observable<Array<IBlog>>{
    return this.http.get<Array<IBlog>>(`${environment.url}blogs`)
  }

  addBlog(blog: IBlog): Observable<Array<IBlog>>{
    return this.http.post<Array<IBlog>>(`${environment.url}blogs`, blog)
  }
 
  deleteBlog(blog: IBlog): Observable<Array<IBlog>>{
    return this.http.delete<Array<IBlog>>(`${environment.url}blogs/${blog.id}`)
  }

  updateBlog(blog: IBlog): Observable<Array<IBlog>>{
    return this.http.put<Array<IBlog>>(`${environment.url}blogs/${blog.id}`, blog)
  }
}
