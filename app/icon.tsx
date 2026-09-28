import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Generated favicon: the "iB" logo mark, matching the header/footer logo. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          background: "#FCEEF2",
          border: "4px solid #D9829B",
          boxSizing: "border-box",
          color: "#8E2449",
          fontSize: 28,
          fontFamily: "serif",
        }}
      >
        iB
      </div>
    ),
    { ...size },
  );
}
