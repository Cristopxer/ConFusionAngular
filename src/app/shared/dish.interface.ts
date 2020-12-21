import {Comment} from '../shared/comment.interface'

export interface Dish {
    id?: string;
    name?: string;
    image?: string;
    category?: string;
    featured?: boolean;
    label?: string;
    price?: string;
    description?: string;
    comments?: Comment[];
}