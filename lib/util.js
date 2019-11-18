"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function trimAndFilter(items) {
    return items
        .map(i => {
        return i.trim();
    })
        .filter(i => {
        return i.length > 0;
    });
}
exports.trimAndFilter = trimAndFilter;
