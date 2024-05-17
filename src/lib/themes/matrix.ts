import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const matrix: CustomThemeConfig = {
    name: "matrix",
    properties: {
        // =~= Theme Properties =~=
        "--theme-font-family-base": `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace`,
        "--theme-font-family-heading": `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace`,
        "--theme-font-color-base": "var(--color-primary-800)", // Darker green for readability on light background
        "--theme-font-color-dark": "var(--color-primary-400)",
        "--theme-rounded-base": "4px",
        "--theme-rounded-container": "8px",
        "--theme-border-base": "2px",
        // =~= Theme On-X Colors =~=
        "--on-primary": "0 0 0",
        "--on-secondary": "0 0 0",
        "--on-tertiary": "0 0 0",
        "--on-success": "0 0 0",
        "--on-warning": "0 0 0",
        "--on-error": "0 0 0",
        "--on-surface": "255 255 255",
        // =~= Theme Colors  =~=
        // primary | #00FF00
        "--color-primary-50": "230 255 230", // #e6ffe6
        "--color-primary-100": "200 255 200", // #c8ffc8
        "--color-primary-200": "150 255 150", // #96ff96
        "--color-primary-300": "100 255 100", // #64ff64
        "--color-primary-400": "50 255 50", // #32ff32
        "--color-primary-500": "0 255 0", // #00ff00
        "--color-primary-600": "0 230 0", // #00e600
        "--color-primary-700": "0 200 0", // #00c800
        "--color-primary-800": "0 150 0", // #009600
        "--color-primary-900": "0 100 0", // #006400
        // secondary | #003300
        "--color-secondary-50": "230 242 230", // #e6f2e6
        "--color-secondary-100": "200 225 200", // #c8e1c8
        "--color-secondary-200": "150 180 150", // #96b496
        "--color-secondary-300": "100 135 100", // #648764
        "--color-secondary-400": "50 90 50", // #325a32
        "--color-secondary-500": "0 51 0", // #003300
        "--color-secondary-600": "0 46 0", // #002e00
        "--color-secondary-700": "0 38 0", // #002600
        "--color-secondary-800": "0 30 0", // #001e00
        "--color-secondary-900": "0 20 0", // #001400
        // tertiary | #339966
        "--color-tertiary-50": "230 250 245", // #e6faf5
        "--color-tertiary-100": "200 240 225", // #c8f0e1
        "--color-tertiary-200": "150 225 195", // #96e1c3
        "--color-tertiary-300": "100 200 165", // #64c8a5
        "--color-tertiary-400": "50 175 135", // #32af87
        "--color-tertiary-500": "0 153 102", // #009966
        "--color-tertiary-600": "0 138 92", // #008a5c
        "--color-tertiary-700": "0 115 77", // #00734d
        "--color-tertiary-800": "0 92 62", // #005c3e
        "--color-tertiary-900": "0 75 50", // #004b32
        // success | #00FF00
        "--color-success-50": "230 255 230", // #e6ffe6
        "--color-success-100": "200 255 200", // #c8ffc8
        "--color-success-200": "150 255 150", // #96ff96
        "--color-success-300": "100 255 100", // #64ff64
        "--color-success-400": "50 255 50", // #32ff32
        "--color-success-500": "0 255 0", // #00ff00
        "--color-success-600": "0 230 0", // #00e600
        "--color-success-700": "0 200 0", // #00c800
        "--color-success-800": "0 150 0", // #009600
        "--color-success-900": "0 100 0", // #006400
        // warning | #FFDD00 
        "--color-warning-50": "255 255 230", // #ffffe6
        "--color-warning-100": "255 255 200", // #ffffc8
        "--color-warning-200": "255 255 150", // #ffff96
        "--color-warning-300": "255 255 100", // #ffff64
        "--color-warning-400": "255 255 50", // #ffff32
        "--color-warning-500": "255 255 0", // #ffff00
        "--color-warning-600": "230 230 0", // #e6e600
        "--color-warning-700": "200 200 0", // #c8c800
        "--color-warning-800": "150 150 0", // #969600
        "--color-warning-900": "100 100 0", // #646400
        // error | #FF0000 
        "--color-error-50": "255 230 230", // #ffe6e6
        "--color-error-100": "255 200 200", // #ffc8c8
        "--color-error-200": "255 150 150", // #ff9696
        "--color-error-300": "255 100 100", // #ff6464
        "--color-error-400": "255 50 50", // #ff3232
        "--color-error-500": "255 0 0", // #ff0000
        "--color-error-600": "230 0 0", // #e60000
        "--color-error-700": "200 0 0", // #c80000
        "--color-error-800": "150 0 0", // #960000
        "--color-error-900": "100 0 0", // #640000
        // surface | #1a2b1a
        "--color-surface-50": "245 250 245", // #f5faf5
        "--color-surface-100": "225 240 225", // #e1f0e1
        "--color-surface-200": "195 225 195", // #c3e1c3
        "--color-surface-300": "165 200 165", // #a5c8a5
        "--color-surface-400": "35 175 135", // #87af87
        "--color-surface-500": "50 100 50", // #326432
        "--color-surface-600": "15 15 15", // #285a28
        "--color-surface-700": "15 15 15", // #1e4b1e
        "--color-surface-800": "15 60 25", // #193c19
        "--color-surface-900": "15 15 15", // #142d14
    }
}