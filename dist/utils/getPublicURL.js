"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPublicURL = void 0;
const getPublicURL = (url) => {
    return `${process.env.BASE_URL}/${url}`;
};
exports.getPublicURL = getPublicURL;
// This function constructs a public URL by prepending the base URL from the environment variables to the provided URL.
// It is useful for generating full URLs for resources that are accessible publicly, such as images or files hosted on a server.
// The `BASE_URL` should be defined in your environment variables, typically
