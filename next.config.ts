import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    devIndicators: false,
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },

    experimental: {
        externalDir: true,
    },

    webpack: (config) => {
        const fileLoaderRule = config.module.rules.find((rule: any) =>
            rule.test?.test?.(".svg"),
        );

        config.module.rules.push({
            test: /\.svg$/i,
            issuer: fileLoaderRule.issuer,
            resourceQuery: {
                not: [...fileLoaderRule.resourceQuery.not, /url/],
            },
            use: ["@svgr/webpack"],
        });

        fileLoaderRule.exclude = /\.svg$/i;

        config.resolve.alias = {
            ...config.resolve.alias,

            "@components": path.resolve(__dirname, "./src/components"),
            "@services": path.resolve(__dirname, "./src/services"),
            "@hooks": path.resolve(__dirname, "./src/hooks"),
            "@stores": path.resolve(__dirname, "./src/stores"),
            "@types": path.resolve(__dirname, "./src/types"),
            "@assets": path.resolve(__dirname, "./src/assets"),
            "@pages": path.resolve(__dirname, "./src/pages"),
            "@layouts": path.resolve(__dirname, "./src/layouts"),
        };

        return config;
    },

    async rewrites() {
        return [
            {
                source: "/backend/:path*",
                destination: `${process.env.API_URL}/:path*`,
            },
            {
                source: "/uploads/:path*",
                destination: `${process.env.UPLOADS_URL}/:path*`,
            },
        ];
    },
};

export default nextConfig;
