import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth-guard';

export const routes: Routes = [
    {
        path:'',
        loadComponent: async() =>
            (await import('./views/public/home/home')).Home,
        title:'Archi TS CLI - Home'
    },
    {
        path:"home",
        loadComponent: async() =>
            (await import('./views/public/home/home')).Home,
        title:'Archi TS CLI - Home'
    },
    {
        path:"documentation",
        loadComponent: async() =>
            (await import('./views/public/documentation/documentation')).Documentation,
        title:'Archi TS CLI - Documentation'
    }
];
