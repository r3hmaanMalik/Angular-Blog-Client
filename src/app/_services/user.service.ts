﻿import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User} from '@/_models';
import { Blog } from '../_models/blog';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${config.apiUrl}/users`);
    }

    getById(id: number) {
        return this.http.get(`${config.apiUrl}/users/${id}`);
    }

    register(user: User) {
        return this.http.post(`${config.apiUrl}/users/register`, user);
    }

    update(user: User) {
        return this.http.put(`${config.apiUrl}/users/${user.id}`, user);
    }

    delete(id: number) {
        return this.http.delete(`${config.apiUrl}/users/${id}`);
    }
    
    deleteBlog(id: number) {
        return this.http.delete(`${config.apiUrl}/users/${id}`);
    }
    getAllBlogs(user: User) {
        return this.http.post<Blog[]>(`${config.apiUrl}/users/getAllBlogs`,user);
    }

    postBlog(blog: Blog) {
        return this.http.post<Blog[]>(`${config.apiUrl}/users/newblog`,blog);
    }
}
