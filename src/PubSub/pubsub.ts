export interface PubSub {
  events: { [key: string]: Function[] };
  subscribe: (event: string, listener: Function) => void;
  publish: (event: string, data: any) => void;
}

export const pubsub: PubSub = {
  events: {},
  subscribe: function(event: string, listener: Function) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  },
  publish: function(event: string, data: any) {
    if (this.events[event]) {
      this.events[event].forEach(listener => listener(data));
    }
  }
};
