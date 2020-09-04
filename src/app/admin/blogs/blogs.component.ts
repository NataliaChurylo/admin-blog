import { Component, OnInit, OnDestroy } from '@angular/core';
import { BlogService } from '../../shared/services/blog.service'
import { IBlog } from 'src/app/shared/interfaces/blog.interface';
import { Blog } from '../../shared/models/blog.model'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit, OnDestroy {

  titleBlog: string;
  textBlog: string;
  authorBlog: string;
  imageBlog: string;

  adminBlogs: Array<IBlog> = [];

  editBlogID : number;
  editStatus = false;

  subscription: Subscription;

  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    this.getAdminBlogs();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getAdminBlogs(): void{
    this.subscription = this.blogService.getBlog().subscribe( data => {
      this.adminBlogs = data;
    }, error => {
      console.log(error);
    })
  }

  addBlog(): void{
    const blog: IBlog = new Blog (1, this.titleBlog, this.textBlog, new Date(), this.authorBlog, this.imageBlog);
    if (!this.editStatus) {
      if (this.titleBlog && this.textBlog && this.authorBlog && this.imageBlog) {
        if (this.adminBlogs.length > 0) {
          blog.id = this.adminBlogs.slice(-1)[0].id +1;
        }
        this.blogService.addBlog(blog).subscribe( () => {
          this.getAdminBlogs();
          this.resetForm();
        })
      }
    }
    else {
      blog.id = this.editBlogID;
      this.blogService.updateBlog(blog).subscribe( () => {
        this.getAdminBlogs();
        this.resetForm();
      })
    }
  }

  editBlog(blog: IBlog): void{
    this.editBlogID = blog.id;
    this.titleBlog = blog.title;
    this.textBlog = blog.text;
    this.authorBlog = blog.author;
    this.imageBlog = blog.image;
    this.editStatus = true;
  }

  deleteBlog(blog: IBlog): void{
    this.blogService.deleteBlog(blog).subscribe( () => {
      this.getAdminBlogs();
      });
  }

  resetForm(): void{
    this.titleBlog = '';
    this.textBlog = '';
    this.authorBlog = '';
    this.imageBlog = '';
  }
}
