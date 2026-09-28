import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Generated Open Graph card built from the design system's own tokens (no
 * photography needed — see design-reference/CLIENT-CHECKLIST.md for the
 * photos still pending from the client).
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 28,
          background: "#F7DCE4",
        }}
      >
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: "50%",
            background: "#FCEEF2",
            border: "5px solid #D9829B",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#8E2449",
            fontSize: 48,
            fontFamily: "serif",
          }}
        >
          iB
        </div>
        <div style={{ fontSize: 64, color: "#332326", fontFamily: "serif" }}>{siteConfig.name}</div>
        <div style={{ fontSize: 28, color: "#332326", maxWidth: 820, textAlign: "center", display: "flex" }}>
          Homemade cupcakes, cakes &amp; cheesecakes from family recipes
        </div>
      </div>
    ),
    { ...size },
  );
}
