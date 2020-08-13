import React from "react";
import { scale } from "../../../src/utils/typography";
import "./compact-table.css";

export function ScaleExamples() {
  return (
    <table>
      <tr>
        <td>Scale</td>
        <td>Formula</td>
        <td>fontSize</td>
        <td>Size in px</td>
        <td>Example</td>
      </tr>
      {[-0.4, -0.2, 0, 0.2, 0.4, 0.6, 1].map(s => (
        <tr>
          <td>
            <code>scale({Math.round(s * 5)} / 5)</code>
          </td>
          <td>
            <code>17 * 2 ^ {s}</code>
          </td>
          <td>{scale(s).fontSize}</td>
          <td>{(parseFloat(scale(s).fontSize, 10) * 17).toFixed(2)}</td>
          <td style={{ fontSize: scale(s).fontSize }}>Hello, world!</td>
        </tr>
      ))}
    </table>
  );
}

export function LineHeights() {
  return (
    <table>
      <tr>
        <td>Scale</td>
        <td>fontSize in px</td>
        <td>lineHeight in px</td>
        <td>Example</td>
      </tr>
      {[-0.4, 0, 0.2, 0.4, 1, 1.5, 2].map(s => (
        <tr>
          <td>
            <code>scale({s})</code>
          </td>
          <td>{(parseFloat(scale(s).fontSize, 10) * 17).toFixed(2)}</td>
          <td>{(parseFloat(scale(s).lineHeight, 10) * 17).toFixed(2)}</td>
          <td>
            <div
              style={{
                height: scale(s).lineHeight,
                lineHeight: scale(s).lineHeight,
                fontSize: scale(s).fontSize,
                backgroundColor: "#ffde9c"
              }}
            >
              Hello, world
            </div>{" "}
          </td>
        </tr>
      ))}
    </table>
  );
}
