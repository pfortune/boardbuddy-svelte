import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const dusk: CustomThemeConfig = {
    name: "dusk",
    properties: {
        // =~= Theme Properties =~=
        "--theme-font-family-base": `system-ui`,
        "--theme-font-family-heading": `system-ui`,
        "--theme-font-color-base": "51 34 17", // Dark brown
        "--theme-font-color-dark": "255 255 255",
        "--theme-rounded-base": "8px",
        "--theme-rounded-container": "4px",
        "--theme-border-base": "1px",
        // =~= Theme On-X Colors =~=
        "--on-primary": "255 255 255",
        "--on-secondary": "0 0 0",
        "--on-tertiary": "255 255 255",
        "--on-success": "0 0 0",
        "--on-warning": "0 0 0",
        "--on-error": "255 255 255",
        "--on-surface": "51 34 17", // Dark brown
        // =~= Theme Colors  =~=
        // primary | #D2691E (Chocolate)
        "--color-primary-50": "252 243 235", // #fcf3eb
        "--color-primary-100": "250 233 217", // #fae9d9
        "--color-primary-200": "247 222 198", // #f7dec6
        "--color-primary-300": "241 190 141", // #f1be8d
        "--color-primary-400": "229 127 49", // #e57f31
        "--color-primary-500": "210 105 30", // #D2691E
        "--color-primary-600": "189 94 27", // #bd5e1b
        "--color-primary-700": "158 79 22", // #9e4f16
        "--color-primary-800": "126 63 18", // #7e3f12
        "--color-primary-900": "103 51 14", // #67330e
        // secondary | #8B4513 (SaddleBrown)
        "--color-secondary-50": "244 238 234", // #f4eeea
        "--color-secondary-100": "239 226 217", // #efe2d9
        "--color-secondary-200": "233 215 199", // #e9d7c7
        "--color-secondary-300": "217 181 153", // #d9b599
        "--color-secondary-400": "186 113 61", // #ba713d
        "--color-secondary-500": "139 69 19", // #8B4513
        "--color-secondary-600": "125 62 17", // #7d3e11
        "--color-secondary-700": "104 52 14", // #68340e
        "--color-secondary-800": "83 41 11", // #53290b
        "--color-secondary-900": "67 33 9", // #432109
        // tertiary | #FFD700 (Gold)
        "--color-tertiary-50": "255 250 230", // #fffae6
        "--color-tertiary-100": "255 244 204", // #fff4cc
        "--color-tertiary-200": "255 239 179", // #ffefb3
        "--color-tertiary-300": "255 223 102", // #ffdf66
        "--color-tertiary-400": "255 212 51", // #ffd433
        "--color-tertiary-500": "255 215 0", // #FFD700
        "--color-tertiary-600": "230 193 0", // #e6c100
        "--color-tertiary-700": "192 161 0", // #c0a100
        "--color-tertiary-800": "154 129 0", // #9a8100
        "--color-tertiary-900": "126 106 0", // #7e6a00
        // success | #6B8E23 (OliveDrab)
        "--color-success-50": "243 246 234", // #f3f6ea
        "--color-success-100": "235 242 217", // #ebf2d9
        "--color-success-200": "228 239 199", // #e4efc7
        "--color-success-300": "206 227 153", // #cee399
        "--color-success-400": "162 202 61", // #a2ca3d
        "--color-success-500": "107 142 35", // #6B8E23
        "--color-success-600": "96 128 31", // #60801f
        "--color-success-700": "80 106 26", // #506a1a
        "--color-success-800": "64 85 21", // #405515
        "--color-success-900": "52 69 17", // #344511
        // warning | #FF8C00 (DarkOrange)
        "--color-warning-50": "255 244 230", // #fff4e6
        "--color-warning-100": "255 234 204", // #ffea99
        "--color-warning-200": "255 224 179", // #ffe4b3
        "--color-warning-300": "255 193 102", // #ffc166
        "--color-warning-400": "255 163 51", // #ffa333
        "--color-warning-500": "255 140 0", // #FF8C00
        "--color-warning-600": "230 126 0", // #e67e00
        "--color-warning-700": "192 105 0", // #c06900
        "--color-warning-800": "154 84 0", // #9a5400
        "--color-warning-900": "126 69 0", // #7e4500
        // error | #B22222 (FireBrick)
        "--color-error-50": "250 232 232", // #fae8e8
        "--color-error-100": "247 218 218", // #f7dada
        "--color-error-200": "245 204 204", // #f5cccc
        "--color-error-300": "239 157 157", // #ef9d9d
        "--color-error-400": "228 63 63", // #e43f3f
        "--color-error-500": "178 34 34", // #B22222
        "--color-error-600": "160 31 31", // #a01f1f
        "--color-error-700": "134 26 26", // #861a1a
        "--color-error-800": "107 21 21", // #6b1515
        "--color-error-900": "88 17 17", // #581111
        // surface | #A0522D (Sienna)
        "--color-surface-50": "244 235 230", // #f4ebe6
        "--color-surface-100": "241 228 222", // #f1e4de
        "--color-surface-200": "238 222 215", // #eeded7
        "--color-surface-300": "226 197 186", // #e2c5ba
        "--color-surface-400": "203 146 123", // #cb927b
        "--color-surface-500": "160 82 45", // #A0522D
        "--color-surface-600": "144 74 40", // #904a28
        "--color-surface-700": "120 62 34", // #783e22
        "--color-surface-800": "96 49 27", // #60311b
        "--color-surface-900": "78 40 22", // #4e2816
    }
}