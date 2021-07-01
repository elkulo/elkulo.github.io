import styled from "@emotion/styled"

const size = {
  mobile: "600px",
  tablet: "768px",
  desktop: "1168px",
  wide: "1379px",
  max: {
    full: `calc(12 * (100vw / 12) - 28px)`,
    liquid: `calc(10 * (100vw / 12) - 28px)`,
  },
}

const device = {
  mobile: `(min-width: ${size.mobile})`,
  tablet: `(min-width: ${size.tablet})`,
  desktop: `(min-width: ${size.desktop})`,
  wide: `(min-width: ${size.wide})`,
}

export default styled.div`
  display: flow-root;
  clear: both;
  max-width: ${size.max.full};
  margin: 0 1rem;

  @media ${device.tablet} {
    max-width: ${size.max.liquid};
    margin: 0 auto;
  }
`
