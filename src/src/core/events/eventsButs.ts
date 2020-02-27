type Event = "routeChanged";

export class EventBus {
    private static map: Map<Event, Array<Function>> = new Map<Event, Array<Function>>();

    public static publish = (event: Event, data?: any) => {
        const handlers = EventBus.map.get(event);

        if (handlers !== undefined) {
            for (const handler of handlers) {
                handler(data);
            }
        }
    };

    public static subscribe = (event: Event, handler: Function) => {
        const handlers = EventBus.map.get(event);
        EventBus.map.set(event, handlers !== undefined ? [...handlers, handler] : [handler]);
    };

    public static unsubscribe = (event: Event, handler: Function) => {
        const handlers = EventBus.map.get(event);

        if (handlers !== undefined) {
            EventBus.map.set(
                event,
                handlers.filter(e => e !== handler),
            );
        }
    };
}
