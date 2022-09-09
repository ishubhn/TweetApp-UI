import { Reply } from "./reply";

export interface Tweet {
    id: number;
    email: String;
    body: String;
    likes: number;
    timestamp: Date;
    replies: Reply[];
}
