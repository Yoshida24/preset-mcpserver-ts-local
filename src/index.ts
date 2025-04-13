import { FastMCP } from "npm:fastmcp";
import { z } from "npm:zod";

const server = new FastMCP({
    name: "Sample FastMCP Server",
    version: "0.0.0"
});

server.addTool({
    name: "Count String Length",
    description: "Count the length of a string",
    parameters: z.object({
        string: z.string()
    }),
    execute: (params) => {
        const length = params.string.length;
        return Promise.resolve(JSON.stringify({
            length
        }));
    }
});

server.start({
    transportType: "stdio"
});