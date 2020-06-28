import React from "react";
import { scale } from "../../../src/utils/typography";
import "./compact-table.css";

export function ScaleExamples() {
  return (
    <table>
      <tr>
        <td>Scale</td>
        <td>fontSize</td>
        <td>Size in px</td>
        <td>Example</td>
      </tr>
      {[-0.4, -0.2, 0, 0.2, 0.4, 0.6, 1].map(s => (
        <tr>
          <td>{s}</td>
          <td>{scale(s).fontSize}</td>
          <td>{parseFloat(scale(s).fontSize, 10) * 17}</td>
          <td style={{ fontSize: scale(s).fontSize }}>Hello, world!</td>
        </tr>
      ))}
    </table>
  );
}
