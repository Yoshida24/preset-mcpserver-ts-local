import { FastMCP } from "npm:fastmcp";
import { z } from "npm:zod";

const server = new FastMCP({
    name: "Preset MCP Server TS Local",
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

server.addTool({
    name: "Convert To Snake Case",
    description: "Convert a string to snake case",
    parameters: z.object({
        string: z.string()
    }),
    execute: (params) => {
        const snakeCase = params.string.replace(/([A-Z])/g, '_$1')
            .replace(/\s+/g, '_')
            .toLowerCase();
        return Promise.resolve(JSON.stringify({
            snakeCase
        }));
    }
});

server.addTool({
    name: "Add Enviroment as Prefix",
    description: "Add enviroment string as prefix to given string",
    parameters: z.object({
        string: z.string()
    }),
    execute: (params) => {
        const envKey = "YOUR_ENV";
        const envValue = Deno.env.get(envKey);
        return Promise.resolve(envValue + params.string);
    }
});

server.start({
    transportType: "stdio"
});