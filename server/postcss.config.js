module.exports = {
    plugins: [
        require("@tailwindcss/postcss"),
        require("autoprefixer")({
            overrideBrowserslist: ["Firefox 28"],
            flexbox: "no-2009", // forces old flexbox prefixes
        }),
        require("postcss-preset-env")({
            stage: 3,
            browsers: "Firefox 28",
            features: {
                "custom-properties": true, // CSS vars → static values
                "nesting-rules": true, // flatten nested CSS
                "custom-media-queries": true, // expand @custom-media
            },
        }),
    ],
};
