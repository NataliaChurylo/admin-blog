import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { BlogComponent } from './pages/blog/blog.component';
import { AboutComponent } from './pages/about/about.component';

import { AdminComponent } from './admin/admin.component';
import { CategoryComponent } from './admin/category/category.component';
import { BlogsComponent } from './admin/blogs/blogs.component';
import { ProductComponent } from './admin/product/product.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'about', component: AboutComponent },
  { path: 'admin', component: AdminComponent, children: [
    { path: 'category', component: CategoryComponent },
    { path: 'blogs', component: BlogsComponent },
    { path: 'product', component: ProductComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
