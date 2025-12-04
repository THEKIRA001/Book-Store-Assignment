import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { withEntities, setAllEntities } from '@ngrx/signals/entities';
import { computed, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { BookService } from '../services/book.service';
import { Book } from '../models/book.model';

export const BookStore = signalStore(
    { providedIn: 'root' },

    withEntities<Book>(),
    withState({ loading: false }),

    withComputed(({ entities }) => ({
        allBooks: computed(() => Object.values(entities()))
    })),

    withMethods(({ store, bookService = inject(BookService)  }) => {
        async loadAllBooks() {
            patchState(store, { loading: true });

            try{
                const books = await firstValueFrom(BookService.getAllBooks());
                patchState(store, setAllEntities(books), { loading: false });
            } catch (error) {
                console.error('Failed to load books', error);
                patchState(store, { loading: false });
            }
        }
    })
);