export type MetroFeature = {
    type: string;
    geometry: {
        type: string;
        coordinates: [number,number];
    };
    properties: {
        station_code: number;
        station_name: string;
    };
}

export type BusFeature = {
    type: string;
    geometry: {
        type: string;
        coordinates: [number,number];
    };
    properties: {
        stop_id: string;
        stop_name: string;
    };
}