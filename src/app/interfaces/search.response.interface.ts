export interface SearchResponse {
    business_status: string;
    geometry: { 
        location: {lat: number, lng: number}, 
        viewport: {} 
    }
    icon: string;
    icon_background_color: string;
    icon_mask_base_uri: string;
    name: string;
    opening_hours: {}
    photos: any
    place_id: string;
    plus_code: {}
    price_level: number
    rating: number
    reference: string;
    scope: string;
    types: string[];
    user_ratings_total: number;
    vicinity: string
}
