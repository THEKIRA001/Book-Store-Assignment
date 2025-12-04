import { patchState, signalStore, withState, withMethods } from '@ngrx/signals';
import { User } from "../models/user.model";
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

type UserInfoState = {
    user: User | null;
    jwtToken: string | null;
    loading: boolean;
}

const initialState: UserInfoState = {
    user: null,
    jwtToken: null,
    loading: false,
};

export const UserInfoStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods((store, authService = inject(AuthService), router = inject(Router)) => ({

        // login method
        login(credentials: { username: string, password: string }) {
            patchState(store, { loading: true });

            authService.login(credentials).pipe(
                tap({
                    next: (response) => {
                        patchState(store, {
                            user: response.user,
                            jwtToken: response.token,
                            loading: false
                        });
                        router.navigate(['/books']);
                    },
                    error: (err) => {
                        console.error('Login failed', err);
                        patchState(store, { loading: false });
                    }
                })
            ).subscribe();
        },


        // logout method
        logout() {
            patchState(store, { user: null, jwtToken: null });
            router.navigate(['/login']);
        }
    }))
);
