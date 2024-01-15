import { Category } from "./category";

export interface UserRequest {
    id: number|null|undefined,
    request: string|null|undefined,
    approvedbySystem: boolean|null|undefined,
    approvedbyAdmin: boolean|null|undefined,
    category: []|null|undefined,
    bids: []|null|undefined,
}
