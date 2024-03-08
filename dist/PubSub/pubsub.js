"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pubsub = void 0;
exports.pubsub = {
    events: {},
    subscribe: function (event, listener) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(listener);
    },
    publish: function (event, data) {
        if (this.events[event]) {
            this.events[event].forEach(listener => listener(data));
        }
    }
};
