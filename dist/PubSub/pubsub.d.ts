export interface PubSub {
    events: {
        [key: string]: Function[];
    };
    subscribe: (event: string, listener: Function) => void;
    publish: (event: string, data: any) => void;
}
export declare const pubsub: PubSub;
