export class RestApiResponse<T> {
    statusCode?: number;
    message?: string | string[];
    data?: T;
    meta?: any;
}

export interface User {
    id: string;
    name: string;
    email: string | null;
    avatar?: string | null;
    role?: string;
    locale?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface Hub {
    id: string;
    name: string;
    description: string;
    category: string;
    avatar: string | null;
    summary: string | null;
    instruction: string | null;
    liked: number;
    viewed: number;
    forked: number;
    favorite: number;
    official: boolean;
    featured: boolean;
    mainTagId: string | null;
    createdAt: string;
    updatedAt: string;
    children: Hub[];
}

export interface HubResponse {
    data: Hub[];
    meta: {
        total: number;
        lastPage: number;
        currentPage: number;
        perPage: number;
        prev: string | null;
        next: string | null;
    };
}

export interface PaginationInfo {
    total: number;
    lastPage: number;
    currentPage: number;
    perPage: number;
    prev: number | null;
    next: number | null;
}

