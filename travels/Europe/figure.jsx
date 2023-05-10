/* eslint-disable react/prop-types,import/no-unresolved */
import React from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";

export default function Figure({ src, caption }) {
  return (
    <figure style={{ border: "0px solid #888", padding: 20 }}>
      <img src={useBaseUrl(src)} alt={caption} />
      <figcaption style={{ textAlign: "center" }}>{`${caption}`}</figcaption>
    </figure>
  );
}
