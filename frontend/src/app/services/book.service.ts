import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Book } from "../models/book.model";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: "root",
})
export class BookService {
    private apiUrl = 'https://localhost:3000/api';

    constructor(private http: HttpClient) { }

    getBooks(): Observable<Book[]> {
        return this.http.get<Book[]>(`${this.apiUrl}/books`);
    }
}