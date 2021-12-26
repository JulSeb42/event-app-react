// Colors
export const Colors = {
    BluePrimary: "#1353d1",
    BluePrimary70: "#447dee",
    BluePrimary50: "#a1bef7",
    BluePrimary10: "#e8effd",
    Danger: "#d00000",
    Danger70: "#ff3333",
    Danger50: "#ff9999",
    Danger10: "#ffe5e6",
    Success: "#a2d729",
    Success70: "#b4df53",
    Success50: "#daefa9",
    Success10: "#f6fbea",
    Black: "#0d1321",
    DarkGray: "#2f2f2f",
    Gray: "#767676",
    LightGray: "#e4e4e4",
    White: "#fff",
    Overlay:
        "linear-gradient(0deg, rgba(0,0,0,0.7) 0%, rgba(255,255,255,0) 100%)",
}

// Margins
export const Margins = {
    XXL: "48px",
    XL: "32px",
    L: "24px",
    M: "16px",
    S: "12px",
    XS: "8px",
    XXS: "4px",
}

// Fonts
export const FontFamily = "'Lato', sans-serif"

// Font weights
export const FontWeights = {
    Regular: 400,
    Semibold: 700,
    Bold: 900,
}

export const FontSizes = {
    TitleDisplay: "64px",
    TitleLarge: "32px",
    TitleMedium: "24px",
    TitleSmall: "20px",
    Body: "16px",
    Label: "14px",
}

// Line height
export const LineHeight = 1.5

// Radii
export const Radiuses = {
    XL: "16px",
    L: "12px",
    M: "8px",
    S: "4px",
    Round: "99em",
}

// Container template
export const Container = {
    Template: "1fr 60ch 1fr",
    Column: 2,
    Padding: `${Margins.XXL} 0`,

    TemplateTablet: "5vw 1fr 5vw",
}

// Transitions
export const Transitions = {
    Short: "all .2s ease",
    Long: "all .5s ease",
}

// Media queries
const DevicesSizes = {
    MobileS: "320px",
    MobileM: "375px",
    MobileL: "425px",
    Tablet: "768px",
    Laptop: "1024px",
    LaptopL: "1440px",
    Desktop: "2560px",
}

export const Breakpoints = {
    MobileS: `(max-width: ${DevicesSizes.MobileS})`,
    MobileM: `(max-width: ${DevicesSizes.MobileM})`,
    MobileL: `(max-width: ${DevicesSizes.MobileL})`,
    Tablet: `(max-width: ${DevicesSizes.Tablet})`,
    Laptop: `(max-width: ${DevicesSizes.Laptop})`,
    LaptopL: `(max-width: ${DevicesSizes.LaptopL})`,
    Desktop: `(max-width: ${DevicesSizes.Desktop})`,
}
